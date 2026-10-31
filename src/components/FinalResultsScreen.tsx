import React, { useState, useEffect } from 'react';
import {
  Trophy, Star, Shield, RotateCcw, ArrowRight,
  Award, Sparkles, TrendingUp, CheckCircle, BookOpen, Heart, Compass
} from 'lucide-react';
import { storage } from '../utils/storage';
import { soundCtrl } from '../utils/sound';
import { storyEngine } from '../utils/storyEngine';
import type { PlayableCharacter } from './CharacterSelectScreen';
import { CharacterPortrait } from './CharacterPortrait';

interface FinalResultsProps {
  playerName: string;
  selectedCharacter?: PlayableCharacter | null;
  onPlayAgain: () => void;
  onReturnMenu: () => void;
}

const LEVEL_THRESHOLDS = [
  { min: 0,    label: 'New Explorer',            color: '#B9B7D6' },
  { min: 1000, label: 'Alert Observer',          color: '#67E8F9' },
  { min: 2500, label: 'Boundary Defender',       color: '#A78BFA' },
  { min: 4500, label: 'Sovereign Decision-Maker', color: '#FBBF24' },
  { min: 7000, label: 'SHERO Ascendant Champion', color: '#65F5C5' },
];

function getLevel(totalScore: number) {
  let level = LEVEL_THRESHOLDS[0];
  for (const l of LEVEL_THRESHOLDS) {
    if (totalScore >= l.min) level = l;
  }
  return level;
}

