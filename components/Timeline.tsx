import type { CSSProperties } from "react"

type TimelineItem = {
  date: string
  title: string
  description: string
  type: "birth" | "school" | "trophy" | "award"
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
  { date: "2025-12", title: "ICPC Asia Yokohama Regional Contest 56位", description: "チーム KATUNI として出場", type: "trophy" },
  { date: "2026-03", title: "東京農工大学卒業", description: "工学部 知能情報システム工学科", type: "school" },
  { date: "2026-04", title: "東京農工大学大学院入学", description: "工学府 知能情報システム工学専攻", type: "school" },
  { date: "2026-04", title: "TOEIC Listening & Reading 800点", description: "Listening 430点 / Reading 370点", type: "award" },
]

function accent(item: TimelineItem) {
  if (item.title.includes("灰色")) return "#808080"
  if (item.title.includes("茶色")) return "#9a5b2f"
  if (item.title.includes("緑色")) return "#2f7d4e"
  if (item.title.includes("水色")) return "#2b7f91"
  if (item.title.includes("青色")) return "#315f9a"
  if (item.type === "school") return "#174c37"
  if (item.type === "award") return "#8a6a24"
  if (item.type === "trophy") return "#7d642a"
  return "#8b948f"
}

export default function Timeline() {
  return (
    <div className="timeline" aria-label="学歴と活動歴">
      {timelineItems.map((item) => (
        <div
          className="timeline-row"
          key={`${item.date}-${item.title}`}
          style={{ "--timeline-accent": accent(item) } as CSSProperties}
        >
          <time>{item.date}</time>
          <div>
            <h3>{item.title}</h3>
            {item.description && <p>{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
