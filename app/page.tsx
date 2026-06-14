import { Navigation } from "@/components/navigation"
import { MissionSection } from "@/components/mission-section"
import { ProblemSection } from "@/components/problem-section"
import { MethodSection } from "@/components/method-section"
import { ImpactSection } from "@/components/impact-section"
import { GlobalImpactSection } from "@/components/global-impact-section"
import { UniquenessSection } from "@/components/uniqueness-section"
import { TourSection } from "@/components/tour-section"
import { SponsorshipSection } from "@/components/sponsorship-section"
import { VisionSection } from "@/components/vision-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <GlobalImpactSection />
      <MissionSection />
      <ProblemSection />
      <MethodSection />
      <ImpactSection />
      <UniquenessSection />
      <TourSection />
      <SponsorshipSection />
      <VisionSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
