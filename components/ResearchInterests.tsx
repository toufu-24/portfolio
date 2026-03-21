"use client"

import { motion } from "framer-motion"
import { Sigma, BarChart3, Radio } from "lucide-react"

const researchAreas = [
  {
    icon: Sigma,
    title: "圧縮センシング",
    titleEn: "Compressed Sensing",
    description:
      "スパース性を活用した効率的な信号復元手法の研究。少数の観測データから元の信号を高精度に再構成する理論と応用に取り組んでいます。",
    formula: "min ‖x‖₁  s.t. y = Φx",
    keywords: ["スパース復元", "RIP条件", "L1最小化", "基底追跡"],
  },
  {
    icon: BarChart3,
    title: "数理最適化",
    titleEn: "Mathematical Optimization",
    description:
      "凸最適化やスパース最適化を中心に、効率的なアルゴリズムの設計と解析を行っています。近接勾配法などの反復法に関心があります。",
    formula: "min f(x) + λ‖x‖₁",
    keywords: ["凸最適化", "近接勾配法", "ADMM", "ISTA/FISTA"],
  },
  {
    icon: Radio,
    title: "信号処理",
    titleEn: "Signal Processing",
    description:
      "画像やセンサデータなどの信号に対する、効率的な処理・解析手法の研究。圧縮センシングの実応用にも取り組んでいます。",
    formula: "y = Ax + n",
    keywords: ["フーリエ変換", "ウェーブレット", "ノイズ除去", "画像再構成"],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function ResearchInterests() {
  return (
    <section id="research" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
            Research Interests
          </h2>
          <p className="text-gray-500 text-sm font-mono tracking-wider">研究分野</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {researchAreas.map((area) => (
            <motion.div
              key={area.titleEn}
              variants={cardVariants}
              className="group relative rounded-xl border border-white/[0.06] bg-navy-800/50 p-6 backdrop-blur-sm
                         hover:border-cyan-500/20 hover:glow-cyan transition-all duration-500"
            >
              <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-500/20 leading-tight select-none">
                {area.formula}
              </div>

              <div className="mb-4 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center
                              group-hover:bg-cyan-500/20 transition-colors duration-300">
                <area.icon className="w-5 h-5 text-cyan-400" />
              </div>

              <h3 className="text-lg font-bold text-gray-100 mb-1">{area.title}</h3>
              <p className="text-xs font-mono text-cyan-500/50 mb-3">{area.titleEn}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {area.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {area.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 text-[11px] rounded-full border border-cyan-500/10
                               text-cyan-400/60 bg-cyan-500/5 font-mono"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
