import { Router, Response } from 'express';
import { z } from 'zod';
import { getOrCreatePlayer } from '../engine/gameEngine';
import { queryOne, execute } from '../db';
import { AuthenticatedRequest, playerSessionMiddleware } from '../middleware/auth';

const router = Router();

const GuestInitSchema = z.object({
  guestToken: z.string().optional(),
  displayName: z.string().trim().min(1).max(32).optional()
});

const UpdateProfileSchema = z.object({
  displayName: z.string().trim().min(1).max(32)
});

// POST /api/v1/players/guest
router.post('/guest', (req, res, next) => {
  try {
    const parse = GuestInitSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ success: false, error: 'Invalid payload', details: parse.error.format() });
      return;
    }

    const { guestToken, displayName } = parse.data;
    const player = getOrCreatePlayer(guestToken, displayName);
    res.json({ success: true, player });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/players/me
router.get('/me', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, player: req.player });
});

// PATCH /api/v1/players/me
router.patch('/me', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const parse = UpdateProfileSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ success: false, error: 'Display name must be between 1 and 32 characters' });
      return;
    }

    const cleanName = parse.data.displayName.trim();
    execute(`UPDATE players SET display_name = ?, last_active_at = CURRENT_TIMESTAMP WHERE id = ?`, [
      cleanName,
      req.player!.id
    ]);

    const updated = queryOne<any>(`SELECT id, display_name FROM players WHERE id = ?`, [req.player!.id]);
    res.json({
      success: true,
      player: {
        ...req.player,
        displayName: updated.display_name
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/players/reset
router.post('/reset', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const playerId = req.player!.id;
    execute(`DELETE FROM mission_progress WHERE player_id = ?`, [playerId]);
    execute(`DELETE FROM player_choices_history WHERE player_id = ?`, [playerId]);
    execute(`DELETE FROM player_achievements WHERE player_id = ?`, [playerId]);
    execute(
      `UPDATE player_progress
       SET total_score = 0, safety_rating = 'Novice Defender', completed_missions_count = 0, current_mission_id = NULL, updated_at = CURRENT_TIMESTAMP
       WHERE player_id = ?`,
      [playerId]
    );

    res.json({
      success: true,
      message: 'Player progress has been reset successfully'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
