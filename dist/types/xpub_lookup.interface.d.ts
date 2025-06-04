import { Blockchains, AssetTypes } from '../constants';
export declare enum XpubLookupRequestTokens {
    NON_ZERO = 0,
    USED = 1
}
export declare enum XpubLookupRequestType {
    TXS = 0,
    TXIDS = 1
}
export interface XpubLookupParam {
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
     * Type of tokens returned
     */
    tokens: XpubLookupRequestTokens;
    /**
     * Result type, txids or full transactions
     */
    type: XpubLookupRequestType;
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
export interface XpubLookupResult {
    /**
     * Total balance in satoshi
     */
    balance: string;
    /**
     * Unconfirmed balance in satoshi or 0
     */
    unconfirmedBalance: string;
    /**
     * Total satoshi received
     */
    totalReceived: string;
    /**
     * Total satoshi send
     */
    totalSent: string;
    /**
     * List of tx ids or null - XpubLookupRequestType.TXIDS
     */
    txids?: string[];
    /**
     * List of transactions or null - XpubLookupRequestType.TXS
     */
    transactions?: XpubTransactionResult[];
    /**
     * List of token individual balances
     */
    tokens: XpubTokenResult[];
    /**
     * Pagination logic
     */
    page: number;
    totalPages: number;
    itemsOnPage: number;
}
export interface XpubTransactionResult {
    /**
     * Blockheight of the transaction
     */
    blockHeight: number;
    /**
     * Timestamp of the transaction block
     */
    blockTime: number;
    /**
     * Number of blocks ago this transaction occured
     */
    confirmations: number;
    /**
     * Total fees in satoshis
     */
    fees: string;
    /**
     * Transaction hex data
     */
    hex: string;
    /**
     * Transaction identifier
     */
    txid: string;
    /**
     * Amount transferred in transaction in satoshi
     */
    value: string;
    /**
     * Total value of all inputs to this transaction
     */
    valueIn: string;
    /**
     * Inputs
     */
    vin: XpubTransactionVin[];
    /**
     * Outputs
     */
    vout: XpubTransactionVout[];
}
export interface XpubTransactionVin {
    /** ID/hash of the originating transaction (where the UTXO comes from). */
    txid?: string;
    /** Index of the output in the referenced transaction. */
    vout?: number;
    /** Sequence number for this input (e.g. 4294967293). */
    sequence?: number;
    /** Relative index of this input within the transaction. */
    n: number;
    /** List of addresses associated with this input. */
    addresses?: string[];
    /** Indicates if this input is from a known address. */
    isAddress: boolean;
    /** Indicates if this input belongs to the wallet in context. */
    isOwn?: boolean;
    /** Amount (in satoshi or base units) of the input. */
    value?: string;
    /** Raw script hex data for this input. */
    hex?: string;
    /** Disassembled script for this input. */
    asm?: string;
    /** Data for coinbase inputs (when mining). */
    coinbase?: string;
}
export interface XpubTransactionVout {
    /** Amount (in satoshi or base units) of the output. */
    value?: string;
    /** Relative index of this output within the transaction. */
    n: number;
    /** Indicates whether this output has been spent. */
    spent?: boolean;
    /** Transaction ID in which this output was spent. */
    spentTxId?: string;
    /** Index of the input that spent this output. */
    spentIndex?: number;
    /** Block height at which this output was spent. */
    spentHeight?: number;
    /** Raw script hex data for this output - aka ScriptPubKey. */
    hex?: string;
    /** Disassembled script for this output. */
    asm?: string;
    /** List of addresses associated with this output. */
    addresses: string[];
    /** Indicates whether this output is owned by valid address. */
    isAddress: boolean;
    /** Indicates if this output belongs to the wallet in context. */
    isOwn?: boolean;
    /** Output script type (e.g., 'P2PKH', 'P2SH'). */
    type?: string;
}
export interface XpubTokenResult {
    /**
     * Balance in satoshi
     */
    balance: string;
    /**
     * Address "1Bb6D1uUcMo9Gt4imnpAkipWijMQaWtdGF"
     */
    name: string;
    /**
     * "m/44'/0'/0'/0/0"
     */
    path: string;
    /**
     * Total satoshi received
     */
    totalReceived: string;
    /**
     * Total satoshi send
     */
    totalSent: string;
    /**
     * Total number of transfers to this address
     */
    transfers: number;
    /**
     * Blockbook type name "XPUBAddress"
     */
    type: string;
}
