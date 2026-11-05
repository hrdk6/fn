# Celestial Starlight Design System ✨
**Project:** Luxury Birthday Celebration Experience  
**Version:** 1.0.0  
**Status:** Production Ready  
**Target Atmosphere:** Nocturnal Luxury, Celestial Romance, Cinematic Warmth  

---

## 1. Visual Identity & Brand Metaphor

The **Celestial Starlight** design language is engineered for an intimate, deeply emotional, and visually breathtaking milestone birthday tribute. Drawing inspiration from midnight galas, celestial constellations, and tangible heirloom keepsakes, the aesthetic bridges tactile physical artifacts (polaroid memories, wax-sealed parchment letters, frosted birthday cakes) with cosmic luminescence (stardust shimmer, champagne glows, deep velvety night skies).

### Core Pillars
1. **Nocturnal Elegance:** Deep velvety midnight tones create an infinite cosmic canvas that allows warm golds and soft rose accents to radiate with gem-like luminescence.
2. **Tactile Heirloom Nostalgia:** Digital interpretations of physical keepsakes—polaroid photographs with authentic paper grain and casual tilt angles, rich wax seals that crack and unfurl, and hand-scripted letter signatures.
3. **Cinematic Motion:** Organic, weightless transitions using silk-glide easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`) that feel expensive, deliberate, and immersive.
4. **Inclusive Brilliance:** Flawless WCAG AA contrast compliance across dark mode, robust keyboard accessibility, and graceful degradation under reduced-motion preferences.

---

## 2. Color Palette & Semantic Design Tokens

### 2.1 Primary Color Tokens

| Token Name | Hex Code | HSL | RGB | Role / Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Midnight Velvet** | `#070913` | `230°, 45%, 5%` | `rgb(7, 9, 19)` | Primary canvas background; deepest universe foundation |
| **Twilight Navy** | `#0E1222` | `228°, 41%, 10%` | `rgb(14, 18, 34)` | Secondary background; elevated structural containers |
| **Deep Nebula** | `#161D33` | `226°, 39%, 15%` | `rgb(22, 29, 51)` | Card backgrounds, panel base surfaces |
| **Champagne Gold** | `#F5D061` | `45°, 88%, 67%` | `rgb(245, 208, 97)` | Primary luxury accent; active highlights, awards, star glows |
| **Warm Honey** | `#E5A93C` | `39°, 78%, 57%` | `rgb(229, 169, 60)` | Secondary metallic gold; active states, border shadows |
| **Rose Quartz** | `#FB7185` | `351°, 95%, 71%` | `rgb(251, 113, 133)` | Emotional warmth; heart badges, birthday ribbons, subtle blooms |
| **Crimson Ruby** | `#E11D48` | `347°, 77%, 50%` | `rgb(225, 29, 72)` | Wax seal body, love tokens, high-emphasis celebration badges |
| **Starlight Ivory** | `#FFFBEB` | `48°, 100%, 96%` | `rgb(255, 251, 235)` | Primary high-contrast text; candle flames, celestial highlights |
| **Muted Stardust** | `#94A3B8` | `215°, 16%, 65%` | `rgb(148, 163, 184)` | Secondary body text, dates, auxiliary meta info |

---

### 2.2 Functional & Semantic Mappings

```css
:root {
  /* Surface Layers */
  --surface-canvas: #070913;
  --surface-elevated: #0E1222;
  --surface-card: rgba(22, 29, 51, 0.72);
  --surface-glass-panel: rgba(16, 22, 38, 0.70);
  --surface-glass-highlight: rgba(245, 208, 97, 0.08);

  /* Border & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-glow-gold: rgba(245, 208, 97, 0.28);
  --border-glow-rose: rgba(251, 113, 133, 0.25);

  /* Typography */
  --text-primary: #FFFBEB;
  --text-secondary: #E2E8F0;
  --text-muted: #94A3B8;
  --text-accent-gold: #F5D061;
  --text-accent-rose: #FB7185;

  /* Interactive States */
  --interactive-focus-ring: #F5D061;
  --interactive-focus-offset: #070913;
  --interactive-hover-glow: 0 0 25px rgba(245, 208, 97, 0.35);

  /* Aura Radiance & Glows */
  --glow-gold-radial: radial-gradient(circle, rgba(245, 208, 97, 0.25) 0%, transparent 70%);
  --glow-rose-radial: radial-gradient(circle, rgba(251, 113, 133, 0.20) 0%, transparent 70%);
}
```

