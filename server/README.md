# SHERO: The Safety Quest — Backend Documentation (Phase 1)

## Overview
**SHERO: The Safety Quest** is a full-stack, anime-inspired interactive women's safety adventure game. This backend foundation implements a production-grade, relational, database-backed architecture supporting 12 canonical empowerment missions with branching decision paths, persistent guest sessions, bilingual content (English & Hindi), dynamic name interpolation, security hardening, and verified national emergency helplines.

---

## 1. System Architecture

```text
                                  +-----------------------------+
                                  |   React + Vite Frontend     |
                                  |   (Port 5173 / Localhost)   |
                                  +--------------+--------------+
                                                 |
                                HTTP REST / JSON | (x-guest-token)
                                                 v
+-------------------------------------------------------------------------------------------------+
|                                 SHERO Backend Core (Port 4000)                                   |
|                                                                                                 |
|  +--------------------+   +--------------------+   +--------------------+   +-----------------+ |
|  |  Security Headers  |-->| Rate Limiter (120/m|-->| Guest Session Auth |-->|  Zod Validation | |
|  +--------------------+   +--------------------+   +--------------------+   +-----------------+ |
|                                                                                                 |
|  +--------------------------------------------------------------------------------------------+ |
|  |                                  Versioned REST Routers                                    | |
|  |  /api/v1/players     | /api/v1/missions    | /api/v1/gameplay   | /api/v1/progress         | |
|  |  /api/v1/settings    | /api/v1/resources   | /api/v1/analytics  | /api/v1/admin (/docs)    | |
|  +--------------------------------------------------------------------------------------------+ |
|                                                 |                                               |
|                                                 v                                               |
|  +--------------------------------------------------------------------------------------------+ |
|  |                         Reusable Branching Game Engine (gameEngine.ts)                      | |
|  |   - Dynamic Token Interpolation ({playerName} / {hero})                                    | |
|  |   - Multi-choice Validation, Consequence & Safety Delta Scoring                             | |
|  |   - Branching State Transitions & Outcome Badging                                           | |
|  +--------------------------------------------------------------------------------------------+ |
|                                                 |                                               |
|                                                 v                                               |
|  +--------------------------------------------------------------------------------------------+ |
|  |                    SQLite WASM Engine (sql.js with PRAGMA foreign_keys = ON)               | |
|  |                    Disk Persistence: data/shero.sqlite (Export Buffer)                     | |
|  +--------------------------------------------------------------------------------------------+ |
+-------------------------------------------------------------------------------------------------+
```

---

## 2. Relational Database Schema

The database is built on WebAssembly SQLite (`sql.js`) with active foreign key constraints (`PRAGMA foreign_keys = ON;`) and automatic disk persistence to `data/shero.sqlite`.

| Table | Description | Primary Key | Foreign Keys / Relations |
| :--- | :--- | :--- | :--- |
| `players` | Guest user accounts & display names | `id` (UUID) | Unique `guest_token` |
| `player_settings` | Language, sound FX, BGM, text speed preferences | `player_id` | References `players(id)` ON DELETE CASCADE |
| `characters` | NPC & speaker directory (Hero, Stranger, Police, etc.) | `id` | Unique `code` |
| `missions` | 12 canonical mission definitions & badges | `id` | Unique `slug`, `number` |
| `mission_translations` | Localized titles, taglines, summaries, goals (EN/HI) | `id` | References `missions(id)`, UNIQUE(mission_id, lang) |
| `scenes` | Ordered narrative beats and decision moments | `id` | References `missions(id)`, `characters(id)` |
| `scene_translations` | Localized environment names, narrative & prompts | `id` | References `scenes(id)`, UNIQUE(scene_id, lang) |
| `dialogues` | Sequential character dialogue & thought lines | `id` | References `scenes(id)`, `characters(id)` |
| `dialogue_translations`| Localized spoken dialogues and internal thoughts | `id` | References `dialogues(id)`, UNIQUE(dialogue_id, lang) |
| `choices` | Branching options, safety deltas, target scenes | `id` | References `scenes(id)`, `next_scene_id` |
| `choice_translations` | Localized choice text, consequences, educational tips | `id` | References `choices(id)`, UNIQUE(choice_id, lang) |
| `branching_rules` | Conditional transition logic for branches | `id` | References `choices(id)`, `scenes(id)` |
| `player_progress` | Overall scores, safety rating, completed missions | `id` | References `players(id)` UNIQUE |
| `mission_progress` | Per-mission state (`in_progress`, `completed`, score) | `id` | References `players(id)`, `missions(id)` |
| `player_choices_history`| Audit log of every decision made by players | `id` | References `players(id)`, `scenes(id)`, `choices(id)` |
| `achievements` | Badges and achievements catalog | `id` | Unique `code` |
| `achievement_translations`| Localized achievement titles and descriptions | `id` | References `achievements(id)`, UNIQUE(achievement_id, lang) |
| `player_achievements` | Player-unlocked achievements timestamped | `id` | References `players(id)`, `achievements(id)` |
| `safety_resources` | Verified national emergency numbers & helplines | `id` | Unique `code`, categorized |
| `safety_resource_translations`| Verified steps to access in EN & HI | `id` | References `safety_resources(id)` |
| `game_events` | Privacy-preserving telemetry and analytics events | `id` | References `players(id)` |
| `game_results` | Legacy table preserving prior schema compatibility | `id` | Legacy compatibility |
| `mission_completions` | Legacy table tracking highest scores per mission | `mission_id` | Legacy compatibility |
| `global_stats` | Legacy key-value metrics table | `key` | Legacy compatibility |

