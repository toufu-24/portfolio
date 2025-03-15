import { Octokit } from "@octokit/rest"
import fs from "fs/promises"
import path from "path"

// トークンを使ってOctokitインスタンスを作成
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,  // 環境変数からトークンを取得
});

export async function getGitHubStats() {
  try {
    const user = await octokit.rest.users.getByUsername({ username: "toufu-24" });
    const repos = await octokit.rest.repos.listForUser({ username: "toufu-24", sort: "updated", per_page: 100 });
    const totalStars = repos.data.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

    return totalStars;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
  }
}


async function getContributionsLastYear() {
  const query = `
    query {
      user(login: "toufu-24") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `
  const response = await octokit.graphql(query) as { user: { contributionsCollection: { contributionCalendar: { totalContributions: number } } } };
  return response.user.contributionsCollection.contributionCalendar.totalContributions;
}

export async function getTopRepositories() {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username: "toufu-24",
      per_page: 100,
    });
    console.log(data);  // リポジトリデータを確認

    return data
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)) // スター数でソート
      .slice(0, 3) // 上位3件を取得
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
      }));
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    console.error(error.response?.data);  // 追加のエラーメッセージを確認
  }

}


export async function getLanguageStats() {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username: "toufu-24",
      per_page: 100,
    })

    const languageStats: { [key: string]: number } = {}; // インデックスシグネチャを追加
    let totalSize = 0

    for (const repo of data) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + (repo.size || 0)
        totalSize += (repo.size || 0)
      }
    }

    const sortedStats = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, size]) => ({
        name,
        percentage: Math.round((size / totalSize) * 100),
      }))

    return sortedStats
  } catch (error) {
    console.error("Error fetching repositories:", error.message)
    console.error(error.response?.data)
  }
}

export async function getLanguageColors(): Promise<{ [key: string]: string }> {
  const colorFilePath = path.join(process.cwd(), "public", "Colors.json")
  const colorData = await fs.readFile(colorFilePath, "utf-8")
  const colors = JSON.parse(colorData)

  const languageColors: { [key: string]: string } = {}
  for (const [language, data] of Object.entries(colors)) {
    languageColors[language] = (data as { color: string }).color
  }

  return languageColors
}