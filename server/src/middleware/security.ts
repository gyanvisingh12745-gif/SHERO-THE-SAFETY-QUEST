import { Request, Response, NextFunction } from 'express';

/**
 * Custom lightweight security headers middleware (Helmet equivalent without extra dependency)
 */
export function securityHeadersMiddleware(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:; img-src 'self' data: blob: https:; connect-src 'self' https:;"
  );
  next();
}

interface RateLimitEntry {
  tokens: number;
  lastRefill: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_TOKENS = 120; // 120 requests per minute per IP

/**
 * In-memory sliding token bucket rate limiter
 */
export function rateLimiterMiddleware(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  let entry = rateLimitMap.get(ip);
  if (!entry) {
    entry = { tokens: MAX_TOKENS, lastRefill: now };
    rateLimitMap.set(ip, entry);
  } else {
    const elapsed = now - entry.lastRefill;
    if (elapsed > WINDOW_MS) {
      entry.tokens = MAX_TOKENS;
      entry.lastRefill = now;
    }
  }

  if (entry.tokens <= 0) {
    res.setHeader('Retry-After', '60');
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please slow down and try again shortly.',
      retryAfterSeconds: 60
    });
    return;
  }

  entry.tokens -= 1;
  res.setHeader('RateLimit-Limit', MAX_TOKENS.toString());
  res.setHeader('RateLimit-Remaining', entry.tokens.toString());
  res.setHeader('RateLimit-Reset', Math.ceil((entry.lastRefill + WINDOW_MS - now) / 1000).toString());

  next();
}
