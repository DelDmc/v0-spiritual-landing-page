import Link from "next/link"
import { CalendarDays, MapPin, UsersRound } from "lucide-react"

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

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <MapPin className="mr-1 inline-block h-4 w-4" />
          Additional locations may be added depending on the final schedule.
        </p>

        <div className="mt-12 text-center">
          <Link
            href="#support"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Help Organize a Meeting
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid overflow-hidden rounded-xl border border-border bg-card md:grid-cols-3">
            <div className="border-b border-border p-6 md:border-b-0 md:border-r">
              <CalendarDays className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                Schedule Planning
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Dates, cities, and host communities can be confirmed as sponsor
                and organizer support becomes available.
              </p>
            </div>
            <div className="border-b border-border p-6 md:border-b-0 md:border-r">
              <UsersRound className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                Program Formats
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Public talks, family seminars, private guidance, kirtan, temple
                meetings, home programs, and interfaith gatherings.
              </p>
            </div>
            <div className="p-6">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                Host Opportunity
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Businesses, communities, and organizers can help arrange venues,
                accommodation, transport, and local outreach.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {countries.map((country, index) => (
              <div key={country.name} className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-base shadow-sm">
                  {country.flag}
                </span>
                {index < countries.length - 1 && (
                  <span className="hidden h-px w-8 bg-border sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