---

## 3. The 12 Canonical Missions

All 12 missions are completely written, bilingual, and seeded into the relational database:

| # | Slug | Category | Difficulty | Badge Name | Core Safety Topic |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **01** | `the-last-bus-stop` | `street_safety` | Beginner | **Commute Guardian** | Bus stop space boundary violations, illuminated safe havens, live location sharing |
| **02** | `the-crowded-commute` | `transit_safety` | Beginner | **Transit Navigator** | Harassment on public transit, loud bystander mobilization, transit marshals |
| **03** | `the-unsafe-shortcut` | `street_safety` | Beginner | **Illuminated Path** | Avoiding isolated alleys, situational awareness, vehicle number plate verification |
| **04** | `behind-the-screen` | `cyber_safety` | Intermediate | **Digital Shield** | Cyber extortion, non-consensual media, digital forensics, 1930 / cybercrime.gov.in |
| **05** | `the-workplace-boundary` | `workplace_safety` | Intermediate | **Boundary Builder** | Quid pro quo harassment, POSH Act 2013, Internal Complaints Committee (ICC) |
| **06** | `love-or-control` | `relational_safety` | Intermediate | **Sovereign Heart** | Spotting coercive control, password demands, resisting emotional isolation |
| **07** | `the-perfect-daughter-in-law` | `domestic_rights` | Intermediate | **Rights Defender** | In-law surveillance, PWDVA 2005 Sec 3, Protection Officers, Domestic Incident Reports |
| **08** | `behind-closed-doors` | `domestic_safety` | Advanced | **Safe Exit Strategist** | Domestic violence escalation, Go-Bag preparation, digital de-tracking, Sakhi safe house |
| **09** | `the-money-trap` | `financial_rights` | Advanced | **Financial Sovereign** | Salary confiscation, Streedhan rights (Sec 14 Hindu Succession Act), independent banking |
| **10** | `a-friend-in-need` | `bystander_support` | Advanced | **Empathetic Bystander**| Trauma-informed active listening, overcoming victim-blaming, free DLSA legal aid |
| **11** | `the-breaking-point` | `emergency_crisis` | Advanced | **Emergency Master** | Immediate physical assault crisis, 112 ERSS dispatch, Zero-FIR registration |
| **12** | `a-new-beginning` | `recovery_empowerment` | Advanced | **Phoenix of Freedom** | Somatic trauma grounding, psychological recovery (iCall), community sisterhood |

---

## 4. Reusable Game Engine & Dynamic Naming

### Dynamic Token Resolution
- **Rule**: Player names are **never** hardcoded into database strings or responses.
- The engine dynamically interpolates `{playerName}` and `{hero}` based on the authenticated player profile.
- If no name is provided, language-aware fallbacks are used (`Shero` for English, `शेरो` for Hindi).
- A strict filter prevents any historical hardcoded name ("Gyanvi") from ever escaping to the client.

### Safety Scoring & Rating Engine
- Each choice impacts three dimensions:
  - `safety_score_delta`: Primary situational security evaluation.
  - `boundaries_delta`: Clear assertion of interpersonal or legal boundaries.
  - `support_delta`: Effective mobilization of witnesses, family, or emergency systems.
- Ratings scale dynamically based on cumulative score:
  - `0 - 99`: **Novice Defender**
  - `100 - 299`: **Awareness Sentinel**
  - `300 - 499`: **Vigilant Protector**
  - `500 - 799`: **Master Defender**
  - `800+`: **Legendary Guardian**

---

## 5. Verified Safety Resources Directory

