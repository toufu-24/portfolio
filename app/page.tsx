import { Github, Trophy, Star, GitFork, Users, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import ProjectsList from "../components/ProjectsList"
import { getGitHubStats, getTopRepositories, getLanguageStats, getLanguageColors } from "../lib/github"

export const revalidate = 3600 // revalidate every hour

export default async function Home() {
  const githubStats = await getGitHubStats()
  const topRepositories = await getTopRepositories()
  const languageStats = await getLanguageStats()
  const languageColors = await getLanguageColors()

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Profile Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
            <Image src="/icon.jpg" alt="Profile" width={128} height={128} className="relative w-32 h-32 rounded-full border-2 border-gray-800" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              toufu24
            </h1>
            <p className="text-gray-400 mb-4">Tokyo University of Agriculture and Technology</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Button variant="outline" size="sm" className="bg-gray-800 hover:bg-gray-700 text-gray-200" asChild>
                <a href="https://atcoder.toufu24.dev" target="_blank" rel="noopener noreferrer">
                  <Trophy className="w-4 h-4 mr-2" />
                  AtCoder
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-800 hover:bg-gray-700 text-gray-200" asChild>
                <a href="https://github.toufu24.dev" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">About Me</h2>
        <p className="text-gray-400">
          東京農工大学で情報工学を学んでいる学生です．競技プログラミングが好きで，AtCoderによく参加しています．サークル活動ではゲーム制作などにも取り組んでいて，Unityを使ったゲーム制作を行っています．
        </p>
      </section>

      {/* GitHub Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Language Statistics</h2>
            <div className="space-y-4">
              {languageStats.map((lang) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{lang.name}</span>
                    <span className="text-gray-400">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: languageColors[lang.name] || languageColors["Other"] || "#6e7681",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">GitHub Activity</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-100">{githubStats.contributionsLastYear}</div>
                  <div className="text-sm text-gray-400">Contributions (Last Year)</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-100">{githubStats.publicRepos}</div>
                  <div className="text-sm text-gray-400">Repositories</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-300">Total Stars</span>
                </div>
                <span className="text-xl font-bold text-gray-100">{githubStats.totalStars}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-300">Followers</span>
                </div>
                <span className="text-xl font-bold text-gray-100">{githubStats.followers}</span>
              </div>
              <a
                href="https://github.com/toufu-24"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Github className="w-4 h-4" />
                View GitHub Profile
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Projects Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Top GitHub Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRepositories.map((project) => (
            <Card key={project.name} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-100 mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description || "No description provided."}</p>
                <div className="flex items-center gap-4 mb-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.forks}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="text-gray-300"
                    style={{
                      backgroundColor: languageColors[project.language ?? "Other"] || "#6e7681",
                    }}
                  >
                    {project.language || "Unknown"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* 制作物 Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">制作物・活動履歴</h2>
        <ProjectsList />
      </section>
    </main>
  )
}