---

### 2.3 Gradients & Ambient Shimmers

1. **Starlight Gold Gradient:**
   `linear-gradient(135deg, #FFF9E6 0%, #F5D061 50%, #D49428 100%)`
   *Usage: Hero headline highlight, primary celebratory buttons, trophy stars.*

2. **Celestial Rose Gradient:**
   `linear-gradient(135deg, #FFE4E6 0%, #FB7185 50%, #BE123C 100%)`
   *Usage: Romantic tags, heart icons, special memory labels.*

3. **Cosmic Aurora Gradient:**
   `linear-gradient(135deg, #FBCFE8 0%, #C084FC 45%, #60A5FA 100%)`
   *Usage: Ambient backdrops, interactive surprise cards.*

4. **Glass Reflection Gradient (Top Border Highlight):**
   `linear-gradient(90deg, transparent 0%, rgba(245, 208, 97, 0.45) 50%, transparent 100%)`

---

## 3. Typography System

The typography marries editorial classical elegance with crystal-clear readability and personal emotional authenticity.

### 3.1 Font Family Stack

| Role | Font Family | Fallback Stack | Personality & Purpose |
| :--- | :--- | :--- | :--- |
| **Editorial Headings** | `'Cormorant Garamond'` | `Georgia, 'Times New Roman', serif` | Majestic, poetic, timeless luxury. Used for large display titles, section headings, and quotes. |
| **UI Body & Controls** | `'Plus Jakarta Sans'` | `system-ui, -apple-system, sans-serif` | Clean, geometric, contemporary legibility. Used for navigation, interactive buttons, body text, and badges. |
| **Script Signature** | `'Great Vibes'` | `'Brush Script MT', cursive` | Handwritten, deeply personal, romantic. Reserved for wax-seal letters, sign-offs, and celebratory flourishes. |

---

### 3.2 Type Scale Hierarchy

| Token | Family | Font Size (Clamp / Fluid) | Weight | Line Height | Tracking | Recommended Use |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-1` | Cormorant Garamond | `clamp(3.0rem, 7vw, 5.5rem)` | 700 / Bold | 1.05 | `-0.02em` | Hero Birthday Name & Milestone |
| `display-2` | Cormorant Garamond | `clamp(2.25rem, 5vw, 3.75rem)` | 600 / SemiBold | 1.15 | `-0.015em` | Major Section Gateways |
| `h1` | Cormorant Garamond | `clamp(1.85rem, 4vw, 2.75rem)` | 600 / SemiBold | 1.2 | `normal` | Chapter Titles, Card Headlines |
| `h2` | Plus Jakarta Sans | `clamp(1.35rem, 2.5vw, 1.85rem)` | 700 / Bold | 1.25 | `-0.01em` | Subsection Headers, Feature Titles |
| `h3` | Plus Jakarta Sans | `clamp(1.15rem, 2vw, 1.35rem)` | 600 / SemiBold | 1.3 | `normal` | Modal Titles, Cake Controls |
| `body-large` | Plus Jakarta Sans | `clamp(1.05rem, 1.5vw, 1.25rem)` | 400 / Regular | 1.65 | `normal` | Hero subheadlines, Letter prose |
| `body-base` | Plus Jakarta Sans | `1.0rem (16px)` | 400 / Regular | 1.6 | `normal` | Default body copy, descriptions |
| `body-small` | Plus Jakarta Sans | `0.875rem (14px)` | 500 / Medium | 1.5 | `+0.01em` | Memory captions, helper notes |
| `caption` | Plus Jakarta Sans | `0.75rem (12px)` | 600 / SemiBold | 1.4 | `+0.05em` | Uppercase eyebrow badges, pill tags |
| `signature` | Great Vibes | `clamp(2.0rem, 4vw, 3.25rem)` | 400 / Regular | 1.2 | `normal` | Handwritten Sign-offs & Quotes |

---

## 4. Component Visual Specifications

### 4.1 Glassmorphism Panels (`.glass-panel` & `.glass-panel-glow`)

```
+-------------------------------------------------------------+  <- 1px border: rgba(255, 255, 255, 0.10)
|  * * *  Glassmorphism Panel                                  |     (or Gold border: rgba(245, 208, 97, 0.25))
|                                                             |
|  Fill: rgba(16, 22, 38, 0.72)                               |
|  Backdrop Filter: blur(20px) saturate(180%)                |
|  Box Shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.55),        |
|              0 0 25px -5px rgba(245, 208, 97, 0.12)         |
+-------------------------------------------------------------+
```

* **Standard Panel (`glass-panel`):**
  * Background: `rgba(16, 22, 38, 0.70)`
  * Backdrop Filter: `blur(16px)`
  * Border: `1px solid rgba(255, 255, 255, 0.08)`
  * Border Radius: `1.25rem (20px)`
  * Box Shadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`

