import { RateLimiter } from 'limiter';

export class RateLimiterClass {
  protected limiter: RateLimiter;

  constructor(public readonly tokensPerSecond: number) {
    this.limiter = new RateLimiter(tokensPerSecond, 'second', true);
  }

  canRun(): boolean {
    return this.limiter.tryRemoveTokens(1);
  }
}
