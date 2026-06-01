'use client'

import { useState, useEffect } from 'react'

// ── SVG topology ─────────────────────────────────────────────────────────────
// Logical flow, left → right:
//   1. IoT devices (Zigbee mesh + 1 WiFi speaker)
//   2. Bridges (Sonoff USB dongle + Unifi DM router + AC Lite AP)
//   3. Host server (mel-01 — Ubuntu, Docker)
//   4. Internal Docker containers (Z2M → Mosquitto → Home Assistant chain, plus app containers)
//   5. Edge (Cloudflare tunnels + AWS S3 backup)
//   6. Public access (browser + public domains)
const COLS = [
  { x: 90,   label: 'IOT',        sub: 'devices' },
  { x: 290,  label: 'BRIDGE',     sub: 'sonoff · unifi' },
  { x: 510,  label: 'SERVER',     sub: 'mel-01' },
  { x: 730,  label: 'CONTAINERS', sub: 'docker' },
  { x: 940,  label: 'EDGE',       sub: 'cloudflare · aws' },
  { x: 1150, label: 'PUBLIC',     sub: 'domains · clients' },
]

type Node = [number, number, string, string, boolean, string]
const NODES: Node[] = [
  // IoT — left column, 5 device groups
  [90,  100, 'hue lights',     '3× E27',           false, '#fbbf24'],
  [90,  200, 'hue panels',     '2× wall panel',    false, '#fbbf24'],
  [90,  300, 'apollo mmWave',  'presence sensor',  false, '#a855f7'],
  [90,  400, 'zemismart',      'motor blind',      false, '#0ea5e9'],
  [90,  520, 'nest mini',      'wifi speaker',     false, '#94a3b8'],

  // Bridge — Sonoff dongle (top) for Zigbee, Unifi DM (mid) for WiFi/LAN, AC Lite AP (low) for WiFi
  [290, 200, 'sonoff dongle',  'zigbee 3.0',       false, '#f59e0b'],
  [290, 380, 'unifi DM',       'router · VLAN',    false, '#3b82f6'],
  [290, 500, 'AC Lite AP',     'wifi · IoT VLAN',  false, '#3b82f6'],

  // Server — the host (hub)
  [510, 320, 'mel-01',         'ubuntu · docker',  true,  '#10b981'],

  // Containers — Z2M → Mosquitto → HA chain + others
  [730,  90, 'zigbee2mqtt',    'reads dongle',     false, '#f59e0b'],
  [730, 180, 'mosquitto',      ':1883 · MQTT bus', false, '#10b981'],
  [730, 270, 'home assistant', ':8123 · automate', false, '#3b82f6'],
  [730, 360, 'nginx',          'reverse proxy',    false, '#64748b'],
  [730, 450, 'zuyu',           ':4000 · fastapi',  false, '#14b8a6'],
  [730, 540, 'tm-app',         ':5000 · next.js',  false, '#6366f1'],

  // Edge — outbound
  [940, 320, 'cf-tunnel ×3',   'Zero Trust',       true,  '#ec4899'],
  // AWS S3 — sits directly under mel-01, vertical connection
  [510, 480, 'aws-s3',         'nightly backup',   false, '#94a3b8'],

  // Public
  [1150, 130, 'browser',       'clients · ssh',    false, '#94a3b8'],
  [1150, 240, 'ha.feifei',     'home dashboard',   false, '#3b82f6'],
  [1150, 350, 'zuyu.feifei',   'personal OS',      false, '#14b8a6'],
  [1150, 460, 'tommymao',      'this site',        false, '#6366f1'],
]

// Edge logic — every line is semantically real, colour-coded by flow type
type FlowType = 'zigbee' | 'wifi' | 'host' | 'mqtt' | 'tunnel' | 'backup' | 'incoming'

