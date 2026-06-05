import { Heart, Brain, Users } from "lucide-react"

const missionCards = [
  {
    icon: Heart,
    title: "Peaceful Families",
    description:
      "Supporting couples, parents, and children through spiritual guidance, discipline, and practical wisdom.",
  },
  {
    icon: Brain,
    title: "Clearer Consciousness",
    description:
      "Helping people move from confusion and emotional disturbance toward calm thinking and better decisions.",
  },
  {
    icon: Users,
    title: "Stronger Communities",
    description:
      "Creating harmony between people, families, devotees, and community leaders.",
  },
]

export function MissionSection() {
  return (
    <section id="mission" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            Our Mission
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            {"Guruma's work focuses on helping people pacify the mind, strengthen family relationships, and develop clear spiritual intelligence. Her teaching addresses real-life problems: conflict between husband and wife, difficulties between parents and children, tensions inside communities, and confusion about how to live responsibly."}
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {missionCards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-accent hover:shadow-lg"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
