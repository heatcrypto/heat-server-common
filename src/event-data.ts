import { EventTypes } from './constants';
import {
  EventStandardTypeData,
  EventFeeTypeData,
  EventOrderTypeData,
  EventLeaseBalanceTypeData,
  EventMessageTypeData,
} from './event-builders';
import { prettyPrint } from './json';
import { isString, isUndefined, isObjectLike } from 'lodash';
import { LoggerService } from './types/logger.interface';
import { createLogger } from './logger-adapter';

let _logger: LoggerService;
function getLogger(): LoggerService {
  if (!_logger) {
    _logger = createLogger(__filename)
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
export function createEventData(event: { type: number, data: any }) {
  switch (event.type) {
    case EventTypes.EVENT_SEND:
    case EventTypes.EVENT_RECEIVE:
    case EventTypes.EVENT_OUTPUT:
    case EventTypes.EVENT_INPUT:
      return dataStandardType(event.data);
    case EventTypes.EVENT_FEE:
      return dataEventFee(event.data);
    case EventTypes.EVENT_BUY_ORDER:
    case EventTypes.EVENT_SELL_ORDER:
    case EventTypes.EVENT_CANCEL_BUY_ORDER:
    case EventTypes.EVENT_CANCEL_SELL_ORDER:
      return dataOrderType(event.data);
    case EventTypes.EVENT_LEASE_BALANCE:
      return dataEventLeaseBalance(event.data);
    case EventTypes.EVENT_MESSAGE_SEND:
    case EventTypes.EVENT_MESSAGE_RECEIVE:
      return dataMessageType(event.data);
  }
  getLogger().warn('Unknown Event Type', prettyPrint(event));
  return [];
}

export function dataStandardType(data: EventStandardTypeData) {
  return [
    data.value,
    data.addrXpub,
    data.publicKey || 0,
    data.alias || 0,
    data.n,
    data.specific,
  ];
}

export function unpackDataStandardType(
  data: Array<any>,
): EventStandardTypeData {
  return {
    value: data[0],
    addrXpub: data[1],
    publicKey: data[2],
    alias: data[3],
    n: data[4],
    specific: data[5],
  };
}

export function dataEventFee(data: EventFeeTypeData) {
  return [data.value];
}

export function unpackDataEventFee(data: Array<any>): EventFeeTypeData {
  return {
    value: data[0],
  };
}

export function dataOrderType(data: EventOrderTypeData) {
  return [data.currencyType, data.currencyId, data.quantity, data.price];
}

export function unpackDataOrderType(data: Array<any>): EventOrderTypeData {
  return {
    currencyType: data[0],
    currencyId: data[1],
    quantity: data[2],
    price: data[3],
  };
}

export function dataEventLeaseBalance(data: EventLeaseBalanceTypeData) {
  return [data.period, data.addrXpub, data.publicKey || 0, data.alias || 0];
}

export function unpackDataEventLeaseBalance(
  data: Array<any>,
): EventLeaseBalanceTypeData {
  return {
    period: data[0],
    addrXpub: data[1],
    publicKey: data[2],
    alias: data[3],
  };
}

export function dataMessageType(data: EventMessageTypeData) {
  return [
    data.addrXpub,
    isUndefined(data.publicKey) ? 0 : data.publicKey,
    isUndefined(data.alias) ? 0 : data.alias,
    !!data.isText,
    isString(data.message) ? data.message : 0,    
    isObjectLike(data.message) ? 
      // @ts-ignore
      data.message['data'] 
      : 0,
    isObjectLike(data.message) ? 
      // @ts-ignore
      data.message['nonce'] : 
      0,
  ];
}

export function unpackDataMessageType(data: Array<any>): EventMessageTypeData {
  const _message = data[4],
    _data = data[5],
    nonce = data[6];
  let message;
  if (isString(_message)) {
    message = _message;
  } else {
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
