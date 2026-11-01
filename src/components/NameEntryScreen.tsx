import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, UserCheck, Heart } from 'lucide-react';
import { soundCtrl } from '../utils/sound';
import { speechCtrl } from '../utils/speech';
import { storage } from '../utils/storage';
import { playerNames } from '../utils/playerNames';
import { SheroLogo } from './SheroLogo';

interface NameEntryScreenProps {
  onConfirmName: (name: string) => void;
  onBack?: () => void;
  isSettingsMode?: boolean;
}

const SUGGESTED_NAMES = ['Aira', 'Ananya', 'Rhea', 'Priya', 'Maya', 'Kavya'];

export const NameEntryScreen: React.FC<NameEntryScreenProps> = ({
  onConfirmName,
  onBack,
  isSettingsMode = false
}) => {
  const currentHero = playerNames.getHeroName();
  const [nameInput, setNameInput] = useState<string>(currentHero !== 'Aira' ? currentHero : '');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Audio unlock on user touch/input
  const handleInputFocus = () => {
    soundCtrl.unlockAudio();
  };

  const handleSelectSuggestion = (suggested: string) => {
    soundCtrl.playSelect();
    setNameInput(suggested);
    setErrorMsg('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundCtrl.unlockAudio();

    const trimmed = (nameInput || '').trim();
    if (!trimmed || trimmed.length < 1) {
      setErrorMsg('Please enter your name (at least 1 character).');
      return;
    }
    if (trimmed.length > 16) {
      setErrorMsg('Name must be 16 characters or fewer.');
      return;
    }

    try {
      playerNames.setHeroName(trimmed);
      const s = storage.getSettings();
      storage.saveSettings({ ...s, heroName: trimmed });
    } catch (err) {
      console.warn('Could not persist name to storage:', err);
    }

    setIsSuccess(true);
    soundCtrl.playVictory();

    // Spoken feedback welcoming the hero
    speechCtrl.speak(`Welcome to SHERO, ${trimmed}! Every choice shapes your journey.`, 1.0, 1.15, 'hero');

    setTimeout(() => {
      onConfirmName(trimmed);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gradient-to-br from-plum/95 via-violet/90 to-plum/95 backdrop-blur-md">
      {/* Background Anime Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-rose/20 animate-pulse"
            style={{
              width: `${(i % 4) * 8 + 8}px`,
              height: `${(i % 4) * 8 + 8}px`,
              top: `${(i * 19) % 95}%`,
              left: `${(i * 29) % 95}%`,
              animationDuration: `${3 + (i % 3) * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-lg glass-card p-6 sm:p-10 border-2 border-orchid/30 shadow-glow-violet animate-fade-slide-up">
        {/* Top Back Button if in Settings Mode */}
        {onBack && (
          <button
            type="button"
            onClick={() => {
              soundCtrl.playSelect();
              onBack();
            }}
            className="absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full bg-plum/60 hover:bg-violet/60 text-sunsetPeach border border-orchid/30 transition-all"
          >
            ← Back
          </button>
        )}

        {/* Logo & Headline */}
        <div className="text-center space-y-3 mb-6">
          <div className="inline-block transform scale-90 sm:scale-100">
            <SheroLogo />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-creamPaper via-sunsetPeach to-hotPink">
            {isSettingsMode ? 'Update Hero Name' : 'Who is Entering the Quest?'}
          </h2>
          <p className="text-xs sm:text-sm text-creamPaper/80 max-w-sm mx-auto leading-relaxed">
            Your name becomes the protagonist's identity across all 15 chapters, dialogues, and certificates.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="hero-name-input" className="block text-xs font-semibold text-sunsetPeach uppercase tracking-wider">
              Hero Name (Any language, 1–16 chars)
            </label>
            <div className="relative">
              <input
                id="hero-name-input"
                type="text"
                maxLength={16}
                value={nameInput}
                onChange={e => {
                  setNameInput(e.target.value);
                  setErrorMsg('');
                }}
                onFocus={handleInputFocus}
                placeholder="Type your name (e.g. Aira, Ananya, प्रिया)..."
                autoFocus
                className="w-full px-5 py-4 rounded-2xl bg-comicInk/70 text-creamPaper placeholder-creamPaper/40 border-2 border-orchid/40 focus:border-hotPink focus:ring-4 focus:ring-hotPink/20 text-lg font-medium transition-all outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-creamPaper/40 text-xs">
                {nameInput.length}/16
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs font-semibold text-rose animate-fade-in flex items-center gap-1.5 mt-1.5">
                <span>⚠️</span> {errorMsg}
              </p>
            )}
          </div>

          {/* Quick Suggestions Pill Badges */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-creamPaper/60 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-warmGold" />
              <span>Or choose a recommended hero name:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_NAMES.map(sName => (
                <button
                  key={sName}
                  type="button"
                  onClick={() => handleSelectSuggestion(sName)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    nameInput.trim() === sName
                      ? 'bg-hotPink text-white border-white shadow-glow-pink'
                      : 'bg-plum/50 text-creamPaper/90 hover:bg-violet/50 border-orchid/30 hover:border-orchid'
                  }`}
                >
                  {sName}
                </button>
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isSuccess}
            className="w-full py-4 px-6 rounded-full btn-shimmery-pill text-base sm:text-lg font-bold flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isSuccess ? (
              <>
                <UserCheck className="w-5 h-5 text-white animate-bounce" />
                <span>Entering Quest as {nameInput.trim() || 'Hero'}...</span>
              </>
            ) : (
              <>
                <span>Begin My Story</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Safety Note */}
        <div className="mt-6 pt-4 border-t border-orchid/20 text-center">
          <p className="text-[11px] text-creamPaper/60 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-hotPink fill-current" />
            <span>You can update your hero name anytime in Settings.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
