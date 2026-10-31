import React from 'react';
import { LightingMood, WeatherEffect } from '../content/types';

export interface UnifiedSceneBackgroundProps {
  backgroundKey: string;
  lighting?: LightingMood;
  weather?: WeatherEffect;
  className?: string;
}

export const UnifiedSceneBackground: React.FC<UnifiedSceneBackgroundProps> = ({
  backgroundKey,
  lighting = 'night_blue',
  weather = 'clear',
  className = ''
}) => {
  // Atmosphere gradient based on lighting mood
  const getLightingFilter = () => {
    switch (lighting) {
      case 'dusk_golden':
        return 'brightness(0.95) saturate(1.2) sepia(0.2)';
      case 'amber_interior':
        return 'brightness(0.92) contrast(1.05) sepia(0.25)';
      case 'market_sunshine':
        return 'brightness(1.05) saturate(1.15)';
      case 'neon_rain':
        return 'brightness(0.85) contrast(1.15) hue-rotate(-10deg)';
      case 'dawn_hope':
        return 'brightness(1.0) saturate(1.1) sepia(0.1)';
      case 'tension_dark':
        return 'brightness(0.75) contrast(1.25) saturate(0.85)';
      case 'night_blue':
      default:
        return 'brightness(0.88) contrast(1.08)';
    }
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      style={{ filter: getLightingFilter() }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. ENVIRONMENT LAYER RENDERER (SVG Scalable High-Res)
      ───────────────────────────────────────────────────────────── */}
      {/* BUS STOP AT NIGHT (A1) */}
      {(backgroundKey === 'bus_stop_night' || backgroundKey === 'bus_stop') && (
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="busSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#050716" />
              <stop offset="40%" stopColor="#0D1333" />
              <stop offset="85%" stopColor="#1B1438" />
              <stop offset="100%" stopColor="#2E1B4D" />
            </linearGradient>
            <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="asphaltRoad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="1920" height="1080" fill="url(#busSky)" />

          {/* Stars & Dust */}
          <g opacity="0.6">
            <circle cx="240" cy="120" r="2" fill="#BAE6FD" />
            <circle cx="580" cy="90" r="1.5" fill="#FDE68A" />
            <circle cx="890" cy="140" r="2" fill="#BAE6FD" />
            <circle cx="1240" cy="70" r="1.5" fill="#FFFFFF" />
            <circle cx="1680" cy="110" r="2" fill="#FDE68A" />
          </g>

          {/* Distant City Skyline Silhouettes */}
          <path
            d="M 0 620 L 120 540 L 180 540 L 220 480 L 320 480 L 340 590 L 460 590 L 520 420 L 640 420 L 680 580 L 820 580 L 880 460 L 980 460 L 1020 620 L 1200 620 L 1240 390 L 1380 390 L 1420 560 L 1580 560 L 1640 470 L 1760 470 L 1820 610 L 1920 610 L 1920 1080 L 0 1080 Z"
            fill="#090D21"
            opacity="0.85"
          />

          {/* Windows Glowing in Towers */}
          <g fill="#FDE047" opacity="0.45">
            <rect x="230" y="500" width="12" height="18" rx="2" />
            <rect x="260" y="520" width="12" height="18" rx="2" />
            <rect x="540" y="450" width="16" height="22" rx="2" />
            <rect x="580" y="480" width="16" height="22" rx="2" />
            <rect x="1260" y="420" width="18" height="24" rx="2" />
            <rect x="1310" y="450" width="18" height="24" rx="2" />
            <rect x="1660" y="500" width="16" height="20" rx="2" />
          </g>

          {/* Road Asphalt */}
          <rect y="720" width="1920" height="360" fill="url(#asphaltRoad)" />
          {/* Curb line */}
          <rect y="705" width="1920" height="18" fill="#374151" />

          {/* Bus Stop Glass Shelter */}
          <g>
            <rect x="740" y="460" width="440" height="250" rx="12" fill="#1E293B" opacity="0.65" stroke="#64748B" strokeWidth="4" />
            <rect x="760" y="480" width="400" height="210" rx="8" fill="#38BDF8" opacity="0.12" />
            {/* Shelter Bench */}
            <rect x="800" y="640" width="320" height="16" rx="4" fill="#92400E" />
            <rect x="830" y="656" width="12" height="50" fill="#334155" />
            <rect x="1080" y="656" width="12" height="50" fill="#334155" />
          </g>

          {/* Streetlight & Warm Amber Glow */}
          <g>
            <path d="M 680 720 L 680 320 Q 680 250 760 250 L 790 250" stroke="#334155" strokeWidth="14" fill="none" strokeLinecap="round" />
            {/* Lamp fixture */}
            <ellipse cx="790" cy="255" rx="22" ry="10" fill="#CBD5E1" />
            {/* Giant radial glow cone */}
            <circle cx="790" cy="260" r="320" fill="url(#lampGlow)" />
            {/* Light cone on ground */}
            <ellipse cx="790" cy="760" rx="240" ry="60" fill="#FEF08A" opacity="0.22" />
          </g>

          {/* Arriving Bus Headlights on the Right */}
          <g opacity="0.8">
            <ellipse cx="1850" cy="740" rx="180" ry="70" fill="#FEF08A" opacity="0.4" />
            <polygon points="1920,710 1550,750 1920,830" fill="#FEF08A" opacity="0.18" />
          </g>
        </svg>
      )}

      {/* CAB RIDE & TRAFFIC (A2) */}
      {(backgroundKey === 'cab_ride' || backgroundKey === 'city_streets') && (
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="cabDusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#4C1D95" />
              <stop offset="85%" stopColor="#BE185D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#cabDusk)" />
          {/* Passing highway bridge & city bokeh lights */}
          <path d="M 0 540 Q 960 480 1920 540 L 1920 1080 L 0 1080 Z" fill="#0B091A" />
          {/* City Bokeh Light Circles */}
          {[120, 340, 520, 780, 1100, 1380, 1620, 1850].map((x, i) => (
            <circle key={i} cx={x} cy={500 + (i % 3) * 40} r={28 + (i % 4) * 8} fill={i % 2 === 0 ? '#F59E0B' : '#EF4444'} opacity="0.4" />
          ))}
          {/* Inside Cab Dashboard Silhouette & Rearview Mirror */}
          <path d="M 0 820 C 600 780 1320 780 1920 820 L 1920 1080 L 0 1080 Z" fill="#090A0F" />
          {/* Rearview mirror */}
          <rect x="880" y="80" width="160" height="50" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="4" />
          <line x1="960" y1="0" x2="960" y2="80" stroke="#334155" strokeWidth="8" />
        </svg>
      )}

      {/* COZY BEDROOM AT NIGHT / CHAT (A3) */}
      {(backgroundKey === 'cozy_bedroom_chat' || backgroundKey === 'room_night') && (
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="roomNight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0A091A" />
              <stop offset="50%" stopColor="#1E1438" />
              <stop offset="100%" stopColor="#14182E" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#roomNight)" />
          {/* Window looking out at night sky */}
          <rect x="1100" y="160" width="650" height="620" rx="16" fill="#030712" stroke="#334155" strokeWidth="12" />
          <line x1="1425" y1="160" x2="1425" y2="780" stroke="#334155" strokeWidth="8" />
          <line x1="1100" y1="470" x2="1750" y2="470" stroke="#334155" strokeWidth="8" />
          {/* Desk with glowing phone reflection */}
          <rect y="780" width="1920" height="300" fill="#18181B" />
          <circle cx="850" cy="880" r="180" fill="#38BDF8" opacity="0.12" />
        </svg>
      )}

      {/* CROWDED BUSTLING MARKET (A4) */}
      {(backgroundKey === 'crowded_market_day' || backgroundKey === 'market') && (
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="marketSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#marketSky)" />
          {/* Street Stalls with striped colorful awnings */}
          <g>
            <path d="M 0 380 L 500 420 L 500 800 L 0 800 Z" fill="#991B1B" />
            <path d="M 0 380 Q 250 420 500 380 L 480 440 L 0 440 Z" fill="#DC2626" />
            {/* Right side stall */}
            <path d="M 1420 420 L 1920 380 L 1920 800 L 1420 800 Z" fill="#15803D" />
            <path d="M 1420 380 Q 1670 420 1920 380 L 1920 440 L 1420 440 Z" fill="#16A34A" />
            {/* Hanging decorative marigold garlands */}
            <path d="M 0 360 Q 250 440 500 360 Q 750 440 1000 360 Q 1250 440 1500 360 Q 1750 440 1920 360" stroke="#F59E0B" strokeWidth="8" strokeDasharray="14,14" fill="none" />
          </g>
          {/* Ground pavement */}
          <rect y="740" width="1920" height="340" fill="#78716C" />
        </svg>
      )}

      {/* LATE NIGHT LIT ROAD & GUARD POST (A5) */}
      {(backgroundKey === 'late_night_road' || backgroundKey === 'the_alley') && (
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="alleyNight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#05050C" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#alleyNight)" />
          {/* Shuttered shop fronts on both sides */}
          <rect x="0" y="380" width="450" height="420" fill="#1E293B" stroke="#334155" strokeWidth="6" />
          <rect x="1470" y="380" width="450" height="420" fill="#1E293B" stroke="#334155" strokeWidth="6" />
          {/* Road in center with streetlamp perspective */}
          <polygon points="450,800 1470,800 1920,1080 0,1080" fill="#0F172A" />
          {/* Guard Cabin with light on right */}
          <rect x="1350" y="580" width="160" height="220" rx="8" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="4" />
          <rect x="1370" y="610" width="70" height="70" rx="4" fill="#FEF08A" opacity="0.8" />
        </svg>
      )}

      {/* CAFE & CORPORATE (A6 & B1) */}
      {(backgroundKey === 'cafe_terrace' || backgroundKey === 'cafe_job_interview') && (
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="cafeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#18181B" />
              <stop offset="50%" stopColor="#292524" />
              <stop offset="100%" stopColor="#44403C" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#cafeGrad)" />
          {/* Large glass wall looking out at sunny terrace */}
          <rect x="180" y="100" width="1560" height="660" rx="16" fill="#1E293B" stroke="#78716C" strokeWidth="12" />
          {/* Cafe Wood Table Foreground */}
          <path d="M 0 800 C 600 760 1320 760 1920 800 L 1920 1080 L 0 1080 Z" fill="#78350F" />
          <ellipse cx="960" cy="810" rx="80" ry="16" fill="#FEF3C7" opacity="0.3" />
        </svg>
      )}

      {/* APARTMENT LIVING ROOM (B2, B3, B5, B6) */}
      {(backgroundKey === 'cozy_apartment' || backgroundKey === 'apartment_living_room') && (
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="aptGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1C1917" />
              <stop offset="50%" stopColor="#2E1020" />
              <stop offset="100%" stopColor="#1C1917" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#aptGrad)" />
          {/* Wallpaper pattern with warm damask feel */}
          {/* Sofa back & Balcony door */}
          <rect x="1200" y="140" width="550" height="660" rx="12" fill="#0A0814" stroke="#44403C" strokeWidth="10" />
          {/* Living room floor rug */}
          <ellipse cx="960" cy="880" rx="720" ry="180" fill="#991B1B" opacity="0.45" stroke="#F59E0B" strokeWidth="4" />
        </svg>
      )}

      {/* COUNSELING / SUPPORT / LEGAL AID (B4 & General Help) */}
      {(backgroundKey === 'support_office' || backgroundKey === 'support_counseling_office') && (
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="officeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0C1527" />
              <stop offset="50%" stopColor="#13233F" />
              <stop offset="100%" stopColor="#0B1324" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#officeGrad)" />
          {/* Bookshelf on left */}
          <rect x="120" y="160" width="280" height="620" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="8" />
          {/* Supportive posters on wall */}
          <rect x="700" y="160" width="260" height="340" rx="8" fill="#F8FAFC" opacity="0.85" />
          <text x="830" y="260" textAnchor="middle" fill="#0F172A" fontSize="24" fontWeight="bold">181 HELPLINE</text>
          <text x="830" y="300" textAnchor="middle" fill="#0284C7" fontSize="16" fontWeight="bold">Confidential Support</text>
          {/* Potted Indoor plant on right */}
          <ellipse cx="1650" cy="740" rx="36" ry="14" fill="#78350F" />
          <path d="M 1650 740 Q 1620 620 1590 580 Q 1650 630 1670 560 Q 1680 640 1720 590" stroke="#15803D" strokeWidth="12" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. LIVING WEATHER PARTICLES (Rain, dust, night bokeh)
      ───────────────────────────────────────────────────────────── */}
      {weather === 'light_rain' && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full">
            {[...Array(30)].map((_, i) => (
              <line
                key={i}
                x1={`${(i * 3.3) % 100}%`}
                y1="0"
                x2={`${(i * 3.3 + 2) % 100}%`}
                y2="100%"
                stroke="#67E8F9"
                strokeWidth="1.2"
                opacity="0.6"
              />
            ))}
          </svg>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. CINEMATIC VIGNETTE & MOOD OVERLAY
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
};
