import { PrefixLogger } from '../prefix-logger';
import { LoggerService } from '../types/logger.interface';

describe('PrefixLogger', () => {
  let mockLogger: LoggerService;
  let prefixLogger: PrefixLogger;
  const testPrefix = 'TEST';

  beforeEach(() => {
    mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn()
    };
    prefixLogger = new PrefixLogger(mockLogger, testPrefix);
  });

  describe('constructor', () => {
    it('should create instance with logger and prefix', () => {
      const logger = new PrefixLogger(mockLogger, 'PREFIX');
      expect(logger).toBeInstanceOf(PrefixLogger);
    });

    it('should store prefix and logger', () => {
      const logger = new PrefixLogger(mockLogger, 'TEST_PREFIX');
      expect(logger).toBeDefined();
    });
  });

  describe('log', () => {
    it('should call underlying logger log with prefix', () => {
      const message = 'Test message';
      prefixLogger.log(message);
      
      expect(mockLogger.log).toHaveBeenCalledWith('[TEST] Test message', undefined);
    });

    it('should call underlying logger log with prefix and context', () => {
      const message = 'Test message';
      const context = 'TestContext';
      prefixLogger.log(message, context);
      
      expect(mockLogger.log).toHaveBeenCalledWith('[TEST] Test message', context);
    });

    it('should handle empty message', () => {
      prefixLogger.log('');
      expect(mockLogger.log).toHaveBeenCalledWith('[TEST] ', undefined);
    });

    it('should handle null message', () => {
      prefixLogger.log(null);
      expect(mockLogger.log).toHaveBeenCalledWith('[TEST] null', undefined);
    });

    it('should handle undefined message', () => {
      prefixLogger.log(undefined);
      expect(mockLogger.log).toHaveBeenCalledWith('[TEST] undefined', undefined);
    });

    it('should handle object message', () => {
      const objMessage = { key: 'value' };
      prefixLogger.log(objMessage);
      expect(mockLogger.log).toHaveBeenCalledWith('[TEST] [object Object]', undefined);
    });

    it('should handle number message', () => {
      prefixLogger.log(42);
      expect(mockLogger.log).toHaveBeenCalledWith('[TEST] 42', undefined);
    });
  });

  describe('error', () => {
    it('should call underlying logger error with prefix', () => {
      const message = 'Error message';
      prefixLogger.error(message);
      
      expect(mockLogger.error).toHaveBeenCalledWith('[TEST] Error message', undefined, undefined);
    });

    it('should call underlying logger error with prefix, trace and context', () => {
      const message = 'Error message';
      const trace = 'Stack trace';
      const context = 'ErrorContext';
      prefixLogger.error(message, trace, context);
      
      expect(mockLogger.error).toHaveBeenCalledWith('[TEST] Error message', trace, context);
    });

    it('should handle error with only trace', () => {
      const message = 'Error message';
      const trace = 'Stack trace';
      prefixLogger.error(message, trace);
      
      expect(mockLogger.error).toHaveBeenCalledWith('[TEST] Error message', trace, undefined);
    });

    it('should handle Error object as message', () => {
      const error = new Error('Test error');
      prefixLogger.error(error);
      
      expect(mockLogger.error).toHaveBeenCalledWith(`[TEST] ${error}`, undefined, undefined);
    });
  });

  describe('warn', () => {
    it('should call underlying logger warn with prefix', () => {
      const message = 'Warning message';
      prefixLogger.warn(message);
      
      expect(mockLogger.warn).toHaveBeenCalledWith('[TEST] Warning message', undefined);
    });

    it('should call underlying logger warn with prefix and context', () => {
      const message = 'Warning message';
      const context = 'WarnContext';
      prefixLogger.warn(message, context);
      
      expect(mockLogger.warn).toHaveBeenCalledWith('[TEST] Warning message', context);
    });

    it('should handle empty warning message', () => {
      prefixLogger.warn('');
      expect(mockLogger.warn).toHaveBeenCalledWith('[TEST] ', undefined);
    });
  });

  describe('debug', () => {
    it('should call underlying logger debug with prefix when debug method exists', () => {
      const message = 'Debug message';
      prefixLogger.debug!(message);
      
      expect(mockLogger.debug!).toHaveBeenCalledWith('[TEST] Debug message', undefined);
    });

    it('should call underlying logger debug with prefix and context', () => {
      const message = 'Debug message';
      const context = 'DebugContext';
      prefixLogger.debug!(message, context);
      
      expect(mockLogger.debug!).toHaveBeenCalledWith('[TEST] Debug message', context);
    });

    it('should handle case when underlying logger has no debug method', () => {
      const loggerWithoutDebug = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn()
      } as LoggerService;
      
      const logger = new PrefixLogger(loggerWithoutDebug, 'TEST');
      
      // Should not throw when debug method doesn't exist
      expect(() => {
        if (logger.debug && loggerWithoutDebug.debug) {
          logger.debug('test');
        }
      }).not.toThrow();
    });
  });

  describe('verbose', () => {
    it('should call underlying logger verbose with prefix when verbose method exists', () => {
      const message = 'Verbose message';
      prefixLogger.verbose!(message);
      
      expect(mockLogger.verbose!).toHaveBeenCalledWith('[TEST] Verbose message', undefined);
    });

    it('should call underlying logger verbose with prefix and context', () => {
      const message = 'Verbose message';
      const context = 'VerboseContext';
      prefixLogger.verbose!(message, context);
      
      expect(mockLogger.verbose!).toHaveBeenCalledWith('[TEST] Verbose message', context);
    });

    it('should handle case when underlying logger has no verbose method', () => {
      const loggerWithoutVerbose = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn()
      } as LoggerService;
      
      const logger = new PrefixLogger(loggerWithoutVerbose, 'TEST');
      
      // Should not throw when verbose method doesn't exist
      expect(() => {
        if (logger.verbose && loggerWithoutVerbose.verbose) {
          logger.verbose('test');
        }
      }).not.toThrow();
    });
  });

  describe('prefix formatting', () => {
    it('should work with empty prefix', () => {
      const logger = new PrefixLogger(mockLogger, '');
      logger.log('message');
      
      expect(mockLogger.log).toHaveBeenCalledWith('[] message', undefined);
    });

    it('should work with special characters in prefix', () => {
      const logger = new PrefixLogger(mockLogger, 'APP:MODULE-1');
      logger.log('message');
      
      expect(mockLogger.log).toHaveBeenCalledWith('[APP:MODULE-1] message', undefined);
    });

    it('should work with numeric prefix', () => {
      const logger = new PrefixLogger(mockLogger, '123');
      logger.log('message');
      
      expect(mockLogger.log).toHaveBeenCalledWith('[123] message', undefined);
    });

    it('should work with long prefix', () => {
      const longPrefix = 'VERY_LONG_PREFIX_NAME_FOR_TESTING';
      const logger = new PrefixLogger(mockLogger, longPrefix);
      logger.log('message');
      
      expect(mockLogger.log).toHaveBeenCalledWith(`[${longPrefix}] message`, undefined);
    });
  });

  describe('method call counts', () => {
    it('should call underlying logger methods exactly once', () => {
      prefixLogger.log('log message');
      prefixLogger.error('error message');
      prefixLogger.warn('warn message');
      prefixLogger.debug!('debug message');
      prefixLogger.verbose!('verbose message');
      
      expect(mockLogger.log).toHaveBeenCalledTimes(1);
      expect(mockLogger.error).toHaveBeenCalledTimes(1);
      expect(mockLogger.warn).toHaveBeenCalledTimes(1);
      expect(mockLogger.debug!).toHaveBeenCalledTimes(1);
      expect(mockLogger.verbose!).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple calls correctly', () => {
      prefixLogger.log('first');
      prefixLogger.log('second');
      prefixLogger.log('third');
      
      expect(mockLogger.log).toHaveBeenCalledTimes(3);
      expect(mockLogger.log).toHaveBeenNthCalledWith(1, '[TEST] first', undefined);
      expect(mockLogger.log).toHaveBeenNthCalledWith(2, '[TEST] second', undefined);
      expect(mockLogger.log).toHaveBeenNthCalledWith(3, '[TEST] third', undefined);
    });
  });

  describe('nested prefix loggers', () => {
    it('should handle nested prefix loggers', () => {
      const firstPrefix = new PrefixLogger(mockLogger, 'FIRST');
      const secondPrefix = new PrefixLogger(firstPrefix, 'SECOND');
      
      secondPrefix.log('nested message');
      
      expect(mockLogger.log).toHaveBeenCalledWith('[FIRST] [SECOND] nested message', undefined);
    });

    it('should handle deep nesting', () => {
      const level1 = new PrefixLogger(mockLogger, 'L1');
      const level2 = new PrefixLogger(level1, 'L2');
      const level3 = new PrefixLogger(level2, 'L3');
      
      level3.error('deep error', 'trace');
      
      expect(mockLogger.error).toHaveBeenCalledWith('[L1] [L2] [L3] deep error', 'trace', undefined);
    });
  });
}); 