| Organization / Service | Phone Number | Web / SMS | Availability | Category |
| :--- | :--- | :--- | :--- | :--- |
| **National Emergency Response Support System (ERSS)** | **112** | SMS 112 / https://112.gov.in | 24/7 | Emergency (Police/Fire/Ambulance) |
| **Women Helpline (Domestic Abuse & Distress)** | **181** | https://wcd.nic.in | 24/7 | Domestic Violence & Crisis |
| **Women Police Distress Patrol** | **1091** | PCR Dispatch | 24/7 | Immediate Police Patrol |
| **National Cyber Crime Helpline** | **1930** | https://cybercrime.gov.in | 24/7 | Cyber Stalking & Extortion |
| **National Commission for Women (NCW) WhatsApp SOS** | **+91-7827170170** | WhatsApp Text | 24/7 | Silent Domestic SOS |
| **Sakhi One Stop Centres (OSC)** | **181** | District Hospital Premises | 24/7 | Shelter, Medical & Legal Aid |
| **District Legal Services Authority (DLSA / NALSA)** | **15100** | https://nalsa.gov.in | 24/7 | 100% Free Legal Aid Advocates |
| **iCall Psychosocial Helpline (TISS)** | **9152987821** | icall@tiss.edu | Mon-Sat 10am-8pm | Mental Health & Trauma Counseling |

---

## 6. API Reference (v1)

### Base URL: `http://localhost:4000/api/v1`

| Method | Endpoint | Description | Auth / Headers |
| :--- | :--- | :--- | :--- |
| `POST` | `/players/guest` | Create or restore guest player session | Public |
| `GET` | `/players/me` | Fetch authenticated player profile | `x-guest-token` |
| `PATCH` | `/players/me` | Update display name (sanitized 1-32 chars) | `x-guest-token` |
| `POST` | `/players/reset` | Reset all gameplay progress for player | `x-guest-token` |
| `GET` | `/missions` | List all 12 missions with progress (`?lang=en\|hi`)| Optional `x-guest-token` |
| `GET` | `/missions/:idOrSlug` | Detailed mission outline and scenes | Optional `x-guest-token` |
| `POST` | `/gameplay/start` | Start or resume mission -> returns initial scene | `x-guest-token` |
| `GET` | `/gameplay/scene` | Fetch current scene (`?sceneId=...&lang=...`) | `x-guest-token` |
| `POST` | `/gameplay/choice` | Submit branching decision and receive feedback | `x-guest-token` |
| `POST` | `/gameplay/retry` | Retry current scene after incorrect answer | `x-guest-token` |
| `GET` | `/progress` | Comprehensive player progress & earned badges | `x-guest-token` |
| `GET` | `/settings` | Retrieve audio, text speed, accessibility flags | `x-guest-token` |
| `PUT` | `/settings` | Update player settings | `x-guest-token` |
| `GET` | `/resources` | Emergency resources directory (`?lang=&category=`) | Public |
| `POST` | `/analytics/event` | Log privacy-preserving game telemetry event | Optional `x-guest-token` |
| `GET` | `/analytics/stats` | Aggregated gameplay and accuracy statistics | Public |
| `GET` | `/admin/missions` | Admin: view all missions including unpublished | `x-admin-key` |
| `PATCH`| `/admin/missions/:id/publish`| Admin: toggle mission published status | `x-admin-key` |
| `GET` | `/admin/audit` | Admin: inspect recent security and game events | `x-admin-key` |
| `GET` | `/docs` | Interactive Swagger UI API documentation | Public |
| `GET` | `/docs/openapi.json` | OpenAPI 3.0.3 specification JSON | Public |

### Legacy Endpoints (Preserved for 100% Backward Compatibility)
- `GET /api/health`
- `GET /api/missions`
- `GET /api/missions/:missionId`
- `POST /api/game-results`
- `GET /api/stats`
- `GET /api/support-resources`
- `POST /api/ai/explain`

---

## 7. Running the Application & Tests

### Start Backend Development Server
```bash
npm run dev:server
# or
npx tsx server/src/index.ts
```

### Run Automated Tests (Vitest)
```bash
npm run test
```
The test suite includes **53 passing tests** across 7 test files, including:
- Database schema and referential integrity verification.
- Complete end-to-end playthrough simulations for all 12 missions.
- Token interpolation & forbidden name filtering.
- REST API v1 integration tests.
- Rate limiting and security header validation.

### Build Full Project (Frontend + Server)
```bash
npm run build
```
Produces:
- Production client bundle in `dist/`
- Production server bundle in `dist/server/`
