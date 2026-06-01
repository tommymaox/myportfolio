'use client'

// ── Calm, muted palette — aligns with the rest of the site, no neon ─────────
const C = {
  isis:        'rgba(150,210,180,0.55)',   // muted teal-green
  isisDim:     'rgba(150,210,180,0.16)',
  ibgp:        'rgba(160,185,225,0.55)',   // muted blue
  ibgpDim:     'rgba(160,185,225,0.18)',
  ebgp:        'rgba(220,180,130,0.55)',   // muted amber
  ebgpDim:     'rgba(220,180,130,0.16)',
  nodeStroke:  'rgba(255,255,255,0.16)',
  nodeFill:    'rgba(255,255,255,0.02)',
  nodeText:    '#D5D5D0',
  subText:     'rgba(255,255,255,0.4)',
}

const META = '10 nodes  ·  IS-IS underlay  ·  iBGP overlay  ·  eBGP fabric'

const TOPOLOGY = [
  '4-node backbone in AS 65000',
  'IS-IS L2 partial mesh underlay',
  'iBGP overlay with redundant route reflectors',
  'eBGP edge into spine-leaf fabric',
  'ECMP paths across both spines',
]

const PROTOCOLS = ['IS-IS', 'iBGP', 'eBGP', 'ECMP']

const ARCH =
  'R1 and R3 act as redundant route reflectors. R3 and R4 connect the backbone into an eBGP-only spine-leaf fabric, simulating modern datacenter edge design.'

const GOALS =
  'Validate convergence, failover behaviour, route propagation, and ECMP forwarding in a controlled lab environment.'