const EDGES: Array<{ d: string; flow: FlowType }> = [
  // IoT → Sonoff (Zigbee mesh) — amber
  { d: 'M90,100 C190,100 190,180 290,200', flow: 'zigbee' },
  { d: 'M90,200 C190,200 190,200 290,200', flow: 'zigbee' },
  { d: 'M90,300 C190,300 190,220 290,200', flow: 'zigbee' },
  { d: 'M90,400 C190,400 190,210 290,200', flow: 'zigbee' },
  // Nest Mini → AC Lite AP (WiFi) — blue
  { d: 'M90,520 C190,520 190,510 290,500', flow: 'wifi' },
  // Sonoff → mel-01 (USB carries Zigbee data) — amber
  { d: 'M290,200 C400,200 400,320 510,320', flow: 'zigbee' },
  // Unifi DM → mel-01 (LAN) — blue
  { d: 'M290,380 C400,380 400,320 510,320', flow: 'wifi' },
  // AC Lite AP → Unifi DM (uplink) — blue
  { d: 'M290,500 C320,500 290,440 290,380', flow: 'wifi' },
  // mel-01 → Containers (host runs them all) — green
  { d: 'M510,320 C610,320 630,90 730,90',   flow: 'host' },
  { d: 'M510,320 C610,320 630,180 730,180', flow: 'host' },
  { d: 'M510,320 C610,320 630,270 730,270', flow: 'host' },
  { d: 'M510,320 C610,320 630,360 730,360', flow: 'host' },
  { d: 'M510,320 C610,320 630,450 730,450', flow: 'host' },
  { d: 'M510,320 C610,320 630,540 730,540', flow: 'host' },
  // Z2M → Mosquitto (publishes events) — purple (MQTT bus)
  { d: 'M730,90 C760,130 760,140 730,180', flow: 'mqtt' },
  // Mosquitto → HA (subscribes) — purple
  { d: 'M730,180 C760,225 760,225 730,270', flow: 'mqtt' },
  // Containers → CF tunnel (HA, zuyu, tm-app exposed) — pink
  { d: 'M730,270 C830,270 830,320 940,320', flow: 'tunnel' },
  { d: 'M730,450 C830,450 830,320 940,320', flow: 'tunnel' },
  { d: 'M730,540 C830,540 830,320 940,320', flow: 'tunnel' },
  // mel-01 → AWS S3 (outbound backup, directly below) — slate, straight vertical
  { d: 'M510,344 L510,458', flow: 'backup' },
  // CF tunnel → public domains — pink
  { d: 'M940,320 C1045,320 1045,240 1150,240', flow: 'tunnel' },
  { d: 'M940,320 C1045,320 1045,350 1150,350', flow: 'tunnel' },
  { d: 'M940,320 C1045,320 1045,460 1150,460', flow: 'tunnel' },
  // Browser → CF tunnel (incoming user traffic) — cyan
  { d: 'M1150,130 C1045,130 1045,320 940,320', flow: 'incoming' },
]

// Per-flow stop colors (rgba — no alpha at endpoints, ~0.6 in the middle).
// Each flow gets a visually distinct hue so paths never read the same.
const FLOW_COLORS: Record<FlowType, string> = {
  zigbee:   '245, 158, 11',   // amber — physical zigbee data
  wifi:     '59, 130, 246',   // blue — WiFi / LAN
  host:     '16, 185, 129',   // green — server hosts containers
  mqtt:     '168, 85, 247',   // purple — MQTT broker bus
  tunnel:   '236, 72, 153',   // pink — Cloudflare exposure (distinct from amber)
  backup:   '148, 163, 184',  // slate — AWS outbound backup
  incoming: '34, 211, 238',   // cyan — incoming browser traffic
}

// ── Detail panels ─────────────────────────────────────────────────────────────
const CONTAINERS = [
  { name: 'home-assistant', detail: 'ha.feifei.food',           up: true,  color: '#3b82f6' },
  { name: 'zigbee2mqtt',    detail: 'reads sonoff dongle',       up: true,  color: '#f59e0b' },
  { name: 'mosquitto',      detail: ':1883 · MQTT bus',          up: true,  color: '#10b981' },
  { name: 'cloudflared ①',  detail: 'feifei.food',               up: true,  color: '#f97316' },
  { name: 'cloudflared ②',  detail: 'zuyu.feifei.food',          up: true,  color: '#f97316' },
  { name: 'cloudflared ③',  detail: 'tommymao.feifei.food',      up: true,  color: '#f97316' },
  { name: 'code-server',    detail: ':8443 · browser IDE',       up: true,  color: '#8b5cf6' },
  { name: 'vaultwarden',    detail: 'Bitwarden-compat',          up: true,  color: '#ec4899' },
  { name: 'tm-app-server',  detail: ':5000 · Next.js',           up: true,  color: '#6366f1' },
  { name: 'zm-app',         detail: ':4000 · FastAPI',           up: true,  color: '#14b8a6' },
  { name: 'nginx',          detail: ':80 / :443',                up: true,  color: '#64748b' },
  { name: 'postgresql',     detail: ':5432',                     up: true,  color: '#3b82f6' },
  { name: 'portainer',      detail: ':9443',                     up: true,  color: '#0ea5e9' },
  { name: 'clab-node-01',   detail: 'on-demand',                 up: false, color: '#94a3b8' },
  { name: 'clab-node-02',   detail: 'on-demand',                 up: false, color: '#94a3b8' },
]

