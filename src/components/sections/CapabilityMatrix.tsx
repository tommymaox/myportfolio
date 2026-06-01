'use client'

import { useState } from 'react'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

interface SkillGroup {
  kicker: string
  title: string
  summary: string
  rows: string[]
  trailing?: string  // optional pill (e.g. CCNA chip on Networking)
}

const GROUPS: SkillGroup[] = [
  {
    kicker: 'net / protocols',
    title: 'Networking',
    summary: 'BGP · OSPF · IS-IS · MPLS · DHCP · DNS · QoS · SNMP · Leaf-Spine',
    rows: ['BGP', 'OSPF', 'IS-IS', 'MPLS', 'IPSec', 'TCP/IP', 'DHCP', 'DNS', 'QoS', 'SNMP', 'Leaf-Spine'],
  },
  {
    kicker: 'hw / vendors',
    title: 'Platforms',
    summary: 'Cisco · Nokia · Arista · Palo Alto · Ericsson · Cloudflare · AWS',
    rows: [
      'Cisco IOS XR',
      'Nokia SR Linux',
      'Arista EOS',
      'Palo Alto PAN',
      'Ericsson RAN / Microwave / Radio / Routers',
      'Cloudflare Zerotrust',
      'Unifi',
      'AWS EC2',
      'AWS S3',
    ],
  },
  {
    kicker: 'lang / core',
    title: 'Core Engineering',
    summary: 'Python · Bash/Shell · SQL · JavaScript · React · YAML · Git',
    rows: ['Python', 'Bash/Shell', 'SQL', 'JavaScript', 'React', 'YAML', 'Git'],
  },
  {
    kicker: 'sys / runtime',
    title: 'Infrastructure & Runtime',
    summary: 'Linux · Docker · nginx · FastAPI · SQLite',
    rows: ['Linux', 'Docker', 'nginx', 'FastAPI', 'SQLite'],
  },
  {
    kicker: 'ai / systems',
    title: 'AI Systems',
    summary: 'Claude · ChatGPT · multi-agent · RAG · Nano Banana · Kling',
    rows: [
      'Claude API',
      'ChatGPT API',
      'Local LLaMA',
      'multi-agent',
      'tool-use',
      'RAG',
      'Cowork Agent',
      'OpenClaw',
      'Nano Banana',
      'Kling 3.0',
      'Playwright',
    ],
  },
]

export function CapabilityMatrix() {
  // Default: all open
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(GROUPS.map((_, i) => i))
  )

  const toggle = (i: number) => {
    setOpenSet(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  }

  return (
    <section id="skills" style={{ padding: '40px 0 20px' }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap',
        paddingBottom: 22, borderBottom: '1px solid var(--hair)', marginBottom: 32,
        maxWidth: 1180, marginLeft: 'auto', marginRight: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span className="section-label" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--dim)' }}>
            Skills
          </span>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            lineHeight: 1, letterSpacing: '-0.022em',
            margin: 0, fontWeight: 400,
          }}>
            Engineering stack<em style={{ fontStyle: 'italic', color: 'var(--ink-2)' }}>.</em>
          </h2>
        </div>
        <span style={{
          fontFamily: 'var(--font-geist-mono)', fontSize: 11,
          color: 'var(--dim-2)', letterSpacing: '0.02em',
        }}>
          {GROUPS.length} categories
        </span>
      </div>

      <RevealWrapper>
        <div className="skill-stack" style={{
          maxWidth: 1180, margin: '0 auto',
          border: '1px solid var(--hair)',
          borderRadius: 14,
          background: 'var(--surface)',
          overflow: 'hidden',
        }}>
          {GROUPS.map((g, i) => {
            const isOpen = openSet.has(i)
            return (
              <div
                key={g.kicker}
                style={{
                  borderTop: i === 0 ? 'none' : '1px solid var(--hair)',
                }}
              >
                {/* Header — clickable row */}
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="skill-row"
                  style={{
                    width: '100%',
                    background: 'transparent', border: 'none',
                    padding: '18px 28px 14px',
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr 14px',
                    gap: 24,
                    alignItems: 'baseline',
                    cursor: 'pointer', textAlign: 'left',
                    color: 'inherit',
                    transition: 'background .2s ease',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-geist-mono)', fontSize: 10,
                    color: 'var(--dim-2)', letterSpacing: '0.04em',
                  }}>
                    {g.kicker}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-instrument-serif)',
                      fontSize: 20, letterSpacing: '-0.018em',
                      color: 'var(--ink)', lineHeight: 1.1,
                    }}>
                      {g.title}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-geist-mono)', fontSize: 11,
                      color: 'var(--dim-2)',
                      opacity: isOpen ? 0 : 1,
                      transition: 'opacity .25s ease',
                    }}>
                      {g.summary}
                    </span>
                  </div>

                  <span aria-hidden style={{
                    display: 'inline-block',
                    fontSize: 9, color: 'var(--dim-2)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform .3s cubic-bezier(.22,1,.36,1)',
                    justifySelf: 'end',
                  }}>
                    ▾
                  </span>
                </button>

                {/* Body — animated expand */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows .35s cubic-bezier(.22,1,.36,1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{
                      padding: '0 28px 22px',
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr',
                      gap: '0 24px',
                    }}>
                      <span /* spacer */ />
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {g.rows.map(name => (
                          <span key={name} className="skill-tag">
                            {name}
                          </span>
                        ))}

                        {g.trailing && (
                          <span style={{
                            marginLeft: 6,
                            display: 'inline-flex', alignItems: 'center',
                            padding: '4px 10px', borderRadius: 20,
                            border: '1px solid rgba(100,255,160,0.26)',
                            background: 'rgba(100,255,160,0.05)',
                            fontFamily: 'var(--font-geist-mono)', fontSize: 10.5,
                            color: 'var(--accent)', letterSpacing: '0.04em',
                          }}>
                            {g.trailing}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </RevealWrapper>

      <style jsx>{`
        .skill-row:hover {
          background: rgba(255,255,255,0.012);
        }
        :global(.skill-tag) {
          padding: 5px 11px;
          border-radius: 6px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          font-family: var(--font-geist-mono);
          font-size: 11.5px;
          color: var(--ink-2);
          letter-spacing: 0.005em;
          transition: color .2s ease, border-color .2s ease, background .2s ease;
        }
        :global(.skill-tag:hover) {
          color: var(--ink);
          border-color: rgba(100,255,160,0.22);
          background: rgba(100,255,160,0.04);
        }
        @media (max-width: 720px) {
          .skill-row {
            grid-template-columns: 1fr 14px !important;
            gap: 12px !important;
            padding: 16px 18px 12px !important;
          }
          .skill-row > :first-child {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
