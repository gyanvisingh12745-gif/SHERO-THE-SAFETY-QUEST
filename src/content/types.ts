export type CharacterExpression =
  | 'neutral'
  | 'happy'
  | 'laughing'
  | 'shocked'
  | 'scared'
  | 'nervous'
  | 'sad'
  | 'angry'
  | 'annoyed'
  | 'determined'
  | 'thinking'
  | 'embarrassed'
  | 'relieved'
  | 'hopeful'
  | 'worried'
  | 'teary'
  | 'concerned'
  | 'kind'
  | 'cold'
  | 'numb';

export type CharacterId =
  | 'gyanvi'
  | 'aanya'
  | 'meera'
  | 'riya'
  | 'mahima'
  | 'anjali'
  | 'rohan'
  | 'sunita_aunty'
  | 'counselor_priya'
  | 'stranger'
  | 'cab_driver'
  | 'shopkeeper'
  | 'guard'
  | 'auto_driver'
  | 'fake_recruiter'
  | 'stalker_ex'
  | 'scammer';

export type MangaEffect =
  | 'speed_lines'
  | 'impact_burst'
  | 'shock_sparks'
  | 'halftone'
  | 'heartbeat_pulse'
  | 'glow_focus'
  | 'red_alert'
  | 'none';

export type MangaBadge =
  | 'GASP!'
  | 'THUMP THUMP!'
  | 'HONK!'
  | 'SCAM!'
  | 'STOP!'
  | 'BLOCK!'
  | 'PING!'
  | 'SWEATDROP...'
  | 'PHEW~'
  | 'EH?!'
  | 'AHA!'
  | 'BEWARE!';

export type LightingMood =
  | 'night_blue'
  | 'dusk_golden'
  | 'amber_interior'
  | 'market_sunshine'
  | 'neon_rain'
  | 'dawn_hope'
  | 'tension_dark';

export type WeatherEffect =
  | 'clear'
  | 'light_rain'
  | 'wind_leaves'
  | 'ambient_dust'
  | 'passing_lights';

export interface IntroPanel {
  id?: string;
  title?: string;
  titleHi?: string;
  captionEn: string;
  captionHi: string;
  visualKey?: string;
  imageKey?: string;
  badge?: string;
  soundEffect?: string;
  sfx?: string;
}

export interface CrowdCharacter {
  id: CharacterId | string;
  name: string;
  role: string;
  position: 'left_far' | 'left_mid' | 'right_mid' | 'right_far';
  expression: CharacterExpression;
}

export interface StoryboardTurn {
  id: string;
  imageSrc?: string; // e.g. '/assets/mission-01/player/player_neutral.webp'
  titleEn?: string;
  titleHi?: string;
  speaker: string;
  speakerId?: string;
  speakerRole: 'hero' | 'stranger' | 'narrator' | 'friend';
  speakerExpression?: CharacterExpression;
  heroExpression?: CharacterExpression;
  bubbleType?: 'speech' | 'thought' | 'narration' | 'shout' | 'phone' | 'whisper' | 'flashback';
  textEn: string;
  textHi: string;
  thoughtEn?: string;
  thoughtHi?: string;
  mangaBadge?: string | null;
  sfx?: string | null;
  reaction?: string;
  cameraZoom?: 'normal' | 'close_up' | 'wide' | 'pan_slow';
}

export interface SceneChoice {
  id: string;
  textEn: string;
  textHi: string;
  isCorrect: boolean;
  feedbackEn: string;
  feedbackHi: string;
  educationalTipEn: string;
  educationalTipHi: string;
  safetyDelta: number;
  boundariesDelta?: number;
  independenceDelta?: number;
  supportDelta?: number;
  outcomeImageSrc?: string; // e.g. '/assets/mission-01/outcomes/outcome_safe_decision.webp'
  outcomeSpeaker?: string;
  outcomeSpeakerRole?: 'hero' | 'stranger' | 'narrator';
  outcomeDialogueEn?: string;
  outcomeDialogueHi?: string;
  outcomeSfx?: string;
}

export interface SceneNode {
  id: string;
  decisionNumber: number;
  backgroundKey: string;
  lighting: LightingMood;
  weather: WeatherEffect;
  situationEn: string;
  situationHi: string;
  speakerId: CharacterId;
  speakerName: string;
  speakerExpression: CharacterExpression;
  speakerDialogueEn: string;
  speakerDialogueHi: string;
  heroExpression: CharacterExpression;
  heroThoughtEn?: string;
  heroThoughtHi?: string;
  heroResponseDialogueEn?: string;
  heroResponseDialogueHi?: string;
  mangaEffect: MangaEffect;
  mangaBadge?: MangaBadge;
  crowd: CrowdCharacter[];
  questionEn: string;
  questionHi: string;
  choices: SceneChoice[];
  winningNextNodeId: string;
}

export interface MissionSceneData {
  id: string;
  part: 'A' | 'B';
  code: string; // 'A1' - 'A9', 'B1' - 'B6'
  number: number;
  titleEn: string;
  titleHi: string;
  taglineEn: string;
  taglineHi: string;
  environmentName: string;
  badgeName: string;
  badgeIcon: string;
  content_notice?: {
    part: string;
    titleEn: string;
    titleHi: string;
    bodyEn: string;
    bodyHi: string;
  };
  introPanels: IntroPanel[];
  storyboardTurns?: StoryboardTurn[];
  takeawayImageSrc?: string;
  startNodeId: string;
  nodes: Record<string, SceneNode>;
  takeawayEn: {
    title: string;
    checklist: string[];
    motto: string;
  };
  takeawayHi: {
    title: string;
    checklist: string[];
    motto: string;
  };
}
