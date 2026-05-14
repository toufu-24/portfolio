"use client"

import { useMemo, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  Newspaper,
  Users,
} from "lucide-react"
import { publications, type Publication } from "@/lib/publications"

type PublicationTypeFilter = Publication["type"] | "all"
type PublicationYearFilter = number | "all"
type PublicationReviewFilter = "all" | "reviewed" | "not-reviewed"

const typeConfig: Record<
  Publication["type"],
  { label: string; icon: typeof FileText; color: string; accent: string }
> = {
  journal: {
    label: "Journal",
    icon: BookOpen,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    accent: "from-emerald-400/50",
  },
  conference: {
    label: "Conference",
    icon: Newspaper,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    accent: "from-blue-400/50",
  },
  preprint: {
    label: "Preprint",
    icon: FileText,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    accent: "from-amber-400/50",
  },
  thesis: {
    label: "Thesis",
    icon: GraduationCap,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    accent: "from-purple-400/50",
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const formatDate = (pub: Publication) => {
  if (!pub.month) return String(pub.year)
  return `${pub.year}.${String(pub.month).padStart(2, "0")}`
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
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 font-mono text-xs transition-all duration-200 ${
        active
          ? "border-white/[0.16] bg-white/[0.08] text-gray-100"
          : "border-white/[0.06] bg-transparent text-gray-500 hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-gray-300"
      }`}
    >
      {children}
    </button>
  )
}

function PublicationCard({ pub }: { pub: Publication }) {
  const config = typeConfig[pub.type]
  const Icon = config.icon
  const content = (
    <article
      className="group relative h-full overflow-hidden rounded-xl border border-white/[0.06] bg-navy-800/45 p-5
                 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-navy-800/65"
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${config.accent} via-white/[0.08] to-transparent opacity-80`} />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex items-start justify-between gap-4 sm:block">
          <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${config.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-right sm:mt-4 sm:text-left">
            <div className="font-mono text-sm font-semibold text-gray-300">
              {formatDate(pub)}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${config.color}`}>
              {config.label}
            </span>
            {pub.presentation && (
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-400">
                {pub.presentation === "oral" ? "Oral" : "Poster"}
              </span>
            )}
            {pub.peerReviewed && (
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                Peer-reviewed
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold leading-snug text-gray-100 transition-colors duration-300 group-hover:text-white">
            {pub.title}
          </h3>

          <div className="mt-3 grid gap-2 text-sm text-gray-500">
            <div className="flex items-start gap-2">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
              <p className="leading-relaxed">{pub.authors.join(", ")}</p>
            </div>
            <div className="flex items-start gap-2">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
              <p className="font-mono text-[13px] leading-relaxed text-gray-400">{pub.venue}</p>
            </div>
          </div>

          {pub.url && (
            <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs font-medium text-cyan-400">
              View publication
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          )}
        </div>
      </div>
    </article>
  )

  if (!pub.url) return content

  return (
    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl">
      {content}
    </a>
  )
}

export default function Publications() {
  const [typeFilter, setTypeFilter] = useState<PublicationTypeFilter>("all")
  const [yearFilter, setYearFilter] = useState<PublicationYearFilter>("all")
  const [reviewFilter, setReviewFilter] = useState<PublicationReviewFilter>("all")

  const typeOptions = useMemo(
    () =>
      (Object.keys(typeConfig) as Publication["type"][]).filter((type) =>
        publications.some((pub) => pub.type === type),
      ),
    [],
  )

  const yearOptions = useMemo(
    () => Array.from(new Set(publications.map((pub) => pub.year))).sort((a, b) => b - a),
    [],
  )

  const filteredPubs = useMemo(
    () =>
      publications
        .filter((pub) => typeFilter === "all" || pub.type === typeFilter)
        .filter((pub) => yearFilter === "all" || pub.year === yearFilter)
        .filter((pub) => {
          if (reviewFilter === "all") return true
          return reviewFilter === "reviewed" ? pub.peerReviewed : !pub.peerReviewed
        })
        .sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year
          return (b.month ?? 0) - (a.month ?? 0)
        }),
    [typeFilter, yearFilter, reviewFilter],
  )

  const hasActiveFilter = typeFilter !== "all" || yearFilter !== "all" || reviewFilter !== "all"

  return (
    <section id="publications" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Publications
          </h2>
          <p className="text-gray-500 text-sm font-mono tracking-wider">業績</p>
        </div>

        <div className="mb-8 rounded-xl border border-white/[0.06] bg-navy-800/30 p-4">
          <div className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-12 font-mono text-[11px] uppercase tracking-wider text-gray-600">
                Type
              </span>
              <FilterButton active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>
                All
              </FilterButton>
              {typeOptions.map((type) => {
                const config = typeConfig[type]
                const Icon = config.icon
                return (
                  <FilterButton
                    key={type}
                    active={typeFilter === type}
                    onClick={() => setTypeFilter(type)}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      {config.label}
                    </span>
                  </FilterButton>
                )
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="w-12 font-mono text-[11px] uppercase tracking-wider text-gray-600">
                Year
              </span>
              <FilterButton active={yearFilter === "all"} onClick={() => setYearFilter("all")}>
                All
              </FilterButton>
              {yearOptions.map((year) => (
                <FilterButton
                  key={year}
                  active={yearFilter === year}
                  onClick={() => setYearFilter(year)}
                >
                  {year}
                </FilterButton>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="w-12 font-mono text-[11px] uppercase tracking-wider text-gray-600">
                Review
              </span>
              <FilterButton active={reviewFilter === "all"} onClick={() => setReviewFilter("all")}>
                All
              </FilterButton>
              <FilterButton
                active={reviewFilter === "reviewed"}
                onClick={() => setReviewFilter("reviewed")}
              >
                Peer-reviewed
              </FilterButton>
              <FilterButton
                active={reviewFilter === "not-reviewed"}
                onClick={() => setReviewFilter("not-reviewed")}
              >
                Non-reviewed
              </FilterButton>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
            <p className="font-mono text-xs text-gray-600">
              Showing <span className="text-gray-300">{filteredPubs.length}</span> / {publications.length}
            </p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={() => {
                  setTypeFilter("all")
                  setYearFilter("all")
                  setReviewFilter("all")
                }}
                className="font-mono text-xs text-gray-500 transition-colors hover:text-gray-300"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {filteredPubs.map((pub) => (
              <motion.div
                key={pub.title}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 12, transition: { duration: 0.18 } }}
                layout
              >
                <PublicationCard pub={pub} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
