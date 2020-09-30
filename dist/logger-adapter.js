"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.setLoggerConstructor = void 0;
var loggerConstructor;
function setLoggerConstructor(_loggerConstructor) {
    loggerConstructor = _loggerConstructor;
}
exports.setLoggerConstructor = setLoggerConstructor;
function createLogger(context, isTimestampEnabled) {
    return loggerConstructor(context, isTimestampEnabled);
}
exports.createLogger = createLogger;
