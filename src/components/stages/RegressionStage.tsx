'use client'

import { useState, useEffect } from 'react'

const STAGES = [
  { key: 'provision',   tool: 'allocate lab nodes',       duration: '1m 20s' },
  { key: 'deploy',      tool: 'adb push firmware',        duration: '3m 45s' },
  { key: 'integration', tool: 'validate test cases',      duration: '12m' },
  { key: 'soak',        tool: 'long-run stability',       duration: '4h' },
  { key: 'report',      tool: 'dashboard + KPI',          duration: '30s' },
]

const PLAYBOOK_LINES: Array<{ text: string; color: 'dim' | 'key' | 'val' | 'num' | 'blank' }> = [
  { text: '# release-playbook.yaml',                               color: 'dim'   },
  { text: 'name: core-router-upgrade',                             color: 'key'   },
  { text: 'target: mel-lab-01',                                    color: 'key'   },
  { text: 'tier: pilot',                                           color: 'key'   },
  { text: '',                                                      color: 'blank' },
  { text: 'hardware:',                                             color: 'key'   },
  { text: '  vendor: ericsson',                                    color: 'val'   },
  { text: '  firmware: 24.2.1 → 24.3.0',                           color: 'val'   },
  { text: '',                                                      color: 'blank' },
  { text: 'stages:',                                               color: 'key'   },
  { text: '  - task: provision',                                   color: 'val'   },
  { text: '    validate: [node.reachable, image.ok]',              color: 'val'   },
  { text: '  - task: deploy',                                      color: 'val'   },
  { text: '    run: adb push os-image.bin /boot',                  color: 'val'   },
  { text: '  - task: integration',                                 color: 'val'   },
  { text: '    checks: [bgp.up, latency<5ms, alarms==0]',          color: 'val'   },
  { text: '  - task: soak',                                        color: 'val'   },
  { text: '    duration: 4h',                                      color: 'num'   },
  { text: '  - task: report',                                      color: 'val'   },
  { text: '    notify: [teams, email]',                            color: 'val'   },
]

const TOKEN_COLOR: Record<string, string> = {
  dim:   'var(--dim-2)',
  key:   'var(--accent)',
  val:   'var(--ink-2)',
  num:   'var(--ink)',
  blank: 'transparent',
}

const ROLLOUT = [
  { tier: 'lab',      region: 'Melbourne lab',       nodes: 12,    sub: 'isolated test bench' },
  { tier: 'pilot',    region: 'Melbourne + QLD',     nodes: 247,   sub: 'early rollout clusters' },
  { tier: 'regional', region: '5 primary zones',     nodes: 2450,  sub: 'sub-regional fleets' },
  { tier: 'national', region: 'all production',      nodes: 10247, sub: 'full distributed fleet' },
]

const VIEWS = ['pipeline', 'playbook', 'rollout'] as const
type View = typeof VIEWS[number]

const STAGE_MS   = 2600
const ROLLOUT_MS = 2800
const VIEW_MS    = 10000

