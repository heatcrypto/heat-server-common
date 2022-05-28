import { isString, isUndefined, isObjectLike } from 'lodash';
import { EventTypes, AssetTypes, NULL } from './constants';

export interface EventStandardType {
  type: EventTypes;
  assetType: AssetTypes;
  assetId: string;
  data: EventStandardTypeData;
}

export interface EventStandardTypeData {
  value: string;
  addrXpub: string | undefined;
  publicKey: string | undefined;
  alias: string | undefined;
  n: number;
  specific?: any;
}

export interface ExtendedAddrXpub {
  addrXpub: string;
  publicKey: string;
  alias?: string;
}

export interface EventFeeType {
  type: EventTypes;
  assetType: AssetTypes;
  assetId: string;
  data: EventFeeTypeData;
}

export interface EventFeeTypeData {
  value: string;
}

export interface EventOrderType {
  type: EventTypes;
  assetType: AssetTypes;
  assetId: string;
  data: EventOrderTypeData;
}

export interface EventOrderTypeData {
  currencyType: AssetTypes;
  currencyId: string;
  quantity: string;
  price: string;
}

export interface EventLeaseBalanceType {
  type: EventTypes;
  assetType: AssetTypes;
  assetId: string;
  data: EventLeaseBalanceTypeData;
}

export interface EventLeaseBalanceTypeData {
  period: number;
  addrXpub: string | undefined;
  publicKey: string | undefined;
  alias: string | undefined;
}

export interface EncryptedMessage {
  encryptedMessage: {
    data: string;
    nonce: string;
  };
  isText: boolean;
}

export interface PlainMessage {
  message: string;
  isText: boolean;
}

export interface EventMessageType {
  type: EventTypes;
  assetType: AssetTypes;
  assetId: string;
  data: EventMessageTypeData;
}

export interface EventMessageTypeData {
  addrXpub: string | undefined;
  publicKey: string | undefined;
  alias: string | undefined;
  isText: boolean;
  message:
    | string
    | {
        data: string;
        nonce: string;
      };
}

export interface EventDgsStandardType {
  type: EventTypes;
  assetType: AssetTypes;
  assetId: string;
  data: EventDgsPurchaseTypeData | EventDgsDeliveryTypeData | EventDgsRefundTypeData;
}

export interface EventDgsPurchaseTypeData {
  goods: string;
  quantity: number;
  priceNQT: string;
  deliveryDeadlineTimestamp: number;
  seller: string;
}

export interface EventDgsDeliveryTypeData {
  purchase: string;
  goodsData: string;
  goodsNonce: string;
  discountNQT: string;
  goodsIsText: boolean;
  seller: string;
}

export interface EventDgsRefundTypeData {
  purchase: string;
  refundNQT: string;
  seller: string;
}

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
export function buildEventStandardType(
  type: EventTypes,
  addrXpub: ExtendedAddrXpub | string,
  assetType: AssetTypes,
  assetId: string,
  value: string,
  n: number,
  specific?: any
): EventStandardType {
  return {
    type,
    assetType,
    assetId,
    data: {
      value,
      addrXpub: isString(addrXpub) ? addrXpub : addrXpub.addrXpub,
      publicKey: isString(addrXpub) ? undefined : addrXpub.publicKey,
      alias: isString(addrXpub) ? undefined : addrXpub.alias,
      n: isUndefined(n) ? 0 : n,
      specific: specific,
    },
  };
}

export function buildEventSend(
  addrXpub: ExtendedAddrXpub | string,
  assetType: AssetTypes,
  assetId: string,
  value: string,
  n: number,
  specific?: any,
) {
  return buildEventStandardType(
    EventTypes.EVENT_SEND,
    addrXpub,
    assetType,
    assetId,
    value,
    n,
    specific,
  );
}

export function buildEventReceive(
  addrXpub: ExtendedAddrXpub | string,
  assetType: AssetTypes,
  assetId: string,
  value: string,
  n: number,
  specific?: any,
) {
  return buildEventStandardType(
    EventTypes.EVENT_RECEIVE,
    addrXpub,
    assetType,
    assetId,
    value,
    n,
    specific,
  );
}

export function buildEventOutput(
  addrXpub: ExtendedAddrXpub | string,
  assetType: AssetTypes,
  assetId: string,
  value: string,
  n: number,
  specific?: any,
) {
  return buildEventStandardType(
    EventTypes.EVENT_OUTPUT,
    addrXpub,
    assetType,
    assetId,
    value,
    n,
    specific,
  );
}

export function buildEventInput(
  addrXpub: ExtendedAddrXpub | string,
  assetType: AssetTypes,
  assetId: string,
  value: string,
  n: number,
  specific?: any,
) {
  return buildEventStandardType(
    EventTypes.EVENT_INPUT,
    addrXpub,
    assetType,
    assetId,
    value,
    n,
    specific,
  );
}

/**
 * Builds EVENT_FEE
 * @param value
 * @param assetType [Optional, de]
 * @param assetId
 */
export function buildEventFee(
  value: string,
  assetType: AssetTypes = AssetTypes.NATIVE,
  assetId: string = NULL,
): EventFeeType {
  return {
    type: EventTypes.EVENT_FEE,
    assetType,
    assetId,
    data: {
      value,
    },
  };
}

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
export function buildEventOrderType(
  type: EventTypes,
  assetType: AssetTypes,
  assetId: string,
  currencyType: AssetTypes,
  currencyId: string,
  quantity: string,
  price: string,
): EventOrderType {
  return {
    type,
    assetType,
    assetId,
    data: {
      currencyType,
      currencyId,
      quantity,
      price,
    },
  };
}

