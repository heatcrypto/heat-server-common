"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParse = exports.prettyPrint = exports.stringify = void 0;
var lodash_1 = require("lodash");
function stringify(object, replacer, indent) {
    if (!(0, lodash_1.isUndefined)(replacer) && !(0, lodash_1.isUndefined)(indent))
        return JSON.stringify(object, replacer, indent);
    return JSON.stringify(object, null, 0);
}
exports.stringify = stringify;
function prettyPrint(object) {
    try {
        /// We disabled colors
        return JSON.stringify(object, null, 2);
    }
    catch (e) {
        return "Unable to pretty print ( ".concat(object, " )");
    }
}
exports.prettyPrint = prettyPrint;
function tryParse(jsonStr, logger) {
    try {
        return JSON.parse(jsonStr);
    }
    catch (e) {
        if (!(0, lodash_1.isUndefined)(logger)) {
            logger.error(e);
            logger.log('Source data for previous error:');
            logger.log(jsonStr);
        }
    }
    return null;
}
exports.tryParse = tryParse;
