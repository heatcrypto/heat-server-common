"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterClass = void 0;
var limiter_1 = require("limiter");
var RateLimiterClass = /** @class */ (function () {
    function RateLimiterClass(tokensPerSecond) {
        this.tokensPerSecond = tokensPerSecond;
        this.limiter = new limiter_1.RateLimiter(tokensPerSecond, 'second', true);
    }
    RateLimiterClass.prototype.canRun = function () {
        return this.limiter.tryRemoveTokens(1);
    };
    return RateLimiterClass;
}());
exports.RateLimiterClass = RateLimiterClass;
