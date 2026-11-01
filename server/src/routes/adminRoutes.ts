import { Router, Request, Response, NextFunction } from 'express';
import { queryAll, queryOne, execute } from '../db';
import { adminGuardMiddleware } from '../middleware/auth';
import { cacheService } from '../services/cacheService';

const router = Router();
router.use(adminGuardMiddleware);

// GET /api/v1/admin/missions
router.get('/missions', (req: Request, res: Response, next: NextFunction) => {
  try {
    const missions = queryAll<any>(
      `SELECT m.id, m.slug, m.number, m.category, m.difficulty, m.is_published as isPublished,
              COUNT(s.id) as totalScenes
       FROM missions m
       LEFT JOIN scenes s ON s.mission_id = m.id
       GROUP BY m.id
       ORDER BY m.number ASC`
    );

    res.json({
      success: true,
      count: missions.length,
      missions: missions.map(m => ({
        ...m,
        isPublished: Boolean(m.isPublished),
        totalScenes: Number(m.totalScenes)
      }))
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/admin/missions/:id/publish
router.patch('/missions/:id/publish', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const current = queryOne<any>(`SELECT id, is_published FROM missions WHERE id = ?`, [id]);
    if (!current) {
      res.status(404).json({ success: false, error: 'Mission not found' });
      return;
    }

    const newStatus = isPublished !== undefined ? (isPublished ? 1 : 0) : (current.is_published ? 0 : 1);
    execute(`UPDATE missions SET is_published = ? WHERE id = ?`, [newStatus, id]);
    cacheService.invalidate('missions_list');

    res.json({
      success: true,
      message: `Mission ${id} publish status updated to ${Boolean(newStatus)}`,
      isPublished: Boolean(newStatus)
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/admin/audit
router.get('/audit', (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = queryAll<any>(
      `SELECT id, player_id as playerId, event_type as eventType, payload_json as payload, created_at as createdAt
       FROM game_events
       ORDER BY created_at DESC
       LIMIT 50`
    );

    res.json({
      success: true,
      count: events.length,
      events: events.map(e => ({
        ...e,
        payload: JSON.parse(e.payload || '{}')
      }))
    });
  } catch (err) {
    next(err);
  }
});

export default router;
