import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ServicesOverview } from "@/components/sections/ServicesOverview"
import { WhyFutureCorp } from "@/components/sections/WhyFutureCorp"
import { ImpactStatistics } from "@/components/sections/ImpactStatistics"
import { ContactPreview } from "@/components/sections/ContactPreview"
import { HomeClient } from "@/components/layout/HomeClient"

/**
 * SERVER COMPONENT — renders static sections as HTML on the server.
 * Only the Hero + Loading Screen are client-side via HomeClient.
 */
export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground selection:bg-electric-blue selection:text-navy-900">
      {/* Client-side: Loading screen + Hero with 3D */}
      <HomeClient />

      {/* Server-side: All static content sections — rendered as HTML for SEO */}
      <Navbar />
      <ServicesOverview />
      <ImpactStatistics />
      <WhyFutureCorp />
      <ContactPreview />
      <Footer />
    </main>
  )
}
