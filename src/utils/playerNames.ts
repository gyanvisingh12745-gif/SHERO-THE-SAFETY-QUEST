/**
 * SHERO: Dynamic Character Naming Engine (Section 0.5)
 * All character names are player-customizable or role-based tokens.
 * No character has a fixed hardcoded identity.
 */

export interface CustomNamesState {
  hero: string;               // Default: 'Gyanvi', fallback label: 'Hero'
  helpedWoman: string;        // Default: 'Anjali', fallback label: 'Didi'
  friendBold: string;         // Default: 'Aanya', label: 'Bold Friend'
  friendKind: string;         // Default: 'Meera', label: 'Kind Friend'
  friendLively: string;       // Default: 'Riya', label: 'Lively Friend'
  friendSweet: string;        // Default: 'Mahima', label: 'Sweet Friend'
  husband: string;            // Default: 'Rohan', label: 'Husband'
  neighbourAunty: string;     // Default: 'Sunita Aunty', label: 'Neighbour Aunty'
  counsellor: string;         // Default: 'Priya', label: 'Counsellor'
  hasCustomHeroName: boolean;
  hasCustomHelpedWomanName: boolean;
}

const STORAGE_KEY = 'shero_custom_names_v3';

export const DEFAULT_NAMES: CustomNamesState = {
  hero: 'Gyanvi',
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
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_NAMES };
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_NAMES,
        ...parsed
      };
    } catch {
      return { ...DEFAULT_NAMES };
    }
  }

  public saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.names));
    } catch (e) {
      console.warn('[PlayerNames] Could not save to localStorage:', e);
    }
  }

  public getNames(): CustomNamesState {
    return { ...this.names };
  }

  public getHeroName(): string {
    return this.names.hero?.trim() || 'Hero';
  }

  public getHelpedWomanName(): string {
    return this.names.helpedWoman?.trim() || 'Didi';
  }

  public setHeroName(name: string) {
    const trimmed = name.trim().slice(0, 16);
    this.names.hero = trimmed || 'Hero';
    this.names.hasCustomHeroName = true;
    this.saveToStorage();
  }

  public setHelpedWomanName(name: string) {
    const trimmed = name.trim().slice(0, 16);
    this.names.helpedWoman = trimmed || 'Didi';
    this.names.hasCustomHelpedWomanName = true;
    this.saveToStorage();
  }

  public updateAllNames(updates: Partial<CustomNamesState>) {
    this.names = {
      ...this.names,
      ...updates
    };
    this.saveToStorage();
  }

  public hasNamedHero(): boolean {
    return this.names.hasCustomHeroName;
  }

  public hasNamedHelpedWoman(): boolean {
    return this.names.hasCustomHelpedWomanName;
  }

  /**
   * Runtime Tokenizer
   * Replaces tokens and historical character names with player-designated names.
   */
  public substitute(text: string): string {
    if (!text) return '';
    const hero = this.getHeroName();
    const helped = this.getHelpedWomanName();
    const fBold = this.names.friendBold?.trim() || 'Bold Friend';
    const fKind = this.names.friendKind?.trim() || 'Kind Friend';
    const fLively = this.names.friendLively?.trim() || 'Lively Friend';
    const fSweet = this.names.friendSweet?.trim() || 'Sweet Friend';
    const husband = this.names.husband?.trim() || 'Husband';
    const aunty = this.names.neighbourAunty?.trim() || 'Neighbour Aunty';
    const counsellor = this.names.counsellor?.trim() || 'Counsellor';

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
      // Historical references so any raw text adapts smoothly
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
