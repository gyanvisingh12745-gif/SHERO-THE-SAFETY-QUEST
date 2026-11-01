/**
 * SHERO: The Safety Quest — Database Seeder
 * Populates characters, achievements, safety resources, and the 12 canonical missions
 * along with scenes, dialogues, choices, and branching rules.
 */

import { Database } from 'sql.js';
import {
  SEED_CHARACTERS,
  SEED_ACHIEVEMENTS,
  SEED_SAFETY_RESOURCES,
  SEED_MISSIONS
} from './seedData';

export function seedDatabase(db: Database) {
  // Check if missions already seeded
  const existingRes = db.exec('SELECT COUNT(*) FROM missions');
  const existingCount = existingRes.length > 0 && existingRes[0].values.length > 0
    ? Number(existingRes[0].values[0][0])
    : 0;

  if (existingCount >= 12) {
    // Already populated
    return;
  }

  // 1. Seed Characters
  for (const c of SEED_CHARACTERS) {
    db.run(
      `INSERT OR REPLACE INTO characters (id, code, default_name, role, avatar_key)
       VALUES (?, ?, ?, ?, ?)`,
      [c.id, c.code, c.defaultName, c.role, c.avatarKey]
    );
  }

  // 2. Seed Achievements & Translations
  for (const a of SEED_ACHIEVEMENTS) {
    db.run(
      `INSERT OR REPLACE INTO achievements (id, code, icon, category, points)
       VALUES (?, ?, ?, ?, ?)`,
      [a.id, a.code, a.icon, a.category, a.points]
    );

    db.run(
      `INSERT OR REPLACE INTO achievement_translations (id, achievement_id, lang, title, description)
       VALUES (?, ?, ?, ?, ?)`,
      [`${a.id}_en`, a.id, 'en', a.translations.en.title, a.translations.en.description]
    );

    db.run(
      `INSERT OR REPLACE INTO achievement_translations (id, achievement_id, lang, title, description)
       VALUES (?, ?, ?, ?, ?)`,
      [`${a.id}_hi`, a.id, 'hi', a.translations.hi.title, a.translations.hi.description]
    );
  }

  // 3. Seed Safety Resources & Translations
  for (const r of SEED_SAFETY_RESOURCES) {
    db.run(
      `INSERT OR REPLACE INTO safety_resources (
        id, code, category, phone, secondary_phone, sms_number, website, available_hours, is_verified, national_priority
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        r.id,
        r.code,
        r.category,
        r.phone,
        r.secondaryPhone || null,
        r.smsNumber || null,
        r.website || null,
        r.availableHours,
        r.isVerified,
        r.nationalPriority
      ]
    );

    db.run(
      `INSERT OR REPLACE INTO safety_resource_translations (
        id, resource_id, lang, name, description, address, steps_to_access
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        `${r.id}_en`,
        r.id,
        'en',
        r.translations.en.name,
        r.translations.en.description,
        r.translations.en.address || null,
        r.translations.en.stepsToAccess
      ]
    );

    db.run(
      `INSERT OR REPLACE INTO safety_resource_translations (
        id, resource_id, lang, name, description, address, steps_to_access
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        `${r.id}_hi`,
        r.id,
        'hi',
        r.translations.hi.name,
        r.translations.hi.description,
        r.translations.hi.address || null,
        r.translations.hi.stepsToAccess
      ]
    );
  }

  // 4. Seed Missions (Pass 1: Master metadata & translations)
  for (const m of SEED_MISSIONS) {
    db.run(
      `INSERT OR REPLACE INTO missions (
        id, slug, number, category, difficulty, estimated_minutes, badge_name, badge_icon, badge_description, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        m.id,
        m.slug,
        m.number,
        m.category,
        m.difficulty,
        m.estimatedMinutes,
        m.badgeName,
        m.badgeIcon,
        m.badgeDescription
      ]
    );

    db.run(
      `INSERT OR REPLACE INTO mission_translations (
        id, mission_id, lang, title, tagline, summary, learning_goal
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        `${m.id}_en`,
        m.id,
        'en',
        m.translations.en.title,
        m.translations.en.tagline,
        m.translations.en.summary,
        m.translations.en.learningGoal
      ]
    );

    db.run(
      `INSERT OR REPLACE INTO mission_translations (
        id, mission_id, lang, title, tagline, summary, learning_goal
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        `${m.id}_hi`,
        m.id,
        'hi',
        m.translations.hi.title,
        m.translations.hi.tagline,
        m.translations.hi.summary,
        m.translations.hi.learningGoal
      ]
    );
  }

  // 5. Seed Scenes (Pass 2: All scenes inserted before choices to satisfy foreign key constraints)
  for (const m of SEED_MISSIONS) {
    for (const s of m.scenes) {
      const charId = s.characterCode ? `char_${s.characterCode}` : null;

      db.run(
        `INSERT OR REPLACE INTO scenes (
          id, mission_id, scene_order, scene_type, character_id, background_key, music_cue
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [s.id, m.id, s.sceneOrder, s.sceneType, charId, s.backgroundKey, s.musicCue]
      );

      db.run(
        `INSERT OR REPLACE INTO scene_translations (
          id, scene_id, lang, title, environment_name, narrative_text, prompt_text
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          `${s.id}_en`,
          s.id,
          'en',
          s.translations.en.title,
          s.translations.en.environmentName,
          s.translations.en.narrativeText,
          s.translations.en.promptText
        ]
      );

      db.run(
        `INSERT OR REPLACE INTO scene_translations (
          id, scene_id, lang, title, environment_name, narrative_text, prompt_text
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          `${s.id}_hi`,
          s.id,
          'hi',
          s.translations.hi.title,
          s.translations.hi.environmentName,
          s.translations.hi.narrativeText,
          s.translations.hi.promptText
        ]
      );
    }
  }

  // 6. Seed Dialogues, Choices & Branching Rules (Pass 3: All scenes now exist in DB)
  for (const m of SEED_MISSIONS) {
    for (const s of m.scenes) {
      // Dialogues
      for (const d of s.dialogues) {
        const dlgCharId = d.characterCode ? `char_${d.characterCode}` : null;
        db.run(
          `INSERT OR REPLACE INTO dialogues (
            id, scene_id, dialogue_order, speaker_type, character_id, emotion, sfx_cue
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [d.id, s.id, d.dialogueOrder, d.speakerType, dlgCharId, d.emotion, d.sfxCue || null]
        );

        db.run(
          `INSERT OR REPLACE INTO dialogue_translations (
            id, dialogue_id, lang, speaker_name, dialogue_text, thought_text
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            `${d.id}_en`,
            d.id,
            'en',
            d.translations.en.speakerName,
            d.translations.en.dialogueText,
            d.translations.en.thoughtText || null
          ]
        );

        db.run(
          `INSERT OR REPLACE INTO dialogue_translations (
            id, dialogue_id, lang, speaker_name, dialogue_text, thought_text
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            `${d.id}_hi`,
            d.id,
            'hi',
            d.translations.hi.speakerName,
            d.translations.hi.dialogueText,
            d.translations.hi.thoughtText || null
          ]
        );
      }

      // Choices
      for (const c of s.choices) {
        const targetScene = m.scenes.find(sc => sc.sceneOrder === c.nextSceneOrder);
        const nextSceneId = targetScene ? targetScene.id : s.id;

        db.run(
          `INSERT OR REPLACE INTO choices (
            id, scene_id, choice_order, is_correct, safety_score_delta, boundaries_delta, support_delta, sfx_emotion, next_scene_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            c.id,
            s.id,
            c.choiceOrder,
            c.isCorrect,
            c.safetyScoreDelta,
            c.boundariesDelta,
            c.supportDelta,
            c.sfxEmotion,
            nextSceneId
          ]
        );

        db.run(
          `INSERT OR REPLACE INTO choice_translations (
            id, choice_id, lang, choice_text, feedback_text, educational_tip
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            `${c.id}_en`,
            c.id,
            'en',
            c.translations.en.choiceText,
            c.translations.en.feedbackText,
            c.translations.en.educationalTip
          ]
        );

        db.run(
          `INSERT OR REPLACE INTO choice_translations (
            id, choice_id, lang, choice_text, feedback_text, educational_tip
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            `${c.id}_hi`,
            c.id,
            'hi',
            c.translations.hi.choiceText,
            c.translations.hi.feedbackText,
            c.translations.hi.educationalTip
          ]
        );

        // Branching rule
        db.run(
          `INSERT OR REPLACE INTO branching_rules (
            id, choice_id, condition_type, target_scene_id
          ) VALUES (?, ?, 'always', ?)`,
          [`rule_${c.id}`, c.id, nextSceneId]
        );
      }
    }
  }
}
