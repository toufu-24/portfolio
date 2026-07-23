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
    description:
      "問題がもつ構造を活かし、解の精度と計算効率を両立する反復アルゴリズムを設計します。凸最適化、近接法、貪欲法を中心に扱っています。",
  },
  {
    index: "02",
    title: "圧縮センシング",
    description:
      "観測数が未知変数より少ない劣決定系から、スパース性を手がかりに原信号を復元します。特に未知のブロック構造をもつ信号に関心があります。",
  },
  {
    index: "03",
    title: "信号処理",
    description:
      "信号の生成過程と観測モデルを数式で記述し、ノイズや欠損に頑健な推定法へつなげます。理論と再現可能な数値実験を往復します。",
  },
  {
    index: "04",
    title: "アルゴリズムとデータ構造",
    description:
      "問題の構造を見抜き、適切なアルゴリズムとデータ構造を選択・設計することに関心があります。競技プログラミングを通じて、計算量を意識した効率的な問題解決力を磨いています。",
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
