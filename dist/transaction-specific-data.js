"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackDataBitcoinSpecific = exports.dataBitcoinSpecific = exports.unpackDataEthereumSpecific = exports.dataEthereumSpecific = exports.unpackTransactionSpecificData = exports.createTransactionSpecificData = exports.getTransactionDataType = void 0;
var constants_1 = require("./constants");
/**
 * Maps blockchain enum to transaction data type
 * @param blockchain - The blockchain enum value
 * @returns {TransactionDataTypes}
 */
function getTransactionDataType(blockchain) {
    switch (blockchain) {
        case constants_1.Blockchains.BITCOIN:
        case constants_1.Blockchains.BITCOIN_TEST:
        case constants_1.Blockchains.BITCOIN_CASH:
        case constants_1.Blockchains.LITECOIN:
        case constants_1.Blockchains.DOGECOIN:
        case constants_1.Blockchains.SYSCOIN:
            return constants_1.TransactionDataTypes.BITCOIN_TYPE;
        case constants_1.Blockchains.ETHEREUM:
        case constants_1.Blockchains.ETHEREUM_GOERLI:
        case constants_1.Blockchains.POLYGON:
        case constants_1.Blockchains.POLYGON_MUMBAI:
        case constants_1.Blockchains.FANTOM:
        case constants_1.Blockchains.BINANCE_SMART_CHAIN:
        case constants_1.Blockchains.AVALANCHE:
        case constants_1.Blockchains.AVALANCHE_FUJI:
        case constants_1.Blockchains.ARBITRUM:
        case constants_1.Blockchains.OPTIMISM:
        case constants_1.Blockchains.GNOSIS:
        case constants_1.Blockchains.CELO:
        case constants_1.Blockchains.MOONBEAM:
        case constants_1.Blockchains.HARMONY:
            return constants_1.TransactionDataTypes.ETHEREUM_TYPE;
        default:
            // For blockchains that haven't been categorized yet (HEAT, FIMK, SOLANA, TRON, etc.)
            // Return NONE to indicate no specific transaction data handling is implemented
            return constants_1.TransactionDataTypes.NONE;
    }
}
exports.getTransactionDataType = getTransactionDataType;
/**
 * Creates transaction-specific data array for serialization based on blockchain type
 * @param specific - The blockchain-specific transaction data with type discriminator
 * @returns {Array<any>}
 */
function createTransactionSpecificData(specific) {
    switch (specific.type) {
        case constants_1.TransactionDataTypes.ETHEREUM_TYPE:
            return dataEthereumSpecific(specific.data);
        case constants_1.TransactionDataTypes.BITCOIN_TYPE:
            return dataBitcoinSpecific(specific.data);
        case constants_1.TransactionDataTypes.NONE:
        default:
            return [];
    }
}
exports.createTransactionSpecificData = createTransactionSpecificData;
/**
 * Unpacks transaction-specific data array based on blockchain type
 * @param type - The blockchain architecture type
 * @param data - The serialized data array
 * @returns {TransactionSpecificData | undefined}
 */
function unpackTransactionSpecificData(type, data) {
    switch (type) {
        case constants_1.TransactionDataTypes.ETHEREUM_TYPE: {
            var ethereumData = unpackDataEthereumSpecific(data);
            return ethereumData ? { type: constants_1.TransactionDataTypes.ETHEREUM_TYPE, data: ethereumData } : undefined;
        }
        case constants_1.TransactionDataTypes.BITCOIN_TYPE: {
            var bitcoinData = unpackDataBitcoinSpecific(data);
            return bitcoinData ? { type: constants_1.TransactionDataTypes.BITCOIN_TYPE, data: bitcoinData } : undefined;
        }
        case constants_1.TransactionDataTypes.NONE:
        default:
            return undefined;
    }
}
exports.unpackTransactionSpecificData = unpackTransactionSpecificData;
function dataEthereumSpecific(data) {
    if (!data)
        return [];
    return [
        data.type || 0,
        data.createdContract || 0,
        data.status,
        data.error || 0,
        data.nonce,
        data.gasLimit,
        data.gasUsed || 0,
        data.gasPrice || 0,
        data.maxPriorityFeePerGas || 0,
        data.maxFeePerGas || 0,
        data.baseFeePerGas || 0,
        data.l1Fee || 0,
        data.l1FeeScalar || 0,
        data.l1GasPrice || 0,
        data.l1GasUsed || 0,
        data.data || 0,
        data.parsedData || 0,
        data.internalTransfers || 0,
    ];
}
exports.dataEthereumSpecific = dataEthereumSpecific;
function unpackDataEthereumSpecific(data) {
    if (!data || data.length === 0)
        return undefined;
    return {
        type: data[0] === 0 ? undefined : data[0],
        createdContract: data[1] === 0 ? undefined : data[1],
        status: data[2],
        error: data[3] === 0 ? undefined : data[3],
        nonce: data[4],
        gasLimit: data[5],
        gasUsed: data[6] === 0 ? undefined : data[6],
        gasPrice: data[7] === 0 ? undefined : data[7],
        maxPriorityFeePerGas: data[8] === 0 ? undefined : data[8],
        maxFeePerGas: data[9] === 0 ? undefined : data[9],
        baseFeePerGas: data[10] === 0 ? undefined : data[10],
        l1Fee: data[11] === 0 ? undefined : data[11],
        l1FeeScalar: data[12] === 0 ? undefined : data[12],
        l1GasPrice: data[13] === 0 ? undefined : data[13],
        l1GasUsed: data[14] === 0 ? undefined : data[14],
        data: data[15] === 0 ? undefined : data[15],
        parsedData: data[16] === 0 ? undefined : data[16],
        internalTransfers: data[17] === 0 ? undefined : data[17],
    };
}
exports.unpackDataEthereumSpecific = unpackDataEthereumSpecific;
function dataBitcoinSpecific(data) {
    if (!data)
        return [];
    return [
        data.size || 0,
        data.vsize || 0,
        data.weight || 0,
        data.rbf || false,
        data.lockTime || 0,
        data.version || 0,
    ];
}
exports.dataBitcoinSpecific = dataBitcoinSpecific;
function unpackDataBitcoinSpecific(data) {
    if (!data || data.length === 0)
        return undefined;
    return {
        size: data[0] === 0 ? undefined : data[0],
        vsize: data[1] === 0 ? undefined : data[1],
        weight: data[2] === 0 ? undefined : data[2],
        rbf: data[3],
        lockTime: data[4] === 0 ? undefined : data[4],
        version: data[5] === 0 ? undefined : data[5],
    };
}
exports.unpackDataBitcoinSpecific = unpackDataBitcoinSpecific;
