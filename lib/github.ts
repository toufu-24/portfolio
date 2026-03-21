import colors from "@/public/Colors.json"

const GITHUB_USERNAME = "toufu-24"
const GITHUB_API_BASE = "https://api.github.com"

const fallbackStats = {
  publicRepos: 0,
  followers: 0,
  totalStars: 0,
  totalForks: 0,
  totalContributions: 0,
}

type GitHubUser = {
  public_repos: number
  followers: number
}

type GitHubRepo = {
  name: string
  description: string | null
  stargazers_count: number | null
  forks_count: number | null
  language: string | null
  html_url: string
  size: number | null
}

function getGitHubToken() {
  return process.env.GITHUB_TOKEN
}

function getGitHubHeaders() {
  const token = getGitHubToken()

  return {
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "User-Agent": "portfolio-site",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function fetchGitHub<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    ...init,
    headers: {
      ...getGitHubHeaders(),
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

async function fetchAllUserRepos() {
  return fetchGitHub<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
  )
}

export async function getGitHubStats() {
  try {
    const [user, repos] = await Promise.all([
      fetchGitHub<GitHubUser>(`/users/${GITHUB_USERNAME}`),
      fetchAllUserRepos(),
    ])

    const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
    const totalForks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
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
  const token = getGitHubToken()

  if (!token) {
    return 0
  }

  try {
    const createdAtResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: getGitHubHeaders(),
      body: JSON.stringify({
        query: `
          query($login: String!) {
            user(login: $login) {
              createdAt
            }
          }
        `,
        variables: { login: GITHUB_USERNAME },
      }),
    })

    if (!createdAtResponse.ok) {
      throw new Error(`GitHub GraphQL request failed: ${createdAtResponse.status} ${createdAtResponse.statusText}`)
    }

    const createdAtJson = await createdAtResponse.json() as {
      data?: { user?: { createdAt: string } }
      errors?: Array<{ message: string }>
    }

    if (createdAtJson.errors?.length || !createdAtJson.data?.user?.createdAt) {
      throw new Error(createdAtJson.errors?.[0]?.message || "Missing createdAt")
    }

    const createdAt = new Date(createdAtJson.data.user.createdAt)
    const now = new Date()
    let total = 0

    let from = new Date(createdAt)
    while (from < now) {
      const to = new Date(Math.min(
        new Date(from.getFullYear() + 1, from.getMonth(), from.getDate()).getTime(),
        now.getTime(),
      ))

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: getGitHubHeaders(),
        body: JSON.stringify({
          query: `
            query($login: String!, $from: DateTime!, $to: DateTime!) {
              user(login: $login) {
                contributionsCollection(from: $from, to: $to) {
                  contributionCalendar {
                    totalContributions
                  }
                }
              }
            }
          `,
          variables: {
            login: GITHUB_USERNAME,
            from: from.toISOString(),
            to: to.toISOString(),
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`)
      }

      const json = await response.json() as {
        data?: {
          user?: {
            contributionsCollection?: {
              contributionCalendar?: {
                totalContributions: number
              }
            }
          }
        }
        errors?: Array<{ message: string }>
      }

      if (json.errors?.length) {
        throw new Error(json.errors[0].message)
      }

      total += json.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0
      from = to
    }

    return total
  } catch (e) {
    console.error("Failed to fetch GitHub contributions:", e)
    return 0
  }
}

export async function getTopRepositories() {
  try {
    const data = await fetchAllUserRepos()

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
    const data = await fetchAllUserRepos()

    const languageStats: { [key: string]: number } = {}
    let totalSize = 0

    for (const repo of data) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + (repo.size || 0)
        totalSize += repo.size || 0
      }
    }

    if (totalSize === 0) {
      return []
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
