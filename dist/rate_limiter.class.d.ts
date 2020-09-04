export declare class RateLimiterClass {
    private limiter;
    constructor(tokensPerSecond: number);
    canRun(): boolean;
}
