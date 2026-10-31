import React from 'react';

export type StrangerType =
  | 'cap_hoodie'
  | 'bearded'
  | 'sunglasses'
  | 'haruto_date'
  | 'haruto_controlling'
  | 'inlaw_relative'
  | 'friend_priya'
  | 'counselor';

export interface StrangerPortraitProps {
  type?: StrangerType;
  speakerName?: string;
  size?: number;
  isTalking?: boolean;
  className?: string;
}

/**
 * Animated Graphic-Novel Style NPC & Stranger Portrait Component
 * Includes:
 * 1. Street strangers: 'cap_hoodie', 'bearded', 'sunglasses'
 * 2. Haruto (Date): Young handsome anime man in red jacket & cap, subtle blush, gentle/shy expression
 * 3. Haruto (Controlling): Darkened brow, furrowed scowl, tense crossed aura
 * 4. In-Law / Relative: Traditional elder relative, scrutinizing gaze, stern bun
 * 5. Friend Priya: Supportive best friend, warm eyes, ponytail, caring demeanor
 * 6. Counselor: Empathetic professional counselor / advocate, composed and reassuring
 */
export const StrangerPortrait: React.FC<StrangerPortraitProps> = ({
  type = 'cap_hoodie',
  speakerName = 'Stranger',
  size = 220,
  isTalking = false,
  className = ''
}) => {
  // Infer type based on speaker name if not explicitly set
  let resolvedType: StrangerType = type;
  const lowerName = speakerName.toLowerCase();

  if (lowerName.includes('haruto') || lowerName.includes('partner') || lowerName.includes('boyfriend') || lowerName.includes('husband')) {
    if (lowerName.includes('controlling') || lowerName.includes('angry') || lowerName.includes('breaking')) {
      resolvedType = 'haruto_controlling';
    } else {
      resolvedType = 'haruto_date';
    }
  } else if (lowerName.includes('priya') || lowerName.includes('friend')) {
    resolvedType = 'friend_priya';
  } else if (lowerName.includes('mother-in-law') || lowerName.includes('in-law') || lowerName.includes('relative') || lowerName.includes('elder') || lowerName.includes('aunt')) {
    resolvedType = 'inlaw_relative';
  } else if (lowerName.includes('counselor') || lowerName.includes('advocate') || lowerName.includes('officer') || lowerName.includes('legal') || lowerName.includes('director')) {
    resolvedType = 'counselor';
  } else if (lowerName.includes('driver') || lowerName.includes('clerk') || lowerName.includes('staff')) {
    resolvedType = 'bearded';
  } else if (lowerName.includes('shadow') || lowerName.includes('sunglass') || lowerName.includes('man in')) {
    resolvedType = 'sunglasses';
  }

  const idSuffix = `${resolvedType}-${Math.floor(size)}`;

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ width: size, height: size * 1.15 }}
    >
      <svg
        viewBox="0 0 200 230"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Shading gradients */}
          <linearGradient id={`strangerSkin-${idSuffix}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF1E6" />
            <stop offset="60%" stopColor="#F5D0B5" />
            <stop offset="100%" stopColor="#E2AC8A" />
          </linearGradient>

          <linearGradient id={`strangerShadow-${idSuffix}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B37252" />
            <stop offset="100%" stopColor="#8C4E32" />
          </linearGradient>

          <linearGradient id={`jacketRed-${idSuffix}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="50%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>

          <linearGradient id={`jacketDark-${idSuffix}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2A303C" />
            <stop offset="50%" stopColor="#1E232A" />
            <stop offset="100%" stopColor="#13171C" />
          </linearGradient>

          <linearGradient id={`capGrad-${idSuffix}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id={`priyaHair-${idSuffix}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="70%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#291203" />
          </linearGradient>

          {/* SVG Keyframe animations */}
          <style>{`
            @keyframes strangerBreathe {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-2px); }
            }
            @keyframes strangerBlink {
              0%, 92%, 100% { transform: scaleY(1); }
              96% { transform: scaleY(0.1); }
            }
            @keyframes strangerTalk {
              0%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(1.7) translateY(-0.5px); }
            }
            .stranger-breathe {
              animation: strangerBreathe 4.5s ease-in-out infinite;
              transform-origin: 100px 180px;
            }
            .stranger-eye {
              animation: strangerBlink 5.2s ease-in-out infinite;
              transform-origin: 100px 92px;
            }
            .stranger-mouth-talking {
              animation: strangerTalk 0.28s ease-in-out infinite alternate;
              transform-origin: 100px 126px;
            }
          `}</style>
        </defs>

        <g className="stranger-breathe">
          {/* ========================================================= */}
          {/* 1. STRANGER VARIANT A: Baseball Cap + Hoodie (M1/M2)       */}
          {/* ========================================================= */}
          {resolvedType === 'cap_hoodie' && (
            <g id="variant-cap-hoodie">
              <path
                d="M 28 230 C 30 190 52 165 74 156 L 82 188 L 118 188 L 126 156 C 148 165 170 190 172 230 Z"
                fill={`url(#jacketDark-${idSuffix})`}
                stroke="#090D14"
                strokeWidth="2.5"
              />
              <path d="M 80 156 L 90 200 L 100 175 L 110 200 L 120 156 Z" fill="#2563EB" opacity="0.8" />
              <path d="M 86 130 L 86 165 C 93 170 107 170 114 165 L 114 130 Z" fill={`url(#strangerShadow-${idSuffix})`} />
              <path
                d="M 68 88 C 66 122 80 148 100 152 C 120 148 134 122 132 88 C 132 54 68 54 68 88 Z"
                fill={`url(#strangerSkin-${idSuffix})`}
                stroke="#6B3419"
                strokeWidth="1.2"
              />
              <ellipse cx="66" cy="98" rx="6" ry="11" fill={`url(#strangerSkin-${idSuffix})`} stroke="#6B3419" strokeWidth="1" />
              <ellipse cx="134" cy="98" rx="6" ry="11" fill={`url(#strangerSkin-${idSuffix})`} stroke="#6B3419" strokeWidth="1" />

              <g className="stranger-eye">
                <path d="M 75 83 Q 86 80 94 86" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M 125 83 Q 114 80 106 86" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M 77 91 Q 85 87 93 92 Q 85 96 77 91 Z" fill="#F8FAFC" stroke="#334155" strokeWidth="0.8" />
                <path d="M 123 91 Q 115 87 107 92 Q 115 96 123 91 Z" fill="#F8FAFC" stroke="#334155" strokeWidth="0.8" />
                <circle cx="87" cy="91.5" r="3.2" fill="#1E293B" />
                <circle cx="113" cy="91.5" r="3.2" fill="#1E293B" />
              </g>

              <path d="M 100 87 L 97 105 L 103 107 L 105 105" stroke="#9A3412" strokeWidth="1.2" fill="none" />
              <g className={isTalking ? 'stranger-mouth-talking' : ''}>
                {isTalking ? (
                  <ellipse cx="102" cy="125" rx="5" ry="3" fill="#451A03" stroke="#9A3412" strokeWidth="1" />
                ) : (
                  <path d="M 94 125 Q 102 127 109 123" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
                )}
              </g>

              {/* Baseball Cap */}
              <path d="M 64 64 C 64 36 80 26 100 26 C 120 26 136 36 136 64 C 136 70 64 70 64 64 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <path d="M 58 64 C 74 68 126 68 142 64 C 146 72 136 78 100 78 C 64 78 54 72 58 64 Z" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 2. STRANGER VARIANT B: Full Beard + Utility Jacket         */}
          {/* ========================================================= */}
          {resolvedType === 'bearded' && (
            <g id="variant-bearded">
              <path d="M 28 230 C 30 190 52 165 74 156 L 82 188 L 118 188 L 126 156 C 148 165 170 190 172 230 Z" fill="#27272A" stroke="#18181B" strokeWidth="2.5" />
              <path d="M 68 155 L 86 185 L 94 165 Z" fill="#3F3F46" stroke="#18181B" strokeWidth="1.5" />
              <path d="M 132 155 L 114 185 L 106 165 Z" fill="#3F3F46" stroke="#18181B" strokeWidth="1.5" />
              <path d="M 86 130 L 86 165 C 93 170 107 170 114 165 L 114 130 Z" fill={`url(#strangerShadow-${idSuffix})`} />
              <path d="M 68 88 C 66 122 80 148 100 152 C 120 148 134 122 132 88 C 132 54 68 54 68 88 Z" fill={`url(#strangerSkin-${idSuffix})`} stroke="#6B3419" strokeWidth="1.2" />
              <path d="M 62 76 C 58 48 74 24 100 24 C 126 24 142 48 138 76 C 144 65 140 45 130 35 C 118 20 82 20 70 35 C 60 45 56 65 62 76 Z" fill="#18181B" />
              <g className="stranger-eye">
                <path d="M 74 81 Q 85 79 94 84" stroke="#09090B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <path d="M 126 81 Q 115 79 106 84" stroke="#09090B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <circle cx="86" cy="91.5" r="3.2" fill="#3B2516" />
                <circle cx="114" cy="91.5" r="3.2" fill="#3B2516" />
              </g>
              <path d="M 100 84 L 96 106 L 102 108 L 105 106" stroke="#9A3412" strokeWidth="1.4" fill="none" />
              <path d="M 68 106 C 68 138 78 158 100 160 C 122 158 132 138 132 106 C 130 114 125 120 120 118 C 114 116 108 114 100 116 C 92 114 86 116 80 118 C 75 120 70 114 68 106 Z" fill="#1C1917" stroke="#09090B" strokeWidth="1.2" />
              <g className={isTalking ? 'stranger-mouth-talking' : ''}>
                {isTalking ? (
                  <ellipse cx="100" cy="126" rx="6" ry="3.5" fill="#451A03" stroke="#1C1917" strokeWidth="1" />
                ) : (
                  <line x1="94" y1="126" x2="106" y2="126" stroke="#57534E" strokeWidth="2" strokeLinecap="round" />
                )}
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 3. STRANGER VARIANT C: Sunglasses                          */}
          {/* ========================================================= */}
          {resolvedType === 'sunglasses' && (
            <g id="variant-sunglasses">
              <path d="M 28 230 C 30 190 52 165 74 156 L 82 188 L 118 188 L 126 156 C 148 165 170 190 172 230 Z" fill="#18181B" stroke="#09090B" strokeWidth="2.5" />
              <path d="M 68 88 C 66 122 80 148 100 152 C 120 148 134 122 132 88 C 132 54 68 54 68 88 Z" fill={`url(#strangerSkin-${idSuffix})`} stroke="#6B3419" strokeWidth="1.2" />
              <path d="M 60 76 C 58 45 70 26 100 24 C 130 22 144 45 140 76 Z" fill="#1C1917" />
              <g>
                <line x1="93" y1="89" x2="107" y2="89" stroke="#09090B" strokeWidth="2.5" />
                <circle cx="84" cy="91" r="10" fill="#09090B" stroke="#27272A" strokeWidth="2" />
                <circle cx="116" cy="91" r="10" fill="#09090B" stroke="#27272A" strokeWidth="2" />
              </g>
              <g className={isTalking ? 'stranger-mouth-talking' : ''}>
                {isTalking ? (
                  <path d="M 91 123 Q 100 128 109 123 Q 100 129 91 123 Z" fill="#3B1D0E" stroke="#78350F" strokeWidth="1.2" />
                ) : (
                  <path d="M 91 123 Q 100 125 109 123" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                )}
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 4. HARUTO (DATE / ROMANTIC) - Manga Style from reference   */}
          {/* ========================================================= */}
          {resolvedType === 'haruto_date' && (
            <g id="variant-haruto-date">
              {/* Red sports jacket with white zipper collar (matches user's manga image!) */}
              <path
                d="M 28 230 C 30 188 52 165 74 156 L 82 188 L 118 188 L 126 156 C 148 165 170 188 172 230 Z"
                fill={`url(#jacketRed-${idSuffix})`}
                stroke="#7F1D1D"
                strokeWidth="2.5"
              />
              {/* White undershirt / zipper strip */}
              <path d="M 96 156 L 96 220 L 104 220 L 104 156 Z" fill="#FFFFFF" />
              <path d="M 82 156 L 96 180 L 104 180 L 118 156 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />

              {/* Neck */}
              <path d="M 88 130 L 88 162 C 94 167 106 167 112 162 L 112 130 Z" fill={`url(#strangerShadow-${idSuffix})`} />

              {/* Young Anime Face with cute jawline */}
              <path
                d="M 70 88 C 68 118 80 144 100 148 C 120 144 132 118 130 88 C 130 58 70 58 70 88 Z"
                fill={`url(#strangerSkin-${idSuffix})`}
                stroke="#C2410C"
                strokeWidth="1.2"
              />

              {/* Soft Anime Blush Markings on Cheeks (from user's manga panel!) */}
              <ellipse cx="80" cy="108" rx="8" ry="4" fill="#F87171" opacity="0.55" />
              <ellipse cx="120" cy="108" rx="8" ry="4" fill="#F87171" opacity="0.55" />
              <line x1="77" y1="106" x2="83" y2="110" stroke="#EF4444" strokeWidth="1.2" opacity="0.7" />
              <line x1="117" y1="106" x2="123" y2="110" stroke="#EF4444" strokeWidth="1.2" opacity="0.7" />

              {/* Ears */}
              <ellipse cx="68" cy="98" rx="5" ry="9" fill={`url(#strangerSkin-${idSuffix})`} stroke="#C2410C" strokeWidth="1" />
              <ellipse cx="132" cy="98" rx="5" ry="9" fill={`url(#strangerSkin-${idSuffix})`} stroke="#C2410C" strokeWidth="1" />

              {/* Dark Anime Hair Locks under cap */}
              <path d="M 68 84 C 64 68 72 52 82 48 L 78 72 Z" fill="#0F172A" />
              <path d="M 132 84 C 136 68 128 52 118 48 L 122 72 Z" fill="#0F172A" />
              <path d="M 85 70 Q 94 84 92 68 Q 104 85 106 68 Q 115 82 118 68" stroke="#0F172A" strokeWidth="4.5" fill="none" strokeLinecap="round" />

              {/* Expressive Anime Eyes (gentle, slightly flustered) */}
              <g className="stranger-eye">
                {/* Eyebrows */}
                <path d="M 76 81 Q 86 78 95 83" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                <path d="M 124 81 Q 114 78 105 83" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" fill="none" />

                <path d="M 78 89 Q 86 85 94 89 Q 86 94 78 89 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="0.8" />
                <path d="M 122 89 Q 114 85 106 89 Q 114 94 122 89 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="0.8" />

                {/* Blue/Slate Anime Irises */}
                <circle cx="87" cy="89" r="3.2" fill="#2563EB" />
                <circle cx="87" cy="89" r="1.6" fill="#0F172A" />
                <circle cx="88" cy="88" r="0.9" fill="#FFFFFF" />

                <circle cx="113" cy="89" r="3.2" fill="#2563EB" />
                <circle cx="113" cy="89" r="1.6" fill="#0F172A" />
                <circle cx="114" cy="88" r="0.9" fill="#FFFFFF" />
              </g>

              {/* Cute Anime Nose */}
              <path d="M 100 88 L 98 102 L 102 103" stroke="#EA580C" strokeWidth="1.2" fill="none" strokeLinecap="round" />

              {/* Shy / Smiling Anime Mouth */}
              <g className={isTalking ? 'stranger-mouth-talking' : ''}>
                {isTalking ? (
                  <ellipse cx="100" cy="120" rx="4.5" ry="3" fill="#BE123C" stroke="#881337" strokeWidth="1" />
                ) : (
                  <path d="M 95 120 Q 100 124 105 120" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" fill="none" />
                )}
              </g>

              {/* White/Light Beige Baseball Cap (as shown in user's manga) */}
              <path
                d="M 64 62 C 64 34 80 24 100 24 C 120 24 136 34 136 62 C 136 68 64 68 64 62 Z"
                fill={`url(#capGrad-${idSuffix})`}
                stroke="#64748B"
                strokeWidth="1.8"
              />
              <path
                d="M 58 62 C 74 66 126 66 142 62 C 146 70 136 76 100 76 C 64 76 54 70 58 62 Z"
                fill="#E2E8F0"
                stroke="#64748B"
                strokeWidth="1.6"
              />
            </g>
          )}

          {/* ========================================================= */}
          {/* 5. HARUTO (CONTROLLING / STERN) - Shadowed brow, tense    */}
          {/* ========================================================= */}
          {resolvedType === 'haruto_controlling' && (
            <g id="variant-haruto-controlling">
              {/* Dark Charcoal / Deep Maroon Jacket */}
              <path
                d="M 28 230 C 30 188 52 165 74 156 L 82 188 L 118 188 L 126 156 C 148 165 170 188 172 230 Z"
                fill="#450A0A"
                stroke="#1C1917"
                strokeWidth="2.5"
              />
              <path d="M 88 130 L 88 162 C 94 167 106 167 112 162 L 112 130 Z" fill={`url(#strangerShadow-${idSuffix})`} />

              {/* Face with tense jawline */}
              <path
                d="M 70 88 C 68 118 80 144 100 148 C 120 144 132 118 130 88 C 130 58 70 58 70 88 Z"
                fill={`url(#strangerSkin-${idSuffix})`}
                stroke="#7F1D1D"
                strokeWidth="1.2"
              />

              {/* Shadow across upper face for dramatic tension */}
              <path d="M 68 64 C 70 84 130 84 132 64 Z" fill="#000000" opacity="0.25" />

              {/* Ears */}
              <ellipse cx="68" cy="98" rx="5" ry="9" fill={`url(#strangerSkin-${idSuffix})`} stroke="#7F1D1D" strokeWidth="1" />
              <ellipse cx="132" cy="98" rx="5" ry="9" fill={`url(#strangerSkin-${idSuffix})`} stroke="#7F1D1D" strokeWidth="1" />

              {/* Hair (messy/tense dark hair) */}
              <path d="M 66 84 C 62 60 72 34 100 32 C 128 34 138 60 134 84 Z" fill="#0F172A" />
              <path d="M 75 52 Q 90 76 88 50 Q 102 78 108 52 Q 118 76 125 54" stroke="#0F172A" strokeWidth="5" fill="none" strokeLinecap="round" />

              {/* Stern, Furrowed Eyebrows & Demanding Gaze */}
              <g className="stranger-eye">
                <path d="M 74 84 L 94 80" stroke="#0F172A" strokeWidth="3.4" strokeLinecap="round" />
                <path d="M 126 84 L 106 80" stroke="#0F172A" strokeWidth="3.4" strokeLinecap="round" />

                <path d="M 78 89 Q 86 86 94 90 Q 86 93 78 89 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="0.8" />
                <path d="M 122 89 Q 114 86 106 90 Q 114 93 122 89 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="0.8" />

                <circle cx="86" cy="89" r="2.8" fill="#1E293B" />
                <circle cx="114" cy="89" r="2.8" fill="#1E293B" />
              </g>

              {/* Scowl / Harsh Mouth Line */}
              <g className={isTalking ? 'stranger-mouth-talking' : ''}>
                {isTalking ? (
                  <path d="M 93 122 Q 100 128 107 122 Q 100 126 93 122 Z" fill="#450A0A" stroke="#7F1D1D" strokeWidth="1.2" />
                ) : (
                  <path d="M 93 124 Q 100 120 107 124" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                )}
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 6. FRIEND PRIYA - Warm, Supportive, Caring Anime Girl      */}
          {/* ========================================================= */}
          {resolvedType === 'friend_priya' && (
            <g id="variant-friend-priya">
              {/* Cozy Mint/Emerald Sweater */}
              <path
                d="M 28 230 C 30 188 52 165 74 156 L 82 188 L 118 188 L 126 156 C 148 165 170 188 172 230 Z"
                fill="#059669"
                stroke="#047857"
                strokeWidth="2.5"
              />
              <path d="M 80 156 Q 100 178 120 156" stroke="#A7F3D0" strokeWidth="4" fill="none" strokeLinecap="round" />

              {/* Neck */}
              <path d="M 88 130 L 88 162 C 94 167 106 167 112 162 L 112 130 Z" fill={`url(#strangerShadow-${idSuffix})`} />

              {/* Cute Anime Face */}
              <path
                d="M 70 88 C 68 118 80 144 100 148 C 120 144 132 118 130 88 C 130 58 70 58 70 88 Z"
                fill={`url(#strangerSkin-${idSuffix})`}
                stroke="#D97706"
                strokeWidth="1.2"
              />

              {/* Warm Soft Cheek Blush */}
              <ellipse cx="78" cy="110" rx="8" ry="4" fill="#F43F5E" opacity="0.4" />
              <ellipse cx="122" cy="110" rx="8" ry="4" fill="#F43F5E" opacity="0.4" />

              {/* Warm Brown Ponytail & Side Bangs */}
              <path d="M 62 82 C 58 45 74 24 100 24 C 126 24 142 45 138 82 Z" fill={`url(#priyaHair-${idSuffix})`} />
              {/* High Side Ponytail */}
              <path d="M 134 50 C 158 50 168 85 152 120 C 145 110 140 85 134 68 Z" fill={`url(#priyaHair-${idSuffix})`} stroke="#451A03" strokeWidth="1" />
              <ellipse cx="134" cy="56" rx="5" ry="7" fill="#F59E0B" />

              {/* Gentle, Empathetic Eyes */}
              <g className="stranger-eye">
                <path d="M 76 80 Q 86 76 94 80" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 124 80 Q 114 76 106 80" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                <path d="M 77 88 Q 85 83 93 88 Q 85 94 77 88 Z" fill="#FFFFFF" stroke="#78350F" strokeWidth="0.8" />
                <path d="M 123 88 Q 115 83 107 88 Q 115 94 123 88 Z" fill="#FFFFFF" stroke="#78350F" strokeWidth="0.8" />

                {/* Warm Amber/Honey Irises */}
                <circle cx="86" cy="88.5" r="3.2" fill="#D97706" />
                <circle cx="86" cy="88.5" r="1.6" fill="#451A03" />
                <circle cx="87" cy="87.5" r="0.9" fill="#FFFFFF" />

                <circle cx="114" cy="88.5" r="3.2" fill="#D97706" />
                <circle cx="114" cy="88.5" r="1.6" fill="#451A03" />
                <circle cx="115" cy="87.5" r="0.9" fill="#FFFFFF" />
              </g>

              {/* Cute Round Glasses */}
              <g>
                <circle cx="86" cy="89" r="9" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
                <circle cx="114" cy="89" r="9" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
                <line x1="95" y1="89" x2="105" y2="89" stroke="#F59E0B" strokeWidth="1.5" />
              </g>

              {/* Supportive Warm Smile */}
              <g className={isTalking ? 'stranger-mouth-talking' : ''}>
                {isTalking ? (
                  <ellipse cx="100" cy="120" rx="4.5" ry="3" fill="#BE123C" stroke="#9F1239" strokeWidth="1" />
                ) : (
                  <path d="M 95 120 Q 100 126 105 120" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" fill="none" />
                )}
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 7. IN-LAW / RELATIVE - Traditional, Scrutinizing           */}
          {/* ========================================================= */}
          {resolvedType === 'inlaw_relative' && (
            <g id="variant-inlaw-relative">
              {/* Traditional Maroon / Purple Shawl / Saree drape */}
              <path
                d="M 28 230 C 30 188 52 165 74 156 L 82 188 L 118 188 L 126 156 C 148 165 170 188 172 230 Z"
                fill="#581C87"
                stroke="#3B0764"
                strokeWidth="2.5"
              />
              <path d="M 65 170 Q 100 195 135 170" stroke="#E9D5FF" strokeWidth="3" fill="none" />

              {/* Mature Face */}
              <path
                d="M 70 88 C 68 118 80 144 100 148 C 120 144 132 118 130 88 C 130 58 70 58 70 88 Z"
                fill={`url(#strangerSkin-${idSuffix})`}
                stroke="#6B21A8"
                strokeWidth="1.2"
              />

              {/* Hair with neat low bun */}
              <circle cx="100" cy="40" r="18" fill="#1E1B4B" />
              <path d="M 64 80 C 60 50 75 35 100 35 C 125 35 140 50 136 80 Z" fill="#1E1B4B" />

              {/* Bindi on forehead */}
              <circle cx="100" cy="72" r="2.2" fill="#DC2626" />

              {/* Scrutinizing eyes with arched eyebrows */}
              <g className="stranger-eye">
                <path d="M 74 78 Q 84 74 94 79" stroke="#1E1B4B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M 126 78 Q 116 74 106 79" stroke="#1E1B4B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <circle cx="86" cy="87" r="2.8" fill="#1E1B4B" />
                <circle cx="114" cy="87" r="2.8" fill="#1E1B4B" />
              </g>

              {/* Tight, strict mouth line */}
              <g className={isTalking ? 'stranger-mouth-talking' : ''}>
                {isTalking ? (
                  <ellipse cx="100" cy="120" rx="4" ry="2.5" fill="#581C87" stroke="#3B0764" strokeWidth="1" />
                ) : (
                  <line x1="94" y1="120" x2="106" y2="120" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />
                )}
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 8. COUNSELOR / ADVOCATE - Composed, Professional           */}
          {/* ========================================================= */}
          {resolvedType === 'counselor' && (
            <g id="variant-counselor">
              {/* Professional Navy Blazer */}
              <path
                d="M 28 230 C 30 188 52 165 74 156 L 82 188 L 118 188 L 126 156 C 148 165 170 188 172 230 Z"
                fill="#1E3A8A"
                stroke="#172554"
                strokeWidth="2.5"
              />
              <path d="M 80 156 L 90 200 L 100 175 L 110 200 L 120 156 Z" fill="#FFFFFF" />

              {/* Calm, confident face */}
              <path
                d="M 70 88 C 68 118 80 144 100 148 C 120 144 132 118 130 88 C 130 58 70 58 70 88 Z"
                fill={`url(#strangerSkin-${idSuffix})`}
                stroke="#1E3A8A"
                strokeWidth="1.2"
              />

              {/* Professional Bob Hairstyle */}
              <path d="M 62 82 C 58 45 74 24 100 24 C 126 24 142 45 138 82 Z" fill="#0F172A" />

              {/* Reassuring Eyes */}
              <g className="stranger-eye">
                <path d="M 76 81 Q 86 78 95 81" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 124 81 Q 114 78 105 81" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <circle cx="86" cy="89" r="3.2" fill="#0369A1" />
                <circle cx="86" cy="89" r="1.5" fill="#0F172A" />
                <circle cx="87" cy="88" r="0.8" fill="#FFFFFF" />

                <circle cx="114" cy="89" r="3.2" fill="#0369A1" />
                <circle cx="114" cy="89" r="1.5" fill="#0F172A" />
                <circle cx="115" cy="88" r="0.8" fill="#FFFFFF" />
              </g>

              {/* Calm, supportive speaking mouth */}
              <g className={isTalking ? 'stranger-mouth-talking' : ''}>
                {isTalking ? (
                  <ellipse cx="100" cy="120" rx="4.5" ry="3" fill="#BE123C" stroke="#881337" strokeWidth="1" />
                ) : (
                  <path d="M 94 120 Q 100 123 106 120" stroke="#881337" strokeWidth="2" strokeLinecap="round" fill="none" />
                )}
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
