import Link from "next/link"
import { MapPin } from "lucide-react"

const countries = [
  { name: "Italy", flag: "🇮🇹" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "The Netherlands", flag: "🇳🇱" },
  { name: "Norway", flag: "🇳🇴" },
]

export function TourSection() {
  return (
    <section id="tour" className="bg-secondary/50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            European Spiritual Guidance Tour
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {"Guruma's upcoming European tour is an opportunity to bring this guidance to communities, families, entrepreneurs, and supporters across Europe."}
          </p>
        </div>

        {/* Country Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {countries.map((country) => (
            <div
              key={country.name}
              className="flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 transition-colors hover:border-accent"
            >
              <span className="text-xl" role="img" aria-label={country.name}>
                {country.flag}
              </span>
              <span className="font-medium text-foreground">{country.name}</span>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          <MapPin className="mr-1 inline-block h-4 w-4" />
          Additional locations may be added depending on the final schedule.
        </p>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="#support"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Help Organize a Meeting
          </Link>
        </div>

        {/* Tour Visual Placeholder */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-gradient-to-r from-muted via-secondary to-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex items-center justify-center gap-2">
                  {countries.slice(0, 3).map((c, i) => (
                    <div
                      key={c.name}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-lg shadow-sm"
                    >
                      {c.flag}
                    </div>
                  ))}
                  <span className="text-2xl text-muted-foreground">···</span>
                  {countries.slice(-3).map((c, i) => (
                    <div
                      key={c.name}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-lg shadow-sm"
                    >
                      {c.flag}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Tour map placeholder — dates and cities to be added
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
