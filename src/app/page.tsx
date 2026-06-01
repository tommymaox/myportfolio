import { Nav } from '@/components/ui/Nav'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { Hero } from '@/components/sections/Hero'
import { MetricsSection } from '@/components/sections/MetricsSection'
import { Marquee } from '@/components/sections/Marquee'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { HomeLabSection } from '@/components/sections/HomeLabSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MetricsSection />
        <Marquee />
        <ProjectsSection />
        <HomeLabSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <CommandPalette />
    </>
  )
}
