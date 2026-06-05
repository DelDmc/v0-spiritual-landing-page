import Link from "next/link"
import { Calendar, Users, BookOpen, Award } from "lucide-react"

const stats = [
  { icon: Calendar, value: "46+", label: "Years of Teaching" },
  { icon: Users, value: "800+", label: "People Mentored" },
  { icon: BookOpen, value: "30+", label: "Seminars Organized" },
  { icon: Award, value: "100+", label: "Classes Per Year" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20 lg:pt-0">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl text-balance">
              Helping Families, Communities, and Individuals Find Peace Through
              Spiritual Wisdom
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl text-pretty">
              Guruma and Guru Maharaj have dedicated more than four decades to
              guiding people through family challenges, spiritual confusion, and
              personal suffering — with a practical path toward peaceful
              consciousness and responsible living.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="#support"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Support the Mission
              </Link>
              <Link
                href="#tour"
                className="inline-flex items-center justify-center rounded-md border border-border bg-card px-8 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                View European Tour
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 rounded-lg bg-card/60 p-4 lg:items-start"
                >
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-secondary lg:max-w-none">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 h-24 w-24 rounded-full bg-accent/30" />
                <p className="text-sm text-muted-foreground">
                  Photo placeholder
                </p>
                <p className="mt-2 text-xs text-muted-foreground/70">
                  Guru Maharaj & Guruma or a peaceful Balinese spiritual setting
                </p>
              </div>
              {/* Decorative border */}
              <div className="absolute inset-4 rounded-xl border border-accent/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="h-8 w-px bg-border" />
        </div>
      </div>
    </section>
  )
}
