import { Blockchains, AssetTypes } from '../constants';
export interface TxidsLookupParam {
    /**
     * Enum of blockchain identifiers
     */
    blockchain: Blockchains;
    /**
     * Enum of asset or token types
     */
    assetType: AssetTypes;
    /**
     * Unique identifier (erc20 contract addr, or '0' for native currency)
     */
    assetId: string;
    /**
     * List of address or public key
     */
    addrXpubs: string[];
    /**
     * Max number of transactions to return
     */
    to: number;
}
export interface TxidsLookupResult {
    /**
     * Amount/value in smallest unit on blockchain (satoshi, wei, etc)
     */
    value: string;
    /**
     * Array of txid's
     */
    txids: string[];
}
