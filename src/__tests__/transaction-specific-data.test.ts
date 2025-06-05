import {
  getTransactionDataType,
  createTransactionSpecificData,
  unpackTransactionSpecificData,
  dataEthereumSpecific,
  unpackDataEthereumSpecific,
  dataBitcoinSpecific,
  unpackDataBitcoinSpecific
} from '../transaction-specific-data';
import { TransactionDataTypes, Blockchains } from '../constants';
import { EthereumSpecificData, BitcoinSpecificData, TransactionSpecificData } from '../types/specific-data';

describe('Transaction Specific Data', () => {
  
  describe('getTransactionDataType', () => {
    it('should return BITCOIN_TYPE for Bitcoin-based blockchains', () => {
      expect(getTransactionDataType(Blockchains.BITCOIN)).toBe(TransactionDataTypes.BITCOIN_TYPE);
      expect(getTransactionDataType(Blockchains.BITCOIN_TEST)).toBe(TransactionDataTypes.BITCOIN_TYPE);
      expect(getTransactionDataType(Blockchains.BITCOIN_CASH)).toBe(TransactionDataTypes.BITCOIN_TYPE);
      expect(getTransactionDataType(Blockchains.LITECOIN)).toBe(TransactionDataTypes.BITCOIN_TYPE);
      expect(getTransactionDataType(Blockchains.DOGECOIN)).toBe(TransactionDataTypes.BITCOIN_TYPE);
      expect(getTransactionDataType(Blockchains.SYSCOIN)).toBe(TransactionDataTypes.BITCOIN_TYPE);
    });

    it('should return ETHEREUM_TYPE for Ethereum-based blockchains', () => {
      expect(getTransactionDataType(Blockchains.ETHEREUM)).toBe(TransactionDataTypes.ETHEREUM_TYPE);
      expect(getTransactionDataType(Blockchains.ETHEREUM_GOERLI)).toBe(TransactionDataTypes.ETHEREUM_TYPE);
      expect(getTransactionDataType(Blockchains.POLYGON)).toBe(TransactionDataTypes.ETHEREUM_TYPE);
      expect(getTransactionDataType(Blockchains.BINANCE_SMART_CHAIN)).toBe(TransactionDataTypes.ETHEREUM_TYPE);
      expect(getTransactionDataType(Blockchains.AVALANCHE)).toBe(TransactionDataTypes.ETHEREUM_TYPE);
      expect(getTransactionDataType(Blockchains.ARBITRUM)).toBe(TransactionDataTypes.ETHEREUM_TYPE);
      expect(getTransactionDataType(Blockchains.OPTIMISM)).toBe(TransactionDataTypes.ETHEREUM_TYPE);
    });

    it('should return NONE for unsupported blockchains', () => {
      expect(getTransactionDataType(Blockchains.HEAT)).toBe(TransactionDataTypes.NONE);
      expect(getTransactionDataType(Blockchains.FIMK)).toBe(TransactionDataTypes.NONE);
      expect(getTransactionDataType(Blockchains.SOLANA)).toBe(TransactionDataTypes.NONE);
      expect(getTransactionDataType(Blockchains.TRON)).toBe(TransactionDataTypes.NONE);
    });
  });

  describe('createTransactionSpecificData', () => {
    it('should create array for ETHEREUM_TYPE', () => {
      const mockEthereumData: EthereumSpecificData = {
        type: TransactionDataTypes.ETHEREUM_TYPE,
        data: {
          status: 1,
          nonce: 42,
          gasLimit: '21000',
          gasUsed: '21000',
          gasPrice: '20000000000'
        }
      };

      const result = createTransactionSpecificData(mockEthereumData);
      
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBe(TransactionDataTypes.ETHEREUM_TYPE);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should create array for BITCOIN_TYPE', () => {
      const mockBitcoinData: BitcoinSpecificData = {
        type: TransactionDataTypes.BITCOIN_TYPE,
        data: {
          size: 250,
          vsize: 140,
          weight: 560,
          rbf: false,
          lockTime: 0,
          version: 2
        }
      };

      const result = createTransactionSpecificData(mockBitcoinData);
      
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBe(TransactionDataTypes.BITCOIN_TYPE);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should return minimal array for NONE type', () => {
      const mockNoneData: TransactionSpecificData = {
        type: TransactionDataTypes.NONE,
        data: {}
      };

      const result = createTransactionSpecificData(mockNoneData);
      
      expect(result).toEqual([TransactionDataTypes.NONE]);
    });
  });

  describe('unpackTransactionSpecificData', () => {
    it('should unpack ETHEREUM_TYPE data correctly', () => {
      const mockData = [
        TransactionDataTypes.ETHEREUM_TYPE,
        0, 0, 1, 0, 42, '21000', '21000', '20000000000', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ];

      const result = unpackTransactionSpecificData(TransactionDataTypes.ETHEREUM_TYPE, mockData);
      
      expect(result).toBeDefined();
      expect(result?.type).toBe(TransactionDataTypes.ETHEREUM_TYPE);
      if (result?.type === TransactionDataTypes.ETHEREUM_TYPE) {
        expect(result.data).toHaveProperty('status', 1);
        expect(result.data).toHaveProperty('nonce', 42);
        expect(result.data).toHaveProperty('gasLimit', '21000');
      }
    });

    it('should unpack BITCOIN_TYPE data correctly', () => {
      const mockData = [
        TransactionDataTypes.BITCOIN_TYPE,
        250, 140, 560, false, 0, 2
      ];

      const result = unpackTransactionSpecificData(TransactionDataTypes.BITCOIN_TYPE, mockData);
      
      expect(result).toBeDefined();
      expect(result?.type).toBe(TransactionDataTypes.BITCOIN_TYPE);
      if (result?.type === TransactionDataTypes.BITCOIN_TYPE) {
        expect(result.data).toHaveProperty('size', 250);
        expect(result.data).toHaveProperty('vsize', 140);
        expect(result.data).toHaveProperty('weight', 560);
        expect(result.data).toHaveProperty('rbf', false);
      }
    });

    it('should return undefined for NONE type', () => {
      const result = unpackTransactionSpecificData(TransactionDataTypes.NONE, []);
      expect(result).toBeUndefined();
    });

    it('should handle empty data arrays', () => {
      const result = unpackTransactionSpecificData(TransactionDataTypes.ETHEREUM_TYPE, []);
      expect(result).toBeUndefined();
    });
  });

  describe('dataEthereumSpecific', () => {
    it('should return empty array for null/undefined data', () => {
      expect(dataEthereumSpecific(null as any)).toEqual([]);
      expect(dataEthereumSpecific(undefined as any)).toEqual([]);
    });

    it('should serialize Ethereum data with defaults', () => {
      const mockData = {
        status: 1,
        nonce: 42,
        gasLimit: '21000'
      };

      const result = dataEthereumSpecific(mockData);
      
      expect(result).toHaveLength(18);
      expect(result[0]).toBe(0); // type defaults to 0
      expect(result[1]).toBe(0); // createdContract defaults to 0
      expect(result[2]).toBe(1); // status
      expect(result[3]).toBe(0); // error defaults to 0
      expect(result[4]).toBe(42); // nonce
      expect(result[5]).toBe('21000'); // gasLimit
    });

    it('should handle all optional fields', () => {
      const mockData = {
        type: 2,
        createdContract: '0x123...',
        status: 1,
        error: 'OutOfGas',
        nonce: 42,
        gasLimit: '21000',
        gasUsed: '20000',
        gasPrice: '20000000000',
        maxPriorityFeePerGas: '2000000000',
        maxFeePerGas: '30000000000',
        baseFeePerGas: '15000000000',
        l1Fee: '1000',
        l1FeeScalar: '0.684',
        l1GasPrice: '10000000000',
        l1GasUsed: '2100',
        data: '0xa9059cbb...',
        parsedData: { method: 'transfer' },
        internalTransfers: [{ from: '0x...', to: '0x...', value: '1000' }]
      };

      const result = dataEthereumSpecific(mockData);
      
      expect(result).toHaveLength(18);
      expect(result[0]).toBe(2);
      expect(result[1]).toBe('0x123...');
      expect(result[2]).toBe(1);
      expect(result[3]).toBe('OutOfGas');
    });
  });

  describe('unpackDataEthereumSpecific', () => {
    it('should return undefined for empty/null data', () => {
      expect(unpackDataEthereumSpecific([])).toBeUndefined();
      expect(unpackDataEthereumSpecific(null as any)).toBeUndefined();
      expect(unpackDataEthereumSpecific(undefined as any)).toBeUndefined();
    });

    it('should unpack minimal Ethereum data', () => {
      const mockData = [0, 0, 1, 0, 42, '21000', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      const result = unpackDataEthereumSpecific(mockData);
      
      expect(result).toBeDefined();
      expect(result?.type).toBeUndefined(); // 0 converts to undefined
      expect(result?.createdContract).toBeUndefined(); // 0 converts to undefined
      expect(result?.status).toBe(1);
      expect(result?.error).toBeUndefined(); // 0 converts to undefined
      expect(result?.nonce).toBe(42);
      expect(result?.gasLimit).toBe('21000');
    });

    it('should handle non-zero values correctly', () => {
      const mockData = [2, '0x123...', 1, 'Error', 42, '21000', '20000', '20000000000', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      const result = unpackDataEthereumSpecific(mockData);
      
      expect(result?.type).toBe(2);
      expect(result?.createdContract).toBe('0x123...');
      expect(result?.error).toBe('Error');
      expect(result?.gasUsed).toBe('20000');
    });
  });

  describe('dataBitcoinSpecific', () => {
    it('should return empty array for null/undefined data', () => {
      expect(dataBitcoinSpecific(null as any)).toEqual([]);
      expect(dataBitcoinSpecific(undefined as any)).toEqual([]);
    });

    it('should serialize Bitcoin data with defaults', () => {
      const mockData = {
        rbf: true
      };

      const result = dataBitcoinSpecific(mockData);
      
      expect(result).toHaveLength(6);
      expect(result[0]).toBe(0); // size defaults to 0
      expect(result[1]).toBe(0); // vsize defaults to 0
      expect(result[2]).toBe(0); // weight defaults to 0
      expect(result[3]).toBe(true); // rbf
      expect(result[4]).toBe(0); // lockTime defaults to 0
      expect(result[5]).toBe(0); // version defaults to 0
    });

    it('should handle all fields', () => {
      const mockData = {
        size: 250,
        vsize: 140,
        weight: 560,
        rbf: false,
        lockTime: 500000,
        version: 2
      };

      const result = dataBitcoinSpecific(mockData);
      
      expect(result).toEqual([250, 140, 560, false, 500000, 2]);
    });
  });

  describe('unpackDataBitcoinSpecific', () => {
    it('should return undefined for empty/null data', () => {
      expect(unpackDataBitcoinSpecific([])).toBeUndefined();
      expect(unpackDataBitcoinSpecific(null as any)).toBeUndefined();
      expect(unpackDataBitcoinSpecific(undefined as any)).toBeUndefined();
    });

    it('should unpack Bitcoin data correctly', () => {
      const mockData = [0, 0, 0, true, 0, 0];

      const result = unpackDataBitcoinSpecific(mockData);
      
      expect(result).toBeDefined();
      expect(result?.size).toBeUndefined(); // 0 converts to undefined
      expect(result?.vsize).toBeUndefined(); // 0 converts to undefined
      expect(result?.weight).toBeUndefined(); // 0 converts to undefined
      expect(result?.rbf).toBe(true);
      expect(result?.lockTime).toBeUndefined(); // 0 converts to undefined
      expect(result?.version).toBeUndefined(); // 0 converts to undefined
    });

    it('should handle non-zero values correctly', () => {
      const mockData = [250, 140, 560, false, 500000, 2];

      const result = unpackDataBitcoinSpecific(mockData);
      
      expect(result?.size).toBe(250);
      expect(result?.vsize).toBe(140);
      expect(result?.weight).toBe(560);
      expect(result?.rbf).toBe(false);
      expect(result?.lockTime).toBe(500000);
      expect(result?.version).toBe(2);
    });
  });

  describe('Round-trip serialization', () => {
    it('should maintain data integrity for Ethereum transactions', () => {
      const originalData: EthereumSpecificData = {
        type: TransactionDataTypes.ETHEREUM_TYPE,
        data: {
          type: 2,
          status: 1,
          nonce: 42,
          gasLimit: '21000',
          gasUsed: '20000',
          gasPrice: '20000000000'
        }
      };

      // Serialize
      const serialized = createTransactionSpecificData(originalData);
      
      // Unpack
      const unpacked = unpackTransactionSpecificData(TransactionDataTypes.ETHEREUM_TYPE, serialized);
      
      expect(unpacked?.type).toBe(originalData.type);
      if (unpacked?.type === TransactionDataTypes.ETHEREUM_TYPE) {
        expect(unpacked.data.type).toBe(originalData.data.type);
        expect(unpacked.data.status).toBe(originalData.data.status);
        expect(unpacked.data.nonce).toBe(originalData.data.nonce);
        expect(unpacked.data.gasLimit).toBe(originalData.data.gasLimit);
        expect(unpacked.data.gasUsed).toBe(originalData.data.gasUsed);
        expect(unpacked.data.gasPrice).toBe(originalData.data.gasPrice);
      }
    });

    it('should maintain data integrity for Bitcoin transactions', () => {
      const originalData: BitcoinSpecificData = {
        type: TransactionDataTypes.BITCOIN_TYPE,
        data: {
          size: 250,
          vsize: 140,
          weight: 560,
          rbf: true,
          lockTime: 500000,
          version: 2
        }
      };

      // Serialize
      const serialized = createTransactionSpecificData(originalData);
      
      // Unpack
      const unpacked = unpackTransactionSpecificData(TransactionDataTypes.BITCOIN_TYPE, serialized);
      
      expect(unpacked?.type).toBe(originalData.type);
      if (unpacked?.type === TransactionDataTypes.BITCOIN_TYPE) {
        expect(unpacked.data.size).toBe(originalData.data.size);
        expect(unpacked.data.vsize).toBe(originalData.data.vsize);
        expect(unpacked.data.weight).toBe(originalData.data.weight);
        expect(unpacked.data.rbf).toBe(originalData.data.rbf);
        expect(unpacked.data.lockTime).toBe(originalData.data.lockTime);
        expect(unpacked.data.version).toBe(originalData.data.version);
      }
    });
  });
}); 