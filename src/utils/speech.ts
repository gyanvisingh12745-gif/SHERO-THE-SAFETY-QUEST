/**
 * SHERO Bilingual Speech & Voice Pipeline (Hindi + English)
 * Features:
 * - Distinct voice profiles, pitch, and rate per character.
 * - Strict separation between native Hindi (hi-IN) and English (en-US/GB/IN) voices.
 * - Prevents Chromium speech queue deadlock by yielding to the event loop.
 * - Natural emotional interjections in both languages.
 * - Graceful fallback and user-friendly diagnostics when no native Hindi voice is installed.
 */

export type CharacterVoiceRole =
  | 'hero'
  | 'helpedWoman'
  | 'friendBold'
  | 'friendKind'
  | 'friendLively'
  | 'friendSweet'
  | 'stranger'
  | 'husband'
  | 'busDriver'
  | 'cabDriver'
  | 'counsellor'
  | 'lawyer'
  | 'policeOfficer'
  | 'doctor'
  | 'banker'
  | 'recruiter'
  | 'narrator';

export interface VoiceCharacterConfig {
  gender: 'female' | 'male';
  basePitch: number;
  baseRate: number;
  description: string;
}

export const CHARACTER_VOICE_CONFIGS: Record<CharacterVoiceRole, VoiceCharacterConfig> = {
  hero: { gender: 'female', basePitch: 1.15, baseRate: 1.0, description: 'Youthful, energetic, brave' },
  helpedWoman: { gender: 'female', basePitch: 1.0, baseRate: 0.94, description: 'Warm, dignified, gentle' },
  friendBold: { gender: 'female', basePitch: 1.08, baseRate: 1.05, description: 'Assertive, confident' },
  friendKind: { gender: 'female', basePitch: 1.02, baseRate: 0.95, description: 'Calm, comforting' },
  friendLively: { gender: 'female', basePitch: 1.22, baseRate: 1.12, description: 'Upbeat, fast-paced' },
  friendSweet: { gender: 'female', basePitch: 1.25, baseRate: 0.94, description: 'Gentle, soft-spoken' },
  stranger: { gender: 'male', basePitch: 0.78, baseRate: 0.90, description: 'Low, shadowy, menacing' },
  husband: { gender: 'male', basePitch: 0.82, baseRate: 0.92, description: 'Cold, stern, calculating' },
  busDriver: { gender: 'male', basePitch: 0.88, baseRate: 0.95, description: 'Mature, helpful, grounded' },
  cabDriver: { gender: 'male', basePitch: 0.90, baseRate: 0.98, description: 'Neutral, professional' },
  recruiter: { gender: 'male', basePitch: 0.85, baseRate: 1.04, description: 'Polished, persuasive' },
  counsellor: { gender: 'female', basePitch: 1.05, baseRate: 0.96, description: 'Empathic, professional' },
  lawyer: { gender: 'female', basePitch: 0.95, baseRate: 1.0, description: 'Clear, articulate, resolute' },
  policeOfficer: { gender: 'female', basePitch: 1.02, baseRate: 0.98, description: 'Authoritative, reassuring' },
  doctor: { gender: 'male', basePitch: 0.96, baseRate: 0.94, description: 'Clinical, supportive' },
  banker: { gender: 'male', basePitch: 0.92, baseRate: 0.96, description: 'Formal, objective' },
  narrator: { gender: 'female', basePitch: 1.0, baseRate: 0.98, description: 'Neutral cinematic narrator' }
};

// Emotional interjections map
export const EMOTION_INTERJECTIONS = {
  hi: {
    scared: 'हे भगवान!',
    relieved: 'उफ़!',
    laughing: 'हाहा!',
    shocked: 'अरे!',
    determined: 'रुको!',
    happy: 'शाबाश!',
    crying: 'ओह नहीं...',
    confused: 'क्या?'
  },
  en: {
    scared: 'Oh gosh!',
    relieved: 'Phew!',
    laughing: 'Haha!',
    shocked: 'Wait!',
    determined: 'Stop!',
    happy: 'Yes!',
    crying: 'Oh no...',
    confused: 'What?'
  }
};

class SpeechManager {
  private isVoiceEnabled: boolean = true;
  private voiceVolume: number = 0.95;
  private synth: SpeechSynthesis | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private hasNativeHindi: boolean = false;
  private unlockAttempted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      const savedVoice = localStorage.getItem('shero_voice_enabled');
      this.isVoiceEnabled = savedVoice !== 'false';

      const savedVol = localStorage.getItem('shero_voice_volume');
      if (savedVol) {
        this.voiceVolume = Math.max(0, Math.min(1, parseFloat(savedVol) || 0.95));
      }

