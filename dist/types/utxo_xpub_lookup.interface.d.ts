import { Blockchains, AssetTypes } from '../constants';
export interface UtxoXpubLookupParam {
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
     * Only returns confirmed utxos
     */
    confirmed: boolean;
    /**
     * Zero indexed the zero'd event is the newest
     */
    from: number;
    /**
     * Events in range [from, to] are returned
     */
    to: number;
    /**
     * xpub
     */
    xpub: string;
}
export interface UtxoXpubLookupResult {
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
    address: number;
    /**
     * For unconfirmed transactions this will return 0
     */
    height: number;
    /**
     *
     */
    lockTime: number;
}
