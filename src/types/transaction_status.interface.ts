import { Blockchains, AssetTypes } from '../constants' 

export interface TransactionStatusParam {
  /**
   * Enum of blockchain identifiers
   */   
  blockchain: Blockchains;

  /**
   * Enum of asset or token types
   */   
  assetType: AssetTypes;

  /**
   * Address or public key
   */   
  addrXpub: string;

  /**
   * Unique transaction identifier
   */
  transactionId: string;

  /**
   * If true this also returns the transaction as a HEX string
   */
  includeHex?: boolean;
}

export interface TransactionStatusResult {

  /**
   * Number of confirmations, returns 0 for unconfirmed transactions
   */
  confirmations: number;

  /**
   * In case of unconfirmed transactions this indicates if the transaction 
   * resides in the mem-pool or was rejected
   */
  isAccepted: boolean;

  /**
   * Certain blockchains return the transaction in hexadecimal form, on request
   */
  hex?: string | null;
}
