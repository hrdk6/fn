import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cake, Camera, Mail, Star, Sparkles, Heart } from 'lucide-react'
import { birthdayData } from './config/birthdayData'
import { ParticleBackground } from './creative/ParticleBackground'
import { InteractiveCake } from './creative/InteractiveCake'
import { FloatingBalloons } from './creative/FloatingBalloons'
import {
  CinematicIntro,
  HeroSection,
  MemoriesGallery,
  EnvelopeLetter,
  WishingJar,
  GrandFinale,
  AudioControl,
} from './components'

export function App() {
  const [isIntroOpen, setIsIntroOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle replay: reset intro curtain and scroll to top
  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      setIsIntroOpen(false)
    }, 400)
  }, [])

  // Observe current visible section for navigation pill
  useEffect(() => {
    const sectionIds = [
      'hero-section',
      'cake-section',
      'memories-section',
      'envelope-section',
      'wishes-section',
      'grand-finale-section',
    ]

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#070913] text-[#F3F4F6] selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden font-sans">
      {/* 1. Fullscreen Cinematic Intro Overlay */}
      <CinematicIntro isOpen={isIntroOpen} onOpen={() => setIsIntroOpen(true)} />

      {/* 2. Magical 60fps Celestial Canvas Particle Background */}
      <ParticleBackground particleCount={85} />

      {/* 3. Floating Interactive Balloons (Easter Egg: Pop for Confetti) */}
      <FloatingBalloons count={8} />

      {/* 4. Ambient Web Audio Synthesizer Controller */}
      <AudioControl />

      {/* 5. Floating Chapter Navigation Pill */}
      <AnimatePresence>
        {isIntroOpen && (
          <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full glass-panel border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md"
            aria-label="Birthday Story Chapters"
          >
            <button
              onClick={() => scrollToSection('hero-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'hero-section'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Greeting</span>
            </button>

            <button
              onClick={() => scrollToSection('cake-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'cake-section'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Cake className="w-3.5 h-3.5" />
              <span>Make a Wish</span>
            </button>

            <button
              onClick={() => scrollToSection('memories-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'memories-section'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Memories</span>
            </button>

            <button
              onClick={() => scrollToSection('envelope-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'envelope-section'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Letter</span>
            </button>

            <button
              onClick={() => scrollToSection('wishes-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'wishes-section'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Star Jar</span>
            </button>

            <button
              onClick={() => scrollToSection('grand-finale-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'grand-finale-section'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Finale</span>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Birthday Journey Content */}
      <main className="relative z-10 w-full">
        {/* Section 1: Hero Greeting */}
        <HeroSection onScrollNext={() => scrollToSection('cake-section')} />

        {/* Section 2: Interactive Birthday Cake Experience */}
        <section
          id="cake-section"
          className="relative py-24 px-6 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[90vh]"
          aria-label="Birthday Cake Celebration"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 shadow-sm">
              <Cake className="w-3.5 h-3.5 text-amber-300" />
              <span>A Sweet Milestone</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-starlight mb-4">
              Blow Out Your Candles
            </h2>
            <p className="text-base sm:text-lg text-champagne/80 font-light">
              Close your eyes, make your deepest wish, and tap the candles to extinguish them into a burst of celebration!
            </p>
          </div>

          {/* 3D Tiered Interactive Cake Component */}
          <div className="w-full max-w-xl z-10">
            <InteractiveCake
              candleCount={birthdayData.cake.candleCount}
              flavorTitle={birthdayData.cake.flavorTitle}
              celebrationText={birthdayData.cake.celebrationText}
              blowInstructions={birthdayData.cake.blowInstructions}
            />
          </div>
        </section>

        {/* Section 3: Memories Photo Scrapbook */}
        <MemoriesGallery />

        {/* Section 4: Handwritten Birthday Letter */}
        <EnvelopeLetter />

        {/* Section 5: The Wishing Star Jar */}
        <WishingJar />

        {/* Section 6: Grand Finale & Toast */}
        <GrandFinale onReplay={handleReplay} />
      </main>

      {/* Footer subtle brand / copyright */}
      <footer className="relative z-10 py-8 border-t border-white/5 text-center text-xs text-gray-500">
        <p>Crafted with love for {birthdayData.recipient.name} • A memorable birthday journey</p>
      </footer>
    </div>
  )
}

export default App
