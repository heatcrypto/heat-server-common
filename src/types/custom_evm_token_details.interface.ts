import { Blockchains, AssetTypes } from '../constants'

export interface CustomEvmTokenDetailsParam {
  /**
   * Enum of blockchain identifiers
   */
  blockchain: Blockchains,

  /**
   * Enum of asset or token types
   */
  assetType: AssetTypes,

  /**
   * Unique identifier (erc20 contract addr)
   */
  assetId: string;
}

export interface CustomEvmTokenDetailsResult {
  /**
    * ERC20 and others, returns the number of decimals
    */
  decimals?: number;

  /**
   * Indicates the address received atleast one transaction
   */
  exists: boolean;
}