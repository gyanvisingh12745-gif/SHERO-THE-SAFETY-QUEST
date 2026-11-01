# SHERO: The Safety Quest — Final Production Release

> **"Every choice shapes your journey from the streets to self-determination."**

A finished, premium visual novel and interactive anime game that educates players on personal street awareness, cyber safety, relationship boundaries, domestic autonomy, and legal lifelines through an interactive 15-chapter narrative.

---

## 🌟 The 15 Story Chapters

### Part A: Street Smarts (Campus & Public Safety)
1. **A1 — The Last Bus** *(Transit Hub at Dusk)*: Invasive stranger proximity awareness, polite refusal, illuminated zones, driver proximity.
2. **A2 — The Cab Ride** *(Verified Transport)*: License plate verification, driver identification, live route sharing, rear seat positioning.
3. **A3 — The Suspicious Chat** *(Digital Phishing & Social Media)*: Grooming detection, refusal of OTPs / private meets, reporting to 1930 / cybercrime.gov.in.
4. **A4 — The Crowded Market** *(Personal Space & Active Bystander)*: Disengaging from inappropriate touch, commercial shopkeeper allies, loud boundary assertion.
5. **A5 — The Late-Night Walk** *(Street Awareness & Havens)*: Footstep cadence detection, street crossing to test intent, redirecting toward 24/7 glowing pharmacies.
6. **A6 — Fake Job Offer** *(Employment Scams)*: Spotting fake recruiters demanding upfront fees or original certificates, MCA portal verification.
7. **A7 — The Persistent Stalker** *(Clear Boundaries & Law)*: Documenting timelines, campus Internal Complaints Committee (ICC), Section 78 BNS / 354D IPC.
8. **A8 — The Campus Party** *(Social Gatherings & Vigilance)*: Unattended drink safety, buddy system execution, identifying drink tampering signs.
9. **A9 — The Blackmail Call (Sextortion)** *(Cyber Extortion Defense)*: Zero ransom compliance, evidence preservation, filing takedowns via StopNCII.org and 1930.

### Part B: Be a Helper (Relationships, Boundaries & Legal Autonomy)
1. **B1 — The Betrayal** *(Surveillance & Red Flags)*: Confronting infidelity without self-blame, digital surveillance identification, resisting coercive isolation.
2. **B2 — Who's in Control?** *(Economic & Family Pressure)*: Resisting ultimatums to surrender bank passbooks or career aspirations, PWDVA Section 3 legal literacy.
3. **B3 — After the Argument** *(The Controlling Husband & Safety Planning)*: De-escalation tactics, spyware detection, assembling an emergency "Go-Bag" (documents, keys, cash).
4. **B4 — Adjust Karo** *(Breaking Point & Lifelines)*: Reaching Sakhi One Stop Centres, interim Protection Orders under PWDVA, free legal aid via DLSA.
5. **B5 — The Heir** *(Reproductive Coercion & Bodily Autonomy)*: Resisting pressure for male children, legal protections under the PC-PNDT Act 1994, medical consent.
6. **B6 — Money Matters** *(Economic Abuse & Financial Sovereignty)*: Streedhan recovery under Supreme Court precedents, independent accounts, credit score audits.

---

## 👤 Dynamic Player Naming (Section 1)

* **Hero Protagonist (`{hero}`)**: The protagonist's name is dynamically provided by the player on the first screen after the title.
* **Universal Placeholder Tokenization**: The name is substituted across all 15 chapters, dialogues, HUD banners, and final achievement certificates in both English and Hindi.
* **Zero Hardcoded Names**: The word "Gyanvi" is strictly eradicated from all UI, dialogue trees, results, and HUD.
* **Customization in Settings**: Players can update their hero name or supporting character names (`{helpedWoman}`, `{friendBold}`, etc.) anytime via **Settings → Character Names**.

---

## 🎨 Premium Visual & Comic Stage Engine

* **Master Palette Derived from Reference Art**:
  - Deep Plum (`#2A0F3F`), Violet (`#6B2FA0`), Orchid (`#B44FD1`), Hot-Pink (`#FF4F9A`), Rose (`#FF7DB8`)
  - Sunset Peach (`#FFB48A`), Warm Gold (`#FFD27A`), Cream Paper (`#FFF6EA`), Comic Ink (`#1B1020`)
  - Decision choices: Success (`#22C55E`), Danger (`#EF4444`), Info (`#3B82F6`)
