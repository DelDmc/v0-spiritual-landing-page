import Link from "next/link"
import { Heart, Calendar, FileText, Mail } from "lucide-react"

const actions = [
  {
    icon: Heart,
    label: "Sponsor Inquiry",
    href: "#contact",
    primary: true,
  },
  {
    icon: Calendar,
    label: "Request a Meeting",
    href: "#contact",
    primary: false,
  },
  {
    icon: FileText,
    label: "Request Budget",
    href: "#contact",
    primary: false,
  },
  {
    icon: Mail,
    label: "Contact the Team",
    href: "#contact",
    primary: false,
  },
]

export function CTASection() {
  return (
    <section
      id="support"
      className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl text-balance">
            Support a Mission That Strengthens Families and Communities
          </h2>
          <p className="mt-6 text-base leading-relaxed text-primary-foreground/80 lg:text-lg text-pretty">
            Your support can help bring spiritual guidance, family education, and
            peaceful consciousness to more people.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition-colors ${
                action.primary
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "border border-primary-foreground/30 bg-transparent hover:bg-primary-foreground/10"
              }`}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Link>
          ))}
        </div>

        <div
          id="contact"
          className="mx-auto mt-16 grid max-w-3xl gap-4 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-6 sm:grid-cols-3 lg:p-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
              For sponsors
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
              Request a budget, expense plan, or sponsorship conversation.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
              For organizers
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
              Invite Guruma and Guru Maharaj for a class, seminar, or meeting.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
              Contact
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
              Confirmed email, phone, and social links can be added before
              publication.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
