import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react"
import OptimizationLandscape from "@/components/OptimizationLandscape"
import Publications from "@/components/Publications"
import ProjectsList from "@/components/ProjectsList"
import Timeline from "@/components/Timeline"

const researchAreas = [
  {
    index: "01",
    title: "数理最適化",
    description: "問題を数理モデルとして捉え，制約のもとで最適な解を導く理論と手法．",
  },
  {
    index: "02",
    title: "圧縮センシング",
    description: "少数の観測から，信号に潜むスパースな構造を復元する理論とアルゴリズム．",
  },
  {
    index: "03",
    title: "信号処理",
    description: "観測データを数理的に解析し，必要な情報を抽出・復元する技術．",
  },
  {
    index: "04",
    title: "アルゴリズムとデータ構造",
    description: "問題の構造を見極め，計算量を抑えて効率的に解くための方法．",
  },
]

function SectionHeading({
  title,
}: {
  title: string
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
    </div>
  )
}

export default function Home() {
  return (
    <main id="top">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>藤野 創</span>
          </h1>
          <p className="hero-intro">
            東京農工大学大学院 工学府 知能情報システム工学専攻の学生です。<br />
            数理最適化と信号処理を軸に研究しており、特に圧縮センシングにおけるスパース信号の復元問題に取り組んでいます。
          </p>
          <p className="hero-intro hero-intro-secondary">
            競技プログラミング（<a href="https://atcoder.jp/?lang=ja" target="_blank" rel="noopener noreferrer">AtCoder</a>）にも積極的に参加しており、アルゴリズム・ヒューリスティック両部門で活動しています。
          </p>

          <div className="hero-contact-links" aria-label="連絡先">
            <a href="mailto:fujinoso.job@gmail.com"><Mail size={16} aria-hidden="true" /> メール</a>
            <a href="https://github.com/toufu-24" target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
            <a href="https://www.linkedin.com/in/so-fujino-0b50873b4/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn</a>
          </div>

        </div>

        <OptimizationLandscape />
      </section>

      <section id="research" className="content-section section-shell">
        <SectionHeading title="関心領域" />

        <div className="research-list">
          {researchAreas.map((area) => (
            <article className="research-row" key={area.index}>
              <div className="research-number">{area.index}</div>
              <div className="research-copy">
                <h3>{area.title}</h3>
                <span className="research-line" aria-hidden="true" />
                <p>{area.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="publications" className="content-section section-shell">
        <SectionHeading title="研究業績" />
        <Publications />
      </section>

      <section id="projects" className="content-section section-shell">
        <SectionHeading title="プロジェクト" />

        <ProjectsList />

        <a className="text-link" href="https://github.com/toufu-24" target="_blank" rel="noopener noreferrer">
          GitHub ですべての実装を見る <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </section>

      <section id="profile" className="content-section section-shell">
        <SectionHeading title="経歴と活動" />

        <div className="profile-grid">
          <Timeline />
        </div>
      </section>

      <section id="contact" className="contact-bottom section-shell" aria-label="連絡先">
        <div className="contact-bottom-links">
          <a href="mailto:fujinoso.job@gmail.com"><Mail size={16} aria-hidden="true" /> メール</a>
          <a href="https://github.com/toufu-24" target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
          <a href="https://www.linkedin.com/in/so-fujino-0b50873b4/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn</a>
        </div>
      </section>

    </main>
  )
}
