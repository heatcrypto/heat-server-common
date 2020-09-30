import { LoggerService } from "./types/logger.interface";
declare type LoggerConstructor = (context?: string, isTimestampEnabled?: boolean) => LoggerService;
export declare function setLoggerAdapter(_loggerConstructor: LoggerConstructor): void;
export declare function createLogger(context?: string, isTimestampEnabled?: boolean): LoggerService;
export {};
