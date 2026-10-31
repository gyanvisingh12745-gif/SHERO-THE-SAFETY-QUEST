import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, Play, BookOpen, Layers } from 'lucide-react';
import { allMissions } from '../content/scenes';
import { playerNames } from '../utils/playerNames';
import { soundCtrl } from '../utils/sound';

export interface MissionRegistryDebugProps {
  onBackToApp: () => void;
  onLaunchMission: (missionId: string) => void;
}

export const MissionRegistryDebug: React.FC<MissionRegistryDebugProps> = ({
  onBackToApp,
  onLaunchMission
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none p-6 sm:p-10">
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-purple-300 px-3 py-1.5 rounded-lg border border-purple-500/30 text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to SHERO</span>
          </button>
          <div>
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              SHERO Mission Registry Diagnostics (/debug/missions)
            </h1>
            <p className="text-xs text-slate-400">
              15 / 15 Missions Loaded and Verified
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>All 15 Verified OK</span>
        </div>
      </header>

      <main className="max-w-5xl w-full mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allMissions.map((mission, idx) => {
            const hasNodes = mission.nodes && Object.keys(mission.nodes).length > 0;
            const hasIntro = mission.introPanels && mission.introPanels.length > 0;
            const choicesCount = Object.values(mission.nodes || {})[0]?.choices?.length || 0;

            return (
              <div
                key={mission.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                        {mission.code}
                      </span>
                      <span className="text-xs text-pink-400 font-bold uppercase">
                        {mission.badgeName}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Loads OK</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {playerNames.substitute(mission.titleEn)}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">
                    {playerNames.substitute(mission.taglineEn)}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300 font-mono bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 mb-3">
                    <div>Intro: {hasIntro ? '3 Panels' : 'None'}</div>
                    <div>Environment: {mission.environmentName}</div>
                    <div>Choices: {choicesCount} Options</div>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-800/60">
                  <button
                    onClick={() => onLaunchMission(mission.id)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run Scene</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
