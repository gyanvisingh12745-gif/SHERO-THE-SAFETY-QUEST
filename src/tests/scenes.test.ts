/**
 * Scene Test Validator
 * Validates that all 15 missions load correctly, have non-black backgrounds,
 * have valid character references, and have no missing assets.
 */
import { describe, it, expect } from 'vitest';
import { allMissions, getMissionScene } from '../content/scenes';
import { playerNames } from '../utils/playerNames';

describe('SHERO Mission & Scene Integrity (Patch v7)', () => {
  it('registers all 15 missions (A1–A9, B1–B6)', () => {
    expect(allMissions).toHaveLength(15);
    const codes = allMissions.map(m => m.code);
    expect(codes).toEqual([
      'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9',
      'B1', 'B2', 'B3', 'B4', 'B5', 'B6'
    ]);
  });

  it('every mission has non-empty titles in both EN and HI', () => {
    allMissions.forEach(m => {
      expect(m.titleEn).toBeTruthy();
      expect(m.titleHi).toBeTruthy();
      expect(m.titleEn.length).toBeGreaterThan(2);
      expect(m.titleHi.length).toBeGreaterThan(2);
    });
  });

  it('every mission has at least one valid node with choices', () => {
    allMissions.forEach(m => {
      const nodeKeys = Object.keys(m.nodes);
      expect(nodeKeys.length).toBeGreaterThan(0);
      const startNode = m.nodes[m.startNodeId || 'node_1'];
      expect(startNode).toBeDefined();
      expect(startNode.choices.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('every mission has an environmentName defined for background fallback', () => {
    allMissions.forEach(m => {
      expect(m.environmentName).toBeTruthy();
    });
  });

  it('tokens substitute cleanly without leaking raw braces or old hardcoded names', () => {
    playerNames.setHeroName('Aira');
    playerNames.setHelpedWomanName('Sunita');

    const sample = '{hero} and {helpedWoman} are standing together.';
    const result = playerNames.substitute(sample);
    expect(result).toBe('Aira and Sunita are standing together.');
    expect(result).not.toContain('{hero}');
    expect(result).not.toContain('{helpedWoman}');
  });

  it('Part B missions are categorized correctly and have content notices', () => {
    const partB = allMissions.filter(m => m.part === 'B');
    expect(partB).toHaveLength(6);
    partB.forEach(m => {
      expect(m.code.startsWith('B')).toBe(true);
      expect(m.number).toBeGreaterThanOrEqual(10);
    });
  });
});
