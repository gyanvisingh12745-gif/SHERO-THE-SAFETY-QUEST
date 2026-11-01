import { describe, it, expect } from 'vitest';
import { allMissions, getMissionScene } from '../content/scenes';
import { playerNames } from '../utils/playerNames';
import { CHARACTER_VOICE_CONFIGS, EMOTION_INTERJECTIONS } from '../utils/speech';
import { storage } from '../utils/storage';
import manifest from '../../public/assets/assets.json';

describe('SHERO Quality Gates: Scenarios, Naming, Voices & Assets', () => {
  it('Quality Gate 1: Player Name substitution strictly removes hardcoded names', () => {
    playerNames.setHeroName('Ananya');
    expect(playerNames.getHeroName()).toBe('Ananya');

    const sampleEn = 'Hi, I am {hero}! Gyanvi is on her way to college.';
    const sampleHi = 'नमस्ते, मैं हूँ {hero}! ज्ञानवी कॉलेज जा रही है।';

    const substitutedEn = playerNames.substitute(sampleEn);
    const substitutedHi = playerNames.substitute(sampleHi);

    expect(substitutedEn).not.toContain('Gyanvi');
    expect(substitutedEn).toContain('Ananya');
    expect(substitutedHi).not.toContain('ज्ञानवी');
    expect(substitutedHi).toContain('Ananya');
  });

  it('Quality Gate 2: All 15 missions exist and contain valid English & Hindi content', () => {
    expect(allMissions.length).toBe(15);

    const partA = allMissions.filter(m => m.part === 'A');
    const partB = allMissions.filter(m => m.part === 'B');

    expect(partA.length).toBe(9);
    expect(partB.length).toBe(6);

    allMissions.forEach(mission => {
      expect(mission.id).toBeDefined();
      expect(mission.titleEn).toBeTruthy();
      expect(mission.titleHi).toBeTruthy();
      expect(mission.nodes).toBeDefined();

      const nodeKeys = Object.keys(mission.nodes);
      expect(nodeKeys.length).toBeGreaterThan(0);

      nodeKeys.forEach(nKey => {
        const node = mission.nodes[nKey];
        expect(node.questionEn).toBeTruthy();
        expect(node.questionHi).toBeTruthy();
        expect(node.choices.length).toBeGreaterThanOrEqual(1);

        node.choices.forEach(choice => {
          expect(choice.textEn).toBeTruthy();
          expect(choice.textHi).toBeTruthy();
          expect(choice.feedbackEn).toBeTruthy();
          expect(choice.feedbackHi).toBeTruthy();
          expect(typeof choice.isCorrect).toBe('boolean');
        });
      });
    });
  });

  it('Quality Gate 3: Voice configurations exist for all required character roles', () => {
    const roles = [
      'hero',
      'helpedWoman',
      'friendBold',
      'friendKind',
      'friendLively',
      'friendSweet',
      'stranger',
      'husband',
      'busDriver',
      'cabDriver',
      'counsellor',
      'lawyer',
      'policeOfficer',
      'doctor',
      'banker',
      'recruiter',
      'narrator'
    ] as const;

    roles.forEach(role => {
      const cfg = CHARACTER_VOICE_CONFIGS[role];
      expect(cfg).toBeDefined();
      expect(cfg.basePitch).toBeGreaterThan(0.5);
      expect(cfg.baseRate).toBeGreaterThan(0.5);
      expect(['female', 'male']).toContain(cfg.gender);
    });
  });

  it('Quality Gate 4: Emotional interjections exist in both Hindi and English', () => {
    const emotions = ['scared', 'relieved', 'laughing', 'shocked', 'determined', 'happy'] as const;

    emotions.forEach(em => {
      expect(EMOTION_INTERJECTIONS.en[em]).toBeDefined();
      expect(EMOTION_INTERJECTIONS.hi[em]).toBeDefined();
      // Ensure Hindi interjections contain Devanagari characters
      expect(/[\u0900-\u097F]/.test(EMOTION_INTERJECTIONS.hi[em])).toBe(true);
    });
  });

  it('Quality Gate 5: Asset manifest contains all responsive background and UI keys', () => {
    expect(manifest.backgrounds.title_sunset).toBeDefined();
    expect(manifest.backgrounds.bus_stop_dusk).toBeDefined();
    expect(manifest.backgrounds.cab_ride).toBeDefined();
    expect(manifest.backgrounds.crowded_market).toBeDefined();
    expect(manifest.backgrounds.night_pharmacy).toBeDefined();
    expect(manifest.backgrounds.campus_fest).toBeDefined();
    expect(manifest.backgrounds.sakhi_centre).toBeDefined();
    expect(manifest.backgrounds.legal_aid_office).toBeDefined();

    expect(manifest.ui.celebration_fx).toBeDefined();
    expect(manifest.ui.warning_alert_fx).toBeDefined();

    expect(manifest.characters.hero).toBeDefined();
    expect(manifest.characters.friend_aanya).toBeDefined();
    expect(manifest.characters.helped_woman_anjali).toBeDefined();
    expect(manifest.characters.stranger_antagonist).toBeDefined();
    expect(manifest.characters.husband_antagonist).toBeDefined();
  });
});
