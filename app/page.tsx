import Hero from "@/components/Hero"
import ResearchInterests from "@/components/ResearchInterests"
import Publications from "@/components/Publications"
import Timeline from "@/components/Timeline"

import ProjectsList from "@/components/ProjectsList"
import GitHubActivity from "@/components/GitHubActivity"
import Contact from "@/components/Contact"
import WaveformDivider from "@/components/WaveformDivider"
import { getGitHubStats, getTopRepositories, getLanguageStats, getLanguageColors } from "@/lib/github"

export const revalidate = 3600

export default async function Home() {
  const [githubStats, topRepositories, languageStats, languageColors] = await Promise.all([
    getGitHubStats(),
    getTopRepositories(),
    getLanguageStats(),
    getLanguageColors(),
  ])

  return (
    <main className="bg-grid min-h-screen">
      <Hero />

      {/* About */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
            About
          </h2>
          <p className="text-gray-500 text-sm font-mono tracking-wider mb-8">自己紹介</p>
          <p className="text-gray-400 leading-relaxed mb-6">
            東京農工大学 工学部 知能情報システム工学科の学生です。
            最適化と信号処理を軸に研究しており、特にスパース信号の復元問題に取り組んでいます。
            ブロック分割が未知のスパース信号に対する貪欲アルゴリズム（SOMP）を提案し、
            IEEE ICASSP 2026 に採択されています。
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            競技プログラミング（AtCoder）にも積極的に参加しており、アルゴリズム・ヒューリスティック両部門で活動しています。
            離散最適化と連続最適化の両面からアルゴリズムを設計し、理論と実装の双方を重視しています。
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-cyan-500/30">
            <span>optimize ∪ recover</span>
            <span className="text-cyan-500/15">|</span>
            <span>theory ∩ practice</span>
            <span className="text-cyan-500/15">|</span>
            <span>sparse → signal</span>
          </div>
        </div>
      </section>

      <WaveformDivider variant="convergence" />

      <ResearchInterests />

      <WaveformDivider variant="sparse" />

      <Publications />

      <WaveformDivider variant="graph" />

      <Timeline />

      <WaveformDivider variant="convergence" />

      <ProjectsList />

      <WaveformDivider variant="graph" />

      <GitHubActivity
        stats={githubStats}
        languageStats={languageStats}
        languageColors={languageColors}
        topRepos={topRepositories}
      />

      <Contact />
    </main>
  )
}
