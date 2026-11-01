/**
 * SHERO: The Safety Quest — Reusable Game Engine
 * Handles mission progression, dynamic token interpolation ({playerName}/{hero}),
 * choice consequences, branching navigation, retry logic, score calculations,
 * and persistent player progress.
 */

import crypto from 'crypto';
import { queryAll, queryOne, execute, recordGameResult } from '../db';

export interface InterpolationContext {
  playerName: string;
  lang: string;
}

/**
 * Replaces {playerName} and {hero} dynamically with sanitized player name
 * Strictly ensures no hardcoded names (like 'Gyanvi') persist in output
 */
export function interpolateTokens(text: string | null | undefined, ctx: InterpolationContext): string {
  if (!text) return '';
  const fallback = ctx.lang === 'hi' ? 'शेरो' : 'Shero';
  const name = ctx.playerName && ctx.playerName.trim() ? ctx.playerName.trim() : fallback;

  return text
    .replace(/\{playerName\}/g, name)
    .replace(/\{hero\}/g, name)
    .replace(/\bGyanvi\b/gi, name); // Strict filter against legacy hardcoded name
}

export interface PlayerProfile {
  id: string;
  guestToken: string;
  displayName: string;
  isGuest: boolean;
  language: string;
  soundEnabled: boolean;
  totalScore: number;
  safetyRating: string;
  completedMissionsCount: number;
}

export function getOrCreatePlayer(guestToken?: string, requestedName?: string): PlayerProfile {
  let player: any = null;

  if (guestToken) {
    player = queryOne<any>(
      `SELECT p.id, p.guest_token as guestToken, p.display_name as displayName, p.is_guest as isGuest,
              s.language, s.sound_enabled as soundEnabled,
              prog.total_score as totalScore, prog.safety_rating as safetyRating, prog.completed_missions_count as completedMissionsCount
       FROM players p
       LEFT JOIN player_settings s ON s.player_id = p.id
       LEFT JOIN player_progress prog ON prog.player_id = p.id
       WHERE p.guest_token = ?`,
      [guestToken]
    );
  }

  if (!player) {
    const newId = crypto.randomUUID();
    const token = guestToken || `guest_${crypto.randomUUID().slice(0, 16)}`;
    const name = requestedName && requestedName.trim() ? requestedName.trim().slice(0, 32) : 'Shero';

    execute(
      `INSERT INTO players (id, guest_token, display_name, is_guest) VALUES (?, ?, ?, 1)`,
      [newId, token, name]
    );

    execute(
      `INSERT INTO player_settings (player_id, language, sound_enabled) VALUES (?, 'en', 1)`,
      [newId]
    );

    execute(
      `INSERT INTO player_progress (id, player_id, total_score, safety_rating, completed_missions_count)
       VALUES (?, ?, 0, 'Novice Defender', 0)`,
      [crypto.randomUUID(), newId]
    );

    return {
      id: newId,
      guestToken: token,
      displayName: name,
      isGuest: true,
      language: 'en',
      soundEnabled: true,
      totalScore: 0,
      safetyRating: 'Novice Defender',
      completedMissionsCount: 0
    };
  }

  return {
    id: player.id,
    guestToken: player.guestToken,
    displayName: player.displayName,
    isGuest: Boolean(player.isGuest),
    language: player.language || 'en',
    soundEnabled: Boolean(player.soundEnabled ?? 1),
    totalScore: Number(player.totalScore || 0),
    safetyRating: player.safetyRating || 'Novice Defender',
    completedMissionsCount: Number(player.completedMissionsCount || 0)
  };
}

export function calculateSafetyRating(totalScore: number): string {
  if (totalScore >= 800) return 'Legendary Guardian';
  if (totalScore >= 500) return 'Master Defender';
  if (totalScore >= 300) return 'Vigilant Protector';
  if (totalScore >= 100) return 'Awareness Sentinel';
  return 'Novice Defender';
}

export interface FormattedDialogue {
  id: string;
  order: number;
  speakerType: string;
  speakerName: string;
  dialogueText: string;
  thoughtText: string | null;
  emotion: string;
  sfxCue: string | null;
  avatarKey: string | null;
}

