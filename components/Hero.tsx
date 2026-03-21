"use client"

import { motion } from "framer-motion"
import { ChevronDown, Github, Trophy, Linkedin } from "lucide-react"
import SparseSignalScene from "./SparseSignalScene"

const badges = [
  {
    icon: Trophy,
    label: "AtCoder",
    sub: "toufu24",
    href: "https://atcoder.toufu24.dev",
    color: "text-cyan-400",
    borderColor: "border-cyan-500/20 hover:border-cyan-400/40",
    glowColor: "hover:shadow-[0_0_16px_rgba(0,212,255,0.15)]",
  },
  {
    icon: Github,
    label: "GitHub",
    sub: "@toufu-24",
    href: "https://github.toufu24.dev",
    color: "text-gray-300",
    borderColor: "border-white/10 hover:border-white/25",
    glowColor: "hover:shadow-[0_0_16px_rgba(255,255,255,0.06)]",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    sub: "So Fujino",
    href: "https://www.linkedin.com/in/so-fujino-0b50873b4/",
    color: "text-blue-400",
    borderColor: "border-blue-500/20 hover:border-blue-400/40",
    glowColor: "hover:shadow-[0_0_16px_rgba(59,130,246,0.15)]",
  },
]

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
          <p className="text-xs md:text-sm font-mono text-gray-500 tracking-[0.25em] mb-1">
            Fujino So
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            藤野 創
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-6">
            東京農工大学 工学部 知能情報システム工学科
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3"
        >
          {badges.map((badge, i) => (
            <motion.a
              key={badge.label}
              href={badge.href}
              target={badge.href.startsWith("http") ? "_blank" : undefined}
              rel={badge.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.12 }}
              className={`group flex items-center gap-2 px-4 py-2 rounded-full border
                bg-white/[0.03] backdrop-blur-sm transition-all duration-300
                ${badge.borderColor} ${badge.glowColor}`}
            >
              <badge.icon className={`w-3.5 h-3.5 ${badge.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
                {badge.label}
              </span>
              <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                {badge.sub}
              </span>
            </motion.a>
          ))}
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
