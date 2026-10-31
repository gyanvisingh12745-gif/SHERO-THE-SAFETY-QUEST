/**
 * CharacterRig — Animated Layered Anime Character
 * 
 * A single animated rig used by ALL missions. Renders a layered SVG character
 * with CSS-driven idle animations (blink, breathe, hair sway, micro-movement)
 * and expression-triggered reactions (gasp, shiver, tears, anger vein, etc.).
 * 
 * Animation runs via CSS keyframes — no per-frame React re-renders.
 * Mouth sync is driven by a simple interval when isSpeaking=true.
 */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { CharacterId, CharacterExpression } from '../content/types';

export interface CharacterRigProps {
  id: CharacterId | string;
  expression: CharacterExpression;
  isSpeaking?: boolean;
  scale?: number;
  flipHorizontal?: boolean;
  className?: string;
  mangaMark?: string;
  /** 0 = fully lit, 1 = dimmed non-speaker */
  dimLevel?: number;
  /** Show reaction overlay (gasp, tears, sweat, vein, sparkle) */
  reaction?: 'gasp' | 'tears' | 'shiver' | 'sweat' | 'vein' | 'sparkle' | 'exhale' | 'blush' | 'none';
}

// Character color configs (same palette as UnifiedAnimeCharacter)
const charConfigs: Record<string, {
  skin: string; shadow: string; hair: string; hairHighlight: string;
  eyeColor: string; eyeGlow: string; clothingMain: string; clothingAccent: string;
  name: string; isMale?: boolean;
}> = {
  gyanvi: { skin: '#FFF5EB', shadow: '#F2D3BE', hair: '#261642', hairHighlight: '#9D6DE8', eyeColor: '#7C3AED', eyeGlow: '#C4B5FD', clothingMain: '#6D28D9', clothingAccent: '#F472B6', name: 'Gyanvi' },
  aanya: { skin: '#FFF8F2', shadow: '#EACAB5', hair: '#111827', hairHighlight: '#22D3EE', eyeColor: '#0D9488', eyeGlow: '#67E8F9', clothingMain: '#0F766E', clothingAccent: '#F59E0B', name: 'Aanya' },
  meera: { skin: '#FFF6F0', shadow: '#E8C7B0', hair: '#1E1B4B', hairHighlight: '#818CF8', eyeColor: '#4F46E5', eyeGlow: '#A5B4FC', clothingMain: '#4338CA', clothingAccent: '#E0E7FF', name: 'Meera' },
  riya: { skin: '#FFF3E8', shadow: '#E5BF9E', hair: '#3B1D11', hairHighlight: '#FBBF24', eyeColor: '#D97706', eyeGlow: '#FDE68A', clothingMain: '#B45309', clothingAccent: '#EF4444', name: 'Riya' },
  mahima: { skin: '#FFF7F5', shadow: '#F0D4CE', hair: '#381E29', hairHighlight: '#F472B6', eyeColor: '#DB2777', eyeGlow: '#FBCFE8', clothingMain: '#BE185D', clothingAccent: '#FDE047', name: 'Mahima' },
  anjali: { skin: '#FFF5EE', shadow: '#ECCBB5', hair: '#1C1917', hairHighlight: '#78716C', eyeColor: '#059669', eyeGlow: '#6EE7B7', clothingMain: '#047857', clothingAccent: '#FCD34D', name: 'Anjali Didi' },
  rohan: { skin: '#FFF2EA', shadow: '#E4BF9F', hair: '#18181B', hairHighlight: '#71717A', eyeColor: '#3F3F46', eyeGlow: '#A1A1AA', clothingMain: '#1E293B', clothingAccent: '#38BDF8', name: 'Rohan', isMale: true },
  sunita_aunty: { skin: '#FBF1E6', shadow: '#DFC3A4', hair: '#27272A', hairHighlight: '#A1A1AA', eyeColor: '#451A03', eyeGlow: '#D97706', clothingMain: '#7C2D12', clothingAccent: '#F59E0B', name: 'Sunita Aunty' },
  counselor_priya: { skin: '#FFF6F0', shadow: '#E8C6AE', hair: '#1E293B', hairHighlight: '#38BDF8', eyeColor: '#0284C7', eyeGlow: '#7DD3FC', clothingMain: '#0F172A', clothingAccent: '#38BDF8', name: 'Counsellor Priya' },
  stranger: { skin: '#FFF0E5', shadow: '#DBB594', hair: '#09090B', hairHighlight: '#52525B', eyeColor: '#991B1B', eyeGlow: '#F87171', clothingMain: '#18181B', clothingAccent: '#DC2626', name: 'Stranger', isMale: true },
  cab_driver: { skin: '#F5E6D3', shadow: '#CCA884', hair: '#1C1917', hairHighlight: '#78716C', eyeColor: '#451A03', eyeGlow: '#B45309', clothingMain: '#374151', clothingAccent: '#FBBF24', name: 'Driver', isMale: true },
  shopkeeper: { skin: '#F5E6D3', shadow: '#CCA884', hair: '#292524', hairHighlight: '#A8A29E', eyeColor: '#57534E', eyeGlow: '#D6D3D1', clothingMain: '#854D0E', clothingAccent: '#FEF08A', name: 'Shopkeeper', isMale: true },
  guard: { skin: '#F5E6D3', shadow: '#CCA884', hair: '#18181B', hairHighlight: '#52525B', eyeColor: '#3B82F6', eyeGlow: '#93C5FD', clothingMain: '#1E3A8A', clothingAccent: '#F59E0B', name: 'Guard', isMale: true },
  auto_driver: { skin: '#EED9C4', shadow: '#C29C74', hair: '#1C1917', hairHighlight: '#57534E', eyeColor: '#451A03', eyeGlow: '#D97706', clothingMain: '#D97706', clothingAccent: '#16A34A', name: 'Auto Driver', isMale: true },
  fake_recruiter: { skin: '#FFF6F0', shadow: '#E8C7AE', hair: '#0F172A', hairHighlight: '#64748B', eyeColor: '#475569', eyeGlow: '#CBD5E1', clothingMain: '#0F172A', clothingAccent: '#60A5FA', name: 'Recruiter', isMale: true },
  stalker_ex: { skin: '#EAE1D8', shadow: '#BDB1A4', hair: '#09090B', hairHighlight: '#3F3F46', eyeColor: '#7F1D1D', eyeGlow: '#EF4444', clothingMain: '#18181B', clothingAccent: '#7F1D1D', name: 'Stalker', isMale: true },
  scammer: { skin: '#CBD5E1', shadow: '#94A3B8', hair: '#0F172A', hairHighlight: '#38BDF8', eyeColor: '#0EA5E9', eyeGlow: '#38BDF8', clothingMain: '#020617', clothingAccent: '#06B6D4', name: 'Blackmailer', isMale: true },
  husband: { skin: '#FFF2EA', shadow: '#E4BF9F', hair: '#18181B', hairHighlight: '#71717A', eyeColor: '#3F3F46', eyeGlow: '#A1A1AA', clothingMain: '#1E293B', clothingAccent: '#38BDF8', name: 'Husband', isMale: true },
};