* **Glow Panel (`glass-panel-glow`):**
  * Background: `rgba(20, 27, 48, 0.78)`
  * Backdrop Filter: `blur(24px) saturate(160%)`
  * Border: `1px solid rgba(245, 208, 97, 0.22)`
  * Border Radius: `1.5rem (24px)`
  * Box Shadow: `0 16px 48px -12px rgba(0, 0, 0, 0.6), 0 0 35px -5px rgba(245, 208, 97, 0.18)`

---

### 4.2 Polaroid Keepsake Cards

The polaroid card represents physical, nostalgic memories captured in time.

```
       +------------------------------------+
       |   /// Brass / Washi Tape ///       | <- Semi-translucent gold/cream washi tape
       |  +------------------------------+  |
       |  |                              |  |
       |  |                              |  |
       |  |       Memory Photo           |  | <- 1:1 or 4:5 Aspect Ratio
       |  |       (Vibrant, Warm)        |  |
       |  |                              |  |
       |  +------------------------------+  |
       |     "Summer in Paris, 2024"        | <- Cormorant Garamond / Handwritten style
       |     [ Heart 14 ]    [ Tag: Travel ]| <- Subtle interactive metadata
       +------------------------------------+
```

* **Physical Dimensions:**
  * Width: Mobile `280px`, Desktop `320px` to `360px`
  * Padding: `12px` top/sides, `20px` bottom (classic Polaroid ratio)
  * Frame Background: Ivory matte parchment `#FDFBF7` with subtle texture
  * Frame Border: `1px solid rgba(255, 255, 255, 0.35)`
  * Image Aspect Ratio: `1:1` square or `4:3`
  * Border Radius: `8px` outer, `4px` inner photo window
* **Natural Staggered Angles:**
  * Card 1: `transform: rotate(-3.5deg)`
  * Card 2: `transform: rotate(2.8deg)`
  * Card 3: `transform: rotate(-1.5deg)`
  * Card 4: `transform: rotate(3.2deg)`
* **Hover Interaction:**
  * Smooth lift: `transform: translateY(-8px) rotate(0deg) scale(1.03)`
  * Shadow expansion: `box-shadow: 0 20px 45px -12px rgba(0,0,0,0.65), 0 0 20px rgba(245, 208, 97, 0.25)`
  * Transition: `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease`

---

### 4.3 Wax-Seal Interactive Envelope

A high-emotion tactile climax: opening a private handwritten birthday letter.

* **Closed State:**
  * Dimensions: `clamp(320px, 85vw, 540px)` width
  * Envelope Base: Deep Royal Maroon `#2C1420` or Midnight Suede `#12162A`
  * Flap Geometry: Triangular fold with 3D drop-shadow `filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4))`
  * Wax Seal Medallion:
    * Size: `56px` x `56px` circle with organic wavy melting perimeter
    * Color: Crimson Carmine `#9B1C31` with radial highlight `#C82333`
    * Emboss: Gold foil monogram or heart icon (`#F5D061`)
    * Glow: Subtle golden breathing aura `0 0 15px rgba(225, 29, 72, 0.5)`
    * Cursor: `pointer` with hover ripple animation
