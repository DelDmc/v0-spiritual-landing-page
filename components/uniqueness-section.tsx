import { Users2, BookHeart, UserCircle2 } from "lucide-react"

const uniquenessCards = [
  {
    icon: Users2,
    title: "A Husband-and-Wife Teaching Team",
    description:
      "Both Guruma and Guru Maharaj actively guide people, making their example especially relevant for family life.",
  },
  {
    icon: BookHeart,
    title: "Practical Family Wisdom",
    description:
      "Their guidance speaks directly to real family problems, not only abstract philosophy.",
  },
  {
    icon: UserCircle2,
    title: "Male and Female Perspectives",
    description:
      "Men and women can ask questions openly and receive guidance from both sides of family experience.",
  },
]

export function UniquenessSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Image Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-secondary">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 h-20 w-20 rounded-full bg-accent/30" />
                <p className="text-sm text-muted-foreground">Photo placeholder</p>
                <p className="mt-2 text-xs text-muted-foreground/70">
                  Guru Maharaj & Guruma together
                </p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 h-16 w-16 rounded-full border border-accent/20" />
              <div className="absolute bottom-4 right-4 h-24 w-24 rounded-full border border-primary/10" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
              A Rare Spiritual Family Example
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
              Guruma and Guru Maharaj are not only teachers; they are a married
              spiritual couple who have lived and preached together for decades.
              Married since 1982 and active in spiritual teaching since 1980, they
              offer a rare example of long-term family life connected with
              spiritual responsibility.
            </p>

            <div className="mt-10 space-y-6">
              {uniquenessCards.map((card) => (
                <div
                  key={card.title}
                  className="flex gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
