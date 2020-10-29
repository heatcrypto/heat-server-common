import { RateLimiter } from 'limiter';

export class RateLimiterClass {
  protected limiter: RateLimiter;

  constructor(tokensPerSecond: number) {
    this.limiter = new RateLimiter(tokensPerSecond, 'second', true);
  }

  canRun(): boolean {
    return this.limiter.tryRemoveTokens(1);
  }
}
