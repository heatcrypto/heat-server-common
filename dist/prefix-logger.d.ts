import { LoggerService } from "./types/logger.interface";
export declare class PrefixLogger implements LoggerService {
    private logger;
    private prefix;
    constructor(logger: LoggerService, prefix: string);
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug?(message: any, context?: string): void;
    verbose?(message: any, context?: string): void;
}