const ZIGBEE = [
  { type: 'Coordinator',  model: 'Sonoff Zigbee 3.0 Dongle Plus', icon: '📡', cnt: 1 },
  { type: 'Hue Light',    model: 'Philips Hue E27 Bulb',          icon: '💡', cnt: 3 },
  { type: 'Hue Panel',    model: 'Philips Hue Wall Panel',        icon: '🟫', cnt: 2 },
  { type: 'mmWave',       model: 'Apollo Presence Sensor',        icon: '📶', cnt: 1 },
  { type: 'Motor Blind',  model: 'Zemismart Smart Blind',         icon: '🪟', cnt: 1 },
  { type: 'Speaker',      model: 'Google Nest Mini (WiFi)',       icon: '🔊', cnt: 1 },
]

const AUTOMATIONS = [
  'mmWave detects presence → Hue lights on · sunset+',
  'sleep mode at 23:00 → blinds close · lights dim',
  'morning routine → blinds up · brief on Nest Mini',
  'no presence 10m → all Hue off',
  'rack temp > 35°C → push notify',
]

const NETWORK_LAYERS = [
  { layer: 'mel-01',    detail: 'Ubuntu 24.04 · Docker host',        icon: '🖥', color: '#10b981' },
  { layer: 'Routing',   detail: 'Unifi Dream Machine · VLAN',         icon: '🌐', color: '#3b82f6' },
  { layer: 'Wi-Fi',     detail: 'Unifi AC Lite AP · IoT VLAN',        icon: '📶', color: '#10b981' },
  { layer: 'Zigbee',    detail: 'Sonoff Dongle Plus · ch 11',         icon: '📡', color: '#f59e0b' },
  { layer: 'Edge',      detail: '3× Cloudflare Zero Trust tunnels',   icon: '🔒', color: '#f97316' },
  { layer: 'Backup',    detail: 'AWS S3 nightly · failover',          icon: '☁', color: '#64748b' },
]

const VIEWS = ['containers', 'iot', 'network'] as const
type View = typeof VIEWS[number]

