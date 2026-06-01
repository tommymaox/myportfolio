'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Cloud, Server, Container, Network, Shield, Activity, Sparkles, Boxes } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

interface Node {
  id: string
  label: string
  sub: string
  icon: typeof Cloud
  col: number
  row: number
}

const NODES: Node[] = [
  { id: 'internet', label: 'Internet',           sub: 'public',          icon: Cloud,    col: 0, row: 1 },
  { id: 'cf',       label: 'Cloudflare',         sub: 'Zero Trust · 3 tunnels', icon: Shield, col: 1, row: 1 },
  { id: 'host',     label: 'mel-01 · Ubuntu',    sub: 'Docker host',     icon: Server,   col: 2, row: 1 },
  { id: 'docker',   label: 'Docker',             sub: '15 containers',   icon: Container, col: 3, row: 0 },
  { id: 'k8s',      label: 'ContainerLab',       sub: 'multi-vendor',    icon: Boxes,    col: 3, row: 1 },
  { id: 'gitlab',   label: 'GitLab',             sub: 'CI/CD',           icon: Network,  col: 3, row: 2 },
  { id: 'vpn',      label: 'VPN · Unifi',        sub: 'VLAN IoT',        icon: Shield,   col: 3, row: 3 },
  { id: 'monitor',  label: 'Monitoring',         sub: 'health · backup', icon: Activity, col: 3, row: 4 },
  { id: 'ai',       label: 'AI Services',        sub: 'Claude · LLaMA',  icon: Sparkles, col: 3, row: 5 },
]

const EDGES: [string, string][] = [
  ['internet', 'cf'],
  ['cf', 'host'],
  ['host', 'docker'],
  ['host', 'k8s'],
  ['host', 'gitlab'],
  ['host', 'vpn'],
  ['host', 'monitor'],
  ['host', 'ai'],
]

// SVG layout — width grows with columns, height with max-row
const COL_X = [60, 220, 410, 640]
const ROW_Y = [60, 150, 240, 330, 420, 510]
const SVG_W = 780
const SVG_H = 580

export function HomeLabSection() {
  const reduced = useReducedMotion()
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]))

  return (
    <section
      id="homelab"
      className="section-rounded"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 9vw, 120px) 0',
        background: 'var(--bg)',
        overflow: 'hidden',
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
          <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)', maxWidth: 760 }}>
            <div className="uppercase-label" style={{ marginBottom: 14 }}>
              · Home Lab
            </div>
            <h2
              className="display-heading-md gradient-heading-accent"
              style={{ margin: 0, marginBottom: 16 }}
            >
              The lab that runs me.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-kanit), sans-serif',
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                color: 'var(--ink-2)',
                margin: 0,
                lineHeight: 1.55,
                fontWeight: 400,
              }}
            >
              A single Ubuntu host behind Cloudflare Zero Trust, running 15
              always-on containers, ContainerLab topologies, and the AI services
              that power this site. Real-world infrastructure I run daily —
              proof that I build, not just describe.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div
            className="glow-card"
            style={{
              padding: 'clamp(20px, 2.4vw, 36px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Header strip */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 11,
                color: 'var(--dim)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 18,
                paddingBottom: 14,
                borderBottom: '1px solid var(--hair)',
              }}
            >
              <span>mel-01 · ubuntu 24.04 · always on</span>
              <span style={{ color: 'var(--accent)' }}>● 15 / 15 healthy</span>
            </div>

            {/* SVG diagram */}
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              role="img"
              aria-label="Home lab architecture diagram"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <defs>
                <linearGradient id="lab-edge" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"  stopColor="oklch(58% 0.12 145)" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="oklch(78% 0.13 145)" stopOpacity="1" />
                  <stop offset="100%" stopColor="oklch(58% 0.12 145)" stopOpacity="0.15" />
                </linearGradient>
                <radialGradient id="lab-glow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="oklch(78% 0.13 145)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="oklch(78% 0.13 145)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background grid */}
              <g opacity="0.06" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`hh${i}`} x1="0" x2={SVG_W} y1={i * 60} y2={i * 60} />
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={`vv${i}`} x1={i * 60} x2={i * 60} y1="0" y2={SVG_H} />
                ))}
              </g>

              {/* Edges */}
              <g fill="none" strokeWidth="1.4" strokeLinecap="round">
                {EDGES.map(([a, b], i) => {
                  const A = byId[a]!
                  const B = byId[b]!
                  const x1 = COL_X[A.col]!
                  const y1 = ROW_Y[A.row]!
                  const x2 = COL_X[B.col]!
                  const y2 = ROW_Y[B.row]!
                  return (
                    <motion.path
                      key={`${a}-${b}`}
                      d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
                      stroke="url(#lab-edge)"
                      strokeDasharray="5 8"
                      animate={
                        reduced
                          ? {}
                          : {
                              strokeDashoffset: [0, -26],
                              transition: { duration: 2 + i * 0.12, ease: 'linear', repeat: Infinity },
                            }
                      }
                    />
                  )
                })}
              </g>

              {/* Nodes */}
              {NODES.map((n) => {
                const cx = COL_X[n.col]!
                const cy = ROW_Y[n.row]!
                const isHub = n.id === 'host'
                return (
                  <g key={n.id}>
                    <motion.circle
                      cx={cx}
                      cy={cy}
                      r={isHub ? 36 : 26}
                      fill="url(#lab-glow)"
                      animate={
                        reduced
                          ? {}
                          : {
                              opacity: [0.5, 1, 0.5],
                              transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
                            }
                      }
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHub ? 14 : 11}
                      fill="var(--bg-2)"
                      stroke="oklch(78% 0.13 145)"
                      strokeWidth={isHub ? 1.8 : 1.4}
                    />
                    <text
                      x={cx}
                      y={cy + (isHub ? 32 : 26)}
                      textAnchor="middle"
                      fontFamily="var(--font-kanit), sans-serif"
                      fontWeight={600}
                      fontSize="12"
                      fill="var(--ink)"
                      letterSpacing="-0.01em"
                    >
                      {n.label}
                    </text>
                    <text
                      x={cx}
                      y={cy + (isHub ? 48 : 40)}
                      textAnchor="middle"
                      fontFamily="var(--font-geist-mono), monospace"
                      fontSize="10"
                      fill="var(--dim)"
                      letterSpacing="0.04em"
                    >
                      {n.sub}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Stack chips below diagram */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 22,
                borderTop: '1px solid var(--hair)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 14,
              }}
            >
              {[
                { Icon: Server,    label: 'Server',    val: 'Ubuntu 24.04 · Docker' },
                { Icon: Shield,    label: 'Edge',      val: 'Cloudflare Zero Trust' },
                { Icon: Network,   label: 'Network',   val: 'Unifi · VLAN IoT' },
                { Icon: Container, label: 'Lab',       val: 'ContainerLab · cEOS / SR Linux' },
                { Icon: Activity,  label: 'Backup',    val: 'AWS S3 nightly' },
                { Icon: Sparkles,  label: 'AI',        val: 'Claude · Local LLaMA' },
              ].map(({ Icon, label, val }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    padding: '12px 14px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--hair)',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: 'rgba(120,220,170,0.08)',
                      color: 'var(--accent)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="uppercase-label" style={{ fontSize: 10 }}>{label}</div>
                    <div
                      style={{
                        fontFamily: 'var(--font-kanit), sans-serif',
                        fontWeight: 500,
                        fontSize: 13,
                        color: 'var(--ink)',
                        marginTop: 2,
                      }}
                    >
                      {val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
