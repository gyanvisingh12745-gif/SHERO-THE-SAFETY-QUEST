import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  MissionSceneData,
  SceneNode,
  SceneChoice,
  CharacterExpression,
  StoryboardTurn
} from '../content/types';
import { UnifiedSceneBackground } from './UnifiedSceneBackground';
import { UnifiedAnimeCharacter } from './UnifiedAnimeCharacter';
import { CharacterRig } from './CharacterRig';
import { ConfettiEffect } from './ConfettiEffect';
import { PauseMenuModal } from './PauseMenuModal';
import { QuickExitButton } from './QuickExitButton';
import { ReportCardModal } from './ReportCardModal';
import { soundCtrl } from '../utils/sound';
import { speechCtrl } from '../utils/speech';
import { playerNames } from '../utils/playerNames';
import {
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  X,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Award,
  Sparkles,
  BookOpen,
  ArrowRight,
  Pause,
  Heart,
  Eye,
  Shield,
  MessageCircle,
  Play,
  RotateCw
} from 'lucide-react';

export interface SceneRendererProps {
  sceneData: MissionSceneData;
  onComplete: (success: boolean, stats: { scoreDelta: number; takeaways: string[] }) => void;
  onExit: () => void;
  onNextMission?: () => void;
  hasNextMission?: boolean;
  onOpenSettings?: () => void;
  isDevDebug?: boolean;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  sceneData,
  onComplete,
  onExit,
  onNextMission,
  hasNextMission = true,
  onOpenSettings,
  isDevDebug = false
}) => {
  // ── Core Flow State ────────────────────────────────────────────────────────
  const [stage, setStage] = useState<'content_notice' | 'story' | 'decision' | 'outcome' | 'takeaways'>(
    sceneData.part === 'B' ? 'content_notice' : 'story'
  );

  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [currentNodeId, setCurrentNodeId] = useState<string>(sceneData.startNodeId || 'node_1');

  // Decision & choice feedback state
  const [selectedChoice, setSelectedChoice] = useState<SceneChoice | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);

  // Gamification Metrics
  const [hearts, setHearts] = useState<number>(3);
  const [safetyMeter, setSafetyMeter] = useState<number>(80);
  const [awarenessMeter, setAwarenessMeter] = useState<number>(75);

  // Pause & End Game Modals
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showReportCard, setShowReportCard] = useState<boolean>(false);

  // Audio & Language controls
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isMuted, setIsMuted] = useState<boolean>(soundCtrl.getMuted());
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(speechCtrl.getVoiceEnabled());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTypingDone, setIsTypingDone] = useState<boolean>(false);
  const typewriterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Current active scene node with fallback
  const currentNode: SceneNode = useMemo(() => {
    if (sceneData.nodes && sceneData.nodes[currentNodeId]) {
      return sceneData.nodes[currentNodeId];
    }
    const firstKey = Object.keys(sceneData.nodes || {})[0];
    if (firstKey && sceneData.nodes[firstKey]) {
      return sceneData.nodes[firstKey];
    }
    return {
      id: 'fallback_node',
      decisionNumber: 1,
      backgroundKey: sceneData.environmentName || 'bus_stop_night',
      lighting: 'night_blue',
      weather: 'clear',
      situationEn: 'Stay alert and observe your surroundings.',
      situationHi: 'सतर्क रहें और अपने आसपास का जायजा लें।',
      speakerId: 'stranger',
      speakerName: 'Stranger',
      speakerExpression: 'neutral',
      speakerDialogueEn: 'Stay aware of your surroundings.',
      speakerDialogueHi: 'अपने आसपास सतर्क रहें।',
      heroExpression: 'determined',
      mangaEffect: 'none',
      crowd: [],
      questionEn: 'A stranger offers you a ride. What is the safest thing to do?',
      questionHi: 'कोई अजनबी आपको लिफ्ट दे, तो सबसे सुरक्षित कदम क्या है?',
      choices: [
        {
          id: 'c1',
          textEn: 'Politely refuse and move to a safer public place.',
          textHi: 'विनम्रता से मना करें और तुरंत सुरक्षित जगह जाएं।',
          isCorrect: true,
          feedbackEn: 'Staying in public view ensures your safety.',
          feedbackHi: 'खुली जगह पर रहना आपकी सुरक्षा तय करता है।',
          educationalTipEn: 'Prioritize visibility and clear communication.',
          educationalTipHi: 'हमेशा रोशनी और संपर्क को प्राथमिकता दें।',
          safetyDelta: 25
        }
      ],
      winningNextNodeId: 'VICTORY'
    };
  }, [sceneData, currentNodeId]);

  // Build the list of Storyboard Turns
  const activeStoryboardTurns: StoryboardTurn[] = useMemo(() => {
    if (sceneData.storyboardTurns && sceneData.storyboardTurns.length > 0) {
      return sceneData.storyboardTurns;
    }

    // Synthesize turns from introPanels and dialogue if storyboardTurns not defined
    const turns: StoryboardTurn[] = [];

    // 1. Intro panels
    if (sceneData.introPanels && sceneData.introPanels.length > 0) {
      sceneData.introPanels.forEach((p, idx) => {
        const vKey = p.visualKey || p.imageKey || '01_meet_gyanvi';
        turns.push({
          id: p.id || `intro_${idx}`,
          imageSrc: vKey.startsWith('/') ? vKey : `/comic/${vKey}.png`,
          titleEn: p.title || 'Scene Introduction',
          titleHi: p.titleHi || 'दृश्य परिचय',
          speaker: 'Narrator',
          speakerRole: 'narrator',
          speakerExpression: 'determined',
          heroExpression: 'determined',
          bubbleType: 'narration',
          textEn: p.captionEn,
          textHi: p.captionHi,
          mangaBadge: p.badge || 'SCENE',
          sfx: p.soundEffect || p.sfx || 'ambient'
        });
      });
    }

    // 2. Speaker dialogue turn
    if (currentNode.speakerDialogueEn) {
      turns.push({
        id: `node_${currentNode.id}_speaker`,
        speaker: currentNode.speakerName || 'Speaker',
        speakerRole: currentNode.speakerId === 'stranger' ? 'stranger' : 'friend',
        speakerExpression: currentNode.speakerExpression,
        heroExpression: currentNode.heroExpression,
        bubbleType: 'speech',
        textEn: currentNode.speakerDialogueEn,
        textHi: currentNode.speakerDialogueHi,
        mangaBadge: currentNode.mangaBadge || 'ENCOUNTER',
        sfx: currentNode.speakerId === 'stranger' ? 'tension' : 'ping'
      });
    }

    // 3. Hero response / inner thought turn
    if (currentNode.heroThoughtEn || currentNode.heroResponseDialogueEn) {
      turns.push({
        id: `node_${currentNode.id}_hero`,
        speaker: playerNames.getHeroName(),
        speakerRole: 'hero',
        speakerExpression: currentNode.heroExpression,
        heroExpression: currentNode.heroExpression,
        bubbleType: currentNode.heroThoughtEn ? 'thought' : 'speech',
        textEn: currentNode.heroThoughtEn || currentNode.heroResponseDialogueEn || '',
        textHi: currentNode.heroThoughtHi || currentNode.heroResponseDialogueHi || '',
        mangaBadge: 'INSTINCT',
        sfx: 'heartbeat'
      });
    }

    return turns;
  }, [sceneData, currentNode]);

  const currentTurn: StoryboardTurn | undefined = activeStoryboardTurns[currentTurnIndex];

  // Sound & Speech trigger for current turn
  const triggerTurnAudio = useCallback((turn: StoryboardTurn) => {
    // 1. Play realistic procedural sound effect
    if (turn.sfx) {
      switch (turn.sfx) {
        case 'piano':
          soundCtrl.playPianoNote(523.25, 2.2, 0.05);
          break;
        case 'footsteps':
          soundCtrl.playFootstepsPavement();
          break;
        case 'ambient':
          soundCtrl.playNightBusStopAmbience();
          break;
        case 'tension':
          soundCtrl.playSuspense();
          break;
        case 'suspense':
          soundCtrl.playAfraid();
          break;
        case 'gasp':
          soundCtrl.playGasp();
          setShakeScreen(true);
          setTimeout(() => setShakeScreen(false), 450);
          break;
        case 'heartbeat':
          soundCtrl.playHeartbeat();
          break;
        case 'phone':
          soundCtrl.playPhoneRinging();
          break;
        case 'car':
          soundCtrl.playCarDoorAndEngine();
          break;
        case 'ping':
          soundCtrl.playPing();
          break;
        default:
          soundCtrl.playHover();
          break;
      }
    }

    // 2. Realistic Speech synthesis
    const textToSpeak = lang === 'en' ? turn.textEn : turn.textHi;
    const cleanSpoken = playerNames.substitute(textToSpeak || '');
    if (cleanSpoken && isVoiceEnabled) {
      speechCtrl.speak(cleanSpoken, 1.0, 1.0, turn.speakerRole);
    }
  }, [lang, isVoiceEnabled]);

  // Handle Typewriter effect whenever turn changes
  useEffect(() => {
    if (stage !== 'story' || !currentTurn) return;

    if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);

    setDisplayedText('');
    setIsTypingDone(false);

    const fullText = playerNames.substitute(lang === 'en' ? currentTurn.textEn : currentTurn.textHi);
    let charIdx = 0;
    const stepMs = Math.max(14, Math.min(28, 450 / (fullText.length || 1)));

    triggerTurnAudio(currentTurn);

    typewriterTimerRef.current = setInterval(() => {
      charIdx++;
      if (charIdx <= fullText.length) {
        setDisplayedText(fullText.slice(0, charIdx));
      } else {
        setIsTypingDone(true);
        if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);

        // Auto-play progression
        if (isAutoPlay) {
          const readingDelay = Math.max(2200, fullText.length * 60);
          autoPlayTimerRef.current = setTimeout(() => {
            handleNextTurn();
          }, readingDelay);
        }
      }
    }, stepMs);

    return () => {
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [currentTurnIndex, stage, lang, isAutoPlay, activeStoryboardTurns]);

  // Background BGM
  useEffect(() => {
    soundCtrl.startAmbientBGM();
    return () => {
      speechCtrl.stop();
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, []);

  // Keyboard navigation: Enter/Space = Advance, Esc = Pause, F = Fullscreen, 1/2/3 = Choices
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'Escape') {
        setIsPaused(prev => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          setIsFullscreen(true);
        } else {
          document.exitFullscreen().catch(() => {});
          setIsFullscreen(false);
        }
      } else if (stage === 'story') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextTurn();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrevTurn();
        }
      } else if (stage === 'decision') {
        if (e.key === '1' && currentNode.choices[0]) {
          handleSelectChoice(currentNode.choices[0]);
        } else if (e.key === '2' && currentNode.choices[1]) {
          handleSelectChoice(currentNode.choices[1]);
        } else if (e.key === '3' && currentNode.choices[2]) {
          handleSelectChoice(currentNode.choices[2]);
        }
      } else if (stage === 'outcome') {
        if (e.key === 'Enter' || e.key === ' ') {
          if (isAnswerCorrect) {
            handleProceedAfterVictory();
          } else {
            handleTryAgain();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, currentTurnIndex, isTypingDone, isAnswerCorrect, currentNode]);

  // Turn navigation
  const handleNextTurn = () => {
    soundCtrl.playSelect();
    if (!isTypingDone && currentTurn) {
      // If still typing, fast-complete text
      const fullText = playerNames.substitute(lang === 'en' ? currentTurn.textEn : currentTurn.textHi);
      setDisplayedText(fullText);
      setIsTypingDone(true);
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
      return;
    }

    if (currentTurnIndex < activeStoryboardTurns.length - 1) {
      setCurrentTurnIndex(prev => prev + 1);
    } else {
      // All story turns complete -> Transition into interactive Safety Decision
      speechCtrl.stop();
      setStage('decision');
      soundCtrl.playPing();
      const questionText = playerNames.substitute(lang === 'en' ? currentNode.questionEn : currentNode.questionHi);
      if (isVoiceEnabled) {
        speechCtrl.speak(questionText, 0.98, 1.0, 'narrator');
      }
    }
  };

  const handlePrevTurn = () => {
    soundCtrl.playSelect();
    if (currentTurnIndex > 0) {
      setCurrentTurnIndex(prev => prev - 1);
    }
  };

  const handleReplayVoice = () => {
    soundCtrl.playSelect();
    if (currentTurn) {
      const fullText = playerNames.substitute(lang === 'en' ? currentTurn.textEn : currentTurn.textHi);
      speechCtrl.speak(fullText, 1.0, 1.0, currentTurn.speakerRole);
    }
  };

  // ── Choice Selection Handling ──────────────────────────────────────────────
  const handleSelectChoice = (choice: SceneChoice) => {
    setSelectedChoice(choice);
    setStage('outcome');

    if (choice.isCorrect) {
      setIsAnswerCorrect(true);
      setShowConfetti(true);
      soundCtrl.playPartyPopper();
      soundCtrl.playCorrect();

      setSafetyMeter(prev => Math.min(100, prev + 15));
      setAwarenessMeter(prev => Math.min(100, prev + 20));

      const explanation = lang === 'en' ? choice.feedbackEn : choice.feedbackHi;
      speechCtrl.speakCorrectFeedback(playerNames.substitute(explanation));
    } else {
      setIsAnswerCorrect(false);
      setShowConfetti(false);
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 600);

      if (sceneData.part === 'A') {
        setHearts(prev => Math.max(1, prev - 1));
      }
      setSafetyMeter(prev => Math.max(20, prev - 15));

      soundCtrl.playCarDoorAndEngine();
      soundCtrl.playWarningBuzzer();
      soundCtrl.playIncorrect();

      const explanation = lang === 'en' ? choice.feedbackEn : choice.feedbackHi;
      speechCtrl.speakIncorrectFeedback(playerNames.substitute(explanation));
    }
  };

  const handleTryAgain = () => {
    soundCtrl.playSelect();
    speechCtrl.stop();
    setSelectedChoice(null);
    setIsAnswerCorrect(null);
    setStage('decision');
  };

  const handleProceedAfterVictory = () => {
    soundCtrl.playVictory();
    speechCtrl.stop();
    setShowConfetti(false);
    setStage('takeaways');
  };

  const handleRestartMission = () => {
    setCurrentNodeId(sceneData.startNodeId || 'node_1');
    setCurrentTurnIndex(0);
    setStage('story');
    setSelectedChoice(null);
    setIsAnswerCorrect(null);
    setHearts(3);
    setSafetyMeter(80);
    setAwarenessMeter(75);
    setIsPaused(false);
  };

  const heroName = playerNames.getHeroName();
  const helpedName = playerNames.getHelpedWomanName();

  // Dynamic image resolution for current state — ONLY use file if it actually exists in Mission 1 comic bundle
  const activeImageSrc = useMemo(() => {
    // Only Mission 1 (A1) has pre-baked comic panel illustrations in /comic/
    const isMission1 = sceneData.code === 'A1' || sceneData.number === 1;

    if (isMission1) {
      if (stage === 'story' && currentTurn?.imageSrc) {
        return currentTurn.imageSrc;
      }
      if (stage === 'decision') {
        return '/comic/08_safety_question_card.png';
      }
      if (stage === 'outcome' && selectedChoice?.outcomeImageSrc) {
        return selectedChoice.outcomeImageSrc;
      }
      if (stage === 'takeaways' && sceneData.takeawayImageSrc) {
        return sceneData.takeawayImageSrc;
      }
    }
    // For all other missions: return null so the rich SVG character & living environment renders!
    return null;
  }, [stage, currentTurn, selectedChoice, sceneData]);

  return (
    <div className={`relative w-full h-[100dvh] overflow-hidden bg-slate-950 text-white font-sans select-none flex flex-col justify-between ${
      shakeScreen ? 'animate-bounce' : ''
    }`}>
      {/* ── 1. Living Anime Environment Background Layer ────────────────── */}
      <UnifiedSceneBackground
        backgroundKey={currentNode.backgroundKey || sceneData.environmentName}
        lighting={currentNode.lighting || 'night_blue'}
        weather={currentNode.weather || 'clear'}
      />

      {/* Confetti Explosion on Correct Answer */}
      {showConfetti && <ConfettiEffect durationMs={3600} />}

      {/* ── 2. Top Universal HUD Header ─────────────────────────────────── */}
      <header className="relative z-40 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        {/* Left: Hero Identity Badge */}
        <div className="flex items-center gap-2 sm:gap-3 bg-purple-950/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/40 shadow-lg">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-purple-400 bg-purple-900 shrink-0 shadow-inner">
            <UnifiedAnimeCharacter
              id="gyanvi"
              expression={isAnswerCorrect === true ? 'happy' : isAnswerCorrect === false ? 'scared' : 'determined'}
              scale={0.55}
              className="w-full h-full transform scale-150 translate-y-1"
            />
          </div>
          <div className="leading-tight pr-1">
            <span className="text-xs sm:text-sm font-bold text-purple-200 tracking-wide block">
              {heroName}
            </span>
            <span className="text-[10px] sm:text-[11px] text-pink-300 font-medium">
              {sceneData.code} • {playerNames.substitute(lang === 'en' ? sceneData.titleEn : sceneData.titleHi)}
            </span>
          </div>
        </div>

        {/* Center: Arc-Specific Gauges */}
        <div className="hidden md:flex items-center gap-4">
          {sceneData.part === 'A' ? (
            <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <div className="flex items-center gap-1">
                {[1, 2, 3].map(h => (
                  <Heart
                    key={h}
                    className={`w-4 h-4 transition-all ${
                      h <= hearts ? 'text-pink-500 fill-pink-500' : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <div className="h-3 w-px bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${safetyMeter}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-teal-300">{safetyMeter}%</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-pink-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-500/40">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-pink-400" />
                <span className="text-[11px] font-bold text-pink-200 uppercase">Awareness:</span>
                <div className="w-24 h-2.5 bg-slate-900 rounded-full overflow-hidden border border-pink-400/40">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-300"
                    style={{ width: `${awarenessMeter}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-pink-300">{awarenessMeter}%</span>
              </div>
              <QuickExitButton />
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {sceneData.part === 'B' && (
            <div className="md:hidden">
              <QuickExitButton />
            </div>
          )}

          {/* Auto-play toggle in story mode */}
          {stage === 'story' && (
            <button
              onClick={() => {
                soundCtrl.playSelect();
                setIsAutoPlay(prev => !prev);
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition shadow flex items-center gap-1 ${
                isAutoPlay
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
              title="Toggle Auto-Play"
            >
              <Play className="w-3 h-3" />
              <span className="hidden sm:inline">AUTO</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={() => {
              soundCtrl.playSelect();
              setLang(prev => (prev === 'en' ? 'hi' : 'en'));
            }}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900/80 border border-slate-700 text-purple-300 hover:bg-purple-900/60 transition shadow"
            title="Toggle Language / भाषा बदलें"
          >
            {lang === 'en' ? 'EN' : 'हिन्दी'}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(soundCtrl.toggleMute())}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white transition shadow"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Voice Toggle */}
          <button
            onClick={() => setIsVoiceEnabled(speechCtrl.toggleVoice())}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white transition shadow"
            title={isVoiceEnabled ? 'Disable Voice Narration' : 'Enable Spoken Voice'}
          >
            {isVoiceEnabled ? <Mic className="w-4 h-4 text-pink-400" /> : <MicOff className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
                setIsFullscreen(true);
              } else {
                document.exitFullscreen().catch(() => {});
                setIsFullscreen(false);
              }
            }}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white transition shadow hidden sm:flex"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Pause Button */}
          <button
            onClick={() => {
              soundCtrl.playSelect();
              setIsPaused(true);
            }}
            className="p-1.5 sm:p-2 rounded-lg bg-purple-950/80 border border-purple-500/50 text-purple-300 hover:text-white hover:bg-purple-900 transition shadow"
            title="Pause Game (Esc)"
          >
            <Pause className="w-4 h-4" />
          </button>

          {/* Exit Button */}
          <button
            onClick={() => {
              soundCtrl.playSelect();
              speechCtrl.stop();
              onExit();
            }}
            className="p-1.5 sm:p-2 rounded-lg bg-rose-950/80 border border-rose-800/60 text-rose-300 hover:bg-rose-900 hover:text-white transition shadow"
            title="Exit Mission"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── 3. MAIN CINEMATIC PICTURE & STORYBOARD CONTAINER ────────────── */}
      <main className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden z-20">
        {/* STAGE 0: PART B CONTENT NOTICE */}
        {stage === 'content_notice' && (
          <div className="max-w-md w-full bg-slate-900/95 border-2 border-pink-500 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-md animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-pink-950 border border-pink-500/50 flex items-center justify-center mx-auto mb-3 text-pink-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">
              {lang === 'en' ? 'Empowerment & Safety Notice' : 'जागरूकता और सुरक्षा सूचना'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {lang === 'en'
                ? `In Part B, you assist ${helpedName} Didi through real-life relationship challenges, boundaries, and legal rights. All scenarios are presented sensitively and non-graphically. A Quick Exit button is always accessible in the top bar.`
                : `भाग B में, आप ${helpedName} दीदी को रिश्तों की चुनौतियों, मर्यादा और कानूनी अधिकारों के माध्यम से सशक्त बनाते हैं। कोई भी दृश्य हिंसक नहीं है और ऊपर 'Quick Exit' बटन हमेशा उपलब्ध है।`}
            </p>
            <button
              onClick={() => {
                soundCtrl.playSelect();
                setStage('story');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black text-sm shadow-lg transition active:scale-95"
            >
              {lang === 'en' ? 'I Understand · Proceed' : 'मैं समझता/समझती हूँ · आगे बढ़ें'}
            </button>
          </div>
        )}

        {/* STAGE 1: TURN-BY-TURN ANIME STORYBOARD SCENE */}
        {stage === 'story' && currentTurn && (
          <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-between animate-in fade-in duration-300">
            {/* Story Picture Frame */}
            <div className="relative w-full flex-1 max-h-[60vh] sm:max-h-[64vh] rounded-3xl overflow-hidden border-2 border-purple-500/60 shadow-2xl bg-gradient-to-b from-purple-950/60 via-slate-950/80 to-black flex items-center justify-center group">
              {/* Layer 1: Living Scene Background inside the comic frame */}
              <UnifiedSceneBackground
                backgroundKey={currentNode.backgroundKey || sceneData.environmentName}
                lighting={currentNode.lighting || 'night_blue'}
                weather={currentNode.weather || 'clear'}
                className="opacity-75"
              />

              {activeImageSrc ? (
                <img
                  src={activeImageSrc}
                  alt={currentTurn.titleEn || 'Scene'}
                  className="w-full h-full object-contain sm:object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out z-10"
                />
              ) : (
                /* Dynamic living character visual with CharacterRig inside the panel frame */
                <div className="w-full h-full flex items-center justify-around relative p-4 z-10">
                  {/* Left / Foreground Actor */}
                  <div className="flex flex-col items-center">
                    <CharacterRig
                      id={currentTurn.speakerRole === 'stranger' ? currentNode.speakerId : currentTurn.speakerRole === 'friend' ? 'anjali' : 'gyanvi'}
                      expression={currentTurn.speakerExpression || 'neutral'}
                      scale={1.15}
                      isSpeaking={!isTypingDone}
                      reaction={currentTurn.sfx === 'gasp' ? 'gasp' : currentTurn.sfx === 'tears' ? 'tears' : currentTurn.sfx === 'vein' ? 'vein' : currentTurn.sfx === 'sparkle' ? 'sparkle' : undefined}
                    />
                    <div className="text-[11px] font-extrabold text-purple-200 bg-black/75 px-3 py-0.5 rounded-full border border-purple-400/40 mt-[-10px] shadow">
                      {playerNames.substitute(currentTurn.speaker)}
                    </div>
                  </div>

                  {/* Right / Hero Listener if speaker is stranger/friend */}
                  {currentTurn.speakerRole !== 'hero' && (
                    <div className="flex flex-col items-center">
                      <CharacterRig
                        id="gyanvi"
                        expression={currentTurn.heroExpression || 'concerned'}
                        scale={1.15}
                        flipHorizontal={true}
                        dimLevel={0.2}
                      />
                      <div className="text-[11px] font-extrabold text-pink-300 bg-black/75 px-3 py-0.5 rounded-full border border-pink-400/40 mt-[-10px] shadow">
                        {heroName}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Manga Badge / Turn Indicator */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black text-[11px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg border border-white/20">
                  {currentTurn.mangaBadge || 'STORY'}
                </span>
                <span className="bg-black/75 backdrop-blur-md text-purple-200 text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-full border border-purple-400/30">
                  {currentTurnIndex + 1} / {activeStoryboardTurns.length}
                </span>
              </div>

              {/* Title Overlay with Safe Area Padding */}
              {currentTurn.titleEn && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 max-w-[55%] truncate bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs sm:text-sm font-bold text-pink-200 shadow">
                  {playerNames.substitute(lang === 'en' ? currentTurn.titleEn : currentTurn.titleHi || currentTurn.titleEn)}
                </div>
              )}

              {/* Subtle Ambient Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
            </div>

            {/* Turn Dialogue Box (Comic Balloon Anchor) */}
            <div className="w-full mt-3 bg-slate-900/95 backdrop-blur-md border-2 border-purple-500/80 rounded-2xl p-3.5 sm:p-4 shadow-2xl relative flex flex-col justify-between min-h-[110px]">
              {/* Speaker Header */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {currentTurn.bubbleType !== 'narration' && currentTurn.speaker !== 'Narrator' ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-purple-900 border border-purple-400 overflow-hidden shrink-0 flex items-center justify-center">
                        <CharacterRig
                          id={currentTurn.speakerRole === 'stranger' ? currentNode.speakerId : currentTurn.speakerRole === 'friend' ? 'anjali' : 'gyanvi'}
                          expression={currentTurn.speakerExpression || 'neutral'}
                          scale={0.5}
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200 tracking-wide">
                        {playerNames.substitute(currentTurn.speaker)}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'SCENE CONTEXT' : 'दृश्य विवरण'}</span>
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-950/80 border border-purple-400/30 text-purple-300">
                    {currentTurn.bubbleType || 'dialogue'}
                  </span>
                </div>

                {/* Replay voice button */}
                <button
                  onClick={handleReplayVoice}
                  className="p-1 rounded-lg hover:bg-purple-900/50 text-slate-400 hover:text-pink-300 transition"
                  title="Replay Voice"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Typewriter Spoken Dialogue */}
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed min-h-[38px]">
                {displayedText}
                {!isTypingDone && <span className="inline-block w-1.5 h-4 ml-1 bg-pink-400 animate-pulse" />}
              </p>

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
                <button
                  onClick={handlePrevTurn}
                  disabled={currentTurnIndex === 0}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                    currentTurnIndex === 0
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-purple-300 hover:bg-purple-950/60 hover:text-white'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Back' : 'पीछे'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {activeStoryboardTurns.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTurnIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentTurnIndex
                          ? 'w-6 bg-pink-500'
                          : idx < currentTurnIndex
                          ? 'w-2 bg-purple-600'
                          : 'w-2 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextTurn}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-xl shadow-lg transition active:scale-95"
                >
                  <span>
                    {currentTurnIndex < activeStoryboardTurns.length - 1
                      ? lang === 'en'
                        ? 'Next'
                        : 'आगे'
                      : lang === 'en'
                      ? 'Safety Decision'
                      : 'सुरक्षा निर्णय'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: THE SAFETY DECISION (Comic Question Card + 3 Choices) */}
        {stage === 'decision' && (
          <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-between animate-in zoom-in-95 duration-300">
            {/* Visual Header / Bus Stop Scene */}
            <div className="relative w-full flex-1 max-h-[45vh] rounded-3xl overflow-hidden border-2 border-purple-500/70 shadow-2xl bg-black flex items-center justify-center">
              <img
                src="/comic/08_safety_question_card.png"
                alt="Decision Scene"
                className="w-full h-full object-contain sm:object-cover"
                onError={e => {
                  // Fallback to comic panel 7 if question card image error
                  (e.target as HTMLImageElement).src = '/comic/07_gyanvi_worried.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                ! SAFETY DECISION
              </div>
            </div>

            {/* Question & 3 Choices Container matching reference comic */}
            <div className="w-full mt-3 bg-slate-900/95 backdrop-blur-md border-2 border-purple-500/80 rounded-3xl p-4 sm:p-5 shadow-2xl">
              {/* Question Banner */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white font-black flex items-center justify-center text-base shadow">
                  !
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-black text-white leading-snug">
                  {playerNames.substitute(lang === 'en' ? currentNode.questionEn : currentNode.questionHi)}
                </h3>
              </div>

              {/* 3 Numbered Interactive Choices */}
              <div className="flex flex-col gap-2.5">
                {currentNode.choices.map((choice, idx) => {
                  const numberColor =
                    idx === 0
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : idx === 1
                      ? 'bg-cyan-500 border-cyan-400 text-white'
                      : 'bg-rose-500 border-rose-400 text-white';

                  const buttonBorder =
                    idx === 0
                      ? 'hover:border-emerald-400 hover:bg-emerald-950/40'
                      : idx === 1
                      ? 'hover:border-cyan-400 hover:bg-cyan-950/40'
                      : 'hover:border-rose-400 hover:bg-rose-950/40';

                  return (
                    <button
                      key={choice.id || idx}
                      onClick={() => handleSelectChoice(choice)}
                      className={`w-full text-left p-3 sm:p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 ${buttonBorder} text-slate-100 hover:text-white font-bold text-xs sm:text-sm leading-relaxed transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center justify-between group`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border shadow ${numberColor}`}>
                          {idx + 1}
                        </span>
                        <span>{playerNames.substitute(lang === 'en' ? choice.textEn : choice.textHi)}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: OUTCOME SCENE (Specific Full-Picture Outcome according to choice) */}
        {stage === 'outcome' && selectedChoice && (
          <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-between animate-in zoom-in-95 duration-300">
            {/* Full-Picture Outcome Image */}
            <div className={`relative w-full flex-1 max-h-[58vh] rounded-3xl overflow-hidden border-2 shadow-2xl bg-black flex items-center justify-center ${
              isAnswerCorrect ? 'border-emerald-500 ring-2 ring-emerald-400/40' : 'border-rose-500 ring-2 ring-rose-400/40'
            }`}>
              {selectedChoice.outcomeImageSrc ? (
                <img
                  src={selectedChoice.outcomeImageSrc}
                  alt="Outcome Scene"
                  className="w-full h-full object-contain sm:object-cover"
                />
              ) : (
                <UnifiedAnimeCharacter
                  id="gyanvi"
                  expression={isAnswerCorrect ? 'happy' : 'scared'}
                  scale={1.1}
                />
              )}

              {/* Outcome Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
                <span className={`font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg border border-white/20 ${
                  isAnswerCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  {isAnswerCorrect ? (lang === 'en' ? 'SAFE CHOICE' : 'सुरक्षित निर्णय') : (lang === 'en' ? 'UNSAFE CHOICE' : 'असुरक्षित निर्णय')}
                </span>
              </div>
            </div>

            {/* Outcome Feedback Card */}
            <div className={`w-full mt-3 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-md border-2 ${
              isAnswerCorrect ? 'bg-emerald-950/90 border-emerald-500' : 'bg-rose-950/90 border-rose-500'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isAnswerCorrect ? (
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <h4 className="text-sm sm:text-base font-black text-white">
                    {isAnswerCorrect
                      ? lang === 'en'
                        ? "Yes, you're correct! You can proceed."
                        : 'शाबाश! आपका निर्णय बिल्कुल सही है।'
                      : lang === 'en'
                      ? "Not quite. Let's think about a safer option."
                      : 'यह सुरक्षित नहीं है। आइए कोई बेहतर विकल्प चुनें।'}
                  </h4>
                </div>
              </div>

              {/* Character speech line on outcome */}
              {selectedChoice.outcomeDialogueEn && (
                <div className="bg-black/40 rounded-xl p-2.5 mb-2.5 border border-white/10 text-xs sm:text-sm font-semibold text-pink-200">
                  <span className="font-bold text-white mr-1.5">{heroName}:</span>
                  "{playerNames.substitute(lang === 'en' ? selectedChoice.outcomeDialogueEn : selectedChoice.outcomeDialogueHi || selectedChoice.outcomeDialogueEn)}"
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                {playerNames.substitute(lang === 'en' ? selectedChoice.feedbackEn : selectedChoice.feedbackHi)}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-end">
                {isAnswerCorrect ? (
                  <button
                    onClick={handleProceedAfterVictory}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-lg transition active:scale-95"
                  >
                    <span>{lang === 'en' ? 'Complete Mission' : 'मिशन पूरा करें'}</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleTryAgain}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-rose-200 hover:text-white font-bold px-5 py-2.5 rounded-xl border border-rose-500/50 shadow transition active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Try a Safer Option' : 'दोबारा प्रयास करें'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: KEY TAKEAWAYS (Panel 12 Victory & Checklist) */}
        {stage === 'takeaways' && (
          <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-between animate-in zoom-in-95 duration-300">
            {/* Takeaways Picture Frame */}
            <div className="relative w-full flex-1 max-h-[56vh] rounded-3xl overflow-hidden border-2 border-purple-500/80 shadow-2xl bg-black flex items-center justify-center">
              {sceneData.takeawayImageSrc ? (
                <img
                  src={sceneData.takeawayImageSrc}
                  alt="Key Takeaways"
                  className="w-full h-full object-contain sm:object-cover"
                />
              ) : (
                <UnifiedAnimeCharacter id="gyanvi" expression="happy" scale={1.2} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                ★ {sceneData.badgeName || 'BADGE EARNED'}
              </div>
            </div>

            {/* Takeaways Checklist Card */}
            <div className="w-full mt-3 bg-slate-900/95 backdrop-blur-md border-2 border-purple-500 rounded-3xl p-4 sm:p-5 shadow-2xl text-center">
              <h3 className="text-base sm:text-lg font-black text-white mb-2">
                {playerNames.substitute(lang === 'en' ? sceneData.takeawayEn.title : sceneData.takeawayHi.title)}
              </h3>

              <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 text-left mb-3">
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                  {(lang === 'en' ? sceneData.takeawayEn.checklist : sceneData.takeawayHi.checklist).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{playerNames.substitute(tip)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 mb-4 tracking-wide">
                {playerNames.substitute(lang === 'en' ? sceneData.takeawayEn.motto : sceneData.takeawayHi.motto)}
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex items-center gap-3 w-full justify-center">
                <button
                  onClick={() => {
                    soundCtrl.playSelect();
                    onComplete(true, {
                      scoreDelta: 50,
                      takeaways: sceneData.takeawayEn.checklist
                    });
                    onExit();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition"
                >
                  {lang === 'en' ? 'Mission Hub' : 'मिशन हब'}
                </button>

                {hasNextMission && onNextMission && (
                  <button
                    onClick={() => {
                      soundCtrl.playSelect();
                      onComplete(true, {
                        scoreDelta: 50,
                        takeaways: sceneData.takeawayEn.checklist
                      });
                      onNextMission();
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm shadow-lg transition active:scale-95"
                  >
                    <span>{lang === 'en' ? 'Next Chapter' : 'अगला अध्याय'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── 4. MODALS ───────────────────────────────────────────────────── */}
      {isPaused && (
        <PauseMenuModal
          onResume={() => setIsPaused(false)}
          onRestart={handleRestartMission}
          onOpenSettings={() => {
            setIsPaused(false);
            if (onOpenSettings) onOpenSettings();
          }}
          onExitToHub={() => {
            setIsPaused(false);
            speechCtrl.stop();
            onExit();
          }}
          onEndGame={() => {
            setIsPaused(false);
            speechCtrl.stop();
            setShowReportCard(true);
          }}
        />
      )}

      {showReportCard && (
        <ReportCardModal
          onPlayAgain={handleRestartMission}
          onReturnToHub={() => {
            setShowReportCard(false);
            onExit();
          }}
        />
      )}
    </div>
  );
};
