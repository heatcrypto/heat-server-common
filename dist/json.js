"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParse = exports.prettyPrint = exports.stringify = void 0;
var lodash_1 = require("lodash");
var format_error_1 = require("format-error");
var jsome = __importStar(require("jsome"));
function stringify(object, replacer, indent) {
    if (!lodash_1.isUndefined(replacer) && !lodash_1.isUndefined(indent))
        return JSON.stringify(object, replacer, indent);
    return JSON.stringify(object, null, 0);
}
exports.stringify = stringify;
function prettyPrint(object) {
    try {
        return jsome.getColoredString(object);
    }
    catch (e) {
        return "Unable to pretty print ( " + object + " )";
    }
}
exports.prettyPrint = prettyPrint;
function tryParse(jsonStr, logger) {
    try {
        return JSON.parse(jsonStr);
    }
    catch (e) {
        if (!lodash_1.isUndefined(logger)) {
            logger.error(format_error_1.format(e));
            logger.log('Source data for previous error:');
            logger.log(jsonStr);
        }
    }
    return null;
}
exports.tryParse = tryParse;
