import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, BookOpen, Award } from "lucide-react"

const stats = [
  { icon: Calendar, value: "~46", label: "Years of Teaching" },
  { icon: Users, value: "~800", label: "People Mentored" },
  { icon: BookOpen, value: "30+", label: "Seminars Organized" },
  { icon: Award, value: "~100", label: "Classes Per Year" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 lg:pt-28">
      <div className="mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:items-center">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Spiritual education for family and community life
            </p>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl text-balance">
              Guru Maharaj and Guruma
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl text-pretty">
              A married spiritual teaching couple helping families, communities,
              and individuals build peaceful consciousness, responsible
              relationships, and values-based daily life.
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

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex min-h-32 flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 lg:items-start"
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
            <p className="mt-4 text-xs text-muted-foreground">
              Figures are approximate and intended for presentation context.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[16/11] max-w-2xl overflow-hidden rounded-xl border border-border bg-muted shadow-sm lg:aspect-[5/4]">
              <Image
                src="/images/teaching-program-hero.jpg"
                alt="A calm community teaching program representing Guru Maharaj and Guruma's family guidance work"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-foreground/70 p-5 text-left text-background backdrop-blur-sm">
                <p className="text-sm font-medium">
                  Practical guidance through classes, seminars, personal
                  meetings, and community programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
