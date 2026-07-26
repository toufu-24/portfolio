import { Menu } from "lucide-react"

const navItems = [
  { label: "関心領域", href: "#research" },
  { label: "研究業績", href: "#publications" },
  { label: "プロジェクト", href: "#projects" },
  { label: "経歴と活動", href: "#profile" },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="site-mark" href="#top" aria-label="藤野 創のポートフォリオ トップへ">
          <span>藤野 創</span>
        </a>

        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <details className="mobile-nav">
          <summary aria-label="メニューを開く">
            <Menu aria-hidden="true" size={19} strokeWidth={1.7} />
          </summary>
          <nav aria-label="モバイルナビゲーション">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  )
}
