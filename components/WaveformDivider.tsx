"use client"

import { useRef, useEffect } from "react"

interface WaveformDividerProps {
  className?: string
  variant?: "sine" | "sparse" | "convergence" | "graph"
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
    window.addEventListener("resize", resize)

    const drawSine = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 - wave * 0.02})`
        ctx.lineWidth = 1
        ctx.lineCap = "round"
        for (let x = 0; x <= w; x++) {
          const freq = 0.008 + wave * 0.003
          const amp = 8 + wave * 4
          const speed = 0.0008 + wave * 0.0003
          const y =
            h / 2 +
            Math.sin(x * freq + time * speed) * amp +
            Math.sin(x * freq * 2.3 + time * speed * 1.5) * (amp * 0.3)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    const sparseBars = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      height:
        Math.random() > 0.7
          ? 0.3 + Math.random() * 0.7
          : Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
    }))
    const drawSparse = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const bar of sparseBars) {
        const x = bar.x * w
        const pulse = 0.7 + Math.sin(time * 0.001 + bar.phase) * 0.3
        const bh = bar.height * h * 0.6 * pulse
        const a = bar.height > 0.3 ? 0.18 : 0.04

        const grad = ctx.createLinearGradient(x, h / 2 + bh / 2, x, h / 2 - bh / 2)
        grad.addColorStop(0, `rgba(0, 212, 255, ${a * 0.2})`)
        grad.addColorStop(0.5, `rgba(0, 212, 255, ${a})`)
        grad.addColorStop(1, `rgba(0, 212, 255, ${a * 0.2})`)
        ctx.fillStyle = grad
        ctx.fillRect(x, h / 2 - bh / 2, 1.5, bh)
      }
    }

    const drawConvergence = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      const t = time * 0.0004
      const pad = 40

      ctx.strokeStyle = "rgba(0, 212, 255, 0.05)"
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(pad, h * 0.15)
      ctx.lineTo(pad, h * 0.85)
      ctx.lineTo(w - pad, h * 0.85)
      ctx.stroke()

      ctx.beginPath()
      ctx.strokeStyle = "rgba(0, 212, 255, 0.15)"
      ctx.lineWidth = 1.5
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      const rangeX = w - pad * 2
      const rangeY = h * 0.6
      const baseY = h * 0.82

      for (let x = 0; x <= rangeX; x++) {
        const progress = x / rangeX
        const value =
          Math.exp(-progress * 4) *
          (1 + Math.sin(progress * 20 + t) * 0.15 * Math.exp(-progress * 3))
        const px = pad + x
        const py = baseY - value * rangeY
        x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.stroke()

      const dotProgress = (t * 0.5) % 1
      const dotVal =
        Math.exp(-dotProgress * 4) *
        (1 +
          Math.sin(dotProgress * 20 + t) *
            0.15 *
            Math.exp(-dotProgress * 3))
      const dotX = pad + dotProgress * rangeX
      const dotY = baseY - dotVal * rangeY

      const glow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12)
      glow.addColorStop(0, "rgba(0, 212, 255, 0.4)")
      glow.addColorStop(0.5, "rgba(0, 212, 255, 0.08)")
      glow.addColorStop(1, "rgba(0, 212, 255, 0)")
      ctx.beginPath()
      ctx.arc(dotX, dotY, 12, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      ctx.beginPath()
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 212, 255, 0.7)"
      ctx.fill()
    }

    const graphNodes = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: 0.2 + Math.random() * 0.6,
      color: Math.floor(Math.random() * 3),
    }))
    const graphColors = [
      "rgba(0, 212, 255, ALPHA)",
      "rgba(167, 139, 250, ALPHA)",
      "rgba(56, 189, 248, ALPHA)",
    ]
    const drawGraph = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      const t = time * 0.001

      for (let i = 0; i < graphNodes.length; i++) {
        for (let j = i + 1; j < graphNodes.length; j++) {
          const dx = (graphNodes[i].x - graphNodes[j].x) * w
          const dy = (graphNodes[i].y - graphNodes[j].y) * h
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const flow = (Math.sin(t * 0.5 + i + j) + 1) / 2
            const a = (1 - dist / 180) * 0.08 * flow
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 212, 255, ${a})`
            ctx.lineWidth = 0.8
            ctx.setLineDash([3, 4])
            ctx.moveTo(graphNodes[i].x * w, graphNodes[i].y * h)
            ctx.lineTo(graphNodes[j].x * w, graphNodes[j].y * h)
            ctx.stroke()
            ctx.setLineDash([])
          }
        }
      }

      for (const n of graphNodes) {
        const pulse = 0.5 + Math.sin(t + n.x * 10) * 0.3
        const colorStr = graphColors[n.color].replace(
          "ALPHA",
          String(0.2 + pulse * 0.15),
        )

        const glow = ctx.createRadialGradient(
          n.x * w, n.y * h, 0,
          n.x * w, n.y * h, 8,
        )
        const glowColor = graphColors[n.color].replace("ALPHA", String(0.1 + pulse * 0.05))
        glow.addColorStop(0, glowColor)
        glow.addColorStop(1, graphColors[n.color].replace("ALPHA", "0"))
        ctx.beginPath()
        ctx.arc(n.x * w, n.y * h, 8, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x * w, n.y * h, 3, 0, Math.PI * 2)
        ctx.fillStyle = colorStr
        ctx.fill()
      }
    }

    const animate = (time: number) => {
      switch (variant) {
        case "sine":
          drawSine(time)
          break
        case "sparse":
          drawSparse(time)
          break
        case "convergence":
          drawConvergence(time)
          break
        case "graph":
          drawGraph(time)
          break
      }
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
      className={`w-full pointer-events-none ${variant === "convergence" ? "h-24" : "h-16"} ${className}`}
    />
  )
}
