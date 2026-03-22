"use client"

import Image from "next/image"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Modal from "./ui/modal"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

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
]

const tagColors: Record<string, string> = {
  "個人開発": "border-blue-500/20 text-blue-400 bg-blue-500/10",
  "チーム開発": "border-emerald-500/20 text-emerald-400 bg-emerald-500/10",
  "活動": "border-amber-500/20 text-amber-400 bg-amber-500/10",
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ProjectsList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [markdownContent, setMarkdownContent] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (selectedProject) {
      setLoading(true)
      fetch(`/projects/${selectedProject.detailPath}`)
        .then((res) => res.text())
        .then((text) => {
          setMarkdownContent(text)
          setLoading(false)
        })
        .catch(() => {
          setMarkdownContent("Failed to load content.")
          setLoading(false)
        })
    }
  }, [selectedProject])

  const closeModal = () => {
    setSelectedProject(null)
    setMarkdownContent("")
  }

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Projects
          </h2>
          <p className="text-gray-500 text-sm">プロジェクト</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[...projects].reverse().map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-xl border border-white/[0.06] bg-navy-800/50
                         hover:border-white/[0.10] transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  width={500}
                  height={300}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-800/80 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${tagColors[tag] || "border-gray-500/20 text-gray-400"}`}
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-[10px] font-mono text-gray-600 ml-auto">
                    {project.date}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Modal isOpen={!!selectedProject} onClose={closeModal}>
          <div className="prose prose-invert prose-sm max-w-none">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
              </div>
            ) : (
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-2xl font-bold mt-4 mb-2 text-white" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-xl font-bold mt-4 mb-2 text-gray-200" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-lg font-bold mt-3 mb-1 text-gray-300" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="text-sm text-gray-400 leading-relaxed" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a className="text-white/80 hover:text-white underline" {...props} />
                  ),
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            )}
          </div>
        </Modal>
      </div>
    </section>
  )
}
