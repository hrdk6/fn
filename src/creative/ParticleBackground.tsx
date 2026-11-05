import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  alpha: number
  baseAlpha: number
  twinkleSpeed: number
  twinklePhase: number
  color: string
  isEmber: boolean
}

interface ParticleBackgroundProps {
  className?: string
  particleCount?: number
  interactive?: boolean
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  particleCount = 95,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const actualParticleCount = prefersReducedMotion ? Math.floor(particleCount * 0.35) : particleCount
    const speedMultiplier = prefersReducedMotion ? 0.2 : 1.0

    // High DPI scaling
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

    // Particle color palettes: gold embers, champagne, starlight, violet dust
    const colors = [
      'rgba(253, 224, 71,',  // Gold 300
      'rgba(250, 204, 21,',  // Gold 400
      'rgba(250, 232, 178,', // Champagne
      'rgba(255, 251, 235,', // Starlight
      'rgba(192, 132, 252,', // Purple nebula dust
      'rgba(147, 197, 253,', // Cyan cosmic dust
    ]

    // Initialize particles
    const particles: Particle[] = []
    for (let i = 0; i < actualParticleCount; i++) {
      const isEmber = Math.random() < 0.25
      const baseRadius = isEmber ? Math.random() * 2.2 + 0.8 : Math.random() * 1.5 + 0.4
      const baseAlpha = isEmber ? Math.random() * 0.55 + 0.35 : Math.random() * 0.45 + 0.25
      const color = colors[Math.floor(Math.random() * colors.length)]

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45 * speedMultiplier,
        vy: isEmber
          ? (-Math.random() * 0.6 - 0.2) * speedMultiplier // embers drift softly upward
          : (Math.random() - 0.5) * 0.35 * speedMultiplier,
        radius: baseRadius,
        baseRadius,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.035 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color,
        isEmber,
      })
    }

    // Mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    if (interactive && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      document.addEventListener('mouseleave', handleMouseLeave)
    }

    // Render loop
    let lastTime = performance.now()
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current
      const interactionRadius = 140

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Position drift
        p.x += p.vx * dt * 60
        p.y += p.vy * dt * 60

        // Subtle twinkling
        p.twinklePhase += p.twinkleSpeed * dt * 60
        const twinkle = Math.sin(p.twinklePhase) * 0.25
        p.alpha = Math.max(0.1, Math.min(1.0, p.baseAlpha + twinkle))

        // Screen wrap
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // Mouse proximity interaction (gentle repulsion + glow boost)
        let glowBoost = 0
        if (interactive && mouse.active && !prefersReducedMotion) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)

          if (dist < interactionRadius && dist > 0) {
            const force = (1 - dist / interactionRadius)
            const repelStrength = 1.2
            p.x += (dx / dist) * force * repelStrength
            p.y += (dy / dist) * force * repelStrength
            glowBoost = force * 0.4
          }
        }

        // Draw particle
        const finalAlpha = Math.min(1, p.alpha + glowBoost)
        const currentRadius = p.radius * (1 + glowBoost * 0.8)

        ctx.beginPath()
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color} ${finalAlpha})`
        ctx.shadowColor = p.isEmber ? 'rgba(250, 204, 21, 0.7)' : 'rgba(255, 255, 255, 0.5)'
        ctx.shadowBlur = p.isEmber ? 8 : 4
        ctx.fill()
      }

      ctx.shadowBlur = 0
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', updateSize)
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [particleCount, interactive])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  )
}
