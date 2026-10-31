import React, { useState } from 'react';
import { allMissions, getMissionScene } from '../content/scenes';
import { MissionSceneData, LightingMood, WeatherEffect, CharacterExpression } from '../content/types';
import { SceneRenderer } from './SceneRenderer';
import { UnifiedSceneBackground } from './UnifiedSceneBackground';
import { UnifiedAnimeCharacter } from './UnifiedAnimeCharacter';
import { ArrowLeft, Play, Eye, Layers, Sparkles, Volume2 } from 'lucide-react';
import { soundCtrl } from '../utils/sound';

export interface SceneGalleryDebugProps {
  onBackToApp: () => void;
}

export const SceneGalleryDebug: React.FC<SceneGalleryDebugProps> = ({ onBackToApp }) => {
  const [selectedMissionCode, setSelectedMissionCode] = useState<string>('A1');
  const [activePlayMission, setActivePlayMission] = useState<MissionSceneData | null>(null);

  // Quick sandbox tweak state
  const [sandboxLighting, setSandboxLighting] = useState<LightingMood>('night_blue');
  const [sandboxWeather, setSandboxWeather] = useState<WeatherEffect>('clear');
  const [sandboxExpr, setSandboxExpr] = useState<CharacterExpression>('determined');

  const currentMission = getMissionScene(selectedMissionCode);

  if (activePlayMission) {
    return (
      <SceneRenderer
        sceneData={activePlayMission}
        onComplete={() => setActivePlayMission(null)}
        onExit={() => setActivePlayMission(null)}
        onNextMission={() => {
          const currIdx = allMissions.findIndex(m => m.id === activePlayMission.id);
          if (currIdx < allMissions.length - 1) {
            setActivePlayMission(allMissions[currIdx + 1]);
          } else {
            setActivePlayMission(null);
          }
        }}
        isDevDebug={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Bar */}
      <header className="bg-slate-900 border-b border-purple-500/30 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-purple-300 px-3 py-1.5 rounded-lg border border-purple-500/30 text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to SHERO</span>
          </button>
          <div>
            <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
              SHERO Developer Scene Gallery
            </h1>
            <p className="text-xs text-slate-400">
              Visual QA inspection for all 15 missions (Part A & Part B)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              window.location.hash = 'debug_missions';
            }}
            className="text-xs text-pink-300 bg-pink-950/80 border border-pink-500/40 px-3 py-1.5 rounded-lg hover:bg-pink-900 transition font-bold hidden sm:block"
          >
            Mission Diagnostics (/debug/missions)
          </button>
          <button
            onClick={() => setActivePlayMission(currentMission)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold px-5 py-2 rounded-xl text-xs shadow-lg transition active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Play Full Mission ({currentMission.code})</span>
          </button>
        </div>
      </header>

      {/* Main Grid: Mission Selector Sidebar + Live Stage Preview */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Mission Selector Sidebar */}
        <aside className="w-full md:w-80 bg-slate-900/90 border-r border-slate-800 p-4 overflow-y-auto space-y-6 shrink-0">
          {/* Part A */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-purple-400 mb-2 flex items-center justify-between">
              <span>Part A: Street & Campus Safety</span>
              <span className="bg-purple-900/80 px-2 py-0.5 rounded text-[10px]">9 Missions</span>
            </div>
            <div className="space-y-1.5">
              {allMissions
                .filter(m => m.part === 'A')
                .map(m => (
                  <button
                    key={m.code}
                    onClick={() => {
                      soundCtrl.playSelect();
                      setSelectedMissionCode(m.code);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                      selectedMissionCode === m.code
                        ? 'bg-purple-600 text-white font-bold shadow'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span>{m.code}. {m.titleEn}</span>
                    <span className="text-[10px] opacity-75">{m.badgeName}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Part B */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-pink-400 mb-2 flex items-center justify-between">
              <span>Part B: Relationships & Life Crossroads</span>
              <span className="bg-pink-900/80 px-2 py-0.5 rounded text-[10px]">6 Episodes</span>
            </div>
            <div className="space-y-1.5">
              {allMissions
                .filter(m => m.part === 'B')
                .map(m => (
                  <button
                    key={m.code}
                    onClick={() => {
                      soundCtrl.playSelect();
                      setSelectedMissionCode(m.code);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                      selectedMissionCode === m.code
                        ? 'bg-pink-600 text-white font-bold shadow'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span>{m.code}. {m.titleEn}</span>
                    <span className="text-[10px] opacity-75">{m.badgeName}</span>
                  </button>
                ))}
            </div>
          </div>
        </aside>

        {/* Live Stage & Art Inspector Area */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Mission Overview Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-purple-950 text-purple-300 border border-purple-500/40 text-[10px] font-black px-2 py-0.5 rounded">
                  {currentMission.code}
                </span>
                <span className="text-xs text-pink-400 font-bold uppercase">
                  {currentMission.badgeName}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">{currentMission.titleEn}</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">{currentMission.taglineEn}</p>
            </div>

            <button
              onClick={() => setActivePlayMission(currentMission)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition active:scale-95 shrink-0"
            >
              <Eye className="w-4 h-4" />
              <span>Launch Live Scene</span>
            </button>
          </div>

          {/* Real-time Visual Staging Canvas */}
          <div className="relative w-full h-96 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-black">
            <UnifiedSceneBackground
              backgroundKey={currentMission.environmentName}
              lighting={sandboxLighting}
              weather={sandboxWeather}
            />

            {/* Gyanvi in foreground */}
            <div className="absolute bottom-[-10px] right-12 z-20">
              <UnifiedAnimeCharacter
                id="gyanvi"
                expression={sandboxExpr}
                scale={0.9}
                flipHorizontal={true}
              />
            </div>

            {/* Other character in scene */}
            {currentMission.nodes && (
              <div className="absolute bottom-[-10px] left-12 z-20">
                <UnifiedAnimeCharacter
                  id={Object.values(currentMission.nodes)[0]?.speakerId || 'stranger'}
                  expression="determined"
                  scale={0.88}
                />
              </div>
            )}

            {/* Live Sandbox Overlay Controls */}
            <div className="absolute top-3 left-3 z-30 bg-black/75 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex flex-wrap gap-2 text-xs">
              <select
                value={sandboxLighting}
                onChange={e => setSandboxLighting(e.target.value as LightingMood)}
                className="bg-slate-800 text-white rounded px-2 py-1 text-xs border border-slate-700"
              >
                <option value="night_blue">Night Blue</option>
                <option value="dusk_golden">Dusk Golden</option>
                <option value="amber_interior">Amber Interior</option>
                <option value="market_sunshine">Market Sunshine</option>
                <option value="neon_rain">Neon Rain</option>
                <option value="dawn_hope">Dawn Hope</option>
                <option value="tension_dark">Tension Dark</option>
              </select>

              <select
                value={sandboxWeather}
                onChange={e => setSandboxWeather(e.target.value as WeatherEffect)}
                className="bg-slate-800 text-white rounded px-2 py-1 text-xs border border-slate-700"
              >
                <option value="clear">Clear</option>
                <option value="light_rain">Light Rain</option>
                <option value="passing_lights">Passing Lights</option>
              </select>

              <select
                value={sandboxExpr}
                onChange={e => setSandboxExpr(e.target.value as CharacterExpression)}
                className="bg-slate-800 text-white rounded px-2 py-1 text-xs border border-slate-700"
              >
                <option value="determined">Determined</option>
                <option value="happy">Happy</option>
                <option value="shocked">Shocked</option>
                <option value="scared">Scared</option>
                <option value="thinking">Thinking</option>
                <option value="angry">Angry</option>
              </select>
            </div>
          </div>

          {/* 3-Panel Storyboard Inspection */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>3-Panel Storyboard Cards</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentMission.introPanels?.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black bg-purple-900 text-purple-300 px-2 py-0.5 rounded">
                        Panel {idx + 1}
                      </span>
                      <span className="text-[10px] font-bold text-pink-400">{p.badge}</span>
                    </div>
                    <div className="text-sm font-bold text-white mb-1">{p.title}</div>
                    <div className="text-xs text-slate-300 leading-relaxed mb-2">{p.captionEn}</div>
                  </div>
                  <div className="text-[11px] text-purple-300 italic">{p.captionHi}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dialogue & Choices Inspector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Decision & Functional Choices</span>
            </h3>

            {Object.values(currentMission.nodes || {}).map((node, nIdx) => (
              <div key={node.id || nIdx} className="space-y-4">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-purple-300 mb-1">
                    Speaker: {node.speakerName} ({node.speakerId})
                  </div>
                  <div className="text-sm text-slate-100">"{node.speakerDialogueEn}"</div>
                  <div className="text-xs text-slate-400 mt-1 italic">"{node.speakerDialogueHi}"</div>
                </div>

                <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-500/30">
                  <div className="text-xs font-bold text-pink-300 mb-1">
                    Question: {node.questionEn}
                  </div>
                  <div className="text-xs text-purple-300 italic mb-3">
                    {node.questionHi}
                  </div>

                  <div className="space-y-2">
                    {node.choices.map((c, cIdx) => (
                      <div
                        key={c.id || cIdx}
                        className={`p-3 rounded-lg border text-xs leading-relaxed ${
                          c.isCorrect
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                            : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-2">
                          <span>{c.isCorrect ? '✓ [Correct / Safe]' : '✗ [Unsafe / Risky]'}</span>
                          <span>{c.textEn}</span>
                        </div>
                        <div className="mt-1 text-[11px] opacity-90">{c.feedbackEn}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
