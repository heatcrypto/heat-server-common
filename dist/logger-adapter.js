"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.setLoggerAdapter = void 0;
var util_1 = require("util");
var loggerConstructor;
function setLoggerAdapter(_loggerConstructor) {
    loggerConstructor = _loggerConstructor;
}
exports.setLoggerAdapter = setLoggerAdapter;
function createLogger(context, isTimestampEnabled) {
    return loggerConstructor ? loggerConstructor(context, isTimestampEnabled) : new DefaultLogger(context, isTimestampEnabled);
}
exports.createLogger = createLogger;
var DefaultLogger = /** @class */ (function () {
    function DefaultLogger(context, isTimestampEnabled) {
        this.context = context;
        this.isTimestampEnabled = isTimestampEnabled;
    }
    DefaultLogger.prototype.error = function (message, trace, context) {
        console.error(message, { trace: trace, context: context });
    };
    DefaultLogger.prototype.log = function (message, context) {
        util_1.isUndefined(context) ? console.log(message) : console.log(message, context);
    };
    DefaultLogger.prototype.warn = function (message, context) {
        util_1.isUndefined(context) ? console.warn(message) : console.warn(message, context);
    };
    DefaultLogger.prototype.debug = function (message, context) {
        util_1.isUndefined(context) ? console.debug(message) : console.debug(message, context);
    };
    DefaultLogger.prototype.verbose = function (message, context) {
        util_1.isUndefined(context) ? console.log(message) : console.log(message, context);
    };
    DefaultLogger.prototype.setContext = function (context) { };
    DefaultLogger.overrideLogger = function (logger) { };
    DefaultLogger.log = function (message, context, isTimeDiffEnabled) {
        util_1.isUndefined(context) ? console.log(message) : console.log(message, context);
    };
    DefaultLogger.error = function (message, trace, context, isTimeDiffEnabled) {
        util_1.isUndefined(context) ? console.error(message) : console.error(message, context);
    };
    DefaultLogger.warn = function (message, context, isTimeDiffEnabled) {
        util_1.isUndefined(context) ? console.warn(message) : console.warn(message, context);
    };
    DefaultLogger.debug = function (message, context, isTimeDiffEnabled) {
        util_1.isUndefined(context) ? console.debug(message) : console.debug(message, context);
    };
    DefaultLogger.verbose = function (message, context, isTimeDiffEnabled) {
        util_1.isUndefined(context) ? console.log(message) : console.log(message, context);
    };
    return DefaultLogger;
}());
