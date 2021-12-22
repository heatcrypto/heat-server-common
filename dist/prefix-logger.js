"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixLogger = void 0;
var PrefixLogger = /** @class */ (function () {
    function PrefixLogger(logger, prefix) {
        this.logger = logger;
        this.prefix = prefix;
    }
    PrefixLogger.prototype.log = function (message, context) {
        this.logger.log("[".concat(this.prefix, "] ").concat(message), context);
    };
    PrefixLogger.prototype.error = function (message, trace, context) {
        this.logger.error("[".concat(this.prefix, "] ").concat(message), trace, context);
    };
    PrefixLogger.prototype.warn = function (message, context) {
        this.logger.warn("[".concat(this.prefix, "] ").concat(message), context);
    };
    PrefixLogger.prototype.debug = function (message, context) {
        this.logger.debug("[".concat(this.prefix, "] ").concat(message), context);
    };
    PrefixLogger.prototype.verbose = function (message, context) {
        this.logger.verbose("[".concat(this.prefix, "] ").concat(message), context);
    };
    return PrefixLogger;
}());
exports.PrefixLogger = PrefixLogger;
