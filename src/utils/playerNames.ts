/**
 * SHERO: Dynamic Character Naming Engine
 * All character names are player-customizable or role-based tokens.
 * The hero is ALWAYS the player's customized name. The default hero suggestion is 'Aira'.
 * The hardcoded name 'Gyanvi' is strictly forbidden across UI, dialogue, HUD and certificates.
 */

export interface CustomNamesState {
  hero: string;               // Player designated hero name (1-16 chars)
  helpedWoman: string;        // Part B helped woman (default: 'Anjali')
  friendBold: string;         // Bold friend (default: 'Aanya')
  friendKind: string;         // Kind friend (default: 'Meera')
  friendLively: string;       // Lively friend (default: 'Riya')
  friendSweet: string;        // Sweet friend (default: 'Mahima')
  husband: string;            // Husband (default: 'Rohan')
  neighbourAunty: string;     // Neighbour (default: 'Sunita Aunty')
  counsellor: string;         // Counsellor (default: 'Priya')
  hasCustomHeroName: boolean;
  hasCustomHelpedWomanName: boolean;
}

const STORAGE_KEY = 'shero_custom_names_v4';

export const DEFAULT_NAMES: CustomNamesState = {
  hero: 'Aira',
  helpedWoman: 'Anjali',
  friendBold: 'Aanya',
  friendKind: 'Meera',
  friendLively: 'Riya',
  friendSweet: 'Mahima',
  husband: 'Rohan',
  neighbourAunty: 'Sunita Aunty',
  counsellor: 'Priya',
  hasCustomHeroName: false,
  hasCustomHelpedWomanName: false
};

class PlayerNamesManager {
  private names: CustomNamesState;

  constructor() {
    this.names = this.loadFromStorage();
  }

  private loadFromStorage(): CustomNamesState {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return { ...DEFAULT_NAMES };
      }
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_NAMES };
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_NAMES,
        ...parsed,
        // Ensure hero name never falls back to legacy string
        hero: parsed.hero && parsed.hero !== 'Gyanvi' ? parsed.hero : 'Aira'
      };
    } catch {
      return { ...DEFAULT_NAMES };
    }
  }

  public saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.names));
      }
    } catch (e) {
      console.warn('[PlayerNames] Could not save to localStorage:', e);
    }
  }

  public getNames(): CustomNamesState {
    return { ...this.names };
  }

  public getHeroName(): string {
    const raw = this.names.hero?.trim();
    if (!raw || raw.toLowerCase() === 'gyanvi') return 'Aira';
    return raw;
  }

  public getHelpedWomanName(): string {
    return this.names.helpedWoman?.trim() || 'Anjali';
  }

  public setHeroName(name: string) {
    const trimmed = (name || '').trim().slice(0, 16);
    this.names.hero = trimmed || 'Aira';
    this.names.hasCustomHeroName = true;
    this.saveToStorage();
  }

  public setHelpedWomanName(name: string) {
    const trimmed = (name || '').trim().slice(0, 16);
    this.names.helpedWoman = trimmed || 'Anjali';
    this.names.hasCustomHelpedWomanName = true;
    this.saveToStorage();
  }

  public updateAllNames(updates: Partial<CustomNamesState>) {
    this.names = {
      ...this.names,
      ...updates
    };
    if (this.names.hero && this.names.hero.toLowerCase() === 'gyanvi') {
      this.names.hero = 'Aira';
    }
    this.saveToStorage();
  }

  public hasNamedHero(): boolean {
    return this.names.hasCustomHeroName && Boolean(this.names.hero && this.names.hero !== 'Aira');
  }

  public hasNamedHelpedWoman(): boolean {
    return this.names.hasCustomHelpedWomanName;
  }

  /**
   * Runtime Tokenizer
   * Replaces tokens and historical character names with player-designated names.
   * Handles English and Hindi sentences cleanly without altering grammar.
   */
  public substitute(text: string): string {
    if (!text) return '';
    const hero = this.getHeroName();
    const helped = this.getHelpedWomanName();
    const fBold = this.names.friendBold?.trim() || 'Aanya';
    const fKind = this.names.friendKind?.trim() || 'Meera';
    const fLively = this.names.friendLively?.trim() || 'Riya';
    const fSweet = this.names.friendSweet?.trim() || 'Mahima';
    const husband = this.names.husband?.trim() || 'Rohan';
    const aunty = this.names.neighbourAunty?.trim() || 'Sunita Aunty';
    const counsellor = this.names.counsellor?.trim() || 'Priya';

    return text
      // Exact tokens
      .replace(/\{hero\}/g, hero)
      .replace(/\{helpedWoman\}/g, helped)
      .replace(/\{friendBold\}/g, fBold)
      .replace(/\{friendKind\}/g, fKind)
      .replace(/\{friendLively\}/g, fLively)
      .replace(/\{friendSweet\}/g, fSweet)
      .replace(/\{husband\}/g, husband)
      .replace(/\{neighbourAunty\}/g, aunty)
      .replace(/\{counsellor\}/g, counsellor)
      // Historical references replaced with dynamic player designations
      .replace(/Gyanvi/g, hero)
      .replace(/ज्ञानवी/g, hero)
      .replace(/Anjali Didi/g, `${helped} Didi`)
      .replace(/अंजलि दीदी/g, `${helped} दीदी`)
      .replace(/Anjali/g, helped)
      .replace(/अंजलि/g, helped)
      .replace(/Aanya/g, fBold)
      .replace(/आन्या/g, fBold)
      .replace(/Meera/g, fKind)
      .replace(/मीरा/g, fKind)
      .replace(/Riya/g, fLively)
      .replace(/रिया/g, fLively)
      .replace(/Mahima/g, fSweet)
      .replace(/महिमा/g, fSweet)
      .replace(/Rohan/g, husband)
      .replace(/रोहन/g, husband)
      .replace(/Sunita Aunty/g, aunty)
      .replace(/सुनीता आंटी/g, aunty)
      .replace(/Priya/g, counsellor)
      .replace(/प्रिया/g, counsellor);
  }
}

export const playerNames = new PlayerNamesManager();
