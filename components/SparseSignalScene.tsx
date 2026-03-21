"use client"

import { useRef, useEffect, useCallback } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  isSparse: boolean
  phase: number
  baseAlpha: number
}

export default function SparseSignalScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = []
    const count = Math.min(140, Math.floor((w * h) / 8000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() > 0.7 ? 2 + Math.random() * 2.5 : 0.8 + Math.random() * 1.2,
        isSparse: Math.random() > 0.7,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: 0.15 + Math.random() * 0.35,
      })
    }
    particlesRef.current = particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (particlesRef.current.length === 0) initParticles(w, h)
    }

    resize()
    window.addEventListener("resize", resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    canvas.addEventListener("mousemove", onMouseMove)

    const connectionDistance = 160
    const mouseRadius = 200

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      const particles = particlesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const t = time * 0.001

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > w) { p.x = w; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > h) { p.y = h; p.vy *= -1 }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.08
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        const mdx = p.x - mx
        const mdy = p.y - my
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        const mouseInfluence = Math.max(0, 1 - mDist / mouseRadius)

        const pulse = p.isSparse
          ? 0.6 + Math.sin(t * 1.5 + p.phase) * 0.4
          : 0.8 + Math.sin(t * 0.5 + p.phase) * 0.2
        const alpha = p.baseAlpha * pulse * (1 + mouseInfluence * 1.5)
        const r = p.radius * (1 + mouseInfluence * 0.8)

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`
        ctx.fill()

        if (p.isSparse && alpha > 0.3) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.15})`
          ctx.fill()
        }
      }

      // Subtle grid
      ctx.strokeStyle = "rgba(0, 212, 255, 0.015)"
      ctx.lineWidth = 0.5
      const gridSize = 80
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", onMouseMove)
    }
  }, [initParticles])

  return (
    <div className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
