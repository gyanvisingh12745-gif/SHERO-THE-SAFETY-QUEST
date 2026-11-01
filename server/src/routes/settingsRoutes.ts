import { Router, Response } from 'express';
import { z } from 'zod';
import { queryOne, execute } from '../db';
import { AuthenticatedRequest, playerSessionMiddleware } from '../middleware/auth';

const router = Router();

const SettingsSchema = z.object({
  language: z.enum(['en', 'hi']).optional(),
  soundEnabled: z.boolean().optional(),
  sfxVolume: z.number().min(0).max(100).optional(),
  bgmVolume: z.number().min(0).max(100).optional(),
  textSpeed: z.enum(['slow', 'normal', 'fast']).optional(),
  fontScale: z.number().min(0.8).max(1.5).optional(),
  highContrast: z.boolean().optional()
});

// GET /api/v1/settings
router.get('/', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const playerId = req.player!.id;
  const settings = queryOne<any>(
    `SELECT language, sound_enabled as soundEnabled, sfx_volume as sfxVolume, bgm_volume as bgmVolume,
            text_speed as textSpeed, font_scale as fontScale, high_contrast as highContrast
     FROM player_settings
     WHERE player_id = ?`,
    [playerId]
  );

  res.json({
    success: true,
    settings: {
      language: settings?.language || 'en',
      soundEnabled: Boolean(settings?.soundEnabled ?? 1),
      sfxVolume: Number(settings?.sfxVolume ?? 80),
      bgmVolume: Number(settings?.bgmVolume ?? 70),
      textSpeed: settings?.textSpeed || 'normal',
      fontScale: Number(settings?.fontScale ?? 1.0),
      highContrast: Boolean(settings?.highContrast ?? 0)
    }
  });
});

// PUT /api/v1/settings
router.put('/', playerSessionMiddleware, (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const parse = SettingsSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ success: false, error: 'Invalid settings payload', details: parse.error.format() });
      return;
    }

    const playerId = req.player!.id;
    const current = queryOne<any>(`SELECT * FROM player_settings WHERE player_id = ?`, [playerId]);
    const data = parse.data;

    const lang = data.language ?? current?.language ?? 'en';
    const sound = data.soundEnabled !== undefined ? (data.soundEnabled ? 1 : 0) : (current?.sound_enabled ?? 1);
    const sfx = data.sfxVolume ?? current?.sfx_volume ?? 80;
    const bgm = data.bgmVolume ?? current?.bgm_volume ?? 70;
    const speed = data.textSpeed ?? current?.text_speed ?? 'normal';
    const font = data.fontScale ?? current?.font_scale ?? 1.0;
    const contrast = data.highContrast !== undefined ? (data.highContrast ? 1 : 0) : (current?.high_contrast ?? 0);

    execute(
      `INSERT OR REPLACE INTO player_settings (player_id, language, sound_enabled, sfx_volume, bgm_volume, text_speed, font_scale, high_contrast, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [playerId, lang, sound, sfx, bgm, speed, font, contrast]
    );

    res.json({
      success: true,
      message: 'Settings updated successfully',
      settings: {
        language: lang,
        soundEnabled: Boolean(sound),
        sfxVolume: sfx,
        bgmVolume: bgm,
        textSpeed: speed,
        fontScale: font,
        highContrast: Boolean(contrast)
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
