import { Quote, Music, Compass, GraduationCap, MessageCircle, Calendar, Heart } from "lucide-react"

const methods = [
  { icon: Music, label: "Chanting and meditation" },
  { icon: Compass, label: "Practical spiritual guidance" },
  { icon: GraduationCap, label: "Family-life education" },
  { icon: MessageCircle, label: "Personal counseling" },
  { icon: Calendar, label: "Seminars and community programs" },
  { icon: Heart, label: "Long-term mentorship" },
]

export function MethodSection() {
  return (
    <section id="method" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
              The Method: Buddhi-Yoga
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg text-pretty">
              {"Guruma describes her approach as Buddhi-Yoga — the cultivation of intelligence, consciousness, and inner clarity. The first goal is not conversion, but pacification: helping people reduce suffering, become calmer, and experience a better state of consciousness."}
            </p>

            {/* Quote Block */}
            <blockquote className="mt-8 relative rounded-xl border-l-4 border-accent bg-accent/10 p-6 lg:p-8">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/30" />
              <p className="font-serif text-lg italic text-foreground lg:text-xl">
                {'"First, we must pacify them. We only try to remove their problems and suffering through this method."'}
              </p>
            </blockquote>
          </div>

          {/* Method Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
            {methods.map((method) => (
              <div
                key={method.label}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-colors hover:border-accent"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <method.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {method.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
