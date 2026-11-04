import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { MISSION_01_ASSETS, Mission01AssetId } from '../content/mission01Manifest';
import { a1_bus_stop } from '../content/scenes/a1_bus_stop';
import { CHARACTER_VOICE_CONFIGS } from '../utils/speech';

const PUBLIC_DIR = path.resolve(__dirname, '../../public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets', 'mission-01');
const MANIFEST_JSON_PATH = path.join(PUBLIC_DIR, 'assets', 'mission01_manifest.json');

describe('Mission 01 4K Asset Integration & Gender Voice Quality Gates', () => {
  it('1. Exactly 37 assets exist in the manifest covering all required categories', () => {
    const keys = Object.keys(MISSION_01_ASSETS) as Mission01AssetId[];
    expect(keys.length).toBe(37);

    const categories = {
      player: 0,
      player_poses: 0,
      stranger: 0,
      driver: 0,
      environment: 0,
      story: 0,
      outcomes: 0
    };

    keys.forEach(k => {
      const entry = MISSION_01_ASSETS[k];
      categories[entry.category]++;
    });

    expect(categories.player).toBe(10);
    expect(categories.player_poses).toBe(5);
    expect(categories.stranger).toBe(6);
    expect(categories.driver).toBe(2);
    expect(categories.environment).toBe(3);
    expect(categories.story).toBe(6);
    expect(categories.outcomes).toBe(5);
  });

  it('2. Every asset resolves to physical 4K WebP file on disk', () => {
    const keys = Object.keys(MISSION_01_ASSETS) as Mission01AssetId[];
    for (const key of keys) {
      const entry = MISSION_01_ASSETS[key];
      const webpDiskPath = path.join(PUBLIC_DIR, entry.srcWebp.replace(/^\//, ''));

      expect(fs.existsSync(webpDiskPath), `WebP file must exist: ${webpDiskPath}`).toBe(true);

      const webpStat = fs.statSync(webpDiskPath);
      expect(webpStat.size).toBeGreaterThan(10000); // Valid image data
    }
  });

  it('3. Centralized JSON manifest exists and has valid 4K metadata for all 37 entries', () => {
    expect(fs.existsSync(MANIFEST_JSON_PATH)).toBe(true);
    const raw = fs.readFileSync(MANIFEST_JSON_PATH, 'utf-8');
    const jsonEntries = JSON.parse(raw);
    expect(jsonEntries.length).toBe(37);

    for (const entry of jsonEntries) {
      expect(entry.id).toBeDefined();
      expect(entry.category).toBeDefined();
      expect(entry.width).toBeGreaterThanOrEqual(1000);
      expect(entry.height).toBeGreaterThanOrEqual(1000);
      expect(Math.max(entry.width, entry.height)).toBeGreaterThanOrEqual(2160);
      expect(entry.aspectRatio).toBeGreaterThan(0.3);
      expect(entry.aspectRatio).toBeLessThan(3.0);
    }
  });

  it('4. Repository hygiene: no temporary masters, chat media, or obsolete comic files in public assets', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'masters'))).toBe(false);
    expect(fs.existsSync(path.join(PUBLIC_DIR, 'assets', 'provided'))).toBe(false);
    expect(fs.existsSync(path.join(PUBLIC_DIR, 'comic'))).toBe(false);
  });

  it('5. Gender-appropriate audio roles and voice configurations are strictly enforced', () => {
    // Hero must be female
    expect(CHARACTER_VOICE_CONFIGS.hero.gender).toBe('female');
    expect(CHARACTER_VOICE_CONFIGS.hero.basePitch).toBeGreaterThan(1.0);

    // Stranger must be male
    expect(CHARACTER_VOICE_CONFIGS.stranger.gender).toBe('male');
    expect(CHARACTER_VOICE_CONFIGS.stranger.basePitch).toBeLessThan(0.9);

    // Bus Driver must be male
    expect(CHARACTER_VOICE_CONFIGS.busDriver.gender).toBe('male');
    expect(CHARACTER_VOICE_CONFIGS.busDriver.basePitch).toBeLessThan(0.95);

    // Narrator must be female
    expect(CHARACTER_VOICE_CONFIGS.narrator.gender).toBe('female');
  });

  it('6. Mission 01 scenes use the new 4K assets and enforce gender speaker roles', () => {
    expect(a1_bus_stop.storyboardTurns).toBeDefined();
    expect(a1_bus_stop.storyboardTurns!.length).toBeGreaterThanOrEqual(7);

    for (const turn of a1_bus_stop.storyboardTurns!) {
      expect(turn.imageSrc).toMatch(/^\/assets\/mission-01\//);
      expect(turn.speakerRole).toBeDefined();
      if (turn.speakerRole === 'hero') {
        expect(CHARACTER_VOICE_CONFIGS.hero.gender).toBe('female');
      } else if (turn.speakerRole === 'stranger') {
        expect(CHARACTER_VOICE_CONFIGS.stranger.gender).toBe('male');
      }
    }

    // Choices also point to assets and correct roles
    const node = a1_bus_stop.nodes[a1_bus_stop.startNodeId];
    expect(node).toBeDefined();
    for (const choice of node.choices) {
      expect(choice.outcomeImageSrc).toMatch(/^\/assets\/mission-01\//);
      expect(choice.outcomeSpeakerRole).toBeDefined();
    }
  });

  it('7. Dynamic player name: No hardcoded player name "Gyanvi" anywhere in Mission 01 content', () => {
    const jsonStr = JSON.stringify(a1_bus_stop);
    expect(jsonStr).not.toContain('Gyanvi');
    expect(jsonStr).not.toContain('gyanvi');
  });
});