      this.refreshVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.refreshVoices();
      }
    } else {
      this.isVoiceEnabled = false;
    }
  }

  private refreshVoices() {
    if (!this.synth) return;
    this.cachedVoices = this.synth.getVoices();
    this.hasNativeHindi = this.cachedVoices.some(v =>
      v.lang.toLowerCase().startsWith('hi') ||
      v.name.toLowerCase().includes('hindi') ||
      v.name.toLowerCase().includes('kalpana') ||
      v.name.toLowerCase().includes('madhur') ||
      v.name.toLowerCase().includes('swara')
    );
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public getVoiceEnabled(): boolean {
    return this.isVoiceEnabled && this.isSupported();
  }

  public setVoiceEnabled(enabled: boolean) {
    this.isVoiceEnabled = enabled;
    localStorage.setItem('shero_voice_enabled', String(enabled));
    if (!enabled && this.synth) {
      this.stop();
    }
  }

  public toggleVoice(): boolean {
    const next = !this.isVoiceEnabled;
    this.setVoiceEnabled(next);
    return next;
  }

  public getVoiceVolume(): number {
    return this.voiceVolume;
  }

  public setVoiceVolume(vol: number) {
    this.voiceVolume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('shero_voice_volume', String(this.voiceVolume));
  }

  public isHindiVoiceAvailable(): boolean {
    return this.hasNativeHindi;
  }

  public unlockAudio() {
    if (this.unlockAttempted || !this.synth) return;
    this.unlockAttempted = true;
    try {
      // Warm up TTS engine with a silent zero-length utterance
      const warmup = new SpeechSynthesisUtterance(' ');
      warmup.volume = 0.01;
      this.synth.speak(warmup);
    } catch {}
  }

  /**
   * Primary speech synthesis method with per-character modulation
   */
  public speak(
    text: string,
    customRate?: number,
    customPitch?: number,
    role: CharacterVoiceRole | string = 'narrator'
  ) {
    if (!this.getVoiceEnabled() || !this.synth) return;

    try {
      const cleanText = (text || '')
        .replace(/[*_#"`]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) return;

      // Yield before cancelling to prevent Chromium queue deadlock
      this.synth.cancel();

      window.setTimeout(() => {
        if (!this.synth) return;

        const isDevanagari = /[\u0900-\u097F]/.test(cleanText);
        const utterance = new SpeechSynthesisUtterance(cleanText);

        const config =
          CHARACTER_VOICE_CONFIGS[role as CharacterVoiceRole] ||
          CHARACTER_VOICE_CONFIGS.narrator;

        const rate = customRate || config.baseRate;
        const pitch = customPitch || config.basePitch;

        utterance.rate = Math.max(0.7, Math.min(1.4, rate));
        utterance.pitch = Math.max(0.6, Math.min(1.6, pitch));
        utterance.volume = this.voiceVolume;

        const voices = this.cachedVoices.length > 0 ? this.cachedVoices : this.synth.getVoices();

        if (isDevanagari) {
          // Strict search for Hindi voices (never assign en-IN to Devanagari)
          const hiVoice = voices.find(
            v =>
              v.lang.toLowerCase().startsWith('hi') ||
              v.name.toLowerCase().includes('hindi') ||
              v.name.toLowerCase().includes('kalpana') ||
              v.name.toLowerCase().includes('madhur') ||
              v.name.toLowerCase().includes('swara')
          );

          if (hiVoice) {
            utterance.voice = hiVoice;
            utterance.lang = hiVoice.lang || 'hi-IN';
          } else {
            // No native Hindi voice installed in OS
            utterance.lang = 'hi-IN';
          }
        } else {
          // English Voice with gender selection
          utterance.lang = 'en-US';
          if (config.gender === 'male') {
            const maleVoice = voices.find(
              v =>
                v.lang.startsWith('en') &&
                (v.name.includes('David') ||
                  v.name.includes('Male') ||
                  v.name.includes('George') ||
                  v.name.includes('Mark') ||
                  v.name.includes('Guy') ||
                  v.name.includes('Christopher'))
            );
            if (maleVoice) utterance.voice = maleVoice;
          } else {
            const femaleVoice = voices.find(
              v =>
                v.lang.startsWith('en') &&
                (v.name.includes('Zira') ||
                  v.name.includes('Female') ||
                  v.name.includes('Samantha') ||
                  v.name.includes('Victoria') ||
                  v.name.includes('Natural') ||
                  v.name.includes('Jenny') ||
                  v.name.includes('Aria'))
            );
            if (femaleVoice) utterance.voice = femaleVoice;
          }
        }

        utterance.onerror = e => {
          if (e.error !== 'interrupted' && e.error !== 'canceled') {
            console.warn('[SHERO Speech] Synthesis error:', e.error);
          }
        };

        this.synth.speak(utterance);
      }, 20);
    } catch (e) {
      console.warn('[SHERO Speech] TTS synthesis call failed:', e);
    }
  }

  public speakInterjection(emotion: keyof typeof EMOTION_INTERJECTIONS.en, lang: 'en' | 'hi' = 'en') {
    const interjection = EMOTION_INTERJECTIONS[lang]?.[emotion] || EMOTION_INTERJECTIONS.en[emotion];
    if (interjection) {
      this.speak(interjection, 1.1, 1.2, 'hero');
    }
  }

  public speakCorrectFeedback(explanation: string, lang: 'en' | 'hi' = 'en') {
    const fullText =
      lang === 'hi'
        ? `शाबाश! आपका निर्णय बिल्कुल सही है। ${explanation}`
        : `Yes, you're correct! You can proceed. ${explanation}`;
    this.speak(fullText, 0.98, 1.15, 'hero');
  }

  public speakIncorrectFeedback(explanation: string, lang: 'en' | 'hi' = 'en') {
    const fullText =
      lang === 'hi'
        ? `सावधान। आइए एक सुरक्षित विकल्प चुनें। ${explanation}`
        : `Not quite. Let's think about a safer option. ${explanation}`;
    this.speak(fullText, 0.95, 1.05, 'hero');
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
    }
  }
}

export const speechCtrl = new SpeechManager();
