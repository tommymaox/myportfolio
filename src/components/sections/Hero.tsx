'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownToLine, Mail, ArrowUpRight } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { InfraDiagram } from '@/components/ui/InfraDiagram'

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        paddingTop: 'clamp(96px, 14vw, 168px)',
        paddingBottom: 'clamp(64px, 8vw, 112px)',
        overflow: 'hidden',
      }}
    >
      {/* Soft radial wash */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(800px 600px at 20% 30%, oklch(78% 0.13 145 / 0.07), transparent 60%), radial-gradient(700px 500px at 85% 70%, rgba(120, 180, 255, 0.05), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1360,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left: copy + CTAs */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 14px',
              borderRadius: 999,
              border: '1px solid var(--hair-2)',
              background: 'rgba(255,255,255,0.02)',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: 11,
              color: 'var(--ink-2)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: 'var(--accent)',
                boxShadow: '0 0 12px var(--accent-glow)',
              }}
            />
            Available · Melbourne, AU
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="display-heading"
            style={{ margin: 0, marginBottom: 18 }}
          >
            <span className="gradient-heading">Tommy</span>{' '}
            <span className="gradient-heading-accent">Mao</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            style={{
              fontFamily: 'var(--font-kanit), sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(16px, 1.6vw, 22px)',
              color: 'var(--ink-2)',
              letterSpacing: '-0.005em',
              marginBottom: 28,
            }}
          >
            Network Automation <span style={{ color: 'var(--dim)' }}>&</span>{' '}
            Infrastructure Engineer
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            style={{
              fontFamily: 'var(--font-kanit), sans-serif',
              fontSize: 'clamp(17px, 1.5vw, 20px)',
              lineHeight: 1.5,
              color: 'var(--ink-2)',
              margin: 0,
              marginBottom: 36,
              maxWidth: 580,
              fontWeight: 400,
            }}
          >
            I build reliable systems where automation, networks, and
            infrastructure meet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects <ArrowUpRight size={16} strokeWidth={2.25} />
            </MagneticButton>
            <MagneticButton href="/Tommy_Mao_Resume.pdf" download>
              <ArrowDownToLine size={16} strokeWidth={2.25} /> Resume
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/tommymaoau"
              external
              ariaLabel="LinkedIn"
            >
              <LinkedInIcon /> LinkedIn
            </MagneticButton>
            <MagneticButton href="mailto:tommy.mao@outlook.com" ariaLabel="Email">
              <Mail size={16} strokeWidth={2.25} /> Email
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: animated infra topology */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          style={{
            position: 'relative',
            padding: 'clamp(16px, 2vw, 28px)',
            borderRadius: 24,
            border: '1px solid var(--hair-2)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
            boxShadow:
              '0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Header strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: 10.5,
              color: 'var(--dim)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 12,
              paddingBottom: 12,
              borderBottom: '1px solid var(--hair)',
            }}
          >
            <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <span style={{ width: 8, height: 8, background: 'oklch(69% 0.2 24)', borderRadius: 999 }} />
              <span style={{ width: 8, height: 8, background: 'oklch(79% 0.14 76)', borderRadius: 999 }} />
              <span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: 999 }} />
            </span>
            <span>infra.live</span>
            <motion.span
              animate={reduced ? {} : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'var(--accent)' }}
            >
              ● online
            </motion.span>
          </div>

          <InfraDiagram />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
