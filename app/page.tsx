import Hero from "@/components/Hero"
import ResearchInterests from "@/components/ResearchInterests"
import Publications from "@/components/Publications"
import Timeline from "@/components/Timeline"
import Skills from "@/components/Skills"
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
            圧縮センシング・数理最適化・信号処理を専門とし、スパース性を利用した効率的な信号復元手法の研究に取り組んでいます。
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            競技プログラミング（AtCoder）にも積極的に参加しており、アルゴリズム・ヒューリスティック両部門で活動しています。
            離散最適化の組合せ的な問題解決と、連続最適化の数理的なアプローチ、その両面から「最適化」に向き合っています。
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-cyan-500/30">
            <span>discrete ∪ continuous</span>
            <span className="text-cyan-500/15">|</span>
            <span>theory ∩ practice</span>
            <span className="text-cyan-500/15">|</span>
            <span>sparse → optimal</span>
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

      <Skills />

      <WaveformDivider variant="sine" />

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
