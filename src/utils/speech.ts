class SpeechManager {
  private isVoiceEnabled: boolean = true;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      const saved = localStorage.getItem('shero_voice_enabled');
      this.isVoiceEnabled = saved !== 'false';

      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    } else {
      this.isVoiceEnabled = false;
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.cachedVoices = this.synth.getVoices();
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public getVoiceEnabled(): boolean {
    return this.isVoiceEnabled && this.isSupported();
  }

  public toggleVoice(): boolean {
    this.isVoiceEnabled = !this.isVoiceEnabled;
    localStorage.setItem('shero_voice_enabled', String(this.isVoiceEnabled));
    if (!this.isVoiceEnabled && this.synth) {
      this.synth.cancel();
    }
    return this.isVoiceEnabled;
  }

  public speak(
    text: string,
    rate: number = 1.0,
    pitch: number = 1.0,
    speakerRole: 'hero' | 'stranger' | 'narrator' | 'friend' = 'narrator'
  ) {
    if (!this.getVoiceEnabled() || !this.synth) return;

    try {
      this.synth.cancel(); // Stop any pending speech
      const cleanText = text.replace(/[*_#"`]/g, '').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const isHindi = /[\u0900-\u097F]/.test(cleanText);

      const voices = this.cachedVoices.length > 0 ? this.cachedVoices : this.synth.getVoices();

      if (isHindi) {
        // Find Hindi voice
        const hiVoice = voices.find(v => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi') || v.lang.includes('IN'));
        if (hiVoice) utterance.voice = hiVoice;
        utterance.lang = 'hi-IN';
        utterance.rate = 0.94;
        utterance.pitch = speakerRole === 'hero' ? 1.15 : speakerRole === 'stranger' ? 0.85 : 1.0;
      } else {
        utterance.lang = 'en-US';
        if (speakerRole === 'stranger') {
          utterance.rate = 0.90;
          utterance.pitch = 0.82;
          const maleVoice = voices.find(
            v => v.lang.startsWith('en') && (
              v.name.includes('David') ||
              v.name.includes('Male') ||
              v.name.includes('George') ||
              v.name.includes('Mark') ||
              v.name.includes('Guy')
            )
          );
          if (maleVoice) utterance.voice = maleVoice;
        } else if (speakerRole === 'hero') {
          utterance.rate = 1.0;
          utterance.pitch = 1.14;
          const femaleVoice = voices.find(
            v => v.lang.startsWith('en') && (
              v.name.includes('Zira') ||
              v.name.includes('Female') ||
              v.name.includes('Samantha') ||
              v.name.includes('Victoria') ||
              v.name.includes('Natural') ||
              v.name.includes('Jenny')
            )
          );
          if (femaleVoice) utterance.voice = femaleVoice;
        } else {
          utterance.rate = rate || 0.96;
          utterance.pitch = pitch || 1.0;
          const defaultVoice = voices.find(v => v.lang.startsWith('en'));
          if (defaultVoice) utterance.voice = defaultVoice;
        }
      }

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('[SHERO Speech] TTS synthesis failed:', e);
    }
  }

  public speakCorrectFeedback(explanation: string) {
    const isHindi = /[\u0900-\u097F]/.test(explanation);
    const fullText = isHindi
      ? `शाबाश! आपका निर्णय बिल्कुल सही है। ${explanation}`
      : `Yes, you're correct! You can proceed. ${explanation}`;
    this.speak(fullText, 0.98, 1.12, 'hero');
  }

  public speakIncorrectFeedback(explanation: string) {
    const isHindi = /[\u0900-\u097F]/.test(explanation);
    const fullText = isHindi
      ? `यह सुरक्षित नहीं है। आइए कोई बेहतर विकल्प चुनें। ${explanation}`
      : `Not quite. Let's think about a safer option. ${explanation}`;
    this.speak(fullText, 0.96, 1.05, 'hero');
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
