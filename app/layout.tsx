import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Header from "@/components/Header"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://toufu24.dev"),
  title: "藤野 創",
  description:
    "数理最適化、圧縮センシング、信号処理を研究する藤野創のポートフォリオ。研究内容、業績、プロジェクトを紹介します。",
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
  },
  openGraph: {
    title: "藤野 創",
    description: "数理最適化、圧縮センシング、信号処理を研究する藤野創のポートフォリオ。",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og.png", width: 1728, height: 907, alt: "藤野 創のポートフォリオ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "藤野 創",
    description: "数理最適化、圧縮センシング、信号処理を研究する藤野創のポートフォリオ。",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
