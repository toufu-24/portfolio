"use client"

import { useRef, useEffect, useCallback } from "react"

/* ========== types ========== */
type Vec2 = { x: number; y: number }

type GraphNode = Vec2 & {
  vx: number
  vy: number
  radius: number
  phase: number
  color: string
}

type GradStep = Vec2 & { alpha: number }

/* ========== helpers ========== */
const TAU = Math.PI * 2

/** Rosenbrock-like 2D objective for contour visualisation */
function objective(x: number, y: number) {
  return (1 - x) ** 2 + 3 * (y - x * x) ** 2
}

/** Pre-compute gradient descent path on the objective */
function computeGradientPath(steps: number): GradStep[] {
  let x = -1.2
  let y = 1.0
  const lr = 0.012
  const path: GradStep[] = []
  for (let i = 0; i < steps; i++) {
    const gx = -2 * (1 - x) + 3 * 2 * (y - x * x) * (-2 * x)
    const gy = 3 * 2 * (y - x * x)
    x -= lr * gx
    y -= lr * gy
    path.push({ x, y, alpha: 0 })
  }
  return path
}

export default function SparseSignalScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<Vec2>({ x: -999, y: -999 })
  const stateRef = useRef<{
    nodes: GraphNode[]
    gradPath: GradStep[]
    sparseSignal: { pos: number; height: number; phase: number }[]
  } | null>(null)
  const animRef = useRef(0)

  const init = useCallback((w: number, h: number) => {
    const nodeCount = Math.min(55, Math.floor((w * h) / 18000))
    const nodes: GraphNode[] = []
    const colors = ["#00d4ff", "#0ea5e9", "#38bdf8", "#67e8f9", "#a78bfa", "#818cf8"]
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: 1.5 + Math.random() * 2,
        phase: Math.random() * TAU,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const sparseCount = 80
    const sparseSignal = Array.from({ length: sparseCount }, (_, i) => ({
      pos: i / sparseCount,
      height: Math.random() > 0.75 ? 0.4 + Math.random() * 0.6 : Math.random() * 0.08,
      phase: Math.random() * TAU,
    }))

    stateRef.current = {
      nodes,
      gradPath: computeGradientPath(300),
      sparseSignal,
    }
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
      init(w, h)
    }
    resize()
    window.addEventListener("resize", resize)

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    canvas.addEventListener("mousemove", onMouse)

    /* ===== draw helpers ===== */

    /** Contour lines of the objective function (top-left quadrant) */
    const drawContours = (cx: number, cy: number, scale: number, t: number) => {
      const levels = [0.1, 0.5, 1.5, 4, 10, 25]
      const step = 4
      for (const level of levels) {
        ctx.beginPath()
        const breathe = 1 + Math.sin(t * 0.3 + level) * 0.02
        const effectiveLevel = level * breathe
        for (let px = -scale; px <= scale; px += step) {
          for (let py = -scale; py <= scale; py += step) {
            const ox = px / scale * 2.5
            const oy = py / scale * 2.5
            const v = objective(ox, oy)
            if (Math.abs(v - effectiveLevel) < 0.3 + level * 0.08) {
              ctx.rect(cx + px, cy + py, 1, 1)
            }
          }
        }
        const a = 0.04 + (1 - level / 25) * 0.06
        ctx.fillStyle = `rgba(0, 212, 255, ${a})`
        ctx.fill()
      }
    }

    /** Animated gradient descent trail */
    const drawGradientDescent = (
      path: GradStep[],
      cx: number,
      cy: number,
      scale: number,
      t: number,
    ) => {
      const headIdx = Math.floor((t * 18) % path.length)
      const trailLen = 60

      ctx.lineWidth = 1.5
      ctx.lineCap = "round"

      for (let i = 0; i < trailLen; i++) {
        const idx = (headIdx - i + path.length) % path.length
        const nextIdx = (idx + 1) % path.length
        const p = path[idx]
        const np = path[nextIdx]
        const fade = 1 - i / trailLen
        const a = fade * 0.6
        ctx.beginPath()
        ctx.strokeStyle = `rgba(0, 212, 255, ${a})`
        ctx.moveTo(cx + (p.x / 2.5) * scale, cy + (p.y / 2.5) * scale)
        ctx.lineTo(cx + (np.x / 2.5) * scale, cy + (np.y / 2.5) * scale)
        ctx.stroke()
      }

      const head = path[headIdx]
      const hx = cx + (head.x / 2.5) * scale
      const hy = cy + (head.y / 2.5) * scale
      ctx.beginPath()
      ctx.arc(hx, hy, 4, 0, TAU)
      ctx.fillStyle = "rgba(0, 212, 255, 0.9)"
      ctx.fill()
      ctx.beginPath()
      ctx.arc(hx, hy, 10, 0, TAU)
      ctx.fillStyle = "rgba(0, 212, 255, 0.12)"
      ctx.fill()

      // Convergence star at (1,1) minimum
      const starX = cx + (1 / 2.5) * scale
      const starY = cy + (1 / 2.5) * scale
      const pulse = 0.5 + Math.sin(t * 2) * 0.5
      ctx.beginPath()
      ctx.arc(starX, starY, 2 + pulse * 2, 0, TAU)
      ctx.fillStyle = `rgba(167, 139, 250, ${0.4 + pulse * 0.3})`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(starX, starY, 8 + pulse * 6, 0, TAU)
      ctx.fillStyle = `rgba(167, 139, 250, ${0.04 + pulse * 0.04})`
      ctx.fill()
    }

    /** Graph network (discrete optimisation) */
    const drawGraph = (nodes: GraphNode[], mx: number, my: number, t: number) => {
      const edgeDist = 170

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < edgeDist) {
            const progress = (1 - dist / edgeDist)
            const flowPhase = (t * 0.8 + i * 0.3 + j * 0.2) % 1
            const flowAlpha = progress * 0.12 * (0.5 + Math.sin(flowPhase * TAU) * 0.5)

            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 212, 255, ${flowAlpha})`
            ctx.lineWidth = 0.6
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()

            // Flow particle along edge
            if (progress > 0.5) {
              const fp = (t * 0.3 + i * 0.1) % 1
              const fx = nodes[i].x + (nodes[j].x - nodes[i].x) * fp
              const fy = nodes[i].y + (nodes[j].y - nodes[i].y) * fp
              ctx.beginPath()
              ctx.arc(fx, fy, 1, 0, TAU)
              ctx.fillStyle = `rgba(0, 212, 255, ${progress * 0.2})`
              ctx.fill()
            }
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1

        const mdx = n.x - mx
        const mdy = n.y - my
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        const mInf = Math.max(0, 1 - mDist / 220)

        const pulse = 0.6 + Math.sin(t * 1.2 + n.phase) * 0.4
        const r = n.radius * (1 + mInf * 0.6)
        const a = pulse * (0.3 + mInf * 0.5)

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, TAU)
        ctx.fillStyle = n.color.replace(")", `, ${a})`)
          .replace("rgb", "rgba")
          .replace("#", "")
        // Hex to rgba
        const hex = n.color
        const rr = parseInt(hex.slice(1, 3), 16)
        const gg = parseInt(hex.slice(3, 5), 16)
        const bb = parseInt(hex.slice(5, 7), 16)
        ctx.fillStyle = `rgba(${rr}, ${gg}, ${bb}, ${a})`
        ctx.fill()

        if (mInf > 0.3) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 3, 0, TAU)
          ctx.fillStyle = `rgba(${rr}, ${gg}, ${bb}, ${a * 0.1})`
          ctx.fill()
        }
      }
    }

    /** Sparse signal bars at bottom */
    const drawSparseSignal = (
      bars: { pos: number; height: number; phase: number }[],
      t: number,
    ) => {
      const barAreaY = h * 0.82
      const barAreaH = h * 0.14
      const barW = Math.max(1.5, w / bars.length * 0.4)

      for (const bar of bars) {
        const x = bar.pos * w
        const pulse = 0.7 + Math.sin(t * 0.8 + bar.phase) * 0.3
        const bh = bar.height * barAreaH * pulse

        if (bar.height > 0.3) {
          const grad = ctx.createLinearGradient(x, barAreaY, x, barAreaY - bh)
          grad.addColorStop(0, `rgba(0, 212, 255, 0.01)`)
          grad.addColorStop(0.5, `rgba(0, 212, 255, ${0.15 * pulse})`)
          grad.addColorStop(1, `rgba(0, 212, 255, ${0.3 * pulse})`)
          ctx.fillStyle = grad
          ctx.fillRect(x - barW / 2, barAreaY - bh, barW, bh)

          ctx.beginPath()
          ctx.arc(x, barAreaY - bh, 1.5, 0, TAU)
          ctx.fillStyle = `rgba(0, 212, 255, ${0.5 * pulse})`
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(0, 212, 255, 0.03)`
          ctx.fillRect(x - 0.5, barAreaY - bh, 1, bh)
        }
      }

      // Baseline
      ctx.beginPath()
      ctx.strokeStyle = "rgba(0, 212, 255, 0.04)"
      ctx.lineWidth = 0.5
      ctx.moveTo(0, barAreaY)
      ctx.lineTo(w, barAreaY)
      ctx.stroke()

      // Label
      ctx.font = "9px monospace"
      ctx.fillStyle = "rgba(0, 212, 255, 0.08)"
      ctx.fillText("‖x‖₀ ≪ n", w * 0.02, barAreaY + 12)
      ctx.fillText("sparse signal", w * 0.85, barAreaY + 12)
    }

    /** Floating math formulas */
    const formulas = [
      { text: "min ‖x‖₁  s.t. Φx = y", x: 0.06, y: 0.15, size: 11 },
      { text: "∇f(xₖ) → 0", x: 0.82, y: 0.12, size: 10 },
      { text: "xₖ₊₁ = proxλg(xₖ − γ∇f(xₖ))", x: 0.65, y: 0.28, size: 9 },
      { text: "δₛ ≤ √2 − 1", x: 0.08, y: 0.72, size: 10 },
      { text: "y = Φx + e", x: 0.88, y: 0.68, size: 10 },
      { text: "O(n log n)", x: 0.12, y: 0.42, size: 9 },
      { text: "min Σ wᵢⱼ xᵢⱼ", x: 0.78, y: 0.48, size: 9 },
      { text: "LP relaxation", x: 0.04, y: 0.58, size: 8 },
      { text: "∀(u,v)∈E: c(u)≠c(v)", x: 0.72, y: 0.82, size: 8 },
    ]

    const drawFormulas = (t: number) => {
      for (const f of formulas) {
        const drift = Math.sin(t * 0.2 + f.x * 10) * 8
        const a = 0.04 + Math.sin(t * 0.3 + f.y * 8) * 0.02
        ctx.font = `${f.size}px monospace`
        ctx.fillStyle = `rgba(0, 212, 255, ${a})`
        ctx.fillText(f.text, f.x * w + drift, f.y * h)
      }
    }

    /* ===== main loop ===== */
    const draw = (time: number) => {
      const state = stateRef.current
      if (!state) { animRef.current = requestAnimationFrame(draw); return }

      ctx.clearRect(0, 0, w, h)
      const t = time * 0.001
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Layer 1: Contour lines (top-left area)
      const contourCx = w * 0.22
      const contourCy = h * 0.35
      const contourScale = Math.min(w, h) * 0.28
      drawContours(contourCx, contourCy, contourScale, t)

      // Layer 2: Gradient descent animation on the contour
      drawGradientDescent(state.gradPath, contourCx, contourCy, contourScale, t)

      // Layer 3: Graph structure (whole canvas)
      drawGraph(state.nodes, mx, my, t)

      // Layer 4: Sparse signal bars (bottom)
      drawSparseSignal(state.sparseSignal, t)

      // Layer 5: Floating formulas
      drawFormulas(t)

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", onMouse)
    }
  }, [init])

  return (
    <div className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
