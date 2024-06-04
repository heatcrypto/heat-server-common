import { RateLimiter } from 'limiter';
export declare class RateLimiterClass {
    readonly tokensPerSecond: number;
    protected limiter: RateLimiter;
    constructor(tokensPerSecond: number);
    canRun(): boolean;
}