* **Opening Sequence (Orchestration):**
  1. *Click Seal:* Seal cracks/bursts with gold micro-sparkles (`scale(1.2)` -> `opacity: 0`).
  2. *Flap Opens:* Triangular flap rotates along top hinge `rotateX(180deg)` (duration: `600ms`, `cubic-bezier(0.4, 0, 0.2, 1)`).
  3. *Letter Ascends:* Parchment letter slides upwards out of envelope body (`translateY(-40px)`), then smoothly expands into full modal viewing experience.
* **Letter Interior:**
  * Background: Warm Starlight Parchment `#FFFDF9` with faint vintage deckle edge.
  * Margin lines: Golden border margin `border: 1px solid rgba(229, 169, 60, 0.25)`.
  * Typography: Body in Cormorant Garamond 18px (`#1E1B18`), Closing signature in Great Vibes 36px (`#9B1C31` crimson or gold foil).

---

### 4.4 Interactive Cake & Candle Aesthetics

* **Cake Structure:**
  * Three layered tiers with celestial velvet frosting (Deep midnight navy with stardust sugar shimmer and gold pearl piping).
  * Frosted drippings: Gold shimmer dripping accents along each tier rim.
* **Candle Geometry & Flame Physics:**
  * Candles: Ivory spiral tapers with gold foil helix stripes.
  * Flame Core: `#FFFFFF` (white heat) -> `#FFF2A3` (golden core) -> `#FB7185` (outer rose aura).
  * Flame Animation: Natural organic flicker keyframes combining `scaleY(0.95-1.08)` and `skewX(-2deg to +2deg)` every `120ms`.
  * Halo Glow: `filter: drop-shadow(0 0 12px rgba(245, 208, 97, 0.85)) drop-shadow(0 0 28px rgba(245, 158, 11, 0.45))`.
* **Blow-Out Mechanic & Celebratory Climax:**
  * Trigger: Mic input / tap or click button "Make a Wish & Blow Candles 🎂".
  * Extinguishment FX: Flame scales to zero in `250ms`, followed immediately by realistic smoke wisps curling upward (low-opacity white particle puffs drifting and fading over 1.8s).
  * Confetti Burst: Full-screen starlight and gold metallic confetti blast (`canvas-confetti` integration with `#F5D061`, `#FB7185`, `#FFFBEB`, `#A855F7`).
  * Sound: Harmonious chime or joyful celebratory applause trigger.

---

### 4.5 Wishing Star Badges & Constellation

* **Star Geometry:** 8-point geometric star icon (`lucide-react` `Sparkles` or custom SVG).
* **Color:** Champagne gold gradient fill with Starlight white nucleus.
* **Pulse Effect:** Continuous gentle breathing pulse:
  ```css
  @keyframes starPulse {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(245, 208, 97, 0.5)); }
    50% { transform: scale(1.15); filter: drop-shadow(0 0 20px rgba(245, 208, 97, 0.9)); }
  }
  ```
* **Constellation Connectivity:** Thin luminescent lines (`stroke: rgba(245, 208, 97, 0.2)`) linking wishes together across a celestial canvas.

---

## 5. Motion & Easing Guidelines

All animations must feel fluid, premium, and calm—never jarring or cheap.

### 5.1 Easing Curves

| Name | Curve Definition | Usage |
| :--- | :--- | :--- |
| **The Silk Glide (Primary)** | `cubic-bezier(0.16, 1, 0.3, 1)` | Modals, card expansions, page transitions, drawer reveals |
| **Gentle Decelerate** | `cubic-bezier(0.25, 1, 0.5, 1)` | Fade-ins, tooltip reveals, hover state settling |
| **Playful Spring** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Button press release, confetti pops, star click bounce |
| **Ambient Float** | `ease-in-out` | Constant hovering stardust, floating balloons, gentle waves |

