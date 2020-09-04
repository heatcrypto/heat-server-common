import { Blockchains, AssetTypes } from '../constants'

export interface UtxoLookupParam {
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
   * Address or public key
   */   
  addrXpub: string,    
}

export interface UtxoLookupResult {

  /**
   * Result is an array
   */
  [index: number]: {

    /**
     * The utxo value in satoshi
     */
    value: string;

    /**
     * Transaction id
     */
    txid: string;

    /**
     * Utxo index
     */
    vout: number;

    /**
     * Number of confirmations
     */
    confirmations: number;

    /**
     * Utxo locktime (or 0 if none)
     */
    lockTime: number;

    /**
     * For unconfirmed transactions this will return 0
     */
    height: number;  
  }
}