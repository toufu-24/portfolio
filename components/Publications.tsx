"use client"

import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { publications, type Publication } from "@/lib/publications"

type TypeFilter = Publication["type"] | "all"
type YearFilter = number | "all"
type ReviewFilter = "all" | "reviewed" | "not-reviewed"

const typeLabels: Record<Publication["type"], string> = {
  journal: "論文",
  conference: "学会発表",
  preprint: "プレプリント",
  thesis: "学位論文",
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={`publication-filter-button${active ? " is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function dateLabel(publication: Publication) {
  return publication.month
    ? `${publication.year}.${String(publication.month).padStart(2, "0")}`
    : String(publication.year)
}

export default function Publications() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all")
  const [yearFilter, setYearFilter] = useState<YearFilter>("all")
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("all")

  const typeOptions = useMemo(
    () => Array.from(new Set(publications.map((publication) => publication.type))),
    [],
  )
  const yearOptions = useMemo(
    () => Array.from(new Set(publications.map((publication) => publication.year))).sort((a, b) => b - a),
    [],
  )
  const filteredPublications = useMemo(
    () => publications
      .filter((publication) => typeFilter === "all" || publication.type === typeFilter)
      .filter((publication) => yearFilter === "all" || publication.year === yearFilter)
      .filter((publication) => {
        if (reviewFilter === "all") return true
        return reviewFilter === "reviewed" ? publication.peerReviewed === true : publication.peerReviewed !== true
      })
      .sort((a, b) => (b.year - a.year) || ((b.month ?? 0) - (a.month ?? 0))),
    [reviewFilter, typeFilter, yearFilter],
  )

  const hasFilter = typeFilter !== "all" || yearFilter !== "all" || reviewFilter !== "all"

  const resetFilters = () => {
    setTypeFilter("all")
    setYearFilter("all")
    setReviewFilter("all")
  }

  return (
    <div>
      <div className="publication-filters" aria-label="研究業績の絞り込み">
        <div className="publication-filter-line">
          <span className="publication-filter-name">種別</span>
          <FilterButton active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>すべて</FilterButton>
          {typeOptions.map((type) => (
            <FilterButton key={type} active={typeFilter === type} onClick={() => setTypeFilter(type)}>
              {typeLabels[type]}
            </FilterButton>
          ))}
        </div>

        <div className="publication-filter-line">
          <span className="publication-filter-name">年</span>
          <FilterButton active={yearFilter === "all"} onClick={() => setYearFilter("all")}>すべて</FilterButton>
          {yearOptions.map((year) => (
            <FilterButton key={year} active={yearFilter === year} onClick={() => setYearFilter(year)}>
              {year}
            </FilterButton>
          ))}
        </div>

        <div className="publication-filter-line">
          <span className="publication-filter-name">査読</span>
          <FilterButton active={reviewFilter === "all"} onClick={() => setReviewFilter("all")}>すべて</FilterButton>
          <FilterButton active={reviewFilter === "reviewed"} onClick={() => setReviewFilter("reviewed")}>査読あり</FilterButton>
          <FilterButton active={reviewFilter === "not-reviewed"} onClick={() => setReviewFilter("not-reviewed")}>査読なし</FilterButton>
        </div>

        <div className="publication-filter-result" aria-live="polite">
          <span>{filteredPublications.length}件 / {publications.length}件</span>
          {hasFilter && (
            <button type="button" onClick={resetFilters}>条件をリセット</button>
          )}
        </div>
      </div>

      <div className="publication-list">
        {filteredPublications.map((publication) => {
          const content = (
            <article className="publication-row" key={publication.title}>
              <div className="publication-year">
                {publication.year}
                <span>{publication.month ? String(publication.month).padStart(2, "0") : ""}</span>
              </div>
              <div className="publication-main">
                <h3>{publication.title}</h3>
                <p>{publication.authors.join("，")}</p>
                <p className="venue">{publication.venue}</p>
                <p className="publication-detail">{typeLabels[publication.type]}{publication.presentation ? ` · ${publication.presentation === "oral" ? "口頭発表" : "ポスター発表"}` : ""}{publication.peerReviewed ? " · 査読あり" : ""}</p>
              </div>
              {publication.url && <ArrowUpRight className="publication-arrow" size={20} aria-hidden="true" />}
            </article>
          )

          return publication.url ? (
            <a key={publication.title} className="publication-row-link" href={publication.url} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          ) : content
        })}
      </div>

      {filteredPublications.length === 0 && (
        <p className="publication-empty">条件に一致する研究業績はありません。</p>
      )}
    </div>
  )
}
