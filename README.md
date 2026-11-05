# ✨ Magical Birthday Experience

An immersive, cinematic, and interactive digital birthday experience crafted with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and synthesized Web Audio.

---

## 🚀 Running the Website

The website is already built and running on your local machine.

### Development Server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Preview:
```bash
npm run build
npm run preview
```
Open [http://localhost:4173](http://localhost:4173) in your browser.

---

## 🎨 How to Personalize for Your Friend

All personalization data is centralized in a single configuration file:
👉 **[`src/config/birthdayData.ts`](file:///C:/Users/hardi/OneDrive/Desktop/fun/src/config/birthdayData.ts)**

You do not need to touch any components or styling. Simply open `src/config/birthdayData.ts` and edit the fields:

### 1. Recipient Details (`recipient`)
```typescript
recipient: {
  name: "Alex",            // Friend's name (appears on Hero, Cake, Letter)
  nickname: "Lexi",        // Friendly nickname
  title: "To an Extraordinary Soul",
  birthDate: "Today",
  age: "Another Glorious Year",
}
```

### 2. Personal Photos & Memories (`memories.items`)
Add your own photographs (local image paths in `public/` or image URLs):
```typescript
{
  id: "mem-1",
  title: "Golden Hour Escapes",
  date: "Summer Evenings",
  caption: "Chasing sunsets that painted the sky in shades of amber and gold.",
  image: "https://your-image-url-here.jpg", // Replace with your friend's photo
  tag: "Adventure",
  note: "Your personal inside joke or story behind this photo.",
}
```
*Tip*: To use local photos, place image files inside the [`public/`](file:///C:/Users/hardi/OneDrive/Desktop/fun/public) folder (e.g. `public/photo1.jpg`) and set `image: "/photo1.jpg"`.

### 3. Handwritten Birthday Letter (`letter`)
```typescript
letter: {
  senderName: "With All My Love",
  envelopeLabel: "For Your Eyes Only",
  waxSealInitials: "★",          // 1-2 initials for the wax seal
  salutation: "Dearest Alex,",
  paragraphs: [
    "Your heartfelt paragraph 1...",
    "Your heartfelt paragraph 2...",
    "Your heartfelt paragraph 3...",
  ],
  closing: "Always cheering for you,",
  signature: "Your Best Friend",
  postScript: "P.S. Don't forget to eat extra cake! 🎂",
}
```

### 4. The Wishing Star Jar (`wishingJar.reasons`)
Customize the 6 reasons / compliments:
```typescript
{
  id: "wish-1",
  title: "Unwavering Kindness",
  message: "Personalized reason why your friend is amazing...",
  icon: "heart", // Options: 'heart' | 'sparkles' | 'shield' | 'compass' | 'gem' | 'star'
}
```

---

## 🌟 Interactive Highlights

* **Cinematic Intro**: Atmospheric opening curtain with gold teaser and glowing "Open Your Surprise ✨" button.
* **Ambient Sound Engine**: 100% synthesized Web Audio API (gentle chord progressions, candle blowout whoosh, balloon pop sparkles, celebration fanfare) — zero external MP3s to break or buffer.
* **Interactive 3D Cake**: Realistic flickering candles. Click individual candles or "Make a Wish & Blow All" to extinguish them into smoke puffs, fanfare, and a multi-stage confetti explosion. Includes a "Relight Candles" option.
* **Scrapbook Memories Gallery**: Polaroid cards with realistic taped corners, 3D tilt hover, category filters, interactive hearts counter, and full-resolution lightbox dialog.
* **Animated Wax-Seal Envelope**: 3D envelope with custom wax seal that cracks open, unfolding parchment paper with elegant Cormorant Garamond typography.
* **Floating Balloons (Easter Egg)**: Balloons drift along the edges—click or tap any balloon to pop it with a mini confetti burst and sound effect.
* **The Wishing Star Jar**: Click each floating star around the celestial jar to collect reasons why your friend is cherished.
* **Grand Finale & Fireworks**: High-performance canvas fireworks show with celebratory confetti blast, parting toast, and "Experience the Magic Again ↺" replay.
* **Floating Chapter Navigator**: Smooth-scroll pill navigation to jump directly between chapters.

---

## 🏛 Multi-Agent Architecture

* **UI/UX Designer**: Defined tokens, typography scale, glassmorphism, and WCAG AA guidelines in [`design/DESIGN_SYSTEM.md`](file:///C:/Users/hardi/OneDrive/Desktop/fun/design/DESIGN_SYSTEM.md) and [`design/AUDIT_CHECKLIST.md`](file:///C:/Users/hardi/OneDrive/Desktop/fun/design/AUDIT_CHECKLIST.md).
* **Creative Developer**: Engineered 60fps canvas stardust (`ParticleBackground.tsx`), Web Audio synth (`soundEffects.ts`), `InteractiveCake.tsx`, `FloatingBalloons.tsx`, and `FireworksOverlay.tsx`.
* **Frontend Developer**: Engineered `CinematicIntro.tsx`, `HeroSection.tsx`, `MemoriesGallery.tsx`, `EnvelopeLetter.tsx`, `WishingJar.tsx`, `GrandFinale.tsx`, and `AudioControl.tsx`.
* **Lead Orchestrator**: Scaffolding, contract design, concurrent task delegation, integration in `src/App.tsx`, build verification, and performance audits.
