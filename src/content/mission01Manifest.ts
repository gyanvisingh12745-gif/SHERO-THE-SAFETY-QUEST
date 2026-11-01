/**
 * Centralized Asset Manifest for Mission 01: THE LAST BUS STOP
 * Fully typed, 4K enhanced derivatives with WebP (primary) and PNG (fallback).
 * All assets preserve original aspect ratio and are strictly decoupled from player name text.
 */

export type Mission01AssetId =
  // 1. Player Expressions (10)
  | 'player_neutral'
  | 'player_happy'
  | 'player_excited'
  | 'player_confused'
  | 'player_scared'
  | 'player_shocked'
  | 'player_sad'
  | 'player_crying'
  | 'player_thinking'
  | 'player_determined'
  // 2. Player Poses (5)
  | 'player_standing'
  | 'player_sitting'
  | 'player_looking_back'
  | 'player_holding_phone'
  | 'player_walking_to_safety'
  // 3. Stranger Expressions (6)
  | 'stranger_neutral'
  | 'stranger_speaking'
  | 'stranger_suspicious'
  | 'stranger_smiling'
  | 'stranger_irritated'
  | 'stranger_surprised'
  // 4. Bus Driver Expressions (2)
  | 'driver_neutral'
  | 'driver_helpful'
  // 5. Environment Backgrounds (3)
  | 'busstop_wide'
  | 'busstop_interaction'
  | 'busstop_arrival'
  // 6. Story Illustrations (6)
  | 'story_waiting'
  | 'story_stranger_approaches'
  | 'story_uncomfortable_conversation'
  | 'story_reaching_for_phone'
  | 'story_seeking_assistance'
  | 'story_safe_resolution'
  // 7. Choice Outcomes (5)
  | 'outcome_safe_decision'
  | 'outcome_maintain_distance'
  | 'outcome_ask_for_help'
  | 'outcome_mission_success'
  | 'outcome_mission_ending';

export type Mission01AssetCategory =
  | 'player'
  | 'player_poses'
  | 'stranger'
  | 'driver'
  | 'environment'
  | 'story'
  | 'outcomes';

export interface Mission01AssetEntry {
  id: Mission01AssetId;
  category: Mission01AssetCategory;
  titleEn: string;
  titleHi: string;
  srcWebp: string;
  srcFallback: string;
  defaultFit: 'contain' | 'cover';
  characterRole?: 'hero' | 'stranger' | 'busDriver' | 'narrator';
}

