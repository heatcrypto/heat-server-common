import { 
  EthereumSpecificData, 
  BitcoinSpecificData, 
  TransactionSpecificData 
} from "./types/specific-data";
import { TransactionDataTypes, Blockchains } from "./constants";

/**
 * Maps blockchain enum to transaction data type
 * @param blockchain - The blockchain enum value
 * @returns {TransactionDataTypes}
 */
export function getTransactionDataType(blockchain: Blockchains): TransactionDataTypes {
  switch (blockchain) {
    case Blockchains.BITCOIN:
    case Blockchains.BITCOIN_TEST:
    case Blockchains.BITCOIN_CASH:
    case Blockchains.LITECOIN:
    case Blockchains.DOGECOIN:
    case Blockchains.SYSCOIN:
      return TransactionDataTypes.BITCOIN_TYPE;
    
    case Blockchains.ETHEREUM:
    case Blockchains.ETHEREUM_GOERLI:
    case Blockchains.POLYGON:
    case Blockchains.POLYGON_MUMBAI:
    case Blockchains.FANTOM:
    case Blockchains.BINANCE_SMART_CHAIN:
    case Blockchains.AVALANCHE:
    case Blockchains.AVALANCHE_FUJI:
    case Blockchains.ARBITRUM:
    case Blockchains.OPTIMISM:
    case Blockchains.GNOSIS:
    case Blockchains.CELO:
    case Blockchains.MOONBEAM:
    case Blockchains.HARMONY:
      return TransactionDataTypes.ETHEREUM_TYPE;
    
    default:
      // For blockchains that haven't been categorized yet (HEAT, FIMK, SOLANA, TRON, etc.)
      // Return NONE to indicate no specific transaction data handling is implemented
      return TransactionDataTypes.NONE;
  }
}

/**
 * Creates transaction-specific data array for serialization based on blockchain type
 * @param specific - The blockchain-specific transaction data with type discriminator
 * @returns {Array<any>}
 */
export function createTransactionSpecificData(specific: TransactionSpecificData): Array<any> {
  switch (specific.type) {
    case TransactionDataTypes.ETHEREUM_TYPE:
      return dataEthereumSpecific(specific.data);
    case TransactionDataTypes.BITCOIN_TYPE:
      return dataBitcoinSpecific(specific.data);
    case TransactionDataTypes.NONE:
    default:
      return [];
  }
}

/**
 * Unpacks transaction-specific data array based on blockchain type
 * @param type - The blockchain architecture type
 * @param data - The serialized data array
 * @returns {TransactionSpecificData | undefined}
 */
export function unpackTransactionSpecificData(type: TransactionDataTypes, data: Array<any>): TransactionSpecificData | undefined {
  switch (type) {
    case TransactionDataTypes.ETHEREUM_TYPE: {
      const ethereumData = unpackDataEthereumSpecific(data);
      return ethereumData ? { type: TransactionDataTypes.ETHEREUM_TYPE, data: ethereumData } : undefined;
    }
    case TransactionDataTypes.BITCOIN_TYPE: {
      const bitcoinData = unpackDataBitcoinSpecific(data);
      return bitcoinData ? { type: TransactionDataTypes.BITCOIN_TYPE, data: bitcoinData } : undefined;
    }
    case TransactionDataTypes.NONE:
    default:
      return undefined;
  }
}

export function dataEthereumSpecific(data: EthereumSpecificData['data']) {
  if (!data) return [];
  return [
    data.type || 0,
    data.createdContract || 0,
    data.status,
    data.error || 0,
    data.nonce,
    data.gasLimit,
    data.gasUsed || 0,
    data.gasPrice || 0,
    data.maxPriorityFeePerGas || 0,
    data.maxFeePerGas || 0,
    data.baseFeePerGas || 0,
    data.l1Fee || 0,
    data.l1FeeScalar || 0,
    data.l1GasPrice || 0,
    data.l1GasUsed || 0,
    data.data || 0,
    data.parsedData || 0,
    data.internalTransfers || 0,
  ];
}

export function unpackDataEthereumSpecific(data: Array<any>): EthereumSpecificData['data'] | undefined {
  if (!data || data.length === 0) return undefined;
  return {
    type: data[0] === 0 ? undefined : data[0],
    createdContract: data[1] === 0 ? undefined : data[1],
    status: data[2],
    error: data[3] === 0 ? undefined : data[3],
    nonce: data[4],
    gasLimit: data[5],
    gasUsed: data[6] === 0 ? undefined : data[6],
    gasPrice: data[7] === 0 ? undefined : data[7],
    maxPriorityFeePerGas: data[8] === 0 ? undefined : data[8],
    maxFeePerGas: data[9] === 0 ? undefined : data[9],
    baseFeePerGas: data[10] === 0 ? undefined : data[10],
    l1Fee: data[11] === 0 ? undefined : data[11],
    l1FeeScalar: data[12] === 0 ? undefined : data[12],
    l1GasPrice: data[13] === 0 ? undefined : data[13],
    l1GasUsed: data[14] === 0 ? undefined : data[14],
    data: data[15] === 0 ? undefined : data[15],
    parsedData: data[16] === 0 ? undefined : data[16],
    internalTransfers: data[17] === 0 ? undefined : data[17],
  };
}

export function dataBitcoinSpecific(data: BitcoinSpecificData['data']) {
  if (!data) return [];
  return [
    data.size || 0,
    data.vsize || 0,
    data.weight || 0,
    data.rbf || false,
    data.lockTime || 0,
    data.version || 0,
  ];
}

export function unpackDataBitcoinSpecific(data: Array<any>): BitcoinSpecificData['data'] | undefined {
  if (!data || data.length === 0) return undefined;
  return {
    size: data[0] === 0 ? undefined : data[0],
    vsize: data[1] === 0 ? undefined : data[1],
    weight: data[2] === 0 ? undefined : data[2],
    rbf: data[3],
    lockTime: data[4] === 0 ? undefined : data[4],
    version: data[5] === 0 ? undefined : data[5],
  };
} 