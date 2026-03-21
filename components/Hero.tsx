"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import SparseSignalScene from "./SparseSignalScene"

const floatingFormulas = [
  { text: "y = Ax + v", x: "8%", y: "18%", delay: 0.3, size: "text-xs" },
  { text: "f(I) = Σ cₙ² − λ|I|", x: "5%", y: "26%", delay: 0.6, size: "text-[11px]" },
  { text: "supp(x) = ∪[lᵦ, rᵦ]", x: "85%", y: "15%", delay: 0.9, size: "text-xs" },
  { text: "dₙ = cₙ² − λ", x: "82%", y: "24%", delay: 0.5, size: "text-[10px]" },
  { text: "λ = Q₃ + β · IQR", x: "10%", y: "70%", delay: 1.0, size: "text-[10px]" },
  { text: "δ₂ₛ < √2 − 1", x: "88%", y: "72%", delay: 0.7, size: "text-[11px]" },
  { text: "arg max Σ dₙ", x: "6%", y: "48%", delay: 1.2, size: "text-[10px]" },
  { text: "min ‖x‖₂,₁", x: "86%", y: "50%", delay: 0.4, size: "text-[10px]" },
]

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <SparseSignalScene />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e1a] z-10 pointer-events-none" />

      {/* Floating formulas */}
      {floatingFormulas.map((f, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.12, 0.06, 0.12, 0],
            y: [0, -8, 0, 8, 0],
          }}
          transition={{
            delay: f.delay,
            duration: 8 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute z-10 font-mono ${f.size} text-cyan-400/10 select-none pointer-events-none whitespace-nowrap`}
          style={{ left: f.x, top: f.y }}
        >
          {f.text}
        </motion.span>
      ))}

      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-cyan-400/80 text-sm tracking-[0.3em] uppercase mb-4">
            Optimization &amp; Signal Processing
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">
            藤野 創
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-2">
            東京農工大学 工学部 知能情報システム工学科
          </p>
          <div className="flex items-center justify-center gap-3 text-sm md:text-base text-gray-500 font-mono">
            <span className="text-cyan-500/40">⟨</span>
            <span>Optimization</span>
            <span className="text-cyan-500/40">|</span>
            <span>Signal Processing</span>
            <span className="text-cyan-500/40">⟩</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex justify-center gap-4"
        >
          <a
            href="#about"
            className="px-6 py-2.5 rounded-full border border-cyan-500/30 text-cyan-400 text-sm
                       hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            About
          </a>
          <a
            href="#publications"
            className="px-6 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm
                       hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
          >
            Publications
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <a href="#about" className="flex flex-col items-center text-gray-500 hover:text-cyan-400 transition-colors">
          <span className="text-xs mb-1 tracking-wider">SCROLL</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}
