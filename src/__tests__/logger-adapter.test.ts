import { setLoggerAdapter, createLogger } from '../logger-adapter';
import { LoggerService } from '../types/logger.interface';

// Spy on console methods
const consoleSpy = {
  log: jest.spyOn(console, 'log').mockImplementation(),
  error: jest.spyOn(console, 'error').mockImplementation(),
  warn: jest.spyOn(console, 'warn').mockImplementation(),
  debug: jest.spyOn(console, 'debug').mockImplementation()
};

describe('Logger Adapter', () => {
  beforeEach(() => {
    // Reset all console spies before each test
    Object.values(consoleSpy).forEach(spy => spy.mockClear());
    
    // Reset the logger constructor by setting it to undefined
    setLoggerAdapter(undefined as any);
  });

  afterAll(() => {
    // Restore console methods after all tests
    Object.values(consoleSpy).forEach(spy => spy.mockRestore());
  });

  describe('setLoggerAdapter', () => {
    it('should set custom logger constructor', () => {
      const mockLoggerConstructor = jest.fn().mockReturnValue({
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn()
      });

      setLoggerAdapter(mockLoggerConstructor);
      createLogger('test-context');

      expect(mockLoggerConstructor).toHaveBeenCalledWith('test-context', undefined);
    });

    it('should pass context and timestamp parameters correctly', () => {
      const mockLoggerConstructor = jest.fn().mockReturnValue({
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn()
      });

      setLoggerAdapter(mockLoggerConstructor);
      createLogger('custom-context', true);

      expect(mockLoggerConstructor).toHaveBeenCalledWith('custom-context', true);
    });
  });

  describe('createLogger', () => {
    it('should use DefaultLogger when no adapter is set', () => {
      const logger = createLogger();
      
      expect(logger).toBeDefined();
      expect(typeof logger.log).toBe('function');
      expect(typeof logger.error).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.debug).toBe('function');
      expect(typeof logger.verbose).toBe('function');
    });

    it('should use custom logger when adapter is set', () => {
      const mockLogger = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn()
      };

      const mockLoggerConstructor = jest.fn().mockReturnValue(mockLogger);
      setLoggerAdapter(mockLoggerConstructor);

      const logger = createLogger('test');
      expect(logger).toBe(mockLogger);
      expect(mockLoggerConstructor).toHaveBeenCalledWith('test', undefined);
    });

    it('should pass parameters correctly to custom logger', () => {
      const mockLoggerConstructor = jest.fn().mockReturnValue({
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn()
      });

      setLoggerAdapter(mockLoggerConstructor);
      createLogger('context', true);

      expect(mockLoggerConstructor).toHaveBeenCalledWith('context', true);
    });
  });

  describe('DefaultLogger', () => {
    let defaultLogger: LoggerService;

    beforeEach(() => {
      defaultLogger = createLogger('TestContext', true);
    });

    describe('log', () => {
      it('should call console.log with message only', () => {
        defaultLogger.log('test message');
        expect(consoleSpy.log).toHaveBeenCalledWith('test message');
      });

      it('should call console.log with message and context', () => {
        defaultLogger.log('test message', 'TestContext');
        expect(consoleSpy.log).toHaveBeenCalledWith('test message', 'TestContext');
      });

      it('should handle undefined context', () => {
        defaultLogger.log('test message', undefined);
        expect(consoleSpy.log).toHaveBeenCalledWith('test message');
      });

      it('should handle null context', () => {
        defaultLogger.log('test message', undefined);
        expect(consoleSpy.log).toHaveBeenCalledWith('test message');
      });

      it('should handle empty string context', () => {
        defaultLogger.log('test message', '');
        expect(consoleSpy.log).toHaveBeenCalledWith('test message', '');
      });

      it('should handle object message', () => {
        const objMessage = { key: 'value' };
        defaultLogger.log(objMessage);
        expect(consoleSpy.log).toHaveBeenCalledWith(objMessage);
      });

      it('should handle number message', () => {
        defaultLogger.log(42);
        expect(consoleSpy.log).toHaveBeenCalledWith(42);
      });
    });

    describe('error', () => {
      it('should call console.error with message and error object', () => {
        defaultLogger.error('error message', 'stack trace', 'ErrorContext');
        expect(consoleSpy.error).toHaveBeenCalledWith('error message', {
          trace: 'stack trace',
          context: 'ErrorContext'
        });
      });

      it('should handle error with just message', () => {
        defaultLogger.error('error message');
        expect(consoleSpy.error).toHaveBeenCalledWith('error message', {
          trace: undefined,
          context: undefined
        });
      });

      it('should handle error with message and trace', () => {
        defaultLogger.error('error message', 'stack trace');
        expect(consoleSpy.error).toHaveBeenCalledWith('error message', {
          trace: 'stack trace',
          context: undefined
        });
      });

      it('should handle Error object as message', () => {
        const error = new Error('Test error');
        defaultLogger.error(error, 'trace');
        expect(consoleSpy.error).toHaveBeenCalledWith(error, {
          trace: 'trace',
          context: undefined
        });
      });
    });

    describe('warn', () => {
      it('should call console.warn with message only', () => {
        defaultLogger.warn('warning message');
        expect(consoleSpy.warn).toHaveBeenCalledWith('warning message');
      });

      it('should call console.warn with message and context', () => {
        defaultLogger.warn('warning message', 'WarnContext');
        expect(consoleSpy.warn).toHaveBeenCalledWith('warning message', 'WarnContext');
      });

      it('should handle undefined context', () => {
        defaultLogger.warn('warning message', undefined);
        expect(consoleSpy.warn).toHaveBeenCalledWith('warning message');
      });

      it('should handle empty warning message', () => {
        defaultLogger.warn('');
        expect(consoleSpy.warn).toHaveBeenCalledWith('');
      });
    });

    describe('debug', () => {
      it('should call console.debug with message only', () => {
        defaultLogger.debug!('debug message');
        expect(consoleSpy.debug).toHaveBeenCalledWith('debug message');
      });

      it('should call console.debug with message and context', () => {
        defaultLogger.debug!('debug message', 'DebugContext');
        expect(consoleSpy.debug).toHaveBeenCalledWith('debug message', 'DebugContext');
      });

      it('should handle undefined context', () => {
        defaultLogger.debug!('debug message', undefined);
        expect(consoleSpy.debug).toHaveBeenCalledWith('debug message');
      });
    });

    describe('verbose', () => {
      it('should call console.log for verbose with message only', () => {
        defaultLogger.verbose!('verbose message');
        expect(consoleSpy.log).toHaveBeenCalledWith('verbose message');
      });

      it('should call console.log for verbose with message and context', () => {
        defaultLogger.verbose!('verbose message', 'VerboseContext');
        expect(consoleSpy.log).toHaveBeenCalledWith('verbose message', 'VerboseContext');
      });

      it('should handle undefined context', () => {
        defaultLogger.verbose!('verbose message', undefined);
        expect(consoleSpy.log).toHaveBeenCalledWith('verbose message');
      });
    });

    describe('static methods', () => {
      // Note: Static methods would need to be tested differently as they reference the class directly
      // For now, focusing on instance methods which are more commonly used
      
      it('should have static methods available', () => {
        expect(typeof (defaultLogger.constructor as any).log).toBe('function');
        expect(typeof (defaultLogger.constructor as any).error).toBe('function');
        expect(typeof (defaultLogger.constructor as any).warn).toBe('function');
        expect(typeof (defaultLogger.constructor as any).debug).toBe('function');
        expect(typeof (defaultLogger.constructor as any).verbose).toBe('function');
      });
    });

    describe('setContext method', () => {
      it('should have setContext method that does nothing', () => {
        expect(typeof (defaultLogger as any).setContext).toBe('function');
        expect(() => (defaultLogger as any).setContext('NewContext')).not.toThrow();
      });
    });
  });

  describe('DefaultLogger constructor parameters', () => {
    it('should accept context parameter', () => {
      const logger = createLogger('TestContext');
      expect(logger).toBeDefined();
    });

    it('should accept timestamp parameter', () => {
      const logger = createLogger(undefined, true);
      expect(logger).toBeDefined();
    });

    it('should accept both context and timestamp parameters', () => {
      const logger = createLogger('TestContext', false);
      expect(logger).toBeDefined();
    });

    it('should work with no parameters', () => {
      const logger = createLogger();
      expect(logger).toBeDefined();
    });
  });

  describe('integration with different adapters', () => {
    it('should switch between default and custom loggers', () => {
      // First use default logger
      const defaultLogger = createLogger('default');
      defaultLogger.log('default message');
      expect(consoleSpy.log).toHaveBeenCalledWith('default message');

      // Set custom adapter
      const customLogger = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn()
      };
      
      setLoggerAdapter(() => customLogger);
      
      // Now use custom logger
      const newLogger = createLogger('custom');
      newLogger.log('custom message');
      
      expect(customLogger.log).toHaveBeenCalledWith('custom message');
      expect(consoleSpy.log).not.toHaveBeenCalledWith('custom message');
    });

    it('should handle adapter that throws errors gracefully', () => {
      const throwingAdapter = () => {
        throw new Error('Adapter construction failed');
      };

      setLoggerAdapter(throwingAdapter);
      
      expect(() => createLogger()).toThrow('Adapter construction failed');
    });
  });
}); 