// Must be in sync with
// https://github.com/heatcrypto/coin-registry/blob/master/registry/chains.json
export enum Blockchains {
  BITCOIN = 0,
  ETHEREUM = 1,
  HEAT = 2,
  LITECOIN = 3,
  BITCOIN_CASH = 4,
  FIMK = 5,
  HEAT_TEST = 6,
  BITCOIN_TEST = 7,
}

export function txnIsConfirmed(blockchain: Blockchains, confirmations: number) {
  const config = BlockchainConfig[blockchain];
  return confirmations > config.confirmed;
}

export enum SourceTypes {
  TRANSACTION = 0,
}

export enum EventTypes {
  EVENT_SEND = 1,
  EVENT_RECEIVE = 2,
  EVENT_OUTPUT = 3,
  EVENT_INPUT = 4,
  EVENT_FEE = 5,
  EVENT_BUY_ORDER = 6,
  EVENT_SELL_ORDER = 7,
  EVENT_CANCEL_BUY_ORDER = 8,
  EVENT_CANCEL_SELL_ORDER = 9,
  EVENT_LEASE_BALANCE = 10,
  EVENT_MESSAGE_SEND = 11,
  EVENT_MESSAGE_RECEIVE = 12,
}

export enum ExplorerTypes {
  TOKEN_DISCOVERY = 1,
  BALANCE_LOOKUP = 2,
  UTXO_LOOKUP = 3,
  EVENTS_LOOKUP = 4,
  BROADCAST_TRANSACTION = 5,
  TRANSACTION_STATUS = 6,
  RESOLVE_ALIAS = 7,
  REVERSE_RESOLVE_ALIAS = 8,
  NETWORK_FEE = 9,
  PUBLICKEY = 10,
  CUSTOM_HEAT_ACCOUNT = 11,
  NETWORK_STATUS = 12,
  NONCE_LOOKUP = 13,
  ESTIMATE_GAS = 14,
}

export enum AssetTypes {
  NATIVE = 0,
  TOKEN_TYPE_1 = 1,
}

export enum QuoteCurrencies {
  QUOTE_USD = 1,
  QUOTE_EUR = 2,
  QUOTE_BTC = 3,
}

export const NULL = '0';

export interface BlockchainInfo {
  broadcastRetry: number;
  statusRetry: number;
  confirmed: number;
  blockTime: number;
  feeBlocks: number;
}

export const BlockchainConfig: { [key: number]: BlockchainInfo } = {
  [Blockchains.ETHEREUM]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 60,
    blockTime: 20,
    feeBlocks: 3,
  },
  [Blockchains.BITCOIN]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 3,
    blockTime: 600,
    feeBlocks: 1,
  },
  [Blockchains.LITECOIN]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 5,
    blockTime: 150,
    feeBlocks: 2,
  },
  [Blockchains.BITCOIN_CASH]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 3,
    blockTime: 600,
    feeBlocks: 1,
  },
  [Blockchains.HEAT]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 30,
    blockTime: 30,
    feeBlocks: 1,
  },
  [Blockchains.HEAT_TEST]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 30,
    blockTime: 30,
    feeBlocks: 1,
  },
  [Blockchains.BITCOIN_TEST]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 10,
    blockTime: 600,
    feeBlocks: 1,
  },
  [Blockchains.FIMK]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 10,
    blockTime: 45,
    feeBlocks: 1,
  },
};
