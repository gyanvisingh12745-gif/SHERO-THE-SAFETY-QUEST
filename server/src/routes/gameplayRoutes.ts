import { Router, Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest, playerSessionMiddleware } from '../middleware/auth';
import { startMission, processChoice, formatSceneForPlayer } from '../engine/gameEngine';

const router = Router();

const StartMissionSchema = z.object({
  missionId: z.string().min(1),
  lang: z.enum(['en', 'hi']).optional()
});

const SubmitChoiceSchema = z.object({
  missionId: z.string().min(1),
  sceneId: z.string().min(1),
  choiceId: z.string().min(1),
  lang: z.enum(['en', 'hi']).optional()
});

// POST /api/v1/gameplay/start
router.post('/start', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const parse = StartMissionSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ success: false, error: 'Invalid mission start request', details: parse.error.format() });
      return;
    }

    const { missionId, lang = 'en' } = parse.data;
    const result = startMission(req.player!.id, missionId, lang);

    res.json({
      success: true,
      mission: result.mission,
      scene: result.scene
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/gameplay/scene
router.get('/scene', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const sceneId = req.query.sceneId as string;
    const lang = (req.query.lang as string) === 'hi' ? 'hi' : 'en';

    if (!sceneId) {
      res.status(400).json({ success: false, error: 'Missing sceneId parameter' });
      return;
    }

    const scene = formatSceneForPlayer(sceneId, {
      playerName: req.player!.displayName,
      lang
    });

    if (!scene) {
      res.status(404).json({ success: false, error: 'Scene not found' });
      return;
    }

    res.json({ success: true, scene });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/gameplay/choice
router.post('/choice', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const parse = SubmitChoiceSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ success: false, error: 'Invalid choice payload', details: parse.error.format() });
      return;
    }

    const { missionId, sceneId, choiceId, lang = 'en' } = parse.data;
    const result = processChoice(req.player!.id, missionId, sceneId, choiceId, lang);

    res.json({
      success: true,
      result
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/gameplay/retry
router.post('/retry', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { sceneId, lang = 'en' } = req.body;
    if (!sceneId) {
      res.status(400).json({ success: false, error: 'Missing sceneId parameter' });
      return;
    }

    const scene = formatSceneForPlayer(sceneId, {
      playerName: req.player!.displayName,
      lang: lang === 'hi' ? 'hi' : 'en'
    });

    if (!scene) {
      res.status(404).json({ success: false, error: 'Scene not found' });
      return;
    }

    res.json({ success: true, scene });
  } catch (err) {
    next(err);
  }
});

export default router;
