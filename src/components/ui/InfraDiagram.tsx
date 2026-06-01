'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * InfraDiagram — animated topology visual for the Hero.
 *
 * Logical flow (left → right):
 *   Internet → Cloudflare → Home Server → [Docker · K8s · GitLab · VPN · Monitor · AI · ContainerLab]
 *
 * Pure SVG + Framer Motion. No 3D libraries — keeps bundle small and mobile-friendly.
 */
export function InfraDiagram() {
  const reduced = useReducedMotion()

  const dashAnim = reduced
    ? {}
    : { strokeDashoffset: [0, -32], transition: { duration: 2.6, ease: 'linear', repeat: Infinity } }
  const pulseAnim = reduced
    ? {}
    : { opacity: [0.5, 1, 0.5], transition: { duration: 2.4, ease: 'easeInOut', repeat: Infinity } }

  // Coordinates (in 640×520 viewBox)
  const internet = { x: 60,  y: 90,  label: 'Internet'    }
  const cloud    = { x: 220, y: 90,  label: 'Cloudflare'  }
  const server   = { x: 380, y: 260, label: 'Home Server' }
  const services = [
    { x: 560, y: 80,   label: 'Docker'       },
    { x: 560, y: 150,  label: 'Kubernetes'   },
    { x: 560, y: 220,  label: 'GitLab'       },
    { x: 560, y: 290,  label: 'VPN'          },
    { x: 560, y: 360,  label: 'Monitoring'   },
    { x: 560, y: 430,  label: 'AI Services'  },
    { x: 560, y: 500,  label: 'ContainerLab' },
  ]

  return (
    <svg
      viewBox="0 0 640 560"
      role="img"
      aria-label="Home lab infrastructure topology: Internet to Cloudflare to Home Server to container services"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(58% 0.12 145)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="oklch(78% 0.13 145)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="oklch(58% 0.12 145)" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="node-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="oklch(78% 0.13 145)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="oklch(78% 0.13 145)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background grid (subtle) */}
      <g opacity="0.08" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" x2="640" y1={i * 70} y2={i * 70} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 70} x2={i * 70} y1="0" y2="560" />
        ))}
      </g>

      {/* Edges */}
      <g fill="none" strokeWidth="1.4" strokeLinecap="round">
        {/* internet -> cloud */}
        <motion.line
          x1={internet.x} y1={internet.y}
          x2={cloud.x}    y2={cloud.y}
          stroke="url(#line-grad)"
          strokeDasharray="6 8"
          animate={dashAnim}
        />
        {/* cloud -> server */}
        <motion.line
          x1={cloud.x}   y1={cloud.y}
          x2={server.x}  y2={server.y}
          stroke="url(#line-grad)"
          strokeDasharray="6 8"
          animate={dashAnim}
        />
        {/* server -> each service */}
        {services.map((s, i) => (
          <motion.line
            key={s.label}
            x1={server.x} y1={server.y}
            x2={s.x}      y2={s.y}
            stroke="url(#line-grad)"
            strokeDasharray="4 7"
            animate={reduced ? {} : {
              strokeDashoffset: [0, -22],
              transition: { duration: 2.2 + i * 0.15, ease: 'linear', repeat: Infinity },
            }}
          />
        ))}
      </g>

      {/* Nodes */}
      {[internet, cloud, server, ...services].map((n) => (
        <g key={n.label}>
          <motion.circle
            cx={n.x} cy={n.y} r={26}
            fill="url(#node-glow)"
            animate={pulseAnim}
          />
          <circle
            cx={n.x} cy={n.y} r={8}
            fill="var(--bg-2)"
            stroke="oklch(78% 0.13 145)"
            strokeWidth="1.5"
          />
          <circle
            cx={n.x} cy={n.y} r={3}
            fill="oklch(78% 0.13 145)"
          />
          <text
            x={n.x}
            y={n.y + 26}
            textAnchor="middle"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
            fontSize="10"
            letterSpacing="0.08em"
            fill="var(--ink-2)"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Stamp */}
      <text
        x="640" y="22"
        textAnchor="end"
        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
        fontSize="9"
        fill="var(--dim-2)"
        letterSpacing="0.16em"
      >
        TOPOLOGY · mel-01
      </text>
    </svg>
  )
}
