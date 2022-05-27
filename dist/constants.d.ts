export declare enum Blockchains {
    BITCOIN = 0,
    ETHEREUM = 1,
    HEAT = 2,
    LITECOIN = 3,
    BITCOIN_CASH = 4,
    FIMK = 5,
    HEAT_TEST = 6,
    BITCOIN_TEST = 7
}
export declare function txnIsConfirmed(blockchain: Blockchains, confirmations: number): boolean;
export declare enum SourceTypes {
    TRANSACTION = 0
}
export declare enum EventTypes {
    EVENT_SEND = 1,
    EVENT_RECEIVE = 2,
    EVENT_OUTPUT = 3,
    EVENT_INPUT = 4,
    EVENT_FEE = 5,
    EVENT_BUY_ORDER = 6,
    EVENT_SELL_ORDER = 7,
    EVENT_CANCEL_BUY_ORDER = 8,
    EVENT_CANCEL_SELL_ORDER = 9,
    EVENT_LEASE_BALANCE = 10,
    EVENT_MESSAGE_SEND = 11,
    EVENT_MESSAGE_RECEIVE = 12,
    EVENT_DGS_PURCHASE = 13,
    EVENT_DGS_DELIVERY = 14,
    EVENT_DGS_PREFUND = 15
}
export declare enum ExplorerTypes {
    TOKEN_DISCOVERY = 1,
    BALANCE_LOOKUP = 2,
    UTXO_LOOKUP = 3,
    EVENTS_LOOKUP = 4,
    BROADCAST_TRANSACTION = 5,
    TRANSACTION_STATUS = 6,
    RESOLVE_ALIAS = 7,
    REVERSE_RESOLVE_ALIAS = 8,
    NETWORK_FEE = 9,
    PUBLICKEY = 10,
    CUSTOM_HEAT_ACCOUNT = 11,
    NETWORK_STATUS = 12,
    NONCE_LOOKUP = 13,
    ESTIMATE_GAS = 14,
    TXIDS = 15,
    UTXO_XPUB = 16,
    XPUB = 17
}
export declare enum AssetTypes {
    NATIVE = 0,
    TOKEN_TYPE_1 = 1
}
export declare enum QuoteCurrencies {
    QUOTE_USD = 1,
    QUOTE_EUR = 2,
    QUOTE_BTC = 3
}
export declare const NULL = "0";
export interface BlockchainInfo {
    broadcastRetry: number;
    statusRetry: number;
    confirmed: number;
    blockTime: number;
    feeBlocks: number;
}
export declare const BlockchainConfig: {
    [key: number]: BlockchainInfo;
};
