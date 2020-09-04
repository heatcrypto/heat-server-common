"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackDataMessageType = exports.dataMessageType = exports.unpackDataEventLeaseBalance = exports.dataEventLeaseBalance = exports.unpackDataOrderType = exports.dataOrderType = exports.unpackDataEventFee = exports.dataEventFee = exports.unpackDataStandardType = exports.dataStandardType = exports.createEventData = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("./constants");
var json_1 = require("./json");
var _ = __importStar(require("lodash"));
var logger = new common_1.Logger(__filename);
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
    }
    logger.warn('Unknown Event Type', json_1.prettyPrint(event));
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
        _.isUndefined(data.publicKey) ? 0 : data.publicKey,
        _.isUndefined(data.alias) ? 0 : data.alias,
        !!data.isText,
        _.isString(data.message) ? data.message : 0,
        // @ts-ignore
        _.isObjectLike(data.message) ? data.message['data'] : 0,
        // @ts-ignore
        _.isObjectLike(data.message) ? data.message['nonce'] : 0,
    ];
}
exports.dataMessageType = dataMessageType;
function unpackDataMessageType(data) {
    var _message = data[4], _data = data[5], nonce = data[6];
    var message;
    if (_.isString(_message)) {
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
