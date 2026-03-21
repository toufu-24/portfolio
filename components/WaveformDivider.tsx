"use client"

import { useRef, useEffect } from "react"

interface WaveformDividerProps {
  className?: string
  variant?: "sine" | "sparse"
}

export default function WaveformDivider({
  className = "",
  variant = "sine",
}: WaveformDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    const drawSine = (time: number) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath()
        const opacity = 0.08 - wave * 0.02
        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
        ctx.lineWidth = 1

        for (let x = 0; x <= w; x++) {
          const frequency = 0.008 + wave * 0.003
          const amplitude = 8 + wave * 4
          const speed = 0.0008 + wave * 0.0003
          const y = h / 2 + Math.sin(x * frequency + time * speed) * amplitude
            + Math.sin(x * frequency * 2.3 + time * speed * 1.5) * (amplitude * 0.3)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    const sparseSignal: { x: number; height: number; phase: number }[] = []
    for (let i = 0; i < 60; i++) {
      sparseSignal.push({
        x: Math.random(),
        height: Math.random() > 0.7 ? 0.3 + Math.random() * 0.7 : Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const drawSparse = (time: number) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (const bar of sparseSignal) {
        const x = bar.x * w
        const pulse = 0.7 + Math.sin(time * 0.001 + bar.phase) * 0.3
        const barHeight = bar.height * h * 0.6 * pulse
        const opacity = bar.height > 0.3 ? 0.15 : 0.05

        ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`
        ctx.fillRect(x, h / 2 - barHeight / 2, 1.5, barHeight)
      }
    }

    const animate = (time: number) => {
      if (variant === "sine") drawSine(time)
      else drawSparse(time)
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-16 pointer-events-none ${className}`}
    />
  )
}
