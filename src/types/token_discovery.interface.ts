import { Blockchains, AssetTypes } from '../constants'

export interface TokenDiscoveryParam {
  /**
   * Enum of blockchain identifiers
   */   
  blockchain: Blockchains,

  /**
   * Enum of asset or token types
   */   
  assetType: AssetTypes,

  /**
   * Address or public key
   */   
  addrXpub: string,
}

export interface TokenDiscoveryResult {
  /**
   * Result is an array
   */
  [index: number]: {

    /**
     * Unique identifier (erc20 contract addr, or '0' for native currency)
     */
    assetId: string;

    /**
     * Enum of asset or token types
     */   
    assetType: number;

    /**
     * Amount/value in smallest unit on blockchain (satoshi, wei, etc)
     */  
    value: string;

    /**
     * Indicates the address received atleast one transaction
     */
    exists: boolean;
  }
}