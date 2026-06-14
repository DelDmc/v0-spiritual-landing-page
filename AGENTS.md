# AGENTS.md

## Project Overview

This project is a Next.js landing page for **Guru Maharaj and Guruma**.

The site is intended to replace or support a slide presentation for businesses,
potential sponsors, donors, event organizers, spiritual communities, and other
external audiences. It should explain their teaching work in a calm, modern,
credible, business-friendly way.

The current first section is an investor-facing interactive globe showing the
international reach of Guru-ma and Guru Maharaj's preaching, mentorship, family
guidance, and European tour network.

## Current Page Flow

`app/page.tsx` currently renders sections in this order:

1. `Navigation`
2. `GlobalImpactSection`
3. `MissionSection`
4. `ProblemSection`
5. `MethodSection`
6. `ImpactSection`
7. `UniquenessSection`
8. `TourSection`
9. `SponsorshipSection`
10. `VisionSection`
11. `TestimonialsSection`
12. `CTASection`
13. `Footer`

`HeroSection` still exists in `components/hero-section.tsx`, but it is not
currently rendered by `app/page.tsx`.

## Current Git Status

Recent committed work on branch `codex-work`:

- `83a3d54 Add interactive globe section`
- `b275430 Polish landing page content and layout`

At the time this file was updated, remaining local uncommitted files were:

- `components/hero-section.tsx`: modified, currently unused by the page.
- `AGENTS.md`: this project guide.

Review those deliberately before committing.

## Technical Stack

- Next.js 16 app router
- React 19
- TypeScript
- Tailwind CSS 4
- `@react-three/fiber`
- `three`
- `lucide-react`
- pnpm lockfile
- Static export for Cloudflare Pages via `output: "export"`

Important deployment settings in `next.config.mjs`:

- `output: "export"`
- `images.unoptimized: true`
- `typescript.ignoreBuildErrors: true`

Even though build ignores TypeScript errors, run `pnpm run lint` before
committing.

## Runtime Notes

Next.js 16 requires Node `>=20.9.0`.

The local shell used during development reported Node `v19.9.0`, so build and
dev verification were run with a temporary Node 20 runtime:

```bash
npx -y node@20 node_modules/next/dist/bin/next build
npx -y node@20 node_modules/next/dist/bin/next dev
```

If the machine has Node 20+ installed normally, use the standard commands below.

## Commands

Install dependencies:

```bash
corepack pnpm install
```

Run type check:

```bash
corepack pnpm lint
```

Run production static export build:

```bash
corepack pnpm build
```

Run development server:

```bash
corepack pnpm dev
```

If Node is still below 20.9.0, use:

```bash
npx -y node@20 node_modules/next/dist/bin/next dev
npx -y node@20 node_modules/next/dist/bin/next build
```

Generated files such as `out/`, `.next/`, and `tsconfig.tsbuildinfo` should not
be committed.

## Interactive Globe

Main files:

- `components/GlobeSection.tsx`
- `components/InteractiveGlobe.tsx`
- `components/global-impact-section.tsx`
- `data/globePoints.ts`
- `lib/globeUtils.ts`
- `public/images/earth-atmos-2048.jpg`

The exported section is:

```tsx
import { GlobalImpactSection } from "@/components/global-impact-section"
```

The reusable globe component is:

```tsx
import { InteractiveGlobe } from "@/components/InteractiveGlobe"
```

The globe is client-side only and loaded through a dynamic import in
`GlobeSection.tsx` with SSR disabled.

### Globe Behavior

- Real Earth texture from `public/images/earth-atmos-2048.jpg`
- Texture is processed into a contrast-balanced canvas texture before rendering.
- Fallback canvas texture is used immediately so the globe does not disappear
  while the image loads.
- WebGL support is checked client-side; browsers without WebGL get fallback UI.
- Auto-rotation is slow and pauses on hover/drag/touch interaction.
- User drag should rotate the globe only around the north-south polar axis; do
  not add free manual vertical tilt.
- Points pulse gently.
- Hover shows a small location label.
- Click/tap selects a point, applies predictable longitude yaw plus a modest
  capped latitude pitch so that country can move toward the center without
  rolling/tumbling the Earth, highlights it with an amber ring, and updates the
  information card.
- Reduced-motion users receive minimal animation.

### Globe Mobile Layout

Mobile presentation is intentionally simple:

- Globe appears first.
- Content, stats, selected-location card, and location controls appear below.
- Globe viewport is centered and square on phone/tablet:
  - phone max width: `23.5rem`
  - tablet max width: `29rem`
  - desktop height: `31rem`
- Location buttons are a horizontal scroll row on mobile.
- On desktop the layout is two columns: globe left, content/card right.

## Globe Data

Edit points and arcs in `data/globePoints.ts`.

Current point categories:

- `base`
- `tour`
- `mentorship`
- `preaching`
- `community`

Use careful language. Do not invent exaggerated claims.

Preferred wording:

- "around 800 people mentored"
- "mostly in Indonesia"
- "European tour countries"
- "international spiritual and family guidance network"

## Current Globe Points

- Bali, Indonesia
- Indonesia
- India
- Australia
- Malaysia
- Ukraine
- Russia
- Switzerland
- Italy
- Germany
- Belgium
- Netherlands
- Norway

## Content Principles

Use a tone that is:

- respectful
- calm
- credible
- mature
- clear
- accessible to business people and sponsors

Avoid:

- inflated claims
- vague spiritual marketing language
- excessive religious jargon
- aggressive donation language
- unverified testimonial claims
- placeholder content that looks unfinished

Prefer:

- family stability
- peaceful consciousness
- practical spiritual education
- responsible relationships
- community support
- transparent sponsor use
- approximate numbers when exact records are not confirmed

## Known Project Facts

Use only as approximate unless later confirmed:

- Around 46 years of preaching / teaching experience
- Around 800 people mentored / guided
- Around 100 classes per year, based on approximately two classes per week
- More than 30 seminars organized
- Married since 1982
- Teaching together as a grihastha couple
- Work includes spiritual education, family guidance, seminars, classes,
  personal guidance, community support, and European preaching tour planning

Countries currently represented include Indonesia, India, Australia, Malaysia,
Ukraine, Russia, Switzerland, Italy, Germany, Belgium, the Netherlands, and
Norway.

## Design Direction

The site should feel:

- premium
- calm
- trustworthy
- presentation-ready
- readable
- mature
- suitable for sponsors and business audiences

Avoid:

- toy-like or game-like effects
- crypto/neon/sci-fi styling
- excessive animation
- large decorative blobs/orbs
- placeholder cards where real content can be shown
- overclaiming impact

## Assets

Current notable assets:

- `public/images/earth-atmos-2048.jpg`: real Earth texture used by the globe.
- `public/images/teaching-program-hero.jpg`: image used in the polished content
  sections.

Do not add heavy 3D models unless absolutely necessary.

## Verification Status

Last successful checks:

```bash
corepack pnpm lint
npx -y node@20 node_modules/next/dist/bin/next build
```

The production build successfully generated static pages for:

- `/`
- `/_not-found`

The dev server was last started with Node 20 and Webpack on
`http://localhost:3003`.
