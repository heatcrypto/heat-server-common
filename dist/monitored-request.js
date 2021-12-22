"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoredRequest = exports.MonitoredRequestException = void 0;
var lodash_1 = require("lodash");
var prefix_logger_1 = require("./prefix-logger");
var json_1 = require("./json");
var request_1 = require("request");
var util_1 = require("util");
var logger_adapter_1 = require("./logger-adapter");
var _a = [request_1.get, request_1.post].map(util_1.promisify), getAsync = _a[0], postAsync = _a[1];
var DEBUG = true;
var COMPRESS = true;
var MonitoredRequestException = /** @class */ (function (_super) {
    __extends(MonitoredRequestException, _super);
    function MonitoredRequestException(reason) {
        return _super.call(this, reason) || this;
    }
    return MonitoredRequestException;
}(Error));
exports.MonitoredRequestException = MonitoredRequestException;
var MonitoredRequest = /** @class */ (function () {
    function MonitoredRequest(logger, prefix) {
        if ((0, lodash_1.isUndefined)(logger)) {
            if (DEBUG) {
                this.logger = (0, logger_adapter_1.createLogger)(MonitoredRequest.name);
            }
        }
        else if ((0, lodash_1.isUndefined)(prefix)) {
            this.logger = logger;
        }
        else {
            this.logger = new prefix_logger_1.PrefixLogger(logger, prefix);
        }
    }
    MonitoredRequest.prototype.log = function (message) {
        if (DEBUG && COMPRESS)
            this.logger.log(message.substr(0, 450));
        else if (DEBUG)
            this.logger.log(message);
    };
    /**
     * Performs an HTTP GET request.
     * @param uri
     * @param options
     * @param allowedStatusCodes
     * @param requestObserver
     */
    MonitoredRequest.prototype.get = function (uri, options, allowedStatusCodes, requestObserver) {
        if (options === void 0) { options = {}; }
        if (allowedStatusCodes === void 0) { allowedStatusCodes = [200]; }
        return __awaiter(this, void 0, void 0, function () {
            var id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Date.now();
                        this.log("[".concat(id, "] GET ").concat(uri));
                        return [4 /*yield*/, getAsync(uri, (0, lodash_1.assign)({}, MonitoredRequest.defaultGetOptions, options))];
                    case 1:
                        response = _a.sent();
                        if (allowedStatusCodes.indexOf(response.statusCode) == -1) {
                            this.log("[".concat(id, "] Invalid status ").concat(response.statusCode));
                            throw new MonitoredRequestException("Invalid status ".concat(response.statusCode));
                        }
                        else {
                            this.log("[".concat(id, "] OK ").concat(response.body));
                            if ((0, lodash_1.isFunction)(requestObserver))
                                requestObserver((0, json_1.stringify)(response));
                            return [2 /*return*/, response.body];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Performs an HTTP post
     * To send application/x-www-form-urlencoded data pass a map of form data to the
     * options.form hash.
     * @param uri
     * @param options
     * @param allowedStatusCodes
     * @param requestObserver
     */
    MonitoredRequest.prototype.post = function (uri, options, allowedStatusCodes, requestObserver) {
        if (options === void 0) { options = {}; }
        if (allowedStatusCodes === void 0) { allowedStatusCodes = [200, 201, 202]; }
        return __awaiter(this, void 0, void 0, function () {
            var id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Date.now();
                        this.log("[".concat(id, "] POST ").concat(uri, " options=").concat((0, json_1.prettyPrint)(options)));
                        return [4 /*yield*/, postAsync(uri, (0, lodash_1.assign)({}, MonitoredRequest.defaultPostOptions, options))];
                    case 1:
                        response = _a.sent();
                        if (allowedStatusCodes.indexOf(response.statusCode) == -1) {
                            this.log("[".concat(id, "] Invalid status ").concat(response.statusCode));
                            throw new MonitoredRequestException("Invalid status ".concat(response.statusCode));
                        }
                        else {
                            this.log("[".concat(id, "] OK ").concat((0, json_1.prettyPrint)(response.body)));
                            if ((0, lodash_1.isFunction)(requestObserver))
                                requestObserver(JSON.stringify(response));
                            return [2 /*return*/, response.body];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MonitoredRequest.defaultGetOptions = {};
    MonitoredRequest.defaultPostOptions = {};
    return MonitoredRequest;
}());
exports.MonitoredRequest = MonitoredRequest;
