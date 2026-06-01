'use client'

import { Mail, ArrowUpRight } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { FadeIn } from '@/components/ui/FadeIn'

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-rounded"
      style={{
        position: 'relative',
        padding: 'clamp(96px, 12vw, 160px) 0 clamp(72px, 9vw, 112px)',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, var(--bg) 0%, #07120C 60%, #050E08 100%)',
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(800px 400px at 50% 0%, oklch(78% 0.13 145 / 0.16), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          textAlign: 'center',
        }}
      >
        <FadeIn>
          <div className="uppercase-label" style={{ marginBottom: 18 }}>
            · Get in touch
          </div>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2
            className="display-heading gradient-heading-accent"
            style={{ margin: 0, marginBottom: 22 }}
          >
            Let&apos;s build.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            style={{
              fontFamily: 'var(--font-kanit), sans-serif',
              fontSize: 'clamp(16px, 1.4vw, 19px)',
              color: 'var(--ink-2)',
              lineHeight: 1.55,
              margin: '0 auto 38px',
              maxWidth: 580,
              fontWeight: 400,
            }}
          >
            Open to network automation, platform engineering, and infrastructure
            roles in hyperscaler / cloud / networking teams. Australia or remote.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <MagneticButton href="mailto:tommy.mao@outlook.com" variant="primary">
              <Mail size={16} strokeWidth={2.25} /> tommy.mao@outlook.com
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/tommymaoau"
              external
              ariaLabel="LinkedIn"
            >
              <LinkedInIcon /> LinkedIn <ArrowUpRight size={14} strokeWidth={2.25} />
            </MagneticButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.22}>
          <div
            style={{
              marginTop: 64,
              paddingTop: 28,
              borderTop: '1px solid var(--hair)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: 11,
              color: 'var(--dim-2)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>© 2026 Tommy Mao</span>
            <span>Melbourne, AU · GMT+11</span>
            <span>self-hosted · no SaaS</span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