export function HomeLabStage() {
  const [view,     setView]    = useState<View>('containers')
  const [,         setViewIdx] = useState(0)
  const [autoIdx,  setAutoIdx] = useState(0)
  const [cIdx,     setCIdx]    = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setViewIdx(v => { const n = (v + 1) % VIEWS.length; setView(VIEWS[n]); return n })
    }, 6500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setAutoIdx(a => (a + 1) % AUTOMATIONS.length)
      setCIdx(c => (c + 1) % CONTAINERS.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Statusbar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '11px 18px', borderBottom: '1px solid var(--hair)',
        fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--dim)',
      }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ color: 'var(--dim-2)' }}>SYS.MAP // mel-01</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)', display: 'inline-block' }} className="pulse" />
            <span style={{ color: '#10b981' }}>UPTIME 99.9%</span>
          </span>
        </div>
        <span style={{ color: 'var(--dim-2)', fontSize: 9 }}>zigbee → sonoff → mel-01 → z2m → mqtt → home assistant</span>
      </div>

      {/* SVG topology */}
      <div style={{ borderBottom: '1px solid var(--hair)', background: 'rgba(0,0,0,0.12)' }}>
        <svg viewBox="0 0 1240 640" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', display: 'block' }}>
          <defs>
            {(Object.keys(FLOW_COLORS) as FlowType[]).map(flow => {
              const rgb = FLOW_COLORS[flow]
              return (
                <linearGradient key={flow} id={`hl-flow-${flow}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0"   stopColor={`rgba(${rgb}, 0)`} />
                  <stop offset="0.5" stopColor={`rgba(${rgb}, 0.6)`} />
                  <stop offset="1"   stopColor={`rgba(${rgb}, 0)`} />
                </linearGradient>
              )
            })}
            <filter id="hl-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {COLS.map(({ x, label, sub }) => (
            <g key={label}>
              <line x1={x} y1="50" x2={x} y2="610" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 6" />
              <text x={x} y="30" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="rgba(255,255,255,0.3)" letterSpacing="1.5">{label}</text>
              <text x={x} y="44" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="rgba(255,255,255,0.18)">{sub}</text>
            </g>
          ))}

          {EDGES.map(({ d, flow }, i) => {
            const rgb = FLOW_COLORS[flow]
            return (
              <g key={i}>
                <path d={d} stroke={`rgba(${rgb}, 0.12)`} strokeWidth="1" fill="none" />
                <path
                  d={d}
                  stroke={`url(#hl-flow-${flow})`}
                  strokeWidth="1.3"
                  className="flow"
                  style={{ animationDelay: `${i * 0.13}s` }}
                  fill="none"
                />
              </g>
            )
          })}

          {NODES.map(([x, y, label, sub, hub, color], i) => (
            <g key={i}>
              {hub && <circle cx={x} cy={y} r="42" fill={color} opacity="0.07" filter="url(#hl-glow)" />}
              <rect x={x - 58} y={y - 22} width="116" height="44" rx="7" fill="rgba(14,15,19,0.92)" stroke={hub ? color : 'rgba(255,255,255,0.14)'} strokeWidth={hub ? 1.5 : 1} />
              <circle cx={x - 45} cy={y - 8} r="3" fill={color} opacity={hub ? 1 : 0.7} />
              <text x={x - 37} y={y - 4} fontFamily="ui-monospace,monospace" fontSize="10" fill={hub ? '#fff' : '#d4d4d0'}>{label}</text>
              <text x={x - 45} y={y + 12} fontFamily="ui-monospace,monospace" fontSize="8" fill="rgba(255,255,255,0.28)">{sub}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* Tabs */}
      <div style={{ padding: '12px 18px 0', borderBottom: '1px solid var(--hair)', display: 'flex', gap: 6 }}>
        {VIEWS.map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, padding: '4px 12px',
            borderRadius: '4px 4px 0 0', border: '1px solid var(--hair)',
            borderBottom: view === v ? '1px solid transparent' : '1px solid var(--hair)',
            background: view === v ? 'var(--surface)' : 'var(--surface-2)',
            color: view === v ? 'var(--accent)' : 'var(--dim)',
            cursor: 'pointer', transition: 'all .15s',
            marginBottom: view === v ? -1 : 0,
          }}>
            {v === 'containers' ? '15 containers' : v === 'iot' ? 'zigbee · iot' : 'network'}
          </button>
        ))}
      </div>

      {view === 'containers' && (
        <div style={{ padding: '12px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px', flex: 1 }}>
          {CONTAINERS.map((c, i) => {
            const active = i === cIdx
            return (
              <div key={c.name} style={{
                display: 'grid', gridTemplateColumns: '7px 1fr auto',
                gap: 7, alignItems: 'center', padding: '4px 0',
                opacity: active ? 1 : 0.55, transition: 'opacity .3s',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: c.up ? '#10b981' : 'var(--dim-2)',
                  boxShadow: c.up && active ? '0 0 0 3px rgba(16,185,129,0.2)' : 'none',
                }} />
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: active ? c.color : 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.name}
                </span>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 8.5, color: 'var(--dim-2)', whiteSpace: 'nowrap' }}>
                  {c.detail}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {view === 'iot' && (
        <div style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 28px' }}>
            {ZIGBEE.map(d => (
              <div key={d.type} style={{ display: 'grid', gridTemplateColumns: '14px 100px 1fr 22px', gap: 7, alignItems: 'center', padding: '3px 0' }}>
                <span style={{ fontSize: 10 }}>{d.icon}</span>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--ink-2)', fontWeight: 600 }}>{d.type}</span>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.model}</span>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--accent)', textAlign: 'right', fontWeight: 700 }}>×{d.cnt}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 4, padding: '6px 10px', background: 'var(--surface-2)', border: '1px solid var(--hair)', borderRadius: 6, fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)' }}>
            automation → <span style={{ color: 'var(--accent)' }}>{AUTOMATIONS[autoIdx]}</span>
          </div>
        </div>
      )}

      {view === 'network' && (
        <div style={{ padding: '12px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', flex: 1 }}>
          {NETWORK_LAYERS.map(n => (
            <div key={n.layer} style={{
              display: 'grid', gridTemplateColumns: '16px 64px 1fr',
              gap: 9, alignItems: 'center', padding: '6px 9px',
              background: 'var(--surface-2)', border: `1px solid ${n.color}22`, borderRadius: 6,
            }}>
              <span style={{ fontSize: 11 }}>{n.icon}</span>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, fontWeight: 700, color: n.color }}>{n.layer}</span>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)' }}>{n.detail}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--hair)' }}>
        {[
          { label: 'containers',  val: '15 running' },
          { label: 'iot devices', val: '8 paired'   },
          { label: 'CF tunnels',  val: '3 active'   },
          { label: 'incidents',   val: '0 open', accent: true },
        ].map(({ label, val, accent }, i) => (
          <div key={label} style={{
            padding: '10px 14px',
            borderRight: i < 3 ? '1px solid var(--hair)' : 'none',
            fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--dim-2)',
          }}>
            {label}
            <div style={{ color: accent ? 'var(--accent)' : 'var(--ink)', fontSize: 13, marginTop: 3, letterSpacing: '-0.01em' }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
