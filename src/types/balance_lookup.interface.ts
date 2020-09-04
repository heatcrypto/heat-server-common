import { Blockchains, AssetTypes } from '../constants' 

export interface BalanceLookupParam {
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

export interface BalanceLookupResult {
  /**
    * Amount/value in smallest unit on blockchain (satoshi, wei, etc)
    */  
  value: string;

  /**
    * Indicates the address received atleast one transaction
    */
  exists: boolean;
}