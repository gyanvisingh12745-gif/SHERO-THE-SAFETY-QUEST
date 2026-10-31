import React from 'react';
import { CharacterId, CharacterExpression } from '../content/types';

export interface UnifiedAnimeCharacterProps {
  id: CharacterId | string;
  expression: CharacterExpression;
  isSpeaking?: boolean;
  scale?: number;
  flipHorizontal?: boolean;
  className?: string;
  mangaMark?: string;
}

export const UnifiedAnimeCharacter: React.FC<UnifiedAnimeCharacterProps> = ({
  id,
  expression = 'neutral',
  isSpeaking = false,
  scale = 1,
  flipHorizontal = false,
  className = '',
  mangaMark
}) => {
  const normId = (id || 'gyanvi').toLowerCase();

  // Character Color Schemes and Styles
  const charConfigs: Record<string, {
    skin: string;
    shadow: string;
    hair: string;
    hairHighlight: string;
    eyeColor: string;
    eyeGlow: string;
    clothingMain: string;
    clothingAccent: string;
    name: string;
  }> = {
    gyanvi: {
      skin: '#FFF5EB',
      shadow: '#F2D3BE',
      hair: '#261642',
      hairHighlight: '#9D6DE8',
      eyeColor: '#7C3AED',
      eyeGlow: '#C4B5FD',
      clothingMain: '#6D28D9',
      clothingAccent: '#F472B6',
      name: 'Gyanvi'
    },
    aanya: {
      skin: '#FFF8F2',
      shadow: '#EACAB5',
      hair: '#111827',
      hairHighlight: '#22D3EE',
      eyeColor: '#0D9488',
      eyeGlow: '#67E8F9',
      clothingMain: '#0F766E',
      clothingAccent: '#F59E0B',
      name: 'Aanya'
    },
    meera: {
      skin: '#FFF6F0',
      shadow: '#E8C7B0',
      hair: '#1E1B4B',
      hairHighlight: '#818CF8',
      eyeColor: '#4F46E5',
      eyeGlow: '#A5B4FC',
      clothingMain: '#4338CA',
      clothingAccent: '#E0E7FF',
      name: 'Meera'
    },
    riya: {
      skin: '#FFF3E8',
      shadow: '#E5BF9E',
      hair: '#3B1D11',
      hairHighlight: '#FBBF24',
      eyeColor: '#D97706',
      eyeGlow: '#FDE68A',
      clothingMain: '#B45309',
      clothingAccent: '#EF4444',
      name: 'Riya'
    },
    mahima: {
      skin: '#FFF7F5',
      shadow: '#F0D4CE',
      hair: '#381E29',
      hairHighlight: '#F472B6',
      eyeColor: '#DB2777',
      eyeGlow: '#FBCFE8',
      clothingMain: '#BE185D',
      clothingAccent: '#FDE047',
      name: 'Mahima'
    },
    anjali: {
      skin: '#FFF5EE',
      shadow: '#ECCBB5',
      hair: '#1C1917',
      hairHighlight: '#78716C',
      eyeColor: '#059669',
      eyeGlow: '#6EE7B7',
      clothingMain: '#047857',
      clothingAccent: '#FCD34D',
      name: 'Anjali Didi'
    },
    rohan: {
      skin: '#FFF2EA',
      shadow: '#E4BF9F',
      hair: '#18181B',
      hairHighlight: '#71717A',
      eyeColor: '#3F3F46',
      eyeGlow: '#A1A1AA',
      clothingMain: '#1E293B',
      clothingAccent: '#38BDF8',
      name: 'Rohan'
    },
    sunita_aunty: {
      skin: '#FBF1E6',
      shadow: '#DFC3A4',
      hair: '#27272A',
      hairHighlight: '#A1A1AA',
      eyeColor: '#451A03',
      eyeGlow: '#D97706',
      clothingMain: '#7C2D12',
      clothingAccent: '#F59E0B',
      name: 'Sunita Aunty'
    },
    counselor_priya: {
      skin: '#FFF6F0',
      shadow: '#E8C6AE',
      hair: '#1E293B',
      hairHighlight: '#38BDF8',
      eyeColor: '#0284C7',
      eyeGlow: '#7DD3FC',
      clothingMain: '#0F172A',
      clothingAccent: '#38BDF8',
      name: 'Counsellor Priya'
    },
    stranger: {
      skin: '#FFF0E5',
      shadow: '#DBB594',
      hair: '#09090B',
      hairHighlight: '#52525B',
      eyeColor: '#991B1B',
      eyeGlow: '#F87171',
      clothingMain: '#18181B',
      clothingAccent: '#DC2626',
      name: 'Stranger'
    },
    cab_driver: {
      skin: '#F5E6D3',
      shadow: '#CCA884',
      hair: '#1C1917',
      hairHighlight: '#78716C',
      eyeColor: '#451A03',
      eyeGlow: '#B45309',
      clothingMain: '#374151',
      clothingAccent: '#FBBF24',
      name: 'Driver'
    },
    shopkeeper: {
      skin: '#F5E6D3',
      shadow: '#CCA884',
      hair: '#292524',
      hairHighlight: '#A8A29E',
      eyeColor: '#57534E',
      eyeGlow: '#D6D3D1',
      clothingMain: '#854D0E',
      clothingAccent: '#FEF08A',
      name: 'Shopkeeper'
    },
    guard: {
      skin: '#F5E6D3',
      shadow: '#CCA884',
      hair: '#18181B',
      hairHighlight: '#52525B',
      eyeColor: '#3B82F6',
      eyeGlow: '#93C5FD',
      clothingMain: '#1E3A8A',
      clothingAccent: '#F59E0B',
      name: 'Guard'
    },
    auto_driver: {
      skin: '#EED9C4',
      shadow: '#C29C74',
      hair: '#1C1917',
      hairHighlight: '#57534E',
      eyeColor: '#451A03',
      eyeGlow: '#D97706',
      clothingMain: '#D97706',
      clothingAccent: '#16A34A',
      name: 'Auto Driver'
    },
    fake_recruiter: {
      skin: '#FFF6F0',
      shadow: '#E8C7AE',
      hair: '#0F172A',
      hairHighlight: '#64748B',
      eyeColor: '#475569',
      eyeGlow: '#CBD5E1',
      clothingMain: '#0F172A',
      clothingAccent: '#60A5FA',
      name: 'Recruiter'
    },
    stalker_ex: {
      skin: '#EAE1D8',
      shadow: '#BDB1A4',
      hair: '#09090B',
      hairHighlight: '#3F3F46',
      eyeColor: '#7F1D1D',
      eyeGlow: '#EF4444',
      clothingMain: '#18181B',
      clothingAccent: '#7F1D1D',
      name: 'Stalker'
    },
    scammer: {
      skin: '#CBD5E1',
      shadow: '#94A3B8',
      hair: '#0F172A',
      hairHighlight: '#38BDF8',
      eyeColor: '#0EA5E9',
      eyeGlow: '#38BDF8',
      clothingMain: '#020617',
      clothingAccent: '#06B6D4',
      name: 'Blackmailer'
    }
  };

  const cfg = charConfigs[normId] || charConfigs.gyanvi;

  // Eyebrow and eye positioning based on 14 expressions
  const getEyebrowPath = (side: 'left' | 'right') => {
    const isLeft = side === 'left';
    switch (expression) {
      case 'angry':
      case 'annoyed':
        return isLeft ? 'M 62 82 Q 78 88 90 92' : 'M 110 92 Q 122 88 138 82';
      case 'scared':
      case 'shocked':
        return isLeft ? 'M 60 75 Q 75 70 88 78' : 'M 112 78 Q 125 70 140 75';
      case 'sad':
      case 'nervous':
        return isLeft ? 'M 62 88 Q 76 80 88 84' : 'M 112 84 Q 124 80 138 88';
      case 'happy':
      case 'laughing':
      case 'hopeful':
      case 'relieved':
        return isLeft ? 'M 62 82 Q 75 75 88 82' : 'M 112 82 Q 125 75 138 82';
      case 'determined':
        return isLeft ? 'M 62 84 L 88 88' : 'M 112 88 L 138 84';
      case 'thinking':
        return isLeft ? 'M 62 80 Q 75 76 88 80' : 'M 112 85 Q 125 88 138 85';
      default:
        return isLeft ? 'M 62 82 Q 75 78 88 82' : 'M 112 82 Q 125 78 138 82';
    }
  };

  // Mouth path depending on talking state and expression
  const getMouthElement = () => {
    if (isSpeaking) {
      return (
        <path
          d="M 90 140 Q 100 154 110 140 Z"
          fill="#BE123C"
          stroke="#881337"
          strokeWidth="1.5"
          className="animate-pulse"
        />
      );
    }
    switch (expression) {
      case 'happy':
      case 'laughing':
      case 'hopeful':
        return <path d="M 88 138 Q 100 148 112 138" stroke="#9F1239" strokeWidth="2.5" fill="#F43F5E" />;
      case 'shocked':
      case 'scared':
        return <ellipse cx="100" cy="142" rx="6" ry="9" fill="#881337" stroke="#4C0519" strokeWidth="1.5" />;
      case 'sad':
      case 'nervous':
        return <path d="M 90 144 Q 100 138 110 144" stroke="#881337" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      case 'angry':
      case 'annoyed':
        return <path d="M 92 142 L 108 141" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" />;
      case 'relieved':
        return <path d="M 92 140 Q 100 145 108 140" stroke="#9F1239" strokeWidth="2" fill="none" strokeLinecap="round" />;
      case 'determined':
        return <path d="M 93 141 L 107 141" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" />;
      default:
        return <path d="M 92 141 Q 100 144 108 141" stroke="#9F1239" strokeWidth="2" fill="none" strokeLinecap="round" />;
    }
  };

  // Eyes element depending on expression
  const getEyeElement = (side: 'left' | 'right') => {
    const cx = side === 'left' ? 75 : 125;
    const cy = 105;

    if (expression === 'laughing' || expression === 'happy') {
      return (
        <path
          d={`M ${cx - 10} ${cy + 2} Q ${cx} ${cy - 8} ${cx + 10} ${cy + 2}`}
          stroke="#1F2937"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      );
    }

    const isWide = expression === 'shocked' || expression === 'scared';
    const rx = isWide ? 10 : 8;
    const ry = isWide ? 14 : 11;

    return (
      <g>
        {/* Eye White */}
        <ellipse cx={cx} cy={cy} rx={rx + 2} ry={ry + 2} fill="#FFFFFF" />
        {/* Iris */}
        <ellipse cx={cx} cy={cy + 1} rx={rx} ry={ry} fill={cfg.eyeColor} />
        {/* Pupil */}
        <ellipse cx={cx} cy={cy + 1} rx={rx * 0.55} ry={ry * 0.55} fill="#09090B" />
        {/* Anime Star Highlights */}
        <circle cx={cx - 3} cy={cy - 3} r="3" fill="#FFFFFF" opacity="0.9" />
        <circle cx={cx + 3} cy={cy + 4} r="1.5" fill={cfg.eyeGlow} />
        {/* Upper Lash Line */}
        <path
          d={`M ${cx - 13} ${cy - ry} Q ${cx} ${cy - ry - 3} ${cx + 13} ${cy - ry + 1}`}
          stroke="#111827"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    );
  };

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{
        transform: `${flipHorizontal ? 'scaleX(-1)' : ''} scale(${scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <svg
        viewBox="0 0 200 260"
        className="w-full h-auto drop-shadow-2xl overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`skinGrad-${normId}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="40%" stopColor={cfg.skin} />
            <stop offset="100%" stopColor={cfg.shadow} />
          </radialGradient>

          <linearGradient id={`hairGrad-${normId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={cfg.hairHighlight} />
            <stop offset="45%" stopColor={cfg.hair} />
            <stop offset="100%" stopColor="#0B0914" />
          </linearGradient>

          <linearGradient id={`jacketGrad-${normId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={cfg.clothingMain} />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* 1. Behind Hair / Back Volume */}
        <path
          d="M 45 90 C 30 140 30 200 45 240 C 65 245 135 245 155 240 C 170 200 170 140 155 90 Z"
          fill={cfg.hair}
          opacity="0.95"
        />

        {/* 2. Neck and Shoulders */}
        <path d="M 86 145 L 86 175 L 114 175 L 114 145 Z" fill={cfg.shadow} />
        {/* Collarbones / Neck Shadow */}
        <path d="M 88 165 Q 100 175 112 165" stroke={cfg.shadow} strokeWidth="2" fill="none" />

        {/* 3. Clothing Body & Jacket */}
        <path
          d="M 40 260 L 55 185 Q 100 170 145 185 L 160 260 Z"
          fill={`url(#jacketGrad-${normId})`}
        />
        {/* Collar / Lapel */}
        <path
          d="M 75 180 L 100 220 L 125 180 Q 100 190 75 180 Z"
          fill={cfg.clothingAccent}
          opacity="0.9"
        />
        <path d="M 100 220 L 100 260" stroke="#000000" strokeWidth="2" opacity="0.3" />

        {/* 4. Head Base Face Skin */}
        <path
          d="M 56 100 C 56 60 144 60 144 100 C 144 135 125 160 100 165 C 75 160 56 135 56 100 Z"
          fill={`url(#skinGrad-${normId})`}
        />

        {/* 5. Natural Anime Soft Cheek Blush */}
        {(expression === 'happy' || expression === 'laughing' || expression === 'embarrassed' || expression === 'hopeful') && (
          <g opacity="0.6">
            <ellipse cx="68" cy="120" rx="9" ry="5" fill="#FB7185" />
            <ellipse cx="132" cy="120" rx="9" ry="5" fill="#FB7185" />
            <path d="M 64 122 L 67 118 M 68 122 L 71 118 M 128 122 L 131 118 M 132 122 L 135 118" stroke="#E11D48" strokeWidth="1" />
          </g>
        )}

        {/* 6. Eyebrows */}
        <path d={getEyebrowPath('left')} stroke="#1E1B4B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d={getEyebrowPath('right')} stroke="#1E1B4B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* 7. Eyes */}
        {getEyeElement('left')}
        {getEyeElement('right')}

        {/* 8. Small Cute Button Nose */}
        <ellipse cx="100" cy="125" rx="1.5" ry="1.2" fill="#E2A995" />
        <path d="M 99 123 Q 100 126 101 125" stroke="#C27A68" strokeWidth="1" fill="none" />

        {/* 9. Expressive Mouth */}
        {getMouthElement()}

        {/* 10. Front Hair Bangs and Styling */}
        <path
          d="M 50 95 C 45 60 70 40 100 40 C 130 40 155 60 150 95 C 145 75 130 65 115 75 C 105 85 95 85 85 75 C 70 65 55 75 50 95 Z"
          fill={`url(#hairGrad-${normId})`}
        />
        {/* Hair shine band across top */}
        <path
          d="M 65 62 Q 100 50 135 62"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Character-specific signature accessories */}
        {normId === 'gyanvi' && (
          /* Pink headphones resting on neck */
          <g>
            <path d="M 65 170 C 55 175 55 195 65 200" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 135 170 C 145 175 145 195 135 200" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 65 198 Q 100 205 135 198" stroke="#F472B6" strokeWidth="3" fill="none" />
          </g>
        )}
        {normId === 'meera' && (
          /* Round smart glasses */
          <g stroke="#6366F1" strokeWidth="1.8" fill="none">
            <circle cx="75" cy="105" r="11" />
            <circle cx="125" cy="105" r="11" />
            <path d="M 86 105 L 114 105" />
          </g>
        )}
      </svg>

      {/* Manga Emotion Badges floating on top */}
      {mangaMark && (
        <div className="absolute -top-3 -right-2 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-lg border-2 border-white animate-bounce">
          {mangaMark}
        </div>
      )}
    </div>
  );
};
