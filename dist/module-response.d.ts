export declare class ModuleResponse<T> {
    /**
     * Used by top most master explorer only, not meant for use by blockchain module
     * implementations.
     */
    rateLimitted?: boolean;
    /**
     * Error string, if any. error and value are mutualy exclusive, either one or the other is provided
     */
    error?: string;
    /**
     * Successs result, if any. error and value are mutualy exclusive, either one or the other is provided
     */
    value?: T;
}
