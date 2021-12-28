import { Blockchains, AssetTypes } from '../constants'

export enum XpubLookupRequestTokens { NON_ZERO, USED }
export enum XpubLookupRequestType { TXS, TXIDS }

export interface XpubLookupParam {
  /**
   * Enum of blockchain identifiers
   */
  blockchain: Blockchains,

  /**
   * Enum of asset or token types
   */
  assetType: AssetTypes,

  /**
   * Unique identifier (erc20 contract addr, or '0' for native currency)
   */
  assetId: string;

  /**
   * Type of tokens returned
   */
  tokens: XpubLookupRequestTokens;

  /**
   * Result type, txids or full transactions
   */
  type: XpubLookupRequestType;

  /**
   * Zero indexed the zero'd event is the newest
   */
  from: number;

  /**
   * Events in range [from, to] are returned
   */
  to: number;

  /**
   * xpub
   */
  xpub: string;
}

export interface XpubLookupResult {

  /**
   * Total balance in satoshi
   */
  balance: string;

  /**
   * Unconfirmed balance in satoshi or 0 
   */
  unconfirmedBalance: string;

  /**
   * Total satoshi received
   */
  totalReceived: string;

  /**
   * Total satoshi send
   */
  totalSent: string;

  /**
   * List of tx ids or null - XpubLookupRequestType.TXIDS
   */
  txids?: string[];

  /**
   * List of transactions or null - XpubLookupRequestType.TXS
   */
  transactions?: XpubTransactionResult[];

  /**
   * List of token individual balances
   */
  tokens: XpubTokenResult[];

  /**
   * Pagination logic
   */
  page: number;
  totalPages: number;
  itemsOnPage: number;
}

export interface XpubTransactionResult {

  /**
   * Blockheight of the transaction
   */
  blockHeight: number;

  /**
   * Timestamp of the transaction block
   */
  blockTime: number;

  /**
   * Number of blocks ago this transaction occured
   */
  confirmations: number;

  /**
   * Total fees in satoshis
   */
  fees: string;

  /**
   * Transaction hex data
   */
  hex: string;

  /**
   * Transaction identifier
   */
  txid: string;

  /**
   * Amount transferred in transaction in satoshi
   */
  value: string;

  /**
   * Total value of all inputs to this transaction
   */
  valueIn: string;

  /**
   * Inputs 
   */
  vin: XpubTransactionVin[];

  /**
   * Outputs
   */
  vout: XpubTransactionVout[];
}

export interface XpubTransactionVin {

  /**
   * Input address (sender)
   */
  addresses: string[];

  /**
   * scriptPub
   */
  hex: string;

  /**
   * Transaction id
   */
  txid: string;

  /**
   * Value in satoshi
   */
  value: string;

  /**
   * Index in transaction
   */
  n: number;
}

export interface XpubTransactionVout {

  /**
   * Output address (recipient)
   */
  addresses: string[];

  /**
   * scriptPub
   */
  hex: string;

  /**
   * Value in satoshi
   */
  value: string;

  /**
   * Index in transaction
   */
  n: number;
}

export interface XpubTokenResult {
  /**
   * Balance in satoshi
   */
  balance: string;

  /**
   * Address "1Bb6D1uUcMo9Gt4imnpAkipWijMQaWtdGF"
   */
  name: string;

  /**
   * "m/44'/0'/0'/0/0"
   */
  path: string;

  /**
   * Total satoshi received
   */
  totalReceived: string;

  /**
   * Total satoshi send
   */
  totalSent: string;

  /**
   * Total number of transfers to this address
   */
  transfers: number;

  /**
   * Blockbook type name "XPUBAddress"
   */
  type: string;
}