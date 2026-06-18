"use client"

import dynamic from "next/dynamic"
import { X } from "lucide-react"
import { useMemo, useState } from "react"

import { globePoints, type GlobePoint } from "@/data/globePoints"

const InteractiveGlobe = dynamic(
  () =>
    import("@/components/InteractiveGlobe").then(
      (module) => module.InteractiveGlobe,
    ),
  {
    ssr: false,
    loading: () => <GlobeLoadingSkeleton />,
  },
)

const categoryLabels: Record<GlobePoint["category"], string> = {
  base: "Base",
  tour: "European Tour",
  mentorship: "Mentorship",
  preaching: "Preaching",
  community: "Community",
}

function GlobeLoadingSkeleton() {
  return (
    <div className="relative mx-auto h-[74vw] max-h-[17rem] w-[74vw] max-w-[17rem] overflow-visible sm:h-[24rem] sm:max-h-none sm:w-full sm:max-w-[24rem] md:h-[29rem] md:max-w-[29rem] lg:h-[31rem] lg:max-w-none">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white/16 shadow-[0_0_60px_rgba(220,235,255,0.36)]" />
      <div className="absolute inset-x-10 bottom-8 h-px animate-pulse bg-white/35" />
    </div>
  )
}

function PointCard({
  point,
  onClose,
}: {
  point: GlobePoint
  onClose: () => void
}) {
  return (
    <article className="min-w-0 max-w-full overflow-hidden rounded-md border border-white/18 bg-[#050814]/82 p-4 text-primary-foreground shadow-2xl shadow-black/30 backdrop-blur sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sky-200 sm:text-xs sm:tracking-[0.22em]">
            {categoryLabels[point.category]}
          </p>
          <h3 className="mt-3 [overflow-wrap:anywhere] text-xl font-semibold leading-tight tracking-wide sm:text-2xl">
            {point.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/20 text-primary-foreground/70 transition hover:border-sky-200 hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
          aria-label="Close selected location"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 [overflow-wrap:anywhere] text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground/62 sm:text-xs sm:tracking-[0.18em]">
        {point.city ? `${point.city}, ${point.country}` : point.country}
      </p>
      <p className="mt-4 [overflow-wrap:anywhere] text-sm leading-relaxed text-primary-foreground/78">
        {point.description}
      </p>
    </article>
  )
}

export function GlobeSection() {
  const [activePoint, setActivePoint] = useState<GlobePoint | null>(null)
  const tourCountries = useMemo(
    () =>
      globePoints
        .filter((point) => point.category === "tour")
        .map((point) => point.country)
        .join(", "),
    [],
  )

  return (
    <section
      id="global-impact"
      className="relative w-full max-w-[100vw] overflow-x-clip bg-[#02030a] pb-12 pt-20 text-primary-foreground sm:pb-24 sm:pt-24 lg:pt-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/35" />
      <div className="cosmic-nebula absolute inset-0" />
      <div className="cosmic-vignette absolute inset-0" />
      <div className="cosmic-starfield-fine absolute inset-0 opacity-95" />
      <div className="cosmic-starfield absolute inset-0 opacity-85" />
      <div className="cosmic-starfield-bright absolute inset-0 opacity-80" />
      <div className="cosmic-starfield-glow absolute inset-0 opacity-75" />
      <div className="cosmic-local-stars absolute inset-0 opacity-90" />
      <div className="aerospace-grid absolute inset-0 opacity-80" />
      <div className="aerospace-scanline absolute inset-0 opacity-[0.045]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/8 to-transparent" />
      <div className="absolute inset-x-8 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/45 to-transparent lg:block" />
      <div className="absolute bottom-6 left-8 hidden h-px w-52 bg-gradient-to-r from-white/45 to-transparent lg:block" />

      <div className="relative mx-auto w-full max-w-5xl px-3 text-center sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-4xl [overflow-wrap:anywhere] text-[1.85rem] font-semibold uppercase leading-[1.03] tracking-[0.01em] text-balance sm:text-5xl sm:tracking-wide">
          Building Strong Families Across Cultures and Generations
        </h1>
        <p className="mx-auto mt-5 max-w-2xl [overflow-wrap:anywhere] border-y border-sky-200/30 px-3 py-3 text-sm uppercase tracking-[0.08em] text-primary-foreground/78 sm:text-base">
          Strong Societies begin with Strong Families
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200 sm:text-sm">
          46 years of global family mentorship
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/66 sm:text-base">
          A Rare Husband-and-Wife Mentoring Partnership Since 1980
        </p>
      </div>

      <div className="relative mx-auto mt-8 grid w-full max-w-[100vw] min-w-0 items-start gap-6 overflow-hidden px-3 sm:gap-7 sm:px-6 lg:min-h-[36rem] lg:max-w-7xl lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-center lg:gap-8 lg:overflow-visible lg:px-8">
        <div className="order-1 flex min-w-0 max-w-full justify-center lg:block">
          <InteractiveGlobe
            selectedId={activePoint?.id}
            onSelect={setActivePoint}
          />
        </div>

        <div className="order-2 flex w-full min-w-0 max-w-full flex-col overflow-hidden text-center lg:text-left">
          <div className="flex min-w-0 flex-col gap-4">
            <div
              className="order-1 grid min-w-0 grid-cols-2 gap-2 overflow-hidden lg:order-2 lg:flex lg:flex-wrap"
              aria-label="Globe locations"
            >
              {globePoints.map((point) => (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setActivePoint(point)}
                  aria-pressed={activePoint?.id === point.id}
                  className="min-h-9 min-w-0 rounded-md border border-white/15 bg-black/20 px-2 py-2 text-[0.62rem] font-semibold uppercase leading-tight tracking-normal text-primary-foreground/66 transition hover:border-sky-200 hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 aria-pressed:border-sky-200 aria-pressed:bg-sky-200/12 aria-pressed:text-sky-100 sm:px-3 sm:text-xs sm:tracking-[0.08em]"
                >
                  {point.label}
                </button>
              ))}
            </div>

            <div className="order-2 lg:order-1">
              {activePoint ? (
                <div className="hidden lg:block">
                  <PointCard point={activePoint} onClose={() => setActivePoint(null)} />
                </div>
              ) : (
                <div className="hidden rounded-md border border-white/15 bg-[#050814]/72 p-4 backdrop-blur sm:p-5 lg:block">
                  <p className="text-sm leading-relaxed text-primary-foreground/72">
                    Select a glowing point on the globe to view a place-based note
                    about mentorship, preaching, community support, or European
                    tour countries.
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-primary-foreground/55">
                    European tour countries: {tourCountries}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {activePoint ? (
        <div className="fixed inset-0 z-[60] flex items-end bg-black/58 px-3 pb-4 backdrop-blur-[1px] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close selected location"
            onClick={() => setActivePoint(null)}
          />
          <div className="relative w-full">
            <PointCard point={activePoint} onClose={() => setActivePoint(null)} />
          </div>
        </div>
      ) : null}
    </section>
  )
}
