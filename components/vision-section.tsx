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
    <section id="vision" className="bg-secondary/50 py-20 lg:py-32">
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

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid gap-px bg-border sm:grid-cols-3">
              {[
                {
                  icon: Palmtree,
                  title: "Culture",
                  copy: "Balinese heritage, hospitality, and respectful tourism.",
                },
                {
                  icon: Home,
                  title: "Community",
                  copy: "Family-centered living with education and service.",
                },
                {
                  icon: Sprout,
                  title: "Sustainability",
                  copy: "Agriculture, local production, and simple living.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-card p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-6 text-center">
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
                This larger vision can be developed step by step: first through
                educational programs and partnerships, then through land,
                infrastructure, and community-based economic activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
