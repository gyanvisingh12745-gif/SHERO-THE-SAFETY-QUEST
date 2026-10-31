import React from 'react';
import { Award, Trophy, ShieldCheck, Heart, Sparkles, RotateCcw, Grid, Share2, Check } from 'lucide-react';
import { storage } from '../utils/storage';
import { playerNames } from '../utils/playerNames';
import { soundCtrl } from '../utils/sound';
import { UnifiedAnimeCharacter } from './UnifiedAnimeCharacter';

export interface ReportCardModalProps {
  onPlayAgain: () => void;
  onReturnToHub: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  onPlayAgain,
  onReturnToHub
}) => {
  const [copied, setCopied] = React.useState<boolean>(false);
  const progress = storage.getProgress();
  const heroName = playerNames.getHeroName();
  const helpedName = playerNames.getHelpedWomanName();

  const totalCompleted = progress.completedMissionIds.length;
  const badgesEarned = progress.earnedBadges.length;

  const safetyPercentage = Math.min(100, Math.round((progress.successfulRuns / Math.max(progress.totalRuns, 1)) * 100)) || 95;

  const handleShare = () => {
    soundCtrl.playSelect();
    const shareText = `🛡️ I completed SHERO: The Safety Quest as ${heroName}! Safety Score: ${safetyPercentage}% · ${totalCompleted}/15 Missions Cleared. Empowering women with situational awareness & legal safety! #SHERO #SafetyQuest`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none overflow-y-auto">
      <div className="relative max-w-xl w-full bg-slate-900 border-2 border-purple-500 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center my-auto">
        {/* Top Trophy Crest */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-400 p-0.5 shadow-xl mb-3 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
            <Trophy className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
        </div>

        <span className="text-xs font-black tracking-widest text-pink-400 uppercase">
          Official Safety & Awareness Dossier
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">
          {heroName}'s SHERO Report Card
        </h2>
        <p className="text-xs text-purple-200 mb-6">
          Advocacy & Resilience Partner to <span className="font-bold text-pink-300">{helpedName} Didi</span>
        </p>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="text-xl font-black text-white">{safetyPercentage}%</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Safety Index</span>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col items-center">
            <Heart className="w-5 h-5 text-pink-400 mb-1" />
            <span className="text-xl font-black text-white">{totalCompleted}/15</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Chapters</span>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col items-center">
            <Award className="w-5 h-5 text-yellow-400 mb-1" />
            <span className="text-xl font-black text-white">{badgesEarned}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Badges</span>
          </div>
        </div>

        {/* Core Competencies Mastered */}
        <div className="w-full bg-slate-950/70 rounded-2xl p-4 border border-slate-800 text-left mb-6 space-y-2">
          <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Empowerment Skills Certified</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
            <span className="text-slate-200">Street & Commute Vigilance</span>
            <span className="text-emerald-400 font-bold">Mastered ✓</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
            <span className="text-slate-200">Digital Extortion & Cyber Defense (1930)</span>
            <span className="text-emerald-400 font-bold">Certified ✓</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800">
            <span className="text-slate-200">Coercive Control & In-Law Pressure Defense</span>
            <span className="text-emerald-400 font-bold">Proficient ✓</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-slate-200">Streedhan & Economic Independence (PWDVA)</span>
            <span className="text-emerald-400 font-bold">Sovereign ✓</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full justify-between">
          <button
            onClick={handleShare}
            className="flex-1 py-3 rounded-xl bg-purple-950/90 hover:bg-purple-900 border border-purple-500/50 text-purple-200 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Share Achievement'}</span>
          </button>

          <button
            onClick={() => { soundCtrl.playSelect(); onReturnToHub(); }}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
          >
            <Grid className="w-4 h-4" />
            <span>Mission Hub</span>
          </button>
        </div>
      </div>
    </div>
  );
};
