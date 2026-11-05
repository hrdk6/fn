import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Gift } from 'lucide-react'
import { birthdayData } from '../config/birthdayData'
import { playChimeSound, startAmbientMelody } from '../creative/soundEffects'
import confetti from 'canvas-confetti'

export interface CinematicIntroProps {
  isOpen: boolean
  onOpen: () => void
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ isOpen, onOpen }) => {
  const [isTriggering, setIsTriggering] = useState(false)
  const { cinematicIntro, recipient } = birthdayData

  const handleUnlock = () => {
    if (isTriggering) return
    setIsTriggering(true)

    // Sound and sensory trigger
    playChimeSound()
    startAmbientMelody()

    // Confetti celebration burst
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#FDE047', '#FACC15', '#FB7185', '#C084FC', '#60A5FA', '#FFFFFF'],
      startVelocity: 35,
      gravity: 0.85,
    })

    // Slight delay for smooth visual transition
    setTimeout(() => {
      onOpen()
    }, 400)
  }

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="cinematic-curtain"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(20px)',
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#070913] px-6 select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Birthday Surprise Introduction"
        >
          {/* Ambient Cosmic Background Lighting */}
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-[#0e1224]/80 to-[#070913] pointer-events-none" />
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

          {/* Central Interactive Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
            className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center"
          >
            {/* Top Atmospheric Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(250,204,21,0.15)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>A Personal Celebration For {recipient.name}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </motion.div>

            {/* Teaser Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-starlight italic leading-relaxed md:leading-normal mb-6 tracking-wide drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
            >
              "{cinematicIntro.teaserQuote}"
            </motion.blockquote>

            {/* Atmospheric Prelude */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.9 }}
              className="text-sm sm:text-base text-champagne/80 font-light tracking-widest uppercase mb-12 max-w-md"
            >
              {cinematicIntro.preludeText}
            </motion.p>

            {/* Glowing Call to Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="relative group cursor-pointer"
            >
              {/* Outer Pulsing Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-700 group-hover:scale-105 animate-pulse-glow" />

              {/* Main Button */}
              <button
                type="button"
                onClick={handleUnlock}
                disabled={isTriggering}
                className="relative flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-midnight font-semibold text-base sm:text-lg shadow-[0_0_35px_rgba(250,204,21,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
                aria-label={cinematicIntro.buttonText}
              >
                <Gift className="w-5 h-5 text-midnight animate-bounce" />
                <span className="tracking-wide">{cinematicIntro.buttonText}</span>
              </button>
            </motion.div>

            {/* Subtle whisper prompt */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="text-xs text-starlight/50 tracking-wider mt-6 font-light"
            >
              Best experienced with sound enabled ♫
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CinematicIntro
