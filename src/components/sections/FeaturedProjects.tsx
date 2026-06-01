'use client'

import { Fragment, useState, useEffect, type ComponentType } from 'react'
import {
  PROJECTS, CATEGORIES,
  type StageKey, type Project, type LayoutVariant, type ProjectCategory,
} from '@/data/projects'
import { RegressionStage } from '@/components/stages/RegressionStage'
import { JobIntelStage } from '@/components/stages/JobIntelStage'
import { WikiStage } from '@/components/stages/WikiStage'
import { ZuyuStage } from '@/components/stages/ZuyuStage'
import { ISISLabStage } from '@/components/stages/ISISLabStage'
import { AlarmCheckerStage } from '@/components/stages/AlarmCheckerStage'
import { M365Stage } from '@/components/stages/M365Stage'
import { HomeLabStage } from '@/components/stages/HomeLabStage'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

const STAGE_MAP: Record<StageKey, ComponentType> = {
  regression: RegressionStage,
  jobintel:   JobIntelStage,
  wiki:       WikiStage,
  zuyu:       ZuyuStage,
  isis:       ISISLabStage,
  alarm:      AlarmCheckerStage,
  m365:       M365Stage,
  homelab:    HomeLabStage,
}

const SPLIT_GRID: Record<'split' | 'text-heavy' | 'visual-heavy', string> = {
  'split':        'minmax(0, 1fr) minmax(0, 1fr)',
  'text-heavy':   'minmax(0, 6fr) minmax(0, 5fr)',
  'visual-heavy': 'minmax(0, 5fr) minmax(0, 7fr)',
}

const CONTAINER_MAX = 1180

