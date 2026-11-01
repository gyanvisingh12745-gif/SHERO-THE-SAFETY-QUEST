import { Request, Response, NextFunction } from 'express';
import { getOrCreatePlayer, PlayerProfile } from '../engine/gameEngine';

export interface AuthenticatedRequest extends Request {
  player?: PlayerProfile;
}

/**
 * Extracts player session from header 'x-guest-token' or query 'guestToken'
 * Automatically creates or retrieves player profile
 */
export function playerSessionMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = (req.headers['x-guest-token'] as string) || (req.query.guestToken as string) || undefined;
  try {
    req.player = getOrCreatePlayer(token);
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Guards admin endpoints using ADMIN_API_KEY
 */
export function adminGuardMiddleware(req: Request, res: Response, next: NextFunction) {
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_API_KEY || 'shero_admin_secret_key_2026';

  if (!adminKey || adminKey !== expectedKey) {
    res.status(403).json({
      success: false,
      error: 'Forbidden: Invalid or missing administrator credentials'
    });
    return;
  }
  next();
}
