"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import SparseSignalScene from "./SparseSignalScene"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <SparseSignalScene />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e1a] z-10 pointer-events-none" />

      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-cyan-400/80 text-sm tracking-[0.3em] uppercase mb-4">
            Compressed Sensing &amp; Optimization
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">
            toufu24
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-2">
            東京農工大学 工学部 知能情報システム工学科
          </p>
          <p className="text-sm md:text-base text-gray-500 font-mono">
            Mathematical Optimization / Signal Processing / Compressed Sensing
          </p>
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
