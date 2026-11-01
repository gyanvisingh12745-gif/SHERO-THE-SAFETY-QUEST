# SHERO: The Safety Quest — Backend Architectural Audit (Phase 1)

## Executive Summary
This document provides a comprehensive technical audit of the backend system for **SHERO: The Safety Quest** as of Phase 1. It details the initial baseline, identified bottlenecks and structural gaps, the target relational architecture for 12 missions, security posture, and migration pathway.

---

## 1. Initial State Assessment

### 1.1 Existing Backend Stack
- **Runtime & Language**: Node.js v20.18.0 + TypeScript v5.7.3 (`tsx` execution)
- **Framework**: Express v4.21.2
- **Database Engine**: `sql.js` v1.12.0 (SQLite compiled to WebAssembly with file persistence to `data/shero.sqlite`)
- **Validation**: Zod v3.24.2
- **Testing Framework**: Vitest v3.0.5
- **Communication Protocol**: RESTful JSON over HTTP (Port 4000)

### 1.2 Previous Schema & Data Limitations
1. **Flat Schema**: The prior database only maintained 3 tables: `game_results`, `mission_completions`, and `global_stats`.
2. **Missing Relational Game Content**: Mission structure, scenes, dialogues, and branching choices were loaded from an in-memory TypeScript constant (`shared/missionsData.ts`) rather than a database.
3. **No Player / Session Persistence**: There were no persistent `players` or `player_settings` tables. Player state resided strictly in client-side localStorage.
4. **Mission Count Discrepancy**: The legacy data had only 10 missions with disparate naming, whereas the canonical curriculum requires 12 structured empowerment missions (Street & Cyber Safety: M01–M05, Relational & Domestic Rights: M06–M10, Emergency & Rebuilding: M11–M12).
5. **Localization Gaps**: Hindi translations were partially hardcoded in frontend files without structured backend translation tables for scenes, choices, dialogues, and support resources.
6. **No API Versioning**: All existing endpoints resided on `/api/*` without `/v1` namespace or OpenAPI documentation.
7. **Security & Rate Limiting**: The server lacked request rate limiting and explicit security headers (Helmet-level protection).

---

## 2. Target Phase 1 Architecture

### 2.1 Storage & Relational Database
Using the robust WebAssembly SQLite engine (`sql.js`), we introduce a full relational schema with foreign key enforcement (`PRAGMA foreign_keys = ON;`) and file export persistence (`data/shero.sqlite`):
- `players`: Guest tokens, customizable display names (defaulting to dynamic `{playerName}`), creation timestamps.
- `player_settings`: Player-level preferences (language `en`/`hi`, sound FX, BGM, text speed, accessibility flags).
- `missions`: Master mission metadata (slug, category, difficulty, badge, publish state).
- `mission_translations`: Multi-language mission metadata (EN & HI titles, taglines, summaries, goals).
- `characters`: Character directory with canonical roles and expressions.
- `scenes` & `scene_translations`: Ordered scenes with environments, background keys, audio cues, and narrative text.
- `dialogues` & `dialogue_translations`: Dialogue turns per scene with emotion markers and speaker types.
- `choices` & `choice_translations`: Branching choices with safety, boundary, and support delta scores, feedback, and educational tips.
- `branching_rules`: Dynamic conditional navigation paths.
- `player_progress`, `mission_progress`, and `player_choices_history`: High-fidelity playthrough tracking, retry counters, and choice auditing.
- `achievements` & `player_achievements`: Unlockable badges and achievements.
- `safety_resources` & `safety_resource_translations`: Verified national emergency helplines (112, 181, 1091, 1930, 7827170170 NCW, Sakhi OSC, DLSA).
- `game_events`: Privacy-preserving telemetry and analytics.
- Legacy backward-compatible views/tables (`game_results`, `mission_completions`, `global_stats`).

### 2.2 Dynamic Name Interpolation
To strictly adhere to the prompt requirement:
- **No player names are ever baked into the database.**
- Database text stores tokens `{playerName}` and `{hero}`.
- The game engine dynamically resolves `{playerName}` to the player's saved name (or localized fallback "Shero" / "शेरो").
- The hardcoded name "Gyanvi" is strictly forbidden across all backend responses.

### 2.3 Modular Directory Organization
```text
server/
├── BACKEND_AUDIT.md            # This document
├── README.md                   # Complete API & operational documentation
├── tsconfig.json               # Backend TypeScript configuration
└── src/
    ├── index.ts                # Express application bootstrapping & middleware
    ├── db.ts                   # Database connection, migrations, persistence & query utilities
    ├── db/
    │   ├── schema.ts           # DDL statements for all 18+ relational tables & indexes
    │   └── seed.ts             # Complete 12-mission bilingual content seeder
    ├── engine/
    │   └── gameEngine.ts       # Reusable branching logic, score calculations, token interpolation
    ├── middleware/
    │   ├── security.ts         # Security headers & in-memory sliding window rate limiter
    │   ├── auth.ts             # Guest session validator & admin API key guard
    │   └── errorHandler.ts     # Standardized JSON error response handler
    ├── routes/
    │   ├── playerRoutes.ts     # /api/v1/players
    │   ├── missionRoutes.ts    # /api/v1/missions
    │   ├── gameplayRoutes.ts   # /api/v1/gameplay
    │   ├── progressRoutes.ts   # /api/v1/progress
    │   ├── settingsRoutes.ts   # /api/v1/settings
    │   ├── resourceRoutes.ts   # /api/v1/resources
    │   ├── analyticsRoutes.ts  # /api/v1/analytics
    │   ├── adminRoutes.ts      # /api/v1/admin
    │   └── docsRoutes.ts       # /api/v1/docs (OpenAPI 3.0 specification)
    ├── services/
    │   ├── cacheService.ts     # In-memory mission metadata caching
    │   └── resourceService.ts  # Verified emergency resource lookup
    └── tests/
        ├── backend.test.ts     # Comprehensive 12-mission automated simulation & validation
        └── security.test.ts    # Rate limiting & token sanitization tests
```

### 2.4 Backward Compatibility Guarantee
Existing frontend consumers relying on `/api/missions`, `/api/missions/:missionId`, `/api/game-results`, `/api/stats`, and `/api/support-resources` will receive identical or enhanced response structures, ensuring **zero visual or functional disruption** to the existing landing page and introductory sections.
