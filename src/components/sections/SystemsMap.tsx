'use client'

import { useState, useEffect } from 'react'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

// ── SVG topology ─────────────────────────────────────────────────────────────
const COLS = [
  { x: 90,   label: 'EDGE',      sub: 'devices · external' },
  { x: 290,  label: 'NETWORK',   sub: 'unifi · zigbee' },
  { x: 510,  label: 'SERVER',    sub: 'mel-01 · docker' },
  { x: 730,  label: 'TUNNEL',    sub: 'cloudflare · Zero Trust' },
  { x: 940,  label: 'SERVICES',  sub: 'containers' },
  { x: 1150, label: 'INTEL',     sub: 'AI · data · backup' },
]

// [x, y, label, sub, hub, color]
type Node = [number, number, string, string, boolean, string]
const NODES: Node[] = [
  // EDGE
  [90,  110, 'zigbee-mesh',  '24 sensors',      false, '#f59e0b'],
  [90,  240, 'browser',      'client',           false, '#94a3b8'],
  [90,  360, 'webhook',      'automation',       false, '#94a3b8'],
  [90,  480, 'ha.feifei',    'home entry',       false, '#3b82f6'],
  // NETWORK
  [290, 170, 'unifi-dm',     'router · VLAN',    false, '#3b82f6'],
  [290, 370, 'zigbee2mqtt',  'ch11 · MQTT',      false, '#f59e0b'],
  // SERVER - hub
  [510, 300, 'mel-01',       'ubuntu · docker',  true,  '#10b981'],
  // TUNNEL
  [730, 200, 'cf-tunnel',    'Zero Trust',       true,  '#f97316'],
  [730, 420, 'aws-s3',       'nightly backup',   false, '#64748b'],
  // SERVICES
  [940, 120, 'zuyu',         'fastapi · 4000',   false, '#14b8a6'],
  [940, 230, 'homeassistant','port 8123',        false, '#3b82f6'],
  [940, 340, 'tm-app',       'port 5000',        false, '#6366f1'],
  [940, 450, 'portainer',    'port 9443',        false, '#0ea5e9'],
  [940, 560, 'code-server',  'port 8443',        false, '#8b5cf6'],
  // INTEL
  [1150,160, 'claude-api',   'anthropic',        false, '#a855f7'],
  [1150,290, 'job-intel',    'sqlite · 2.9k',    false, '#10b981'],
  [1150,420, 'wiki',         '53 pages',         false, '#f97316'],
  [1150,540, 'daily-brief',  'rss · llm',        false, '#94a3b8'],
]

const EDGES = [
  // EDGE → NETWORK
  'M90,110 C190,110 190,170 290,170',
  'M90,240 C190,240 190,210 290,170',
  'M90,360 C190,360 190,370 290,370',
  'M90,480 C190,480 190,420 290,370',
  // NETWORK → SERVER
  'M290,170 C400,170 400,300 510,300',
  'M290,370 C400,370 400,300 510,300',
  // SERVER → TUNNEL
  'M510,300 C610,300 630,200 730,200',
  'M510,300 C610,300 630,420 730,420',
  // TUNNEL → SERVICES
  'M730,200 C830,200 830,120 940,120',
  'M730,200 C830,200 830,230 940,230',
  'M730,200 C830,200 830,340 940,340',
  'M730,200 C830,200 830,450 940,450',
  'M730,200 C830,200 830,560 940,560',
  // SERVICES → INTEL
  'M940,120 C1045,120 1045,160 1150,160',
  'M940,230 C1045,230 1045,290 1150,290',
  'M940,340 C1045,340 1045,420 1150,420',
  'M940,230 C1045,230 1045,540 1150,540',
]

