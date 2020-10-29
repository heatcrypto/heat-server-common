import { Logger, LoggerService, LogLevel } from "./types/logger.interface";
import { isUndefined } from "util";

type LoggerConstructor = (context?: string, isTimestampEnabled?: boolean) => LoggerService;
let loggerConstructor: LoggerConstructor;

export function setLoggerAdapter(_loggerConstructor: LoggerConstructor) {
  loggerConstructor = _loggerConstructor
}

export function createLogger(context?: string, isTimestampEnabled?: boolean): LoggerService {
  return loggerConstructor ? loggerConstructor(context, isTimestampEnabled) : new DefaultLogger(context, isTimestampEnabled)
}

class DefaultLogger implements LoggerService {
  constructor(private context?: string, private isTimestampEnabled?: boolean) {}
  error(message: any, trace?: string, context?: string) {
    console.error(message, {trace,context})
  }
  log(message: any, context?: string) {
    isUndefined(context) ? console.log(message) :  console.log(message, context)
  }
  warn(message: any, context?: string) {
    isUndefined(context) ? console.warn(message) :  console.warn(message, context)
  }
  debug(message: any, context?: string) {
    isUndefined(context) ? console.debug(message) :  console.debug(message, context)
  }
  verbose(message: any, context?: string) {
    isUndefined(context) ? console.log(message) :  console.log(message, context)
  }
  setContext(context: string) {}
  static overrideLogger(logger: LoggerService | LogLevel[] | boolean) {}
  static log(message: any, context?: string, isTimeDiffEnabled?: boolean) {
    isUndefined(context) ? console.log(message) :  console.log(message, context)
  }
  static error(message: any, trace?: string, context?: string, isTimeDiffEnabled?: boolean) {
    isUndefined(context) ? console.error(message) :  console.error(message, context)
  }
  static warn(message: any, context?: string, isTimeDiffEnabled?: boolean) {
    isUndefined(context) ? console.warn(message) :  console.warn(message, context)
  }
  static debug(message: any, context?: string, isTimeDiffEnabled?: boolean) {
    isUndefined(context) ? console.debug(message) :  console.debug(message, context)
  }
  static verbose(message: any, context?: string, isTimeDiffEnabled?: boolean) {
    isUndefined(context) ? console.log(message) :  console.log(message, context)
  }
}

