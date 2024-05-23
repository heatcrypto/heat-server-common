import { Blockchains, AssetTypes } from "../constants";

export interface BlockLookupParam {
  /**
   * Enum of blockchain identifiers
   */
  blockchain: Blockchains;

  /**
   * Block number
   */
  height: number;
}

export interface BlockLookupResult {
  /**
   * Enum of blockchain identifiers
   */
  blockchain: Blockchains;

  /**
   * Block number
   */
  height: number;

  /**
   * Time of the block (timestamp)
   */
  timestamp: number;

  /**
   * List of transactions in this block, can be empty
   */
  txns: Array<BlockLookupTransaction>;
}

export interface BlockLookupTransaction {
  /**
   * Transaction identifier
   */
  transactionId: string;

  /**
   * Timestamp, can be null
   */
  timestamp?: number;

  /**
   * Enum of asset or token types
   */
  assetType: AssetTypes;

  /**
   * Unique identifier (erc20 contract addr, or '0' for native currency)
   */
  assetId: string;

  /**
   * Sender, can be null
   */
  sender?: string;

  /**
   * Recipient
   */
  recipient: string;

  /**
   * Transferred amount
   */
  value: string;
}
