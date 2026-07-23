"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import Modal from "./ui/modal"

type Project = {
  title: string
  thumbnail: string
  description: string
  detailPath: string
  tags: string[]
  date: string
}

const projects: Project[] = [
  {
    title: "電脳サークル公式サイト",
    thumbnail: "/projects/Denno-Circle-Official-Site.png",
    description: "電脳サークルの公式ウェブサイト",
    detailPath: "Denno-Circle-Official-Site.md",
    tags: ["チーム開発"],
    date: "2023/03",
  },
  {
    title: "PCHIP-Image-Enlarger",
    thumbnail: "/projects/PCHIP-Image-Enlarger.png",
    description: "画像補間プログラム",
    detailPath: "PCHIP-Image-Enlarger.md",
    tags: ["個人開発"],
    date: "2023/05",
  },
  {
    title: "Substring-Word-Finder",
    thumbnail: "/projects/Substring-Word-Finder.png",
    description: "部分文字列検索ウェブアプリ",
    detailPath: "Substring-Word-Finder.md",
    tags: ["個人開発"],
    date: "2023/05",
  },
  {
    title: "飛んでけ鉄拳！Rocket Puncher",
    thumbnail: "/projects/RocketPunch.png",
    description: "RocketPunchを操作するVRゲーム",
    detailPath: "RocketPunch.md",
    tags: ["チーム開発"],
    date: "2024/10",
  },
  {
    title: "RicoShot",
    thumbnail: "/projects/RicoShot.png",
    description: "シューティングゲーム",
    detailPath: "RicoShot.md",
    tags: ["チーム開発"],
    date: "2024/11",
  },
  {
    title: "Node x Node",
    thumbnail: "/projects/Node-x-Node.svg",
    description: "ニューラルネットワークを構築・学習して戦う戦略ゲーム",
    detailPath: "Node-x-Node.md",
    tags: ["チーム開発"],
    date: "2026/03",
  },
  {
    title: "mahjong-calc-point",
    thumbnail: "/projects/mahjong-calc-point.png",
    description: "画像認識で手牌を読み取る麻雀点数計算アプリ",
    detailPath: "mahjong-calc-point.md",
    tags: ["個人開発"],
    date: "2026/05",
  },
]

export default function ProjectsList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [markdownContent, setMarkdownContent] = useState("")
  const loading = Boolean(selectedProject) && markdownContent === ""

  useEffect(() => {
    if (!selectedProject) return

    let active = true
    fetch(`/projects/${selectedProject.detailPath}`)
      .then((response) => {
        if (!response.ok) throw new Error("detail not found")
        return response.text()
      })
      .then((text) => {
        if (active) setMarkdownContent(text)
      })
      .catch(() => {
        if (active) setMarkdownContent("詳細を読み込めませんでした。")
      })

    return () => {
      active = false
    }
  }, [selectedProject])

  const openProject = (project: Project) => {
    setMarkdownContent("")
    setSelectedProject(project)
  }

  return (
    <>
      <div className="project-list">
        {[...projects].reverse().map((project) => (
          <button
            type="button"
            className="project-row"
            key={project.title}
            onClick={() => openProject(project)}
          >
            <span className="project-image">
              <Image src={project.thumbnail} alt="" width={160} height={104} />
            </span>
            <span className="project-copy">
              <span className="project-meta">
                <span>{project.tags.join("・")}</span>
                <span>{project.date}</span>
              </span>
              <strong>{project.title}</strong>
              <span className="project-description">{project.description}</span>
            </span>
            <span className="project-action">詳細 <ArrowUpRight size={15} aria-hidden="true" /></span>
          </button>
        ))}
      </div>

      <Modal
        isOpen={Boolean(selectedProject)}
        onClose={() => {
          setSelectedProject(null)
          setMarkdownContent("")
        }}
      >
        {selectedProject && <p className="modal-project-label">{selectedProject.date} · {selectedProject.tags.join("・")}</p>}
        {loading ? (
          <p className="modal-loading">読み込み中…</p>
        ) : (
          <div className="project-markdown">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
          </div>
        )}
      </Modal>
    </>
  )
}
