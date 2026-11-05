import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { playPopSound } from './soundEffects'

interface BalloonData {
  id: number
  xPercent: number // 0-100%
  speed: number // duration in seconds
  delay: number
  size: number // width in px
  color: {
    gradient: string
    shadow: string
    highlight: string
    confettiColor: string
  }
  isPopped: boolean
}

const BALLOON_PALETTES = [
  {
    gradient: 'radial-gradient(circle at 35% 30%, #fef08a 0%, #facc15 45%, #ca8a04 100%)',
    shadow: 'rgba(250, 204, 21, 0.35)',
    highlight: 'rgba(255, 255, 255, 0.7)',
    confettiColor: '#facc15',
  },
  {
    gradient: 'radial-gradient(circle at 35% 30%, #fecdd3 0%, #fb7185 50%, #be123c 100%)',
    shadow: 'rgba(251, 113, 133, 0.35)',
    highlight: 'rgba(255, 255, 255, 0.7)',
    confettiColor: '#fb7185',
  },
  {
    gradient: 'radial-gradient(circle at 35% 30%, #f5d0fe 0%, #c084fc 50%, #7e22ce 100%)',
    shadow: 'rgba(192, 132, 252, 0.35)',
    highlight: 'rgba(255, 255, 255, 0.7)',
    confettiColor: '#c084fc',
  },
  {
    gradient: 'radial-gradient(circle at 35% 30%, #bae6fd 0%, #38bdf8 50%, #0369a1 100%)',
    shadow: 'rgba(56, 189, 248, 0.35)',
    highlight: 'rgba(255, 255, 255, 0.7)',
    confettiColor: '#38bdf8',
  },
  {
    gradient: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f1f5f9 45%, #cbd5e1 100%)',
    shadow: 'rgba(255, 255, 255, 0.35)',
    highlight: 'rgba(255, 255, 255, 0.9)',
    confettiColor: '#ffffff',
  },
]

interface FloatingBalloonsProps {
  count?: number
  className?: string
  sideOnly?: boolean
}

export const FloatingBalloons: React.FC<FloatingBalloonsProps> = ({
  count = 8,
  className = '',
  sideOnly = true,
}) => {
  const [balloons, setBalloons] = useState<BalloonData[]>([])

  useEffect(() => {
    // Generate initial balloons
    const initialBalloons: BalloonData[] = []
    for (let i = 0; i < count; i++) {
      // If sideOnly, place in left 15% or right 15%
      let xPercent: number
      if (sideOnly) {
        xPercent = i % 2 === 0 ? Math.random() * 12 + 2 : Math.random() * 12 + 84
      } else {
        xPercent = Math.random() * 90 + 5
      }

      initialBalloons.push({
        id: i,
        xPercent,
        speed: 14 + Math.random() * 8, // gentle drift
        delay: Math.random() * 8,
        size: 48 + Math.random() * 18,
        color: BALLOON_PALETTES[i % BALLOON_PALETTES.length],
        isPopped: false,
      })
    }
    setBalloons(initialBalloons)
  }, [count, sideOnly])

  const handlePop = (balloon: BalloonData, e: React.MouseEvent) => {
    if (balloon.isPopped) return

    playPopSound()

    // Screen coordinate for confetti burst
    const originX = e.clientX / window.innerWidth
    const originY = e.clientY / window.innerHeight

    confetti({
      particleCount: 28,
      spread: 55,
      startVelocity: 22,
      origin: { x: originX, y: originY },
      colors: [balloon.color.confettiColor, '#FFFBEB', '#FDE047'],
      disableForReducedMotion: true,
    })

    // Mark as popped
    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, isPopped: true } : b))
    )

    // Re-spawn balloon after a brief cooldown
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) => {
          if (b.id === balloon.id) {
            let xPercent: number
            if (sideOnly) {
              xPercent = Math.random() < 0.5 ? Math.random() * 12 + 2 : Math.random() * 12 + 84
            } else {
              xPercent = Math.random() * 90 + 5
            }
            return {
              ...b,
              isPopped: false,
              xPercent,
              color: BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)],
            }
          }
          return b
        })
      )
    }, 4500)
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-20 ${className}`}
      aria-hidden="true"
    >
      {balloons.map((balloon) => {
        if (balloon.isPopped) return null

        return (
          <motion.div
            key={balloon.id}
            initial={{ y: '115vh', opacity: 0 }}
            animate={{
              y: '-25vh',
              opacity: [0, 0.9, 0.9, 0],
              x: [0, 14, -14, 8, 0],
            }}
            transition={{
              y: {
                duration: balloon.speed,
                repeat: Infinity,
                delay: balloon.delay,
                ease: 'linear',
              },
              opacity: {
                duration: balloon.speed,
                repeat: Infinity,
                delay: balloon.delay,
                times: [0, 0.08, 0.9, 1],
              },
              x: {
                duration: balloon.speed * 0.45,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
            }}
            style={{
              position: 'absolute',
              left: `${balloon.xPercent}%`,
              width: balloon.size,
            }}
            className="pointer-events-auto cursor-pointer group select-none"
            onClick={(e) => handlePop(balloon, e)}
            role="button"
            tabIndex={0}
            title="Pop me! 🎈"
          >
            {/* Balloon Body */}
            <div
              className="relative rounded-[50%_50%_50%_50%/40%_40%_60%_60%] transition-transform duration-200 group-hover:scale-110 active:scale-90"
              style={{
                width: balloon.size,
                height: balloon.size * 1.25,
                background: balloon.color.gradient,
                boxShadow: `0 8px 24px ${balloon.color.shadow}`,
              }}
            >
              {/* Highlight Glare */}
              <div
                className="absolute top-2 left-2.5 rounded-full rotate-[-30deg]"
                style={{
                  width: balloon.size * 0.28,
                  height: balloon.size * 0.16,
                  background: balloon.color.highlight,
                  filter: 'blur(0.5px)',
                }}
              />

              {/* Balloon Knot */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2 rounded-sm"
                style={{
                  background: balloon.color.gradient,
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                }}
              />
            </div>

            {/* Swaying String */}
            <svg
              className="w-4 h-16 -mt-0.5 mx-auto overflow-visible opacity-70"
              viewBox="0 0 20 60"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.2"
            >
              <path d="M 10,0 Q 16,15 10,30 T 10,60" />
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}
