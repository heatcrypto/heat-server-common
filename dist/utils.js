"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumValues = exports.containsCaseInsensitive = exports.compareCaseInsensitive = void 0;
var lodash_1 = require("lodash");
/**
 * Compares two strings insensitive of case
 * @param valueA
 * @param valueB
 */
function compareCaseInsensitive(valueA, valueB) {
    if ((0, lodash_1.isString)(valueA) && (0, lodash_1.isString)(valueB)) {
        return valueA.toLowerCase() == valueB.toLowerCase();
    }
    return valueA === valueB;
}
exports.compareCaseInsensitive = compareCaseInsensitive;
/**
 * Tests if string is contained in list, compares case insensitive
 * @param haystack
 * @param needle
 */
function containsCaseInsensitive(haystack, needle) {
    for (var i = 0; i < haystack.length; i++) {
        if (compareCaseInsensitive(haystack[i], needle)) {
            return true;
        }
    }
    return false;
}
exports.containsCaseInsensitive = containsCaseInsensitive;
/**
 * Returns array of all enum values
 * @param _enum
 */
function enumValues(_enum) {
    return Object.keys(_enum).map(function (key) { return _enum[key]; });
}
exports.enumValues = enumValues;
