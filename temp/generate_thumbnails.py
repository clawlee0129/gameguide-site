"""
Generate 54 guide thumbnails (800x450, 16:9) for 7 anchor games.
Uses game cover images + semi-transparent overlay + title text.
Falls back to dark gradient for games without cover art.
"""
from PIL import Image, ImageDraw, ImageFont
import os, sys, textwrap

PROJECT_ROOT = r"C:\Users\morem\game-guide-site"
GAMES_DIR = os.path.join(PROJECT_ROOT, "public", "images", "games")
GUIDES_DIR = os.path.join(PROJECT_ROOT, "public", "images", "guides")
W, H = 800, 450

# Font candidates (Windows)
FONT_CANDIDATES = [
    "C:/Windows/Fonts/segoeui.ttf",
    "C:/Windows/Fonts/segoeuib.ttf",
    "C:/Windows/Fonts/arial.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
    "C:/Windows/Fonts/calibri.ttf",
    "C:/Windows/Fonts/calibrib.ttf",
]

def find_font(size):
    for fp in FONT_CANDIDATES:
        if os.path.exists(fp):
            return ImageFont.truetype(fp, size)
    return ImageFont.load_default()

def load_cover(game_slug):
    path = os.path.join(GAMES_DIR, f"{game_slug}.jpg")
    if os.path.exists(path):
        return Image.open(path).convert("RGB")
    return None

def make_gradient_bg(w, h, c1, c2):
    """Vertical linear gradient from c1 (top) to c2 (bottom)."""
    img = Image.new("RGB", (w, h))
    for y in range(h):
        ratio = y / (h - 1)
        r = int(c1[0] + (c2[0] - c1[0]) * ratio)
        g = int(c1[1] + (c2[1] - c1[1]) * ratio)
        b = int(c1[2] + (c2[2] - c1[2]) * ratio)
        for x in range(w):
            img.putpixel((x, y), (r, g, b))
    return img

def make_overlay(w, h):
    """Semi-transparent black overlay: 40% top -> 75% bottom."""
    overlay = Image.new("RGBA", (w, h))
    for y in range(h):
        ratio = y / (h - 1)
        alpha = int(102 + 89 * ratio)  # 102=40% of 255, 191=75%
        for x in range(w):
            overlay.putpixel((x, y), (0, 0, 0, alpha))
    return overlay

def wrap_text(draw, text, font, max_width):
    """Wrap text into lines fitting max_width."""
    words = text.split()
    lines = []
    current = ""
    for w in words:
        test = f"{current} {w}".strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines

