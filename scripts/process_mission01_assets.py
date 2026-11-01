import os
import shutil
from PIL import Image, ImageFilter

SRC_DIR = r"C:\Users\HP\Downloads\shero"
OUT_BASE = r"C:\Users\HP\.gemini\antigravity\scratch\shero\public\assets\mission-01"
MASTERS_DIR = os.path.join(OUT_BASE, "masters")

# Find actual filename matching prefix
def get_source_file(prefix):
    for fname in os.listdir(SRC_DIR):
        if fname.startswith(prefix) and fname.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            return os.path.join(SRC_DIR, fname)
    raise FileNotFoundError(f"No file starting with {prefix} in {SRC_DIR}")

# Asset Manifest definitions
ASSET_MAPPINGS = [
    # 1. Player Expressions (10)
    {"id": "player_neutral", "cat": "player", "prefix": "7V1X_0fE", "titleEn": "Hero Neutral", "titleHi": "नायिका सामान्य"},
    {"id": "player_happy", "cat": "player", "prefix": "6lcBJsVC", "titleEn": "Hero Happy", "titleHi": "नायिका प्रसन्न"},
    {"id": "player_excited", "cat": "player", "prefix": "6lcBJsVC", "titleEn": "Hero Excited", "titleHi": "नायिका उत्साहित"},
    {"id": "player_confused", "cat": "player", "prefix": "tSToqaLY", "titleEn": "Hero Confused", "titleHi": "नायिका असमंजस में"},
    {"id": "player_scared", "cat": "player", "prefix": "i7K90-bk", "titleEn": "Hero Scared", "titleHi": "नायिका भयभीत"},
    {"id": "player_shocked", "cat": "player", "prefix": "5nsPUejb", "titleEn": "Hero Shocked", "titleHi": "नायिका स्तब्ध"},
    {"id": "player_sad", "cat": "player", "prefix": "r98KLmFM", "titleEn": "Hero Sad", "titleHi": "नायिका उदास"},
    {"id": "player_crying", "cat": "player", "prefix": "DuPAPttj", "titleEn": "Hero Crying", "titleHi": "नायिका रोती हुई"},
    {"id": "player_thinking", "cat": "player", "prefix": "0bQZ3JS9", "titleEn": "Hero Thinking", "titleHi": "नायिका विचारशील"},
    {"id": "player_determined", "cat": "player", "prefix": "Cf0ZlRLd", "titleEn": "Hero Determined", "titleHi": "नायिका दृढ़ निश्चयी"},

    # 2. Player Poses (5)
    {"id": "player_standing", "cat": "player_poses", "prefix": "i5Dbqw6Q", "titleEn": "Hero Standing", "titleHi": "नायिका खड़ी हुई"},
    {"id": "player_sitting", "cat": "player_poses", "prefix": "i764JV2K", "titleEn": "Hero Sitting on Bench", "titleHi": "नायिका बेंच पर बैठी"},
    {"id": "player_looking_back", "cat": "player_poses", "prefix": "Cf0ZlRLd", "titleEn": "Hero Looking Back", "titleHi": "नायिका मुड़कर देखती हुई"},
    {"id": "player_holding_phone", "cat": "player_poses", "prefix": "dJ2EZBsH", "titleEn": "Hero Holding Phone", "titleHi": "नायिका फ़ोन पकड़े हुए"},
    {"id": "player_walking_to_safety", "cat": "player_poses", "prefix": "mQK8Ur3q", "titleEn": "Hero Walking to Safety", "titleHi": "नायिका सुरक्षित स्थान की ओर बढ़ती"},

    # 3. Stranger Expressions (6)
    {"id": "stranger_neutral", "cat": "stranger", "prefix": "JaW0-yIH", "titleEn": "Stranger Neutral", "titleHi": "अजनबी सामान्य"},
    {"id": "stranger_speaking", "cat": "stranger", "prefix": "9lXJYCy6", "titleEn": "Stranger Speaking", "titleHi": "अजनबी बात करता हुआ"},
    {"id": "stranger_suspicious", "cat": "stranger", "prefix": "gBgheBLv", "titleEn": "Stranger Suspicious", "titleHi": "अजनबी संदेहास्पद"},
    {"id": "stranger_smiling", "cat": "stranger", "prefix": "2k1o6pRz", "titleEn": "Stranger Smirking", "titleHi": "अजनबी मुस्कुराता हुआ"},
    {"id": "stranger_irritated", "cat": "stranger", "prefix": "z7uzMyqg", "titleEn": "Stranger Irritated", "titleHi": "अजनबी चिढ़ा हुआ"},
    {"id": "stranger_surprised", "cat": "stranger", "prefix": "z7uzMyqg", "titleEn": "Stranger Startled", "titleHi": "अजनबी चौंका हुआ"},

    # 4. Bus Driver Expressions (2)
    {"id": "driver_neutral", "cat": "driver", "prefix": "mfLhDzk9", "titleEn": "Bus Driver Neutral", "titleHi": "बस चालक सामान्य"},
    {"id": "driver_helpful", "cat": "driver", "prefix": "W6YZbeaU", "titleEn": "Bus Driver Helpful", "titleHi": "बस चालक मददगार"},

    # 5. Environment Backgrounds (3)
    {"id": "busstop_wide", "cat": "environment", "prefix": "c-aJEmmN", "titleEn": "Bus Stop Wide Angle", "titleHi": "बस स्टैंड विहंगम दृश्य"},
    {"id": "busstop_interaction", "cat": "environment", "prefix": "FXcWsEXu", "titleEn": "Bus Stop Evening Atmosphere", "titleHi": "बस स्टैंड शाम का माहौल"},
    {"id": "busstop_arrival", "cat": "environment", "prefix": "E2FLKeMq", "titleEn": "Bus Arrival at Night Shelter", "titleHi": "रात में बस का आगमन"},

    # 6. Comic Story Illustrations (6)
    {"id": "story_waiting", "cat": "story", "prefix": "i764JV2K", "titleEn": "Waiting Alone in the Rain", "titleHi": "बारिश में अकेले इंतज़ार"},
    {"id": "story_stranger_approaches", "cat": "story", "prefix": "8qf1kHqr", "titleEn": "Stranger Closes the Distance", "titleHi": "अजनबी का करीब आना"},
    {"id": "story_uncomfortable_conversation", "cat": "story", "prefix": "C3q3GwuX", "titleEn": "Persistent Unwanted Conversation", "titleHi": "असहज बातचीत"},
    {"id": "story_reaching_for_phone", "cat": "story", "prefix": "6IJnMq3Z", "titleEn": "Reaching for Safety Contacts", "titleHi": "सुरक्षा संपर्कों की जाँच"},
    {"id": "story_seeking_assistance", "cat": "story", "prefix": "1CNY0k77", "titleEn": "Seeking Assistance from Driver", "titleHi": "बस चालक से सहायता माँगना"},
    {"id": "story_safe_resolution", "cat": "story", "prefix": "mN9qMoHR", "titleEn": "Safe Transit Home", "titleHi": "घर की सुरक्षित यात्रा"},

    # 7. Choice Outcomes (5)
    {"id": "outcome_safe_decision", "cat": "outcomes", "prefix": "mQK8Ur3q", "titleEn": "Outcome: Move to Bright Well-Lit Zone", "titleHi": "परिणाम: रोशनी वाले स्थान की ओर बढ़ना"},
    {"id": "outcome_maintain_distance", "cat": "outcomes", "prefix": "L_vmhREX", "titleEn": "Outcome: Maintain Clear Spatial Distance", "titleHi": "परिणाम: सुरक्षित दूरी बनाए रखना"},
    {"id": "outcome_ask_for_help", "cat": "outcomes", "prefix": "1CNY0k77", "titleEn": "Outcome: Board Bus & Alert Driver", "titleHi": "परिणाम: बस में चढ़ना और चालक को सूचित करना"},
    {"id": "outcome_mission_success", "cat": "outcomes", "prefix": "Q59PA0N-", "titleEn": "Outcome: Safe Arrival & Mission Victory", "titleHi": "परिणाम: सुरक्षित पहुँच और मिशन में विजय"},
    {"id": "outcome_mission_ending", "cat": "outcomes", "prefix": "mN9qMoHR", "titleEn": "Outcome: Empowered Journey Forward", "titleHi": "परिणाम: सशक्त और जागरूक भविष्य"}
]

