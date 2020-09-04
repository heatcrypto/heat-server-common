import { EventStandardTypeData, EventFeeTypeData, EventOrderTypeData, EventLeaseBalanceTypeData, EventMessageTypeData } from './event-builders';
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
export declare function createEventData(event: {
    type: number;
    data: any;
}): any[];
export declare function dataStandardType(data: EventStandardTypeData): (string | number | undefined)[];
export declare function unpackDataStandardType(data: Array<any>): EventStandardTypeData;
export declare function dataEventFee(data: EventFeeTypeData): string[];
export declare function unpackDataEventFee(data: Array<any>): EventFeeTypeData;
export declare function dataOrderType(data: EventOrderTypeData): (string | import("./constants").AssetTypes)[];
export declare function unpackDataOrderType(data: Array<any>): EventOrderTypeData;
export declare function dataEventLeaseBalance(data: EventLeaseBalanceTypeData): (string | number | undefined)[];
export declare function unpackDataEventLeaseBalance(data: Array<any>): EventLeaseBalanceTypeData;
export declare function dataMessageType(data: EventMessageTypeData): any[];
export declare function unpackDataMessageType(data: Array<any>): EventMessageTypeData;
