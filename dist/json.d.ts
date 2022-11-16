import { LoggerService } from './types/logger.interface';
export declare function stringify(object: any, replacer?: any, indent?: any): string;
export declare function prettyPrint(object: any): string;
export declare function tryParse(jsonStr: string, logger?: LoggerService): any;
