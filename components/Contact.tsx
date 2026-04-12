"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Github, Mail, Trophy, ExternalLink, Copy, Check } from "lucide-react"

const E = ["fujinoso.job", "gmail.com"] as const

const staticLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.toufu24.dev",
    description: "@toufu-24",
  },
  {
    icon: Trophy,
    label: "AtCoder",
    href: "https://atcoder.toufu24.dev",
    description: "toufu24",
  },
]

function buildEmail() {
  return E.join("\x40")
}

function EmailLink() {
  const [copied, setCopied] = useState(false)

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = `mailto:${buildEmail()}`
  }, [])

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      await navigator.clipboard.writeText(buildEmail())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    },
    [],
  )

  return (
    <div className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.06]
                    bg-navy-800/50 hover:border-white/[0.12] transition-all duration-300">
      <Mail className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
      <div className="text-left">
        <div className="text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">
          Email
        </div>
        <div className="text-xs text-gray-500 font-mono">
          {E[0]} [at] {E[1]}
        </div>
      </div>
      <div className="flex items-center gap-1 ml-2">
        <button
          onClick={handleCopy}
          title="メールアドレスをコピー"
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan-400 transition-colors" />
          )}
        </button>
        <button
          onClick={handleOpen}
          title="メーラーで開く"
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan-400 transition-colors" />
        </button>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <footer id="contact" className="py-24 px-4 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Contact
          </h2>
          <p className="text-gray-500 text-sm font-mono tracking-wider">連絡先</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {staticLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.06]
                         bg-navy-800/50 hover:border-white/[0.12] transition-all duration-300"
            >
              <link.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">
                  {link.label}
                </div>
                <div className="text-xs text-gray-500 font-mono">{link.description}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-cyan-400 transition-colors ml-2" />
            </a>
          ))}
          <EmailLink />
        </motion.div>

        <div className="text-center text-xs text-gray-600 font-mono">
          <p>&copy; {new Date().getFullYear()} So Fujino. Built with Next.js</p>
        </div>
      </div>
    </footer>
  )
}
