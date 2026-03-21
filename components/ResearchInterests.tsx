"use client"

import { motion } from "framer-motion"
import { Sigma, BarChart3, Radio } from "lucide-react"
import MiniCanvas from "./MiniCanvas"

const researchAreas = [
  {
    icon: Sigma,
    title: "スパース最適化",
    titleEn: "Sparse Optimization",
    description:
      "スパース性を活用した最適化問題の定式化と求解。凸緩和（ℓ₁/ℓ₂,₁ 正則化）や貪欲法など、多様なアプローチの理論的性質と実用性能を比較・研究しています。",
    keywords: ["凸最適化", "ℓ₂/ℓ₁正則化", "RIP条件", "スパース復元"],
    canvas: "sparse" as const,
  },
  {
    icon: BarChart3,
    title: "最適化アルゴリズム",
    titleEn: "Optimization Algorithms",
    description:
      "OMP・BOMPを基盤とした貪欲法の設計と解析。提案手法 SOMP では、評価関数の最大化を最大部分配列問題に帰着させ、動的計画法による効率的なブロック選択を実現しました。",
    keywords: ["OMP", "SOMP", "動的計画法", "Kadane's Algorithm"],
    canvas: "convergence" as const,
  },
  {
    icon: Radio,
    title: "信号処理",
    titleEn: "Signal Processing",
    description:
      "無線通信・レーダー・画像解析などに現れるブロック構造を持つ信号の復元と処理。少数の観測から高精度に信号を復元する圧縮センシングの枠組みを中心に研究しています。",
    keywords: ["圧縮センシング", "ブロックスパース", "信号復元", "ノイズ除去"],
    canvas: "spectrum" as const,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
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
              className="group relative rounded-xl border border-white/[0.06] bg-navy-800/50 overflow-hidden
                         hover:border-cyan-500/20 hover:glow-cyan transition-all duration-500"
            >
              <div className="h-32 relative overflow-hidden">
                <MiniCanvas variant={area.canvas} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-800/95" />
              </div>

              <div className="p-5 pt-3">
                <div className="mb-3 w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center
                                group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <area.icon className="w-4 h-4 text-cyan-400" />
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