// ── Detail panels ─────────────────────────────────────────────────────────────
const CONTAINERS = [
  { name: 'homeassistant',  desc: 'automation hub',         detail: 'ha.feifei.food',          up: true,  color: '#3b82f6' },
  { name: 'zigbee2mqtt',    desc: 'Zigbee ↔ MQTT bridge',   detail: 'ch 11 · 24 devices',       up: true,  color: '#f59e0b' },
  { name: 'mosquitto',      desc: 'MQTT broker',            detail: ':1883 · event bus',        up: true,  color: '#10b981' },
  { name: 'cloudflared ①',  desc: 'Zero Trust tunnel',      detail: 'feifei.food',              up: true,  color: '#f97316' },
  { name: 'cloudflared ②',  desc: 'Zero Trust tunnel',      detail: 'zuyu.feifei.food',         up: true,  color: '#f97316' },
  { name: 'cloudflared ③',  desc: 'Zero Trust tunnel',      detail: 'tommymao.feifei.food',     up: true,  color: '#f97316' },
  { name: 'code-server',    desc: 'remote VS Code',         detail: ':8443 · browser IDE',      up: true,  color: '#8b5cf6' },
  { name: 'vaultwarden',    desc: 'password vault',         detail: 'Bitwarden-compat',         up: true,  color: '#ec4899' },
  { name: 'tm-app-server',  desc: 'portfolio site',         detail: ':5000 · Next.js',          up: true,  color: '#6366f1' },
  { name: 'zm-app',         desc: 'Zuyu ops platform',      detail: ':4000 · FastAPI',          up: true,  color: '#14b8a6' },
  { name: 'nginx',          desc: 'reverse proxy',          detail: ':80 / :443',               up: true,  color: '#64748b' },
  { name: 'postgresql',     desc: 'relational database',    detail: ':5432',                    up: true,  color: '#3b82f6' },
  { name: 'portainer',      desc: 'container management',   detail: ':9443',                    up: true,  color: '#0ea5e9' },
  { name: 'clab-node-01',   desc: 'IS-IS lab · Nokia SRL', detail: 'on-demand',                up: false, color: '#94a3b8' },
  { name: 'clab-node-02',   desc: 'IS-IS lab · Arista EOS',detail: 'on-demand',                up: false, color: '#94a3b8' },
]

const ZIGBEE = [
  { type: 'Coordinator',     model: 'Sonoff Zigbee 3.0 USB Dongle Plus', room: 'server rack',     icon: '📡', cnt: 1 },
  { type: 'Motion',          model: 'Aqara Motion Sensor P1',            room: 'living · entry',  icon: '👁', cnt: 3 },
  { type: 'Temp + Humidity', model: 'Aqara TH-S2',                       room: 'multi-room',      icon: '🌡', cnt: 4 },
  { type: 'Door / Window',   model: 'Aqara Door Sensor',                 room: 'doors · windows', icon: '🚪', cnt: 5 },
  { type: 'Smart Plug',      model: 'IKEA TRADFRI Outlet',               room: 'lounge · desk',   icon: '🔌', cnt: 4 },
  { type: 'Smart Switch',    model: 'Tuya Scene Switch',                 room: 'bedroom · entry', icon: '💡', cnt: 4 },
  { type: 'Vibration',       model: 'Aqara Vibration Sensor',            room: 'server rack',     icon: '📳', cnt: 1 },
  { type: 'Smart Bulb',      model: 'IKEA TRADFRI E27',                  room: 'lounge',          icon: '💡', cnt: 2 },
]

const AUTOMATIONS = [
  'motion detected → lights on · 2-min timeout',
  'server rack temp > 35°C → alert Teams',
  'door open after 23:00 → push notify',
  'vibration on rack → power cycle alert',
  'presence detected → run morning brief',
  'all lights off at 00:30 if away',
]

const NETWORK_LAYERS = [
  { layer: 'mel-01',      detail: 'Ubuntu 24.04 LTS · Docker host · always-on',           icon: '🖥',  color: '#10b981' },
  { layer: 'Routing',     detail: 'Unifi Dream Machine · firewall · VLAN segmentation',    icon: '🌐',  color: '#3b82f6' },
  { layer: 'Wi-Fi',       detail: 'Unifi U6 Pro APs · WPA3 · IoT VLAN isolated',          icon: '📶',  color: '#10b981' },
  { layer: 'Switching',   detail: 'Unifi 24-port PoE · trunked VLANs · QoS',              icon: '🔗',  color: '#8b5cf6' },
  { layer: 'Edge',        detail: '3× Cloudflare Zero Trust tunnels · zero open ports',    icon: '🔒',  color: '#f97316' },
  { layer: 'Backup',      detail: 'AWS S3 · nightly rsync · failover if mel-01 goes down', icon: '☁',  color: '#64748b' },
]

