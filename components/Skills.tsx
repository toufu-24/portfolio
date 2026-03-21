"use client"

import { motion } from "framer-motion"

type SkillCategory = {
  name: string
  nameEn: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "プログラミング言語",
    nameEn: "Languages",
    skills: ["Python", "C++", "C", "TypeScript", "JavaScript", "Rust", "MATLAB"],
  },
  {
    name: "フレームワーク・ライブラリ",
    nameEn: "Frameworks",
    skills: ["Next.js", "React", "NumPy", "SciPy", "PyTorch", "Unity", "Tailwind CSS"],
  },
  {
    name: "ツール・環境",
    nameEn: "Tools",
    skills: ["Git", "Docker", "Linux", "LaTeX", "VS Code", "Jupyter"],
  },
  {
    name: "数学・理論",
    nameEn: "Mathematics",
    skills: ["線形代数", "凸最適化", "確率統計", "信号処理", "圧縮センシング", "フーリエ解析", "情報理論"],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
            Skills
          </h2>
          <p className="text-gray-500 text-sm font-mono tracking-wider">技術スキル</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.nameEn}
              variants={categoryVariants}
              className="rounded-xl border border-white/[0.06] bg-navy-800/50 p-6"
            >
              <h3 className="text-base font-semibold text-gray-200 mb-1">
                {category.name}
              </h3>
              <p className="text-xs font-mono text-cyan-500/50 mb-4">{category.nameEn}</p>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs rounded-md border border-white/[0.06]
                               text-gray-300 bg-navy-700/50 hover:border-cyan-500/20
                               hover:text-cyan-400 transition-all duration-200 font-mono"
                  >
                    {skill}
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
