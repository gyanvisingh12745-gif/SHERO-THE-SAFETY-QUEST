import React, { useState } from 'react';
import { HeartHandshake, ArrowRight, Shield } from 'lucide-react';
import { UnifiedAnimeCharacter } from './UnifiedAnimeCharacter';
import { playerNames } from '../utils/playerNames';
import { soundCtrl } from '../utils/sound';

export interface NameHelpedWomanModalProps {
  onComplete: (name: string) => void;
  onSkip?: () => void;
}

export const NameHelpedWomanModal: React.FC<NameHelpedWomanModalProps> = ({ onComplete, onSkip }) => {
  const [typedName, setTypedName] = useState<string>(playerNames.getHelpedWomanName() === 'Didi' ? '' : playerNames.getHelpedWomanName());
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundCtrl.playSelect();
    const clean = typedName.trim();

    if (clean.length > 16) {
      setErrorMsg('Please keep name under 16 characters / 16 अक्षरों से छोटा नाम रखें');
      return;
    }

    const finalName = clean.length > 0 ? clean : 'Didi';
    playerNames.setHelpedWomanName(finalName);
    onComplete(finalName);
  };

  const handleSkip = () => {
    soundCtrl.playSelect();
    const finalName = 'Didi';
    playerNames.setHelpedWomanName(finalName);
    if (onSkip) onSkip();
    else onComplete(finalName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
      <div className="relative max-w-md w-full bg-slate-900 border-2 border-pink-500 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center">
        {/* Halo */}
        <div className="absolute -top-12 w-28 h-28 bg-pink-600/30 rounded-full blur-2xl pointer-events-none" />

        {/* Helped Woman Portrait (Warm, Gentle Saree/Kurta look) */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-pink-400 bg-purple-950/80 shadow-inner mb-4 flex items-center justify-center">
          <UnifiedAnimeCharacter
            id="anjali"
            expression="hopeful"
            scale={0.95}
            className="transform translate-y-3"
          />
        </div>

        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950 border border-pink-400/40 text-[11px] font-black uppercase tracking-wider text-pink-200 mb-2">
          <HeartHandshake className="w-3.5 h-3.5 text-pink-400" />
          <span>Part B: Be A Helper</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-white mb-1">
          Name the Woman You Help
        </h2>
        <p className="text-xs text-pink-200 font-semibold mb-4">
          Warm · Gentle · Kind · Seeking Strength
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="text-left">
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Enter Name / नाम दर्ज करें
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
              placeholder="Type a name (e.g. Anjali, Didi, Priya...)"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-pink-500/50 focus:border-purple-400 focus:outline-none text-white font-bold text-base placeholder:text-slate-500 text-center shadow-inner"
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
              Skip ("Didi")
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-rose-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
            >
              <span>Begin Part B</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <p className="text-[10px] text-slate-400 mt-4 leading-normal">
          In Part B, you guide and empower this woman to recognize coercive control, make safe decisions, and access real legal support.
        </p>
      </div>
    </div>
  );
};
