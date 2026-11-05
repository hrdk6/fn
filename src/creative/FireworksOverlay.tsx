import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  decay: number
  color: string
  size: number
  flicker: boolean
}

interface Firework {
  x: number
  y: number
  targetY: number
  vx: number
  vy: number
  exploded: boolean
  color: string
  particles: Particle[]
  trail: { x: number; y: number }[]
}

interface FireworksOverlayProps {
  isActive?: boolean
  intensity?: 'subtle' | 'celebration' | 'grand'
  className?: string
}

const FIREWORK_COLORS = [
  '#facc15', // Gold
  '#fde047', // Light Gold
  '#fb7185', // Rose Pink
  '#f43f5e', // Ruby
  '#c084fc', // Violet
  '#60a5fa', // Celestial Blue
  '#34d399', // Emerald Shimmer
  '#fffbeb', // Starlight White
]

export const FireworksOverlay: React.FC<FireworksOverlayProps> = ({
  isActive = true,
  intensity = 'celebration',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.resetTransform?.()
      ctx.scale(dpr, dpr)
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    const fireworks: Firework[] = []

    const spawnRate =
      intensity === 'subtle' ? 1400 : intensity === 'grand' ? 450 : 800
    const particleCountPerBurst =
      prefersReducedMotion ? 25 : intensity === 'grand' ? 90 : 60

    let lastSpawnTime = performance.now()

    const createFirework = () => {
      const startX = width * 0.15 + Math.random() * width * 0.7
      const targetY = height * 0.12 + Math.random() * height * 0.4
      const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
      const speed = 9 + Math.random() * 4

      const distance = height - targetY
      void distance

      fireworks.push({
        x: startX,
        y: height,
        targetY,
        vx: (Math.random() - 0.5) * 2,
        vy: -speed,
        exploded: false,
        color,
        particles: [],
        trail: [],
      })
    }

    const explode = (fw: Firework) => {
      fw.exploded = true
      const count = particleCountPerBurst
      const baseSpeed = prefersReducedMotion ? 2.5 : 4.5

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
        const speed = (Math.random() * 0.75 + 0.25) * baseSpeed

        fw.particles.push({
          x: fw.x,
          y: fw.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          color: Math.random() < 0.25 ? '#ffffff' : fw.color,
          size: Math.random() * 2 + 1.2,
          flicker: Math.random() < 0.4,
        })
      }
    }

    // Main render loop
    let lastTime = performance.now()

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      // Subtle trailing fade on canvas
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(7, 9, 19, 0.25)'
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'lighter'

      // Check spawn
      if (now - lastSpawnTime > spawnRate) {
        createFirework()
        lastSpawnTime = now
      }

      // Update & render fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i]

        if (!fw.exploded) {
          // Ascend
          fw.trail.push({ x: fw.x, y: fw.y })
          if (fw.trail.length > 5) fw.trail.shift()

          fw.x += fw.vx * dt * 60
          fw.y += fw.vy * dt * 60

          // Draw trail
          ctx.beginPath()
          ctx.strokeStyle = fw.color
          ctx.lineWidth = 2
          for (let t = 0; t < fw.trail.length; t++) {
            const p = fw.trail[t]
            if (t === 0) ctx.moveTo(p.x, p.y)
            else ctx.lineTo(p.x, p.y)
          }
          ctx.stroke()

          // Draw rocket tip
          ctx.beginPath()
          ctx.arc(fw.x, fw.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.fill()

          if (fw.y <= fw.targetY || fw.vy >= 0) {
            explode(fw)
          }
        } else {
          // Exploded - update particles
          for (let pIdx = fw.particles.length - 1; pIdx >= 0; pIdx--) {
            const p = fw.particles[pIdx]

            p.x += p.vx * dt * 60
            p.y += p.vy * dt * 60
            p.vy += 0.06 * dt * 60 // gravity
            p.vx *= 0.985 // drag
            p.vy *= 0.985
            p.alpha -= p.decay * dt * 60

            if (p.alpha <= 0) {
              fw.particles.splice(pIdx, 1)
              continue
            }

            const currentAlpha = p.flicker && Math.random() < 0.3 ? p.alpha * 0.4 : p.alpha

            ctx.save()
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx.globalAlpha = Math.max(0, currentAlpha)
            ctx.shadowColor = p.color
            ctx.shadowBlur = 8
            ctx.fill()
            ctx.restore()
          }

          if (fw.particles.length === 0) {
            fireworks.splice(i, 1)
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', updateSize)
    }
  }, [isActive, intensity])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-30 ${className}`}
      aria-hidden="true"
    />
  )
}
