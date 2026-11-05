import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, RotateCcw, Wind } from 'lucide-react'
import { playBlowSound, playChimeSound, playFanfareSound } from './soundEffects'
import { birthdayData } from '../config/birthdayData'

interface InteractiveCakeProps {
  candleCount?: number
  flavorTitle?: string
  celebrationText?: string
  blowInstructions?: string
  onBlowOut?: () => void
  onRelight?: () => void
  className?: string
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({
  candleCount = birthdayData.cake?.candleCount ?? 5,
  flavorTitle = birthdayData.cake?.flavorTitle ?? "Triple-Layer Velvet & Stardust Cake",
  celebrationText = birthdayData.cake?.celebrationText ?? "🎉 Make a wish! May every single dream of yours come true!",
  blowInstructions = birthdayData.cake?.blowInstructions ?? "Click or tap the candles to make a wish and blow them out!",
  onBlowOut,
  onRelight,
  className = '',
}) => {
  // Candle states: array of boolean (true = lit, false = blown out)
  const [candlesLit, setCandlesLit] = useState<boolean[]>(() =>
    Array(candleCount).fill(true)
  )
  const [allBlownOut, setAllBlownOut] = useState<boolean>(false)
  const [smokeParticles, setSmokeParticles] = useState<number[]>([])

  // Check when all candles are extinguished
  const isEveryCandleOut = candlesLit.every((lit) => !lit)

  useEffect(() => {
    if (isEveryCandleOut && !allBlownOut) {
      setAllBlownOut(true)
      triggerGrandCelebration()
      onBlowOut?.()
    }
  }, [isEveryCandleOut, allBlownOut, onBlowOut])

  const triggerGrandCelebration = () => {
    playFanfareSound()

    // Multi-stage celebratory confetti explosion
    // Stage 1: Immediate golden core burst
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FDE047', '#FACC15', '#FA8072', '#E11D48', '#FFFFFF'],
      disableForReducedMotion: true,
    })

