import { motion } from "framer-motion"

const experiences = [
  {
    id: 1,
    title: "シニアフルスタック開発者",
    company: "テックイノベーション株式会社",
    period: "2020年 - 現在",
    description: "AIを活用したWebアプリケーションの設計と開発をリード",
  },
  {
    id: 2,
    title: "ソフトウェアエンジニア",
    company: "フューチャーテック",
    period: "2017年 - 2020年",
    description: "クラウドベースのソリューションの開発と運用に従事",
  },
  {
    id: 3,
    title: "情報工学修士",
    company: "東京工科大学",
    period: "2015年 - 2017年",
    description: "機械学習と自然言語処理に関する研究を実施",
  },
]

export default function ExperienceSection() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">経験</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-700 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
              <p className="text-gray-300 mb-2">
                {exp.company} | {exp.period}
              </p>
              <p className="text-gray-400">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

