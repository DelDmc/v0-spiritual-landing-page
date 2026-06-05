import { ArrowRight, Check } from "lucide-react"

const challenges = [
  "Family conflict",
  "Divorce pressure",
  "Parent-child misunderstanding",
  "Loss of discipline",
  "Emotional instability",
  "Community tension",
]

const outcomes = [
  "Peace of mind",
  "Responsible decisions",
  "Stronger family bonds",
  "Calmer children",
  "Healthier communities",
  "Spiritual direction",
]

export function ProblemSection() {
  return (
    <section className="bg-secondary/50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            Why This Work Matters
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {"Many people today face disturbed relationships, family instability, loneliness, lack of discipline, and confusion about what is right or wrong. Guruma's view is simple: society begins with the family. When family relationships become peaceful, children become calmer, people act more responsibly, and communities become healthier."}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Challenges */}
          <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Common Challenges
            </h3>
            <ul className="mt-6 space-y-4">
              {challenges.map((challenge) => (
                <li
                  key={challenge}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  </span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 lg:p-10">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Positive Outcomes
            </h3>
            <ul className="mt-6 space-y-4">
              {outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-center gap-3 text-foreground"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Arrow connecting the two */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="text-sm">From challenges</span>
            <ArrowRight className="h-5 w-5 text-primary" />
            <span className="text-sm">to transformation</span>
          </div>
        </div>
      </div>
    </section>
  )
}
