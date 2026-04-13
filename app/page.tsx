import { unstable_noStore as noStore } from "next/cache"
import Hero from "@/components/Hero"
import ResearchInterests from "@/components/ResearchInterests"
import Publications from "@/components/Publications"
import Timeline from "@/components/Timeline"
import ProjectsList from "@/components/ProjectsList"
import GitHubActivity from "@/components/GitHubActivity"
import Contact from "@/components/Contact"
import WaveformDivider from "@/components/WaveformDivider"
import { getGitHubStats, getTopRepositories, getLanguageStats, getLanguageColors } from "@/lib/github"

export default async function Home() {
  // ビルド時の GitHub 失敗が ISR で長く空表示になるのを避ける（デプロイ後にトークンを足した場合も反映されやすい）
  noStore()

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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            About
          </h2>
          <p className="text-gray-500 text-sm font-mono tracking-wider mb-8">自己紹介</p>
          <p className="text-gray-400 leading-relaxed mb-6">
            東京農工大学大学院 工学府 知能情報システム工学専攻の学生です。
            東京農工大学 工学部 知能情報システム工学科を卒業し、
            最適化と信号処理を軸に研究しており、特に圧縮センシングにおけるスパース信号の復元問題に取り組んでいます。
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            競技プログラミング（<a href="https://atcoder.jp/?lang=ja" target="_blank" rel="noopener noreferrer" className="text-gray-300 underline decoration-gray-600 hover:decoration-gray-400 transition-colors">AtCoder</a>）にも積極的に参加しており、アルゴリズム・ヒューリスティック両部門で活動しています。
          </p>
        </div>
      </section>

      <WaveformDivider variant="sine" />

      <ResearchInterests />

      <WaveformDivider variant="sparse" />

      <Publications />

      <WaveformDivider variant="graph" />

      <Timeline />

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
