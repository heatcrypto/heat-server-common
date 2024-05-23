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
   * Time of the block (timestamp) can be null
   */
  timestamp?: number;

  /**
   * List of transfers in this block, can be empty.
   * A transfer is about sending some value from sender to recipient
   * A transaction can embed multiple transfers (HEAT send many, Qubic send many, etc)
   */
  transfers: Array<BlockLookupTransfer>;
}

export interface BlockLookupTransfer {
  
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
