import { Nav } from '@/components/ui/Nav'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { Hero } from '@/components/sections/Hero'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { Timeline } from '@/components/sections/Timeline'
import { CapabilityMatrix } from '@/components/sections/CapabilityMatrix'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <div className="grid-bg" />
      <Nav />
      <main className="shell">
        <Hero />
        <FeaturedProjects />
        <Timeline />
        <CapabilityMatrix />
        <Footer />
      </main>
      <CommandPalette />
    </>
  )
}
