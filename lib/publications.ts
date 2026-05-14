export type Publication = {
  title: string
  authors: string[]
  venue: string
  year: number
  month?: number
  type: "journal" | "conference" | "preprint" | "thesis"
  peerReviewed?: boolean
  presentation?: "oral" | "poster"
  url?: string
  doi?: string
  abstract?: string
}

export const publications: Publication[] = [
  {
    title: "Subarray orthogonal matching pursuit for block-sparse signals with unknown block partitions",
    authors: ["S. Fujino", "R. Hayakawa"],
    venue: "IEEE International Conference on Acoustics, Speech, and Signal Processing (ICASSP), Barcelona, Spain, May 2026",
    year: 2026,
    month: 5,
    type: "conference",
    peerReviewed: true,
    presentation: "oral",
    url: "https://ieeexplore.ieee.org/document/11461524",
    abstract:
      "This paper proposes a greedy algorithm with adaptive block selection for the recovery of block-sparse signals when the block partition is unknown. The proposed method, referred to as subarray orthogonal matching pursuit (SOMP), evaluates candidate blocks over arbitrary contiguous intervals using an evaluation function with a penalty proportional to the block length. By reducing the maximization to the maximum sum subarray problem, the extraction of nonzero blocks at each iteration can be performed efficiently via dynamic programming.",
  },
  {
    title: "ブロックスパース信号復元のための可変長ブロック選択を用いた直交マッチング追跡",
    authors: ["藤野 創", "早川 諒"],
    venue: "第40回信号処理シンポジウム, 2025年11月",
    year: 2025,
    month: 11,
    type: "conference",
    presentation: "poster",
  },
]