export function buildEventBuyOrder(
  assetType: AssetTypes,
  assetId: string,
  currencyType: AssetTypes,
  currencyId: string,
  quantity: string,
  price: string,
) {
  return buildEventOrderType(
    EventTypes.EVENT_BUY_ORDER,
    assetType,
    assetId,
    currencyType,
    currencyId,
    quantity,
    price,
  );
}

export function buildEventSellOrder(
  assetType: AssetTypes,
  assetId: string,
  currencyType: AssetTypes,
  currencyId: string,
  quantity: string,
  price: string,
) {
  return buildEventOrderType(
    EventTypes.EVENT_SELL_ORDER,
    assetType,
    assetId,
    currencyType,
    currencyId,
    quantity,
    price,
  );
}

export function buildEventCancelBuy(
  assetType: AssetTypes,
  assetId: string,
  currencyType: AssetTypes,
  currencyId: string,
  quantity: string,
  price: string,
) {
  return buildEventOrderType(
    EventTypes.EVENT_CANCEL_BUY_ORDER,
    assetType,
    assetId,
    currencyType,
    currencyId,
    quantity,
    price,
  );
}

export function buildEventCancelSell(
  assetType: AssetTypes,
  assetId: string,
  currencyType: AssetTypes,
  currencyId: string,
  quantity: string,
  price: string,
) {
  return buildEventOrderType(
    EventTypes.EVENT_CANCEL_SELL_ORDER,
    assetType,
    assetId,
    currencyType,
    currencyId,
    quantity,
    price,
  );
}

/**
 * Builds EVENT_LEASE_BALANCE
 * @param addrXpub
 * @param period
 * @param assetType
 * @param assetId
 */
export function buildEventLeaseBalance(
  addrXpub: ExtendedAddrXpub | string,
  period: number,
  assetType: AssetTypes = AssetTypes.NATIVE,
  assetId: string = NULL,
): EventLeaseBalanceType {
  return {
    type: EventTypes.EVENT_LEASE_BALANCE,
    assetType,
    assetId,
    data: {
      period,
      addrXpub: isString(addrXpub) ? addrXpub : addrXpub.addrXpub,
      publicKey: isString(addrXpub) ? undefined : addrXpub.publicKey,
      alias: isString(addrXpub) ? undefined : addrXpub.alias,
    },
  };
}

/**
 * Builds Message Type
 * @param type
 * @param addrXpub
 * @param message
 */
export function buildEventMessageType(
  type: EventTypes,
  addrXpub: ExtendedAddrXpub | string,
  message: EncryptedMessage | PlainMessage,
): EventMessageType {
  return {
    type,
    assetType: AssetTypes.NATIVE,
    assetId: NULL,
    data: {
      addrXpub: isString(addrXpub) ? addrXpub : addrXpub.addrXpub,
      publicKey: isString(addrXpub) ? undefined : addrXpub.publicKey,
      alias: isString(addrXpub) ? undefined : addrXpub.alias,
      isText: message.isText,
      message: isObjectLike((<EncryptedMessage>message).encryptedMessage)
        ? (<EncryptedMessage>message).encryptedMessage
        : (<PlainMessage>message).message,
    },
  };
}

export function buildEventMessageSend(
  addrXpub: ExtendedAddrXpub | string,
  message: EncryptedMessage | PlainMessage,
) {
  return buildEventMessageType(
    EventTypes.EVENT_MESSAGE_SEND,
    addrXpub,
    message,
  );
}

export function buildEventMessageReceive(
  addrXpub: ExtendedAddrXpub | string,
  message: EncryptedMessage | PlainMessage,
) {
  return buildEventMessageType(
    EventTypes.EVENT_MESSAGE_RECEIVE,
    addrXpub,
    message,
  );
}

export function buildEventDgsPurchase(
  goods: string,
  quantity: number,
  priceNQT: string,
  seller: string,
  deliveryDeadlineTimestamp: number,
  assetType: AssetTypes = AssetTypes.NATIVE,
  assetId: string = NULL,    
): EventDgsStandardType {
  return {
    type: EventTypes.EVENT_DGS_PURCHASE,
    assetType,
    assetId,
    data: {
      goods,
      quantity,
      priceNQT,
      deliveryDeadlineTimestamp,
      seller,
    }
  }
}

export function buildEventDgsDelivery(
  purchase: string,
  goodsData: string,
  goodsNonce: string,
  discountNQT: string,
  goodsIsText: boolean,  
  seller: string,
  assetType: AssetTypes = AssetTypes.NATIVE,
  assetId: string = NULL,      
): EventDgsStandardType {
  return {
    type: EventTypes.EVENT_DGS_DELIVERY,
    assetType,
    assetId,
    data: {
      purchase,
      goodsData,
      goodsNonce,
      discountNQT,
      goodsIsText,
      seller,
    }
  }
}

export function buildEventDgsRefund(
  purchase: string,
  refundNQT: string,  
  seller: string,
  assetType: AssetTypes = AssetTypes.NATIVE,
  assetId: string = NULL,    
): EventDgsStandardType {
  return {
    type: EventTypes.EVENT_DGS_PREFUND,
    assetType,
    assetId,
    data: {
      purchase,
      refundNQT,
      seller,
    }
  }
}