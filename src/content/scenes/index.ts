import { MissionSceneData } from '../types';
import { a1_bus_stop } from './a1_bus_stop';
import { a2_cab_ride } from './a2_cab_ride';
import { a3_suspicious_chat } from './a3_suspicious_chat';
import { a4_crowded_market } from './a4_crowded_market';
import { a5_late_night_walk } from './a5_late_night_walk';
import { a6_fake_job_offer } from './a6_fake_job_offer';
import { a7_the_stalker } from './a7_the_stalker';
import { a8_the_party } from './a8_the_party';
import { a9_sextortion_call } from './a9_sextortion_call';
import { b1_unsettling_changes } from './b1_unsettling_changes';
import { b2_family_pressure } from './b2_family_pressure';
import { b3_controlling_husband } from './b3_controlling_husband';
import { b4_breaking_point } from './b4_breaking_point';
import { b5_the_heir } from './b5_the_heir';
import { b6_money_matters } from './b6_money_matters';

export const allMissions: MissionSceneData[] = [
  a1_bus_stop,
  a2_cab_ride,
  a3_suspicious_chat,
  a4_crowded_market,
  a5_late_night_walk,
  a6_fake_job_offer,
  a7_the_stalker,
  a8_the_party,
  a9_sextortion_call,
  b1_unsettling_changes,
  b2_family_pressure,
  b3_controlling_husband,
  b4_breaking_point,
  b5_the_heir,
  b6_money_matters
];

export const partAMissions = allMissions.filter(m => m.part === 'A');
export const partBMissions = allMissions.filter(m => m.part === 'B');

export function getMissionScene(identifier: string | number): MissionSceneData {
  if (typeof identifier === 'number') {
    const found = allMissions.find(m => m.number === identifier);
    if (found) return found;
  }

  const str = String(identifier).toLowerCase().trim();

  // Match by id ('mission-1', 'episode-1')
  const byId = allMissions.find(m => m.id.toLowerCase() === str);
  if (byId) return byId;

  // Match by code ('a1', 'b3')
  const byCode = allMissions.find(m => m.code.toLowerCase() === str);
  if (byCode) return byCode;

  // Match by number in string form ('1', '12')
  const byNumStr = allMissions.find(m => String(m.number) === str);
  if (byNumStr) return byNumStr;

  // Fallback to first mission so the app NEVER crashes or falls back to plain layout
  return a1_bus_stop;
}

export {
  a1_bus_stop,
  a2_cab_ride,
  a3_suspicious_chat,
  a4_crowded_market,
  a5_late_night_walk,
  a6_fake_job_offer,
  a7_the_stalker,
  a8_the_party,
  a9_sextortion_call,
  b1_unsettling_changes,
  b2_family_pressure,
  b3_controlling_husband,
  b4_breaking_point,
  b5_the_heir,
  b6_money_matters
};
