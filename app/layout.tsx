import type { Metadata } from "next"
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import type React from "react"
import Header from "@/components/Header"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "toufu24 | Optimization & Signal Processing",
  description:
    "東京農工大学 — 最適化・信号処理の研究ポートフォリオ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="dark scroll-smooth">
      <body
        className={`${notoSansJP.variable} ${jetbrainsMono.variable} font-sans bg-[#0a0e1a] text-gray-100 antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}

