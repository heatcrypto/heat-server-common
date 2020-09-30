import { Logger } from "./types/logger.interface";
declare type LoggerConstructor = (context?: string, isTimestampEnabled?: boolean) => Logger;
export declare function setLoggerConstructor(_loggerConstructor: LoggerConstructor): void;
export declare function createLogger(context?: string, isTimestampEnabled?: boolean): Logger;
export {};
