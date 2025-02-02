import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          山田太郎
        </h1>
        <p className="text-2xl mb-8">フルスタック開発者 & AIエンスージアスト</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-purple-600 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          プロジェクトを見る
        </motion.button>
      </motion.div>
    </section>
  )
}

