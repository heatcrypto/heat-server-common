import { Blockchains, AssetTypes } from '../constants'

/**
 * Estimate gas
 */
export interface EstimateGasParam {
  /**
   * Enum of blockchain identifiers
   */   
  blockchain: Blockchains;

  /**
   * Enum of asset or token types (this can be either NATIVE or ERC20/TOKEN)
   */   
  assetType: AssetTypes;

  /**
   * Contract address (only in case of assetType=TOKEN)
   */   
  assetId: string;

  /**
   * Recipient
   */
  addrXpub: string;

  /**
   * Amount
   */
  value: string;

  /**
   * Abi
   */
  abi: string;
}

/**
 * Estimate gas
 */
export interface EstimateGasResult {
  value: string;
}