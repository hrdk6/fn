import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Heart,
  Shield,
  Star,
  Compass,
  Gem,
  CheckCircle2,
  X,
  Trophy,
} from 'lucide-react'
import { birthdayData, type SurpriseWish } from '../config/birthdayData'
import { playFanfareSound, playPopSound } from '../creative/soundEffects'
import confetti from 'canvas-confetti'

// Helper to map icon names to Lucide components
const renderWishIcon = (iconName?: string, className = 'w-6 h-6') => {
  switch (iconName?.toLowerCase()) {
    case 'heart':
      return <Heart className={`${className} text-rose-400 fill-rose-400/40`} />
    case 'sparkles':
      return <Sparkles className={`${className} text-amber-300 fill-amber-300/40`} />
    case 'shield':
      return <Shield className={`${className} text-cyan-400 fill-cyan-400/40`} />
    case 'compass':
      return <Compass className={`${className} text-emerald-400 fill-emerald-400/40`} />
    case 'gem':
      return <Gem className={`${className} text-purple-400 fill-purple-400/40`} />
    case 'star':
    default:
      return <Star className={`${className} text-amber-300 fill-amber-300/40`} />
  }
}

export const WishingJar: React.FC = () => {
  const { wishingJar } = birthdayData
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([])
  const [activeWish, setActiveWish] = useState<SurpriseWish | null>(null)
  const [hasCelebratedAll, setHasCelebratedAll] = useState(false)

  const totalReasons = wishingJar.reasons.length
  const discoveredCount = discoveredIds.length
  const allDiscovered = discoveredCount === totalReasons

  const handleStarClick = (wish: SurpriseWish) => {
    playPopSound()
    setActiveWish(wish)

    if (!discoveredIds.includes(wish.id)) {
      const nextDiscovered = [...discoveredIds, wish.id]
      setDiscoveredIds(nextDiscovered)

      // When all stars are collected for the first time
      if (nextDiscovered.length === totalReasons && !hasCelebratedAll) {
        setHasCelebratedAll(true)
        setTimeout(() => {
          playFanfareSound()
          confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FDE047', '#FACC15', '#FB7185', '#C084FC', '#38BDF8'],
          })
        }, 300)
      }
    }
  }

  return (
    <section
      id="wishing-jar-section"
      className="relative py-24 px-6 max-w-6xl mx-auto overflow-hidden text-center"
      aria-label="Wishing Star Jar"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 shadow-sm">
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>Celestial Keepsake</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-starlight mb-3">
          {wishingJar.title}
        </h2>
        <p className="text-base sm:text-lg text-champagne/80 font-light max-w-xl mx-auto">
          {wishingJar.subtitle}
        </p>

        {/* Discovery Progress Badge */}
        <div className="mt-6 inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel-glow border border-amber-400/40">
          {allDiscovered ? (
            <Trophy className="w-4 h-4 text-amber-300" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          )}
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200">
            {allDiscovered
              ? '🌟 All 6 Wishing Stars Discovered!'
              : `${discoveredCount} of ${totalReasons} Stars Unlocked`}
          </span>
        </div>
      </div>

      {/* Interactive Wishing Jar Display */}
      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Visual Glass Jar Representation */}
        <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl glass-panel-glow border-2 border-amber-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col items-center mb-10 overflow-hidden">
          {/* Jar Lid */}
          <div className="w-44 h-5 rounded-t-lg bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 border border-amber-300/40 shadow-md mb-1" />
          <div className="w-52 h-4 rounded-sm bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-800 border-b border-amber-900/60 shadow-lg mb-8" />

          {/* Glowing Jar Body Contents */}
          <div className="relative w-full py-6 flex flex-col items-center justify-center">
            {/* Ambient internal starlight fireflies */}
            <div className="absolute inset-0 bg-radial from-amber-400/20 via-transparent to-transparent blur-xl pointer-events-none" />

            <p className="text-xs sm:text-sm uppercase tracking-widest text-champagne/70 font-medium mb-6">
              Touch any star to reveal a hidden wish
            </p>

            {/* Constellation Grid of Interactive Stars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full relative z-10">
              {wishingJar.reasons.map((wish, index) => {
                const isDiscovered = discoveredIds.includes(wish.id)

                return (
                  <motion.button
                    key={wish.id}
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleStarClick(wish)}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                      isDiscovered
                        ? 'bg-amber-400/15 border-amber-400/60 shadow-[0_0_20px_rgba(250,204,21,0.25)] text-amber-200'
                        : 'bg-white/5 border-white/10 hover:border-amber-400/40 text-starlight/70 hover:text-starlight'
                    }`}
                    aria-label={`Open wish star: ${wish.title}`}
                  >
                    {/* Pulsing glow aura when discovered */}
                    {isDiscovered && (
                      <span className="absolute -top-1.5 -right-1.5 p-0.5 rounded-full bg-amber-400 text-midnight">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}

                    <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center mb-2 shadow-inner">
                      {isDiscovered ? (
                        renderWishIcon(wish.icon, 'w-6 h-6')
                      ) : (
                        <Star className="w-6 h-6 text-amber-300/80 animate-pulse" />
                      )}
                    </div>

                    <span className="text-xs font-semibold tracking-wide line-clamp-1">
                      {isDiscovered ? wish.title : `Star #${index + 1}`}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Jar Base Reflection */}
          <div className="w-48 h-2 rounded-full bg-amber-400/20 blur-xs mt-6" />
        </div>
      </div>

      {/* Individual Wish Detail Modal */}
      <AnimatePresence>
        {activeWish && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wish-dialog-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-midnight/85 backdrop-blur-md"
              onClick={() => setActiveWish(null)}
            />

            {/* Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 max-w-lg w-full bg-[#111728] border-2 border-amber-400/40 rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-center overflow-hidden"
            >
              {/* Radial glow background */}
              <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveWish(null)}
                className="absolute top-5 right-5 p-2 rounded-full glass-panel text-starlight hover:text-amber-300 transition-colors"
                aria-label="Close wish modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="w-16 h-16 rounded-full glass-panel-glow border border-amber-400/50 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/15">
                {renderWishIcon(activeWish.icon, 'w-8 h-8')}
              </div>

              {/* Title */}
              <h3 id="wish-dialog-title" className="font-serif text-3xl sm:text-4xl font-bold text-starlight mb-4">
                {activeWish.title}
              </h3>

              {/* Message */}
              <p className="text-base sm:text-lg text-champagne/90 font-light leading-relaxed mb-8">
                "{activeWish.message}"
              </p>

              {/* Dismiss Action */}
              <button
                type="button"
                onClick={() => setActiveWish(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-midnight font-semibold text-sm shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:scale-105 active:scale-95 transition-transform"
              >
                Cherish This Thought ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default WishingJar