    // Stage 2: Left celebratory burst
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0.15, y: 0.7 },
        colors: ['#FACC15', '#FFE4E6', '#C084FC', '#F472B6'],
        disableForReducedMotion: true,
      })
    }, 200)

    // Stage 3: Right celebratory burst
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 55,
        origin: { x: 0.85, y: 0.7 },
        colors: ['#FDE047', '#38BDF8', '#FB7185', '#E5A93C'],
        disableForReducedMotion: true,
      })
    }, 400)

    // Stage 4: Star shimmer shower
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 90,
        origin: { y: 0.5 },
        shapes: ['circle'],
        colors: ['#FACC15', '#FFFBEB', '#F5D061'],
        scalar: 1.2,
        disableForReducedMotion: true,
      })
    }, 700)
  }

  const blowOutCandle = (index: number) => {
    if (!candlesLit[index]) return
    playBlowSound()
    setSmokeParticles((prev) => [...prev, index])

    setCandlesLit((prev) => {
      const next = [...prev]
      next[index] = false
      return next
    })
  }

  const blowAllCandles = () => {
    if (isEveryCandleOut) return
    playBlowSound()
    setSmokeParticles(candlesLit.map((_, i) => i))
    setCandlesLit(Array(candleCount).fill(false))
  }

  const relightCandles = () => {
    playChimeSound()
    setCandlesLit(Array(candleCount).fill(true))
    setAllBlownOut(false)
    setSmokeParticles([])
    onRelight?.()
  }

  return (
    <div className={`relative flex flex-col items-center justify-center p-6 select-none ${className}`}>
      {/* Flavor title & hint */}
      <div className="text-center mb-6 max-w-md">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-2"
        >
          {flavorTitle}
        </motion.span>
        <motion.p
          animate={{ opacity: allBlownOut ? 0.7 : 1 }}
          className="text-sm text-starlight/80 font-serif italic"
        >
          {allBlownOut ? "Your birthday wish has been launched into the cosmos! ✨" : blowInstructions}
        </motion.p>
      </div>

      {/* Main Stylized Cake Stage */}
      <div className="relative w-72 sm:w-80 md:w-96 flex flex-col items-center pt-16 pb-4">
        {/* Glow ambient background behind candles */}
        <div
          className={`absolute top-0 w-48 h-32 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            allBlownOut ? 'opacity-10 bg-indigo-900/40' : 'opacity-70 bg-amber-400/25'
          }`}
        />

        {/* --- CANDLES ROW --- */}
        <div className="relative z-20 flex justify-center items-end gap-3 sm:gap-4 -mb-3">
          {candlesLit.map((isLit, idx) => {
            const hasSmoke = smokeParticles.includes(idx)
            return (
              <div
                key={idx}
                onClick={() => blowOutCandle(idx)}
                className="relative flex flex-col items-center cursor-pointer group py-2 px-1 focus:outline-none"
                role="button"
                tabIndex={0}
                aria-label={`Candle ${idx + 1}, ${isLit ? 'lit' : 'extinguished'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') blowOutCandle(idx)
                }}
              >
                {/* Flame / Smoke Container */}
                <div className="relative h-12 w-6 flex justify-center items-end">
                  <AnimatePresence>
                    {isLit ? (
                      <motion.div
                        key="flame"
                        initial={{ scale: 0.2, opacity: 0 }}
                        animate={{
                          scale: [1, 1.12, 0.96, 1.05, 1],
                          rotate: [-2, 2, -1, 3, 0],
                        }}
                        exit={{
                          scale: [1, 1.3, 0],
                          opacity: [1, 0.8, 0],
                          y: -8,
                          transition: { duration: 0.28 },
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.4 + (idx % 3) * 0.2,
                          ease: 'easeInOut',
                        }}
                        className="relative flex flex-col items-center origin-bottom cursor-pointer"
                      >
                        {/* Outer Flame Glow */}
                        <div className="absolute -inset-2 bg-amber-400/35 rounded-full blur-md animate-pulse" />

                        {/* Outer Flame Teardrop */}
                        <div className="w-4 h-8 bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200 rounded-[50%_50%_40%_40%/60%_60%_40%_40%] shadow-[0_0_12px_#fbbf24]" />

                        {/* Inner Core Flame */}
                        <div className="absolute bottom-1 w-2 h-4 bg-gradient-to-t from-orange-400 to-white rounded-full opacity-90" />

                        {/* Blue base */}
                        <div className="absolute bottom-0 w-2 h-1 bg-cyan-400/80 rounded-full blur-[0.5px]" />
                      </motion.div>
                    ) : (
                      hasSmoke && (
                        <motion.div
                          key="smoke"
                          initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                          animate={{
                            opacity: [0.8, 0.5, 0],
                            y: [-2, -26, -42],
                            x: [0, (idx % 2 === 0 ? 6 : -6), (idx % 2 === 0 ? 12 : -12)],
                            scale: [0.8, 1.5, 2.2],
                          }}
                          transition={{ duration: 1.6, ease: 'easeOut' }}
                          className="absolute bottom-1 w-3 h-3 bg-gray-300/40 rounded-full blur-sm pointer-events-none"
                        />
                      )
                    )}
                  </AnimatePresence>
                </div>

                {/* Wick */}
                <div className="w-[2px] h-2.5 bg-neutral-800 -mb-0.5 rounded-t-sm" />

                {/* Candle Body */}
                <div
                  className="w-3.5 sm:w-4 rounded-t-sm shadow-md transition-transform group-hover:scale-105"
                  style={{
                    height: `${36 + (idx % 2) * 8}px`,
                    background:
                      idx % 2 === 0
                        ? 'repeating-linear-gradient(45deg, #facc15, #facc15 4px, #fde047 4px, #fde047 8px)'
                        : 'repeating-linear-gradient(45deg, #fb7185, #fb7185 4px, #ffe4e6 4px, #ffe4e6 8px)',
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-black/20 via-transparent to-white/30 rounded-t-sm" />
                </div>
              </div>
            )
          })}
        </div>

        {/* --- TIER 3 (TOP TIER) --- */}
        <div className="relative z-10 w-44 sm:w-48 h-16 rounded-t-2xl bg-gradient-to-b from-rose-100 via-amber-50 to-amber-100 border-t border-amber-200/60 shadow-lg flex flex-col justify-between overflow-hidden">
          {/* Frosting Drips */}
          <div className="flex justify-around items-start w-full px-2">
            {[14, 18, 12, 22, 15, 19, 13].map((h, i) => (
              <div
                key={i}
                className="w-3 rounded-b-full bg-white/90 shadow-sm"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          {/* Golden Pearl Trim */}
          <div className="w-full h-3 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 flex justify-around items-center px-1 shadow-sm">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-xs" />
            ))}
          </div>
        </div>

        {/* --- TIER 2 (MIDDLE TIER) --- */}
        <div className="relative z-0 w-60 sm:w-64 h-20 -mt-1 rounded-t-2xl bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 border-t border-purple-400/30 shadow-xl flex flex-col justify-between overflow-hidden">
          {/* Midnight Celestial Filigree & Stars */}
          <div className="w-full pt-1 px-3 flex justify-between items-center opacity-60">
            <span className="text-amber-300 text-xs">✦</span>
            <span className="text-rose-300 text-[10px]">★</span>
            <span className="text-amber-200 text-xs">✦</span>
            <span className="text-rose-300 text-[10px]">★</span>
            <span className="text-amber-300 text-xs">✦</span>
          </div>

          {/* Middle Band: Rose Gold Ribbon */}
          <div className="w-full py-1 bg-gradient-to-r from-rose-900/60 via-amber-500/40 to-rose-900/60 flex items-center justify-center">
            <span className="text-[11px] font-serif tracking-widest text-amber-200/90 uppercase font-semibold">
              ✦ WITH LOVE ✦
            </span>
          </div>

          {/* Middle bottom pearls */}
          <div className="w-full h-3 bg-gradient-to-r from-amber-500 via-yellow-100 to-amber-500 flex justify-around items-center px-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-xs" />
            ))}
          </div>
        </div>

        {/* --- TIER 1 (BASE TIER) --- */}
        <div className="relative z-[-1] w-72 sm:w-80 h-24 -mt-1 rounded-t-3xl bg-gradient-to-b from-amber-950/90 via-zinc-950 to-midnight border-t border-amber-500/40 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Dripping Chocolate & Gold Drizzle */}
          <div className="flex justify-around items-start w-full px-3">
            {[16, 26, 18, 30, 20, 28, 15, 24, 17].map((h, i) => (
              <div
                key={i}
                className="w-4 rounded-b-full bg-gradient-to-b from-amber-500 to-amber-700 shadow-md"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          {/* Base Tier Star Accent */}
          <div className="w-full text-center pb-2">
            <span className="text-amber-400/80 text-xs tracking-widest font-serif">
              ✦ CELEBRATING ALEX ✦
            </span>
          </div>

          {/* Base bottom border */}
          <div className="w-full h-3.5 bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-600 shadow-lg flex justify-around items-center px-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-amber-100 shadow-xs" />
            ))}
          </div>
        </div>

        {/* --- CAKE STAND (PEDESTAL) --- */}
        <div className="relative z-[-2] flex flex-col items-center w-full">
          {/* Plate Rim */}
          <div className="w-80 sm:w-92 h-4 rounded-full bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 shadow-xl border border-yellow-200/60 -mt-1.5" />
          {/* Stand Foot */}
          <div className="w-32 h-6 bg-gradient-to-b from-amber-400 to-amber-700 rounded-b-xl shadow-md" />
          <div className="w-44 h-3 bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-600 rounded-full shadow-lg -mt-1" />
        </div>
      </div>

      {/* --- ACTION CONTROLS & CELEBRATION BANNER --- */}
      <div className="mt-6 flex flex-col items-center max-w-md w-full">
        <AnimatePresence mode="wait">
          {!allBlownOut ? (
            <motion.div
              key="blow-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <button
                type="button"
                onClick={blowAllCandles}
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-amber-950 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 hover:from-yellow-200 hover:to-amber-300 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.65)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Wind className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                <span>Make a Wish & Blow All</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="celebration-banner"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl glass-panel-glow border border-amber-400/30 w-full"
            >
              <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mb-3 text-amber-300 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <h3 className="text-xl font-serif font-bold text-amber-200 mb-1">
                A Wish Sent to the Stars!
              </h3>
              <p className="text-sm text-starlight/90 mb-4 leading-relaxed font-sans">
                {celebrationText}
              </p>

              <button
                type="button"
                onClick={relightCandles}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relight Candles</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
