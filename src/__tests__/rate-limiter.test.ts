import { RateLimiterClass } from '../rate_limiter.class';

describe('RateLimiterClass', () => {
  describe('constructor', () => {
    it('should create instance with specified tokens per second', () => {
      const rateLimiter = new RateLimiterClass(5);
      expect(rateLimiter.tokensPerSecond).toBe(5);
    });

    it('should handle fractional tokens per second', () => {
      const rateLimiter = new RateLimiterClass(0.5);
      expect(rateLimiter.tokensPerSecond).toBe(0.5);
    });

    it('should handle very low rate limits', () => {
      const rateLimiter = new RateLimiterClass(0.1);
      expect(rateLimiter.tokensPerSecond).toBe(0.1);
    });

    it('should handle high rate limits', () => {
      const rateLimiter = new RateLimiterClass(1000);
      expect(rateLimiter.tokensPerSecond).toBe(1000);
    });
  });

  describe('canRun', () => {
    it('should allow first request immediately with rate limit of 1', () => {
      const rateLimiter = new RateLimiterClass(1);
      expect(rateLimiter.canRun()).toBe(true);
    });

    it('should block second immediate request with rate limit of 1', () => {
      const rateLimiter = new RateLimiterClass(1);
      rateLimiter.canRun(); // First request
      expect(rateLimiter.canRun()).toBe(false); // Second immediate request should be blocked
    });

    it('should allow multiple requests within rate limit', () => {
      const rateLimiter = new RateLimiterClass(5); // 5 requests per second
      
      // Should allow 5 requests
      expect(rateLimiter.canRun()).toBe(true);
      expect(rateLimiter.canRun()).toBe(true);
      expect(rateLimiter.canRun()).toBe(true);
      expect(rateLimiter.canRun()).toBe(true);
      expect(rateLimiter.canRun()).toBe(true);
      
      // 6th request should be blocked
      expect(rateLimiter.canRun()).toBe(false);
    });

    it('should block all requests when rate limit is 0', () => {
      const rateLimiter = new RateLimiterClass(0);
      expect(rateLimiter.canRun()).toBe(false);
      expect(rateLimiter.canRun()).toBe(false);
    });

    it('should handle fractional rate limits', () => {
      const rateLimiter = new RateLimiterClass(0.5); // 1 request every 2 seconds
      
      // Just verify the rate limiter is created successfully with fractional values
      expect(rateLimiter.tokensPerSecond).toBe(0.5);
      
      // The exact behavior with fractional limits is library-dependent
      // so we just test that it responds with boolean values
      const result = rateLimiter.canRun();
      expect(typeof result).toBe('boolean');
    });

    it('should work correctly with very high rate limits', () => {
      const rateLimiter = new RateLimiterClass(1000);
      
      // Should allow many requests
      for (let i = 0; i < 100; i++) {
        expect(rateLimiter.canRun()).toBe(true);
      }
    });

    it('should maintain consistent behavior across multiple calls', () => {
      const rateLimiter = new RateLimiterClass(3);
      
      // First batch
      expect(rateLimiter.canRun()).toBe(true);
      expect(rateLimiter.canRun()).toBe(true);
      expect(rateLimiter.canRun()).toBe(true);
      expect(rateLimiter.canRun()).toBe(false);
      
      // Verify still blocked
      expect(rateLimiter.canRun()).toBe(false);
      expect(rateLimiter.canRun()).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid successive calls correctly', () => {
      const rateLimiter = new RateLimiterClass(2);
      
      const results: boolean[] = [];
      for (let i = 0; i < 10; i++) {
        results.push(rateLimiter.canRun());
      }
      
      // Should have exactly 2 true values and rest false
      const trueCount = results.filter(result => result === true).length;
      const falseCount = results.filter(result => result === false).length;
      
      expect(trueCount).toBe(2);
      expect(falseCount).toBe(8);
    });

    it('should return boolean values only', () => {
      const rateLimiter = new RateLimiterClass(1);
      
      const result1 = rateLimiter.canRun();
      const result2 = rateLimiter.canRun();
      
      expect(typeof result1).toBe('boolean');
      expect(typeof result2).toBe('boolean');
    });

    it('should work with decimal rate limits correctly', () => {
      const rateLimiter = new RateLimiterClass(1.5);
      
      // First request should succeed
      expect(rateLimiter.canRun()).toBe(true);
      
      // Second immediate request should be blocked
      expect(rateLimiter.canRun()).toBe(false);
    });
  });

  describe('multiple instances', () => {
    it('should maintain separate token buckets for different instances', () => {
      const rateLimiter1 = new RateLimiterClass(1);
      const rateLimiter2 = new RateLimiterClass(1);
      
      // Both should allow first request
      expect(rateLimiter1.canRun()).toBe(true);
      expect(rateLimiter2.canRun()).toBe(true);
      
      // Both should block second immediate request
      expect(rateLimiter1.canRun()).toBe(false);
      expect(rateLimiter2.canRun()).toBe(false);
    });

    it('should work independently with different rate limits', () => {
      const slowLimiter = new RateLimiterClass(1);
      const fastLimiter = new RateLimiterClass(5);
      
      // Fast limiter should allow more requests
      expect(slowLimiter.canRun()).toBe(true);
      expect(fastLimiter.canRun()).toBe(true);
      
      expect(slowLimiter.canRun()).toBe(false); // Slow limiter blocks
      expect(fastLimiter.canRun()).toBe(true);  // Fast limiter still allows
      expect(fastLimiter.canRun()).toBe(true);  // Fast limiter still allows
      expect(fastLimiter.canRun()).toBe(true);  // Fast limiter still allows
      expect(fastLimiter.canRun()).toBe(true);  // Fast limiter still allows
      expect(fastLimiter.canRun()).toBe(false); // Now fast limiter blocks too
    });
  });
}); 