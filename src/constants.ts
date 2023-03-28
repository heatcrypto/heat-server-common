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
  POLYGON = 8,
  FANTOM = 9,
  BINANCE_SMART_CHAIN = 10,
  AVALANCHE = 11,
  ARBITRUM = 12,
  OPTIMISM = 13,
  SOLANA = 14,
  GNOSIS = 15,
  CELO = 16,
  APTOS = 17,
  MOONBEAM = 18,
  HARMONY = 19,
  TRON = 20,
  SYSCOIN = 21,
  FILECOIN = 22,
  POLKADOT = 23,
  KUSAME = 24,
  ETHEREUM_GOERLI = 25,
  POLYGON_MUMBAI = 26,
  AVALANCHE_FUJI = 27,
  DOGECOIN = 28,
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
  // Digital Goods Store (FIMK)
  EVENT_DGS_PURCHASE = 13,
  EVENT_DGS_DELIVERY = 14,
  EVENT_DGS_PREFUND = 15,
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
  TXIDS = 15,
  UTXO_XPUB = 16,
  XPUB = 17,
  CUSTOM_FIMK_DGS_GOOD = 18,
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

const evmInfo: BlockchainInfo = {
  broadcastRetry: 10,
  statusRetry: 10,
  confirmed: 60,
  blockTime: 20,
  feeBlocks: 3,
}

export const BlockchainConfig: { [key: number]: BlockchainInfo } = {
  [Blockchains.ETHEREUM]:evmInfo,
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
  [Blockchains.POLYGON]: evmInfo,
  [Blockchains.FANTOM]: evmInfo,
  [Blockchains.BINANCE_SMART_CHAIN]: evmInfo,
  [Blockchains.AVALANCHE]: evmInfo,
  [Blockchains.ARBITRUM]: evmInfo,
  [Blockchains.OPTIMISM]: evmInfo,
  [Blockchains.SOLANA]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 60,
    blockTime: 20,
    feeBlocks: 3,
  },
  [Blockchains.GNOSIS]: evmInfo,
  [Blockchains.CELO]: evmInfo,
  [Blockchains.APTOS]: evmInfo,
  [Blockchains.MOONBEAM]: evmInfo,
  [Blockchains.HARMONY]: evmInfo,
  [Blockchains.TRON]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 60,
    blockTime: 20,
    feeBlocks: 3,
  },
  [Blockchains.SYSCOIN]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 60,
    blockTime: 20,
    feeBlocks: 3,
  },
  [Blockchains.FILECOIN]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 60,
    blockTime: 20,
    feeBlocks: 3,
  },
  [Blockchains.POLKADOT]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 60,
    blockTime: 20,
    feeBlocks: 3,
  },
  [Blockchains.KUSAME]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 60,
    blockTime: 20,
    feeBlocks: 3,
  },
  [Blockchains.DOGECOIN]: {
    broadcastRetry: 10,
    statusRetry: 10,
    confirmed: 5,
    blockTime: 60,
    feeBlocks: 2,
  },
};

