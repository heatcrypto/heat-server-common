// Global test setup file

// Extend Jest matchers
expect.extend({
  toBeValidEthereumAddress(received: string) {
    const ethAddressPattern = /^0x[a-fA-F0-9]{40}$/;
    const pass = ethAddressPattern.test(received);
    
    return {
      message: () => 
        `expected ${received} ${pass ? 'not ' : ''}to be a valid Ethereum address`,
      pass,
    };
  },
  
  toBeValidTransactionHash(received: string) {
    const txHashPattern = /^(0x)?[a-fA-F0-9]{64}$/;
    const pass = txHashPattern.test(received);
    
    return {
      message: () => 
        `expected ${received} ${pass ? 'not ' : ''}to be a valid transaction hash`,
      pass,
    };
  },

  toBeValidGasValue(received: string) {
    const pass = /^\d+$/.test(received) && BigInt(received) > 0n;
    
    return {
      message: () => 
        `expected ${received} ${pass ? 'not ' : ''}to be a valid gas value (positive integer string)`,
      pass,
    };
  },

  toHaveValidTimestamp(received: any) {
    const timestamp = typeof received === 'string' ? parseInt(received) : received;
    const now = Date.now();
    const oneYearAgo = now - (365 * 24 * 60 * 60 * 1000);
    const oneYearFromNow = now + (365 * 24 * 60 * 60 * 1000);
    
    const pass = typeof timestamp === 'number' && 
                 timestamp >= oneYearAgo && 
                 timestamp <= oneYearFromNow;
    
    return {
      message: () => 
        `expected ${received} ${pass ? 'not ' : ''}to be a valid timestamp`,
      pass,
    };
  }
});

// Global test configuration
beforeAll(() => {
  // Set timezone to UTC for consistent test results
  process.env.TZ = 'UTC';
  
  // Set up global test timeouts
  jest.setTimeout(10000);
  
  // Suppress console.log during tests unless explicitly needed
  // Commented out to allow individual tests to handle console mocking
  // if (!process.env.VERBOSE_TESTS) {
  //   jest.spyOn(console, 'log').mockImplementation(() => {});
  //   jest.spyOn(console, 'warn').mockImplementation(() => {});
  // }
});

// Clean up after each test
afterEach(() => {
  // Clear all timers
  jest.clearAllTimers();
  jest.useRealTimers();
  
  // Reset modules to prevent state leakage
  jest.resetModules();
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Fail the test
  throw reason;
});

// Declare extended matchers for TypeScript
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidEthereumAddress(): R;
      toBeValidTransactionHash(): R;
      toBeValidGasValue(): R;
      toHaveValidTimestamp(): R;
    }
  }
}

export {}; 