export function ISISLabStage() {
  return (
    <div style={{
      height: '100%',
      display: 'flex', flexDirection: 'column',
      padding: '24px 28px 22px',
      gap: 22,
    }}>

      {/* 1 — Metadata row */}
      <div style={{
        fontFamily: 'var(--font-geist-mono)', fontSize: 10.5,
        color: 'var(--dim)', letterSpacing: '0.04em',
      }}>
        {META}
      </div>

      {/* 2 — Two-column overview cards (2×2) */}
      <div className="isis-cards" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      }}>
        <Card label="Topology Overview">
          <ul style={{
            margin: 0, padding: 0, listStyle: 'none',
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            {TOPOLOGY.map((line, i) => (
              <li key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                color: 'var(--ink-2)', fontSize: 12.5, lineHeight: 1.5,
              }}>
                <span style={{
                  color: 'var(--dim-2)', fontFamily: 'var(--font-geist-mono)',
                  fontSize: 11, marginTop: 1, flexShrink: 0,
                }}>·</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card label="Protocols">
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 6,
          }}>
            {PROTOCOLS.map(p => (
              <span key={p} style={{
                fontFamily: 'var(--font-geist-mono)', fontSize: 11.5,
                color: 'var(--ink-2)',
                padding: '5px 10px',
                border: '1px solid var(--hair)',
                borderRadius: 6,
                background: 'rgba(255,255,255,0.022)',
              }}>
                {p}
              </span>
            ))}
          </div>
        </Card>

        <Card label="Architecture">
          <p style={{
            margin: 0, color: 'var(--ink-2)',
            fontSize: 12.5, lineHeight: 1.55,
          }}>
            {ARCH}
          </p>
        </Card>

        <Card label="Goals">
          <p style={{
            margin: 0, color: 'var(--ink-2)',
            fontSize: 12.5, lineHeight: 1.55,
          }}>
            {GOALS}
          </p>
        </Card>
      </div>

      {/* 3 — Topology diagram (the hero) */}
      <div style={{
        flex: 1,
        border: '1px solid var(--hair)',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.012)',
        padding: '20px 24px',
        display: 'flex', flexDirection: 'column',
      }}>
        <Topology />
      </div>

      <style jsx>{`
        @media (max-width: 720px) {
          :global(.isis-cards) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

// ── Card primitive ─────────────────────────────────────────────────────────
function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: '1px solid var(--hair)',
      borderRadius: 10,
      padding: '16px 18px',
      background: 'rgba(255,255,255,0.012)',
      transition: 'border-color .25s ease, background .25s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.022)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--hair)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.012)'
      }}
    >
      <div style={{
        fontFamily: 'var(--font-geist-mono)', fontSize: 9.5,
        color: 'var(--dim)', letterSpacing: '0.14em',
        textTransform: 'uppercase', marginBottom: 12,
      }}>
        {label}
      </div>
      {children}
    </div>
  )
}

// ── Topology diagram — organic clustered layout (Containerlab-style) ──────
function Topology() {
  return (
    <svg viewBox="0 0 880 400" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="isis-flow-isis" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0"   stopColor="rgba(150,210,180,0)" />
          <stop offset="0.5" stopColor="rgba(150,210,180,0.7)" />
          <stop offset="1"   stopColor="rgba(150,210,180,0)" />
        </linearGradient>
        <linearGradient id="isis-flow-ebgp" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0"   stopColor="rgba(220,180,130,0)" />
          <stop offset="0.5" stopColor="rgba(220,180,130,0.7)" />
          <stop offset="1"   stopColor="rgba(220,180,130,0)" />
        </linearGradient>
      </defs>

      {/* ── Region containers (hairline only) ── */}
      <rect x="32" y="32" width="420" height="336" rx="14"
        fill="none" stroke={C.isisDim} strokeWidth="1" />
      <text x="48" y="52" fontFamily="ui-monospace,monospace" fontSize="9"
        fill="var(--dim)" letterSpacing="0.18em">BACKBONE</text>

      <rect x="500" y="32" width="348" height="336" rx="14"
        fill="none" stroke={C.ebgpDim} strokeWidth="1" />
      <text x="516" y="52" fontFamily="ui-monospace,monospace" fontSize="9"
        fill="var(--dim)" letterSpacing="0.18em">DC FABRIC</text>

      {/* ─── BACKBONE IS-IS LINKS (organic placement) ─── */}
      {/* r1 (90,200), r2 (220,100), r4 (340,100), r3 (240,290) */}

      {/* r1 ↔ r2 */}
      <path d="M108,188 L204,112" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M108,188 L204,112" stroke="url(#isis-flow-isis)" strokeWidth="1.3" className="flow" style={{ animationDuration: '4.5s', animationDelay: '0s' }} fill="none" />

      {/* r2 ↔ r4 */}
      <path d="M242,100 L318,100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M242,100 L318,100" stroke="url(#isis-flow-isis)" strokeWidth="1.3" className="flow" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }} fill="none" />

      {/* r2 ↔ r3 (vertical-ish) */}
      <path d="M222,122 L238,268" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M222,122 L238,268" stroke="url(#isis-flow-isis)" strokeWidth="1.3" className="flow" style={{ animationDuration: '4.5s', animationDelay: '1s' }} fill="none" />

      {/* r3 ↔ r4 (diagonal) */}
      <path d="M256,272 L332,122" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M256,272 L332,122" stroke="url(#isis-flow-isis)" strokeWidth="1.3" className="flow" style={{ animationDuration: '4.8s', animationDelay: '1.5s' }} fill="none" />

      {/* r1 ↔ r3 */}
      <path d="M104,218 L222,278" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M104,218 L222,278" stroke="url(#isis-flow-isis)" strokeWidth="1.3" className="flow" style={{ animationDuration: '4.5s', animationDelay: '2s' }} fill="none" />

      {/* ─── iBGP overlay (very subtle dashed arcs) ─── */}
      {/* r1 (RR) ↔ r2 (client) */}
      <path d="M100,182 C140,100 180,72 210,84" stroke={C.ibgp} strokeWidth="0.8" strokeDasharray="3 4" fill="none" opacity="0.65" />
      {/* r1 (RR) ↔ r4 (client) — long arc */}
      <path d="M88,194 C70,40 220,40 332,80" stroke={C.ibgp} strokeWidth="0.7" strokeDasharray="3 4" fill="none" opacity="0.5" />
      {/* r3 (RR) ↔ r2 (client) */}
      <path d="M252,272 C290,200 260,140 234,86" stroke={C.ibgp} strokeWidth="0.8" strokeDasharray="3 4" fill="none" opacity="0.65" />
      {/* r3 (RR) ↔ r4 (client) */}
      <path d="M260,278 C320,260 360,180 348,118" stroke={C.ibgp} strokeWidth="0.8" strokeDasharray="3 4" fill="none" opacity="0.65" />
      {/* r1 (RR) ↔ r3 (RR) — RR-to-RR */}
      <path d="M100,220 C160,260 200,290 224,290" stroke={C.ibgp} strokeWidth="0.7" strokeDasharray="2 5" fill="none" opacity="0.4" />

      {/* ─── BORDER eBGP (r3 → spine1, r4 → spine2) ─── */}
      {/* r3 (240,290) → spine1 (590,280) */}
      <path d="M262,290 L568,282" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M262,290 L568,282" stroke="url(#isis-flow-ebgp)" strokeWidth="1.3" className="flow" style={{ animationDuration: '4s', animationDelay: '0.3s' }} fill="none" />

      {/* r4 (340,100) → spine2 (590,100) */}
      <path d="M362,100 L568,100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M362,100 L568,100" stroke="url(#isis-flow-ebgp)" strokeWidth="1.3" className="flow" style={{ animationDuration: '4s', animationDelay: '0.7s' }} fill="none" />

      {/* eBGP labels — sit cleanly between border lines */}
      <text x="412" y="170" fontFamily="ui-monospace,monospace" fontSize="8"
        fill={C.ebgp} letterSpacing="0.04em" opacity="0.85">eBGP border</text>

      {/* ─── DC FABRIC (spine ↔ leaf) ─── */}
      {/* spine2 (590,100), leaf2 (760,100), spine1 (590,280), leaf1 (760,280) */}

      {/* spine2 ↔ leaf2 (top horizontal) */}
      <path d="M612,100 L738,100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M612,100 L738,100" stroke="url(#isis-flow-ebgp)" strokeWidth="1.2" className="flow" style={{ animationDuration: '4s', animationDelay: '0s' }} fill="none" />

      {/* spine1 ↔ leaf1 (bottom horizontal) */}
      <path d="M612,280 L738,280" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M612,280 L738,280" stroke="url(#isis-flow-ebgp)" strokeWidth="1.2" className="flow" style={{ animationDuration: '4s', animationDelay: '0.4s' }} fill="none" />

      {/* spine2 ↔ leaf1 (diagonal) */}
      <path d="M608,118 L744,266" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M608,118 L744,266" stroke="url(#isis-flow-ebgp)" strokeWidth="1.2" className="flow" style={{ animationDuration: '4.4s', animationDelay: '1s' }} fill="none" />

      {/* spine1 ↔ leaf2 (diagonal) */}
      <path d="M608,266 L744,118" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <path d="M608,266 L744,118" stroke="url(#isis-flow-ebgp)" strokeWidth="1.2" className="flow" style={{ animationDuration: '4.4s', animationDelay: '1.4s' }} fill="none" />

      {/* fabric label */}
      <text x="676" y="200" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8"
        fill={C.ebgp} letterSpacing="0.04em" opacity="0.7">eBGP · ECMP</text>

      {/* ─── NODES ─── */}
      {/* Backbone */}
      <Node x={90}  y={200} label="r1" sub="RR"               isRR />
      <Node x={220} y={100} label="r2" sub="client"           />
      <Node x={340} y={100} label="r4" sub="client · border"  />
      <Node x={240} y={290} label="r3" sub="RR · border"      isRR />

      {/* Fabric */}
      <Node x={590} y={100} label="spine2" sub="AS 65020" small />
      <Node x={590} y={280} label="spine1" sub="AS 65010" small />
      <Node x={760} y={100} label="leaf2"  sub="AS 65102" small leaf />
      <Node x={760} y={280} label="leaf1"  sub="AS 65101" small leaf />
    </svg>
  )
}

function Node({
  x, y, label, sub, isRR, small, leaf,
}: {
  x: number; y: number; label: string; sub: string;
  isRR?: boolean; small?: boolean; leaf?: boolean;
}) {
  const r = small ? 20 : 24
  const stroke = isRR ? C.ibgp : leaf ? 'rgba(190,165,255,0.45)' : C.nodeStroke
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.nodeFill} stroke={stroke} strokeWidth="1" />
      <text x={x} y={y - 1} textAnchor="middle"
        fontFamily="ui-monospace,monospace"
        fontSize={small ? 10 : 11}
        fontWeight="500"
        fill={C.nodeText}>
        {label}
      </text>
      <text x={x} y={y + 11} textAnchor="middle"
        fontFamily="ui-monospace,monospace"
        fontSize={small ? 7 : 7.5}
        fill={isRR ? C.ibgp : C.subText}
        letterSpacing="0.04em">
        {sub}
      </text>
    </g>
  )
}