// Unique instance ID for SVG gradient namespacing
let instanceCounter = 0;

export const CharacterRig: React.FC<CharacterRigProps> = ({
  id,
  expression = 'neutral',
  isSpeaking = false,
  scale = 1,
  flipHorizontal = false,
  className = '',
  mangaMark,
  dimLevel = 0,
  reaction = 'none'
}) => {
  const normId = (id || 'gyanvi').toLowerCase();
  const cfg = charConfigs[normId] || charConfigs.gyanvi;

  // Unique instance ID for gradient references
  const instanceId = useMemo(() => `cr_${++instanceCounter}`, []);

  // Mouth shape cycling for speech
  const [mouthShape, setMouthShape] = useState<number>(0);
  const mouthTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isSpeaking) {
      const cycle = () => {
        setMouthShape(prev => (prev + 1) % 5);
      };
      mouthTimerRef.current = window.setInterval(cycle, 90 + Math.random() * 40);
      return () => {
        if (mouthTimerRef.current) window.clearInterval(mouthTimerRef.current);
      };
    } else {
      setMouthShape(0);
      if (mouthTimerRef.current) window.clearInterval(mouthTimerRef.current);
    }
  }, [isSpeaking]);

  // ── Expression-driven SVG paths ──
  const getEyebrowPath = (side: 'left' | 'right') => {
    const L = side === 'left';
    switch (expression) {
      case 'angry': case 'annoyed':
        return L ? 'M 62 82 Q 78 88 90 92' : 'M 110 92 Q 122 88 138 82';
      case 'scared': case 'shocked':
        return L ? 'M 60 73 Q 75 67 88 76' : 'M 112 76 Q 125 67 140 73';
      case 'sad': case 'nervous':
        return L ? 'M 62 88 Q 76 80 88 84' : 'M 112 84 Q 124 80 138 88';
      case 'happy': case 'laughing': case 'hopeful': case 'relieved':
        return L ? 'M 62 82 Q 75 75 88 82' : 'M 112 82 Q 125 75 138 82';
      case 'determined':
        return L ? 'M 62 84 L 88 88' : 'M 112 88 L 138 84';
      case 'thinking':
        return L ? 'M 62 80 Q 75 76 88 80' : 'M 112 85 Q 125 88 138 85';
      default:
        return L ? 'M 62 82 Q 75 78 88 82' : 'M 112 82 Q 125 78 138 82';
    }
  };

  const getMouthPath = () => {
    if (isSpeaking) {
      // 5-shape mouth cycle: closed, small, open-A, wide-E, round-O
      const shapes = [
        'M 94 141 Q 100 143 106 141', // closed
        'M 92 140 Q 100 146 108 140',  // small open
        'M 90 138 Q 100 152 110 138 Z', // open A
        'M 88 139 Q 100 150 112 139',  // wide E
        '', // round O (ellipse)
      ];
      if (mouthShape === 4) return null; // render ellipse instead
      return shapes[mouthShape];
    }
    switch (expression) {
      case 'happy': case 'laughing': case 'hopeful':
        return 'M 88 138 Q 100 150 112 138';
      case 'shocked': case 'scared':
        return null; // use ellipse
      case 'sad': case 'nervous':
        return 'M 90 144 Q 100 138 110 144';
      case 'angry': case 'annoyed':
        return 'M 92 142 L 108 141';
      case 'relieved':
        return 'M 92 140 Q 100 145 108 140';
      case 'determined':
        return 'M 93 141 L 107 141';
      default:
        return 'M 92 141 Q 100 144 108 141';
    }
  };

  const mouthPath = getMouthPath();
  const useRoundMouth = mouthPath === null;

  const isWideEyes = expression === 'shocked' || expression === 'scared';
  const isHappyEyes = expression === 'happy' || expression === 'laughing';
  const showBlush = ['happy', 'laughing', 'embarrassed', 'hopeful'].includes(expression);

  // Reaction overlays
  const showTears = reaction === 'tears' || expression === 'sad';
  const showSweat = reaction === 'sweat' || expression === 'nervous';
  const showVein = reaction === 'vein' || expression === 'angry';
  const showSparkle = reaction === 'sparkle' || expression === 'determined';

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{
        transform: `${flipHorizontal ? 'scaleX(-1)' : ''} scale(${scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.2s ease-out',
        filter: dimLevel > 0 ? `brightness(${1 - dimLevel * 0.3}) blur(${dimLevel}px)` : 'none',
      }}
    >
      {/* CSS Keyframe Animations injected once */}
      <style>{`
        @keyframes cr-blink { 0%,92%,100% { transform: scaleY(1); } 94%,98% { transform: scaleY(0.08); } }
        @keyframes cr-breathe { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(-1.5px) scaleY(1.015); } }
        @keyframes cr-hairSway { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(1.5deg); } 75% { transform: rotate(-1.5deg); } }
        @keyframes cr-headDrift { 0%,100% { transform: rotate(0deg) translateX(0); } 33% { transform: rotate(0.8deg) translateX(0.5px); } 66% { transform: rotate(-0.5deg) translateX(-0.3px); } }
        @keyframes cr-mouthTalk { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.3); } }
        @keyframes cr-tearDrop { 0% { transform: translateY(0); opacity: 0.8; } 100% { transform: translateY(35px); opacity: 0; } }
        @keyframes cr-sweatSlide { 0% { transform: translateY(0); opacity: 0.7; } 100% { transform: translateY(25px); opacity: 0; } }
        @keyframes cr-veinPulse { 0%,100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.15); opacity: 1; } }
        @keyframes cr-sparkle { 0%,100% { transform: scale(0.6) rotate(0deg); opacity: 0.3; } 50% { transform: scale(1.1) rotate(180deg); opacity: 1; } }
        @keyframes cr-shiver { 0%,100% { transform: translateX(0); } 25% { transform: translateX(1px); } 75% { transform: translateX(-1px); } }
        @keyframes cr-gasp { 0% { transform: translateX(0) scale(1); } 30% { transform: translateX(-4px) scale(1.04); } 100% { transform: translateX(0) scale(1); } }
        @keyframes cr-exhale { 0% { transform: scaleY(1.02); } 100% { transform: scaleY(0.98); } }
        .cr-blink { animation: cr-blink 3.5s ease-in-out infinite; animation-delay: ${Math.random() * 2}s; }
        .cr-breathe { animation: cr-breathe 3.2s ease-in-out infinite; }
        .cr-hair-sway { animation: cr-hairSway 4s ease-in-out infinite; transform-origin: top center; }
        .cr-head-drift { animation: cr-headDrift 5s ease-in-out infinite; }
        .cr-shiver { animation: cr-shiver 0.055s linear infinite; }
        .cr-gasp { animation: cr-gasp 0.6s ease-out 1; }
      `}</style>

      <svg
        viewBox="0 0 200 260"
        className={`w-full h-auto drop-shadow-2xl overflow-visible ${
          reaction === 'shiver' ? 'cr-shiver' : ''
        } ${reaction === 'gasp' ? 'cr-gasp' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`sg-${instanceId}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="40%" stopColor={cfg.skin} />
            <stop offset="100%" stopColor={cfg.shadow} />
          </radialGradient>
          <linearGradient id={`hg-${instanceId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={cfg.hairHighlight} />
            <stop offset="45%" stopColor={cfg.hair} />
            <stop offset="100%" stopColor="#0B0914" />
          </linearGradient>
          <linearGradient id={`jg-${instanceId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={cfg.clothingMain} />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* BREATHING GROUP wrapping entire body */}
        <g className="cr-breathe">
          {/* 1. Back Hair with sway */}
          <g className="cr-hair-sway">
            <path
              d="M 45 90 C 30 140 30 200 45 240 C 65 245 135 245 155 240 C 170 200 170 140 155 90 Z"
              fill={cfg.hair}
              opacity="0.95"
            />
          </g>

          {/* 2. Neck */}
          <path d="M 86 145 L 86 175 L 114 175 L 114 145 Z" fill={cfg.shadow} />
          <path d="M 88 165 Q 100 175 112 165" stroke={cfg.shadow} strokeWidth="2" fill="none" />

          {/* 3. Clothing */}
          <path
            d="M 40 260 L 55 185 Q 100 170 145 185 L 160 260 Z"
            fill={`url(#jg-${instanceId})`}
          />
          <path
            d="M 75 180 L 100 220 L 125 180 Q 100 190 75 180 Z"
            fill={cfg.clothingAccent}
            opacity="0.9"
          />
          <path d="M 100 220 L 100 260" stroke="#000000" strokeWidth="2" opacity="0.3" />

          {/* HEAD GROUP with micro-drift */}
          <g className="cr-head-drift">
            {/* 4. Face */}
            <path
              d="M 56 100 C 56 60 144 60 144 100 C 144 135 125 160 100 165 C 75 160 56 135 56 100 Z"
              fill={`url(#sg-${instanceId})`}
            />

            {/* 5. Cheek blush */}
            {showBlush && (
              <g opacity="0.55">
                <ellipse cx="68" cy="120" rx="9" ry="5" fill="#FB7185" />
                <ellipse cx="132" cy="120" rx="9" ry="5" fill="#FB7185" />
                <path d="M 64 122 L 67 118 M 68 122 L 71 118 M 128 122 L 131 118 M 132 122 L 135 118" stroke="#E11D48" strokeWidth="1" />
              </g>
            )}

            {/* 6. Eyebrows */}
            <path d={getEyebrowPath('left')} stroke="#1E1B4B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d={getEyebrowPath('right')} stroke="#1E1B4B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* 7. EYES with blink animation */}
            <g className="cr-blink" style={{ transformOrigin: '75px 105px' }}>
              {isHappyEyes ? (
                <path d="M 65 107 Q 75 97 85 107" stroke="#1F2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              ) : (
                <g>
                  <ellipse cx={75} cy={105} rx={isWideEyes ? 12 : 10} ry={isWideEyes ? 16 : 13} fill="#FFFFFF" />
                  <ellipse cx={75} cy={106} rx={isWideEyes ? 10 : 8} ry={isWideEyes ? 14 : 11} fill={cfg.eyeColor} />
                  <ellipse cx={75} cy={106} rx={isWideEyes ? 5 : 4.5} ry={isWideEyes ? 7 : 6} fill="#09090B" />
                  <circle cx={72} cy={102} r="3" fill="#FFFFFF" opacity="0.9" />
                  <circle cx={78} cy={109} r="1.5" fill={cfg.eyeGlow} />
                  <path d={`M 63 ${105 - (isWideEyes ? 14 : 11)} Q 75 ${105 - (isWideEyes ? 17 : 14)} 87 ${105 - (isWideEyes ? 13 : 10)}`} stroke="#111827" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </g>
              )}
            </g>
            <g className="cr-blink" style={{ transformOrigin: '125px 105px', animationDelay: '0.15s' }}>
              {isHappyEyes ? (
                <path d="M 115 107 Q 125 97 135 107" stroke="#1F2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              ) : (
                <g>
                  <ellipse cx={125} cy={105} rx={isWideEyes ? 12 : 10} ry={isWideEyes ? 16 : 13} fill="#FFFFFF" />
                  <ellipse cx={125} cy={106} rx={isWideEyes ? 10 : 8} ry={isWideEyes ? 14 : 11} fill={cfg.eyeColor} />
                  <ellipse cx={125} cy={106} rx={isWideEyes ? 5 : 4.5} ry={isWideEyes ? 7 : 6} fill="#09090B" />
                  <circle cx={122} cy={102} r="3" fill="#FFFFFF" opacity="0.9" />
                  <circle cx={128} cy={109} r="1.5" fill={cfg.eyeGlow} />
                  <path d={`M 113 ${105 - (isWideEyes ? 14 : 11)} Q 125 ${105 - (isWideEyes ? 17 : 14)} 137 ${105 - (isWideEyes ? 13 : 10)}`} stroke="#111827" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* Tear drops for sad/teary */}
            {showTears && (
              <g>
                <ellipse cx="63" cy="115" rx="2" ry="3" fill="#38BDF8" opacity="0.7">
                  <animateTransform attributeName="transform" type="translate" values="0 0; 0 35" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="138" cy="118" rx="2" ry="3" fill="#38BDF8" opacity="0.6">
                  <animateTransform attributeName="transform" type="translate" values="0 0; 0 30" dur="2.1s" repeatCount="indefinite" begin="0.4s" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.1s" repeatCount="indefinite" begin="0.4s" />
                </ellipse>
              </g>
            )}

            {/* Sweat drop */}
            {showSweat && (
              <path d="M 145 82 Q 148 90 145 98 Q 142 90 145 82 Z" fill="#67E8F9" opacity="0.7">
                <animateTransform attributeName="transform" type="translate" values="0 0; 0 25" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="1.5s" repeatCount="indefinite" />
              </path>
            )}

            {/* Anger vein */}
            {showVein && (
              <g transform="translate(135, 70)">
                <path d="M 0 0 L 5 5 L 10 0 M 5 5 L 5 10 L 10 5" stroke="#EF4444" strokeWidth="2" fill="none">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="0.6s" repeatCount="indefinite" />
                </path>
              </g>
            )}

            {/* 8. Nose */}
            <ellipse cx="100" cy="125" rx="1.5" ry="1.2" fill="#E2A995" />
            <path d="M 99 123 Q 100 126 101 125" stroke="#C27A68" strokeWidth="1" fill="none" />

            {/* 9. Mouth */}
            {useRoundMouth ? (
              <ellipse cx="100" cy="142" rx={isSpeaking && mouthShape === 4 ? 8 : 6} ry={isSpeaking && mouthShape === 4 ? 10 : 9} fill="#881337" stroke="#4C0519" strokeWidth="1.5" />
            ) : (
              <path
                d={mouthPath}
                stroke={expression === 'happy' || expression === 'laughing' ? '#9F1239' : '#881337'}
                strokeWidth="2.5"
                fill={
                  (expression === 'happy' || expression === 'laughing') ? '#F43F5E' :
                  (isSpeaking && (mouthShape === 2 || mouthShape === 3)) ? '#BE123C' : 'none'
                }
                strokeLinecap="round"
              />
            )}

            {/* 10. Front Hair with sway */}
            <g className="cr-hair-sway">
              <path
                d="M 50 95 C 45 60 70 40 100 40 C 130 40 155 60 150 95 C 145 75 130 65 115 75 C 105 85 95 85 85 75 C 70 65 55 75 50 95 Z"
                fill={`url(#hg-${instanceId})`}
              />
              <path d="M 65 62 Q 100 50 135 62" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.45" />
            </g>

            {/* Character-specific accessories */}
            {normId === 'gyanvi' && (
              <g>
                <path d="M 65 170 C 55 175 55 195 65 200" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 135 170 C 145 175 145 195 135 200" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 65 198 Q 100 205 135 198" stroke="#F472B6" strokeWidth="3" fill="none" />
              </g>
            )}
            {normId === 'meera' && (
              <g stroke="#6366F1" strokeWidth="1.8" fill="none">
                <circle cx="75" cy="105" r="11" />
                <circle cx="125" cy="105" r="11" />
                <path d="M 86 105 L 114 105" />
              </g>
            )}
          </g>
        </g>

        {/* Sparkle effect overlay */}
        {showSparkle && (
          <g>
            {[{ x: 40, y: 50 }, { x: 155, y: 60 }, { x: 30, y: 130 }, { x: 165, y: 140 }].map((p, i) => (
              <g key={i} transform={`translate(${p.x}, ${p.y})`}>
                <path d="M 0 -5 L 1.5 -1.5 L 5 0 L 1.5 1.5 L 0 5 L -1.5 1.5 L -5 0 L -1.5 -1.5 Z" fill="#FDE047" opacity="0.8">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur={`${0.8 + i * 0.3}s`} repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="rotate" values="0;180;360" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
                </path>
              </g>
            ))}
          </g>
        )}
      </svg>

      {/* Manga Badge floating on top */}
      {mangaMark && (
        <div className="absolute -top-3 -right-2 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-lg border-2 border-white animate-bounce z-10">
          {mangaMark}
        </div>
      )}

      {/* Exhale puff for relieved reaction */}
      {reaction === 'exhale' && (
        <div className="absolute bottom-[42%] right-[-8px] text-slate-300/60 text-lg font-bold animate-pulse">
          ~
        </div>
      )}
    </div>
  );
};
