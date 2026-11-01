import { Router, Response } from 'express';
import crypto from 'crypto';
import { z } from 'zod';
import { queryOne, queryAll, execute } from '../db';
import { AuthenticatedRequest, playerSessionMiddleware } from '../middleware/auth';

const router = Router();

const EventSchema = z.object({
  eventType: z.string().min(1).max(64),
  payload: z.record(z.any()).optional()
});

// POST /api/v1/analytics/event
router.post('/event', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const parse = EventSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ success: false, error: 'Invalid event payload' });
      return;
    }

    const { eventType, payload = {} } = parse.data;
    const playerId = req.player?.id || null;

    execute(
      `INSERT INTO game_events (id, player_id, event_type, payload_json) VALUES (?, ?, ?, ?)`,
      [crypto.randomUUID(), playerId, eventType, JSON.stringify(payload)]
    );

    res.json({ success: true, message: 'Event logged successfully' });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/analytics/stats
router.get('/stats', (req, res, next) => {
  try {
    const totalPlayersRes = queryOne<any>(`SELECT COUNT(*) as cnt FROM players`);
    const totalCompletionsRes = queryOne<any>(`SELECT COUNT(*) as cnt FROM mission_progress WHERE status = 'completed'`);
    const totalChoicesRes = queryOne<any>(`SELECT COUNT(*) as cnt FROM player_choices_history`);
    const correctChoicesRes = queryOne<any>(`SELECT COUNT(*) as cnt FROM player_choices_history WHERE is_correct = 1`);

    const missionStats = queryAll<any>(
      `SELECT m.id, m.number, m.slug,
              COUNT(mp.id) as totalAttempts,
              SUM(CASE WHEN mp.status = 'completed' THEN 1 ELSE 0 END) as totalCompletions,
              AVG(mp.score) as averageScore
       FROM missions m
       LEFT JOIN mission_progress mp ON mp.mission_id = m.id
       GROUP BY m.id
       ORDER BY m.number ASC`
    );

    const totalChoices = Number(totalChoicesRes?.cnt || 0);
    const correctChoices = Number(correctChoicesRes?.cnt || 0);
    const accuracyRate = totalChoices > 0 ? Math.round((correctChoices / totalChoices) * 100) : 100;

    res.json({
      success: true,
      stats: {
        totalRegisteredPlayers: Number(totalPlayersRes?.cnt || 0),
        totalMissionCompletions: Number(totalCompletionsRes?.cnt || 0),
        totalDecisionsLogged: totalChoices,
        decisionAccuracyPercentage: accuracyRate,
        missionBreakdown: missionStats.map(m => ({
          missionId: m.id,
          number: Number(m.number),
          slug: m.slug,
          attempts: Number(m.totalAttempts || 0),
          completions: Number(m.totalCompletions || 0),
          averageScore: Math.round(Number(m.averageScore || 0))
        }))
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
