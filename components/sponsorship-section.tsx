import {
  Plane,
  Car,
  Home,
  Building,
  ClipboardList,
  Video,
  Languages,
  Megaphone,
  ShieldCheck,
} from "lucide-react"

const expenses = [
  { icon: Plane, label: "Travel tickets" },
  { icon: Car, label: "Local transportation" },
  { icon: Home, label: "Accommodation" },
  { icon: Building, label: "Venue support" },
  { icon: ClipboardList, label: "Program organization" },
  { icon: Video, label: "Video recording and editing" },
  { icon: Languages, label: "Translation and subtitles" },
  { icon: Megaphone, label: "Community outreach" },
]

export function SponsorshipSection() {
  return (
    <section id="sponsorship" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            How Sponsorship Helps
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {"Sponsorship allows Guruma's team to organize programs, travel between countries, meet communities, document the work, and make the teachings available to more people."}
          </p>
        </div>

        {/* Expense Cards */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {expenses.map((expense) => (
            <div
              key={expense.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-accent"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-foreground">
                <expense.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {expense.label}
              </span>
            </div>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6 lg:p-8">
            <ShieldCheck className="h-8 w-8 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">
                Transparent Accountability
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                All sponsor contributions should be tracked transparently.
                Receipts, bills, and expense reports can be collected and shared
                with supporters to build long-term trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
