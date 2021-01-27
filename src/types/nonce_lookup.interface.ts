import { Blockchains, AssetTypes } from '../constants'

/**
 * Nonce lookup
 */
export interface NonceLookupParam {
  /**
   * Enum of blockchain identifiers
   */   
  blockchain: Blockchains;

  /**
   * Enum of asset or token types (ignored for ethereum nonce)
   */   
  assetType: AssetTypes;

  /**
   * Asset identifier (ignored for ethereum nonce)
   */   
  assetId: string;

  /**
   * Address we ar seeking a nonce for
   */
  addrXpub: string;
}

/**
 * Nonce lookup
 */
export interface NonceLookupResult {

  /**
   * nonce value
   */
  value: string;
}