def enhance_to_4k(img, target_max=3840):
    w, h = img.size
    orig_aspect = w / h
    
    # Calculate new 4K dimensions preserving aspect ratio
    if max(w, h) < target_max:
        if w >= h:
            new_w = target_max
            new_h = int(round(target_max / orig_aspect))
        else:
            new_h = target_max
            new_w = int(round(target_max * orig_aspect))
    else:
        # Already high-res (e.g. 5K), cap to 3840 or keep if optimal
        new_w, new_h = w, h
        if max(w, h) > 4096:
            if w >= h:
                new_w = target_max
                new_h = int(round(target_max / orig_aspect))
            else:
                new_h = target_max
                new_w = int(round(target_max * orig_aspect))
    
    # Lanczos high-fidelity resample
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Subtle unsharp mask to crisp edges for 4K anime lines
    enhanced = resized.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    return enhanced

def main():
    os.makedirs(MASTERS_DIR, exist_ok=True)
    
    # Copy all 31 raw original masters to masters directory
    raw_files = [f for f in os.listdir(SRC_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    print(f"Preserving {len(raw_files)} original raw master files...")
    for f in raw_files:
        src_path = os.path.join(SRC_DIR, f)
        dest_path = os.path.join(MASTERS_DIR, f)
        if not os.path.exists(dest_path):
            shutil.copy2(src_path, dest_path)
    
    print(f"Master files preserved in {MASTERS_DIR}")
    
    manifest_entries = []
    
    # Process each asset
    for item in ASSET_MAPPINGS:
        cat_dir = os.path.join(OUT_BASE, item["cat"])
        os.makedirs(cat_dir, exist_ok=True)
        
        src_file = get_source_file(item["prefix"])
        asset_id = item["id"]
        
        webp_path = os.path.join(cat_dir, f"{asset_id}.webp")
        png_path = os.path.join(cat_dir, f"{asset_id}.png")
        
        with Image.open(src_file) as raw_img:
            # Ensure RGB
            if raw_img.mode != "RGB":
                rgb_img = raw_img.convert("RGB")
            else:
                rgb_img = raw_img.copy()
            
            orig_w, orig_h = rgb_img.size
            enhanced = enhance_to_4k(rgb_img, target_max=3840)
            final_w, final_h = enhanced.size
            
            # Save 4K WebP (quality 95)
            enhanced.save(webp_path, "WEBP", quality=95, method=4)
            # Save 4K PNG fallback (fast compression level 1, lossless)
            enhanced.save(png_path, "PNG", compress_level=1)
            
            aspect_ratio_str = f"{final_w}:{final_h}"
            manifest_entries.append({
                "id": asset_id,
                "category": item["cat"],
                "titleEn": item["titleEn"],
                "titleHi": item["titleHi"],
                "srcWebp": f"/assets/mission-01/{item['cat']}/{asset_id}.webp",
                "srcFallback": f"/assets/mission-01/{item['cat']}/{asset_id}.png",
                "width": final_w,
                "height": final_h,
                "aspectRatio": round(final_w / final_h, 4),
                "originalSource": os.path.basename(src_file),
                "origResolution": f"{orig_w}x{orig_h}",
                "enhancedResolution": f"{final_w}x{final_h}"
            })
            print(f"Generated 4K [{item['cat']}] {asset_id}: {orig_w}x{orig_h} -> {final_w}x{final_h} ({final_w/final_h:.2f} aspect)", flush=True)
            
    # Save manifest JSON
    import json
    manifest_json_path = os.path.join(r"C:\Users\HP\.gemini\antigravity\scratch\shero\public\assets", "mission01_manifest.json")
    with open(manifest_json_path, "w", encoding="utf-8") as jf:
        json.dump(manifest_entries, jf, indent=2, ensure_ascii=False)
    print(f"\nManifest JSON saved to {manifest_json_path} ({len(manifest_entries)} entries)")

if __name__ == "__main__":
    main()
