import { Router, Response } from 'express';
import { queryAll, queryOne } from '../db';
import { AuthenticatedRequest, playerSessionMiddleware } from '../middleware/auth';
import { interpolateTokens } from '../engine/gameEngine';
import { cacheService } from '../services/cacheService';

const router = Router();

// GET /api/v1/missions
router.get('/', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const lang = (req.query.lang as string) === 'hi' ? 'hi' : 'en';
  const playerName = req.player?.displayName || 'Shero';
  const playerId = req.player?.id;

  const cacheKey = `missions_list_${lang}`;
  let baseMissions = cacheService.get<any[]>(cacheKey);

  if (!baseMissions) {
    baseMissions = queryAll<any>(
      `SELECT m.id, m.slug, m.number, m.category, m.difficulty, m.estimated_minutes as estimatedMinutes,
              m.badge_name as badgeName, m.badge_icon as badgeIcon, m.badge_description as badgeDescription,
              t.title, t.tagline, t.summary, t.learning_goal as learningGoal
       FROM missions m
       LEFT JOIN mission_translations t ON t.mission_id = m.id AND t.lang = ?
       WHERE m.is_published = 1
       ORDER BY m.number ASC`,
      [lang]
    );
    cacheService.set(cacheKey, baseMissions, 10 * 60 * 1000);
  }

  // Fetch player progress for each mission if authenticated
  const progressMap = new Map<string, { status: string; score: number; attempts: number }>();
  if (playerId) {
    const progRows = queryAll<any>(
      `SELECT mission_id as missionId, status, score, attempts FROM mission_progress WHERE player_id = ?`,
      [playerId]
    );
    progRows.forEach(p => progressMap.set(p.missionId, { status: p.status, score: Number(p.score), attempts: Number(p.attempts) }));
  }

  const results = baseMissions.map(m => {
    const prog = progressMap.get(m.id);
    const ctx = { playerName, lang };
    return {
      id: m.id,
      slug: m.slug,
      number: Number(m.number),
      category: m.category,
      difficulty: m.difficulty,
      estimatedMinutes: Number(m.estimatedMinutes),
      badgeName: m.badgeName,
      badgeIcon: m.badgeIcon,
      badgeDescription: interpolateTokens(m.badgeDescription, ctx),
      title: interpolateTokens(m.title, ctx),
      tagline: interpolateTokens(m.tagline, ctx),
      summary: interpolateTokens(m.summary, ctx),
      learningGoal: interpolateTokens(m.learningGoal, ctx),
      status: prog ? prog.status : 'not_started',
      bestScore: prog ? prog.score : 0,
      attempts: prog ? prog.attempts : 0
    };
  });

  res.json({ success: true, count: results.length, missions: results });
});

// GET /api/v1/missions/:idOrSlug
router.get('/:idOrSlug', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { idOrSlug } = req.params;
  const lang = (req.query.lang as string) === 'hi' ? 'hi' : 'en';
  const playerName = req.player?.displayName || 'Shero';
  const ctx = { playerName, lang };

  const mission = queryOne<any>(
    `SELECT m.id, m.slug, m.number, m.category, m.difficulty, m.estimated_minutes as estimatedMinutes,
            m.badge_name as badgeName, m.badge_icon as badgeIcon, m.badge_description as badgeDescription,
            t.title, t.tagline, t.summary, t.learning_goal as learningGoal
     FROM missions m
     LEFT JOIN mission_translations t ON t.mission_id = m.id AND t.lang = ?
     WHERE (m.id = ? OR m.slug = ?) AND m.is_published = 1`,
    [lang, idOrSlug, idOrSlug]
  );

  if (!mission) {
    res.status(404).json({ success: false, error: 'Mission not found' });
    return;
  }

  // Get scenes overview
  const scenes = queryAll<any>(
    `SELECT s.id, s.scene_order as sceneOrder, s.scene_type as sceneType, s.background_key as backgroundKey,
            t.title, t.environment_name as environmentName
     FROM scenes s
     LEFT JOIN scene_translations t ON t.scene_id = s.id AND t.lang = ?
     WHERE s.mission_id = ?
     ORDER BY s.scene_order ASC`,
    [lang, mission.id]
  );

  const formattedScenes = scenes.map(s => ({
    id: s.id,
    sceneOrder: Number(s.sceneOrder),
    sceneType: s.sceneType,
    backgroundKey: s.backgroundKey,
    title: interpolateTokens(s.title, ctx),
    environmentName: interpolateTokens(s.environmentName, ctx)
  }));

  res.json({
    success: true,
    mission: {
      id: mission.id,
      slug: mission.slug,
      number: Number(mission.number),
      category: mission.category,
      difficulty: mission.difficulty,
      estimatedMinutes: Number(mission.estimatedMinutes),
      badgeName: mission.badgeName,
      badgeIcon: mission.badgeIcon,
      badgeDescription: interpolateTokens(mission.badgeDescription, ctx),
      title: interpolateTokens(mission.title, ctx),
      tagline: interpolateTokens(mission.tagline, ctx),
      summary: interpolateTokens(mission.summary, ctx),
      learningGoal: interpolateTokens(mission.learningGoal, ctx),
      scenes: formattedScenes
    }
  });
});

export default router;
