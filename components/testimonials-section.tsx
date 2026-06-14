import { Quote, Video, MessageSquareText } from "lucide-react"

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

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {questions.map((question, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6"
            >
              <Quote className="h-6 w-6 text-accent" />
              <p className="mt-4 font-medium text-foreground">{question}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Recommended interview question
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <Video className="h-7 w-7 text-primary" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
              Video Stories
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Short recorded stories can show how the guidance affected family
              communication, spiritual practice, emotional steadiness, and
              community participation.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <MessageSquareText className="h-7 w-7 text-primary" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
              Written References
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Written testimonials should include the person&apos;s relationship
              to the work, the guidance received, and the practical change they
              experienced.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          This section is prepared for verified stories only; no unconfirmed
          testimonial claims are shown.
        </p>
      </div>
    </section>
  )
}
