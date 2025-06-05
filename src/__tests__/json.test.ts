import { stringify, prettyPrint, tryParse } from '../json';
import { LoggerService } from '../types/logger.interface';

describe('JSON Utils', () => {
  describe('stringify', () => {
    it('should stringify simple objects with default formatting', () => {
      const obj = { name: 'John', age: 30 };
      const result = stringify(obj);
      expect(result).toBe('{"name":"John","age":30}');
    });

    it('should stringify with custom replacer and indent when provided', () => {
      const obj = { name: 'John', age: 30, password: 'secret' };
      const replacer = (key: string, value: any) => key === 'password' ? undefined : value;
      const result = stringify(obj, replacer, 2);
      expect(result).toBe('{\n  "name": "John",\n  "age": 30\n}');
    });

    it('should handle arrays', () => {
      const arr = [1, 2, 3, 'test'];
      const result = stringify(arr);
      expect(result).toBe('[1,2,3,"test"]');
    });

    it('should handle null and undefined', () => {
      expect(stringify(null)).toBe('null');
      expect(stringify(undefined)).toBe(undefined);
    });

    it('should handle primitive values', () => {
      expect(stringify('hello')).toBe('"hello"');
      expect(stringify(42)).toBe('42');
      expect(stringify(true)).toBe('true');
      expect(stringify(false)).toBe('false');
    });

    it('should handle nested objects', () => {
      const obj = {
        user: { name: 'John', details: { age: 30, city: 'NYC' } },
        items: [1, 2, 3]
      };
      const result = stringify(obj);
      expect(result).toBe('{"user":{"name":"John","details":{"age":30,"city":"NYC"}},"items":[1,2,3]}');
    });

    it('should handle circular references gracefully', () => {
      const obj: any = { name: 'test' };
      obj.self = obj;
      expect(() => stringify(obj)).toThrow();
    });
  });

  describe('prettyPrint', () => {
    it('should pretty print simple objects', () => {
      const obj = { name: 'John', age: 30 };
      const result = prettyPrint(obj);
      expect(result).toBe('{\n  "name": "John",\n  "age": 30\n}');
    });

    it('should pretty print arrays', () => {
      const arr = [1, 2, { name: 'test' }];
      const result = prettyPrint(arr);
      expect(result).toBe('[\n  1,\n  2,\n  {\n    "name": "test"\n  }\n]');
    });

    it('should handle null and undefined', () => {
      expect(prettyPrint(null)).toBe('null');
      expect(prettyPrint(undefined)).toBe(undefined);
    });

    it('should handle primitive values', () => {
      expect(prettyPrint('hello')).toBe('"hello"');
      expect(prettyPrint(42)).toBe('42');
      expect(prettyPrint(true)).toBe('true');
    });

    it('should handle complex nested structures', () => {
      const obj = {
        users: [
          { name: 'John', age: 30 },
          { name: 'Jane', age: 25 }
        ],
        meta: { count: 2, version: '1.0' }
      };
      const result = prettyPrint(obj);
      expect(result).toContain('"users"');
      expect(result).toContain('"name": "John"');
      expect(result).toContain('"meta"');
    });

    it('should return error message for circular references', () => {
      const obj: any = { name: 'test' };
      obj.self = obj;
      const result = prettyPrint(obj);
      expect(result).toBe('Unable to pretty print ( [object Object] )');
    });

    it('should handle empty objects and arrays', () => {
      expect(prettyPrint({})).toBe('{}');
      expect(prettyPrint([])).toBe('[]');
    });
  });

  describe('tryParse', () => {
    let mockLogger: LoggerService;

    beforeEach(() => {
      mockLogger = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn()
      };
    });

    it('should parse valid JSON strings', () => {
      const validJson = '{"name":"John","age":30}';
      const result = tryParse(validJson);
      expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('should parse valid JSON arrays', () => {
      const validJson = '[1,2,3,"test"]';
      const result = tryParse(validJson);
      expect(result).toEqual([1, 2, 3, 'test']);
    });

    it('should parse primitive JSON values', () => {
      expect(tryParse('42')).toBe(42);
      expect(tryParse('"hello"')).toBe('hello');
      expect(tryParse('true')).toBe(true);
      expect(tryParse('false')).toBe(false);
      expect(tryParse('null')).toBe(null);
    });

    it('should return null for invalid JSON without logger', () => {
      const invalidJson = '{"name":"John",age:30}'; // Missing quotes around age
      const result = tryParse(invalidJson);
      expect(result).toBe(null);
    });

    it('should return null for invalid JSON with logger and log errors', () => {
      const invalidJson = '{"name":"John",age:30}';
      const result = tryParse(invalidJson, mockLogger);
      expect(result).toBe(null);
      expect(mockLogger.error).toHaveBeenCalled();
      expect(mockLogger.log).toHaveBeenCalledWith('Source data for previous error:');
      expect(mockLogger.log).toHaveBeenCalledWith(invalidJson);
    });

    it('should handle empty string', () => {
      const result = tryParse('');
      expect(result).toBe(null);
    });

    it('should handle malformed JSON strings', () => {
      const malformedCases = [
        '{name:"John"}', // Unquoted property name
        '{"name":"John",}', // Trailing comma
        '{"name":"John"', // Missing closing brace
        'undefined', // Invalid literal
        'function(){}', // Function
        '{a:1,b:2}' // Unquoted keys
      ];

      malformedCases.forEach(malformed => {
        const result = tryParse(malformed);
        expect(result).toBe(null);
      });
    });

    it('should log detailed error information when logger is provided', () => {
      const invalidJson = '{"invalid": json}';
      tryParse(invalidJson, mockLogger);
      
      expect(mockLogger.error).toHaveBeenCalledTimes(1);
      expect(mockLogger.log).toHaveBeenCalledWith('Source data for previous error:');
      expect(mockLogger.log).toHaveBeenCalledWith(invalidJson);
    });

    it('should not log when no logger is provided', () => {
      const invalidJson = '{"invalid": json}';
      const result = tryParse(invalidJson);
      
      expect(result).toBe(null);
      // No way to verify logging didn't happen since no logger was passed
    });

    it('should handle complex valid JSON', () => {
      const complexJson = JSON.stringify({
        users: [
          { id: 1, name: 'John', active: true },
          { id: 2, name: 'Jane', active: false }
        ],
        meta: { total: 2, timestamp: Date.now() },
        config: { debug: true, version: '1.0.0' }
      });
      
      const result = tryParse(complexJson);
      expect(result).toHaveProperty('users');
      expect(result).toHaveProperty('meta');
      expect(result).toHaveProperty('config');
      expect(Array.isArray(result.users)).toBe(true);
      expect(result.users).toHaveLength(2);
    });
  });
}); 