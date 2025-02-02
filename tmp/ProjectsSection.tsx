import { motion } from "framer-motion"

const projects = [
  { id: 1, title: "AI チャットボット", description: "Natural Language Processing を使用した高度な対話システム" },
  { id: 2, title: "ブロックチェーンウォレット", description: "安全で使いやすい暗号通貨ウォレットアプリ" },
  { id: 3, title: "AR ナビゲーションアプリ", description: "拡張現実を使用したリアルタイムナビゲーションシステム" },
]

export default function ProjectsSection() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">プロジェクト</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-700 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-300">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

