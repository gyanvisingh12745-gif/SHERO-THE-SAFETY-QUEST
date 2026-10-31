import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  FastForward,
  History,
  X,
  PhoneCall,
  Sparkles,
  Cloud,
  MessageCircle,
  Zap
} from 'lucide-react';
import { soundCtrl } from '../utils/sound';
import { speechCtrl } from '../utils/speech';
import { playerNames } from '../utils/playerNames';

export type BubbleType = 'speech' | 'thought' | 'shout' | 'whisper' | 'phone' | 'narration';

export interface DialogueLine {
  id?: string;
  speaker: string;
  role?: string;
  speakerId?: string;
  textEn: string;
  textHi: string;
  thoughtEn?: string;
  thoughtHi?: string;
  bubbleType?: BubbleType;
  expression?: string;
  mangaBadge?: string;
  sfx?: string;
}

export interface ComicDialogueProps {
  lines: DialogueLine[];
  onComplete: () => void;
  lang?: 'en' | 'hi';
  onLineChange?: (lineIndex: number, currentLine: DialogueLine) => void;
  speakerSide?: 'left' | 'right';
  className?: string;
}

export const ComicDialogue: React.FC<ComicDialogueProps> = ({
  lines,
  onComplete,
  lang = 'en',
  onLineChange,
  speakerSide = 'left',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [dialogueHistory, setDialogueHistory] = useState<DialogueLine[]>([]);

  const typewriterTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentLine = lines[currentIndex] || lines[0];

  // Substitute dynamic player names
  const rawSpoken = lang === 'en' ? currentLine.textEn : currentLine.textHi;
  const rawThought = lang === 'en' ? currentLine.thoughtEn : currentLine.thoughtHi;
  const fullSpokenText = playerNames.substitute(rawSpoken || '');
  const fullThoughtText = rawThought ? playerNames.substitute(rawThought) : '';
  const speakerName = playerNames.substitute(currentLine.speaker || 'Speaker');

  // Trigger line change callback and update history
  useEffect(() => {
    if (onLineChange && currentLine) {
      onLineChange(currentIndex, currentLine);
    }
    setDialogueHistory(prev => {
      if (!prev.some(l => l.textEn === currentLine.textEn)) {
        return [...prev, currentLine];
      }
      return prev;
    });
  }, [currentIndex, currentLine, onLineChange]);

  // Handle Typewriter effect
  useEffect(() => {
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
    }

    setDisplayedText('');
    setIsTypingComplete(false);

    let charIdx = 0;
    const targetText = fullSpokenText;
    const stepSpeed = Math.max(12, Math.min(26, 400 / (targetText.length || 1)));

    typewriterTimerRef.current = setInterval(() => {
      charIdx++;
      if (charIdx <= targetText.length) {
        setDisplayedText(targetText.slice(0, charIdx));
      } else {
        setIsTypingComplete(true);
        if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
      }
    }, stepSpeed);

    // Audio Playback
    if (currentLine.sfx) {
      switch (currentLine.sfx) {
        case 'shock':
          soundCtrl.playShock();
          break;
        case 'afraid':
        case 'heartbeat':
          soundCtrl.playHeartbeat();
          break;
        case 'relief':
          soundCtrl.playRelief();
          break;
        case 'ping':
          soundCtrl.playPing();
          break;
        default:
          soundCtrl.playFootstep();
          break;
      }
    }

    // Read dialogue aloud via speech synthesis
    speechCtrl.speak(
      targetText,
      1.0,
      currentLine.speakerId === 'stranger' || currentLine.speakerId === 'scammer' ? 0.85 : 1.1,
      currentLine.speakerId === 'stranger' ? 'stranger' : 'narrator'
    );

    return () => {
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
      }
    };
  }, [currentIndex, fullSpokenText, currentLine]);

  // Click on bubble fast-forwards typewriter or advances
  const handleBubbleClick = () => {
    if (!isTypingComplete) {
      // Fast forward
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
      setDisplayedText(fullSpokenText);
      setIsTypingComplete(true);
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    soundCtrl.playSelect();
    if (currentIndex < lines.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    soundCtrl.playSelect();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSkipAll = () => {
    soundCtrl.playSelect();
    speechCtrl.stop();
    onComplete();
  };

  const bubbleType = currentLine.bubbleType || 'speech';

  return (
    <div className={`relative w-full max-w-4xl mx-auto z-30 select-none ${className}`}>
      {/* ─────────────────────────────────────────────────────────────────
          1. OPTIONAL THOUGHT CLOUD (Inner Feelings & Intuition)
      ─────────────────────────────────────────────────────────────────── */}
      {fullThoughtText && (
        <div className="relative mb-3 flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
          {/* Scalloped SVG Thought Cloud */}
          <div className="relative bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-purple-950/90 border-2 border-purple-400/60 rounded-3xl p-3 sm:p-4 shadow-xl backdrop-blur-md max-w-lg">
            {/* Trailing thought bubbles (SVG circles) */}
            <div className="absolute -bottom-3 left-8 flex gap-1">
              <span className="w-2.5 h-2.5 bg-purple-400/80 rounded-full border border-purple-200" />
              <span className="w-1.5 h-1.5 bg-purple-400/80 rounded-full border border-purple-200" />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-black tracking-wider text-pink-300 uppercase mb-1">
              <Cloud className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Inner Thought' : 'मन की बात'}</span>
            </div>
            <p className="text-xs sm:text-sm italic font-medium text-purple-100 leading-snug">
              "{fullThoughtText}"
            </p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          2. MAIN COMIC SPEECH / SHOUT / PHONE BUBBLE
      ─────────────────────────────────────────────────────────────────── */}
      <div
        onClick={handleBubbleClick}
        className={`relative cursor-pointer transition-transform active:scale-[0.99] p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-md ${
          bubbleType === 'shout'
            ? 'bg-amber-950/95 border-4 border-yellow-400 ring-4 ring-yellow-400/30'
            : bubbleType === 'whisper'
            ? 'bg-slate-900/90 border-2 border-dashed border-cyan-400'
            : bubbleType === 'phone'
            ? 'bg-slate-950/95 border-2 border-emerald-400 ring-2 ring-emerald-400/20'
            : 'bg-white text-slate-900 border-4 border-slate-950 shadow-[0_12px_36px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Directional Comic Speech Tail pointing to Speaker */}
        {bubbleType === 'speech' && (
          <div
            className={`absolute -bottom-4 ${
              speakerSide === 'left' ? 'left-10' : 'right-10'
            } w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[16px] border-t-white drop-shadow-[0_4px_2px_rgba(0,0,0,0.6)]`}
          />
        )}

        {/* Bubble Header: Speaker Badge + Manga Emotion Mark */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className={`font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow ${
                bubbleType === 'speech'
                  ? 'bg-purple-700 text-white'
                  : 'bg-yellow-400 text-black font-extrabold'
              }`}
            >
              {speakerName}
            </span>

            {currentLine.mangaBadge && (
              <span className="bg-pink-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full shadow animate-bounce">
                {currentLine.mangaBadge}
              </span>
            )}

            {bubbleType === 'phone' && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/40">
                <PhoneCall className="w-3 h-3" />
                <span>Call/Audio</span>
              </span>
            )}

            {bubbleType === 'shout' && (
              <span className="flex items-center gap-1 text-[11px] font-black text-yellow-300">
                <Zap className="w-3.5 h-3.5 fill-yellow-400" />
                <span>SHOUT</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* History Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundCtrl.playSelect();
                setShowHistoryModal(true);
              }}
              className="text-[11px] text-slate-500 hover:text-slate-800 p-1 rounded transition"
              title="Dialogue History / चैट इतिहास"
            >
              <History className="w-4 h-4" />
            </button>

            {/* Line Counter */}
            <span
              className={`text-[11px] font-mono font-bold ${
                bubbleType === 'speech' ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {currentIndex + 1} / {lines.length}
            </span>
          </div>
        </div>

        {/* Spoken Dialogue Text with Typewriter Effect */}
        <div
          className={`text-base sm:text-lg font-bold leading-relaxed min-h-[48px] ${
            bubbleType === 'speech' ? 'text-slate-900' : 'text-white'
          }`}
        >
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-2 h-4 bg-purple-600 ml-1 animate-pulse" />
          )}
        </div>

        {/* Lower Comic Controls: Back, Skip, Next */}
        <div className="mt-4 pt-3 border-t border-slate-200/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBack();
                }}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-800 transition active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Back' : 'पीछे'}</span>
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSkipAll();
              }}
              className="text-xs font-bold text-slate-500 hover:text-purple-700 px-2.5 py-1.5 transition"
            >
              {lang === 'en' ? 'Skip Story' : 'कहानी छोड़ें'}
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95"
          >
            <span>
              {currentIndex < lines.length - 1
                ? lang === 'en'
                  ? 'Next'
                  : 'आगे'
                : lang === 'en'
                ? 'Decide Now'
                : 'निर्णय लें'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          3. DIALOGUE HISTORY MODAL
      ─────────────────────────────────────────────────────────────────── */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-xl w-full bg-slate-900 border-2 border-purple-500 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 font-bold text-purple-300 text-sm">
                <History className="w-4 h-4" />
                <span>{lang === 'en' ? 'Dialogue Log' : 'वार्तालाप इतिहास'}</span>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {dialogueHistory.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs font-black text-pink-400 mb-1">
                    {playerNames.substitute(item.speaker)}
                  </div>
                  <div className="text-sm text-slate-200">
                    "{playerNames.substitute(lang === 'en' ? item.textEn : item.textHi)}"
                  </div>
                  {item.thoughtEn && (
                    <div className="text-xs italic text-purple-300 mt-1">
                      💭 "{playerNames.substitute(lang === 'en' ? item.thoughtEn : item.thoughtHi || '')}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
