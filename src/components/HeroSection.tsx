import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ChevronDown, Heart, Star } from 'lucide-react'
import { birthdayData } from '../config/birthdayData'

export interface HeroSectionProps {
  onScrollNext?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollNext }) => {
  const { hero, recipient } = birthdayData

  const handleScrollClick = () => {
    if (onScrollNext) {
      onScrollNext()
      return
    }
    const nextElem = document.getElementById('memories-section') || document.getElementById('envelope-section')
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 overflow-hidden"
      aria-label="Birthday Hero Greeting"
    >
      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Accent Stars */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-[10%] hidden md:flex items-center justify-center w-12 h-12 rounded-full glass-panel border border-amber-300/30 text-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
      >
        <Star className="w-5 h-5 fill-amber-300/40 text-amber-300" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-28 right-[12%] hidden md:flex items-center justify-center w-10 h-10 rounded-full glass-panel border border-rose-300/30 text-rose-300 shadow-[0_0_20px_rgba(251,113,133,0.2)]"
      >
        <Heart className="w-4 h-4 fill-rose-300/40 text-rose-300" />
      </motion.div>

      {/* Top Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel-glow border border-amber-400/40 mb-6 shadow-lg shadow-amber-500/10"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200">
          {hero.badgeText}
        </span>
      </motion.div>

      {/* Sub-label dedication */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="text-xs sm:text-sm uppercase tracking-[0.25em] text-champagne/70 font-medium mb-3"
      >
        {recipient.title}
      </motion.p>

      {/* Grand Birthday Greeting */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
        className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-starlight mb-6 max-w-5xl leading-[1.08]"
      >
        {hero.headline}{' '}
        <span className="gold-gradient-text drop-shadow-[0_4px_30px_rgba(250,204,21,0.35)] inline-block">
          {hero.highlightWord}
        </span>
      </motion.h1>

      {/* Heartfelt Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="text-base sm:text-lg md:text-xl text-starlight/85 max-w-2xl font-light leading-relaxed mb-12 drop-shadow"
      >
        {hero.subheadline}
      </motion.p>

      {/* Interactive Quick Action / Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex flex-col items-center gap-3 cursor-pointer group"
        onClick={handleScrollClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleScrollClick()
          }
        }}
        aria-label="Begin the Journey and scroll down"
      >
        <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-champagne/80 group-hover:text-amber-300 transition-colors">
          Begin the Journey
        </span>
        <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border border-amber-300/30 group-hover:border-amber-300/80 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all">
          <ChevronDown className="w-5 h-5 text-amber-300 animate-bounce group-hover:text-amber-200" />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
