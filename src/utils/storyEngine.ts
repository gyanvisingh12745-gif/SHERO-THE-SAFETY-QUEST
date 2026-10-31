/**
 * SHERO: Story State & Decision Consequence Engine
 * Tracks story variables across all 10 connected chapters:
 * - Safety & immediate risk
 * - Trust & available support network
 * - Confidence & personal boundaries
 * - Financial independence & practical resources
 * - Relationship trust & warning signs observed
 * - Safe evidence/incident documentation
 *
 * Influences later dialogue, available choices, and Chapter 10's branching endings.
 */

export interface StoryMetrics {
  safety: number;           // 0 to 100
  support: number;          // 0 to 100
  boundaries: number;       // 0 to 100
  independence: number;     // 0 to 100
  relationshipTrust: number; // 0 to 100
  documentedIncidents: number;
  friendDisclosure: 'none' | 'partial' | 'full';
  emergencyGoBagReady: boolean;
  legalConsultDone: boolean;
}

export interface ChoiceImpact {
  safetyDelta?: number;
  supportDelta?: number;
  boundariesDelta?: number;
  independenceDelta?: number;
  relationshipTrustDelta?: number;
  documentedIncidentsDelta?: number;
  setFriendDisclosure?: 'none' | 'partial' | 'full';
  setEmergencyGoBagReady?: boolean;
  setLegalConsultDone?: boolean;
  sfxEmotion?: 'shock' | 'laugh' | 'afraid' | 'heartbeat' | 'relief' | 'ping';
  exclamatoryWord?: string; // e.g. "GASP!", "THUMP THUMP!", "EHH?!", "PING!"
}

const STORAGE_KEY = 'shero_story_metrics_v2';

const DEFAULT_METRICS: StoryMetrics = {
  safety: 65,
  support: 50,
  boundaries: 50,
  independence: 40,
  relationshipTrust: 70,
  documentedIncidents: 0,
  friendDisclosure: 'none',
  emergencyGoBagReady: false,
  legalConsultDone: false,
};

class StoryEngine {
  private metrics: StoryMetrics;
  private choiceHistory: Record<string, string> = {}; // nodeId -> choiceId

  constructor() {
    this.metrics = this.loadMetrics();
  }

  private loadMetrics(): StoryMetrics {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return { ...DEFAULT_METRICS, ...JSON.parse(raw) };
      }
    } catch {
      // Fallback
    }
    return { ...DEFAULT_METRICS };
  }

  public saveMetrics() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.metrics));
    } catch {
      // Safe fallback
    }
  }

  public getMetrics(): StoryMetrics {
    return { ...this.metrics };
  }

  public resetMetrics() {
    this.metrics = { ...DEFAULT_METRICS };
    this.choiceHistory = {};
    this.saveMetrics();
  }

  public recordChoice(nodeId: string, choiceId: string, impact?: ChoiceImpact) {
    this.choiceHistory[nodeId] = choiceId;

    if (impact) {
      if (impact.safetyDelta) {
        this.metrics.safety = Math.max(0, Math.min(100, this.metrics.safety + impact.safetyDelta));
      }
      if (impact.supportDelta) {
        this.metrics.support = Math.max(0, Math.min(100, this.metrics.support + impact.supportDelta));
      }
      if (impact.boundariesDelta) {
        this.metrics.boundaries = Math.max(0, Math.min(100, this.metrics.boundaries + impact.boundariesDelta));
      }
      if (impact.independenceDelta) {
        this.metrics.independence = Math.max(0, Math.min(100, this.metrics.independence + impact.independenceDelta));
      }
      if (impact.relationshipTrustDelta) {
        this.metrics.relationshipTrust = Math.max(0, Math.min(100, this.metrics.relationshipTrust + impact.relationshipTrustDelta));
      }
      if (impact.documentedIncidentsDelta) {
        this.metrics.documentedIncidents += impact.documentedIncidentsDelta;
      }
      if (impact.setFriendDisclosure) {
        this.metrics.friendDisclosure = impact.setFriendDisclosure;
      }
      if (impact.setEmergencyGoBagReady !== undefined) {
        this.metrics.emergencyGoBagReady = impact.setEmergencyGoBagReady;
      }
      if (impact.setLegalConsultDone !== undefined) {
        this.metrics.legalConsultDone = impact.setLegalConsultDone;
      }
    }

    this.saveMetrics();
  }

  public getChoice(nodeId: string): string | undefined {
    return this.choiceHistory[nodeId];
  }

  /**
   * Determine Chapter 10 Ending Archetype based on accumulated story decisions
   */
  public determineEndingArchetype(): {
    id: 'autonomous_pioneer' | 'circle_of_resilience' | 'empowered_scholar' | 'community_anchor';
    title: string;
    subtitle: string;
    narrative: string;
    keyThemes: string[];
    badge: string;
  } {
    const { independence, support, boundaries, safety } = this.metrics;

    if (independence >= 75 && boundaries >= 65) {
      return {
        id: 'autonomous_pioneer',
        title: 'The Autonomous Pioneer',
        subtitle: 'Financial Freedom & Uncompromising Self-Determination',
        narrative: 'By securing independent employment, setting rock-solid personal boundaries, and establishing your own emergency fund, you stepped into your full autonomy. Your living space is peaceful, your choices are your own, and your future is written on your terms.',
        keyThemes: ['Independent Housing', 'Self-Sustaining Career', 'Clear Boundaries'],
        badge: 'AUTONOMOUS PIONEER'
      };
    }

    if (support >= 70 && this.metrics.friendDisclosure === 'full') {
      return {
        id: 'circle_of_resilience',
        title: 'The Circle of Resilience',
        subtitle: 'Empowered Through Vulnerability & Unbreakable Bonds',
        narrative: 'You proved that reaching out is a superpower, not a weakness. By confiding in Priya, involving trusted family, and leaning on community resources, you dismantled isolation. Together with your circle, you have created an unshakeable safety shield for healing and growth.',
        keyThemes: ['Trusted Lifelines', 'Shared Strength', 'Community Solidarity'],
        badge: 'CIRCLE OF RESILIENCE'
      };
    }

    if (boundaries >= 70 && independence >= 55) {
      return {
        id: 'empowered_scholar',
        title: 'The Empowered Scholar',
        subtitle: 'Transforming Adversity into Academic & Personal Excellence',
        narrative: 'Refusing to let anyone curtail your education and intellectual aspirations, you pursued your degree and career development with fierce determination. Today, your mind and qualifications are your greatest wings, carrying you toward leadership.',
        keyThemes: ['Continued Education', 'Intellectual Freedom', 'Unyielding Ambition'],
        badge: 'EMPOWERED SCHOLAR'
      };
    }

    return {
      id: 'community_anchor',
      title: 'The Community Anchor',
      subtitle: 'From Personal Safety to Inspiring Others',
      narrative: 'Through each challenge—from late-night transit to difficult domestic decisions—you navigated with situational wisdom, documentation, and courage. Now, you stand as an inspiring beacon, mentoring other young women on safety planning, dignity, and independence.',
      keyThemes: ['Safety Mentorship', 'Legal Awareness', 'Collective Empowerment'],
      badge: 'COMMUNITY ANCHOR'
    };
  }
}

export const storyEngine = new StoryEngine();
