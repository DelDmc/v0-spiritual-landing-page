import Link from "next/link"
import { Globe, ExternalLink, Video, Mail } from "lucide-react"

const footerLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Method", href: "#method" },
  { label: "Impact", href: "#impact" },
  { label: "Global Reach", href: "#global-impact" },
  { label: "European Tour", href: "#tour" },
  { label: "Sponsorship", href: "#sponsorship" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#support" },
]

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: ExternalLink, href: "#", label: "Social" },
  { icon: Video, href: "#", label: "YouTube" },
  { icon: Mail, href: "#", label: "Email" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-xl font-semibold text-foreground"
            >
              Guru Maharaj & Guruma
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Helping families, communities, and individuals find peace through
              spiritual wisdom. Over four decades of dedicated service to humanity
              through Buddhi-Yoga.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Guru Maharaj & Guruma. All rights
            reserved.
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground/70">
            A spiritual social initiative dedicated to family harmony and
            peaceful consciousness.
          </p>
        </div>
      </div>
    </footer>
  )
}