export const MISSION_01_ASSETS: Record<Mission01AssetId, Mission01AssetEntry> = {
  // 1. Player Expressions
  player_neutral: {
    id: 'player_neutral',
    category: 'player',
    titleEn: 'Hero Neutral',
    titleHi: 'नायिका सामान्य',
    srcWebp: '/assets/mission-01/player/player_neutral.webp',
    srcFallback: '/assets/mission-01/player/player_neutral.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_happy: {
    id: 'player_happy',
    category: 'player',
    titleEn: 'Hero Happy',
    titleHi: 'नायिका प्रसन्न',
    srcWebp: '/assets/mission-01/player/player_happy.webp',
    srcFallback: '/assets/mission-01/player/player_happy.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_excited: {
    id: 'player_excited',
    category: 'player',
    titleEn: 'Hero Excited',
    titleHi: 'नायिका उत्साहित',
    srcWebp: '/assets/mission-01/player/player_excited.webp',
    srcFallback: '/assets/mission-01/player/player_excited.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_confused: {
    id: 'player_confused',
    category: 'player',
    titleEn: 'Hero Confused',
    titleHi: 'नायिका असमंजस में',
    srcWebp: '/assets/mission-01/player/player_confused.webp',
    srcFallback: '/assets/mission-01/player/player_confused.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_scared: {
    id: 'player_scared',
    category: 'player',
    titleEn: 'Hero Scared',
    titleHi: 'नायिका भयभीत',
    srcWebp: '/assets/mission-01/player/player_scared.webp',
    srcFallback: '/assets/mission-01/player/player_scared.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_shocked: {
    id: 'player_shocked',
    category: 'player',
    titleEn: 'Hero Shocked',
    titleHi: 'नायिका स्तब्ध',
    srcWebp: '/assets/mission-01/player/player_shocked.webp',
    srcFallback: '/assets/mission-01/player/player_shocked.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_sad: {
    id: 'player_sad',
    category: 'player',
    titleEn: 'Hero Sad',
    titleHi: 'नायिका उदास',
    srcWebp: '/assets/mission-01/player/player_sad.webp',
    srcFallback: '/assets/mission-01/player/player_sad.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_crying: {
    id: 'player_crying',
    category: 'player',
    titleEn: 'Hero Crying',
    titleHi: 'नायिका रोती हुई',
    srcWebp: '/assets/mission-01/player/player_crying.webp',
    srcFallback: '/assets/mission-01/player/player_crying.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_thinking: {
    id: 'player_thinking',
    category: 'player',
    titleEn: 'Hero Thinking',
    titleHi: 'नायिका विचारशील',
    srcWebp: '/assets/mission-01/player/player_thinking.webp',
    srcFallback: '/assets/mission-01/player/player_thinking.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_determined: {
    id: 'player_determined',
    category: 'player',
    titleEn: 'Hero Determined',
    titleHi: 'नायिका दृढ़ निश्चयी',
    srcWebp: '/assets/mission-01/player/player_determined.webp',
    srcFallback: '/assets/mission-01/player/player_determined.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },

  // 2. Player Poses
  player_standing: {
    id: 'player_standing',
    category: 'player_poses',
    titleEn: 'Hero Standing',
    titleHi: 'नायिका खड़ी हुई',
    srcWebp: '/assets/mission-01/player_poses/player_standing.webp',
    srcFallback: '/assets/mission-01/player_poses/player_standing.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_sitting: {
    id: 'player_sitting',
    category: 'player_poses',
    titleEn: 'Hero Sitting on Bench',
    titleHi: 'नायिका बेंच पर बैठी',
    srcWebp: '/assets/mission-01/player_poses/player_sitting.webp',
    srcFallback: '/assets/mission-01/player_poses/player_sitting.png',
    defaultFit: 'cover',
    characterRole: 'hero'
  },
  player_looking_back: {
    id: 'player_looking_back',
    category: 'player_poses',
    titleEn: 'Hero Looking Back',
    titleHi: 'नायिका मुड़कर देखती हुई',
    srcWebp: '/assets/mission-01/player_poses/player_looking_back.webp',
    srcFallback: '/assets/mission-01/player_poses/player_looking_back.png',
    defaultFit: 'contain',
    characterRole: 'hero'
  },
  player_holding_phone: {
    id: 'player_holding_phone',
    category: 'player_poses',
    titleEn: 'Hero Holding Phone',
    titleHi: 'नायिका फ़ोन पकड़े हुए',
    srcWebp: '/assets/mission-01/player_poses/player_holding_phone.webp',
    srcFallback: '/assets/mission-01/player_poses/player_holding_phone.png',
    defaultFit: 'cover',
    characterRole: 'hero'
  },
  player_walking_to_safety: {
    id: 'player_walking_to_safety',
    category: 'player_poses',
    titleEn: 'Hero Walking to Safety',
    titleHi: 'नायिका सुरक्षित स्थान की ओर बढ़ती',
    srcWebp: '/assets/mission-01/player_poses/player_walking_to_safety.webp',
    srcFallback: '/assets/mission-01/player_poses/player_walking_to_safety.png',
    defaultFit: 'cover',
    characterRole: 'hero'
  },

  // 3. Stranger Expressions
  stranger_neutral: {
    id: 'stranger_neutral',
    category: 'stranger',
    titleEn: 'Stranger Neutral',
    titleHi: 'अजनबी सामान्य',
    srcWebp: '/assets/mission-01/stranger/stranger_neutral.webp',
    srcFallback: '/assets/mission-01/stranger/stranger_neutral.png',
    defaultFit: 'contain',
    characterRole: 'stranger'
  },
  stranger_speaking: {
    id: 'stranger_speaking',
    category: 'stranger',
    titleEn: 'Stranger Speaking',
    titleHi: 'अजनबी बात करता हुआ',
    srcWebp: '/assets/mission-01/stranger/stranger_speaking.webp',
    srcFallback: '/assets/mission-01/stranger/stranger_speaking.png',
    defaultFit: 'contain',
    characterRole: 'stranger'
  },
  stranger_suspicious: {
    id: 'stranger_suspicious',
    category: 'stranger',
    titleEn: 'Stranger Suspicious',
    titleHi: 'अजनबी संदेहास्पद',
    srcWebp: '/assets/mission-01/stranger/stranger_suspicious.webp',
    srcFallback: '/assets/mission-01/stranger/stranger_suspicious.png',
    defaultFit: 'contain',
    characterRole: 'stranger'
  },
  stranger_smiling: {
    id: 'stranger_smiling',
    category: 'stranger',
    titleEn: 'Stranger Smirking',
    titleHi: 'अजनबी मुस्कुराता हुआ',
    srcWebp: '/assets/mission-01/stranger/stranger_smiling.webp',
    srcFallback: '/assets/mission-01/stranger/stranger_smiling.png',
    defaultFit: 'contain',
    characterRole: 'stranger'
  },
  stranger_irritated: {
    id: 'stranger_irritated',
    category: 'stranger',
    titleEn: 'Stranger Irritated',
    titleHi: 'अजनबी चिढ़ा हुआ',
    srcWebp: '/assets/mission-01/stranger/stranger_irritated.webp',
    srcFallback: '/assets/mission-01/stranger/stranger_irritated.png',
    defaultFit: 'contain',
    characterRole: 'stranger'
  },
  stranger_surprised: {
    id: 'stranger_surprised',
    category: 'stranger',
    titleEn: 'Stranger Startled',
    titleHi: 'अजनबी चौंका हुआ',
    srcWebp: '/assets/mission-01/stranger/stranger_surprised.webp',
    srcFallback: '/assets/mission-01/stranger/stranger_surprised.png',
    defaultFit: 'contain',
    characterRole: 'stranger'
  },

  // 4. Bus Driver Expressions
  driver_neutral: {
    id: 'driver_neutral',
    category: 'driver',
    titleEn: 'Bus Driver Neutral',
    titleHi: 'बस चालक सामान्य',
    srcWebp: '/assets/mission-01/driver/driver_neutral.webp',
    srcFallback: '/assets/mission-01/driver/driver_neutral.png',
    defaultFit: 'contain',
    characterRole: 'busDriver'
  },
  driver_helpful: {
    id: 'driver_helpful',
    category: 'driver',
    titleEn: 'Bus Driver Helpful',
    titleHi: 'बस चालक मददगार',
    srcWebp: '/assets/mission-01/driver/driver_helpful.webp',
    srcFallback: '/assets/mission-01/driver/driver_helpful.png',
    defaultFit: 'contain',
    characterRole: 'busDriver'
  },

  // 5. Environment Backgrounds
  busstop_wide: {
    id: 'busstop_wide',
    category: 'environment',
    titleEn: 'Bus Stop Wide Angle',
    titleHi: 'बस स्टैंड विहंगम दृश्य',
    srcWebp: '/assets/mission-01/environment/busstop_wide.webp',
    srcFallback: '/assets/mission-01/environment/busstop_wide.png',
    defaultFit: 'cover'
  },
  busstop_interaction: {
    id: 'busstop_interaction',
    category: 'environment',
    titleEn: 'Bus Stop Evening Atmosphere',
    titleHi: 'बस स्टैंड शाम का माहौल',
    srcWebp: '/assets/mission-01/environment/busstop_interaction.webp',
    srcFallback: '/assets/mission-01/environment/busstop_interaction.png',
    defaultFit: 'cover'
  },
  busstop_arrival: {
    id: 'busstop_arrival',
    category: 'environment',
    titleEn: 'Bus Arrival at Night Shelter',
    titleHi: 'रात में बस का आगमन',
    srcWebp: '/assets/mission-01/environment/busstop_arrival.webp',
    srcFallback: '/assets/mission-01/environment/busstop_arrival.png',
    defaultFit: 'cover'
  },

  // 6. Story Illustrations
  story_waiting: {
    id: 'story_waiting',
    category: 'story',
    titleEn: 'Waiting Alone in the Rain',
    titleHi: 'बारिश में अकेले इंतज़ार',
    srcWebp: '/assets/mission-01/story/story_waiting.webp',
    srcFallback: '/assets/mission-01/story/story_waiting.png',
    defaultFit: 'cover'
  },
  story_stranger_approaches: {
    id: 'story_stranger_approaches',
    category: 'story',
    titleEn: 'Stranger Closes the Distance',
    titleHi: 'अजनबी का करीब आना',
    srcWebp: '/assets/mission-01/story/story_stranger_approaches.webp',
    srcFallback: '/assets/mission-01/story/story_stranger_approaches.png',
    defaultFit: 'cover'
  },
  story_uncomfortable_conversation: {
    id: 'story_uncomfortable_conversation',
    category: 'story',
    titleEn: 'Persistent Unwanted Conversation',
    titleHi: 'असहज बातचीत',
    srcWebp: '/assets/mission-01/story/story_uncomfortable_conversation.webp',
    srcFallback: '/assets/mission-01/story/story_uncomfortable_conversation.png',
    defaultFit: 'cover'
  },
  story_reaching_for_phone: {
    id: 'story_reaching_for_phone',
    category: 'story',
    titleEn: 'Reaching for Safety Contacts',
    titleHi: 'सुरक्षा संपर्कों की जाँच',
    srcWebp: '/assets/mission-01/story/story_reaching_for_phone.webp',
    srcFallback: '/assets/mission-01/story/story_reaching_for_phone.png',
    defaultFit: 'cover'
  },
  story_seeking_assistance: {
    id: 'story_seeking_assistance',
    category: 'story',
    titleEn: 'Seeking Assistance from Driver',
    titleHi: 'बस चालक से सहायता माँगना',
    srcWebp: '/assets/mission-01/story/story_seeking_assistance.webp',
    srcFallback: '/assets/mission-01/story/story_seeking_assistance.png',
    defaultFit: 'cover'
  },
  story_safe_resolution: {
    id: 'story_safe_resolution',
    category: 'story',
    titleEn: 'Safe Transit Home',
    titleHi: 'घर की सुरक्षित यात्रा',
    srcWebp: '/assets/mission-01/story/story_safe_resolution.webp',
    srcFallback: '/assets/mission-01/story/story_safe_resolution.png',
    defaultFit: 'cover'
  },

  // 7. Choice Outcomes
  outcome_safe_decision: {
    id: 'outcome_safe_decision',
    category: 'outcomes',
    titleEn: 'Outcome: Move to Bright Well-Lit Zone',
    titleHi: 'परिणाम: रोशनी वाले स्थान की ओर बढ़ना',
    srcWebp: '/assets/mission-01/outcomes/outcome_safe_decision.webp',
    srcFallback: '/assets/mission-01/outcomes/outcome_safe_decision.png',
    defaultFit: 'cover'
  },
  outcome_maintain_distance: {
    id: 'outcome_maintain_distance',
    category: 'outcomes',
    titleEn: 'Outcome: Maintain Clear Spatial Distance',
    titleHi: 'परिणाम: सुरक्षित दूरी बनाए रखना',
    srcWebp: '/assets/mission-01/outcomes/outcome_maintain_distance.webp',
    srcFallback: '/assets/mission-01/outcomes/outcome_maintain_distance.png',
    defaultFit: 'cover'
  },
  outcome_ask_for_help: {
    id: 'outcome_ask_for_help',
    category: 'outcomes',
    titleEn: 'Outcome: Board Bus & Alert Driver',
    titleHi: 'परिणाम: बस में चढ़ना और चालक को सूचित करना',
    srcWebp: '/assets/mission-01/outcomes/outcome_ask_for_help.webp',
    srcFallback: '/assets/mission-01/outcomes/outcome_ask_for_help.png',
    defaultFit: 'cover'
  },
  outcome_mission_success: {
    id: 'outcome_mission_success',
    category: 'outcomes',
    titleEn: 'Outcome: Safe Arrival & Mission Victory',
    titleHi: 'परिणाम: सुरक्षित पहुँच और मिशन में विजय',
    srcWebp: '/assets/mission-01/outcomes/outcome_mission_success.webp',
    srcFallback: '/assets/mission-01/outcomes/outcome_mission_success.png',
    defaultFit: 'cover'
  },
  outcome_mission_ending: {
    id: 'outcome_mission_ending',
    category: 'outcomes',
    titleEn: 'Outcome: Empowered Journey Forward',
    titleHi: 'परिणाम: सशक्त और जागरूक भविष्य',
    srcWebp: '/assets/mission-01/outcomes/outcome_mission_ending.webp',
    srcFallback: '/assets/mission-01/outcomes/outcome_mission_ending.png',
    defaultFit: 'cover'
  }
};

export function getMission01Asset(id: Mission01AssetId): Mission01AssetEntry {
  const asset = MISSION_01_ASSETS[id];
  if (!asset) {
    throw new Error(`[Mission01 Manifest] Unknown asset ID: ${id}`);
  }
  return asset;
}
