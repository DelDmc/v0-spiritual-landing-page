import {
  BookOpen,
  Home,
  Palmtree,
  Leaf,
  Sprout,
  Apple,
  Camera,
  Lightbulb,
} from "lucide-react"

const features = [
  { icon: BookOpen, label: "Spiritual education" },
  { icon: Home, label: "Family-centered living" },
  { icon: Palmtree, label: "Balinese cultural heritage" },
  { icon: Leaf, label: "Yoga and meditation" },
  { icon: Sprout, label: "Sustainable agriculture" },
  { icon: Apple, label: "Fruit processing and local production" },
  { icon: Camera, label: "Tourism and cultural programs" },
  { icon: Lightbulb, label: "Simple living, high thinking" },
]

export function VisionSection() {
  return (
    <section className="bg-secondary/50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl text-balance">
              The Long-Term Vision: A Spiritual Social Community in Bali
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
              {"Guruma's long-term dream is to establish a peaceful spiritual social community on land in Bali. The vision is a village-like environment where people can live materially and spiritually well, maintain good relationships, preserve culture, practice spiritual life, and become self-sustaining."}
            </p>

            {/* Highlighted Quote */}
            <div className="mt-8 rounded-xl bg-primary p-6 text-primary-foreground lg:p-8">
              <p className="font-serif text-xl font-medium italic lg:text-2xl">
                {'"Simple living, high thinking."'}
              </p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Image Placeholder */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-muted to-accent/10">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 grid grid-cols-3 gap-2">
                {[Palmtree, Home, Sprout].map((Icon, i) => (
                  <div
                    key={i}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-sm"
                  >
                    <Icon className="h-8 w-8 text-primary/60" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Vision rendering placeholder
              </p>
              <p className="mt-2 text-xs text-muted-foreground/70">
                Peaceful Balinese spiritual community concept
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
