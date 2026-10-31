import React, { useState, useEffect, useRef } from 'react';
import { PlayableCharacter } from './CharacterSelectScreen';
import { CharacterPortrait } from './CharacterPortrait';
import { StrangerPortrait, StrangerType } from './StrangerPortrait';
import { Choice } from '../../shared/types';
import { soundCtrl } from '../utils/sound';
import { speechCtrl } from '../utils/speech';
import { Volume2, ChevronRight, RotateCcw, AlertTriangle, ShieldCheck, Sparkles, FastForward } from 'lucide-react';

export interface ComicDialogueSceneProps {
  situation: string;
  strangerSpeaker: string;
  strangerDialogue: string;
  heroInnerThought?: string;
  heroResponseDialogue?: string;
  exclamatoryPrompt?: string;
  choices: Choice[];
  selectedCharacter: PlayableCharacter;
  heroName: string;
  onSelectChoice: (choice: Choice) => void;
  selectedChoice: Choice | null;
  onAdvanceNext: () => void;
  strangerType?: StrangerType;
  isNightEnv?: boolean;
}

/**
 * ComicBookDialogueScene:
 * Enhanced Visual-Novel / Anime Graphic Novel Conversation Interface
 * Features:
 * - Dynamic manga action sound badges ("GASP!", "THUMP THUMP!", "EH?!", "PING!", "SHOCK!")
 * - Procedural Web Audio sound effects (heartbeat, shock, laugh, fear, relief)
 * - Alternating illustrated portraits with idle breathing, eye blinking, and lip movement
 * - Speech bubbles with directional tail pointers directly anchored to active speaker
 * - Full keyboard controls: 1/2/3 for choices, Space/Enter to advance
 * - Compact layout designed to fit within the viewport without forced scrolling
 */