* **First Page (Title Screen)**:
  - Full-bleed sunset sky horizon with cherry blossom petals.
  - Torn-paper intro card featuring brush-stroke title `Meet {hero} ♡`.
  - Glowing gradient "Let's Begin" pill button with soft hover scaling.
  - Hardware-accelerated mouse/gyro parallax on artwork (`transform` only).
  - Floating sakura petals running on lightweight CSS keyframes (`transform`/`opacity` only).
* **Never Blurry Graphics Pipeline**:
  - Responsive `<picture>` elements with `srcset` and `sizes` descriptors (`640w`, `960w`, `1280w`, `1920w`, `2560w`).
  - Asynchronous GPU decoding (`await img.decode()`) before layer revelation.
  - Clean styling without CSS blur filters; crisp across 100%, 125%, 150%, and 175% Windows display scaling.
* **No Black Screen Guarantee**:
  - Every scene includes an anime-grade dynamic gradient sky + illuminated skyline SVG fallback. If any texture takes time to decode, the stylized atmospheric scene is displayed immediately.

---

## 🔊 Bilingual Audio & Voice Engine (Section 6)

* **Dual-Language Speech Synthesis (Web Speech API)**:
  - English lines are spoken in English; Hindi lines are spoken in Hindi.
  - Strict separation ensures Hindi Devanagari text (`[\u0900-\u097F]`) is routed exclusively to Hindi voices (`hi-IN`), never mismatched with English-India voices.
  - Asynchronous event-loop yielding prevents Chromium TTS queue deadlocks.
  - Helpful diagnostic indicator in Settings if no native Hindi voice is installed in the user's OS.
* **Character-Specific Modulation**:
  - Female voices for female leads (`hero`, `helpedWoman`, `friendBold`, `friendKind`, `counsellor`, `lawyer`, `policeOfficer`).
  - Male voices for male roles (`stranger`, `husband`, `busDriver`, `cabDriver`, `recruiter`, `banker`).
  - Tailored pitch (0.78 to 1.25) and speech rate (0.90 to 1.12) per persona.
* **Emotional Voice & SFX Interjections**:
  - Natural spoken interjections tied to character expressions (Hindi: *"हे भगवान!"*, *"उफ़!"*, *"अरे!"*, *"शाबाश!"*; English: *"Oh gosh!"*, *"Phew!"*, *"Wait!"*, *"Yes!"*).
  - Procedural Web Audio SFX: laugh, sob, sigh, bus arrival, phone ring, heartbeat, footsteps, party popper, error buzzer, and victory fanfare.

---

## 🛡️ Emergency Lifelines & Real Help

Instant tap-to-call integration:
* **112**: Emergency Response Support System (ERSS — Police, Medical, Fire)
* **181**: Women Helpline (Sakhi) 24/7 Crisis Support
* **1091**: Women Police Helpline
* **1930**: National Cyber Crime & Extortion Helpline ([cybercrime.gov.in](https://cybercrime.gov.in))
* **7827170170**: National Commission for Women (NCW) WhatsApp Emergency Line
* **Sakhi One Stop Centres**: Integrated medical, legal, and counseling care in 700+ districts

---

## 🚀 Running the Project

### Prerequisites
* Node.js v18+ & npm

### Development
```bash
# 1. Install dependencies
npm install

# 2. Run backend and frontend concurrently
npm run dev:all

# Frontend: http://localhost:5173
# Backend:  http://localhost:4000
```

### Environment Variables (`.env`)
```ini
PORT=4000
DATABASE_PATH=./data/shero.sqlite

# Optional: High-Quality Neural TTS API Key (e.g. ElevenLabs / Google Cloud TTS)
# If left blank, the built-in browser Web Speech API provides responsive offline synthesis
TTS_API_KEY=
AI_API_KEY=
```

### Quality Assurance & Diagnostics
* **Run Scenario Quality Gate**: `npm run test:scenes`
* **Run Vitest Test Suite**: `npm test`
* **Scene QA Debug Gallery**: `http://localhost:5173/debug/scenes`
* **Mission Registry Diagnostics**: `http://localhost:5173/debug/missions`
* **Production Build**: `npm run build:client`