const VIEWS = ['containers', 'iot', 'network'] as const
type View = typeof VIEWS[number]

export function SystemsMap() {
  const [view,    setView]    = useState<View>('containers')
  const [viewIdx, setViewIdx] = useState(0)
  const [autoIdx, setAutoIdx] = useState(0)
  const [cIdx,    setCIdx]    = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setViewIdx(v => { const n = (v + 1) % VIEWS.length; setView(VIEWS[n]); return n })
    }, 6000)
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
    <section id="architecture" style={{ padding: '120px 0 40px' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 18,
        paddingBottom: 32, borderBottom: '1px solid var(--hair)', marginBottom: 40,
      }}>
        <div className="section-label" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--dim)' }}>Systems</div>
        <h2 style={{ fontFamily: 'var(--font-instrument-serif)', fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-0.025em', margin: 0, fontWeight: 400 }}>
          Edge to <em style={{ fontStyle: 'italic', color: 'var(--ink-2)' }}>agent,</em> end-to-end.
        </h2>
      </div>

      <RevealWrapper>
        <div style={{ border: '1px solid var(--hair)', borderRadius: 14, background: 'var(--surface)', overflow: 'hidden' }}>

          {/* Caption - orients the viewer to the topology */}
          <div style={{
            padding: '14px 22px', borderBottom: '1px solid var(--hair)',
            fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--dim)',
            letterSpacing: '0.02em',
          }}>
            zigbee → unifi → mel-01 → cloudflare → services → AI
          </div>

          {/* ── SVG topology ── */}
          <div style={{ position: 'relative', borderBottom: '1px solid var(--hair)' }}>
            <svg
              viewBox="0 0 1240 640"
              preserveAspectRatio="xMidYMid meet"
              style={{ width: '100%', display: 'block' }}
            >
              <defs>
                <linearGradient id="flow-grad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0"   stopColor="rgba(100,255,160,0)" />
                  <stop offset="0.5" stopColor="rgba(100,255,160,0.55)" />
                  <stop offset="1"   stopColor="rgba(100,255,160,0)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Column guidelines */}
              {COLS.map(({ x, label, sub }) => (
                <g key={label}>
                  <line x1={x} y1="50" x2={x} y2="610" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 6" />
                  <text x={x} y="30" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="rgba(255,255,255,0.3)" letterSpacing="1.5">{label}</text>
                  <text x={x} y="44" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="rgba(255,255,255,0.18)">{sub}</text>
                </g>
              ))}

              {/* Edges - base + animated flow */}
              {EDGES.map((d, i) => (
                <g key={i}>
                  <path d={d} stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" />
                  <path d={d} stroke="url(#flow-grad)" strokeWidth="1.2" className="flow" style={{ animationDelay: `${i * 0.13}s` }} fill="none" />
                </g>
              ))}

              {/* Nodes */}
              {NODES.map(([x, y, label, sub, hub, color], i) => (
                <g key={i}>
                  {hub && <circle cx={x} cy={y} r="42" fill={color} opacity="0.07" filter="url(#glow)" />}
                  <rect
                    x={x - 58} y={y - 24} width="116" height="48" rx="7"
                    fill="rgba(14,15,19,0.92)"
                    stroke={hub ? color : 'rgba(255,255,255,0.14)'}
                    strokeWidth={hub ? 1.5 : 1}
                  />
                  <circle cx={x - 45} cy={y - 9} r="3" fill={color} opacity={hub ? 1 : 0.7} />
                  <text x={x - 37} y={y - 5} fontFamily="ui-monospace,monospace" fontSize="10.5" fill={hub ? '#fff' : '#d4d4d0'}>{label}</text>
                  <text x={x - 45} y={y + 13} fontFamily="ui-monospace,monospace" fontSize="8.5" fill="rgba(255,255,255,0.28)">{sub}</text>
                </g>
              ))}

              <text x="1225" y="630" fontFamily="ui-monospace,monospace" fontSize="8.5" fill="rgba(255,255,255,0.18)" textAnchor="end">mel-01 · Melbourne, AU</text>
            </svg>
          </div>

          {/* ── Detail panel tabs ── */}
          <div style={{ padding: '16px 20px 0', borderBottom: '1px solid var(--hair)', display: 'flex', gap: 6 }}>
            {VIEWS.map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, padding: '4px 12px',
                borderRadius: '4px 4px 0 0', border: '1px solid var(--hair)',
                borderBottom: view === v ? '1px solid var(--surface)' : '1px solid var(--hair)',
                background: view === v ? 'var(--surface)' : 'var(--surface-2)',
                color: view === v ? 'var(--accent)' : 'var(--dim)',
                cursor: 'pointer', transition: 'all .15s', marginBottom: view === v ? -1 : 0,
              }}>
                {v === 'containers' ? '15 containers' : v === 'iot' ? 'zigbee · iot' : 'network'}
              </button>
            ))}
          </div>

          {/* ── Containers panel ── */}
          {view === 'containers' && (
            <div style={{ padding: '14px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px 20px' }}>
              {CONTAINERS.map((c, i) => {
                const active = i === cIdx
                return (
                  <div key={c.name} style={{
                    display: 'grid', gridTemplateColumns: '8px 1fr auto',
                    gap: 7, alignItems: 'center', padding: '5px 0',
                    opacity: active ? 1 : 0.55, transition: 'opacity .3s',
                  }}>
                    <div style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: c.up ? '#10b981' : 'var(--dim-2)',
                      boxShadow: c.up && active ? '0 0 0 3px rgba(16,185,129,0.2)' : 'none',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: active ? c.color : 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 8.5, color: 'var(--dim-2)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {c.detail}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── IoT / Zigbee panel ── */}
          {view === 'iot' && (
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 32px' }}>
                {ZIGBEE.map(d => (
                  <div key={d.type} style={{ display: 'grid', gridTemplateColumns: '16px 100px 1fr 24px', gap: 8, alignItems: 'center', padding: '4px 0' }}>
                    <span style={{ fontSize: 10 }}>{d.icon}</span>
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--ink-2)', fontWeight: 600 }}>{d.type}</span>
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.model}</span>
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--accent)', textAlign: 'right', fontWeight: 700 }}>×{d.cnt}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 4, padding: '7px 12px', background: 'var(--surface-2)', border: '1px solid var(--hair)', borderRadius: 6, fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)' }}>
                automation → <span style={{ color: 'var(--accent)' }}>{AUTOMATIONS[autoIdx]}</span>
              </div>
            </div>
          )}

          {/* ── Network panel ── */}
          {view === 'network' && (
            <div style={{ padding: '14px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px' }}>
              {NETWORK_LAYERS.map(n => (
                <div key={n.layer} style={{
                  display: 'grid', gridTemplateColumns: '18px 68px 1fr',
                  gap: 10, alignItems: 'center', padding: '7px 10px',
                  background: 'var(--surface-2)', border: `1px solid ${n.color}22`, borderRadius: 6,
                }}>
                  <span style={{ fontSize: 11 }}>{n.icon}</span>
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, fontWeight: 700, color: n.color }}>{n.layer}</span>
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)' }}>{n.detail}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Footer stats ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--hair)' }}>
            {[
              { label: 'containers',     val: '15 running' },
              { label: 'zigbee devices', val: '24 paired'  },
              { label: 'CF tunnels',     val: '3 active'   },
              { label: 'incidents',      val: '0 open', accent: true },
            ].map(({ label, val, accent }, i) => (
              <div key={label} style={{
                padding: '14px 20px',
                borderRight: i < 3 ? '1px solid var(--hair)' : 'none',
                fontFamily: 'var(--font-geist-mono)', fontSize: 10.5, color: 'var(--dim-2)',
              }}>
                {label}
                <div style={{ color: accent ? 'var(--accent)' : 'var(--ink)', fontSize: 17, marginTop: 5, letterSpacing: '-0.01em' }}>{val}</div>
              </div>
            ))}
          </div>

        </div>
      </RevealWrapper>
    </section>
  )
}
