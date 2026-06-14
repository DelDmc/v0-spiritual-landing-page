"use client"

import dynamic from "next/dynamic"
import { BookOpen, Globe2, HeartHandshake, Users, X } from "lucide-react"
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

const stats = [
  {
    icon: Globe2,
    value: "46+",
    label: "years of preaching",
  },
  {
    icon: HeartHandshake,
    value: "around 800",
    label: "people mentored",
  },
  {
    icon: BookOpen,
    value: "30+",
    label: "seminars organized",
  },
  {
    icon: Users,
    value: "Asia, Europe, Australia",
    label: "international reach",
  },
]

function GlobeLoadingSkeleton() {
  return (
    <div className="relative mx-auto h-[calc(100vw-2rem)] max-h-[22rem] w-[calc(100vw-2rem)] max-w-[22rem] overflow-visible sm:h-[29rem] sm:max-h-none sm:w-full sm:max-w-[29rem] lg:h-[31rem] lg:max-w-none">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white/20 shadow-2xl shadow-amber-200/30" />
      <div className="absolute inset-x-8 bottom-8 h-3 animate-pulse rounded-full bg-white/20" />
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
    <article className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.08] p-5 text-primary-foreground shadow-2xl shadow-black/10 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {categoryLabels[point.category]}
          </p>
          <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight">
            {point.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary-foreground/15 text-primary-foreground/70 transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Close selected location"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 text-sm font-medium text-primary-foreground/75">
        {point.city ? `${point.city}, ${point.country}` : point.country}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-primary-foreground/78">
        {point.description}
      </p>
    </article>
  )
}

export function GlobeSection() {
  const [activePoint, setActivePoint] = useState<GlobePoint | null>(
    globePoints[0],
  )
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
      className="relative overflow-hidden bg-[#01020a] py-16 text-primary-foreground sm:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/25" />
      <div className="cosmic-nebula absolute inset-0" />
      <div className="cosmic-vignette absolute inset-0" />
      <div className="cosmic-starfield-fine absolute inset-0 opacity-95" />
      <div className="cosmic-starfield absolute inset-0 opacity-85" />
      <div className="cosmic-starfield-bright absolute inset-0 opacity-80" />
      <div className="cosmic-starfield-glow absolute inset-0 opacity-75" />
      <div className="cosmic-local-stars absolute inset-0 opacity-90" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl min-w-0 items-start gap-7 px-4 sm:px-6 lg:min-h-[42rem] lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:items-center lg:gap-8 lg:px-8">
        <div className="order-1 -mx-4 flex min-w-0 justify-center px-4 sm:mx-0 sm:px-0 lg:block">
          <InteractiveGlobe
            selectedId={activePoint?.id}
            onSelect={setActivePoint}
          />
        </div>

        <div className="order-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Global guidance network
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl">
            A Global Network of Guidance and Service
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/78 sm:text-lg">
            From Bali to Europe, Guru-ma and Guru Maharaj's work connects
            families, communities, and seekers through practical spiritual
            education.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-h-24 rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.07] p-3.5 sm:min-h-28 sm:p-4"
              >
                <stat.icon className="h-5 w-5 text-accent" />
                <p className="mt-3 text-lg font-semibold leading-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-primary-foreground/62">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            {activePoint ? (
              <PointCard point={activePoint} onClose={() => setActivePoint(null)} />
            ) : (
              <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.06] p-5">
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

          <div
            className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
            aria-label="Globe locations"
          >
            {globePoints.map((point) => (
              <button
                key={point.id}
                type="button"
                onClick={() => setActivePoint(point)}
                aria-pressed={activePoint?.id === point.id}
                className="shrink-0 rounded-md border border-primary-foreground/15 px-3 py-2 text-xs font-medium text-primary-foreground/72 transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-pressed:border-accent aria-pressed:bg-accent/15 aria-pressed:text-accent"
              >
                {point.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
