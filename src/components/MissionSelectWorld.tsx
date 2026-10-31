import React, { useState } from 'react';
import { ArrowLeft, Lock, CheckCircle2, Play, Trophy, Sparkles, BookOpen, Shield, Heart } from 'lucide-react';
import { allMissions, partAMissions, partBMissions } from '../content/scenes';
import { Mission } from '../../shared/types';
import { storage } from '../utils/storage';
import { soundCtrl } from '../utils/sound';
import { playerNames } from '../utils/playerNames';

interface MissionSelectProps {
  onSelectMission: (mission: Mission) => void;
  onBack: () => void;
}

export const MissionSelectWorld: React.FC<MissionSelectProps> = ({
  onSelectMission,
  onBack
}) => {
  const progress = storage.getProgress();
  const [activeTab, setActiveTab] = useState<'all' | 'partA' | 'partB'>('all');

  const heroName = playerNames.getHeroName();

  const displayedMissions =
    activeTab === 'partA'
      ? partAMissions
      : activeTab === 'partB'
      ? partBMissions
      : allMissions;

  const handleLaunch = (sceneData: typeof allMissions[0]) => {
    soundCtrl.playSelect();
    const missionObj: Mission = {
      id: sceneData.id,
      number: sceneData.number,
      chapterNumber: sceneData.number,
      chapterName: sceneData.titleEn,
      isStoryChapter: true,
      title: sceneData.titleEn,
      tagline: sceneData.taglineEn,
      domain: sceneData.part === 'A' ? 'Street & Campus Safety' : 'Relationships & Life Decisions',
      environmentName: sceneData.environmentName,
      badgeName: sceneData.badgeName,
      badgeIcon: sceneData.badgeIcon || 'ShieldCheck',
      badgeDescription: sceneData.taglineEn,
      difficulty: sceneData.number <= 3 ? 'Beginner' : sceneData.number <= 8 ? 'Intermediate' : 'Advanced',
      summary: sceneData.taglineEn,
      learningGoal: sceneData.takeawayEn.motto,
      startNodeId: sceneData.startNodeId,
      nodes: {},
      victoryEnding: {
        title: sceneData.takeawayEn.title,
        description: sceneData.takeawayEn.motto,
        takeaway: sceneData.takeawayEn.checklist[0] || ''
      }
    };
    onSelectMission(missionObj);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 bg-midnight/90 select-none overflow-y-auto backdrop-blur-[2px]">
      {/* Background cinematic glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/90 via-midnight/80 to-midnight/95" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigoDeep/60 to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
        <button
          onClick={() => { soundCtrl.playSelect(); onBack(); }}
          onMouseEnter={() => soundCtrl.playHover()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigoDeep/80 hover:bg-darkViolet text-xs text-mutedLavender hover:text-white transition border border-white/10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Main Menu</span>
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-xs font-orbitron font-semibold text-purple-300 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>15 CONNECTED CHAPTERS // ANIME ADVENTURE</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black font-orbitron text-white tracking-wider flex items-center gap-2 justify-center">
            <span>SHERO: MISSION DIRECTORY</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </h2>
          <p className="text-xs text-mutedLavender">
            Protagonist: <span className="font-orbitron font-bold text-pink-300">{heroName}</span> — Decisions shape your personal safety & life choices
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-darkViolet/80 border border-pink-500/30 text-pink-300 flex items-center gap-2">
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          <span>{progress.completedMissionIds.length} / 15 Cleared</span>
        </div>
      </header>

      {/* Arc Selection Tabs */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-6 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <button
          onClick={() => { soundCtrl.playSelect(); setActiveTab('all'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'all'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <span>All Missions</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">15</span>
        </button>

        <button
          onClick={() => { soundCtrl.playSelect(); setActiveTab('partA'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'partA'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Part A: Street & Campus (A1–A9)</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">9</span>
        </button>

        <button
          onClick={() => { soundCtrl.playSelect(); setActiveTab('partB'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'partB'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Part B: Relationships & Life (B1–B6)</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">6</span>
        </button>
      </div>

      {/* Missions Grid */}
      <main className="relative z-10 w-full max-w-6xl mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedMissions.map((mission, idx) => {
            const isCompleted = progress.completedMissionIds.includes(mission.id);

            return (
              <div
                key={mission.id}
                onClick={() => handleLaunch(mission)}
                className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group ${
                  isCompleted
                    ? 'bg-gradient-to-b from-slate-900/90 to-purple-950/80 border-emerald-500/40 hover:scale-[1.02] shadow-lg'
                    : 'bg-gradient-to-b from-slate-900/90 to-purple-950/90 border-purple-500/30 hover:border-pink-500/60 hover:scale-[1.02] shadow-lg'
                }`}
              >
                {/* Visual Header Banner */}
                <div className="p-4 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-orbitron font-extrabold text-[11px] px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-200 border border-purple-500/30 tracking-wider">
                      {mission.code}
                    </span>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-pink-300">
                      Rec. Chapter {mission.number}
                    </span>

                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>★★★ Cleared</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-purple-300 bg-purple-900/40 px-2 py-0.5 rounded-md border border-purple-500/30">
                        Unlocked
                      </span>
                    )}
                  </div>

                  {/* Title and Environment */}
                  <h3 className="text-base font-bold font-orbitron text-white group-hover:text-pink-300 transition">
                    {playerNames.substitute(mission.titleEn)}
                  </h3>
                  <p className="text-[11px] text-purple-300/90 font-medium mt-0.5">
                    {playerNames.substitute(mission.titleHi)}
                  </p>
                </div>

                {/* Scenario Summary */}
                <div className="px-4 py-2">
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {playerNames.substitute(mission.taglineEn)}
                  </p>

                  {/* Badge & Difficulty Tags */}
                  <div className="mt-3 flex flex-wrap items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono border border-purple-500/20">
                      {mission.badgeName}
                    </span>
                    <span className="text-slate-400">
                      {mission.introPanels.length} Panels Story
                    </span>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-pink-400 font-bold group-hover:underline">
                    {isCompleted ? 'Replay Chapter' : 'Start Adventure'}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-purple-600/80 group-hover:bg-pink-600 flex items-center justify-center text-white transition">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
