import { LoggerService } from '@nestjs/common';
import { CoreOptions } from 'request';
export declare class MonitoredRequestException extends Error {
    constructor(reason: string);
}
export declare class MonitoredRequest {
    private logger;
    constructor(logger?: LoggerService, prefix?: string);
    log(message: string): void;
    /**
     * Performs an HTTP GET request.
     * @param uri
     * @param options
     * @param allowedStatusCodes
     * @param requestObserver
     */
    get(uri: string, options?: CoreOptions, allowedStatusCodes?: Array<number>, requestObserver?: (data: string) => void): Promise<string>;
    /**
     * Performs an HTTP post
     * To send application/x-www-form-urlencoded data pass a map of form data to the
     * options.form hash.
     * @param uri
     * @param options
     * @param allowedStatusCodes
     * @param requestObserver
     */
    post(uri: string, options?: CoreOptions, allowedStatusCodes?: Array<number>, requestObserver?: (data: string) => void): Promise<string>;
}