export function RegressionStage() {
  const [view, setView]     = useState<View>('pipeline')
  const [active, setActive] = useState(0)
  const [tier, setTier]     = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setView(v => VIEWS[(VIEWS.indexOf(v) + 1) % VIEWS.length])
    }, VIEW_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % STAGES.length), STAGE_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTier(t => (t + 1) % ROLLOUT.length), ROLLOUT_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ padding: '20px 22px', height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Tabs - Linear-style underline */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--hair)' }}>
        {VIEWS.map(v => {
          const isActive = view === v
          return (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                fontFamily: 'var(--font-geist-mono)', fontSize: 11,
                padding: '10px 16px', marginBottom: -1,
                borderBottom: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                color: isActive ? 'var(--ink)' : 'var(--dim)',
                cursor: 'pointer', background: 'none',
                letterSpacing: '0.02em',
                transition: 'color .3s ease, border-color .3s ease',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--ink-2)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--dim)' }}
            >
              {v}
            </button>
          )
        })}
      </div>

      {/* Pipeline view */}
      {view === 'pipeline' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {STAGES.map((s, i) => {
            const isActive = i === active
            const isDone   = i < active
            const isFilled = isDone || isActive
            return (
              <div
                key={s.key}
                style={{
                  display: 'grid', gridTemplateColumns: '140px 1fr 60px',
                  gap: 18, alignItems: 'center',
                  opacity: isFilled ? 1 : 0.42,
                  transition: 'opacity .5s cubic-bezier(.25,.8,.25,1)',
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'var(--font-geist-mono)', fontSize: 12,
                    color: isActive ? 'var(--accent)' : isFilled ? 'var(--ink)' : 'var(--ink-2)',
                    transition: 'color .4s ease',
                    letterSpacing: '0.01em',
                  }}>
                    {s.key}
                  </div>
                  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--dim-2)', marginTop: 3 }}>
                    {s.tool}
                  </div>
                </div>

                <div style={{ position: 'relative', height: 4, background: 'var(--surface-3)', borderRadius: 2, overflow: 'hidden' }}>
                  {isDone && (
                    <div style={{
                      width: '100%', height: '100%',
                      background: 'var(--accent)', opacity: 0.38,
                    }} />
                  )}
                  {isActive && (
                    <div
                      key={active}
                      style={{
                        height: '100%', borderRadius: 2,
                        background: 'linear-gradient(90deg, var(--accent-dim) 0%, var(--accent) 100%)',
                        animation: `fillBar ${STAGE_MS}ms cubic-bezier(.4,.0,.2,1) forwards`,
                        boxShadow: '0 0 10px var(--accent-glow)',
                      }}
                    />
                  )}
                </div>

                <div style={{
                  fontFamily: 'var(--font-geist-mono)', fontSize: 10.5, textAlign: 'right',
                  color: isActive ? 'var(--accent)' : 'var(--dim)',
                  transition: 'color .4s ease',
                }}>
                  {isActive ? 'running' : isDone ? s.duration : 'queued'}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Playbook view */}
      {view === 'playbook' && (
        <div style={{
          flex: 1,
          background: 'rgba(9,10,12,0.55)',
          border: '1px solid var(--hair)',
          borderRadius: 8,
          padding: '16px 20px',
          fontFamily: 'var(--font-geist-mono)', fontSize: 11,
          lineHeight: 1.75,
          overflow: 'auto',
        }}>
          {PLAYBOOK_LINES.map((line, i) => (
            <div
              key={i}
              style={{
                color: TOKEN_COLOR[line.color],
                whiteSpace: 'pre',
                opacity: line.color === 'blank' ? 0 : 1,
              }}
            >
              {line.text || ' '}
            </div>
          ))}
        </div>
      )}

      {/* Rollout view */}
      {view === 'rollout' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ROLLOUT.map((r, i) => {
            const isActive = i === tier
            const isDone   = i < tier
            return (
              <div
                key={r.tier}
                style={{
                  background: isActive ? 'rgba(100,255,160,0.04)' : 'var(--surface-2)',
                  border: `1px solid ${isActive ? 'rgba(100,255,160,0.3)' : isDone ? 'rgba(100,255,160,0.12)' : 'var(--hair)'}`,
                  borderRadius: 8, padding: '12px 16px',
                  display: 'grid', gridTemplateColumns: '10px 100px 1fr auto',
                  alignItems: 'center', gap: 14,
                  boxShadow: isActive ? '0 0 14px rgba(100,255,160,0.10)' : 'none',
                  transition: 'background .5s ease, border-color .5s ease, box-shadow .5s ease',
                }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: isDone || isActive ? 'var(--accent)' : 'var(--surface-3)',
                  opacity: isActive ? 1 : isDone ? 0.45 : 1,
                  boxShadow: isActive ? '0 0 8px var(--accent-glow)' : 'none',
                  transition: 'all .4s ease',
                }} />
                <div style={{
                  fontFamily: 'var(--font-geist-mono)', fontSize: 12,
                  color: isActive ? 'var(--accent)' : isDone ? 'var(--ink)' : 'var(--ink-2)',
                  letterSpacing: '0.01em',
                  transition: 'color .4s ease',
                }}>
                  {r.tier}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--ink-2)' }}>
                    {r.region}
                  </div>
                  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--dim-2)', marginTop: 2 }}>
                    {r.sub}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'var(--font-instrument-serif)', fontSize: 22,
                    letterSpacing: '-0.02em', lineHeight: 1,
                    color: isActive ? 'var(--accent)' : 'var(--ink)',
                    transition: 'color .16s ease',
                  }}>
                    {r.nodes.toLocaleString()}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-geist-mono)', fontSize: 9, marginTop: 4,
                    color: isDone ? 'var(--accent)' : isActive ? 'var(--ink-2)' : 'var(--dim-2)',
                    opacity: isDone ? 0.7 : 1,
                    transition: 'color .4s ease',
                  }}>
                    {isDone ? 'validated' : isActive ? 'rolling' : 'queued'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