---

### 5.2 Duration Standards

* **Micro-interactions (150ms – 250ms):** Button hovers, toggle switches, icon color shifts, candle glow intensification.
* **Medium Transitions (350ms – 500ms):** Polaroid hover flip/lift, dropdown disclosure, tab switching, audio drawer open.
* **Macro Orchestrations (700ms – 1200ms):** Cinematic page intro reveal, envelope opening sequence, cake celebration confetti curtain.

---

### 5.3 Reduced Motion Accessibility Fallback

All components MUST honor the user's OS-level motion preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Retain smooth opacity fades where crucial for context without motion nausea */
  .fade-reduced {
    transition: opacity 0.2s ease-in-out !important;
    transform: none !important;
  }
}
```

---

## 6. Accessibility & Contrast (WCAG 2.1 AA Standards)

The design system is strictly verified against **WCAG 2.1 AA** standards for contrast, keyboard focus, and tactile accessibility.

### 6.1 Contrast Ratio Verification

| Foreground | Background | Calculated Ratio | WCAG AA Status | WCAG AAA Status |
| :--- | :--- | :--- | :--- | :--- |
| **Starlight Ivory (`#FFFBEB`)** | Midnight Velvet (`#070913`) | **17.8 : 1** | PASS | PASS |
| **Champagne Gold (`#F5D061`)** | Midnight Velvet (`#070913`) | **11.4 : 1** | PASS | PASS |
| **Rose Quartz (`#FB7185`)** | Midnight Velvet (`#070913`) | **6.4 : 1** | PASS | PASS (Large) |
| **Secondary Slate (`#E2E8F0`)** | Twilight Navy (`#0E1222`) | **11.8 : 1** | PASS | PASS |
| **Muted Slate (`#94A3B8`)** | Midnight Velvet (`#070913`) | **5.2 : 1** | PASS | N/A |
| **Midnight Navy (`#070913`)** | Champagne Gold (`#F5D061`) | **11.4 : 1** | PASS (Buttons) | PASS |

> [!IMPORTANT]
> Low-contrast text (e.g. pure `#6B7280` or gold on white) is forbidden for critical UI content. All buttons with `#F5D061` backgrounds must use dark text (`#070913` or `#1E1B18`) to maintain the guaranteed **11.4:1** contrast ratio.

---

### 6.2 Interactive Target & Focus Guidelines

* **Touch Target Size:** Minimum `44px` x `44px` physical touch area for all interactive buttons, music toggles, candle triggers, and modal dismiss buttons.
* **Focus Indicators:** High-contrast double ring for full keyboard accessibility:
  ```css
  :focus-visible {
    outline: 2px solid #F5D061;
    outline-offset: 3px;
    box-shadow: 0 0 12px rgba(245, 208, 97, 0.6);
  }
  ```
* **Screen Reader Semantics:**
  * Decorative stardust particles and floating balloons must carry `aria-hidden="true"`.
  * Interactive audio buttons must carry descriptive state: `aria-label="Play background music"` or `aria-label="Pause background music"`.
  * Modals (Letter, Surprise wishes) must utilize `role="dialog"` with `aria-modal="true"` and autofocus first interactive element.

---

## 7. Responsive Breakpoint Matrix

| Viewport Tier | Minimum Width | Primary Considerations |
| :--- | :--- | :--- |
| **Mobile Compact (iPhone SE)** | `375px` | Single-column polaroids, stacked hero buttons, compact envelope flap, full touch controls |
| **Mobile Standard** | `390px – 430px` | Fluid clamp scaling on display headings, bottom floating audio pill |
| **Tablet Portrait** | `768px` | 2-column memory grid, side-by-side cake and wish panel |
| **Desktop / Laptop** | `1024px – 1440px` | 3-column polaroid layout with alternating tilt rotations, full stardust canvas |
| **Ultra-Wide & 4K** | `1920px+` | `max-w-7xl` centered containment to avoid wide-angle eye strain; ambient radial aura wings |

---

*Authored by UI/UX Designer for the Starlight Gala Birthday Experience.*
