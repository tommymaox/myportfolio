'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, type Project } from '@/data/projects'
import { FadeIn } from '@/components/ui/FadeIn'

export function ProjectsSection() {
  // Top 5 case-study projects for the sticky stack — rest tucked into "More" below
  const featured = PROJECTS.slice(0, 5)

  return (
    <section
      id="projects"
      className="section-rounded"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 9vw, 120px) 0 clamp(56px, 7vw, 96px)',
        background: 'var(--bg)',
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
        }}
      >
        {/* Section header */}
        <FadeIn>
          <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <div className="uppercase-label" style={{ marginBottom: 14 }}>
              · Projects
            </div>
            <h2
              className="display-heading-md gradient-heading-accent"
              style={{ margin: 0, marginBottom: 14 }}
            >
              Engineering case&nbsp;studies.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-kanit), sans-serif',
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                color: 'var(--ink-2)',
                margin: 0,
                maxWidth: 640,
                fontWeight: 400,
              }}
            >
              Each system was shipped to production or runs daily in my home lab.
              Problem → what I built → tech → impact.
            </p>
          </div>
        </FadeIn>

        {/* Sticky stacked cards */}
        <div style={{ position: 'relative' }}>
          {featured.map((p, i) => (
            <StickyProjectCard
              key={p.id}
              project={p}
              index={i}
              total={featured.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StickyProjectCard({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Cards beneath shrink+fade as next card slides over
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.5])

  // Flatten desc to "What I built" bullets
  const builtBullets = project.desc[0]?.lines ?? []
  const extraBlock = project.desc[1]
  const impactBlock = project.desc.find((d) => d.highlight)

  // Stagger sticky top so cards stack
  const stickyTop = 88 + index * 14

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: stickyTop,
        marginBottom: index === total - 1 ? 0 : 24,
        zIndex: index + 1,
      }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="glow-card"
      >
        <div
          style={{
            padding: 'clamp(24px, 3vw, 44px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            gap: 'clamp(28px, 3vw, 48px)',
          }}
          className="proj-card-grid"
        >
          {/* Left: copy */}
          <div>
            {/* Header row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: 10.5,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--dim-2)',
                }}
              >
                {project.id} · {project.code.replace('// ', '')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: 10.5,
                  letterSpacing: '0.08em',
                  color: 'var(--accent)',
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: 'rgba(120,220,170,0.08)',
                  border: '1px solid rgba(120,220,170,0.18)',
                }}
              >
                ● {project.status}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-kanit), sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                margin: 0,
                marginBottom: 18,
                color: 'var(--ink)',
              }}
            >
              {project.title}
            </h3>

            {/* What I built */}
            {builtBullets.length > 0 && (
              <Block label="What I built">
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'grid',
                    gap: 10,
                  }}
                >
                  {builtBullets.map((line, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                        color: 'var(--ink-2)',
                        fontSize: 14.5,
                        lineHeight: 1.55,
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: 7 }}>
                        <Dot />
                      </span>
                      <span>
                        {line.label && (
                          <span
                            style={{
                              fontFamily: 'var(--font-geist-mono), monospace',
                              fontSize: 11,
                              color: 'var(--dim)',
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              marginRight: 8,
                            }}
                          >
                            {line.label}
                          </span>
                        )}
                        {line.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {extraBlock && !extraBlock.highlight && (
              <Block label={extraBlock.title || 'Process'}>
                <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14.5, lineHeight: 1.55 }}>
                  {extraBlock.lines.map((l) => l.text).join(' ')}
                </p>
              </Block>
            )}

            {/* Impact pill */}
            {(impactBlock || project.metric) && (
              <div
                style={{
                  marginTop: 22,
                  padding: '14px 16px',
                  borderRadius: 14,
                  background:
                    'linear-gradient(90deg, rgba(120,220,170,0.10), rgba(120,220,170,0.02))',
                  border: '1px solid rgba(120,220,170,0.22)',
                }}
              >
                <div className="uppercase-label" style={{ marginBottom: 6, color: 'var(--accent)' }}>
                  Impact
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-kanit), sans-serif',
                    fontWeight: 500,
                    fontSize: 15,
                    color: 'var(--ink)',
                    lineHeight: 1.4,
                  }}
                >
                  {impactBlock?.lines.map((l) => l.text).join(' ') ?? project.metric}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div
              style={{
                marginTop: 22,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: 10.5,
                    color: 'var(--ink-2)',
                    padding: '4px 10px',
                    borderRadius: 999,
                    border: '1px solid var(--hair-2)',
                    background: 'rgba(255,255,255,0.02)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: architecture placeholder */}
          <div
            style={{
              borderRadius: 16,
              border: '1px solid var(--hair)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))',
              minHeight: 280,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Mock terminal/header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 14px',
                borderBottom: '1px solid var(--hair)',
                background: 'rgba(0,0,0,0.2)',
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 10.5,
                color: 'var(--dim-2)',
                letterSpacing: '0.08em',
              }}
            >
              <span style={{ width: 8, height: 8, background: 'oklch(69% 0.2 24)', borderRadius: 999 }} />
              <span style={{ width: 8, height: 8, background: 'oklch(79% 0.14 76)', borderRadius: 999 }} />
              <span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: 999 }} />
              <span style={{ marginLeft: 8 }}>{project.stageKey}.architecture</span>
            </div>
            <div
              style={{
                flex: 1,
                display: 'grid',
                placeItems: 'center',
                padding: 24,
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 11,
                color: 'var(--dim)',
                textAlign: 'center',
                background:
                  'radial-gradient(circle at 50% 40%, rgba(120,220,170,0.06), transparent 60%)',
              }}
            >
              <ArchPreview kind={project.stageKey} metric={project.metric} />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .proj-card-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </motion.article>
    </div>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div className="uppercase-label" style={{ marginBottom: 10 }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function Dot() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden>
      <circle cx="3" cy="3" r="2.5" fill="currentColor" />
    </svg>
  )
}

/**
 * Tiny per-project architecture mock — ASCII-art-style block diagrams.
 * Not a full diagram; just a visual anchor so cards aren't empty on the right.
 */
function ArchPreview({ kind, metric }: { kind: string; metric: string }) {
  const PRESETS: Record<string, string[]> = {
    regression: ['YAML playbook', '↓', 'Python runner → ADB', '↓', 'Hardware test', '↓', 'SQLite → Dashboard'],
    alarm:      ['cron 08/13/17', '↓', 'Python poll', '↓', 'Crash-dump parse', '↓', 'Teams webhook'],
    m365:       ['Linux fetch', '↓', 'Graph API → SharePoint', '↓', 'Power Automate · AI Copilot', '↓', 'Teams · Email · ITSM'],
    wiki:       ['Gmail · Slack · Drive · Notion', '↓', 'LLaMA local extract', '↓', 'Claude clean & synthesize', '↓', 'SQLite · 53 pages'],
    jobintel:   ['Playwright · CareerJet', '↓', 'Claude Haiku extract', '↓', 'SQLite · skills index', '↓', 'Market intel'],
    zuyu:       ['FastAPI', '↓', 'SQLite · Vanilla JS', '↓', 'Docker · Cloudflare ZT', '↓', '12+ modules · daily AI brief'],
    homelab:    ['Internet', '↓', 'Cloudflare Zero Trust', '↓', 'Unifi DM · VLAN', '↓', 'mel-01 · 15 containers'],
    isis:       ['ContainerLab', '↓', 'Arista cEOS · 8 nodes', '↓', 'IS-IS · BGP · ECMP', '↓', 'Spine-leaf fabric'],
  }
  const lines = PRESETS[kind] ?? [metric]
  return (
    <div style={{ display: 'grid', gap: 6, fontFamily: 'var(--font-geist-mono), monospace', fontSize: 11.5, color: 'var(--ink-2)' }}>
      {lines.map((l, i) => (
        <div key={i} style={{ color: i % 2 === 1 ? 'var(--accent)' : 'var(--ink-2)' }}>{l}</div>
      ))}
    </div>
  )
}
