import { Blockchains, AssetTypes } from '../constants'

export interface TxidsLookupParam {
  /**
   * Enum of blockchain identifiers
   */   
  blockchain: Blockchains;

  /**
   * Enum of asset or token types
   */   
  assetType: AssetTypes;

  /**
   * Unique identifier (erc20 contract addr, or '0' for native currency)
   */
  assetId: string;

  /**
   * List of address or public key
   */   
  addrXpub: string[];

  /**
   * Max number of transactions to return
   */
  to: number;
}

export interface TxidsLookupResult {

  /**
   * Array of array of string, each array in the main array contains the first N 
   * (upto max {to}) transaction ids.
   */
  txids: string[][];
}