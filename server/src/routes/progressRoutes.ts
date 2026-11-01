import { Router, Response } from 'express';
import { queryAll, queryOne } from '../db';
import { AuthenticatedRequest, playerSessionMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/v1/progress
router.get('/', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const playerId = req.player!.id;
  const lang = (req.query.lang as string) === 'hi' ? 'hi' : 'en';

  // Overall player progress
  const overall = queryOne<any>(
    `SELECT total_score as totalScore, safety_rating as safetyRating, completed_missions_count as completedMissionsCount,
            current_mission_id as currentMissionId, updated_at as updatedAt
     FROM player_progress
     WHERE player_id = ?`,
    [playerId]
  );

  // Per-mission progress
  const missionProgressRows = queryAll<any>(
    `SELECT mp.mission_id as missionId, m.slug, m.number, m.badge_name as badgeName, m.badge_icon as badgeIcon,
            mp.status, mp.score, mp.attempts, mp.completed_at as completedAt
     FROM mission_progress mp
     JOIN missions m ON m.id = mp.mission_id
     WHERE mp.player_id = ?
     ORDER BY m.number ASC`,
    [playerId]
  );

  // Unlocked achievements
  const achievementRows = queryAll<any>(
    `SELECT a.id, a.code, a.icon, a.points, t.title, t.description, pa.unlocked_at as unlockedAt
     FROM player_achievements pa
     JOIN achievements a ON a.id = pa.achievement_id
     LEFT JOIN achievement_translations t ON t.achievement_id = a.id AND t.lang = ?
     WHERE pa.player_id = ?`,
    [lang, playerId]
  );

  // Earned badges from completed missions
  const earnedBadges = missionProgressRows
    .filter(m => m.status === 'completed')
    .map(m => ({
      missionId: m.missionId,
      badgeName: m.badgeName,
      badgeIcon: m.badgeIcon,
      earnedAt: m.completedAt
    }));

  res.json({
    success: true,
    progress: {
      totalScore: Number(overall?.totalScore || 0),
      safetyRating: overall?.safetyRating || 'Novice Defender',
      completedMissionsCount: Number(overall?.completedMissionsCount || 0),
      totalMissions: 12,
      completionPercentage: Math.round(((overall?.completedMissionsCount || 0) / 12) * 100),
      currentMissionId: overall?.currentMissionId || null,
      missions: missionProgressRows,
      badges: earnedBadges,
      achievements: achievementRows
    }
  });
});

export default router;