export function FeaturedProjects() {
  return (
    <section id="projects" style={{ padding: '40px 0 20px' }}>
      {/* Section header — tightened, single row */}
      <div className="proj-section-head" style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap',
        paddingBottom: 22, borderBottom: '1px solid var(--hair)', marginBottom: 56,
        maxWidth: CONTAINER_MAX, marginLeft: 'auto', marginRight: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span className="section-label" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--dim)' }}>
            Projects
          </span>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            lineHeight: 1, letterSpacing: '-0.022em',
            margin: 0, fontWeight: 400,
          }}>
            Selected work<em style={{ fontStyle: 'italic', color: 'var(--ink-2)' }}>.</em>
          </h2>
        </div>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--dim-2)' }}>
          {PROJECTS.length} projects
        </span>
      </div>

      {CATEGORIES.map(cat => (
        <CategoryShowcase
          key={cat.key}
          catKey={cat.key}
          label={cat.label}
          projects={PROJECTS.filter(p => p.category === cat.key)}
        />
      ))}

      <style jsx global>{`
        @keyframes proj-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .proj-container {
          max-width: ${CONTAINER_MAX}px;
          margin-left: auto;
          margin-right: auto;
        }
        .proj-narrative {
          color: var(--ink-2);
          font-size: 14.5px;
          line-height: 1.65;
        }
        @media (max-width: 980px) {
          .proj-body-split {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }
          .proj-body-split .proj-narr-cell {
            border-right: none !important;
            border-bottom: 1px solid var(--hair);
          }
          .proj-body-split .proj-stage-cell {
            min-height: 460px;
          }
        }
        @media (max-width: 640px) {
          .proj-narr-cell, .proj-compact-wrap {
            padding: 22px 18px !important;
          }
          .proj-stacked-narr {
            padding: 22px 18px !important;
          }
          .proj-desc-grid {
            grid-template-columns: 1fr !important;
            row-gap: 2px !important;
          }
          .proj-desc-grid .proj-desc-label {
            font-size: 9.5px !important;
            color: var(--accent) !important;
            padding-top: 8px !important;
          }
          /* Segmented horizontal scroll — no wrap, smooth touch flow */
          .proj-tabs {
            overflow-x: auto;
            flex-wrap: nowrap !important;
            padding-bottom: 2px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            margin-left: -4px;
            margin-right: -4px;
          }
          .proj-tabs::-webkit-scrollbar { height: 0; display: none; }
          .proj-tabs button {
            scroll-snap-align: start;
            padding: 11px 14px !important;
            font-size: 11.5px !important;
          }
          /* Card meta header gets tighter and stacks if needed */
          article > header {
            padding: 12px 18px !important;
            font-size: 10.5px !important;
          }
          /* Stage stays usable but less tall on mobile */
          .proj-body-split .proj-stage-cell {
            min-height: 360px !important;
          }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function CategoryShowcase({
  catKey, label, projects,
}: {
  catKey: ProjectCategory
  label: string
  projects: Project[]
}) {
  const [projIdx, setProjIdx] = useState(0)
  const project = projects[projIdx] ?? projects[0]

  useEffect(() => {
    const syncFromHash = () => {
      if (typeof window === 'undefined') return
      const hash = window.location.hash.replace('#', '').toUpperCase()
      if (!hash) return
      const matchIdx = projects.findIndex(p => p.id.toUpperCase() === hash)
      if (matchIdx >= 0) setProjIdx(matchIdx)
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [projects])

  return (
    <div id={`cat-${catKey}`} className="proj-container" style={{ marginBottom: 72, scrollMarginTop: 80 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16,
      }}>
        <h3 style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: 'clamp(20px, 2vw, 26px)', letterSpacing: '-0.018em',
          margin: 0, fontWeight: 400, lineHeight: 1.1,
          color: 'var(--ink)',
        }}>
          {label}
        </h3>
        <span style={{
          fontFamily: 'var(--font-geist-mono)', fontSize: 10.5,
          color: 'var(--dim-2)', letterSpacing: '0.06em',
        }}>
          {projects.length}
        </span>
      </div>

      <div className="proj-tabs" role="tablist" aria-label={`${label} projects`} style={{
        display: 'flex', gap: 0, marginBottom: 22, flexWrap: 'wrap',
        borderBottom: '1px solid var(--hair)',
      }}>
        {projects.map((p, i) => {
          const isActive = i === projIdx
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setProjIdx(i)}
              style={{
                fontFamily: 'var(--font-geist-mono)', fontSize: 12,
                padding: '12px 16px', marginBottom: -1,
                border: 'none',
                background: 'transparent',
                color: isActive ? 'var(--ink)' : 'var(--dim)',
                borderBottom: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'color .2s ease, border-color .25s ease',
                letterSpacing: '0.005em',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--ink-2)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--dim)' }}
            >
              {p.title}
            </button>
          )
        })}
      </div>

      <RevealWrapper>
        <ProjectCard key={`${label}-${projIdx}`} project={project} />
      </RevealWrapper>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const Stage = STAGE_MAP[project.stageKey]
  const layout: LayoutVariant = project.layout ?? 'split'
  const cardMaxWidth = layout === 'compact' ? 920 : CONTAINER_MAX

  return (
    <article
      style={{
        border: '1px solid var(--hair)',
        borderRadius: 14,
        background: 'var(--surface)',
        overflow: 'hidden',
        animation: 'proj-fade-in .35s ease',
        maxWidth: cardMaxWidth,
        marginLeft: 'auto', marginRight: 'auto',
      }}
    >
      {/* Top meta bar — just metric + status, nothing more */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 28px', borderBottom: '1px solid var(--hair)',
        flexWrap: 'wrap', gap: 14,
        fontFamily: 'var(--font-geist-mono)', fontSize: 11,
      }}>
        <span style={{ color: 'var(--ink-2)' }}>{project.metric}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--dim)' }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'var(--accent)', opacity: 0.85,
          }} />
          {project.status}
        </span>
      </header>

      {layout === 'stacked'  && <StackedBody  project={project} Stage={Stage} />}
      {layout === 'compact'  && <CompactBody  project={project} Stage={Stage} />}
      {(layout === 'split' || layout === 'text-heavy' || layout === 'visual-heavy') && (
        <SplitBody project={project} Stage={Stage} variant={layout} />
      )}
    </article>
  )
}

// ── Body variants ────────────────────────────────────────────────────────────

function StackedBody({ project, Stage }: { project: Project; Stage: ComponentType }) {
  const height = project.stageHeight ?? 580
  const textMax = project.textMaxWidth ?? 780
  return (
    <>
      <div className="proj-stacked-narr" style={{ padding: '32px 36px 24px' }}>
        <Narrative project={project} maxWidth={textMax} />
      </div>
      <div style={{
        borderTop: '1px solid var(--hair)',
        background: 'var(--bg-2)',
        minHeight: height,
        position: 'relative',
      }}>
        <Stage />
      </div>
    </>
  )
}

function SplitBody({
  project, Stage, variant,
}: {
  project: Project
  Stage: ComponentType
  variant: 'split' | 'text-heavy' | 'visual-heavy'
}) {
  const height  = project.stageHeight ?? 480
  const textMax = project.textMaxWidth ?? (variant === 'text-heavy' ? 600 : 520)
  return (
    <div className="proj-body-split" style={{
      display: 'grid',
      gridTemplateColumns: SPLIT_GRID[variant],
      minHeight: height,
    }}>
      <div className="proj-narr-cell" style={{
        padding: '32px 34px',
        borderRight: '1px solid var(--hair)',
        display: 'flex', flexDirection: 'column',
      }}>
        <Narrative project={project} maxWidth={textMax} />
      </div>
      <div className="proj-stage-cell" style={{
        background: 'var(--bg-2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <Stage />
      </div>
    </div>
  )
}

function CompactBody({ project, Stage }: { project: Project; Stage: ComponentType }) {
  const height  = project.stageHeight ?? 360
  const textMax = project.textMaxWidth ?? 660
  return (
    <div className="proj-compact-wrap" style={{ padding: '28px 32px 24px' }}>
      <Narrative project={project} maxWidth={textMax} />
      <div style={{
        marginTop: 22,
        border: '1px solid var(--hair)',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--bg-2)',
        minHeight: height,
      }}>
        <Stage />
      </div>
    </div>
  )
}

// ── Narrative — Overview / Architecture / Impact hierarchy ──────────────────

function Narrative({ project, maxWidth }: { project: Project; maxWidth: number }) {
  // Interpret the existing desc structure:
  //   - First non-highlight, non-titled block  → Overview / Architecture rows
  //   - Blocks with `title`                    → named subsections (e.g. "Deployment process")
  //   - Block with `highlight: true`           → Impact / Outcome
  return (
    <div style={{ maxWidth, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <h4 style={{
        fontFamily: 'var(--font-instrument-serif)',
        fontSize: 'clamp(24px, 2.2vw, 30px)',
        lineHeight: 1.1, letterSpacing: '-0.022em',
        margin: '0 0 18px', fontWeight: 400,
      }}>
        {project.title}
      </h4>

      <div className="proj-narrative">
        {project.desc.map((block, bi) => {
          const anyLabel = block.lines.some(l => l.label)
          return (
            <div
              key={bi}
              style={{
                marginTop: bi === 0 ? 0 : 16,
                ...(block.highlight ? {
                  marginTop: 22,
                  paddingTop: 16,
                  borderTop: '1px solid var(--hair)',
                  color: 'var(--ink)',
                  display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap',
                  fontFamily: 'var(--font-instrument-serif)',
                  fontSize: 16.5, lineHeight: 1.4, letterSpacing: '-0.008em',
                } : {}),
              }}
            >
              {block.highlight && (
                <span style={{
                  fontFamily: 'var(--font-geist-mono)', fontSize: 10,
                  color: 'var(--accent)', letterSpacing: '0.1em',
                  textTransform: 'uppercase', flexShrink: 0,
                }}>
                  Impact
                </span>
              )}
              {block.title && (
                <div style={{
                  fontFamily: 'var(--font-geist-mono)', fontSize: 10,
                  color: 'var(--dim)', letterSpacing: '0.1em',
                  textTransform: 'uppercase', marginBottom: 8,
                }}>
                  {block.title}
                </div>
              )}
              {block.highlight ? (
                <span>{block.lines[0]?.text}</span>
              ) : anyLabel ? (
                <div className="proj-desc-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: '84px 1fr',
                  columnGap: 14, rowGap: 4,
                  alignItems: 'baseline',
                }}>
                  {block.lines.map((line, li) => {
                    const prev = li > 0 ? block.lines[li - 1].label : undefined
                    const showLabel = line.label && line.label !== prev
                    if (!line.label) {
                      return (
                        <div key={li} style={{
                          gridColumn: '1 / -1',
                          color: 'var(--ink-2)',
                          marginBottom: li === block.lines.length - 1 ? 0 : 4,
                        }}>
                          {line.text}
                        </div>
                      )
                    }
                    return (
                      <Fragment key={li}>
                        <div className="proj-desc-label" style={{
                          fontFamily: 'var(--font-geist-mono)', fontSize: 10,
                          color: 'var(--dim)', letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          paddingTop: 3,
                        }}>
                          {showLabel ? line.label : ''}
                        </div>
                        <div>{line.text}</div>
                      </Fragment>
                    )
                  })}
                </div>
              ) : (
                block.lines.map((line, li) => (
                  <div key={li} style={{ marginBottom: li === block.lines.length - 1 ? 0 : 4 }}>
                    {line.text}
                  </div>
                ))
              )}
            </div>
          )
        })}
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px 10px',
        marginTop: 'auto', paddingTop: 22,
        fontFamily: 'var(--font-geist-mono)', fontSize: 10.5,
        color: 'var(--dim-2)',
      }}>
        {project.tags.map((t, i) => (
          <span key={t}>
            {t}{i < project.tags.length - 1 && <span style={{ color: 'rgba(255,255,255,0.06)', marginLeft: 10 }}>·</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
