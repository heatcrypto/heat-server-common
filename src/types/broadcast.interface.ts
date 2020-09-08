import { Blockchains, AssetTypes} from '../constants'

export interface BroadcastParam {

  /**
   * Enum of blockchain identifiers
   */ 
  blockchain: Blockchains;

  /**
   * Enum of asset type identifiers
   */ 
  assetType: AssetTypes;

  /**
   * Raw transaction hex encoded
   */
  transactionHex: string;
}

export interface BroadcastResult {

  /**
   * Error message as returned from the blockchain node, if any.
   * errorMessage and transactionId are mutually exclusive
   */
  errorMessage?: string;

  /**
   * Transaction id of broadcasted transaction, return of a transaction id also indicates 
   * successfull broadcast. This does not indicate the transaction will end on the blockchain
   * just that its initially accepted by the blockchain node.
   * errorMessage and transactionId are mutually exclusive
   */
  transactionId?: string;

}