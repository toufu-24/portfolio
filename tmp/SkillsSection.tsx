import { motion } from "framer-motion"

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "Python", level: 85 },
  { name: "React", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "Machine Learning", level: 75 },
  { name: "AWS", level: 70 },
]

export default function SkillsSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">スキル</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <div key={skill.name} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-lg font-medium">{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <motion.div
                className="h-4 bg-gray-700 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

