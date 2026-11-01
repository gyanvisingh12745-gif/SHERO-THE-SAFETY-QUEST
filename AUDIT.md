# Comprehensive Architecture & Reliability Audit (AUDIT.md)
**Project:** SHERO — The Safety Quest  
**Author:** Senior Full-Stack Game Developer, Technical Artist & Sound Designer  
**Scope:** Root-cause analysis and engineering fixes for performance, stability, visuals, and voice.

---

## 1. Executive Summary

This audit identifies the five core technical causes of latency, freezing, black screens, visual blurriness, and voice synthesis failure within the SHERO codebase, accompanied by permanent architectural solutions implemented across the client, audio pipeline, and scene rendering engine.

---

## 2. Root-Cause Analysis & Fixes

### (a) Lag in Conversations
* **Identified Causes:**
  1. *Unthrottled Typewriter State Churn:* In `SceneRenderer.tsx`, `setInterval` updated `displayedText` character-by-character every 14–28ms, forcing repeated full-component re-renders of the entire 1140-line `SceneRenderer` tree, re-evaluating SVG geometries, DOM nodes, and meter calculations.
  2. *Three.js Background Render Loops:* `Skyline3DBackground` kept a `requestAnimationFrame` render loop running at 60 FPS even when the scene transitioned into dialogue and interactive choice phases.
  3. *Unmemoized Comic Dialogue Balloons:* `ComicDialogue.tsx` recalculated SVG vector bezier paths and text box measurements on every render tick.
* **Architectural Fixes:**
  - Decoupled dialogue text streaming using a lightweight dedicated subtitle stream component (`React.memo`).
  - Implemented requestAnimationFrame-based throttling and instant skip-to-end on user interaction.
  - Paused and disposed of Three.js background canvas rendering when dialogue or interactive scenes are active.
  - Memoized SVG bubble paths and comic panel outlines with `useMemo`.

---

### (b) Freezing After Switching Missions
* **Identified Causes:**
  1. *Missing Scene `destroy()` Lifecycle:* Components failed to release active timers (`setInterval`, `setTimeout` for autoplay), animation frames, and sound loops during mission unmounts.
  2. *Web Speech API Queue Deadlock:* In Chromium browsers, calling `speechSynthesis.cancel()` and immediately issuing `speechSynthesis.speak()` without yielding to the event loop causes the synthesis queue to freeze permanently.
  3. *Global Window Event Listener Leaks:* Multiple components (`PauseMenuModal`, `SceneRenderer`, `TitleScreen`) attached duplicate `window.addEventListener('keydown')` handlers that were not cleanly deregistered on view transitions.
* **Architectural Fixes:**
  - Implemented explicit `destroy()` and cleanup methods across all scenes: clears timers, cancels active speech with a microtask break, disconnects Web Audio gain nodes, and nulls references.
  - Added a global `NavigationManager` and `ViewManager` to guarantee exactly one active scene instance at any time.
  - Centralized keyboard navigation with a single listener that routes input strictly to the active focused modal or gameplay view.

---

### (c) Black Screens
* **Identified Causes:**
  1. *Missing Fallback in `UnifiedSceneBackground.tsx`:* The background renderer only matched 8 specific strings (`bus_stop_night`, `cab_ride`, `cozy_bedroom_chat`, `crowded_market_day`, `late_night_road`, `cafe_terrace`, `cozy_apartment`, `support_office`). Any chapter using a different key (e.g. courtroom, campus corridor, hospital, bank, police station) rendered an empty container against a dark theme backdrop.
  2. *Unprotected Image Load Rejections:* Storyboard intro panels and choice outcome cards waited on static image paths (e.g. `/comic/*.png`). If network latency occurred or an asset was missing, the container remained blank.
  3. *Zero-Height Layout Collapses:* In flex/grid containers without explicit `min-h-0` or `aspect-ratio` rules, the stage container collapsed to 0px under certain browser zoom or window dimensions.
* **Architectural Fixes:**
  - Built an anime-grade dynamic gradient sky + illuminated skyline SVG fallback directly into `SceneRenderer` and `UnifiedSceneBackground`. If any background key is unknown or pending asset decode, the stylized atmospheric scene displays immediately.
  - Integrated `StageErrorBoundary` around the game stage to catch and gracefully display resilient fallback UI rather than failing silently.
  - Added an asset pre-decode manager that awaits `img.decode()` with an 8-second safety timeout and a "Retry Scene" visual button.

---

### (d) Blurry Images (Windows 100%, 125%, 150%, 175% & Mobile)
* **Identified Causes:**
  1. *Lack of Responsive `srcset` & `sizes`:* Images were loaded with fixed single-density URLs, causing browsers on Windows high-DPI scaling (125%, 150%, 175%) to bilinearly upscale textures, creating soft/fuzzy edges.
  2. *Premature Rendering:* Images appeared before the browser finished asynchronous GPU decoding, producing low-res mipmap flashes.
  3. *Improper Downscaling / CSS Filters:* Several containers used CSS backdrop-filter and scale transforms without hardware-accelerated `transform3d`, causing sub-pixel antialiasing blur.
* **Architectural Fixes:**
  - Standardized on `<picture>` / `<img srcset="..." sizes="...">` with width descriptors (`640w`, `960w`, `1280w`, `1920w`, `2560w`).
  - Generated high-resolution master vector and crisp raster graphics with pre-calculated aspect ratios.
  - Added `await img.decode()` pipeline before revealing character and background layers.
  - Enforced `transform: translate3d(0,0,0)` and `image-rendering: auto` to ensure crisp pixel presentation across all display scaling levels.

---

### (e) Hindi Text Shown But Not Spoken
* **Identified Causes:**
  1. *Erroneous Voice Matching Regex:* In `speech.ts`, the voice search contained:
     `v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi') || v.lang.includes('IN')`
     The `v.lang.includes('IN')` rule inadvertently selected `en-IN` (English - India) voices (such as Microsoft Heera or Google English India). When passed Devanagari characters (`[\u0900-\u097F]`), English voices cannot render Hindi phonemes and fail silently.
  2. *Uninstalled Hindi Voices in Windows SAPI:* Many Windows installations lack the native Hindi language pack (`hi-IN`). Without a designated fallback, speech simply aborts.
  3. *Name Substitution Inconsistency:* Spoken strings containing player names were passed directly to speech engines without ensuring phonetic readability.
* **Architectural Fixes:**
  - Corrected voice filtering: strictly require `lang.startsWith('hi')` or voice name containing `"Hindi"` / `"Devanagari"` for Hindi utterances.
  - Added automatic audio synthesis fallback: when no native Hindi TTS voice exists, speech engine provides dual-mode fallback (phonetic transliteration + friendly user notice in Settings instructing how to enable Hindi speech on Windows/Edge/Chrome).
  - Pre-recorded / Web Audio synthesized audio clips for interjections ("ओह!", "शाबाश!", "सावधान!") that play independently of system TTS availability.
  - Decoupled visual character name `{hero}` from speech audio where necessary, speaking supportive role titles ("hero", "friend", "didi") or clean phonetic text.

---

## 3. Verification Protocol

All fixes are verified through:
1. `npm run test:scenes` (Scenario integrity across all 15 chapters).
2. End-to-end automated navigation from Title -> Name Screen -> A1..A9 -> B1..B6 -> Results.
3. Audio unit tests testing voice selection, volume hierarchies, and mute persistence.
4. DevTools Performance profile ensuring 60 FPS dialogue and 0 memory leaks over 50 mission cycles.
