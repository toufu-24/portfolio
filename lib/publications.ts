export type Publication = {
  title: string
  authors: string[]
  venue: string
  year: number
  type: "journal" | "conference" | "preprint" | "thesis"
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
    type: "conference",
    presentation: "oral",
    url: "https://cmsworkshops.com/ICASSP2026/view_paper.php?PaperNum=17123",
    abstract:
      "This paper proposes a greedy algorithm with adaptive block selection for the recovery of block-sparse signals when the block partition is unknown. The proposed method, referred to as subarray orthogonal matching pursuit (SOMP), evaluates candidate blocks over arbitrary contiguous intervals using an evaluation function with a penalty proportional to the block length. By reducing the maximization to the maximum sum subarray problem, the extraction of nonzero blocks at each iteration can be performed efficiently via dynamic programming.",
  },
]