# Guide data extracted from sampleData.ts
games = {
    "elden-ring": {
        "cover": "elden-ring.jpg",
        "guides": [
            {"slug": "elden-ring-complete-main-story-walkthrough", "title": "Complete Main Story Walkthrough", "difficulty": "Intermediate"},
            {"slug": "elden-ring-best-starting-class-build-guide", "title": "Best Starting Class & Build Guide", "difficulty": "Beginner"},
            {"slug": "elden-ring-all-bosses-guide", "title": "All Remembrance Bosses Guide", "difficulty": "Advanced"},
            {"slug": "elden-ring-legendary-armaments-locations", "title": "All 9 Legendary Armament Locations", "difficulty": "Intermediate"},
            {"slug": "elden-ring-shadow-of-the-erdtree-dlc-guide", "title": "Shadow of the Erdtree DLC Complete Guide", "difficulty": "Advanced"},
            {"slug": "elden-ring-blood-loss-bleed-build-guide", "title": "Ultimate Bleed Build Guide", "difficulty": "Intermediate"},
            {"slug": "elden-ring-mage-sorcery-build-guide", "title": "Pure Mage Sorcery Build Guide", "difficulty": "Beginner"},
            {"slug": "elden-ring-rune-farming-locations", "title": "Best Rune Farming Locations", "difficulty": "Beginner"},
            {"slug": "elden-ring-beginner-tips-and-tricks", "title": "50 Beginner Tips & Tricks", "difficulty": "Beginner"},
            {"slug": "elden-ring-platinum-100-percent-achievement-guide", "title": "Platinum Trophy & 100% Achievement Guide", "difficulty": "Advanced"},
        ]
    },
    "baldurs-gate-3": {
        "cover": "baldurs-gate-3.jpg",
        "guides": [
            {"slug": "baldurs-gate-3-complete-main-story-walkthrough", "title": "Complete Main Story Walkthrough", "difficulty": "Intermediate"},
            {"slug": "baldurs-gate-3-best-party-composition-guide", "title": "Best Party Composition Guide", "difficulty": "Intermediate"},
            {"slug": "baldurs-gate-3-all-romance-companions-guide", "title": "All Romance & Companions Guide", "difficulty": "Beginner"},
            {"slug": "baldurs-gate-3-legendary-items-locations", "title": "All Legendary Items Locations", "difficulty": "Intermediate"},
            {"slug": "baldurs-gate-3-paladin-smite-build-guide", "title": "Paladin Smite Build Guide", "difficulty": "Beginner"},
            {"slug": "baldurs-gate-3-dark-urge-complete-guide", "title": "Dark Urge Complete Guide", "difficulty": "Intermediate"},
            {"slug": "baldurs-gate-3-sorcerer-metamagic-build-guide", "title": "Sorcerer Metamagic Build Guide", "difficulty": "Intermediate"},
            {"slug": "baldurs-gate-3-act-1-secrets-and-missables", "title": "Act 1 Secrets & Missables", "difficulty": "Intermediate"},
            {"slug": "baldurs-gate-3-honour-mode-survival-guide", "title": "Honour Mode Survival Guide", "difficulty": "Advanced"},
            {"slug": "baldurs-gate-3-beginner-guide-for-dnd-newcomers", "title": "Beginner's Guide for D&D Newcomers", "difficulty": "Beginner"},
        ]
    },
    "zelda-totk": {
        "cover": "zelda-totk.jpg",
        "guides": [
            {"slug": "zelda-totk-complete-main-story-walkthrough", "title": "Complete Main Story Walkthrough", "difficulty": "Intermediate"},
            {"slug": "zelda-totk-all-shrine-locations-by-region", "title": "All 152 Shrine Locations by Region", "difficulty": "Intermediate"},
            {"slug": "zelda-totk-best-fusion-combinations", "title": "70+ Best Fusion Combinations", "difficulty": "Beginner"},
            {"slug": "zelda-totk-zonai-device-engineering-guide", "title": "Zonai Device Engineering Guide", "difficulty": "Advanced"},
            {"slug": "zelda-totk-armor-sets-and-upgrade-guide", "title": "All 35 Armor Sets & Upgrade Guide", "difficulty": "Intermediate"},
            {"slug": "zelda-totk-depths-exploration-and-lightroot-guide", "title": "Depths Exploration & Lightroot Guide", "difficulty": "Intermediate"},
        ]
    },
    "genshin-impact": {
        "cover": "genshin-impact.jpg",
        "guides": [
            {"slug": "genshin-impact-complete-archon-quest-walkthrough", "title": "Complete Archon Quest Walkthrough", "difficulty": "Intermediate"},
            {"slug": "genshin-impact-spiral-abyss-team-comps", "title": "Spiral Abyss Best Team Comps", "difficulty": "Advanced"},
            {"slug": "genshin-impact-best-f2p-characters-guide", "title": "Best F2P Characters Guide", "difficulty": "Beginner"},
            {"slug": "genshin-impact-artifact-farming-optimization", "title": "Artifact Farming Optimization", "difficulty": "Intermediate"},
            {"slug": "genshin-impact-elemental-reactions-explained", "title": "Elemental Reactions Explained", "difficulty": "Beginner"},
            {"slug": "genshin-impact-hu-tao-dps-build-guide", "title": "Hu Tao DPS Build Guide", "difficulty": "Intermediate"},
            {"slug": "genshin-impact-raiden-shogun-hypercarry-build", "title": "Raiden Shogun Hypercarry Build", "difficulty": "Intermediate"},
            {"slug": "genshin-impact-exploration-and-chest-locations", "title": "Exploration & Chest Locations Guide", "difficulty": "Beginner"},
            {"slug": "genshin-impact-beginners-guide-to-teyvat", "title": "Beginner's Guide to Teyvat", "difficulty": "Beginner"},
            {"slug": "genshin-impact-natlan-region-complete-guide", "title": "Natlan Region Complete Guide", "difficulty": "Intermediate"},
        ]
    },
    "cyberpunk-2077": {
        "cover": "cyberpunk-2077.jpg",
        "guides": [
            {"slug": "cyberpunk-2077-complete-main-story-walkthrough", "title": "Complete Main Story Walkthrough", "difficulty": "Intermediate"},
            {"slug": "cyberpunk-2077-best-cyberware-and-quickhack-build", "title": "Best Cyberware & Quickhack Builds (2.0+)", "difficulty": "Intermediate"},
            {"slug": "cyberpunk-2077-phantom-liberty-dlc-complete-guide", "title": "Phantom Liberty DLC Complete Guide", "difficulty": "Intermediate"},
            {"slug": "cyberpunk-2077-legendary-iconic-weapons-locations", "title": "All Legendary & Iconic Weapons Locations", "difficulty": "Intermediate"},
            {"slug": "cyberpunk-2077-romance-companions-and-endings", "title": "Romance, Companions & Endings Guide", "difficulty": "Beginner"},
            {"slug": "cyberpunk-2077-eddie-farming-and-leveling-guide", "title": "Eddie Farming & Leveling Guide", "difficulty": "Beginner"},
        ]
    },
    "hogwarts-legacy": {
        "cover": "hogwarts-legacy.jpg",
        "guides": [
            {"slug": "hogwarts-legacy-complete-main-story-walkthrough", "title": "Complete Main Story Walkthrough", "difficulty": "Intermediate"},
            {"slug": "hogwarts-legacy-all-spells-and-unlock-guide", "title": "All Spells & Unlock Guide", "difficulty": "Beginner"},
            {"slug": "hogwarts-legacy-best-talents-skill-tree-build", "title": "Best Talents & Skill Tree Build Guide", "difficulty": "Intermediate"},
            {"slug": "hogwarts-legacy-demiguise-statues-and-alohomora-guide", "title": "Demiguise Statues & Alohomora Guide", "difficulty": "Intermediate"},
            {"slug": "hogwarts-legacy-legendary-gear-and-best-equipment", "title": "Legendary Gear & Best Equipment Guide", "difficulty": "Intermediate"},
            {"slug": "hogwarts-legacy-room-of-requirement-complete-guide", "title": "Room of Requirement Complete Guide", "difficulty": "Beginner"},
        ]
    },
    "monster-hunter-wilds": {
        "cover": None,  # No cover available
        "guides": [
            {"slug": "monster-hunter-wilds-complete-main-story-walkthrough", "title": "Complete Main Story Walkthrough", "difficulty": "Intermediate"},
            {"slug": "monster-hunter-wilds-best-weapon-types-tier-list", "title": "Best Weapon Types Tier List", "difficulty": "Intermediate"},
            {"slug": "monster-hunter-wilds-armor-skills-and-deco-guide", "title": "Armor Skills & Deco Guide", "difficulty": "Intermediate"},
            {"slug": "monster-hunter-wilds-endemic-life-and-environmental-traps", "title": "Endemic Life & Environmental Traps", "difficulty": "Beginner"},
            {"slug": "monster-hunter-wilds-endgame-farming-and-crown-hunting", "title": "Endgame Farming & Crown Hunting", "difficulty": "Advanced"},
            {"slug": "monster-hunter-wilds-multiplayer-coop-and-sos-guide", "title": "Multiplayer Co-op & SOS Guide", "difficulty": "Beginner"},
        ]
    },
}