export interface FormattedChoice {
  id: string;
  order: number;
  choiceText: string;
  feedbackText: string;
  educationalTip: string;
  sfxEmotion: string;
  nextSceneId: string;
}

export interface FormattedScene {
  id: string;
  missionId: string;
  sceneOrder: number;
  sceneType: string;
  title: string;
  environmentName: string;
  narrativeText: string;
  promptText: string;
  backgroundKey: string;
  musicCue: string;
  characterAvatar: string | null;
  dialogues: FormattedDialogue[];
  choices: FormattedChoice[];
}

export function formatSceneForPlayer(sceneId: string, ctx: InterpolationContext): FormattedScene | null {
  const sceneRow = queryOne<any>(
    `SELECT s.id, s.mission_id as missionId, s.scene_order as sceneOrder, s.scene_type as sceneType,
            s.background_key as backgroundKey, s.music_cue as musicCue,
            c.avatar_key as characterAvatar,
            t.title, t.environment_name as environmentName, t.narrative_text as narrativeText, t.prompt_text as promptText
     FROM scenes s
     LEFT JOIN characters c ON c.id = s.character_id
     LEFT JOIN scene_translations t ON t.scene_id = s.id AND t.lang = ?
     WHERE s.id = ?`,
    [ctx.lang, sceneId]
  );

  if (!sceneRow) return null;

  // Fetch dialogues
  const dialogueRows = queryAll<any>(
    `SELECT d.id, d.dialogue_order as dialogueOrder, d.speaker_type as speakerType,
            d.emotion, d.sfx_cue as sfxCue,
            c.avatar_key as avatarKey,
            t.speaker_name as speakerName, t.dialogue_text as dialogueText, t.thought_text as thoughtText
     FROM dialogues d
     LEFT JOIN characters c ON c.id = d.character_id
     LEFT JOIN dialogue_translations t ON t.dialogue_id = d.id AND t.lang = ?
     WHERE d.scene_id = ?
     ORDER BY d.dialogue_order ASC`,
    [ctx.lang, sceneId]
  );

  // Fetch choices
  const choiceRows = queryAll<any>(
    `SELECT ch.id, ch.choice_order as choiceOrder, ch.sfx_emotion as sfxEmotion, ch.next_scene_id as nextSceneId,
            t.choice_text as choiceText, t.feedback_text as feedbackText, t.educational_tip as educationalTip
     FROM choices ch
     LEFT JOIN choice_translations t ON t.choice_id = ch.id AND t.lang = ?
     WHERE ch.scene_id = ?
     ORDER BY ch.choice_order ASC`,
    [ctx.lang, sceneId]
  );

  const formattedDialogues: FormattedDialogue[] = dialogueRows.map(d => ({
    id: d.id,
    order: Number(d.dialogueOrder),
    speakerType: d.speakerType,
    speakerName: interpolateTokens(d.speakerName, ctx),
    dialogueText: interpolateTokens(d.dialogueText, ctx),
    thoughtText: d.thoughtText ? interpolateTokens(d.thoughtText, ctx) : null,
    emotion: d.emotion,
    sfxCue: d.sfxCue,
    avatarKey: d.avatarKey || (d.speakerType === 'hero' ? 'hero_neutral' : null)
  }));

  const formattedChoices: FormattedChoice[] = choiceRows.map(c => ({
    id: c.id,
    order: Number(c.choiceOrder),
    choiceText: interpolateTokens(c.choiceText, ctx),
    feedbackText: interpolateTokens(c.feedbackText, ctx),
    educationalTip: interpolateTokens(c.educationalTip, ctx),
    sfxEmotion: c.sfxEmotion,
    nextSceneId: c.nextSceneId
  }));

  return {
    id: sceneRow.id,
    missionId: sceneRow.missionId,
    sceneOrder: Number(sceneRow.sceneOrder),
    sceneType: sceneRow.sceneType,
    title: interpolateTokens(sceneRow.title, ctx),
    environmentName: interpolateTokens(sceneRow.environmentName, ctx),
    narrativeText: interpolateTokens(sceneRow.narrativeText, ctx),
    promptText: interpolateTokens(sceneRow.promptText, ctx),
    backgroundKey: sceneRow.backgroundKey,
    musicCue: sceneRow.musicCue,
    characterAvatar: sceneRow.characterAvatar,
    dialogues: formattedDialogues,
    choices: formattedChoices
  };
}

