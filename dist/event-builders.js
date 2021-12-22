"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEventMessageReceive = exports.buildEventMessageSend = exports.buildEventMessageType = exports.buildEventLeaseBalance = exports.buildEventCancelSell = exports.buildEventCancelBuy = exports.buildEventSellOrder = exports.buildEventBuyOrder = exports.buildEventOrderType = exports.buildEventFee = exports.buildEventInput = exports.buildEventOutput = exports.buildEventReceive = exports.buildEventSend = exports.buildEventStandardType = void 0;
var lodash_1 = require("lodash");
var constants_1 = require("./constants");
/**
 * Builds Standard Type
 * @param type
 * @param addrXpub
 * @param assetType
 * @param assetId
 * @param value
 * @param n
 * @param specific This contains blockchain specific information like blockbook's 'ethereumSpecific'
 */
function buildEventStandardType(type, addrXpub, assetType, assetId, value, n, specific) {
    return {
        type: type,
        assetType: assetType,
        assetId: assetId,
        data: {
            value: value,
            addrXpub: (0, lodash_1.isString)(addrXpub) ? addrXpub : addrXpub.addrXpub,
            publicKey: (0, lodash_1.isString)(addrXpub) ? undefined : addrXpub.publicKey,
            alias: (0, lodash_1.isString)(addrXpub) ? undefined : addrXpub.alias,
            n: (0, lodash_1.isUndefined)(n) ? 0 : n,
            specific: specific,
        },
    };
}
exports.buildEventStandardType = buildEventStandardType;
function buildEventSend(addrXpub, assetType, assetId, value, n, specific) {
    return buildEventStandardType(constants_1.EventTypes.EVENT_SEND, addrXpub, assetType, assetId, value, n, specific);
}
exports.buildEventSend = buildEventSend;
function buildEventReceive(addrXpub, assetType, assetId, value, n, specific) {
    return buildEventStandardType(constants_1.EventTypes.EVENT_RECEIVE, addrXpub, assetType, assetId, value, n, specific);
}
exports.buildEventReceive = buildEventReceive;
function buildEventOutput(addrXpub, assetType, assetId, value, n, specific) {
    return buildEventStandardType(constants_1.EventTypes.EVENT_OUTPUT, addrXpub, assetType, assetId, value, n, specific);
}
exports.buildEventOutput = buildEventOutput;
function buildEventInput(addrXpub, assetType, assetId, value, n, specific) {
    return buildEventStandardType(constants_1.EventTypes.EVENT_INPUT, addrXpub, assetType, assetId, value, n, specific);
}
exports.buildEventInput = buildEventInput;
/**
 * Builds EVENT_FEE
 * @param value
 * @param assetType [Optional, de]
 * @param assetId
 */
function buildEventFee(value, assetType, assetId) {
    if (assetType === void 0) { assetType = constants_1.AssetTypes.NATIVE; }
    if (assetId === void 0) { assetId = constants_1.NULL; }
    return {
        type: constants_1.EventTypes.EVENT_FEE,
        assetType: assetType,
        assetId: assetId,
        data: {
            value: value,
        },
    };
}
exports.buildEventFee = buildEventFee;
/**
 * Builds Order Type
 * @param type
 * @param assetType
 * @param assetId
 * @param currencyType
 * @param currencyId
 * @param quantity
 * @param price
 */
function buildEventOrderType(type, assetType, assetId, currencyType, currencyId, quantity, price) {
    return {
        type: type,
        assetType: assetType,
        assetId: assetId,
        data: {
            currencyType: currencyType,
            currencyId: currencyId,
            quantity: quantity,
            price: price,
        },
    };
}
exports.buildEventOrderType = buildEventOrderType;
function buildEventBuyOrder(assetType, assetId, currencyType, currencyId, quantity, price) {
    return buildEventOrderType(constants_1.EventTypes.EVENT_BUY_ORDER, assetType, assetId, currencyType, currencyId, quantity, price);
}
exports.buildEventBuyOrder = buildEventBuyOrder;
function buildEventSellOrder(assetType, assetId, currencyType, currencyId, quantity, price) {
    return buildEventOrderType(constants_1.EventTypes.EVENT_SELL_ORDER, assetType, assetId, currencyType, currencyId, quantity, price);
}
exports.buildEventSellOrder = buildEventSellOrder;
function buildEventCancelBuy(assetType, assetId, currencyType, currencyId, quantity, price) {
    return buildEventOrderType(constants_1.EventTypes.EVENT_CANCEL_BUY_ORDER, assetType, assetId, currencyType, currencyId, quantity, price);
}
exports.buildEventCancelBuy = buildEventCancelBuy;
function buildEventCancelSell(assetType, assetId, currencyType, currencyId, quantity, price) {
    return buildEventOrderType(constants_1.EventTypes.EVENT_CANCEL_SELL_ORDER, assetType, assetId, currencyType, currencyId, quantity, price);
}
exports.buildEventCancelSell = buildEventCancelSell;
/**
 * Builds EVENT_LEASE_BALANCE
 * @param addrXpub
 * @param period
 * @param assetType
 * @param assetId
 */
function buildEventLeaseBalance(addrXpub, period, assetType, assetId) {
    if (assetType === void 0) { assetType = constants_1.AssetTypes.NATIVE; }
    if (assetId === void 0) { assetId = constants_1.NULL; }
    return {
        type: constants_1.EventTypes.EVENT_LEASE_BALANCE,
        assetType: assetType,
        assetId: assetId,
        data: {
            period: period,
            addrXpub: (0, lodash_1.isString)(addrXpub) ? addrXpub : addrXpub.addrXpub,
            publicKey: (0, lodash_1.isString)(addrXpub) ? undefined : addrXpub.publicKey,
            alias: (0, lodash_1.isString)(addrXpub) ? undefined : addrXpub.alias,
        },
    };
}
exports.buildEventLeaseBalance = buildEventLeaseBalance;
/**
 * Builds Message Type
 * @param type
 * @param addrXpub
 * @param message
 */
function buildEventMessageType(type, addrXpub, message) {
    return {
        type: type,
        assetType: constants_1.AssetTypes.NATIVE,
        assetId: constants_1.NULL,
        data: {
            addrXpub: (0, lodash_1.isString)(addrXpub) ? addrXpub : addrXpub.addrXpub,
            publicKey: (0, lodash_1.isString)(addrXpub) ? undefined : addrXpub.publicKey,
            alias: (0, lodash_1.isString)(addrXpub) ? undefined : addrXpub.alias,
            isText: message.isText,
            message: (0, lodash_1.isObjectLike)(message.encryptedMessage)
                ? message.encryptedMessage
                : message.message,
        },
    };
}
exports.buildEventMessageType = buildEventMessageType;
function buildEventMessageSend(addrXpub, message) {
    return buildEventMessageType(constants_1.EventTypes.EVENT_MESSAGE_SEND, addrXpub, message);
}
exports.buildEventMessageSend = buildEventMessageSend;
function buildEventMessageReceive(addrXpub, message) {
    return buildEventMessageType(constants_1.EventTypes.EVENT_MESSAGE_RECEIVE, addrXpub, message);
}
exports.buildEventMessageReceive = buildEventMessageReceive;
