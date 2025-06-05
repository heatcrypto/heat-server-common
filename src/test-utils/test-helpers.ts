import { TransactionDataTypes, Blockchains } from '../constants';
import { EthereumSpecificData, BitcoinSpecificData } from '../types/specific-data';

/**
 * Test data factories for consistent test data creation
 */
export class TestDataFactory {
  static createEthereumSpecificData(overrides: Partial<EthereumSpecificData['data']> = {}): EthereumSpecificData {
    return {
      type: TransactionDataTypes.ETHEREUM_TYPE,
      data: {
        status: 1,
        nonce: 42,
        gasLimit: '21000',
        gasUsed: '21000',
        gasPrice: '20000000000',
        ...overrides
      }
    };
  }

  static createBitcoinSpecificData(overrides: Partial<BitcoinSpecificData['data']> = {}): BitcoinSpecificData {
    return {
      type: TransactionDataTypes.BITCOIN_TYPE,
      data: {
        size: 250,
        vsize: 140,
        weight: 560,
        rbf: false,
        lockTime: 0,
        version: 2,
        ...overrides
      }
    };
  }

  static createMockEthereumTransaction() {
    return {
      sourceId: '0x1234567890abcdef',
      blockchain: Blockchains.ETHEREUM,
      timestamp: Date.now(),
      confirmations: 12,
      specific: this.createEthereumSpecificData()
    };
  }

  static createMockBitcoinTransaction() {
    return {
      sourceId: 'abcdef1234567890',
      blockchain: Blockchains.BITCOIN,
      timestamp: Date.now(),
      confirmations: 6,
      specific: this.createBitcoinSpecificData()
    };
  }
}

/**
 * Common test assertions
 */
export class TestAssertions {
  static assertValidEthereumData(data: EthereumSpecificData['data']) {
    expect(data).toBeDefined();
    expect(typeof data.status).toBe('number');
    expect(typeof data.nonce).toBe('number');
    expect(typeof data.gasLimit).toBe('string');
    expect(data.gasLimit).not.toBe('0');
  }

  static assertValidBitcoinData(data: BitcoinSpecificData['data']) {
    expect(data).toBeDefined();
    if (data.size !== undefined) expect(typeof data.size).toBe('number');
    if (data.vsize !== undefined) expect(typeof data.vsize).toBe('number');
    if (data.weight !== undefined) expect(typeof data.weight).toBe('number');
    expect(typeof data.rbf).toBe('boolean');
  }

  static assertArrayIsSerializedData(arr: any[]) {
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBeGreaterThan(0);
    expect(Object.values(TransactionDataTypes)).toContain(arr[0]);
  }
}

/**
 * Mock implementations for testing
 */
export class TestMocks {
  static createMockLogger() {
    return {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn()
    };
  }

  static createMockMonitoredRequest() {
    return {
      get: jest.fn().mockResolvedValue({ data: 'mock response' }),
      post: jest.fn().mockResolvedValue({ data: 'mock response' }),
      put: jest.fn().mockResolvedValue({ data: 'mock response' }),
      delete: jest.fn().mockResolvedValue({ data: 'mock response' })
    };
  }
}

/**
 * Test utilities
 */
export class TestUtils {
  static async waitFor(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static expectEventuallyToBe<T>(
    getValue: () => T, 
    expectedValue: T, 
    timeout = 5000,
    interval = 100
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const check = () => {
        const value = getValue();
        if (value === expectedValue) {
          resolve();
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          reject(new Error(`Expected ${value} to eventually be ${expectedValue}`));
          return;
        }
        
        setTimeout(check, interval);
      };
      
      check();
    });
  }

  static generateRandomHex(length: number): string {
    return '0x' + Array.from({ length }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  }

  static generateRandomAddress(): string {
    return this.generateRandomHex(40);
  }

  static generateRandomTransactionId(): string {
    return this.generateRandomHex(64);
  }
}

/**
 * Performance testing utilities
 */
export class PerformanceTestUtils {
  static async measureExecutionTime<T>(fn: () => Promise<T>): Promise<{ result: T; duration: number }> {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;
    return { result, duration };
  }

  static async benchmarkFunction<T>(
    fn: () => Promise<T>, 
    iterations: number = 100
  ): Promise<{ averageDuration: number; minDuration: number; maxDuration: number }> {
    const durations: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const { duration } = await this.measureExecutionTime(fn);
      durations.push(duration);
    }
    
    return {
      averageDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations)
    };
  }
}

// This export prevents Jest from treating this file as a test file
export default {
  TestDataFactory,
  TestAssertions,
  TestMocks,
  TestUtils,
  PerformanceTestUtils
}; 