/**
 * Starts a mission for a player and returns the initial scene
 */
export function startMission(playerId: string, missionIdOrSlug: string, lang = 'en') {
  const mission = queryOne<any>(
    `SELECT id, slug, number, category, difficulty, badge_name, badge_icon, badge_description
     FROM missions
     WHERE (id = ? OR slug = ?) AND is_published = 1`,
    [missionIdOrSlug, missionIdOrSlug]
  );

  if (!mission) {
    throw new Error(`Mission not found: ${missionIdOrSlug}`);
  }

  const player = queryOne<any>(`SELECT id, display_name FROM players WHERE id = ?`, [playerId]);
  if (!player) {
    throw new Error(`Player not found: ${playerId}`);
  }

  const ctx: InterpolationContext = {
    playerName: player.display_name,
    lang
  };

  // Find first scene
  const firstScene = queryOne<any>(
    `SELECT id FROM scenes WHERE mission_id = ? ORDER BY scene_order ASC LIMIT 1`,
    [mission.id]
  );

  if (!firstScene) {
    throw new Error(`Mission ${mission.id} has no configured scenes`);
  }

  // Create or reset mission_progress
  const existingProg = queryOne<any>(
    `SELECT id, attempts, score FROM mission_progress WHERE player_id = ? AND mission_id = ?`,
    [playerId, mission.id]
  );

  if (existingProg) {
    execute(
      `UPDATE mission_progress
       SET status = 'in_progress', attempts = attempts + 1, current_scene_id = ?, started_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [firstScene.id, existingProg.id]
    );
  } else {
    execute(
      `INSERT INTO mission_progress (id, player_id, mission_id, status, score, attempts, current_scene_id)
       VALUES (?, ?, ?, 'in_progress', 0, 1, ?)`,
      [crypto.randomUUID(), playerId, mission.id, firstScene.id]
    );
  }

  // Update current mission in player_progress
  execute(
    `UPDATE player_progress SET current_mission_id = ?, updated_at = CURRENT_TIMESTAMP WHERE player_id = ?`,
    [mission.id, playerId]
  );

  const scene = formatSceneForPlayer(firstScene.id, ctx);
  return {
    mission: {
      id: mission.id,
      slug: mission.slug,
      number: mission.number,
      category: mission.category,
      difficulty: mission.difficulty,
      badgeName: mission.badge_name,
      badgeIcon: mission.badge_icon
    },
    scene
  };
}

/**
 * Submits a choice, processes scoring and branching, records history, and returns consequences
 */
export function processChoice(playerId: string, missionId: string, sceneId: string, choiceId: string, lang = 'en') {
  const player = queryOne<any>(`SELECT id, display_name FROM players WHERE id = ?`, [playerId]);
  if (!player) throw new Error('Player not found');

  const ctx: InterpolationContext = { playerName: player.display_name, lang };

  // Fetch choice with translation
  const choice = queryOne<any>(
    `SELECT ch.id, ch.scene_id as sceneId, ch.is_correct as isCorrect,
            ch.safety_score_delta as safetyDelta, ch.boundaries_delta as boundariesDelta, ch.support_delta as supportDelta,
            ch.sfx_emotion as sfxEmotion, ch.next_scene_id as nextSceneId,
            t.feedback_text as feedbackText, t.educational_tip as educationalTip
     FROM choices ch
     LEFT JOIN choice_translations t ON t.choice_id = ch.id AND t.lang = ?
     WHERE ch.id = ? AND ch.scene_id = ?`,
    [lang, choiceId, sceneId]
  );

  if (!choice) {
    throw new Error(`Invalid choice ${choiceId} for scene ${sceneId}`);
  }

  const isCorrect = Boolean(choice.isCorrect);
  const scoreDelta = Number(choice.safetyDelta);

  // Record choice in audit history
  execute(
    `INSERT INTO player_choices_history (id, player_id, mission_id, scene_id, choice_id, is_correct, score_delta)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [crypto.randomUUID(), playerId, missionId, sceneId, choiceId, choice.isCorrect, scoreDelta]
  );

  // Update mission progress score
  const prog = queryOne<any>(
    `SELECT id, score, status FROM mission_progress WHERE player_id = ? AND mission_id = ?`,
    [playerId, missionId]
  );

  let newScore = (prog ? Number(prog.score) : 0) + scoreDelta;
  if (newScore < 0) newScore = 0;

  // Determine next scene
  const currentScene = queryOne<any>(`SELECT scene_type, scene_order FROM scenes WHERE id = ?`, [sceneId]);
  const isFinalOutcome = currentScene && (currentScene.scene_type === 'outcome' || choice.nextSceneId === sceneId);

  let nextScene: FormattedScene | null = null;
  let isMissionCompleted = false;
  let unlockedBadge: any = null;
  let unlockedAchievement: any = null;

  if (isCorrect && !isFinalOutcome && choice.nextSceneId) {
    nextScene = formatSceneForPlayer(choice.nextSceneId, ctx);
    execute(
      `UPDATE mission_progress SET score = ?, current_scene_id = ? WHERE player_id = ? AND mission_id = ?`,
      [newScore, choice.nextSceneId, playerId, missionId]
    );
  } else if (isCorrect && isFinalOutcome) {
    isMissionCompleted = true;
    execute(
      `UPDATE mission_progress
       SET score = ?, status = 'completed', completed_at = CURRENT_TIMESTAMP
       WHERE player_id = ? AND mission_id = ?`,
      [newScore, playerId, missionId]
    );

    // Update overall player progress
    const playerProg = queryOne<any>(`SELECT id, total_score, completed_missions_count FROM player_progress WHERE player_id = ?`, [playerId]);
    const updatedTotalScore = (playerProg ? Number(playerProg.total_score) : 0) + newScore;
    const completedCountRes = queryOne<any>(
      `SELECT COUNT(*) as cnt FROM mission_progress WHERE player_id = ? AND status = 'completed'`,
      [playerId]
    );
    const updatedCompletedCount = completedCountRes ? Number(completedCountRes.cnt) : 1;
    const rating = calculateSafetyRating(updatedTotalScore);

    execute(
      `UPDATE player_progress
       SET total_score = ?, safety_rating = ?, completed_missions_count = ?, updated_at = CURRENT_TIMESTAMP
       WHERE player_id = ?`,
      [updatedTotalScore, rating, updatedCompletedCount, playerId]
    );

    // Legacy mirror
    recordGameResult(missionId, newScore, 'completed', 3);

    // Mission badge
    const missionData = queryOne<any>(
      `SELECT badge_name, badge_icon, badge_description FROM missions WHERE id = ?`,
      [missionId]
    );
    if (missionData) {
      unlockedBadge = {
        name: missionData.badge_name,
        icon: missionData.badge_icon,
        description: missionData.badge_description
      };
    }

    // Check achievement unlock
    const ach = queryOne<any>(
      `SELECT a.id, a.code, a.icon, t.title, t.description
       FROM achievements a
       LEFT JOIN achievement_translations t ON t.achievement_id = a.id AND t.lang = ?
       LIMIT 1`,
      [lang]
    );
    if (ach) {
      unlockedAchievement = {
        id: ach.id,
        code: ach.code,
        icon: ach.icon,
        title: ach.title,
        description: ach.description
      };
    }
  } else {
    // Incorrect choice: player stays on scene to retry
    execute(
      `UPDATE mission_progress SET score = ? WHERE player_id = ? AND mission_id = ?`,
      [newScore, playerId, missionId]
    );
  }

  return {
    isCorrect,
    feedback: interpolateTokens(choice.feedbackText, ctx),
    educationalTip: interpolateTokens(choice.educationalTip, ctx),
    sfxEmotion: choice.sfxEmotion,
    safetyDelta: scoreDelta,
    boundariesDelta: Number(choice.boundariesDelta),
    supportDelta: Number(choice.supportDelta),
    currentScore: newScore,
    isCompleted: isMissionCompleted,
    nextScene,
    unlockedBadge,
    unlockedAchievement
  };
}