export const FinalResultsScreen: React.FC<FinalResultsProps> = ({
  playerName,
  selectedCharacter,
  onPlayAgain,
  onReturnMenu
}) => {
  const progress = storage.getProgress();
  const totalScore = Object.values(progress.highScores).reduce((a, b) => a + b, 0);
  const level = getLevel(totalScore);
  const safetyScore = Math.min(100, Math.round(
    (progress.successfulRuns / Math.max(progress.totalRuns, 1)) * 100
  ));
  const missionsCompleted = progress.completedMissionIds.length;
  const badgesEarned = progress.earnedBadges.length;

  // Multi-branching ending calculated from story variables
  const ending = storyEngine.determineEndingArchetype();
  const metrics = storyEngine.getMetrics();

  // Animated counters
  const [displayScore, setDisplayScore] = useState(0);
  const [displaySafety, setDisplaySafety] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    soundCtrl.playVictory();
    const t = setTimeout(() => setShowContent(true), 250);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    let start = 0;
    const step = Math.ceil(totalScore / 50);
    const id = setInterval(() => {
      start = Math.min(start + step, totalScore);
      setDisplayScore(start);
      if (start >= totalScore) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [showContent, totalScore]);

  useEffect(() => {
    if (!showContent) return;
    let s = 0;
    const id = setInterval(() => {
      s = Math.min(s + 2, safetyScore);
      setDisplaySafety(s);
      if (s >= safetyScore) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [showContent, safetyScore]);

  const starRating = Math.min(5, Math.round(missionsCompleted / 2));

  return (
    <div className="fixed inset-0 z-30 flex flex-col overflow-y-auto">
      {/* Semi-transparent overlay preserving city world */}
      <div className="absolute inset-0 bg-midnight/80 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* ── HERO HEADER WITH MULTI-ENDING ARCHETYPE ── */}
        <div
          className="text-center p-6 sm:p-8 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #11142B 0%, #20133F 50%, #11142B 100%)',
            border: '2px solid rgba(167,139,250,0.5)',
            boxShadow: '0 0 60px rgba(101,245,197,0.2)'
          }}
        >
          {/* Animated Trophy / Epilogue Crown */}
          <div className="flex justify-center mb-3">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center animate-bounce"
              style={{
                background: 'linear-gradient(135deg, #0F2815, #065F46)',
                boxShadow: '0 0 40px rgba(101,245,197,0.5)'
              }}
            >
              <Trophy className="w-10 h-10 text-successMint" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-successMint/10 border border-successMint/30 text-xs font-orbitron font-bold text-successMint tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SAGA CONCLUSION // {ending.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-orbitron text-white tracking-wide mb-1">
            {ending.title.toUpperCase()}
          </h1>
          <p className="text-sm sm:text-base font-orbitron text-softCyan font-medium mb-3">
            {ending.subtitle}
          </p>

          {/* Heroine Card */}
          {selectedCharacter && (
            <div className="flex flex-col items-center justify-center mt-2 mb-3">
              <div
                className="w-20 h-20 rounded-2xl overflow-hidden p-1 shadow-2xl border-2 flex items-center justify-center"
                style={{
                  background: selectedCharacter.bgGradient,
                  borderColor: selectedCharacter.borderColor,
                  boxShadow: `0 0 25px ${selectedCharacter.glowHex}`
                }}
              >
                <CharacterPortrait char={selectedCharacter} size={76} headOnly pose="happy" />
              </div>
              <p className="text-xs text-mutedLavender mt-2">
                Protagonist: <span className="text-white font-bold">{playerName || selectedCharacter.name}</span> ({selectedCharacter.name} — {selectedCharacter.title})
              </p>
            </div>
          )}

          {/* Emotional Epilogue Narrative */}
          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-midnight/80 border border-white/10 text-left my-4">
            <div className="text-xs font-orbitron font-bold text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Your Story Outcome:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {ending.narrative}
            </p>

            <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {ending.keyThemes.map((theme, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono border border-cyan-400/30">
                  ✓ {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Star rating */}
          <div className="flex justify-center gap-1.5 mt-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                className="w-6 h-6"
                fill={i <= starRating ? '#FBBF24' : 'transparent'}
                stroke={i <= starRating ? '#FBBF24' : '#374151'}
              />
            ))}
          </div>
        </div>

        {/* ── STATS & METRICS GRID ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              icon: Trophy,
              label: 'Total Score',
              value: displayScore.toLocaleString(),
              sub: 'points earned',
              color: '#65F5C5',
              bg: 'rgba(101,245,197,0.08)',
              border: 'rgba(101,245,197,0.25)'
            },
            {
              icon: Shield,
              label: 'Safety Awareness',
              value: `${displaySafety}%`,
              sub: 'decision accuracy',
              color: '#67E8F9',
              bg: 'rgba(103,232,249,0.08)',
              border: 'rgba(103,232,249,0.25)'
            },
            {
              icon: CheckCircle,
              label: 'Chapters Cleared',
              value: `${missionsCompleted}/10`,
              sub: 'episodes completed',
              color: '#A78BFA',
              bg: 'rgba(167,139,250,0.08)',
              border: 'rgba(167,139,250,0.25)'
            },
            {
              icon: Award,
              label: 'Badges Earned',
              value: badgesEarned.toString(),
              sub: 'achievements unlocked',
              color: '#FBBF24',
              bg: 'rgba(251,191,36,0.08)',
              border: 'rgba(251,191,36,0.25)'
            }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-3.5 flex flex-col items-center text-center gap-1"
                style={{ background: stat.bg, border: `1.5px solid ${stat.border}` }}
              >
                <Icon className="w-6 h-6" style={{ color: stat.color }} />
                <div className="text-xl sm:text-2xl font-black font-orbitron" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold text-mutedLavender uppercase tracking-wider">{stat.label}</div>
                <div className="text-[9px] text-mutedLavender/60">{stat.sub}</div>
              </div>
            );
          })}
        </div>

        {/* ── ACCUMULATED STORY ATTRIBUTES ── */}
        <div className="p-4 rounded-2xl bg-midnight/90 border border-white/10 space-y-3">
          <div className="text-xs font-orbitron font-bold text-softCyan uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-softCyan" />
            <span>Character Growth & Story Variables:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-emerald-400 block font-bold">Safety Mastery:</span>
              <span className="text-white text-sm">{metrics.safety}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-cyan-400 block font-bold">Boundary Defense:</span>
              <span className="text-white text-sm">{metrics.boundaries}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-amber-400 block font-bold">Financial Autonomy:</span>
              <span className="text-white text-sm">{metrics.independence}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-rose-400 block font-bold">Support Circle:</span>
              <span className="text-white text-sm">{metrics.support}%</span>
            </div>
          </div>
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 pb-6">
          <button
            onClick={() => {
              soundCtrl.playSelect();
              onPlayAgain();
            }}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-electricBlue to-neonLavender hover:shadow-glow-blue text-midnight font-orbitron font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>START A NEW JOURNEY</span>
          </button>
          <button
            onClick={() => {
              soundCtrl.playSelect();
              onReturnMenu();
            }}
            className="py-3 px-6 rounded-2xl bg-indigoDeep hover:bg-darkViolet border border-white/20 text-white font-orbitron font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>MAIN MENU</span>
          </button>
        </div>
      </div>
    </div>
  );
};
