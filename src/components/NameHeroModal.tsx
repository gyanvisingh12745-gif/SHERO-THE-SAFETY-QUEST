import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { UnifiedAnimeCharacter } from './UnifiedAnimeCharacter';
import { playerNames } from '../utils/playerNames';
import { soundCtrl } from '../utils/sound';

export interface NameHeroModalProps {
  onComplete: (name: string) => void;
  onSkip?: () => void;
}

export const NameHeroModal: React.FC<NameHeroModalProps> = ({ onComplete, onSkip }) => {
  const [typedName, setTypedName] = useState<string>(playerNames.getHeroName() === 'Hero' ? '' : playerNames.getHeroName());
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundCtrl.playSelect();
    const clean = typedName.trim();

    if (clean.length > 16) {
      setErrorMsg('Please keep name under 16 characters / कृपया 16 अक्षरों से छोटा नाम रखें');
      return;
    }

    const finalName = clean.length > 0 ? clean : 'Hero';
    playerNames.setHeroName(finalName);
    onComplete(finalName);
  };

  const handleSkip = () => {
    soundCtrl.playSelect();
    const finalName = 'Hero';
    playerNames.setHeroName(finalName);
    if (onSkip) onSkip();
    else onComplete(finalName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
      <div className="relative max-w-md w-full bg-slate-900 border-2 border-purple-500 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center">
        {/* Glow Halo */}
        <div className="absolute -top-12 w-28 h-28 bg-purple-600/30 rounded-full blur-2xl pointer-events-none" />

        {/* Hero Portrait (Fixed Purple Hoodie Visual) */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-400 bg-purple-950/80 shadow-inner mb-4 flex items-center justify-center">
          <UnifiedAnimeCharacter
            id="gyanvi"
            expression="happy"
            scale={0.95}
            className="transform translate-y-3"
          />
        </div>

        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950 border border-purple-400/40 text-[11px] font-black uppercase tracking-wider text-pink-300 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>The Heroine</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-white mb-1">
          Name Your Hero
        </h2>
        <p className="text-xs text-purple-200 font-semibold mb-4">
          Confident · Friendly · Smart · Brave
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="text-left">
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Enter Hero's Name / अपना नाम लिखें
            </label>
            <input
              type="text"
              autoFocus
              maxLength={16}
              value={typedName}
              onChange={(e) => {
                setTypedName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Type a name (e.g. Gyanvi, Aira, Maya...)"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-purple-500/50 focus:border-pink-500 focus:outline-none text-white font-bold text-base placeholder:text-slate-500 text-center shadow-inner"
            />
            {errorMsg && (
              <span className="text-[11px] text-rose-400 font-medium block mt-1 text-center">
                {errorMsg}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSkip}
              className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
            >
              Skip ("Hero")
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
            >
              <span>Start Adventure</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <p className="text-[10px] text-slate-400 mt-4 leading-normal">
          You can also modify this and friend names anytime in Settings → Names.
        </p>
      </div>
    </div>
  );
};
