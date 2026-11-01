import React, { useState, useEffect } from 'react';
import { LightingMood, WeatherEffect } from '../content/types';

export interface UnifiedSceneBackgroundProps {
  backgroundKey: string;
  lighting?: LightingMood;
  weather?: WeatherEffect;
  className?: string;
}

interface BackgroundAssetMeta {
  webpSrc: string;
  pngFallback: string;
  srcset: string;
  fallbackGradient: string;
}

const BACKGROUND_REGISTRY: Record<string, BackgroundAssetMeta> = {
  bus_stop_night: {
    webpSrc: '/assets/bg/bus_stop_dusk.webp',
    pngFallback: '/assets/bg/bus_stop_dusk.png',
    srcset: '/assets/bg/bus_stop_dusk-640.webp 640w, /assets/bg/bus_stop_dusk-960.webp 960w, /assets/bg/bus_stop_dusk-1280.webp 1280w, /assets/bg/bus_stop_dusk-1920.webp 1920w, /assets/bg/bus_stop_dusk.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #050716 0%, #0D1333 40%, #1B1438 85%, #2E1B4D 100%)'
  },
  bus_stop: {
    webpSrc: '/assets/bg/bus_stop_dusk.webp',
    pngFallback: '/assets/bg/bus_stop_dusk.png',
    srcset: '/assets/bg/bus_stop_dusk-640.webp 640w, /assets/bg/bus_stop_dusk-960.webp 960w, /assets/bg/bus_stop_dusk-1280.webp 1280w, /assets/bg/bus_stop_dusk-1920.webp 1920w, /assets/bg/bus_stop_dusk.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #050716 0%, #0D1333 40%, #1B1438 85%, #2E1B4D 100%)'
  },
  cab_ride: {
    webpSrc: '/assets/bg/cab_ride.webp',
    pngFallback: '/assets/bg/cab_ride.png',
    srcset: '/assets/bg/cab_ride-640.webp 640w, /assets/bg/cab_ride-960.webp 960w, /assets/bg/cab_ride-1280.webp 1280w, /assets/bg/cab_ride-1920.webp 1920w, /assets/bg/cab_ride.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #0D1117 0%, #161B22 50%, #090D16 100%)'
  },
  crowded_market_day: {
    webpSrc: '/assets/bg/crowded_market.webp',
    pngFallback: '/assets/bg/crowded_market.png',
    srcset: '/assets/bg/crowded_market-640.webp 640w, /assets/bg/crowded_market-960.webp 960w, /assets/bg/crowded_market-1280.webp 1280w, /assets/bg/crowded_market-1920.webp 1920w, /assets/bg/crowded_market.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #2D1500 0%, #5E2605 50%, #1E0B02 100%)'
  },
  market: {
    webpSrc: '/assets/bg/crowded_market.webp',
    pngFallback: '/assets/bg/crowded_market.png',
    srcset: '/assets/bg/crowded_market-640.webp 640w, /assets/bg/crowded_market-960.webp 960w, /assets/bg/crowded_market-1280.webp 1280w, /assets/bg/crowded_market-1920.webp 1920w, /assets/bg/crowded_market.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #2D1500 0%, #5E2605 50%, #1E0B02 100%)'
  },
  late_night_road: {
    webpSrc: '/assets/bg/night_pharmacy.webp',
    pngFallback: '/assets/bg/night_pharmacy.png',
    srcset: '/assets/bg/night_pharmacy-640.webp 640w, /assets/bg/night_pharmacy-960.webp 960w, /assets/bg/night_pharmacy-1280.webp 1280w, /assets/bg/night_pharmacy-1920.webp 1920w, /assets/bg/night_pharmacy.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #030712 0%, #0F172A 60%, #042F2E 100%)'
  },
  campus_fest: {
    webpSrc: '/assets/bg/campus_fest.webp',
    pngFallback: '/assets/bg/campus_fest.png',
    srcset: '/assets/bg/campus_fest-640.webp 640w, /assets/bg/campus_fest-960.webp 960w, /assets/bg/campus_fest-1280.webp 1280w, /assets/bg/campus_fest-1920.webp 1920w, /assets/bg/campus_fest.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #1C0A35 0%, #3B1261 50%, #110524 100%)'
  },
  support_office: {
    webpSrc: '/assets/bg/sakhi_centre.webp',
    pngFallback: '/assets/bg/sakhi_centre.png',
    srcset: '/assets/bg/sakhi_centre-640.webp 640w, /assets/bg/sakhi_centre-960.webp 960w, /assets/bg/sakhi_centre-1280.webp 1280w, /assets/bg/sakhi_centre-1920.webp 1920w, /assets/bg/sakhi_centre.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #1E1B18 0%, #3A3228 50%, #181512 100%)'
  },
  support_counseling_office: {
    webpSrc: '/assets/bg/sakhi_centre.webp',
    pngFallback: '/assets/bg/sakhi_centre.png',
    srcset: '/assets/bg/sakhi_centre-640.webp 640w, /assets/bg/sakhi_centre-960.webp 960w, /assets/bg/sakhi_centre-1280.webp 1280w, /assets/bg/sakhi_centre-1920.webp 1920w, /assets/bg/sakhi_centre.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #1E1B18 0%, #3A3228 50%, #181512 100%)'
  },
  legal_aid_office: {
    webpSrc: '/assets/bg/legal_aid_office.webp',
    pngFallback: '/assets/bg/legal_aid_office.png',
    srcset: '/assets/bg/legal_aid_office-640.webp 640w, /assets/bg/legal_aid_office-960.webp 960w, /assets/bg/legal_aid_office-1280.webp 1280w, /assets/bg/legal_aid_office-1920.webp 1920w, /assets/bg/legal_aid_office.webp 2560w',
    fallbackGradient: 'linear-gradient(180deg, #0C1527 0%, #1E293B 50%, #0A0F1D 100%)'
  }
};

