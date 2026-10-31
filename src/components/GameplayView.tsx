import React, { useCallback } from 'react';
import { Mission } from '../../shared/types';
import { MISSIONS } from '../../shared/missionsData';
import { storage } from '../utils/storage';
import { storyEngine } from '../utils/storyEngine';
import { SceneRenderer } from './SceneRenderer';
import { getMissionScene, allMissions } from '../content/scenes';

export interface GameplayViewProps {
  mission: Mission;
  selectedCharacter?: any;
  onExit: () => void;
  onNextMission?: (nextMission: Mission) => void;
  onOpenSettings?: () => void;
}

export const GameplayView: React.FC<GameplayViewProps> = ({
  mission,
  onExit,
  onNextMission,
  onOpenSettings
}) => {
  // Resolve unified scene data from our content bible (A1 - A9, B1 - B6)
  const sceneData = getMissionScene(mission.number || mission.id);

  // Compute next mission
  const nextMissionIndex = MISSIONS.findIndex(m => m.id === mission.id) + 1;
  const nextMission = nextMissionIndex < MISSIONS.length ? MISSIONS[nextMissionIndex] : null;

  const handleComplete = useCallback(
    (success: boolean, stats: { scoreDelta: number; takeaways: string[] }) => {
      // Record run result in storage
      storage.recordRunResult(
        mission.id,
        success,
        stats.scoreDelta,
        nextMission?.id,
        {
          badgeName: sceneData.badgeName,
          missionId: mission.id
        }
      );

      // Apply metrics to storyEngine
      storyEngine.recordChoice(mission.id, 'choice_success', {
        safetyDelta: 20,
        supportDelta: 15,
        boundariesDelta: 20,
        independenceDelta: 15
      });
    },
    [mission, nextMission, sceneData]
  );

  const handleNextMission = useCallback(() => {
    if (nextMission && onNextMission) {
      onNextMission(nextMission);
    } else {
      // If reached the end of Part A or Part B, exit back to mission select or world map
      onExit();
    }
  }, [nextMission, onNextMission, onExit]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-slate-950">
      <SceneRenderer
        sceneData={sceneData}
        onComplete={handleComplete}
        onExit={onExit}
        onNextMission={handleNextMission}
        hasNextMission={Boolean(nextMission)}
        onOpenSettings={onOpenSettings}
      />
    </div>
  );
};
