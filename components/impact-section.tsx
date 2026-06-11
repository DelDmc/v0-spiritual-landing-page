const stats = [
  {
    value: "~46",
    label: "Years of Teaching",
    description: "Long-term preaching, teaching, and practical guidance.",
  },
  {
    value: "~800",
    label: "People Mentored",
    description:
      "Spiritual students and people receiving guidance across several countries.",
  },
  {
    value: "~100",
    label: "Classes Per Year",
    description:
      "Based on regular weekly classes, personal guidance, and small groups.",
  },
  {
    value: "30+",
    label: "Seminars Organized",
    description: "Including interfaith, spiritual, and social programs.",
  },
]

export function ImpactSection() {
  return (
    <section id="impact" className="bg-primary py-20 text-primary-foreground lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Proven Impact Over Decades
          </h2>
          <p className="mt-5 text-sm text-primary-foreground/70">
            Approximate figures, to be refined as the team confirms records.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-6 text-center lg:p-8"
            >
              <span className="font-serif text-4xl font-bold lg:text-5xl">
                {stat.value}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{stat.label}</h3>
              <p className="mt-2 text-sm text-primary-foreground/70">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-base leading-relaxed text-primary-foreground/80 lg:text-lg text-pretty">
            {"Guruma has helped many couples who were close to divorce rebuild understanding and preserve their families. Her strongest area of teaching is family life: how to live spiritually while fulfilling daily responsibilities."}
          </p>
        </div>
      </div>
    </section>
  )
}
