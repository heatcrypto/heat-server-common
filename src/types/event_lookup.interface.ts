import { Blockchains, AssetTypes, SourceTypes, EventTypes } from '../constants'
import {
  EventStandardTypeData, EventFeeTypeData, EventOrderTypeData,
  EventLeaseBalanceTypeData, EventMessageTypeData, EventInternalTransferTypeData
} from '../event-builders'
import { TransactionSpecificData } from './specific-data'

export interface EventLookupParam {
  /**
   * Enum of blockchain identifiers
   */
  blockchain: Blockchains,

  /**
   * Enum of asset or token types
   */
  assetType: AssetTypes,

  /**
   * Unique identifier (erc20 contract addr, or '0' for native currency)
   */
  assetId: string;

  /**
   * Address or public key
   */
  addrXpub: string,

  /**
   * Zero indexed, events are ordered chronologically. 
   * The zero'd event is the newest
   */
  from: number,

  /**
   * Events in range [from, to] are returned
   */
  to: number,

  /**
   * Optional. Minimal indicates no event details are returned, only event identifiers
   */
  minimal?: boolean,
}

export interface EventLookupResult {

  /**
   * Unix timestamp (ms since epoch)
   */
  timestamp: number;

  /**
   * The tranasaction id
   */
  sourceId: string;

  /**
   * Enum of sourcetypes, always 0=TRANSACTION at this stage
   */
  sourceType: SourceTypes;

  /**
   * Number of confirmations. 
   * 0 means unconfirmed/in mem-pool
   * 1 in latest block
   * 2 in previous block
   * etc ..
   */
  confirmations: number;

  /**
   * Lists events related to the input address, event contents always 
   * are relative to the input address. If for instance this transaction 
   * was send by the input address, the address in the event will be the 
   * recipient and vice versa.
   */
  events: Array<EventLookupEvent>;

  /**
   * Optional blockchain-specific transaction data with type discriminator
   */
  specific?: TransactionSpecificData;
}

export interface EventLookupEvent {

  /**
   * Enum event type (see Event Types)
   */
  type: EventTypes;

  /**
   * Enum of asset or token types
   */
  assetType: AssetTypes;

  /**
   * Unique identifier (erc20 contract addr, or '0' for native currency)
   */
  assetId: string;

  /**
   * Event data payload which differs based on the event type (see Event Types)
   */
  data: EventStandardTypeData | EventFeeTypeData | EventOrderTypeData |
  EventLeaseBalanceTypeData | EventMessageTypeData | EventInternalTransferTypeData;
}