const DEFAULT_SKYLINE_GRADIENT =
  'linear-gradient(180deg, #0A081D 0%, #1E1238 40%, #2A1744 75%, #180D2D 100%)';

export const UnifiedSceneBackground: React.FC<UnifiedSceneBackgroundProps> = ({
  backgroundKey,
  lighting = 'night_blue',
  weather = 'clear',
  className = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const assetMeta = BACKGROUND_REGISTRY[backgroundKey];

  // Pre-decode image asynchronously
  useEffect(() => {
    setImageLoaded(false);
    setImageFailed(false);

    if (assetMeta && typeof window !== 'undefined') {
      const img = new Image();
      img.src = assetMeta.webpSrc;
      if (img.decode) {
        img
          .decode()
          .then(() => setImageLoaded(true))
          .catch(() => {
            // Fallback to PNG or vector background
            img.src = assetMeta.pngFallback;
            img
              .decode()
              .then(() => setImageLoaded(true))
              .catch(() => setImageFailed(true));
          });
      } else {
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageFailed(true);
      }
    }
  }, [backgroundKey, assetMeta]);

  // Lighting mood filter
  const getLightingFilter = () => {
    switch (lighting) {
      case 'dusk_golden':
        return 'brightness(0.96) saturate(1.18) sepia(0.15)';
      case 'amber_interior':
        return 'brightness(0.95) contrast(1.05) sepia(0.2)';
      case 'market_sunshine':
        return 'brightness(1.04) saturate(1.12)';
      case 'neon_rain':
        return 'brightness(0.88) contrast(1.15) hue-rotate(-8deg)';
      case 'dawn_hope':
        return 'brightness(1.02) saturate(1.08) sepia(0.08)';
      case 'tension_dark':
        return 'brightness(0.78) contrast(1.22) saturate(0.85)';
      case 'night_blue':
      default:
        return 'brightness(0.92) contrast(1.06)';
    }
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      style={{
        background: assetMeta?.fallbackGradient || DEFAULT_SKYLINE_GRADIENT,
        filter: getLightingFilter()
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. PERMANENT STYLIZED ANIME VECTOR SKYLINE FALLBACK
          Guarantees the screen is NEVER black or blank.
      ───────────────────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      >
        <defs>
          <linearGradient id="fallbackSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B091E" />
            <stop offset="45%" stopColor="#20133F" />
            <stop offset="85%" stopColor="#3B1854" />
            <stop offset="100%" stopColor="#1E0B2B" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#fallbackSky)" />
        {/* Distant skyline buildings */}
        <path
          d="M 0 650 L 80 580 L 160 580 L 220 500 L 320 500 L 380 620 L 520 440 L 640 440 L 720 600 L 880 480 L 1020 640 L 1220 420 L 1360 420 L 1440 580 L 1640 480 L 1800 620 L 1920 620 L 1920 1080 L 0 1080 Z"
          fill="#110920"
          opacity="0.8"
        />
        {/* Glowing windows */}
        <g fill="#FDE047" opacity="0.4">
          <rect x="240" y="520" width="12" height="16" rx="2" />
          <rect x="540" y="470" width="16" height="20" rx="2" />
          <rect x="1240" y="450" width="16" height="22" rx="2" />
        </g>
      </svg>

      {/* ─────────────────────────────────────────────────────────────
          2. HIGH-RES RASTER LAYER (SRCSET + AWAIT DECODE)
      ───────────────────────────────────────────────────────────── */}
      {assetMeta && !imageFailed && (
        <picture
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source srcSet={assetMeta.srcset} type="image/webp" />
          <img
            src={assetMeta.pngFallback}
            alt={backgroundKey}
            className="w-full h-full object-cover object-center will-change-transform"
            style={{ imageRendering: 'auto' }}
          />
        </picture>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. LIVING WEATHER PARTICLES (Rain, dust, night bokeh)
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
          4. CINEMATIC VIGNETTE OVERLAY
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-70" />
    </div>
  );
};
