import { isString } from 'lodash';

/**
 * Compares two strings insensitive of case
 * @param valueA
 * @param valueB
 */
export function compareCaseInsensitive(valueA: any, valueB: any) {
  if (isString(valueA) && isString(valueB)) {
    return valueA.toLowerCase() == valueB.toLowerCase();
  }
  return valueA === valueB;
}

/**
 * Tests if string is contained in list, compares case insensitive
 * @param haystack
 * @param needle
 */
export function containsCaseInsensitive(
  haystack: Array<string>,
  needle: string,
) {
  for (let i = 0; i < haystack.length; i++) {
    if (compareCaseInsensitive(haystack[i], needle)) {
      return true;
    }
  }
  return false;
}

/**
 * Returns array of all enum values
 * @param _enum
 */
export function enumValues(_enum: any): Array<number> {
  return Object.keys(_enum).map(key => _enum[key]);
}
