# SHERO — Master Image Generation Prompts & Visual Bible (IMAGE_PROMPTS.md)

**Project:** SHERO: The Safety Quest  
**Style Anchor (applied to every prompt):**  
> *"premium anime illustration, clean line art, soft cel shading with painterly gradients, cinematic lighting, highly detailed, consistent character design, no text, no watermark, no logo, no speech bubbles"*

---

## 1. Character Generation Bible

All characters adhere to their Master Design Sheets to ensure facial features, hair geometry, skin tones, and outfits stay 100% consistent across every expression and scene.

### Hero Protagonist (`{hero}`)
- **Reference Sheet:** `public/assets/mission-01/player/player_neutral.webp` (Character design reference)
- **Visual Description:** Young Indian college woman (19-21 years old). Long wavy dark-brown hair cascading over shoulders, warm amber-brown eyes, purple jacket over a white hoodie, pink and black over-ear headphones resting around neck, blue denim jeans, brown leather notebook, dark backpack straps.
- **Master Prompts per Expression:**
  - `normal.webp`: *"Hero standing direct/three-quarters portrait, calm gentle smile, amber eyes, long wavy dark-brown hair, purple jacket over white hoodie, pink-black headphones around neck, clean line art, white background."*
  - `happy.webp`: *"Hero with closed-eye joyful anime smile, soft pink blushes, glowing warm lighting, ecstatic."*
  - `scared.webp`: *"Hero trembling, hand brought to mouth, wide alarmed eyes with dilated pupils, cold ambient rim lighting."*
  - `shocked.webp`: *"Hero with wide shocked eyes, mouth open in gasp, dynamic manga impact lines, sharp pupils."*
  - `determined.webp`: *"Hero with direct resolute stare, eyebrows angled with courage, clenched jaw, confident posture."*
  - `crying.webp`: *"Hero with tears welling in eyes, sorrowful downward gaze, soft emotional lighting."*
  - `thinking.webp`: *"Hero looking upwards thoughtfully, fingertip pressed against chin, inquisitive expression."*
  - `relieved.webp`: *"Hero with gentle exhale, relaxed eyes, soft smile, subtle hand on chest."*

### Friend Aanya (Bold Friend)
- **Path:** `/public/assets/chars/friend_aanya/normal.webp`
- **Visual Description:** Energetic Indian college student, short layered dark hair with teal-tinted highlights, expressive dark eyes, sporty teal-green hoodie, gold stud earrings, confident thumbs-up smile.

### Helped Woman Anjali (Part B)
- **Path:** `/public/assets/chars/helped_woman_anjali/normal.webp`
- **Visual Description:** Gentle, resilient Indian woman in her late 20s. Wearing an elegant pastel light-yellow embroidered kurta and floral dupatta, kind expressive brown eyes, dignified presence.

### Antagonist: Bus Stranger (A1)
- **Path:** `/public/assets/chars/stranger_antagonist/normal.webp`
- **Visual Description:** Suspicious young man with a dark baseball cap pulled low casting shadows over his eyes, dark bomber jacket, piercing gaze, subtle smug smirk.

### Antagonist: Husband (B1–B3)
- **Path:** `/public/assets/chars/husband_antagonist/normal.webp`
- **Visual Description:** Well-dressed modern man in a fitted dark navy button-down shirt, sharp jawline, cold calculating stare, subtle scowl, imposing posture without physical violence.

---

## 2. Background Environments (16:9 Cinema Aspect Ratio)

### 1. Title Screen Sunset Horizon
- **Path:** `/public/assets/bg/title_sunset.webp`
- **Prompt:** *"Sunset sky with warm pink and purple gradient clouds, cherry blossom petals drifting across the breeze, modern city skyline at twilight, 16:9 ratio, no text."*

### 2. A1 Bus Stop at Dusk
- **Path:** `/public/assets/bg/bus_stop_dusk.webp`
- **Prompt:** *"Quiet city bus stop at twilight dusk with illuminated glass shelter lamp, empty wooden bench, autumn trees, distant glowing buildings, 16:9 ratio, no characters, no text."*

### 3. A2 Cab Ride Interior
- **Path:** `/public/assets/bg/cab_ride.webp`
- **Prompt:** *"First-person view from rear passenger seat of modern rideshare cab looking forward at dashboard meter and windshield showing blurred neon city lights at dusk, 16:9 ratio, no characters, no text."*

### 4. A4 Crowded Market
- **Path:** `/public/assets/bg/crowded_market.webp`
- **Prompt:** *"Bustling Indian street market avenue with colorful draped fabric canopies, fruit stalls, flower garlands, terracotta pottery under warm afternoon sunlight, 16:9 ratio, no characters, no text."*

### 5. A5 Night Street with 24/7 Pharmacy
- **Path:** `/public/assets/bg/night_pharmacy.webp`
- **Prompt:** *"Dimly lit urban night street with wet pavement reflections and brightly lit green and cyan glowing pharmacy storefront safe haven, 16:9 ratio, no characters, no text."*

### 6. A8 College Campus Fest
- **Path:** `/public/assets/bg/campus_fest.webp`
- **Prompt:** *"University campus courtyard under purple twilight sky, adorned with warm strings of fairy lights, colorful lanterns, festival canopy booths, 16:9 ratio, no characters, no text."*

### 7. B4 Sakhi One-Stop Crisis Support Centre
- **Path:** `/public/assets/bg/sakhi_centre.webp`
- **Prompt:** *"Warm, dignified counseling room with comfortable armchairs, soft amber lamp lighting, wooden desk, bookshelves, potted green plants, 16:9 ratio, no characters, no text."*

### 8. B2/B6 Legal Aid Chamber / Courtroom
- **Path:** `/public/assets/bg/legal_aid_office.webp`
- **Prompt:** *"Dignified legal aid chamber with rich mahogany bookshelves filled with law volumes, stately desk with scales of justice ornament, warm ambient light, 16:9 ratio, no characters, no text."*

---

## 3. Feedback FX Key Art

### Correct Choice Celebration FX
- **Path:** `/public/assets/ui/celebration_fx.webp`
- **Prompt:** *"Sparkling golden, pink, and teal confetti particles, ribbons, glowing starbursts, celebratory warm fireworks, 16:9 ratio, no text."*

### Warning / Incorrect Choice Alert FX
- **Path:** `/public/assets/ui/warning_alert_fx.webp`
- **Prompt:** *"Atmospheric crimson and amber alert vignette with soft neon hazard pulse waves and geometric hexagons conveying tension without violence, 16:9 ratio, no text."*

---

## 4. Responsive Sizes & Fallback Strategy

Each background is processed at `640w`, `960w`, `1280w`, `1920w`, and `2560w`.
Characters are processed at `512w`, `768w`, `1024w`, and `1536w`.
When a raster texture is loading or absent, the SVG dynamic gradient sky and city skyline fallback renders instantaneously, ensuring the screen is **never black or blank**.
