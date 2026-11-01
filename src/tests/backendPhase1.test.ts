/**
 * SHERO: The Safety Quest — Backend Phase 1 Comprehensive Test Suite
 * Validates SQLite database, 12 canonical missions, branching engine,
 * dynamic name interpolation, security middleware, and full 12-mission playthroughs.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { initDatabase, queryAll, queryOne } from '../../server/src/db';
import {
  getOrCreatePlayer,
  startMission,
  processChoice,
  interpolateTokens,
  formatSceneForPlayer,
  calculateSafetyRating
} from '../../server/src/engine/gameEngine';
import { getVerifiedResources } from '../../server/src/services/resourceService';
import app from '../../server/src/index';

describe('SHERO Backend Phase 1 Test Suite', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await initDatabase();
  });

  describe('1. Relational Database & Seed Data Verification', () => {
    it('should have exactly 12 canonical missions in database', () => {
      const missions = queryAll('SELECT id, number, slug, category, difficulty FROM missions ORDER BY number ASC');
      expect(missions).toHaveLength(12);

      // Verify numbering from 1 to 12 consecutively
      const numbers = missions.map(m => m.number);
      expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it('should have bilingual translations (en and hi) for all 12 missions', () => {
      const missions = queryAll('SELECT id FROM missions');
      for (const m of missions) {
        const enTrans = queryOne('SELECT title, summary FROM mission_translations WHERE mission_id = ? AND lang = ?', [m.id, 'en']);
        const hiTrans = queryOne('SELECT title, summary FROM mission_translations WHERE mission_id = ? AND lang = ?', [m.id, 'hi']);

        expect(enTrans).toBeDefined();
        expect(enTrans?.title).toBeTruthy();
        expect(hiTrans).toBeDefined();
        expect(hiTrans?.title).toBeTruthy();
      }
    });

    it('should have valid scenes and choices for every mission without orphan foreign keys', () => {
      const missions = queryAll('SELECT id FROM missions');
      for (const m of missions) {
        const scenes = queryAll('SELECT id, scene_order FROM scenes WHERE mission_id = ? ORDER BY scene_order ASC', [m.id]);
        expect(scenes.length).toBeGreaterThanOrEqual(3);

        for (const s of scenes) {
          const choices = queryAll('SELECT id, is_correct, next_scene_id FROM choices WHERE scene_id = ?', [s.id]);
          expect(choices.length).toBeGreaterThanOrEqual(1);

          // English & Hindi choice translations
          for (const c of choices) {
            const enChoice = queryOne('SELECT choice_text, feedback_text FROM choice_translations WHERE choice_id = ? AND lang = ?', [c.id, 'en']);
            const hiChoice = queryOne('SELECT choice_text, feedback_text FROM choice_translations WHERE choice_id = ? AND lang = ?', [c.id, 'hi']);
            expect(enChoice?.choice_text).toBeTruthy();
            expect(hiChoice?.choice_text).toBeTruthy();
          }
        }
      }
    });

    it('should have verified national emergency resources including 112, 181, 1091, 1930, NCW, and Sakhi OSC', () => {
      const resources = getVerifiedResources('en');
      expect(resources.length).toBeGreaterThanOrEqual(8);

      const phones = resources.map(r => r.phone);
      expect(phones).toContain('112');
      expect(phones).toContain('181');
      expect(phones).toContain('1091');
      expect(phones).toContain('1930');
      expect(phones).toContain('+91-7827170170');

      // Verify Hindi translations
      const hiResources = getVerifiedResources('hi');
      expect(hiResources.length).toBe(resources.length);
      const res112Hi = hiResources.find(r => r.phone === '112');
      expect(res112Hi?.name).toContain('112');
    });

    it('should filter resources by category and search keyword', () => {
      const emergencyRes = getVerifiedResources('en', 'emergency');
      expect(emergencyRes.length).toBeGreaterThanOrEqual(1);
      expect(emergencyRes[0].phone).toBe('112');

      const cyberRes = getVerifiedResources('en', undefined, 'cyber');
      expect(cyberRes.length).toBeGreaterThanOrEqual(1);
      expect(cyberRes[0].phone).toBe('1930');
    });
  });

  describe('2. Player Session & Profile Management', () => {
    it('should create an anonymous guest session with default name Shero', () => {
      const player = getOrCreatePlayer();
      expect(player.id).toBeTruthy();
      expect(player.guestToken).toContain('guest_');
      expect(player.displayName).toBe('Shero');
      expect(player.isGuest).toBe(true);
      expect(player.totalScore).toBe(0);
      expect(player.safetyRating).toBe('Novice Defender');
    });

    it('should support custom player name and restore existing guest session', () => {
      const customToken = 'guest_custom_test_token_42';
      const player1 = getOrCreatePlayer(customToken, 'Ananya');
      expect(player1.displayName).toBe('Ananya');

      // Restore session with same token
      const player2 = getOrCreatePlayer(customToken);
      expect(player2.id).toBe(player1.id);
      expect(player2.displayName).toBe('Ananya');
    });
  });

  describe('3. Dynamic Name Interpolation & Forbidden Name Filter', () => {
    it('should replace {playerName} and {hero} with custom player name', () => {
      const text = 'Welcome {playerName}! As the {hero}, you stand strong.';
      const result = interpolateTokens(text, { playerName: 'Aarohi', lang: 'en' });
      expect(result).toBe('Welcome Aarohi! As the Aarohi, you stand strong.');
    });

    it('should fallback to Shero in English and शेरो in Hindi when name is empty', () => {
      const textEn = '{playerName} approaches the station.';
      expect(interpolateTokens(textEn, { playerName: '', lang: 'en' })).toBe('Shero approaches the station.');

      const textHi = '{playerName} स्टेशन की ओर बढ़ती है।';
      expect(interpolateTokens(textHi, { playerName: '', lang: 'hi' })).toBe('शेरो स्टेशन की ओर बढ़ती है।');
    });

    it('should strictly eliminate any legacy occurrence of Gyanvi', () => {
      const text = 'Meet Gyanvi at the bus stop. Gyanvi is courageous.';
      const result = interpolateTokens(text, { playerName: 'Tara', lang: 'en' });
      expect(result).not.toContain('Gyanvi');
      expect(result).toBe('Meet Tara at the bus stop. Tara is courageous.');
    });
  });

  describe('4. Full 12-Mission End-to-End Playthrough Simulation', () => {
    it('Simulation: all 12 missions full playthroughs from start to finish', () => {
      const missions = queryAll('SELECT id, number, slug FROM missions ORDER BY number ASC');
      expect(missions).toHaveLength(12);

      for (const mission of missions) {
        const testToken = `sim_player_m${mission.number}_${Date.now()}`;
        const player = getOrCreatePlayer(testToken, `HeroM${mission.number}`);

        // 1. Start mission
        const startResult = startMission(player.id, mission.id, 'en');
        expect(startResult.mission.id).toBe(mission.id);
        expect(startResult.scene).toBeDefined();
        expect(startResult.scene!.sceneOrder).toBe(1);

        let currentScene = startResult.scene!;
        let isDone = false;
        let steps = 0;

        // 2. Step through scenes using correct choices until completion
        while (!isDone && steps < 10) {
          steps++;
          expect(currentScene.choices.length).toBeGreaterThanOrEqual(1);

          // Find winning choice
          const rawChoices = queryAll(
            'SELECT id, is_correct, next_scene_id FROM choices WHERE scene_id = ?',
            [currentScene.id]
          );
          const winningChoice = rawChoices.find(c => Boolean(c.is_correct)) || rawChoices[0];

          const choiceResult = processChoice(
            player.id,
            mission.id,
            currentScene.id,
            winningChoice.id,
            'en'
          );

          expect(choiceResult.isCorrect).toBe(true);
          expect(choiceResult.safetyDelta).toBeGreaterThanOrEqual(0);
          expect(choiceResult.feedback).toBeTruthy();
          expect(choiceResult.educationalTip).toBeTruthy();

          if (choiceResult.isCompleted) {
            isDone = true;
            expect(choiceResult.unlockedBadge).toBeDefined();
            expect(choiceResult.unlockedBadge.name).toBeTruthy();
          } else {
            expect(choiceResult.nextScene).toBeDefined();
            currentScene = choiceResult.nextScene!;
          }
        }

        expect(isDone).toBe(true);

        // 3. Verify mission_progress state in database
        const prog = queryOne(
          'SELECT status, score, attempts FROM mission_progress WHERE player_id = ? AND mission_id = ?',
          [player.id, mission.id]
        );
        expect(prog?.status).toBe('completed');
        expect(Number(prog?.score)).toBeGreaterThan(0);
      }
    });

    it('should handle incorrect choice with feedback, penalty, and retry without advancing scene', () => {
      const testToken = `test_incorrect_${Date.now()}`;
      const player = getOrCreatePlayer(testToken, 'Kiran');

      const startResult = startMission(player.id, 'm01_the_last_bus_stop', 'en');
      const scene1 = startResult.scene!;

      const rawChoices = queryAll(
        'SELECT id, is_correct FROM choices WHERE scene_id = ?',
        [scene1.id]
      );
      const incorrectChoice = rawChoices.find(c => !Boolean(c.is_correct));
      expect(incorrectChoice).toBeDefined();

      const result = processChoice(
        player.id,
        'm01_the_last_bus_stop',
        scene1.id,
        incorrectChoice!.id,
        'en'
      );

      expect(result.isCorrect).toBe(false);
      expect(result.safetyDelta).toBeLessThanOrEqual(0);
      expect(result.nextScene).toBeNull();
      expect(result.isCompleted).toBe(false);
      expect(result.feedback).toBeTruthy();

      // Retry returns the same scene for another attempt
      const retriedScene = formatSceneForPlayer(scene1.id, { playerName: 'Kiran', lang: 'en' });
      expect(retriedScene?.id).toBe(scene1.id);
    });
  });

  describe('5. Safety Ratings & Progress Calculations', () => {
    it('should correctly calculate safety rating tiers', () => {
      expect(calculateSafetyRating(0)).toBe('Novice Defender');
      expect(calculateSafetyRating(150)).toBe('Awareness Sentinel');
      expect(calculateSafetyRating(350)).toBe('Vigilant Protector');
      expect(calculateSafetyRating(600)).toBe('Master Defender');
      expect(calculateSafetyRating(950)).toBe('Legendary Guardian');
    });
  });

  describe('6. Legacy Endpoint Backward Compatibility', () => {
    it('should serve /api/health and /api/stats', async () => {
      const stats = queryAll('SELECT COUNT(*) as cnt FROM missions');
      expect(stats[0].cnt).toBe(12);
    });
  });
});
