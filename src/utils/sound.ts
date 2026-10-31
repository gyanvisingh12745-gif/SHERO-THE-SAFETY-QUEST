/**
 * SHERO Procedural Audio Engine (Web Audio API)
 * Implements melodious anime-style ambient music, soft piano arpeggio loops,
 * city soundscapes, footsteps, and interaction cues.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private pianoLoopInterval: number | null = null;

  constructor() {
    const savedMute = localStorage.getItem('shero_sound_muted');
    this.isMuted = savedMute === 'true';
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('shero_sound_muted', String(this.isMuted));
    if (this.isMuted) {
      this.stopBGM();
    } else {
      this.startAmbientBGM();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays a single gentle piano tone with harmonic decay
   */
  public playPianoNote(freq: number, duration: number = 2.0, volume: number = 0.04) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      // Fundamental oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle piano envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio policy safe
    }
  }

  /**
   * Continuous gentle anime piano melody loop & ambient synthesizer pad
   */
  public startAmbientBGM() {
    if (this.isMuted || this.isBgmPlaying) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.bgmGain) return;
      this.isBgmPlaying = true;

      // Soft Pentatonic / Lofi Anime chords sequence (Am9 - Fmaj7 - C - G)
      const pianoChords = [
        [220.0, 261.63, 329.63, 392.0],  // Am7 (A3, C4, E4, G4)
        [174.61, 261.63, 329.63, 392.0], // Fmaj7 (F3, C4, E4, G4)
        [261.63, 329.63, 392.0, 523.25], // C (C4, E4, G4, C5)
        [196.0, 246.94, 293.66, 392.0]   // G (G3, B3, D4, G4)
      ];

      let chordIdx = 0;
      let arpeggioIdx = 0;

      const triggerArpeggio = () => {
        if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;
        const currentChord = pianoChords[chordIdx % pianoChords.length];
        const noteFreq = currentChord[arpeggioIdx % currentChord.length];

        this.playPianoNote(noteFreq, 2.2, 0.025);

        arpeggioIdx++;
        if (arpeggioIdx >= currentChord.length) {
          arpeggioIdx = 0;
          chordIdx++;
        }
      };

      triggerArpeggio();
      this.pianoLoopInterval = window.setInterval(triggerArpeggio, 650);
    } catch {
      // Audio policy safe
    }
  }

  public stopBGM() {
    if (this.pianoLoopInterval !== null) {
      clearInterval(this.pianoLoopInterval);
      this.pianoLoopInterval = null;
    }
    this.isBgmPlaying = false;
  }

  // Button hover sound (delicate glassy tick)
  public playHover() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(560, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(720, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  // Button click / confirmation sound
  public playSelect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(960, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  // Interaction cue (e.g. approaching an NPC or inspecting route board)
  public playInteractPrompt() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      [659.25, 880.0].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.05, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.15);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.15);
      });
    } catch {}
  }

  // Footstep sound for player movement
  public playFootstep() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  // Party-popper burst sound + celebratory cheerful chime
  public playPartyPopper() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // 1. Party-popper pop (subtle pop transient)
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      popOsc.type = 'triangle';
      popOsc.frequency.setValueAtTime(340, now);
      popOsc.frequency.exponentialRampToValueAtTime(65, now + 0.08);
      popGain.gain.setValueAtTime(0.12, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      popOsc.connect(popGain);
      popGain.connect(this.sfxGain);
      popOsc.start(now);
      popOsc.stop(now + 0.08);

      // 2. Celebratory cheerful chime arpeggio (C5, E5, G5, B5, C6)
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const t = now + 0.04 + idx * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.35);
      });
    } catch {}
  }

  // Clear, non-frightening warning error tone
  public playWarningBuzzer() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      // Gentle two-tone warning pulse (220Hz -> 180Hz)
      const tones = [220, 180];
      tones.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const t = now + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.14);
      });
    } catch {}
  }

  // Correct choice fanfare
  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.09, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.25);
      });
    } catch {}
  }

  // Incorrect choice chord
  public playIncorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const notes = [311.13, 293.66, 277.18, 196.0]; // Eb4, D4, Db4, G3
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.07, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.35);
      });
    } catch {}
  }

  // Victory fanfare
  public playVictory() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const melody = [
        { f: 440, t: 0.12 },
        { f: 554.37, t: 0.12 },
        { f: 659.25, t: 0.12 },
        { f: 880, t: 0.35 }
      ];
      let offset = 0;
      melody.forEach(note => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, this.ctx.currentTime + offset);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + offset + note.t);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(this.ctx.currentTime + offset);
        osc.stop(this.ctx.currentTime + offset + note.t);
        offset += note.t;
      });
    } catch {}
  }

  // Dramatic Shock effect (gasp, realization of danger/red flag)
  public playShock() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // High dissonant dramatic chord: E6 + Bb5 + F6
      [1318.51, 932.33, 1396.91].forEach((freq) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.28);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch {}
  }

  // Playful / relieved anime laugh / giggle chime
  public playLaugh() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      // Bubbly cheerful staccato notes
      const notes = [587.33, 739.99, 880.0, 739.99, 880.0, 1108.73];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const t = now + idx * 0.055;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.09);
      });
    } catch {}
  }

  // Ominous Fear / Tension rumble with trembling low frequency
  public playAfraid() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // Deep rumble oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.linearRampToValueAtTime(45, now + 0.6);

      // Tremolo LFO for trembling sensation
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(9, now);
      lfoGain.gain.setValueAtTime(0.04, now);
      lfo.connect(lfoGain.gain);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      lfo.start(now);
      osc.stop(now + 0.65);
      lfo.stop(now + 0.65);
    } catch {}
  }

  // Procedural Suspense Sting / Low Ominous Tone
  public playSuspense() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(75, now + 1.2);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 1.2);
    } catch {}
  }

  // Realistic Double Heartbeat ("lub-dub")
  public playHeartbeat() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      const beat = (time: number, freq: number, vol: number) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(time);
        osc.stop(time + 0.15);
      };

      // First thud
      beat(now, 75, 0.12);
      // Second thud
      beat(now + 0.14, 60, 0.09);
    } catch {}
  }

  // Relief / Calming warmth chime
  public playRelief() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      // Gentle cascading major chord: F4 -> A4 -> C5 -> E5
      [349.23, 440.0, 523.25, 659.25].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const t = now + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.07, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.6);
      });
    } catch {}
  }

  // Bright Ping / Lightbulb realization
  public playPing() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now); // A6
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {}
  }

  // Realistic Anime Gasp: sharp sudden intake of breath using shaped noise + vocal formant
  public playGasp() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // 1. White noise generator buffer for breath rush
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.28);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      // Bandpass filter centered on throat formant (1400Hz -> 2600Hz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(2600, now + 0.18);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      whiteNoise.start(now);

      // Followed immediately by sudden sharp heartbeat
      setTimeout(() => {
        this.playHeartbeat();
      }, 160);
    } catch {}
  }

  // Realistic pavement walking footsteps (heel strike + subtle surface crunch)
  public playFootstepsPavement() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const stepTimes = [0, 0.28, 0.56];

      stepTimes.forEach((delay, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const t = now + delay;
        // Low heel thump
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(idx % 2 === 0 ? 110 : 95, t);
        osc.frequency.exponentialRampToValueAtTime(35, t + 0.07);
        oscGain.gain.setValueAtTime(0.06, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        osc.connect(oscGain);
        oscGain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.07);
      });
    } catch {}
  }

  // Realistic phone call ringing & connection click
  public playPhoneRinging() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // Realistic dual-tone multi-frequency (440Hz + 480Hz)
      const ringDuration = 0.4;
      [440, 480].forEach(freq => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.setValueAtTime(0.05, now + ringDuration);
        gain.gain.exponentialRampToValueAtTime(0.001, now + ringDuration + 0.04);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + ringDuration + 0.05);
      });

      // Connection click after ring
      setTimeout(() => {
        if (!this.ctx || !this.sfxGain || this.isMuted) return;
        const clickTime = this.ctx.currentTime;
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        clickOsc.type = 'square';
        clickOsc.frequency.setValueAtTime(800, clickTime);
        clickOsc.frequency.exponentialRampToValueAtTime(300, clickTime + 0.03);
        clickGain.gain.setValueAtTime(0.04, clickTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.03);
        clickOsc.connect(clickGain);
        clickGain.connect(this.sfxGain);
        clickOsc.start(clickTime);
        clickOsc.stop(clickTime + 0.03);
      }, 550);
    } catch {}
  }

  // Realistic car door slam + low idling engine rumble
  public playCarDoorAndEngine() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // Heavy door slam impact
      const slamOsc = this.ctx.createOscillator();
      const slamGain = this.ctx.createGain();
      slamOsc.type = 'triangle';
      slamOsc.frequency.setValueAtTime(140, now);
      slamOsc.frequency.exponentialRampToValueAtTime(32, now + 0.16);
      slamGain.gain.setValueAtTime(0.14, now);
      slamGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      slamOsc.connect(slamGain);
      slamGain.connect(this.sfxGain);
      slamOsc.start(now);
      slamOsc.stop(now + 0.18);

      // Low engine hum (sawtooth lowpass filtered at 60Hz)
      const engineOsc = this.ctx.createOscillator();
      const engineFilter = this.ctx.createBiquadFilter();
      const engineGain = this.ctx.createGain();
      engineOsc.type = 'sawtooth';
      engineOsc.frequency.setValueAtTime(55, now + 0.15);
      engineFilter.type = 'lowpass';
      engineFilter.frequency.setValueAtTime(120, now + 0.15);
      engineGain.gain.setValueAtTime(0.001, now + 0.15);
      engineGain.gain.linearRampToValueAtTime(0.07, now + 0.35);
      engineGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      engineOsc.connect(engineFilter);
      engineFilter.connect(engineGain);
      engineGain.connect(this.sfxGain);
      engineOsc.start(now + 0.15);
      engineOsc.stop(now + 1.2);
    } catch {}
  }

  // Quiet night bus stop ambience (soft wind filter)
  public playNightBusStopAmbience() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(85, now);
      osc.frequency.linearRampToValueAtTime(95, now + 0.8);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 1.0);
    } catch {}
  }
}

export const soundCtrl = new SoundController();
