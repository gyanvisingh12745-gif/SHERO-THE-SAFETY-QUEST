import React, { useState, useEffect, useCallback } from 'react';
import { PersistentCityWorld } from './components/PersistentCityWorld';
import { TitleScreen } from './components/TitleScreen';
import { MissionSelectWorld } from './components/MissionSelectWorld';
import { GameplayView } from './components/GameplayView';
import { FinalResultsScreen } from './components/FinalResultsScreen';
import { SafeCircleToolkit } from './components/SafeCircleToolkit';
import { ProgressView } from './components/ProgressView';
import { HowToPlay } from './components/HowToPlay';
import { SettingsModal } from './components/SettingsModal';
import { CreditsModal } from './components/CreditsModal';
import { SceneGalleryDebug } from './components/SceneGalleryDebug';
import { MissionRegistryDebug } from './components/MissionRegistryDebug';
import { NameHeroModal } from './components/NameHeroModal';
import { NameHelpedWomanModal } from './components/NameHelpedWomanModal';
import { Mission } from '../shared/types';
import { MISSIONS } from '../shared/missionsData';
import { storage } from './utils/storage';
import { storyEngine } from './utils/storyEngine';
import { playerNames } from './utils/playerNames';

export type AppView =
  | 'title'
  | 'mission_select'
  | 'gameplay'
  | 'final_results'
  | 'safecircle'
  | 'progress'
  | 'how_to_play'
  | 'settings'
  | 'credits'
  | 'debug_scenes'
  | 'debug_missions';

