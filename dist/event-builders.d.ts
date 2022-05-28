import { EventTypes, AssetTypes } from './constants';
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
    message: string | {
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
    sender: string;
}
export interface EventDgsDeliveryTypeData {
    purchase: string;
    goodsData: string;
    goodsNonce: string;
    discountNQT: string;
    goodsIsText: boolean;
    sender: string;
}
export interface EventDgsRefundTypeData {
    purchase: string;
    refundNQT: string;
    sender: string;
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
export declare function buildEventStandardType(type: EventTypes, addrXpub: ExtendedAddrXpub | string, assetType: AssetTypes, assetId: string, value: string, n: number, specific?: any): EventStandardType;
export declare function buildEventSend(addrXpub: ExtendedAddrXpub | string, assetType: AssetTypes, assetId: string, value: string, n: number, specific?: any): EventStandardType;
export declare function buildEventReceive(addrXpub: ExtendedAddrXpub | string, assetType: AssetTypes, assetId: string, value: string, n: number, specific?: any): EventStandardType;
export declare function buildEventOutput(addrXpub: ExtendedAddrXpub | string, assetType: AssetTypes, assetId: string, value: string, n: number, specific?: any): EventStandardType;
export declare function buildEventInput(addrXpub: ExtendedAddrXpub | string, assetType: AssetTypes, assetId: string, value: string, n: number, specific?: any): EventStandardType;
/**
 * Builds EVENT_FEE
 * @param value
 * @param assetType [Optional, de]
 * @param assetId
 */
export declare function buildEventFee(value: string, assetType?: AssetTypes, assetId?: string): EventFeeType;
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
export declare function buildEventOrderType(type: EventTypes, assetType: AssetTypes, assetId: string, currencyType: AssetTypes, currencyId: string, quantity: string, price: string): EventOrderType;
export declare function buildEventBuyOrder(assetType: AssetTypes, assetId: string, currencyType: AssetTypes, currencyId: string, quantity: string, price: string): EventOrderType;
export declare function buildEventSellOrder(assetType: AssetTypes, assetId: string, currencyType: AssetTypes, currencyId: string, quantity: string, price: string): EventOrderType;
export declare function buildEventCancelBuy(assetType: AssetTypes, assetId: string, currencyType: AssetTypes, currencyId: string, quantity: string, price: string): EventOrderType;
export declare function buildEventCancelSell(assetType: AssetTypes, assetId: string, currencyType: AssetTypes, currencyId: string, quantity: string, price: string): EventOrderType;
/**
 * Builds EVENT_LEASE_BALANCE
 * @param addrXpub
 * @param period
 * @param assetType
 * @param assetId
 */
export declare function buildEventLeaseBalance(addrXpub: ExtendedAddrXpub | string, period: number, assetType?: AssetTypes, assetId?: string): EventLeaseBalanceType;
/**
 * Builds Message Type
 * @param type
 * @param addrXpub
 * @param message
 */
export declare function buildEventMessageType(type: EventTypes, addrXpub: ExtendedAddrXpub | string, message: EncryptedMessage | PlainMessage): EventMessageType;
export declare function buildEventMessageSend(addrXpub: ExtendedAddrXpub | string, message: EncryptedMessage | PlainMessage): EventMessageType;
export declare function buildEventMessageReceive(addrXpub: ExtendedAddrXpub | string, message: EncryptedMessage | PlainMessage): EventMessageType;
export declare function buildEventDgsPurchase(goods: string, quantity: number, priceNQT: string, sender: string, deliveryDeadlineTimestamp: number, assetType?: AssetTypes, assetId?: string): EventDgsStandardType;
export declare function buildEventDgsDelivery(purchase: string, goodsData: string, goodsNonce: string, discountNQT: string, goodsIsText: boolean, sender: string, assetType?: AssetTypes, assetId?: string): EventDgsStandardType;
export declare function buildEventDgsRefund(purchase: string, refundNQT: string, sender: string, assetType?: AssetTypes, assetId?: string): EventDgsStandardType;
