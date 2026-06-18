"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#global-impact", label: "Globe" },
  { href: "#mission", label: "Mission" },
  { href: "#method", label: "Method" },
  { href: "#impact", label: "Impact" },
  { href: "#tour", label: "European Tour" },
  { href: "#sponsorship", label: "Sponsorship" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 w-screen max-w-[100vw] overflow-x-clip transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="w-full max-w-full overflow-x-clip border-b border-white/10 bg-[#02030a]/95 text-primary-foreground backdrop-blur-md">
        <div className="mx-auto w-full max-w-full px-3 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex h-12 w-full min-w-0 max-w-full items-center justify-between gap-2 lg:h-14">
          <Link
            href="/"
            className="block min-w-0 max-w-[calc(100vw-4.75rem)] truncate text-[0.72rem] font-semibold uppercase leading-tight tracking-[0.18em] text-primary-foreground sm:text-xs lg:max-w-none lg:text-sm lg:tracking-[0.24em]"
          >
            Global Family Mentorship Mission
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-primary-foreground/62 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#support"
              className="rounded-md border border-white/15 bg-white/8 px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/14"
            >
              Support the Mission
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-primary-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="w-full overflow-hidden border-t border-white/10 bg-[#02030a] pb-4 lg:hidden">
            <div className="flex min-w-0 flex-col space-y-3 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="min-w-0 px-2 py-2 text-sm font-medium text-primary-foreground/68 transition-colors hover:text-primary-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#support"
                onClick={() => setIsOpen(false)}
                className="mx-2 max-w-full rounded-md border border-white/15 bg-white/8 px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-white/14"
              >
                Support the Mission
              </Link>
            </div>
          </div>
        )}
        </div>
      </div>
    </nav>
  )
}
