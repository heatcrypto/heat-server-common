import { compareCaseInsensitive, containsCaseInsensitive, enumValues } from '../utils';

describe('Utils', () => {
  describe('compareCaseInsensitive', () => {
    it('should return true for identical strings', () => {
      expect(compareCaseInsensitive('hello', 'hello')).toBe(true);
    });

    it('should return true for strings with different cases', () => {
      expect(compareCaseInsensitive('Hello', 'hello')).toBe(true);
      expect(compareCaseInsensitive('WORLD', 'world')).toBe(true);
      expect(compareCaseInsensitive('MiXeD', 'mixed')).toBe(true);
    });

    it('should return false for different strings', () => {
      expect(compareCaseInsensitive('hello', 'world')).toBe(false);
      expect(compareCaseInsensitive('Hello', 'Goodbye')).toBe(false);
    });

    it('should handle empty strings', () => {
      expect(compareCaseInsensitive('', '')).toBe(true);
      expect(compareCaseInsensitive('hello', '')).toBe(false);
      expect(compareCaseInsensitive('', 'world')).toBe(false);
    });

    it('should handle non-string values by falling back to strict equality', () => {
      expect(compareCaseInsensitive(123, 123)).toBe(true);
      expect(compareCaseInsensitive(123, 456)).toBe(false);
      expect(compareCaseInsensitive(null, null)).toBe(true);
      expect(compareCaseInsensitive(undefined, undefined)).toBe(true);
      expect(compareCaseInsensitive(true, true)).toBe(true);
      expect(compareCaseInsensitive(false, false)).toBe(true);
    });

    it('should handle mixed string and non-string values', () => {
      expect(compareCaseInsensitive('123', 123)).toBe(false);
      expect(compareCaseInsensitive('hello', null)).toBe(false);
      expect(compareCaseInsensitive('true', true)).toBe(false);
    });

    it('should handle special characters and unicode', () => {
      expect(compareCaseInsensitive('café', 'CAFÉ')).toBe(true);
      expect(compareCaseInsensitive('Ñoño', 'ñoño')).toBe(true);
      expect(compareCaseInsensitive('hello@world.com', 'HELLO@WORLD.COM')).toBe(true);
    });
  });

  describe('containsCaseInsensitive', () => {
    it('should return true when haystack contains needle (exact case)', () => {
      const haystack = ['apple', 'banana', 'cherry'];
      expect(containsCaseInsensitive(haystack, 'banana')).toBe(true);
    });

    it('should return true when haystack contains needle (different case)', () => {
      const haystack = ['Apple', 'BANANA', 'cherry'];
      expect(containsCaseInsensitive(haystack, 'apple')).toBe(true);
      expect(containsCaseInsensitive(haystack, 'banana')).toBe(true);
      expect(containsCaseInsensitive(haystack, 'CHERRY')).toBe(true);
    });

    it('should return false when haystack does not contain needle', () => {
      const haystack = ['apple', 'banana', 'cherry'];
      expect(containsCaseInsensitive(haystack, 'grape')).toBe(false);
      expect(containsCaseInsensitive(haystack, 'orange')).toBe(false);
    });

    it('should handle empty haystack', () => {
      const haystack: string[] = [];
      expect(containsCaseInsensitive(haystack, 'anything')).toBe(false);
    });

    it('should handle empty needle', () => {
      const haystack = ['apple', 'banana', ''];
      expect(containsCaseInsensitive(haystack, '')).toBe(true);
    });

    it('should handle haystack with empty strings', () => {
      const haystack = ['apple', '', 'banana'];
      expect(containsCaseInsensitive(haystack, '')).toBe(true);
      expect(containsCaseInsensitive(haystack, 'apple')).toBe(true);
    });

    it('should handle partial matches correctly (should not match)', () => {
      const haystack = ['application', 'banana', 'cherry'];
      expect(containsCaseInsensitive(haystack, 'app')).toBe(false);
      expect(containsCaseInsensitive(haystack, 'ban')).toBe(false);
    });

    it('should handle special characters and unicode', () => {
      const haystack = ['café', 'Ñoño', 'hello@world.com'];
      expect(containsCaseInsensitive(haystack, 'CAFÉ')).toBe(true);
      expect(containsCaseInsensitive(haystack, 'ñoño')).toBe(true);
      expect(containsCaseInsensitive(haystack, 'HELLO@WORLD.COM')).toBe(true);
    });
  });

  describe('enumValues', () => {
    it('should return array of numeric enum values', () => {
      enum TestEnum {
        FIRST = 1,
        SECOND = 2,
        THIRD = 3
      }
      const values = enumValues(TestEnum);
      // TypeScript numeric enums include both keys and values
      expect(values).toEqual(['FIRST', 'SECOND', 'THIRD', 1, 2, 3]);
    });

    it('should return array of string enum values', () => {
      enum StringEnum {
        FIRST = 'first',
        SECOND = 'second',
        THIRD = 'third'
      }
      const values = enumValues(StringEnum);
      expect(values).toEqual(['first', 'second', 'third']);
    });

    it('should handle mixed enum values', () => {
      enum MixedEnum {
        ZERO = 0,
        ONE = 1,
        STRING = 'string'
      }
      const values = enumValues(MixedEnum);
      // TypeScript numeric enums include both keys and values, strings only values
      expect(values).toEqual(['ZERO', 'ONE', 0, 1, 'string']);
    });

    it('should handle auto-incremented numeric enums', () => {
      enum AutoEnum {
        FIRST, // 0
        SECOND, // 1
        THIRD // 2
      }
      const values = enumValues(AutoEnum);
      // TypeScript numeric enums include both keys and values
      expect(values).toEqual(['FIRST', 'SECOND', 'THIRD', 0, 1, 2]);
    });

    it('should handle empty enum-like object', () => {
      const emptyEnum = {};
      const values = enumValues(emptyEnum);
      expect(values).toEqual([]);
    });

    it('should handle regular object', () => {
      const regularObject = {
        key1: 'value1',
        key2: 'value2',
        key3: 42
      };
      const values = enumValues(regularObject);
      expect(values).toEqual(['value1', 'value2', 42]);
    });
  });
}); 