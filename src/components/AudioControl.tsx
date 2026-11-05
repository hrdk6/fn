import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Music } from 'lucide-react'
import {
  isAmbientActive,
  isAudioEnabled,
  setAudioEnabled,
  startAmbientMelody,
  stopAmbientMelody,
} from '../creative/soundEffects'

export const AudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  // Synchronize state periodically in case audio was started externally (e.g. from CinematicIntro)
  useEffect(() => {
    const checkStatus = () => {
      const active = isAmbientActive() && isAudioEnabled()
      setIsPlaying((prev) => (prev !== active ? active : prev))
    }

    checkStatus()
    const interval = window.setInterval(checkStatus, 600)
    return () => window.clearInterval(interval)
  }, [])

  const handleToggleAudio = () => {
    if (isPlaying) {
      stopAmbientMelody()
      setAudioEnabled(false)
      setIsPlaying(false)
    } else {
      setAudioEnabled(true)
      startAmbientMelody()
      setIsPlaying(true)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggleAudio}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-panel-glow border border-amber-400/30 text-starlight shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-amber-400/60 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50"
        aria-label={isPlaying ? 'Mute ambient celebration melody' : 'Play ambient celebration melody'}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {/* Audio Icon */}
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-starlight/60" />
        )}

        {/* Animated Soundwave Visualizer Bars */}
        <div className="flex items-center gap-1 h-4 px-1" aria-hidden="true">
          {[
            { min: 3, max: 14, dur: 0.7, delay: 0 },
            { min: 4, max: 18, dur: 0.5, delay: 0.15 },
            { min: 3, max: 12, dur: 0.8, delay: 0.3 },
            { min: 5, max: 16, dur: 0.6, delay: 0.1 },
          ].map((bar, i) => (
            <motion.span
              key={i}
              className={`w-0.5 rounded-full transition-colors ${
                isPlaying ? 'bg-amber-300' : 'bg-starlight/40'
              }`}
              animate={
                isPlaying
                  ? {
                      height: [`${bar.min}px`, `${bar.max}px`, `${bar.min}px`],
                    }
                  : {
                      height: '3px',
                    }
              }
              transition={
                isPlaying
                  ? {
                      duration: bar.dur,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: bar.delay,
                    }
                  : { duration: 0.2 }
              }
            />
          ))}
        </div>

        {/* Text Label for Clarity */}
        <span className="text-xs font-medium text-amber-200 tracking-wide hidden sm:inline">
          {isPlaying ? 'Chimes Playing' : 'Play Chimes'}
        </span>

        <Music className="w-3.5 h-3.5 text-amber-300/80 hidden sm:inline" />
      </motion.button>
    </div>
  )
}

export default AudioControl
