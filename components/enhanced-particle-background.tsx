"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  glowIntensity: number
}

interface ParticleBackgroundProps {
  interactive?: boolean
  enhanced?: boolean
}

export function EnhancedParticleBackground({ interactive = false, enhanced = false }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const enhancedModeRef = useRef(false)
  const enhancedTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const colors = [
      "rgba(236, 72, 153, 0.9)", // pink - brighter
      "rgba(147, 51, 234, 0.9)", // purple - brighter
      "rgba(59, 130, 246, 0.9)", // blue - brighter
      "rgba(34, 197, 94, 0.9)", // green - brighter
      "rgba(251, 191, 36, 0.8)", // yellow
      "rgba(239, 68, 68, 0.8)", // red
    ]

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = enhanced
        ? Math.min(300, Math.floor((canvas.width * canvas.height) / 8000))
        : Math.min(200, Math.floor((canvas.width * canvas.height) / 10000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (enhanced ? 1 : 0.5),
          vy: (Math.random() - 0.5) * (enhanced ? 1 : 0.5),
          size: Math.random() * (enhanced ? 5 : 3) + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.3,
          glowIntensity: Math.random() * 30 + 20,
        })
      }

      particlesRef.current = particles
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update position
        const speedMultiplier = enhancedModeRef.current ? 2 : 1
        particle.x += particle.vx * speedMultiplier
        particle.y += particle.vy * speedMultiplier

        // Interactive mouse effect
        if (interactive) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const force = (150 - distance) / 150
            const attraction = enhancedModeRef.current ? 0.02 : 0.015
            particle.vx += (dx / distance) * force * attraction
            particle.vy += (dy / distance) * force * attraction

            // Increase glow near cursor
            particle.glowIntensity = Math.min(50, particle.glowIntensity + force * 20)
          } else {
            // Restore normal glow
            particle.glowIntensity = Math.max(20, particle.glowIntensity - 0.5)
          }
        }

        // Boundary check with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Enhanced mode effects
        if (enhancedModeRef.current) {
          particle.opacity = Math.min(1, particle.opacity + 0.02)
          particle.size = Math.min(8, particle.size + 0.1)
        } else {
          particle.opacity = Math.max(0.3, particle.opacity - 0.01)
          particle.size = Math.max(1, particle.size - 0.05)
        }

        // Draw particle with enhanced glow
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.shadowBlur = particle.glowIntensity
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Additional glow layer
        ctx.shadowBlur = particle.glowIntensity * 1.5
        ctx.globalAlpha = particle.opacity * 0.3
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw connections with enhanced glow
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.save()
            const connectionOpacity = ((120 - distance) / 120) * 0.4
            ctx.globalAlpha = connectionOpacity
            ctx.strokeStyle = particle.color
            ctx.lineWidth = enhancedModeRef.current ? 2 : 1
            ctx.shadowBlur = enhancedModeRef.current ? 10 : 5
            ctx.shadowColor = particle.color
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    // Enhanced mode trigger function
    const triggerEnhancedMode = () => {
      enhancedModeRef.current = true
      if (enhancedTimeoutRef.current) {
        clearTimeout(enhancedTimeoutRef.current)
      }
      enhancedTimeoutRef.current = setTimeout(() => {
        enhancedModeRef.current = false
      }, 4000)
    }

    // Expose trigger function globally
    ;(window as any).triggerParticleEnhancement = triggerEnhancedMode

    resizeCanvas()
    createParticles()
    animate()

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      window.removeEventListener("resize", handleResize)
      if (enhancedTimeoutRef.current) {
        clearTimeout(enhancedTimeoutRef.current)
      }
    }
  }, [interactive, enhanced])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)" }}
    />
  )
}
