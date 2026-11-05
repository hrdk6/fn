import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, RotateCcw, Heart, Flame } from 'lucide-react'
import { birthdayData } from '../config/birthdayData'
import { FireworksOverlay } from '../creative/FireworksOverlay'
import { playFanfareSound } from '../creative/soundEffects'
import confetti from 'canvas-confetti'

export interface GrandFinaleProps {
  onReplay?: () => void
}

export const GrandFinale: React.FC<GrandFinaleProps> = ({ onReplay }) => {
  const { finale, recipient } = birthdayData
  const [fireworksActive, setFireworksActive] = useState(true)

  const handleLaunchMoreFireworks = () => {
    playFanfareSound()
    setFireworksActive(true)

    // Explosive celebration burst
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.55 },
      colors: ['#FDE047', '#FACC15', '#FB7185', '#C084FC', '#60A5FA', '#34D399'],
      startVelocity: 45,
    })
  }

  const handleReplay = () => {
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (onReplay) {
      onReplay()
    }
  }

  return (
    <section
      id="grand-finale-section"
      className="relative py-28 px-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[85vh]"
      aria-label="Grand Celebration Finale"
    >
      {/* Background Fireworks FX Overlay */}
      <FireworksOverlay isActive={fireworksActive} intensity="grand" />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Heartfelt Toast Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full glass-panel-glow border border-amber-400/40 text-amber-200 text-sm sm:text-base font-semibold mb-8 shadow-[0_0_25px_rgba(250,204,21,0.2)]"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{finale.toastText}</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </motion.div>

        {/* Finale Main Headline */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-starlight mb-6 leading-tight max-w-2xl"
        >
          {finale.title}
        </motion.h2>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-champagne/90 font-light leading-relaxed max-w-xl mb-12"
        >
          {finale.message}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-16"
        >
          {/* Fireworks Burst Trigger */}
          <button
            type="button"
            onClick={handleLaunchMoreFireworks}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-midnight font-bold text-base shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:scale-105 active:scale-95 transition-transform"
          >
            <Flame className="w-5 h-5 text-midnight animate-bounce" />
            <span>Light Up More Fireworks! 🎆</span>
          </button>

          {/* Replay Magic Button */}
          <button
            type="button"
            onClick={handleReplay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full glass-panel border border-amber-300/40 text-starlight font-semibold text-base hover:border-amber-300 hover:text-amber-300 transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-amber-300" />
            <span>{finale.replayButtonText}</span>
          </button>
        </motion.div>

        {/* Farewell Footer Dedication */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="border-t border-white/10 pt-8 w-full flex flex-col items-center gap-2 text-xs sm:text-sm text-starlight/60 font-light"
        >
          <div className="flex items-center gap-2">
            <span>{finale.farewellWish}</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Celebrating {recipient.name}</span>
          </div>
          <span className="text-[11px] text-starlight/40 font-mono tracking-wider">
            Forever Cherished • Never Forgotten
          </span>
        </motion.footer>
      </div>
    </section>
  )
}

export default GrandFinale
