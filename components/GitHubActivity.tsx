"use client"

import { motion } from "framer-motion"
import { Github, Star, Users, GitFork, Code2, ExternalLink } from "lucide-react"

type GitHubStats = {
  publicRepos: number
  followers: number
  totalStars: number
  totalForks: number
  totalContributions: number
}

type LanguageStat = {
  name: string
  percentage: number
}

type Repository = {
  name: string
  description: string | null
  stars: number | null | undefined
  forks: number | null | undefined
  language: string | null | undefined
  url: string
}

type Props = {
  stats: GitHubStats
  languageStats: LanguageStat[]
  languageColors: Record<string, string>
  topRepos: Repository[]
}

const statItems = (stats: GitHubStats) => [
  { label: "Contributions", value: stats.totalContributions, icon: Code2 },
  { label: "Repositories", value: stats.publicRepos, icon: Github },
  { label: "Stars", value: stats.totalStars, icon: Star },
  { label: "Followers", value: stats.followers, icon: Users },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function GitHubActivity({ stats, languageStats, languageColors, topRepos }: Props) {
  return (
    <section id="github" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            GitHub Activity
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {statItems(stats).map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="rounded-xl border border-white/[0.06] bg-navy-800/50 p-4 text-center"
              >
                <item.icon className="w-4 h-4 text-white/30 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-100 font-mono">{item.value}</div>
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language Stats */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-white/[0.06] bg-navy-800/50 p-6"
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Language Statistics</h3>
              <div className="space-y-3">
                {languageStats.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300 font-mono">{lang.name}</span>
                      <span className="text-gray-500 font-mono">{lang.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: languageColors[lang.name] || "#6e7681",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Repos */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-white/[0.06] bg-navy-800/50 p-6"
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Top Repositories</h3>
              <div className="space-y-3">
                {topRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-3 rounded-lg border border-white/[0.04] bg-navy-700/30
                               hover:border-white/[0.10] transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors font-mono">
                        {repo.name}
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                      {repo.description || "No description"}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: languageColors[repo.language] || "#6e7681" }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" /> {repo.forks}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* GitHub Link */}
          <motion.div variants={itemVariants} className="text-center">
            <a
              href="https://github.com/toufu-24"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.08]
                         text-gray-400 text-sm hover:text-white hover:border-white/[0.15] transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              View GitHub Profile
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
