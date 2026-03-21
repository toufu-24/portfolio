"use client"

import { useRef, useEffect } from "react"

type MiniCanvasProps = {
  variant: "sparse" | "convergence" | "spectrum"
  className?: string
}

export default function MiniCanvas({ variant, className = "" }: MiniCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animId: number
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const bars = Array.from({ length: 32 }, (_, i) => ({
      pos: i / 32,
      target: Math.random() > 0.75 ? 0.3 + Math.random() * 0.7 : 0,
      current: 0,
      phase: Math.random() * Math.PI * 2,
    }))

    const drawSparse = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const reconstructProgress = ((Math.sin(t * 0.3) + 1) / 2) * 0.9 + 0.1
      const barW = w / bars.length * 0.6
      for (const bar of bars) {
        bar.current += (bar.target * reconstructProgress - bar.current) * 0.05
        const x = bar.pos * w
        const bh = bar.current * h * 0.7
        if (bh > 1) {
          const grad = ctx.createLinearGradient(x, h, x, h - bh)
          grad.addColorStop(0, "rgba(0, 212, 255, 0.02)")
          grad.addColorStop(1, "rgba(0, 212, 255, 0.25)")
          ctx.fillStyle = grad
          ctx.fillRect(x, h - bh, barW, bh)
        }
      }
      ctx.font = "7px monospace"
      ctx.fillStyle = "rgba(0, 212, 255, 0.15)"
      ctx.fillText("reconstruct", 2, 8)
    }

    const drawConvergence = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const pad = 4

      ctx.beginPath()
      ctx.strokeStyle = "rgba(0, 212, 255, 0.2)"
      ctx.lineWidth = 1
      for (let x = 0; x <= w - pad * 2; x++) {
        const p = x / (w - pad * 2)
        const noise = Math.sin(p * 25 + t * 0.5) * 0.1 * Math.exp(-p * 3)
        const val = Math.exp(-p * 3.5) * (1 + noise)
        const px = pad + x
        const py = h * 0.9 - val * h * 0.75
        x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.stroke()

      // Iteration markers
      for (let i = 1; i <= 5; i++) {
        const p = i / 6
        const val = Math.exp(-p * 3.5)
        const px = pad + p * (w - pad * 2)
        const py = h * 0.9 - val * h * 0.75
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(167, 139, 250, 0.3)"
        ctx.fill()
      }

      ctx.font = "7px monospace"
      ctx.fillStyle = "rgba(0, 212, 255, 0.15)"
      ctx.fillText("f(xₖ)→min", 2, 8)
    }

    const drawSpectrum = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const binCount = 40
      const binW = w / binCount

      for (let i = 0; i < binCount; i++) {
        const freq = i / binCount
        const d1 = freq - 0.15
        const d2 = freq - 0.4
        const d3 = freq - 0.7
        const magnitude =
          Math.exp((-d1 * d1) / 0.005) * 0.8 +
          Math.exp((-d2 * d2) / 0.01) * 0.5 +
          Math.exp((-d3 * d3) / 0.008) * 0.3 +
          Math.sin(t * 0.5 + i * 0.5) * 0.05
        const bh = magnitude * h * 0.75
        const a = 0.08 + magnitude * 0.2
        ctx.fillStyle = `rgba(0, 212, 255, ${a})`
        ctx.fillRect(i * binW + 1, h - bh, binW - 2, bh)
      }

      ctx.font = "7px monospace"
      ctx.fillStyle = "rgba(0, 212, 255, 0.15)"
      ctx.fillText("|X(ω)|", 2, 8)
    }

    const animate = (time: number) => {
      const t = time * 0.001
      switch (variant) {
        case "sparse": drawSparse(t); break
        case "convergence": drawConvergence(t); break
        case "spectrum": drawSpectrum(t); break
      }
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animId)
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
    />
  )
}