export const App: React.FC = () => {
  // Check URL paths or hashes
  const initialView: AppView = (() => {
    if (typeof window === 'undefined') return 'title';
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes('/debug/scenes') || hash.includes('debug_scenes')) return 'debug_scenes';
    if (path.includes('/debug/missions') || hash.includes('debug_missions')) return 'debug_missions';
    return 'title';
  })();

  const [currentView, setCurrentView] = useState<AppView>(initialView);
  const [returnView, setReturnView] = useState<AppView>('title');
  const [activeMission, setActiveMission] = useState<Mission | null>(MISSIONS[0]);

  // Name flow state
  const [showHeroNameModal, setShowHeroNameModal] = useState<boolean>(false);
  const [showHelpedWomanNameModal, setShowHelpedWomanNameModal] = useState<boolean>(false);
  const [pendingMissionToStart, setPendingMissionToStart] = useState<Mission | null>(null);

  // Sync settings with playerNames engine
  useEffect(() => {
    const heroName = playerNames.getHeroName();
    const s = storage.getSettings();
    if (s.heroName !== heroName) {
      storage.saveSettings({ ...s, heroName });
    }
  }, []);

  // Browser History API listener for back gestures
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('/debug/scenes') || hash.includes('debug_scenes')) {
        setCurrentView('debug_scenes');
      } else if (path.includes('/debug/missions') || hash.includes('debug_missions')) {
        setCurrentView('debug_missions');
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Navigate to view, pushing history
  const navigateTo = useCallback((view: AppView, from?: AppView) => {
    setReturnView(from || currentView);
    setCurrentView(view);
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({ view }, '', window.location.pathname);
    }
  }, [currentView]);

  // ── Mission Launch Logic with Name Prompts ─────────────────────────────────

  const initiateMission = (mission: Mission) => {
    setActiveMission(mission);

    // If hero not named yet, prompt for hero name
    if (!playerNames.hasNamedHero()) {
      setPendingMissionToStart(mission);
      setShowHeroNameModal(true);
      return;
    }

    // If entering Part B and helped woman not named yet, prompt for helped woman name
    const isPartB = mission.number >= 10 || (mission.id && mission.id.startsWith('episode'));
    if (isPartB && !playerNames.hasNamedHelpedWoman()) {
      setPendingMissionToStart(mission);
      setShowHelpedWomanNameModal(true);
      return;
    }

    navigateTo('gameplay');
  };

  const handleStartFromTitle = () => {
    const progress = storage.getProgress();
    const unlocked = MISSIONS.filter(m => progress.unlockedMissionIds.includes(m.id));
    const toPlay =
      unlocked.find(m => !progress.completedMissionIds.includes(m.id)) ||
      MISSIONS[0];

    initiateMission(toPlay);
  };

  const handleHeroNameComplete = (name: string) => {
    setShowHeroNameModal(false);
    if (pendingMissionToStart) {
      const isPartB = pendingMissionToStart.number >= 10 || (pendingMissionToStart.id && pendingMissionToStart.id.startsWith('episode'));
      if (isPartB && !playerNames.hasNamedHelpedWoman()) {
        setShowHelpedWomanNameModal(true);
        return;
      }
      setActiveMission(pendingMissionToStart);
      navigateTo('gameplay');
      setPendingMissionToStart(null);
    } else {
      navigateTo('mission_select');
    }
  };

  const handleHelpedWomanNameComplete = (name: string) => {
    setShowHelpedWomanNameModal(false);
    if (pendingMissionToStart) {
      setActiveMission(pendingMissionToStart);
      navigateTo('gameplay');
      setPendingMissionToStart(null);
    } else {
      navigateTo('gameplay');
    }
  };

  const handleGameplayExit = () => {
    const progress = storage.getProgress();
    if (progress.completedMissionIds.length >= 15) {
      navigateTo('final_results');
    } else {
      navigateTo('mission_select');
    }
  };

  const handlePlayAgain = () => {
    storage.resetProgress();
    storyEngine.resetMetrics();
    setActiveMission(MISSIONS[0]);
    navigateTo('title');
  };

  // ── Developer Diagnostics Routes ──────────────────────────────────────────

  if (currentView === 'debug_scenes') {
    return (
      <SceneGalleryDebug
        onBackToApp={() => {
          if (window.location.pathname.includes('/debug/scenes')) {
            window.history.pushState({}, '', '/');
          }
          if (window.location.hash.includes('debug_scenes')) {
            window.location.hash = '';
          }
          navigateTo('title');
        }}
      />
    );
  }

  if (currentView === 'debug_missions') {
    return (
      <MissionRegistryDebug
        onBackToApp={() => {
          if (window.location.pathname.includes('/debug/missions')) {
            window.history.pushState({}, '', '/');
          }
          if (window.location.hash.includes('debug_missions')) {
            window.location.hash = '';
          }
          navigateTo('title');
        }}
        onLaunchMission={(missionId) => {
          const found = MISSIONS.find(m => m.id === missionId) || MISSIONS[0];
          initiateMission(found);
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-[#F8FAFC]">
      {/* ── Persistent World (Hidden during active visual-novel gameplay) ─ */}
      {currentView !== 'gameplay' && <PersistentCityWorld />}

      {/* ── TITLE SCREEN ─────────────────────────────────────────────────── */}
      {currentView === 'title' && (
        <div className="relative z-10 min-h-screen">
          <TitleScreen
            onPlay={handleStartFromTitle}
            onOpenSettings={() => navigateTo('settings', 'title')}
            onOpenCredits={() => navigateTo('credits', 'title')}
            onOpenMissions={() => navigateTo('mission_select', 'title')}
            onOpenHowToPlay={() => navigateTo('how_to_play', 'title')}
            onOpenRealHelp={() => navigateTo('safecircle', 'title')}
            onOpenDebugScenes={() => navigateTo('debug_scenes')}
            onStartSpecificMission={(num) => {
              const m = MISSIONS.find(x => x.number === num) || MISSIONS[0];
              initiateMission(m);
            }}
          />
        </div>
      )}

      {/* ── MISSION SELECT ───────────────────────────────────────────────── */}
      {currentView === 'mission_select' && (
        <div className="relative z-10 min-h-screen">
          <MissionSelectWorld
            onSelectMission={initiateMission}
            onBack={() => navigateTo('title')}
          />
        </div>
      )}

      {/* ── ACTIVE GAMEPLAY (UNIFIED SCENE RENDERER) ─────────────────────── */}
      {currentView === 'gameplay' && activeMission && (
        <div className="relative z-10 min-h-screen">
          <GameplayView
            mission={activeMission}
            onExit={handleGameplayExit}
            onNextMission={(nextMission) => {
              initiateMission(nextMission);
            }}
            onOpenSettings={() => navigateTo('settings', 'gameplay')}
          />
        </div>
      )}

      {/* ── FINAL RESULTS ────────────────────────────────────────────────── */}
      {currentView === 'final_results' && (
        <FinalResultsScreen
          playerName={playerNames.getHeroName()}
          onPlayAgain={handlePlayAgain}
          onReturnMenu={() => navigateTo('title')}
        />
      )}

      {/* ── SAFE CIRCLE / REAL HELP TOOLKIT ──────────────────────────────── */}
      {currentView === 'safecircle' && (
        <div className="relative z-10 min-h-screen">
          <SafeCircleToolkit onBack={() => navigateTo(returnView)} />
        </div>
      )}

      {/* ── PROGRESS VIEW ────────────────────────────────────────────────── */}
      {currentView === 'progress' && (
        <div className="relative z-10 min-h-screen">
          <ProgressView onBack={() => navigateTo(returnView)} />
        </div>
      )}

      {/* ── HOW TO PLAY ──────────────────────────────────────────────────── */}
      {currentView === 'how_to_play' && (
        <HowToPlay onBack={() => navigateTo(returnView)} />
      )}

      {/* ── SETTINGS ─────────────────────────────────────────────────────── */}
      {currentView === 'settings' && (
        <SettingsModal onBack={() => navigateTo(returnView)} />
      )}

      {/* ── CREDITS / ABOUT ──────────────────────────────────────────────── */}
      {currentView === 'credits' && (
        <CreditsModal onBack={() => navigateTo(returnView)} />
      )}

      {/* ── NAME HERO MODAL (Clean first play prompt) ────────────────────── */}
      {showHeroNameModal && (
        <NameHeroModal
          onComplete={handleHeroNameComplete}
          onSkip={() => handleHeroNameComplete('Hero')}
        />
      )}

      {/* ── NAME HELPED WOMAN MODAL (Clean Part B prompt) ────────────────── */}
      {showHelpedWomanNameModal && (
        <NameHelpedWomanModal
          onComplete={handleHelpedWomanNameComplete}
          onSkip={() => handleHelpedWomanNameComplete('Didi')}
        />
      )}
    </div>
  );
};
