import { Play, Quote } from "lucide-react"

const questions = [
  "How did you meet Guruma and Guru Maharaj?",
  "What role did they play in your life?",
  "How did their guidance affect your family or spiritual life?",
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            Stories From People Whose Lives Were Changed
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            Video testimonials from families, students, and community members can
            be added here. These stories should show Guruma through the eyes of
            people who personally experienced her guidance.
          </p>
        </div>

        {/* Testimonial Prompts */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {questions.map((question, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6"
            >
              <Quote className="h-6 w-6 text-accent" />
              <p className="mt-4 font-medium text-foreground">{question}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Testimonial prompt {index + 1}
              </p>
            </div>
          ))}
        </div>

        {/* Video Placeholders */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-muted to-secondary"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Video testimonial {num}
                </p>
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-foreground/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Additional note */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Real video testimonials will be added to demonstrate the genuine impact
          of Guruma&apos;s guidance on individuals and families.
        </p>
      </div>
    </section>
  )
}
