import Image from "next/image"
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
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src="/images/teaching-program-hero.jpg"
                alt="Community teaching setting representing shared spiritual education"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/5 to-transparent" />
              <div className="absolute bottom-0 p-6 text-background">
                <p className="font-serif text-2xl font-semibold">
                  Teaching together, guiding practically
                </p>
                <p className="mt-2 max-w-sm text-sm text-background/80">
                  Their example speaks especially to families seeking spiritual
                  practice inside ordinary responsibilities.
                </p>
              </div>
            </div>
          </div>

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
