'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Server, Layers, Gauge, Wrench } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

interface Metric {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
  caption: string
  icon: typeof Server
}

const METRICS: Metric[] = [
  { value: 10000, suffix: '+',  label: 'Production Nodes',     caption: 'Telstra distributed network · supported in CI/CD', icon: Server },
  { value: 8,                    label: 'Systems Shipped',     caption: 'CI/CD frameworks · AI pipelines · home lab',       icon: Layers },
  { value: 50,    suffix: '%',  prefix: '−', label: 'Validation Cycle Cut', caption: 'Regression: 2 days → 1 day',                        icon: Gauge },
  { value: 15,                  label: 'Containers In Flight', caption: 'Self-hosted · Docker · Cloudflare Zero Trust',     icon: Wrench },
]

function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString())
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      mv.set(to)
      return
    }
    const controls = animate(mv, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, to, mv, reduced])

  return (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="section-rounded section-alt"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 9vw, 120px) 0',
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
        }}
      >
        <FadeIn>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
              marginBottom: 'clamp(36px, 5vw, 56px)',
            }}
          >
            <div>
              <div className="uppercase-label" style={{ marginBottom: 12 }}>
                · Outcomes
              </div>
              <h2
                className="display-heading-md gradient-heading"
                style={{ margin: 0 }}
              >
                Things I&apos;ve shipped.
              </h2>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 11,
                color: 'var(--dim-2)',
                letterSpacing: '0.08em',
              }}
            >
              measured · not narrated
            </div>
          </div>
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(12px, 1.6vw, 18px)',
          }}
        >
          {METRICS.map((m, i) => {
            const Icon = m.icon
            return (
              <FadeIn key={m.label} delay={i * 0.08}>
                <div
                  className="glow-card"
                  style={{
                    padding: 'clamp(20px, 2.4vw, 28px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* corner glow */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: -50,
                      right: -50,
                      width: 160,
                      height: 160,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, var(--accent-glow), transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--hair)',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--accent)',
                      }}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontSize: 10,
                        color: 'var(--dim-2)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-kanit), sans-serif',
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      fontSize: 'clamp(40px, 5.5vw, 64px)',
                      color: 'var(--ink)',
                      marginTop: 4,
                    }}
                  >
                    <Counter to={m.value} suffix={m.suffix} prefix={m.prefix} />
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-kanit), sans-serif',
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--ink-2)',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: 11.5,
                      color: 'var(--dim)',
                      lineHeight: 1.5,
                      marginTop: 'auto',
                    }}
                  >
                    {m.caption}
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
