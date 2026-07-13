# Product Image Regeneration Specs

Goal: every product hero should match the **Self Discovery** benchmark —
a single hardcover on a neutral flat-lay, dark cover, gold-foil detail, the
Sapphire Scroll emblem, soft daylight. That image is now live and is the look
to copy for the rest of the range.

## Non-negotiable output rules

| Rule | Value |
|---|---|
| **Aspect ratio** | 3:4 portrait (this is what the product cards + gallery expect) |
| **Resolution** | 1500 × 2000 px (min 1200 × 1600) |
| **Composition** | ONE object, centred, generous neutral margin. A cover shot — not an interior page |
| **Background** | Warm neutral flat-lay: bone / oat / greige. No props competing with the product |
| **Light** | Soft, single-source daylight; gentle shadow bottom-right |
| **Palette** | Cover colour + **gold foil** only. Keep it to the brand's navy / plum / forest / ivory |
| **Emblem** | Include the Sapphire Scroll lotus mark on the cover or back |
| **⚠️ TEXT** | AI image tools garble text. Either **generate the cover blank and add the title in Photoshop/Canva**, or generate title-free and letter it after. Do **not** ship AI-rendered lettering — every rejected image failed here ("BE PRSENT", "BEER OG'G GOOD", "The Gentle Pau"). |

> Tip: also shoot a **second frame** — the back cover with just the emblem,
> centred — to use as the gallery's secondary image (exactly what Self Discovery
> now does).

---

## Per-product prompts

### 1. The Shift — Productivity Journal  *(replaces the kraft "monthly calendar" shots)*
```
A single luxury hardcover planner standing on a warm bone flat-lay background,
photographed straight-on. Deep navy linen cover with subtle gold-foil detailing
and a small gold lotus emblem. Soft natural daylight, gentle shadow, minimal and
premium. Editorial product photography. Portrait 3:4. Cover left blank for
title (added later).
```

### 2. The Gentle Pause  *(replaces the "vision board" page + cut-off text)*
```
A single luxury hardcover journal on a soft greige flat-lay, straight-on.
Deep plum cover embossed with a fine geometric gold pattern, small gold lotus
emblem. Soft daylight, subtle shadow, quiet and expensive feel. Editorial
product photography. Portrait 3:4. No text on cover.
```

### 3. Inner Alchemy  *(replaces the lined interior page)*
```
A single minimalist hardcover notebook on an oat-coloured flat-lay, straight-on.
Ivory cloth cover with one delicate hand-drawn botanical line illustration in
soft brown, small gold lotus emblem near the base. Soft daylight, understated
and luxurious. Editorial product photography. Portrait 3:4. No text on cover.
```

### 4. The Ritual Edit — card deck  *(replaces the fanned deck with garbled card text)*
Two options, pick one:
- **Cleanest:** a **closed deck** in a luxe rigid box / banded stack on a neutral
  flat-lay — no legible card faces, so no text to garble.
- **If you want the fan:** generate the cards **blank** (jewel tones + gold
  edges + line icons only) and set the real prompt text in Photoshop/Canva after.
```
A luxury self-care card deck presented as a neat banded stack and its rigid gift
box, on a warm neutral flat-lay. Jewel-tone cards (forest, plum, terracotta,
teal) with gilded edges and a soft-touch finish, small gold lotus emblem on the
box. Soft daylight, premium and tactile. Editorial product photography.
Portrait 3:4. No text visible on the cards.
```

---

## When you have the new files

Drop them in `images/` and I'll wire them into the catalog. The code reads image
paths from:
- `js/main.js` → `PRODUCTS[...].images[]` (product page gallery)
- `index.html` and `shop.html` → `<img class="product-img-primary/secondary">`

Send me the filenames (or just the new folder) and I'll crop to a clean 3:4,
compress, and swap every reference in one pass.
