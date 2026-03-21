"use client"

import { motion } from "framer-motion"
import { Sigma, BarChart3, Code2 } from "lucide-react"
import MiniCanvas from "./MiniCanvas"

const researchAreas = [
  {
    icon: Sigma,
    title: "スパース最適化",
    titleEn: "Sparse Optimization",
    description:
      "少数の重要な成分だけで信号やデータを表現する「スパース性」を手がかりに、高次元の問題を効率よく解くための最適化手法を研究しています。",
    canvas: "sparse" as const,
    accent: {
      text: "text-cyan-400",
      bg: "bg-cyan-500",
      bgFaint: "bg-cyan-500/10",
      bgHover: "group-hover:bg-cyan-500/20",
      border: "border-cyan-500/20",
      glow: "group-hover:shadow-[0_0_30px_rgba(0,212,255,0.12)]",
      gradientFrom: "from-cyan-500/30",
    },
  },
  {
    icon: BarChart3,
    title: "最適化アルゴリズム",
    titleEn: "Optimization Algorithms",
    description:
      "大規模・複雑な問題に対して、いかに速く正確な解を得るか。凸最適化や貪欲法などのアルゴリズム設計を通じて、計算効率と解の精度を両立させるアプローチに関心があります。",
    canvas: "convergence" as const,
    accent: {
      text: "text-violet-400",
      bg: "bg-violet-500",
      bgFaint: "bg-violet-500/10",
      bgHover: "group-hover:bg-violet-500/20",
      border: "border-violet-500/20",
      glow: "group-hover:shadow-[0_0_30px_rgba(167,139,250,0.12)]",
      gradientFrom: "from-violet-500/30",
    },
  },
  {
    icon: Code2,
    title: "アルゴリズムとデータ構造",
    titleEn: "Algorithms & Data Structures",
    description:
      "問題の構造を見抜き、適切なアルゴリズムとデータ構造を選択・設計することに関心があります。AtCoder での実践を通じて、計算量を意識した効率的な問題解決力を磨いています。",
    canvas: "spectrum" as const,
    accent: {
      text: "text-emerald-400",
      bg: "bg-emerald-500",
      bgFaint: "bg-emerald-500/10",
      bgHover: "group-hover:bg-emerald-500/20",
      border: "border-emerald-500/20",
      glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.12)]",
      gradientFrom: "from-emerald-500/30",
    },
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function ResearchInterests() {
  return (
    <section id="research" className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Interests
          </h2>
          <p className="text-gray-500 text-sm font-mono tracking-wider">
            関心領域
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7"
        >
          {researchAreas.map((area, i) => (
            <motion.div
              key={area.titleEn}
              variants={cardVariants}
              className={`group relative rounded-2xl border border-white/[0.06] bg-navy-800/40 overflow-hidden
                         hover:border-white/[0.10] ${area.accent.glow}
                         transition-all duration-500 ease-out`}
            >
              {/* Top accent line */}
              <div
                className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${area.accent.gradientFrom} via-transparent to-transparent
                           opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Canvas visualization */}
              <div className="h-36 relative overflow-hidden">
                <MiniCanvas variant={area.canvas} />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-800/20 via-transparent to-navy-800" />
              </div>

              {/* Content */}
              <div className="px-6 pb-6 -mt-2 relative">
                {/* Number + Icon row */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${area.accent.bgFaint} ${area.accent.bgHover}
                                flex items-center justify-center transition-colors duration-300`}
                  >
                    <area.icon
                      className={`w-[18px] h-[18px] ${area.accent.text} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-white/[0.08] group-hover:text-white/[0.15] transition-colors duration-500 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-100 mb-1 group-hover:text-white transition-colors duration-300">
                  {area.title}
                </h3>
                <p
                  className={`text-[11px] font-mono ${area.accent.text} opacity-40 group-hover:opacity-60 mb-4 transition-opacity duration-300`}
                >
                  {area.titleEn}
                </p>

                {/* Description */}
                <p className="text-[13px] text-gray-400 leading-[1.8] group-hover:text-gray-300 transition-colors duration-300">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
