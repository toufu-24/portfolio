import { Octokit } from "@octokit/rest"
import colors from "@/public/Colors.json"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const fallbackStats = {
  publicRepos: 0,
  followers: 0,
  totalStars: 0,
  totalForks: 0,
  totalContributions: 0,
}

export async function getGitHubStats() {
  try {
    const user = await octokit.rest.users.getByUsername({ username: "toufu-24" })
    const repos = await octokit.rest.repos.listForUser({ username: "toufu-24", sort: "updated", per_page: 100 })

    const totalStars = repos.data.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
    const totalForks = repos.data.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)

    return {
      publicRepos: user.data.public_repos,
      followers: user.data.followers,
      totalStars,
      totalForks,
      totalContributions: await getTotalContributions(),
    }
  } catch (e) {
    console.error("Failed to fetch GitHub stats:", e)
    return fallbackStats
  }
}

async function getTotalContributions() {
  try {
    const createdAtQuery = `
      query {
        user(login: "toufu-24") {
          createdAt
        }
      }
    `
    const { user } = await octokit.graphql(createdAtQuery) as {
      user: { createdAt: string }
    }

    const createdAt = new Date(user.createdAt)
    const now = new Date()
    let total = 0

    let from = new Date(createdAt)
    while (from < now) {
      const to = new Date(Math.min(
        new Date(from.getFullYear() + 1, from.getMonth(), from.getDate()).getTime(),
        now.getTime(),
      ))

      const query = `
        query($from: DateTime!, $to: DateTime!) {
          user(login: "toufu-24") {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `
      const response = await octokit.graphql(query, {
        from: from.toISOString(),
        to: to.toISOString(),
      }) as {
        user: { contributionsCollection: { contributionCalendar: { totalContributions: number } } }
      }
      total += response.user.contributionsCollection.contributionCalendar.totalContributions
      from = to
    }

    return total
  } catch {
    return 0
  }
}

export async function getTopRepositories() {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username: "toufu-24",
      per_page: 100,
    })

    return data
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
      .slice(0, 3)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
      }))
  } catch (e) {
    console.error("Failed to fetch top repositories:", e)
    return []
  }
}

export async function getLanguageStats() {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username: "toufu-24",
      per_page: 100,
    })

    const languageStats: { [key: string]: number } = {}
    let totalSize = 0

    for (const repo of data) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + (repo.size || 0)
        totalSize += (repo.size || 0)
      }
    }

    return Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, size]) => ({
        name,
        percentage: Math.round((size / totalSize) * 100),
      }))
  } catch (e) {
    console.error("Failed to fetch language stats:", e)
    return []
  }
}

export async function getLanguageColors(): Promise<{ [key: string]: string }> {
  const languageColors: { [key: string]: string } = {}
  for (const [language, data] of Object.entries(colors)) {
    if (typeof data.color === "string") {
      languageColors[language] = data.color
    }
  }

  return languageColors
}