export const ComicBookDialogueScene: React.FC<ComicDialogueSceneProps> = ({
  situation,
  strangerSpeaker,
  strangerDialogue,
  heroInnerThought,
  heroResponseDialogue,
  exclamatoryPrompt,
  choices,
  selectedCharacter,
  heroName,
  onSelectChoice,
  selectedChoice,
  onAdvanceNext,
  strangerType = 'cap_hoodie',
  isNightEnv = true
}) => {
  const resolvedHeroResponse =
    heroResponseDialogue ||
    `"No, thank you. I am on my way to meet someone and I'm fine right here."`;

  // Multi-step conversation panels:
  // 0: Stranger/NPC speaks first
  // 1: Hero responds verbally
  // 2: Safety Decision Question & 3 Choices
  // 3: Explanation & Outcome (after choice selected)
  const [panelStep, setPanelStep] = useState<number>(0);
  const [isSpeakingActive, setIsSpeakingActive] = useState<boolean>(false);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // If a choice is already made, move to feedback step
  useEffect(() => {
    if (selectedChoice) {
      setPanelStep(3);
    }
  }, [selectedChoice]);

  // Clean up any pending speech timers on unmount
  useEffect(() => {
    return () => {
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      speechCtrl.stop();
    };
  }, []);

  // Trigger procedural audio SFX based on dialogue & exclamations
  useEffect(() => {
    if (panelStep === 0) {
      if (exclamatoryPrompt?.includes('THUMP') || exclamatoryPrompt?.includes('HEART')) {
        soundCtrl.playHeartbeat();
      } else if (exclamatoryPrompt?.includes('SHOCK') || exclamatoryPrompt?.includes('GASP')) {
        soundCtrl.playShock();
      } else if (exclamatoryPrompt?.includes('SWEATDROP')) {
        soundCtrl.playAfraid();
      }
    } else if (panelStep === 1) {
      soundCtrl.playInteractPrompt();
    } else if (panelStep === 2) {
      soundCtrl.playPing();
    }
  }, [panelStep, exclamatoryPrompt]);

  // Voice narration triggers per panel step
  const speakCurrentTurn = (step: number) => {
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechCtrl.stop();

    if (step === 0) {
      // Stranger / NPC speaks
      const cleanStrangerLine = strangerDialogue.replace(/^["']|["']$/g, '');
      const voiceText = `${strangerSpeaker} says: ${cleanStrangerLine}`;
      setIsSpeakingActive(true);

      const isFemaleNPC = strangerSpeaker.toLowerCase().includes('priya') || strangerSpeaker.toLowerCase().includes('mother') || strangerSpeaker.toLowerCase().includes('meenakshi');
      const pitch = isFemaleNPC ? 1.1 : 0.85;
      speechCtrl.speak(voiceText, 0.95, pitch);

      const duration = Math.min(Math.max(cleanStrangerLine.length * 60, 2000), 6500);
      speechTimeoutRef.current = setTimeout(() => {
        setIsSpeakingActive(false);
      }, duration);
    } else if (step === 1) {
      // Hero responds
      const cleanHeroLine = resolvedHeroResponse.replace(/^["']|["']$/g, '');
      const voiceText = `${heroName} says: ${cleanHeroLine}`;
      setIsSpeakingActive(true);
      speechCtrl.speak(voiceText, 1.05, 1.2); // Bright feminine hero pitch

      const duration = Math.min(Math.max(cleanHeroLine.length * 60, 2000), 6000);
      speechTimeoutRef.current = setTimeout(() => {
        setIsSpeakingActive(false);
      }, duration);
    } else if (step === 2) {
      setIsSpeakingActive(false);
      speechCtrl.speak('What is the safest decision in this situation?', 1.0, 1.0);
    } else if (step === 3 && selectedChoice) {
      setIsSpeakingActive(false);
      const outcomeText = selectedChoice.isCorrect
        ? `Safe choice! ${selectedChoice.feedback}`
        : `Unsafe decision. ${selectedChoice.feedback}`;
      speechCtrl.speak(outcomeText, 1.0, 1.05);
    }
  };

  // Trigger speech when panel step changes
  useEffect(() => {
    speakCurrentTurn(panelStep);
  }, [panelStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (panelStep === 0) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          soundCtrl.playSelect();
          setPanelStep(1);
        }
      } else if (panelStep === 1) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          soundCtrl.playSelect();
          setPanelStep(2);
        }
      } else if (panelStep === 2 && !selectedChoice) {
        if (['1', 'a', 'A'].includes(e.key) && choices[0]) {
          e.preventDefault();
          handleChoiceClick(choices[0]);
        } else if (['2', 'b', 'B'].includes(e.key) && choices[1]) {
          e.preventDefault();
          handleChoiceClick(choices[1]);
        } else if (['3', 'c', 'C'].includes(e.key) && choices[2]) {
          e.preventDefault();
          handleChoiceClick(choices[2]);
        }
      } else if (panelStep === 3) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (selectedChoice?.isCorrect) {
            onAdvanceNext();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panelStep, selectedChoice, choices]);

  const handleChoiceClick = (choice: Choice) => {
    if (choice.sfxEmotion === 'shock') soundCtrl.playShock();
    else if (choice.sfxEmotion === 'laugh') soundCtrl.playLaugh();
    else if (choice.sfxEmotion === 'afraid') soundCtrl.playAfraid();
    else if (choice.sfxEmotion === 'heartbeat') soundCtrl.playHeartbeat();
    else if (choice.sfxEmotion === 'relief') soundCtrl.playRelief();
    else if (choice.sfxEmotion === 'ping') soundCtrl.playPing();
    else soundCtrl.playSelect();

    onSelectChoice(choice);
  };

  const isStrangerTurn = panelStep === 0;
  const isHeroTurn = panelStep === 1;
  const isDecisionTurn = panelStep === 2;
  const isExplanationTurn = panelStep === 3;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-indigo-500/40 shadow-2xl bg-gradient-to-b from-midnight/95 via-[#0D1226]/95 to-midnight/95 backdrop-blur-md p-3 sm:p-5 transition-all duration-300">
      {/* ── TOP COMIC STRIP HEADER ─────────────────────────────── */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-orbitron font-bold uppercase tracking-wider text-cyan-300">
            {panelStep === 0 && `Turn 1: ${strangerSpeaker} Speaks`}
            {panelStep === 1 && `Turn 2: ${heroName} Responds`}
            {panelStep === 2 && 'Turn 3: Assess Safety Choices'}
            {panelStep === 3 && (selectedChoice?.isCorrect ? 'Decision Validated — Safe Choice' : 'Critical Warning — Hazard Identified')}
          </span>
        </div>

        {/* Audio Replay & Skip Controls */}
        <div className="flex items-center gap-2">
          {panelStep < 2 && (
            <button
              type="button"
              onClick={() => {
                soundCtrl.playSelect();
                setPanelStep(2);
              }}
              title="Skip to Decision Choices"
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 text-[11px] font-semibold transition cursor-pointer"
            >
              <FastForward className="w-3 h-3 text-softCyan" />
              <span>Skip</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              soundCtrl.playSelect();
              speakCurrentTurn(panelStep);
            }}
            title="Replay Spoken Dialogue"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-cyan-500/20 border border-white/15 text-cyan-300 text-[11px] font-semibold transition cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Voice</span>
          </button>
        </div>
      </div>

      {/* ── MAIN GRAPHIC NOVEL STAGE ───────────────────────────── */}
      <div className="relative flex flex-col justify-between">
        {/* UPPER ROW: NPC (LEFT) & HEROINE (RIGHT) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* LEFT: NPC / STRANGER PORTRAIT */}
          <div
            className={`md:col-span-4 flex flex-col items-center md:items-start transition-all duration-300 ${
              isStrangerTurn ? 'opacity-100 scale-102 drop-shadow-[0_0_15px_rgba(245,158,11,0.35)]' : 'opacity-65 filter brightness-75 scale-95'
            }`}
          >
            {/* Speaker Tag */}
            <div className="flex items-center gap-2 mb-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-orbitron font-bold">
              <span className={`w-2 h-2 rounded-full ${isStrangerTurn ? 'bg-amber-400 animate-pulse' : 'bg-amber-600'}`} />
              <span>{strangerSpeaker}</span>
              {isStrangerTurn && isSpeakingActive && (
                <span className="text-[9px] text-amber-200 animate-pulse">● Speaking</span>
              )}
            </div>

            {/* Illustrated Stranger / NPC Portrait */}
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-amber-500/20 via-transparent to-black/40 border border-amber-500/30 overflow-hidden">
              <StrangerPortrait
                type={strangerType}
                speakerName={strangerSpeaker}
                size={155}
                isTalking={isStrangerTurn && isSpeakingActive}
              />
            </div>
          </div>

          {/* MIDDLE: COMIC SPEECH BUBBLE AREA WITH MANGA ACTION BADGE */}
          <div className="md:col-span-4 flex flex-col items-center justify-center my-1 md:my-0">
            {/* Manga Exclamatory Action Stamp */}
            {exclamatoryPrompt && (isStrangerTurn || isHeroTurn) && (
              <div className="mb-2 animate-bounce">
                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-red-500 to-amber-500 text-white font-comic text-xs font-black tracking-widest uppercase shadow-lg border border-yellow-200 rotate-[-3deg] inline-block">
                  ⚡ {exclamatoryPrompt} ⚡
                </span>
              </div>
            )}

            {/* PANEL 1: Stranger Speaks */}
            {isStrangerTurn && (
              <div className="relative w-full p-3.5 sm:p-4 rounded-2xl bg-white text-slate-900 border-2 border-slate-800 shadow-[0_8px_20px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in-95 duration-200">
                {/* Pointer Tail Left */}
                <div
                  className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-white drop-shadow-[-2px_0_1px_rgba(0,0,0,0.5)]"
                />
                <span className="text-[10px] font-bold font-orbitron text-amber-700 tracking-wider block mb-1 uppercase">
                  {strangerSpeaker}
                </span>
                <p className="font-comic text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  {strangerDialogue}
                </p>
                <div className="mt-2.5 flex items-center justify-end">
                  <button
                    onClick={() => {
                      soundCtrl.playSelect();
                      setPanelStep(1);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-orbitron font-bold text-[11px] uppercase shadow transition cursor-pointer"
                  >
                    <span>Listen & Respond</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* PANEL 2: Heroine Responds */}
            {isHeroTurn && (
              <div className="relative w-full p-3.5 sm:p-4 rounded-2xl bg-white text-slate-900 border-2 border-cyan-600 shadow-[0_8px_20px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in-95 duration-200">
                {/* Pointer Tail Right */}
                <div
                  className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-white drop-shadow-[2px_0_1px_rgba(0,0,0,0.5)]"
                />
                <span className="text-[10px] font-bold font-orbitron text-cyan-700 tracking-wider block mb-1 uppercase">
                  {heroName} ({selectedCharacter.name})
                </span>
                <p className="font-comic text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  {resolvedHeroResponse}
                </p>
                {heroInnerThought && (
                  <p className="mt-1.5 text-[11px] italic text-slate-500 border-t border-slate-200 pt-1">
                    💭 Thought: "{heroInnerThought}"
                  </p>
                )}
                <div className="mt-2.5 flex items-center justify-end">
                  <button
                    onClick={() => {
                      soundCtrl.playSelect();
                      setPanelStep(2);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white font-orbitron font-bold text-[11px] uppercase shadow-glow-cyan transition cursor-pointer"
                  >
                    <span>Assess Choices</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Turn placeholder */}
            {(isDecisionTurn || isExplanationTurn) && (
              <div className="text-center p-2.5 rounded-xl bg-midnight/70 border border-white/10">
                <span className="text-xs font-mono text-cyan-300">
                  {isDecisionTurn ? '⚡ Select your safety choice below (Keys 1, 2, 3)' : '◈ Review safety outcome below'}
                </span>
              </div>
            )}
          </div>

          {/* RIGHT: PROTAGONIST PORTRAIT */}
          <div
            className={`md:col-span-4 flex flex-col items-center md:items-end transition-all duration-300 ${
              isHeroTurn ? 'opacity-100 scale-102 drop-shadow-[0_0_15px_rgba(103,232,249,0.35)]' : 'opacity-65 filter brightness-75 scale-95'
            }`}
          >
            {/* Speaker Tag */}
            <div className="flex items-center gap-2 mb-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-orbitron font-bold">
              <span className={`w-2 h-2 rounded-full ${isHeroTurn ? 'bg-cyan-400 animate-pulse' : 'bg-cyan-600'}`} />
              <span>{heroName} ({selectedCharacter.name})</span>
              {isHeroTurn && isSpeakingActive && (
                <span className="text-[9px] text-cyan-200 animate-pulse">● Speaking</span>
              )}
            </div>

            {/* Illustrated Player Character Portrait */}
            <div
              className="relative rounded-2xl p-1 border overflow-hidden"
              style={{
                borderColor: `${selectedCharacter.colorHex}60`,
                background: `radial-gradient(circle at 50% 30%, ${selectedCharacter.colorHex}25, transparent 70%)`
              }}
            >
              <CharacterPortrait
                char={selectedCharacter}
                size={155}
                pose={isHeroTurn ? 'talking' : isExplanationTurn && selectedChoice?.isCorrect ? 'happy' : 'worried'}
              />
            </div>
          </div>
        </div>

        {/* ── LOWER SECTION: 3 CLEAR SAFETY DECISIONS (PANEL 3) ── */}
        {isDecisionTurn && (
          <div className="mt-3 pt-3 border-t border-white/10 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 px-1">
              <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div>
                <span className="text-[10px] font-orbitron font-bold text-red-400 uppercase tracking-wider block">
                  Safety Crossroads
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  What is the safest decision in this situation?
                </h4>
              </div>
            </div>

            {/* The 3 Choice Buttons */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              {choices.map((choice, index) => {
                const choiceBorder = [
                  'hover:border-emerald-400 hover:from-emerald-950/60',
                  'hover:border-cyan-400 hover:from-cyan-950/60',
                  'hover:border-amber-400 hover:from-amber-950/60'
                ];
                const badgeColor = [
                  'bg-emerald-500 text-white',
                  'bg-cyan-500 text-white',
                  'bg-amber-500 text-white'
                ];

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceClick(choice)}
                    onMouseEnter={() => soundCtrl.playHover()}
                    className={`w-full text-left p-3 rounded-xl bg-gradient-to-r from-indigo-950/80 to-slate-900/90 border border-white/15 ${choiceBorder[index % 3]} transition-all duration-200 flex items-start gap-3 group cursor-pointer shadow-md hover:scale-[1.01]`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg ${badgeColor[index % 3]} flex items-center justify-center font-orbitron font-bold text-xs shrink-0 shadow mt-0.5`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-100 group-hover:text-white transition leading-snug">
                      {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] font-mono text-slate-400 text-center pt-0.5">
              Keyboard shortcut: Press <span className="text-cyan-300 font-bold">1</span>, <span className="text-cyan-300 font-bold">2</span>, or <span className="text-cyan-300 font-bold">3</span>
            </p>
          </div>
        )}

        {/* ── PANEL 4: OUTCOME EXPLANATION & EDUCATIONAL TAKEAWAY ── */}
        {isExplanationTurn && selectedChoice && (
          <div className="mt-3 pt-3 border-t border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div
              className={`p-3.5 sm:p-4 rounded-2xl border ${
                selectedChoice.isCorrect
                  ? 'bg-gradient-to-br from-emerald-950/70 via-indigo-950/80 to-midnight border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : 'bg-gradient-to-br from-rose-950/70 via-indigo-950/80 to-midnight border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {selectedChoice.isCorrect ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-orbitron font-bold text-xs sm:text-sm text-emerald-300 uppercase tracking-wide">
                      Decision Validated — Safe Choice!
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span className="font-orbitron font-bold text-xs sm:text-sm text-rose-300 uppercase tracking-wide">
                      Hazard Identified — Vulnerable Decision
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-white leading-relaxed mb-2.5">
                {selectedChoice.feedback}
              </p>

              {selectedChoice.educationalTip && (
                <div className="p-2.5 rounded-xl bg-midnight/80 border border-white/10 flex items-start gap-2 text-[11px] text-slate-300 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cyan-300">Core Safety Rule: </span>
                    <span>{selectedChoice.educationalTip}</span>
                  </div>
                </div>
              )}

              {/* Progression Controls */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    soundCtrl.playSelect();
                    setPanelStep(2);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 border border-white/10 text-slate-300 text-[11px] font-semibold transition cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Review Options</span>
                </button>

                {selectedChoice.isCorrect ? (
                  <button
                    onClick={() => {
                      soundCtrl.playSelect();
                      onAdvanceNext();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-500/25 active:scale-95 transition cursor-pointer"
                  >
                    <span>Continue Journey</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundCtrl.playSelect();
                      setPanelStep(2);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-orbitron font-bold text-xs uppercase tracking-wider shadow active:scale-95 transition cursor-pointer"
                  >
                    <span>Try Again Safely</span>
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
