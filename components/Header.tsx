"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Research Interests", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Timeline", href: "#timeline" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub Activity", href: "#github" },
  { label: "Contact", href: "#contact" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  useEffect(() => {
    const onScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1))
      let current = ""
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = (href: string) => {
    setMobileOpen(false)
    const el = document.getElementById(href.slice(1))
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Desktop */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
      >
        <div className={`transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0e1a]/60 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}>
          <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[11px] font-mono font-medium text-white/80 hover:text-white transition-colors duration-200 tracking-widest uppercase"
            >
              So Fujino's Website
            </button>

            <div className="flex items-center">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <button
                    key={item.href}
                    onClick={() => handleClick(item.href)}
                    className="relative px-2.5 py-1 text-[11px] font-mono tracking-wide"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-2.5 right-2.5 h-px bg-cyan-400"
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      />
                    )}
                    <span className={`transition-colors duration-200 ${
                      isActive ? "text-cyan-400" : "text-gray-600 hover:text-gray-300"
                    }`}>
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
      >
        <div className={`transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-[#0a0e1a]/80 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}>
          <div className="px-5 h-14 flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[11px] font-mono font-medium text-white/80 tracking-widest uppercase"
            >
              So Fujino's Website
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-cyan-400 transition-colors"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-[18px] h-[18px]" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-[18px] h-[18px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden bg-[#0a0e1a]/90 backdrop-blur-2xl border-b border-white/[0.06]"
            >
              <div className="px-5 py-3 flex flex-col">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href.slice(1)
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      onClick={() => handleClick(item.href)}
                      className={`text-left px-3 py-2.5 text-xs font-mono tracking-wide transition-colors duration-200 border-l-2 ${
                        isActive
                          ? "text-cyan-400 border-cyan-400"
                          : "text-gray-600 border-transparent hover:text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
