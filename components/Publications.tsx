"use client"

import { motion } from "framer-motion"
import { FileText, ExternalLink, BookOpen, GraduationCap, Newspaper } from "lucide-react"
import { publications, type Publication } from "@/lib/publications"

const typeConfig: Record<Publication["type"], { label: string; icon: typeof FileText; color: string }> = {
  journal: { label: "Journal", icon: BookOpen, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  conference: { label: "Conference", icon: Newspaper, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  preprint: { label: "Preprint", icon: FileText, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  thesis: { label: "Thesis", icon: GraduationCap, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function Publications() {
  const sortedPubs = [...publications].sort((a, b) => b.year - a.year)

  return (
    <section id="publications" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Publications
          </h2>
          <p className="text-gray-500 text-sm">業績</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {sortedPubs.map((pub, i) => {
            const config = typeConfig[pub.type]
            const Icon = config.icon

            return (
              <motion.div
                key={`${pub.title}-${i}`}
                variants={itemVariants}
                className="group relative rounded-lg border border-white/[0.06] bg-navy-800/50 p-5
                           hover:border-white/[0.10] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center border ${config.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${config.color}`}>
                        {config.label}
                      </span>
                      {pub.presentation && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-gray-300 bg-white/5 border-white/10">
                          {pub.presentation === "oral" ? "Oral" : "Poster"}
                        </span>
                      )}
                      <span className="text-xs font-mono text-gray-500">{pub.year}</span>
                    </div>

                    <h3 className="text-base font-semibold text-gray-200 mb-1 leading-snug">
                      {pub.url ? (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors inline-flex items-center gap-1"
                        >
                          {pub.title}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        pub.title
                      )}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {pub.authors.join(", ")}
                    </p>
                    <p className="text-sm text-gray-400 font-mono mt-0.5">
                      {pub.venue}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
