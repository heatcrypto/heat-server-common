"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackDataDgsRefund = exports.dataDgsRefund = exports.unpackDataDgsDelivery = exports.dataDgsDelivery = exports.unpackDataDgsPurchase = exports.dataDgsPurchase = exports.unpackDataMessageType = exports.dataMessageType = exports.unpackDataEventLeaseBalance = exports.dataEventLeaseBalance = exports.unpackDataOrderType = exports.dataOrderType = exports.unpackDataEventFee = exports.dataEventFee = exports.unpackDataStandardType = exports.dataStandardType = exports.createEventData = void 0;
var constants_1 = require("./constants");
var json_1 = require("./json");
var lodash_1 = require("lodash");
var logger_adapter_1 = require("./logger-adapter");
var _logger;
function getLogger() {
    if (!_logger) {
        _logger = (0, logger_adapter_1.createLogger)(__filename);
    }
    return _logger;
}
/**
 * Creates the {data} field (which is an array) based on an event created
 * with any one of the {event-builder.js} event builder methods.
 *
 * @param {{
 *   type:number,
 *   data:object
 * }} event
 * @returns {Array<any>}
 */
function createEventData(event) {
    switch (event.type) {
        case constants_1.EventTypes.EVENT_SEND:
        case constants_1.EventTypes.EVENT_RECEIVE:
        case constants_1.EventTypes.EVENT_OUTPUT:
        case constants_1.EventTypes.EVENT_INPUT:
            return dataStandardType(event.data);
        case constants_1.EventTypes.EVENT_FEE:
            return dataEventFee(event.data);
        case constants_1.EventTypes.EVENT_BUY_ORDER:
        case constants_1.EventTypes.EVENT_SELL_ORDER:
        case constants_1.EventTypes.EVENT_CANCEL_BUY_ORDER:
        case constants_1.EventTypes.EVENT_CANCEL_SELL_ORDER:
            return dataOrderType(event.data);
        case constants_1.EventTypes.EVENT_LEASE_BALANCE:
            return dataEventLeaseBalance(event.data);
        case constants_1.EventTypes.EVENT_MESSAGE_SEND:
        case constants_1.EventTypes.EVENT_MESSAGE_RECEIVE:
            return dataMessageType(event.data);
        case constants_1.EventTypes.EVENT_DGS_PURCHASE:
            return dataDgsPurchase(event.data);
        case constants_1.EventTypes.EVENT_DGS_DELIVERY:
            return dataDgsDelivery(event.data);
        case constants_1.EventTypes.EVENT_DGS_PREFUND:
            return dataDgsRefund(event.data);
    }
    getLogger().warn("Unknown Event Type", (0, json_1.prettyPrint)(event));
    return [];
}
exports.createEventData = createEventData;
function dataStandardType(data) {
    return [
        data.value,
        data.addrXpub,
        data.publicKey || 0,
        data.alias || 0,
        data.n,
        data.specific,
    ];
}
exports.dataStandardType = dataStandardType;
function unpackDataStandardType(data) {
    return {
        value: data[0],
        addrXpub: data[1],
        publicKey: data[2],
        alias: data[3],
        n: data[4],
        specific: data[5],
    };
}
exports.unpackDataStandardType = unpackDataStandardType;
function dataEventFee(data) {
    return [data.value];
}
exports.dataEventFee = dataEventFee;
function unpackDataEventFee(data) {
    return {
        value: data[0],
    };
}
exports.unpackDataEventFee = unpackDataEventFee;
function dataOrderType(data) {
    return [data.currencyType, data.currencyId, data.quantity, data.price];
}
exports.dataOrderType = dataOrderType;
function unpackDataOrderType(data) {
    return {
        currencyType: data[0],
        currencyId: data[1],
        quantity: data[2],
        price: data[3],
    };
}
exports.unpackDataOrderType = unpackDataOrderType;
function dataEventLeaseBalance(data) {
    return [data.period, data.addrXpub, data.publicKey || 0, data.alias || 0];
}
exports.dataEventLeaseBalance = dataEventLeaseBalance;
function unpackDataEventLeaseBalance(data) {
    return {
        period: data[0],
        addrXpub: data[1],
        publicKey: data[2],
        alias: data[3],
    };
}
exports.unpackDataEventLeaseBalance = unpackDataEventLeaseBalance;
function dataMessageType(data) {
    return [
        data.addrXpub,
        (0, lodash_1.isUndefined)(data.publicKey) ? 0 : data.publicKey,
        (0, lodash_1.isUndefined)(data.alias) ? 0 : data.alias,
        !!data.isText,
        (0, lodash_1.isString)(data.message) ? data.message : 0,
        (0, lodash_1.isObjectLike)(data.message)
            ? // @ts-ignore
                data.message["data"]
            : 0,
        (0, lodash_1.isObjectLike)(data.message)
            ? // @ts-ignore
                data.message["nonce"]
            : 0,
    ];
}
exports.dataMessageType = dataMessageType;
function unpackDataMessageType(data) {
    var _message = data[4], _data = data[5], nonce = data[6];
    var message;
    if ((0, lodash_1.isString)(_message)) {
        message = _message;
    }
    else {
        message = {
            data: _data,
            nonce: nonce,
        };
    }
    return {
        addrXpub: data[0],
        publicKey: data[1],
        alias: data[2],
        isText: data[3],
        message: message,
    };
}
exports.unpackDataMessageType = unpackDataMessageType;
function dataDgsPurchase(data) {
    return [
        data.goods,
        data.quantity,
        data.priceNQT,
        data.deliveryDeadlineTimestamp,
        data.seller,
    ];
}
exports.dataDgsPurchase = dataDgsPurchase;
function unpackDataDgsPurchase(data) {
    return {
        goods: data[0],
        quantity: data[1],
        priceNQT: data[2],
        deliveryDeadlineTimestamp: data[3],
        seller: data[4],
    };
}
exports.unpackDataDgsPurchase = unpackDataDgsPurchase;
function dataDgsDelivery(data) {
    return [
        data.purchase,
        data.goodsData,
        data.goodsNonce,
        data.discountNQT,
        data.goodsIsText,
        data.seller,
    ];
}
exports.dataDgsDelivery = dataDgsDelivery;
function unpackDataDgsDelivery(data) {
    return {
        purchase: data[0],
        goodsData: data[1],
        goodsNonce: data[2],
        discountNQT: data[3],
        goodsIsText: data[4],
        seller: data[5],
    };
}
exports.unpackDataDgsDelivery = unpackDataDgsDelivery;
function dataDgsRefund(data) {
    return [data.purchase, data.refundNQT, data.seller,];
}
exports.dataDgsRefund = dataDgsRefund;
function unpackDataDgsRefund(data) {
    return {
        purchase: data[0],
        refundNQT: data[1],
        seller: data[2],
    };
}
exports.unpackDataDgsRefund = unpackDataDgsRefund;
