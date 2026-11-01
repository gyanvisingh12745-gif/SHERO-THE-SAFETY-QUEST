/**
 * SHERO: The Safety Quest — Relational Database Schema DDL
 * Comprehensive schema for players, settings, 12 missions, scenes, dialogues,
 * choices, branching rules, progress, safety resources, and achievements.
 */

export const SCHEMA_SQL = `
  PRAGMA foreign_keys = ON;

  -- 1. Players & Sessions
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    guest_token TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL DEFAULT 'Shero',
    is_guest INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 2. Player Settings & Preferences
  CREATE TABLE IF NOT EXISTS player_settings (
    player_id TEXT PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
    language TEXT NOT NULL DEFAULT 'en',
    sound_enabled INTEGER NOT NULL DEFAULT 1,
    sfx_volume INTEGER NOT NULL DEFAULT 80,
    bgm_volume INTEGER NOT NULL DEFAULT 70,
    text_speed TEXT NOT NULL DEFAULT 'normal',
    font_scale REAL NOT NULL DEFAULT 1.0,
    high_contrast INTEGER NOT NULL DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 3. Characters Directory
  CREATE TABLE IF NOT EXISTS characters (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    default_name TEXT NOT NULL,
    role TEXT NOT NULL,
    avatar_key TEXT NOT NULL
  );

  -- 4. Canonical Missions
  CREATE TABLE IF NOT EXISTS missions (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    number INTEGER NOT NULL UNIQUE,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'Beginner',
    estimated_minutes INTEGER NOT NULL DEFAULT 6,
    badge_name TEXT NOT NULL,
    badge_icon TEXT NOT NULL,
    badge_description TEXT NOT NULL,
    is_published INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 5. Mission Translations
  CREATE TABLE IF NOT EXISTS mission_translations (
    id TEXT PRIMARY KEY,
    mission_id TEXT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    lang TEXT NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    summary TEXT NOT NULL,
    learning_goal TEXT NOT NULL,
    UNIQUE(mission_id, lang)
  );

  -- 6. Mission Scenes
  CREATE TABLE IF NOT EXISTS scenes (
    id TEXT PRIMARY KEY,
    mission_id TEXT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    scene_order INTEGER NOT NULL,
    scene_type TEXT NOT NULL DEFAULT 'decision',
    character_id TEXT REFERENCES characters(id),
    background_key TEXT NOT NULL,
    music_cue TEXT NOT NULL DEFAULT 'ambient_tension',
    UNIQUE(mission_id, scene_order)
  );

  -- 7. Scene Translations
  CREATE TABLE IF NOT EXISTS scene_translations (
    id TEXT PRIMARY KEY,
    scene_id TEXT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    lang TEXT NOT NULL,
    title TEXT NOT NULL,
    environment_name TEXT NOT NULL,
    narrative_text TEXT NOT NULL,
    prompt_text TEXT NOT NULL,
    UNIQUE(scene_id, lang)
  );

  -- 8. Dialogues
  CREATE TABLE IF NOT EXISTS dialogues (
    id TEXT PRIMARY KEY,
    scene_id TEXT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    dialogue_order INTEGER NOT NULL,
    speaker_type TEXT NOT NULL,
    character_id TEXT REFERENCES characters(id),
    emotion TEXT NOT NULL DEFAULT 'neutral',
    sfx_cue TEXT,
    UNIQUE(scene_id, dialogue_order)
  );

  -- 9. Dialogue Translations
  CREATE TABLE IF NOT EXISTS dialogue_translations (
    id TEXT PRIMARY KEY,
    dialogue_id TEXT NOT NULL REFERENCES dialogues(id) ON DELETE CASCADE,
    lang TEXT NOT NULL,
    speaker_name TEXT NOT NULL,
    dialogue_text TEXT NOT NULL,
    thought_text TEXT,
    UNIQUE(dialogue_id, lang)
  );

  -- 10. Choices
  CREATE TABLE IF NOT EXISTS choices (
    id TEXT PRIMARY KEY,
    scene_id TEXT NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    choice_order INTEGER NOT NULL,
    is_correct INTEGER NOT NULL DEFAULT 0,
    safety_score_delta INTEGER NOT NULL DEFAULT 0,
    boundaries_delta INTEGER NOT NULL DEFAULT 0,
    support_delta INTEGER NOT NULL DEFAULT 0,
    sfx_emotion TEXT NOT NULL DEFAULT 'ping',
    next_scene_id TEXT REFERENCES scenes(id),
    UNIQUE(scene_id, choice_order)
  );

  -- 11. Choice Translations
  CREATE TABLE IF NOT EXISTS choice_translations (
    id TEXT PRIMARY KEY,
    choice_id TEXT NOT NULL REFERENCES choices(id) ON DELETE CASCADE,
    lang TEXT NOT NULL,
    choice_text TEXT NOT NULL,
    feedback_text TEXT NOT NULL,
    educational_tip TEXT NOT NULL,
    UNIQUE(choice_id, lang)
  );

  -- 12. Branching Rules
  CREATE TABLE IF NOT EXISTS branching_rules (
    id TEXT PRIMARY KEY,
    choice_id TEXT NOT NULL REFERENCES choices(id) ON DELETE CASCADE,
    condition_type TEXT NOT NULL DEFAULT 'always',
    condition_value TEXT,
    target_scene_id TEXT NOT NULL REFERENCES scenes(id)
  );

  -- 13. Overall Player Progress
  CREATE TABLE IF NOT EXISTS player_progress (
    id TEXT PRIMARY KEY,
    player_id TEXT NOT NULL UNIQUE REFERENCES players(id) ON DELETE CASCADE,
    current_mission_id TEXT REFERENCES missions(id),
    total_score INTEGER NOT NULL DEFAULT 0,
    safety_rating TEXT NOT NULL DEFAULT 'Novice Defender',
    completed_missions_count INTEGER NOT NULL DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 14. Per-Mission Progress
  CREATE TABLE IF NOT EXISTS mission_progress (
    id TEXT PRIMARY KEY,
    player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    mission_id TEXT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'not_started',
    score INTEGER NOT NULL DEFAULT 0,
    attempts INTEGER NOT NULL DEFAULT 0,
    current_scene_id TEXT REFERENCES scenes(id),
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    UNIQUE(player_id, mission_id)
  );

  -- 15. Choice History Audit
  CREATE TABLE IF NOT EXISTS player_choices_history (
    id TEXT PRIMARY KEY,
    player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    mission_id TEXT NOT NULL REFERENCES missions(id),
    scene_id TEXT NOT NULL REFERENCES scenes(id),
    choice_id TEXT NOT NULL REFERENCES choices(id),
    is_correct INTEGER NOT NULL,
    score_delta INTEGER NOT NULL,
    chosen_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 16. Achievements Directory
  CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    icon TEXT NOT NULL,
    category TEXT NOT NULL,
    points INTEGER NOT NULL DEFAULT 50
  );

  -- 17. Achievement Translations
  CREATE TABLE IF NOT EXISTS achievement_translations (
    id TEXT PRIMARY KEY,
    achievement_id TEXT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    lang TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    UNIQUE(achievement_id, lang)
  );

  -- 18. Player Unlocked Achievements
  CREATE TABLE IF NOT EXISTS player_achievements (
    id TEXT PRIMARY KEY,
    player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, achievement_id)
  );

  -- 19. Verified Safety Resources Directory
  CREATE TABLE IF NOT EXISTS safety_resources (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    phone TEXT NOT NULL,
    secondary_phone TEXT,
    sms_number TEXT,
    website TEXT,
    available_hours TEXT NOT NULL DEFAULT '24/7',
    is_verified INTEGER NOT NULL DEFAULT 1,
    national_priority INTEGER NOT NULL DEFAULT 1
  );

  -- 20. Safety Resource Translations
  CREATE TABLE IF NOT EXISTS safety_resource_translations (
    id TEXT PRIMARY KEY,
    resource_id TEXT NOT NULL REFERENCES safety_resources(id) ON DELETE CASCADE,
    lang TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    address TEXT,
    steps_to_access TEXT NOT NULL,
    UNIQUE(resource_id, lang)
  );

  -- 21. Game Events / Telemetry
  CREATE TABLE IF NOT EXISTS game_events (
    id TEXT PRIMARY KEY,
    player_id TEXT REFERENCES players(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 22. Legacy Backward-Compatible Tables
  CREATE TABLE IF NOT EXISTS game_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mission_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    status TEXT NOT NULL,
    decisions_completed INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS mission_completions (
    mission_id TEXT PRIMARY KEY,
    best_score INTEGER NOT NULL,
    completed_count INTEGER DEFAULT 1,
    last_completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS global_stats (
    key TEXT PRIMARY KEY,
    value_num INTEGER DEFAULT 0
  );

  -- Indexes for optimal lookup performance
  CREATE INDEX IF NOT EXISTS idx_players_guest_token ON players(guest_token);
  CREATE INDEX IF NOT EXISTS idx_scenes_mission_order ON scenes(mission_id, scene_order);
  CREATE INDEX IF NOT EXISTS idx_scene_trans ON scene_translations(scene_id, lang);
  CREATE INDEX IF NOT EXISTS idx_dialogues_scene ON dialogues(scene_id, dialogue_order);
  CREATE INDEX IF NOT EXISTS idx_choices_scene ON choices(scene_id, choice_order);
  CREATE INDEX IF NOT EXISTS idx_mission_progress_player ON mission_progress(player_id, mission_id);
  CREATE INDEX IF NOT EXISTS idx_choice_history_player ON player_choices_history(player_id, mission_id);
  CREATE INDEX IF NOT EXISTS idx_safety_resources_cat ON safety_resources(category);
`;
