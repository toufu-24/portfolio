"use client"

import { useRef, useEffect } from "react"

type MiniCanvasProps = {
  variant: "sparse" | "convergence" | "spectrum" | "segtree"
  className?: string
}

type STNode = { x: number; y: number; d: number; l: number; r: number }

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
      const barW = (w / bars.length) * 0.6

      for (const bar of bars) {
        bar.current += (bar.target * reconstructProgress - bar.current) * 0.05
        const x = bar.pos * w
        const bh = bar.current * h * 0.7
        if (bh > 1) {
          const grad = ctx.createLinearGradient(x, h, x, h - bh)
          grad.addColorStop(0, "rgba(148, 163, 184, 0.02)")
          grad.addColorStop(1, "rgba(148, 163, 184, 0.25)")
          ctx.fillStyle = grad
          ctx.fillRect(x, h - bh, barW, bh)

          if (bar.target > 0.3) {
            const glow = ctx.createRadialGradient(x + barW / 2, h - bh, 0, x + barW / 2, h - bh, 4)
            glow.addColorStop(0, "rgba(148, 163, 184, 0.2)")
            glow.addColorStop(1, "rgba(148, 163, 184, 0)")
            ctx.beginPath()
            ctx.arc(x + barW / 2, h - bh, 4, 0, Math.PI * 2)
            ctx.fillStyle = glow
            ctx.fill()
          }
        }
      }
    }

    const drawConvergence = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const pad = 4

      ctx.beginPath()
      ctx.strokeStyle = "rgba(148, 163, 184, 0.2)"
      ctx.lineWidth = 1.2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      for (let x = 0; x <= w - pad * 2; x++) {
        const p = x / (w - pad * 2)
        const noise = Math.sin(p * 25 + t * 0.5) * 0.1 * Math.exp(-p * 3)
        const val = Math.exp(-p * 3.5) * (1 + noise)
        const px = pad + x
        const py = h * 0.9 - val * h * 0.75
        x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.stroke()

      for (let i = 1; i <= 5; i++) {
        const p = i / 6
        const val = Math.exp(-p * 3.5)
        const px = pad + p * (w - pad * 2)
        const py = h * 0.9 - val * h * 0.75

        const glow = ctx.createRadialGradient(px, py, 0, px, py, 6)
        glow.addColorStop(0, "rgba(167, 139, 250, 0.2)")
        glow.addColorStop(1, "rgba(167, 139, 250, 0)")
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(167, 139, 250, 0.35)"
        ctx.fill()
      }
    }

    const BT_DEPTH = 4
    const BT_SIZE = (1 << (BT_DEPTH + 1)) - 1
    const btNodes: { x: number; y: number; d: number; phase: number }[] = []

    const buildBT = (i: number, d: number, xl: number, xr: number) => {
      if (d > BT_DEPTH) return
      const py = h * 0.1
      btNodes[i] = {
        x: (xl + xr) / 2,
        y: py + (h - py * 2) * (d / BT_DEPTH),
        d,
        phase: Math.random() * Math.PI * 2,
      }
      buildBT(i * 2 + 1, d + 1, xl, (xl + xr) / 2)
      buildBT(i * 2 + 2, d + 1, (xl + xr) / 2, xr)
    }
    buildBT(0, 0, w * 0.03, w * 0.97)

    const drawSegTree = (t: number) => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < BT_SIZE; i++) {
        const n = btNodes[i]
        if (!n) continue
        for (const ci of [i * 2 + 1, i * 2 + 2]) {
          const cn = btNodes[ci]
          if (!cn) continue
          const flow = 0.5 + Math.sin(t * 0.6 + i * 0.7 + ci * 0.3) * 0.5
          const a = 0.04 + flow * 0.08

          ctx.beginPath()
          ctx.strokeStyle = `rgba(52, 211, 153, ${a})`
          ctx.lineWidth = 0.7
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(cn.x, cn.y)
          ctx.stroke()

          const ft = (t * 0.4 + i * 0.5) % 1
          const fx = n.x + (cn.x - n.x) * ft
          const fy = n.y + (cn.y - n.y) * ft
          ctx.beginPath()
          ctx.arc(fx, fy, 1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(52, 211, 153, ${flow * 0.2})`
          ctx.fill()
        }
      }

      for (let i = 0; i < BT_SIZE; i++) {
        const n = btNodes[i]
        if (!n) continue
        const pulse = 0.5 + Math.sin(t * 0.8 + n.phase) * 0.4
        const r = 1.8 + (BT_DEPTH - n.d) * 0.6
        const a = (0.12 + pulse * 0.18)

        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3)
        glow.addColorStop(0, `rgba(52, 211, 153, ${a * 0.25})`)
        glow.addColorStop(1, "rgba(52, 211, 153, 0)")
        ctx.beginPath()
        ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(52, 211, 153, ${a})`
        ctx.fill()
      }
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
        const a = 0.08 + magnitude * 0.25

        const grad = ctx.createLinearGradient(i * binW + 1, h, i * binW + 1, h - bh)
        grad.addColorStop(0, `rgba(148, 163, 184, ${a * 0.1})`)
        grad.addColorStop(1, `rgba(148, 163, 184, ${a})`)
        ctx.fillStyle = grad
        ctx.fillRect(i * binW + 1, h - bh, binW - 2, bh)

        if (magnitude > 0.3) {
          const glow = ctx.createRadialGradient(
            i * binW + binW / 2, h - bh, 0,
            i * binW + binW / 2, h - bh, 5,
          )
          glow.addColorStop(0, `rgba(148, 163, 184, ${magnitude * 0.2})`)
          glow.addColorStop(1, "rgba(148, 163, 184, 0)")
          ctx.beginPath()
          ctx.arc(i * binW + binW / 2, h - bh, 5, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }
      }
    }

    const animate = (time: number) => {
      const t = time * 0.001
      switch (variant) {
        case "sparse":
          drawSparse(t)
          break
        case "convergence":
          drawConvergence(t)
          break
        case "spectrum":
          drawSpectrum(t)
          break
        case "segtree":
          drawSegTree(t)
          break
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
