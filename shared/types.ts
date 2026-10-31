export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  educationalTip: string;
  sfxEmotion?: 'shock' | 'laugh' | 'afraid' | 'heartbeat' | 'relief' | 'ping';
  exclamatoryWord?: string;
  safetyDelta?: number;
  supportDelta?: number;
  boundariesDelta?: number;
  independenceDelta?: number;
}

export interface DecisionNode {
  id: string;
  decisionNumber: number;
  situation: string;
  speaker: string;
  dialogue: string;
  airaThought: string;
  heroResponseDialogue?: string;
  strangerType?:
    | 'cap_hoodie'
    | 'bearded'
    | 'sunglasses'
    | 'haruto_date'
    | 'haruto_controlling'
    | 'inlaw_relative'
    | 'friend_priya'
    | 'counselor';
  exclamatoryPrompt?: string; // Manga comic SFX tag e.g. "GASP!", "THUMP THUMP!", "EH?!"
  choices: [Choice, Choice, Choice];
  winningNextNodeId?: string; // Next decision node ID or "VICTORY"
}

export interface Mission {
  id: string;
  number: number;
  chapterNumber?: number;
  chapterName?: string;
  isStoryChapter?: boolean;
  title: string;
  tagline: string;
  domain: string;
  environmentName: string;
  badgeName: string;
  badgeIcon: string;
  badgeDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  learningGoal: string;
  startNodeId: string;
  nodes: Record<string, DecisionNode>;
  victoryEnding: {
    title: string;
    description: string;
    takeaway: string;
    unlockedPerk?: string;
  };
}

export interface GameProgress {
  unlockedMissionIds: string[];
  completedMissionIds: string[];
  highScores: Record<string, number>;
  earnedBadges: {
    badgeName: string;
    missionId: string;
    earnedAt: string;
  }[];
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
}

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  isFavorite?: boolean;
}

export interface SafetyPlan {
  safeHavens: string[];
  checkInPreferences: string;
  transitChecklist: string[];
  digitalSecurityChecklist: string[];
  emergencyNotes: string;
  updatedAt: string;
}

export interface SupportResource {
  id: string;
  name: string;
  category: 'Emergency' | 'Helpline' | 'Legal & Support' | 'Cyber Safety' | 'Campus Support';
  contact: string;
  website: string;
  coverage: string;
  description: string;
  officialSource: string;
  lastVerified: string;
  tags: string[];
}
