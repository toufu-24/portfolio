"use client"

import { useEffect, useRef } from "react"

const trajectory = [
  { x: 0.12, y: 0.79, value: 12.84 },
  { x: 0.3, y: 0.6, value: 5.31 },
  { x: 0.44, y: 0.52, value: 1.96 },
  { x: 0.53, y: 0.46, value: 0.61 },
  { x: 0.585, y: 0.43, value: 0.13 },
  { x: 0.615, y: 0.415, value: 0.02 },
]

const STEP_MS = 760
const HOLD_MS = 1800

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath()
  ctx.roundRect(x, y, width, height, radius)
  ctx.stroke()
}

export default function OptimizationLandscape() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reduceMotion = motionQuery.matches
    let animationFrame = 0
    let startTime = performance.now()

    const updateMotionPreference = () => {
      reduceMotion = motionQuery.matches
      startTime = performance.now()
    }

    updateMotionPreference()
    motionQuery.addEventListener("change", updateMotionPreference)

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = rect.width
      const height = rect.height

      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const pad = Math.max(24, width * 0.055)
      const plotX = pad
      const plotY = pad
      const plotW = width - pad * 2
      const plotH = height - pad * 2

      ctx.strokeStyle = "rgba(23, 76, 55, 0.09)"
      ctx.lineWidth = 1
      ctx.setLineDash([2, 5])
      for (let i = 0; i <= 6; i += 1) {
        const x = plotX + (plotW * i) / 6
        ctx.beginPath()
        ctx.moveTo(x, plotY)
        ctx.lineTo(x, plotY + plotH)
        ctx.stroke()
      }
      for (let i = 0; i <= 5; i += 1) {
        const y = plotY + (plotH * i) / 5
        ctx.beginPath()
        ctx.moveTo(plotX, y)
        ctx.lineTo(plotX + plotW, y)
        ctx.stroke()
      }
      ctx.setLineDash([])

      ctx.save()
      ctx.translate(plotX + plotW * 0.615, plotY + plotH * 0.415)
      ctx.rotate(-0.38)
      const levels = [0.11, 0.18, 0.27, 0.38, 0.51, 0.66, 0.84]
      levels.forEach((level, index) => {
        ctx.beginPath()
        ctx.ellipse(0, 0, plotW * level, plotH * level * 0.56, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(23, 76, 55, ${0.46 - index * 0.045})`
        ctx.lineWidth = index < 2 ? 1.4 : 1
        ctx.stroke()
      })
      ctx.restore()

      const duration = trajectory.length * STEP_MS + HOLD_MS
      const elapsed = reduceMotion ? duration - HOLD_MS : (time - startTime) % duration
      const rawStep = reduceMotion ? trajectory.length - 1 : Math.min(elapsed / STEP_MS, trajectory.length - 1)
      const visibleIteration = Math.floor(rawStep)
      const fraction = rawStep - visibleIteration
      const easedFraction = 1 - Math.pow(1 - fraction, 3)

      const points = trajectory.map((point) => ({
        x: plotX + point.x * plotW,
        y: plotY + point.y * plotH,
      }))

      ctx.strokeStyle = "#174c37"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i <= visibleIteration; i += 1) {
        ctx.lineTo(points[i].x, points[i].y)
      }
      if (visibleIteration < points.length - 1 && !reduceMotion) {
        const from = points[visibleIteration]
        const to = points[visibleIteration + 1]
        ctx.lineTo(
          from.x + (to.x - from.x) * easedFraction,
          from.y + (to.y - from.y) * easedFraction,
        )
      }
      ctx.stroke()

      const lastStaticPoint = reduceMotion ? points.length - 1 : visibleIteration
      for (let i = 0; i <= lastStaticPoint; i += 1) {
        ctx.beginPath()
        ctx.arc(points[i].x, points[i].y, i === lastStaticPoint ? 4.5 : 3, 0, Math.PI * 2)
        ctx.fillStyle = i === lastStaticPoint ? "#174c37" : "#f6f7f5"
        ctx.fill()
        ctx.strokeStyle = "#174c37"
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      const optimum = points[points.length - 1]
      ctx.strokeStyle = "rgba(23, 76, 55, 0.32)"
      ctx.lineWidth = 1
      roundedRect(ctx, optimum.x - 11, optimum.y - 11, 22, 22, 5)

      ctx.fillStyle = "rgba(28, 36, 32, 0.48)"
      ctx.font = "10px var(--font-geist-mono), ui-monospace, monospace"
      ctx.fillText("x₁", plotX + plotW - 4, plotY + plotH + 17)
      ctx.fillText("x₂", plotX - 17, plotY + 5)

      if (!reduceMotion) animationFrame = requestAnimationFrame(draw)
    }

    animationFrame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animationFrame)
      motionQuery.removeEventListener("change", updateMotionPreference)
    }
  }, [])

  return (
    <div className="landscape-frame">
      <canvas
        ref={canvasRef}
        className="landscape-canvas"
        role="img"
        aria-label="等高線上を6回の勾配降下反復で最適点へ収束する探索軌跡"
      />
    </div>
  )
}
