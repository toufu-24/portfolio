"use client"

import { motion } from "framer-motion"
import { ChevronDown, Github, Trophy, Linkedin } from "lucide-react"
import SparseSignalScene from "./SparseSignalScene"

const links = [
  {
    icon: Trophy,
    label: "AtCoder",
    sub: "toufu24",
    href: "https://atcoder.toufu24.dev",
  },
  {
    icon: Github,
    label: "GitHub",
    sub: "@toufu-24",
    href: "https://github.toufu24.dev",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    sub: "So Fujino",
    href: "https://www.linkedin.com/in/so-fujino-0b50873b4/",
  },
]

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <SparseSignalScene />

      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 48%, rgba(10,14,26,0.4) 0%, transparent 65%),
            linear-gradient(to bottom, transparent 65%, #0a0e1a 100%)
          `,
        }}
      />

      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[11px] md:text-xs font-mono text-gray-500/80 tracking-[0.35em] uppercase mb-3">
            Fujino So
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-3">
            藤野 創
          </h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mb-5 h-px w-16 origin-center bg-white/20"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm md:text-base text-gray-400/90 tracking-wide mb-2"
        >
          東京農工大学 工学部 知能情報システム工学科
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex justify-center items-center gap-6"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 1.3 + i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              <link.icon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-xs font-mono tracking-wide">
                {link.sub}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] font-mono text-gray-600 tracking-[0.3em] group-hover:text-gray-400 transition-colors duration-500">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors duration-500" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
