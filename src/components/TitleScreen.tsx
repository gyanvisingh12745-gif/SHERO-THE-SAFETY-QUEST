import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  Settings,
  Shield,
  BookOpen,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  Heart,
  Globe,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { SheroLogo } from './SheroLogo';
import { soundCtrl } from '../utils/sound';
import { storage } from '../utils/storage';
import { playerNames } from '../utils/playerNames';
import { speechCtrl } from '../utils/speech';

interface TitleScreenProps {
  onPlay: () => void;
  onOpenSettings: () => void;
  onOpenCredits: () => void;
  onOpenMissions?: () => void;
  onOpenHowToPlay?: () => void;
  onOpenRealHelp?: () => void;
  onOpenDebugScenes?: () => void;
  onStartSpecificMission?: (missionNumber: number) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onPlay,
  onOpenSettings,
  onOpenCredits,
  onOpenMissions,
  onOpenHowToPlay,
  onOpenRealHelp,
  onOpenDebugScenes,
  onStartSpecificMission
}) => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isMuted, setIsMuted] = useState<boolean>(soundCtrl.getMuted());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const heroName = playerNames.getHeroName();

  // Check if save exists to show "Continue"
  const progress = useMemo(() => storage.getProgress(), []);
  const hasSave = progress.completedMissionIds && progress.completedMissionIds.length > 0;
  const lastMissionId = progress.completedMissionIds[progress.completedMissionIds.length - 1];

  // Mouse parallax handler (transform only, no re-layout)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    setParallaxOffset({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  }, []);

  const handleToggleAudio = () => {
    const muted = soundCtrl.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundCtrl.playSelect();
      soundCtrl.startAmbientBGM();
    }
  };

  const handleToggleLanguage = () => {
    soundCtrl.playSelect();
    const nextLang = lang === 'en' ? 'hi' : 'en';
    setLang(nextLang);
    try {
      localStorage.setItem('shero_lang', nextLang);
    } catch {}
  };

  const handleFullscreenToggle = () => {
    soundCtrl.playSelect();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleStartGame = () => {
    soundCtrl.playSelect();
    soundCtrl.unlockAudio();
    if (!isMuted) {
      soundCtrl.startAmbientBGM();
    }
    onPlay();
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-[100dvh] overflow-hidden select-none bg-plum"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. FULL-BLEED SUNSET SKY & CHERRY BLOSSOM ARTWORK
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${parallaxOffset.x * -12}px, ${parallaxOffset.y * -8}px, 0) scale(1.04)`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0.9, 0.4, 1)'
        }}
      >
        <picture>
          <source
            srcSet="/assets/bg/title_sunset-1920.webp 1920w, /assets/bg/title_sunset-1280.webp 1280w, /assets/bg/title_sunset.webp 2560w"
            type="image/webp"
          />
          <img
            src="/assets/bg/title_sunset.png"
            alt="SHERO Sunset Horizon"
            className="w-full h-full object-cover object-center"
            style={{ imageRendering: 'auto' }}
          />
        </picture>
        {/* Soft Warm Twilight Radial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/30 to-transparent" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FLOATING SAKURA PETALS (TRANSFORM / OPACITY ONLY)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-rose/80 to-hotPink/60 will-change-transform"
            style={{
              width: `${(i % 3) * 5 + 9}px`,
              height: `${(i % 3) * 3 + 6}px`,
              borderRadius: '50% 0 50% 50%',
              left: `${(i * 7.5 + 4) % 96}%`,
              top: '-20px',
              opacity: 0.75,
              animation: `petalFall ${7 + (i % 5) * 2}s linear infinite`,
              animationDelay: `${(i * 0.7) % 6}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translate3d(0, -10px, 0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.75;
          }
          100% {
            transform: translate3d(${parallaxOffset.x * 20 + 70}px, 105vh, 0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO CHARACTER STANDING PORTRAIT (PARALLAX LAYER)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 right-[4%] sm:right-[10%] lg:right-[15%] h-[72vh] sm:h-[82vh] max-h-[860px] pointer-events-none z-10 will-change-transform"
        style={{
          transform: `translate3d(${parallaxOffset.x * 14}px, ${parallaxOffset.y * 10}px, 0)`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0.9, 0.4, 1)'
        }}
      >
        <picture>
          <source
            srcSet="/assets/chars/hero/normal-1024.webp 1024w, /assets/chars/hero/normal-768.webp 768w, /assets/chars/hero/normal.webp 1536w"
            type="image/webp"
          />
          <img
            src="/assets/chars/hero/normal.png"
            alt={heroName}
            className="h-full w-auto object-contain filter drop-shadow-[0_15px_35px_rgba(27,16,32,0.7)]"
          />
        </picture>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. TOP UTILITY HUD (AUDIO, LANGUAGE, FULLSCREEN, HELPLINE)
      ───────────────────────────────────────────────────────────── */}
      <header className="relative z-20 flex items-center justify-between p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Subtle SHERO Icon Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-comicInk/70 border border-orchid/30 backdrop-blur-md flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-choiceSuccess animate-ping" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-creamPaper">
              15 Chapters Ready
            </span>
          </div>
        </div>

        {/* Top Control Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle (EN / हि) */}
          <button
            type="button"
            onClick={handleToggleLanguage}
            className="px-3.5 py-1.5 rounded-full bg-comicInk/70 hover:bg-violet/70 border border-orchid/30 text-creamPaper text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer"
            title="Toggle English / हिंदी"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-sunsetPeach" />
            <span>{lang === 'en' ? 'EN / हि' : 'हि / EN'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleAudio}
            className="p-2.5 rounded-full bg-comicInk/70 hover:bg-violet/70 border border-orchid/30 text-creamPaper backdrop-blur-md transition-all cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label="Toggle audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose" /> : <Volume2 className="w-4 h-4 text-sunsetPeach" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={handleFullscreenToggle}
            className="hidden sm:flex p-2.5 rounded-full bg-comicInk/70 hover:bg-violet/70 border border-orchid/30 text-creamPaper backdrop-blur-md transition-all cursor-pointer"
            title="Toggle Fullscreen"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Helplines Direct Button */}
          {onOpenRealHelp && (
            <button
              type="button"
              onClick={() => {
                soundCtrl.playSelect();
                onOpenRealHelp();
              }}
              className="px-3.5 py-1.5 rounded-full bg-hotPink/80 hover:bg-hotPink text-white text-xs font-bold flex items-center gap-1.5 border border-white/30 backdrop-blur-md shadow-glow-pink transition-all cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 fill-current" />
              <span>Helplines</span>
            </button>
          )}

          {/* Settings Modal */}
          <button
            type="button"
            onClick={() => {
              soundCtrl.playSelect();
              onOpenSettings();
            }}
            className="p-2.5 rounded-full bg-comicInk/70 hover:bg-violet/70 border border-orchid/30 text-creamPaper backdrop-blur-md transition-all cursor-pointer"
            title="Open Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4 text-creamPaper" />
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          5. MAIN CONTENT: TORN-PAPER INTRO CARD & "LET'S BEGIN"
      ───────────────────────────────────────────────────────────── */}
      <main className="relative z-20 flex flex-col justify-center h-[calc(100dvh-110px)] max-w-7xl mx-auto px-4 sm:px-8 pb-10">
        <div className="max-w-xl space-y-6">
          {/* Game Brand Logo */}
          <div className="transform origin-left scale-95 sm:scale-110">
            <SheroLogo size="hero" showSubtitle={true} />
          </div>

          {/* Torn-Paper Intro Card (Matching "Meet Gyanvi" primary reference sheet) */}
          <div
            className="torn-paper-card rounded-2xl p-6 sm:p-7 shadow-2xl relative max-w-md transform -rotate-1 hover:rotate-0 transition-transform duration-300"
            style={{
              clipPath:
                'polygon(0% 0%, 98% 1%, 100% 98%, 97% 100%, 3% 99%, 0% 96%, 1% 4%)'
            }}
          >
            {/* Washi Tape Graphic at Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-hotPink/40 border border-hotPink/60 rounded-sm transform rotate-2 backdrop-blur-xs shadow-sm" />

            {/* Brush-Stroke Display Title: Meet {hero} ♡ */}
            <div className="flex items-center justify-between border-b-2 border-comicInk/15 pb-2 mb-3">
              <h2 className="font-brush text-3xl sm:text-4xl text-plum font-bold tracking-wide">
                {lang === 'en' ? `Meet ${heroName}` : `${heroName} से मिलें`}
              </h2>
              <Heart className="w-5 h-5 text-hotPink fill-current animate-pulse" />
            </div>

            {/* Intro Narrative Body */}
            <p className="font-body text-xs sm:text-sm text-comicInk/90 leading-relaxed font-medium">
              {lang === 'en'
                ? `Hi! I'm ${heroName}. A college student who loves learning, exploring new places and dreams of a safer, independent future. Join me in this journey as I make choices, face real situations and learn how to stay safe and strong.`
                : `नमस्ते! मैं हूँ ${heroName}। एक कॉलेज छात्रा जो नई जगहों को जानने और एक सुरक्षित, स्वतंत्र भविष्य के सपने देखती है। इस सफर में मेरे साथ जुड़ें, जहाँ हम सही निर्णय लेंगे और सुरक्षित रहना सीखेंगे।`}
            </p>

            {/* Subtle Little Flower Doodle / Stamp */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-violet uppercase tracking-wider">
              <span>★ 15 Safety Chapters</span>
              <span>Personalized for {heroName}</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            {/* Primary Glowing Gradient "Let's Begin" Pill Button */}
            <button
              type="button"
              onClick={handleStartGame}
              className="px-8 py-4 btn-shimmery-pill text-base sm:text-lg font-extrabold flex items-center justify-center gap-3 cursor-pointer shadow-glow-pink"
            >
              <span>{lang === 'en' ? "Let's Begin" : 'शुरू करें'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Continue Button (Rendered only if saved progress exists) */}
            {hasSave && (
              <button
                type="button"
                onClick={handleStartGame}
                className="px-6 py-4 rounded-full bg-comicInk/80 hover:bg-violet/80 text-warmGold hover:text-white border-2 border-warmGold/40 text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-warmGold" />
                <span>{lang === 'en' ? 'Continue Story' : 'कहानी जारी रखें'}</span>
              </button>
            )}

            {/* World Map / Chapter Selector */}
            {onOpenMissions && (
              <button
                type="button"
                onClick={() => {
                  soundCtrl.playSelect();
                  onOpenMissions();
                }}
                className="px-5 py-4 rounded-full bg-plum/70 hover:bg-violet/70 text-creamPaper text-sm sm:text-base font-semibold border border-orchid/30 flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
              >
                <Compass className="w-4 h-4 text-sunsetPeach" />
                <span>{lang === 'en' ? 'Chapters' : 'अध्याय'}</span>
              </button>
            )}

            {/* How to Play */}
            {onOpenHowToPlay && (
              <button
                type="button"
                onClick={() => {
                  soundCtrl.playSelect();
                  onOpenHowToPlay();
                }}
                className="px-4 py-4 rounded-full bg-plum/50 hover:bg-plum text-creamPaper/80 hover:text-creamPaper text-sm font-semibold border border-orchid/20 flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'en' ? 'Guide' : 'मार्गदर्शिका'}</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
