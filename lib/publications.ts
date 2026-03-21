export type Publication = {
  title: string
  authors: string[]
  venue: string
  year: number
  type: "journal" | "conference" | "preprint" | "thesis"
  url?: string
  doi?: string
  abstract?: string
}

export const publications: Publication[] = [
  // サンプルデータ（実際の論文情報に置き換えてください）
  {
    title: "圧縮センシングにおけるスパース信号復元手法の研究",
    authors: ["toufu24"],
    venue: "東京農工大学 卒業論文",
    year: 2026,
    type: "thesis",
  },
  // 以下に論文を追加してください
  // {
  //   title: "論文タイトル",
  //   authors: ["著者1", "著者2"],
  //   venue: "会議名 / ジャーナル名",
  //   year: 2025,
  //   type: "conference",
  //   url: "https://...",
  //   doi: "10.xxxx/xxxxx",
  // },
]