# Difficulty badge colors
DIFF_COLORS = {
    "Beginner": (34, 211, 238),     # cyan
    "Intermediate": (250, 204, 21), # amber
    "Advanced": (248, 113, 113),    # red
}

GAME_DARK_GRADIENTS = {
    "monster-hunter-wilds": ((17, 17, 24), (26, 26, 46)),
}

os.makedirs(GUIDES_DIR, exist_ok=True)

total = sum(len(g["guides"]) for g in games.values())
count = 0

for game_slug, game_data in games.items():
    game_dir = os.path.join(GUIDES_DIR, game_slug)
    os.makedirs(game_dir, exist_ok=True)

    cover_img = load_cover(game_slug)

    for guide in game_data["guides"]:
        out_path = os.path.join(game_dir, f"{guide['slug']}.jpg")

        if cover_img:
            # Resize cover to 800x450 with crop-preserving aspect ratio
            cw, ch = cover_img.size
            target_ratio = W / H
            cover_ratio = cw / ch

            if cover_ratio > target_ratio:
                # Cover wider — crop sides
                new_width = int(ch * target_ratio)
                left = (cw - new_width) // 2
                cropped = cover_img.crop((left, 0, left + new_width, ch))
            else:
                # Cover taller — crop top/bottom
                new_height = int(cw / target_ratio)
                top = (ch - new_height) // 2
                cropped = cover_img.crop((0, top, cw, top + new_height))

            base = cropped.resize((W, H), Image.LANCZOS)
        else:
            # Dark gradient fallback
            c1, c2 = GAME_DARK_GRADIENTS.get(game_slug, ((17, 17, 24), (26, 26, 46)))
            base = make_gradient_bg(W, H, c1, c2)

        base = base.convert("RGBA")

        # Apply overlay
        overlay = make_overlay(W, H)
        base = Image.alpha_composite(base, overlay)

        draw = ImageDraw.Draw(base)

        # Title text at bottom-left
        title = guide["title"]
        title_font = find_font(28)
        max_text_width = W - 80  # padding

        lines = wrap_text(draw, title, title_font, max_text_width)
        if len(lines) > 2:
            lines = lines[:2]
            # Truncate and add ellipsis if too long
            while len(lines) == 2:
                bbox2 = draw.textbbox((0, 0), lines[1], font=title_font)
                if bbox2[2] - bbox2[0] <= max_text_width - 40:
                    break
                lines[1] = lines[1][:-4] + "..."
                bbox2 = draw.textbbox((0, 0), lines[1], font=title_font)

        line_height = title_font.size + 6
        total_text_height = line_height * len(lines)
        y_start = H - 30 - total_text_height

        for i, line in enumerate(lines):
            y = y_start + i * line_height
            # Shadow
            draw.text((42, y + 2), line, font=title_font, fill=(0, 0, 0, 180))
            # White text
            draw.text((40, y), line, font=title_font, fill=(255, 255, 255, 255))

        # Difficulty badge at top-right
        diff = guide["difficulty"]
        diff_color = DIFF_COLORS.get(diff, (160, 160, 160))
        badge_font = find_font(18)
        badge_text = diff.upper()
        badge_bbox = draw.textbbox((0, 0), badge_text, font=badge_font)
        badge_w = badge_bbox[2] - badge_bbox[0] + 24
        badge_h = badge_bbox[3] - badge_bbox[1] + 14
        badge_x = W - badge_w - 20
        badge_y = 20

        # Badge background
        draw.rounded_rectangle(
            [badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
            radius=6,
            fill=(0, 0, 0, 160),
        )
        # Badge dot
        draw.ellipse(
            [badge_x + 10, badge_y + badge_h//2 - 3, badge_x + 16, badge_y + badge_h//2 + 3],
            fill=diff_color,
        )
        # Badge text
        draw.text(
            (badge_x + 22, badge_y + 7),
            badge_text,
            font=badge_font,
            fill=diff_color,
        )

        # Convert back to RGB and save as JPEG
        base = base.convert("RGB")
        base.save(out_path, "JPEG", quality=85)
        count += 1

        if count % 10 == 0:
            print(f"  Generated {count}/{total}...")

print(f"\nDone. Generated {count} thumbnails in {GUIDES_DIR}")
