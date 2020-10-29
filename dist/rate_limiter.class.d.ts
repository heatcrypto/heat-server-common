import { RateLimiter } from 'limiter';
export declare class RateLimiterClass {
    protected limiter: RateLimiter;
    constructor(tokensPerSecond: number);
    canRun(): boolean;
}
