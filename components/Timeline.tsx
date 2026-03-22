"use client"

import { motion } from "framer-motion"
import {
  Award,
  Trophy,
  Cake,
  School,
  GraduationCap,
} from "lucide-react"

type TimelineItem = {
  date: string
  title: string
  description: string
  type: "birth" | "school" | "trophy" | "award" | "research"
}

const timelineItems: TimelineItem[] = [
  { date: "2004-02", title: "誕生", description: "", type: "birth" },
  { date: "2022-04", title: "東京農工大学入学", description: "工学部 知能情報システム工学科", type: "school" },
  { date: "2022-08", title: "AtCoder Algorithm 灰色", description: "AtCoder Algorithm部門に参加", type: "trophy" },
  { date: "2022-10", title: "AtCoder Heuristic 灰色", description: "AtCoder Heuristic部門に参加", type: "trophy" },
  { date: "2022-10", title: "AtCoder Algorithm 茶色", description: "レート 400 達成", type: "trophy" },
  { date: "2023-02", title: "AtCoder Heuristic 茶色", description: "レート 400 達成", type: "trophy" },
  { date: "2023-04", title: "数理情報工学コース配属", description: "", type: "school" },
  { date: "2023-08", title: "AtCoder Algorithm 緑色", description: "レート 800 達成", type: "trophy" },
  { date: "2023-08", title: "AtCoder Heuristic 緑色", description: "レート 800 達成", type: "trophy" },
  { date: "2024-06", title: "AtCoder Algorithm 水色", description: "レート 1200 達成", type: "trophy" },
  { date: "2024-07", title: "AtCoder Heuristic 水色", description: "レート 1200 達成", type: "trophy" },
  { date: "2024-07", title: "CG エンジニア検定エキスパート 合格", description: "", type: "award" },
  { date: "2024-07", title: "画像処理エンジニア検定エキスパート 合格", description: "", type: "award" },
  { date: "2024-07", title: "応用情報技術者試験 合格", description: "", type: "award" },
  { date: "2025-03", title: "AtCoder Heuristic 青色", description: "レート 1600 達成", type: "trophy" },
]

const getAtCoderColor = (title: string): string => {
  if (title.includes("灰色")) return "#808080"
  if (title.includes("茶色")) return "#b45309"
  if (title.includes("緑色")) return "#22c55e"
  if (title.includes("水色")) return "#67e8f9"
  if (title.includes("青色")) return "#3b82f6"
  return "#94a3b8"
}

const getIcon = (type: string, title: string) => {
  switch (type) {
    case "birth":
      return <Cake className="w-5 h-5" />
    case "school":
      return title.includes("入学") ? <School className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />
    case "trophy":
      return <Trophy className="w-5 h-5" />
    case "award":
      return <Award className="w-5 h-5" />
    case "research":
      return <GraduationCap className="w-5 h-5" />
    default:
      return <Award className="w-5 h-5" />
  }
}

const getDotColor = (type: string, title: string): string => {
  if (type === "trophy" && title.includes("AtCoder")) return getAtCoderColor(title)
  if (type === "birth") return "#ec4899"
  if (type === "school") return "#14b8a6"
  if (type === "award") return "#eab308"
  if (type === "research") return "#94a3b8"
  return "#94a3b8"
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

export default function Timeline() {
  const sortedItems = [...timelineItems].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  let currentYear = ""

  return (
    <section id="timeline" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Timeline
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.06 }}
            className="space-y-1"
          >
            {sortedItems.map((item, i) => {
              const year = item.date.slice(0, 4)
              const showYear = year !== currentYear
              currentYear = year
              const dotColor = getDotColor(item.type, item.title)

              return (
                <div key={`${item.title}-${i}`}>
                  {showYear && (
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3 mt-6 first:mt-0">
                      <div className="w-10 h-10 rounded-full border border-white/[0.12] bg-navy-800 flex items-center justify-center">
                        <span className="text-sm font-mono font-bold text-white/70">{year}</span>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    variants={itemVariants}
                    className="group flex items-start gap-4 py-2 pl-1"
                  >
                    <div className="relative flex-shrink-0 mt-1.5">
                      <div
                        className="w-3 h-3 rounded-full border-2 z-10 relative"
                        style={{ borderColor: dotColor, backgroundColor: `${dotColor}33` }}
                      />
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span style={{ color: dotColor }} className="opacity-70">
                          {getIcon(item.type, item.title)}
                        </span>
                        <h3 className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-gray-600">{item.date}</span>
                        {item.description && (
                          <span className="text-sm text-gray-500">{item.description}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
