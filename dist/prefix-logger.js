"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixLogger = void 0;
var PrefixLogger = /** @class */ (function () {
    function PrefixLogger(logger, prefix) {
        this.logger = logger;
        this.prefix = prefix;
    }
    PrefixLogger.prototype.log = function (message, context) {
        this.logger.log("[" + this.prefix + "] " + message, context);
    };
    PrefixLogger.prototype.error = function (message, trace, context) {
        this.logger.error("[" + this.prefix + "] " + message, trace, context);
    };
    PrefixLogger.prototype.warn = function (message, context) {
        this.logger.warn("[" + this.prefix + "] " + message, context);
    };
    PrefixLogger.prototype.debug = function (message, context) {
        this.logger.debug("[" + this.prefix + "] " + message, context);
    };
    PrefixLogger.prototype.verbose = function (message, context) {
        this.logger.verbose("[" + this.prefix + "] " + message, context);
    };
    return PrefixLogger;
}());
exports.PrefixLogger = PrefixLogger;
