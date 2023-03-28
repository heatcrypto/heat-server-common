"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainConfig = exports.NULL = exports.AssetTypes = exports.ExplorerTypes = exports.EventTypes = exports.SourceTypes = exports.txnIsConfirmed = exports.Blockchains = void 0;
// Must be in sync with
// https://github.com/heatcrypto/coin-registry/blob/master/registry/chains.json
var Blockchains;
(function (Blockchains) {
    Blockchains[Blockchains["BITCOIN"] = 0] = "BITCOIN";
    Blockchains[Blockchains["ETHEREUM"] = 1] = "ETHEREUM";
    Blockchains[Blockchains["HEAT"] = 2] = "HEAT";
    Blockchains[Blockchains["LITECOIN"] = 3] = "LITECOIN";
    Blockchains[Blockchains["BITCOIN_CASH"] = 4] = "BITCOIN_CASH";
    Blockchains[Blockchains["FIMK"] = 5] = "FIMK";
    Blockchains[Blockchains["HEAT_TEST"] = 6] = "HEAT_TEST";
    Blockchains[Blockchains["BITCOIN_TEST"] = 7] = "BITCOIN_TEST";
    Blockchains[Blockchains["POLYGON"] = 8] = "POLYGON";
    Blockchains[Blockchains["FANTOM"] = 9] = "FANTOM";
    Blockchains[Blockchains["BINANCE_SMART_CHAIN"] = 10] = "BINANCE_SMART_CHAIN";
    Blockchains[Blockchains["AVALANCHE"] = 11] = "AVALANCHE";
    Blockchains[Blockchains["ARBITRUM"] = 12] = "ARBITRUM";
    Blockchains[Blockchains["OPTIMISM"] = 13] = "OPTIMISM";
    Blockchains[Blockchains["SOLANA"] = 14] = "SOLANA";
    Blockchains[Blockchains["GNOSIS"] = 15] = "GNOSIS";
    Blockchains[Blockchains["CELO"] = 16] = "CELO";
    Blockchains[Blockchains["APTOS"] = 17] = "APTOS";
    Blockchains[Blockchains["MOONBEAM"] = 18] = "MOONBEAM";
    Blockchains[Blockchains["HARMONY"] = 19] = "HARMONY";
    Blockchains[Blockchains["TRON"] = 20] = "TRON";
    Blockchains[Blockchains["SYSCOIN"] = 21] = "SYSCOIN";
    Blockchains[Blockchains["FILECOIN"] = 22] = "FILECOIN";
    Blockchains[Blockchains["POLKADOT"] = 23] = "POLKADOT";
    Blockchains[Blockchains["KUSAME"] = 24] = "KUSAME";
    Blockchains[Blockchains["ETHEREUM_GOERLI"] = 25] = "ETHEREUM_GOERLI";
    Blockchains[Blockchains["POLYGON_MUMBAI"] = 26] = "POLYGON_MUMBAI";
    Blockchains[Blockchains["AVALANCHE_FUJI"] = 27] = "AVALANCHE_FUJI";
    Blockchains[Blockchains["DOGECOIN"] = 28] = "DOGECOIN";
})(Blockchains = exports.Blockchains || (exports.Blockchains = {}));
function txnIsConfirmed(blockchain, confirmations) {
    var config = exports.BlockchainConfig[blockchain];
    return confirmations > config.confirmed;
}
exports.txnIsConfirmed = txnIsConfirmed;
var SourceTypes;
(function (SourceTypes) {
    SourceTypes[SourceTypes["TRANSACTION"] = 0] = "TRANSACTION";
})(SourceTypes = exports.SourceTypes || (exports.SourceTypes = {}));
var EventTypes;
(function (EventTypes) {
    EventTypes[EventTypes["EVENT_SEND"] = 1] = "EVENT_SEND";
    EventTypes[EventTypes["EVENT_RECEIVE"] = 2] = "EVENT_RECEIVE";
    EventTypes[EventTypes["EVENT_OUTPUT"] = 3] = "EVENT_OUTPUT";
    EventTypes[EventTypes["EVENT_INPUT"] = 4] = "EVENT_INPUT";
    EventTypes[EventTypes["EVENT_FEE"] = 5] = "EVENT_FEE";
    EventTypes[EventTypes["EVENT_BUY_ORDER"] = 6] = "EVENT_BUY_ORDER";
    EventTypes[EventTypes["EVENT_SELL_ORDER"] = 7] = "EVENT_SELL_ORDER";
    EventTypes[EventTypes["EVENT_CANCEL_BUY_ORDER"] = 8] = "EVENT_CANCEL_BUY_ORDER";
    EventTypes[EventTypes["EVENT_CANCEL_SELL_ORDER"] = 9] = "EVENT_CANCEL_SELL_ORDER";
    EventTypes[EventTypes["EVENT_LEASE_BALANCE"] = 10] = "EVENT_LEASE_BALANCE";
    EventTypes[EventTypes["EVENT_MESSAGE_SEND"] = 11] = "EVENT_MESSAGE_SEND";
    EventTypes[EventTypes["EVENT_MESSAGE_RECEIVE"] = 12] = "EVENT_MESSAGE_RECEIVE";
    // Digital Goods Store (FIMK)
    EventTypes[EventTypes["EVENT_DGS_PURCHASE"] = 13] = "EVENT_DGS_PURCHASE";
    EventTypes[EventTypes["EVENT_DGS_DELIVERY"] = 14] = "EVENT_DGS_DELIVERY";
    EventTypes[EventTypes["EVENT_DGS_PREFUND"] = 15] = "EVENT_DGS_PREFUND";
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));
var ExplorerTypes;
(function (ExplorerTypes) {
    ExplorerTypes[ExplorerTypes["TOKEN_DISCOVERY"] = 1] = "TOKEN_DISCOVERY";
    ExplorerTypes[ExplorerTypes["BALANCE_LOOKUP"] = 2] = "BALANCE_LOOKUP";
    ExplorerTypes[ExplorerTypes["UTXO_LOOKUP"] = 3] = "UTXO_LOOKUP";
    ExplorerTypes[ExplorerTypes["EVENTS_LOOKUP"] = 4] = "EVENTS_LOOKUP";
    ExplorerTypes[ExplorerTypes["BROADCAST_TRANSACTION"] = 5] = "BROADCAST_TRANSACTION";
    ExplorerTypes[ExplorerTypes["TRANSACTION_STATUS"] = 6] = "TRANSACTION_STATUS";
    ExplorerTypes[ExplorerTypes["RESOLVE_ALIAS"] = 7] = "RESOLVE_ALIAS";
    ExplorerTypes[ExplorerTypes["REVERSE_RESOLVE_ALIAS"] = 8] = "REVERSE_RESOLVE_ALIAS";
    ExplorerTypes[ExplorerTypes["NETWORK_FEE"] = 9] = "NETWORK_FEE";
    ExplorerTypes[ExplorerTypes["PUBLICKEY"] = 10] = "PUBLICKEY";
    ExplorerTypes[ExplorerTypes["CUSTOM_HEAT_ACCOUNT"] = 11] = "CUSTOM_HEAT_ACCOUNT";
    ExplorerTypes[ExplorerTypes["NETWORK_STATUS"] = 12] = "NETWORK_STATUS";
    ExplorerTypes[ExplorerTypes["NONCE_LOOKUP"] = 13] = "NONCE_LOOKUP";
    ExplorerTypes[ExplorerTypes["ESTIMATE_GAS"] = 14] = "ESTIMATE_GAS";
    ExplorerTypes[ExplorerTypes["TXIDS"] = 15] = "TXIDS";
    ExplorerTypes[ExplorerTypes["UTXO_XPUB"] = 16] = "UTXO_XPUB";
    ExplorerTypes[ExplorerTypes["XPUB"] = 17] = "XPUB";
    ExplorerTypes[ExplorerTypes["CUSTOM_FIMK_DGS_GOOD"] = 18] = "CUSTOM_FIMK_DGS_GOOD";
})(ExplorerTypes = exports.ExplorerTypes || (exports.ExplorerTypes = {}));
var AssetTypes;
(function (AssetTypes) {
    AssetTypes[AssetTypes["NATIVE"] = 0] = "NATIVE";
    AssetTypes[AssetTypes["TOKEN_TYPE_1"] = 1] = "TOKEN_TYPE_1";
})(AssetTypes = exports.AssetTypes || (exports.AssetTypes = {}));
exports.NULL = '0';
var evmInfo = {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 60,
    blockTime: 20,
    feeBlocks: 3,
};
exports.BlockchainConfig = (_a = {},
    _a[Blockchains.ETHEREUM] = evmInfo,
    _a[Blockchains.BITCOIN] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 3,
        blockTime: 600,
        feeBlocks: 1,
    },
    _a[Blockchains.LITECOIN] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 5,
        blockTime: 150,
        feeBlocks: 2,
    },
    _a[Blockchains.BITCOIN_CASH] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 3,
        blockTime: 600,
        feeBlocks: 1,
    },
    _a[Blockchains.HEAT] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 30,
        blockTime: 30,
        feeBlocks: 1,
    },
    _a[Blockchains.HEAT_TEST] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 30,
        blockTime: 30,
        feeBlocks: 1,
    },
    _a[Blockchains.BITCOIN_TEST] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 10,
        blockTime: 600,
        feeBlocks: 1,
    },
    _a[Blockchains.FIMK] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 10,
        blockTime: 45,
        feeBlocks: 1,
    },
    _a[Blockchains.POLYGON] = evmInfo,
    _a[Blockchains.FANTOM] = evmInfo,
    _a[Blockchains.BINANCE_SMART_CHAIN] = evmInfo,
    _a[Blockchains.AVALANCHE] = evmInfo,
    _a[Blockchains.ARBITRUM] = evmInfo,
    _a[Blockchains.OPTIMISM] = evmInfo,
    _a[Blockchains.SOLANA] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 60,
        blockTime: 20,
        feeBlocks: 3,
    },
    _a[Blockchains.GNOSIS] = evmInfo,
    _a[Blockchains.CELO] = evmInfo,
    _a[Blockchains.APTOS] = evmInfo,
    _a[Blockchains.MOONBEAM] = evmInfo,
    _a[Blockchains.HARMONY] = evmInfo,
    _a[Blockchains.TRON] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 60,
        blockTime: 20,
        feeBlocks: 3,
    },
    _a[Blockchains.SYSCOIN] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 60,
        blockTime: 20,
        feeBlocks: 3,
    },
    _a[Blockchains.FILECOIN] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 60,
        blockTime: 20,
        feeBlocks: 3,
    },
    _a[Blockchains.POLKADOT] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 60,
        blockTime: 20,
        feeBlocks: 3,
    },
    _a[Blockchains.KUSAME] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 60,
        blockTime: 20,
        feeBlocks: 3,
    },
    _a[Blockchains.DOGECOIN] = {
        broadcastRetry: 10,
        statusRetry: 10,
        confirmed: 5,
        blockTime: 60,
        feeBlocks: 2,
    },
    _a);
