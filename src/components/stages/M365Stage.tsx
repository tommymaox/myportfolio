'use client'

import { useState, useEffect } from 'react'

const FLOW_NODES = [
  {
    id: 'linux',
    label: 'Linux Server',
    sub: 'mel-01',
    color: '#f97316',
    icon: '🖥',
    x: 0,
  },
  {
    id: 'python',
    label: 'Python Fetch',
    sub: 'REST · SSH · cron',
    color: '#3b82f6',
    icon: '🐍',
    x: 1,
  },
  {
    id: 'sharepoint',
    label: 'SharePoint API',
    sub: 'Graph API · lists',
    color: '#0078d4',
    icon: '📋',
    x: 2,
  },
  {
    id: 'powerautomate',
    label: 'Power Automate',
    sub: 'trigger · transform',
    color: '#0066ff',
    icon: '⚡',
    x: 3,
  },
  {
    id: 'copilot',
    label: 'AI Copilot',
    sub: 'parse · summarise',
    color: '#8b5cf6',
    icon: '🤖',
    x: 4,
  },
]

const OUTPUTS = [
  { id: 'teams',  label: 'Teams Bot',     sub: 'chat · alerts',     color: '#5b5ea6', icon: '💬' },
  { id: 'email',  label: 'Email Digest',  sub: 'Outlook · HTML',    color: '#0078d4', icon: '✉' },
  { id: 'ticket', label: 'Auto Ticket',   sub: 'ServiceNow · ITSM', color: '#10b981', icon: '🎫' },
]

const STATS = [
  { val: '06:00',   lbl: 'daily trigger'   },
  { val: '~2 min',  lbl: 'end-to-end'      },
  { val: '100%',    lbl: 'automated'       },
]

const EXAMPLES = [
  'Node alarm digest → Teams channel #noc',
  'Weekly capacity report → SharePoint list → email',
  'Infra change → Copilot summary → manager email',
  'Crash dump detected → auto ticket → on-call ping',
  'Daily stats pulled → AI formatted → Teams card',
]

const VIEWS = ['flow', 'outputs', 'examples'] as const
type View = typeof VIEWS[number]

export function M365Stage() {
  const [step,    setStep]    = useState(0)
  const [view,    setView]    = useState<View>('flow')
  const [viewIdx, setViewIdx] = useState(0)
  const [exIdx,   setExIdx]   = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStep(s => (s + 1) % (FLOW_NODES.length + OUTPUTS.length))
      setExIdx(e => (e + 1) % EXAMPLES.length)
    }, 1600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setViewIdx(v => {
        const next = (v + 1) % VIEWS.length
        setView(VIEWS[next])
        return next
      })
    }, 5500)
    return () => clearInterval(id)
  }, [])

  const pipelineStep = Math.min(step, FLOW_NODES.length - 1)
  const outputStep   = step >= FLOW_NODES.length ? step - FLOW_NODES.length : -1

  return (
    <div style={{ padding: '14px 16px', height: '100%', display: 'flex', flexDirection: 'column', gap: 11 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--dim-2)' }}>
          m365 automation · power automate · ai copilot · daily
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)', display: 'inline-block' }} className="pulse" />
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: '#10b981' }}>SCHEDULED</span>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
        {STATS.map(s => (
          <div key={s.lbl} style={{
            background: 'var(--surface-2)', border: '1px solid var(--hair)',
            borderRadius: 6, padding: '7px 9px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 13, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 8.5, color: 'var(--dim)', marginTop: 2 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* View tabs */}
      <div style={{ display: 'flex', gap: 5 }}>
        {VIEWS.map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            fontFamily: 'var(--font-geist-mono)', fontSize: 9, padding: '3px 9px',
            borderRadius: 4, border: '1px solid var(--hair)',
            background: view === v ? 'var(--accent)' : 'var(--surface-3)',
            color: view === v ? '#000' : 'var(--dim)',
            cursor: 'pointer', transition: 'all .2s',
          }}>
            {v}
          </button>
        ))}
      </div>

      {/* ── Flow view ── */}
      {view === 'flow' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)' }}>
            end-to-end automation pipeline
          </div>

          {/* Pipeline nodes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {FLOW_NODES.map((node, idx) => {
              const active = idx === pipelineStep
              const done   = idx < pipelineStep
              return (
                <div key={node.id} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: done || active ? `${node.color}1a` : 'var(--surface-3)',
                      border: `1.5px solid ${active ? node.color : done ? `${node.color}55` : 'var(--hair)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14,
                      boxShadow: active ? `0 0 10px ${node.color}44` : 'none',
                      transition: 'all .3s',
                    }}>
                      {node.icon}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 8, color: active ? node.color : done ? 'var(--ink-2)' : 'var(--dim)', fontWeight: active ? 700 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 52 }}>
                        {node.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 7, color: 'var(--dim-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 52 }}>
                        {node.sub}
                      </div>
                    </div>
                  </div>
                  {idx < FLOW_NODES.length - 1 && (
                    <div style={{
                      fontSize: 10, color: done ? FLOW_NODES[idx].color : 'var(--dim-2)',
                      flexShrink: 0, marginBottom: 16, transition: 'color .3s',
                    }}>›</div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Output fan */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, marginTop: 2 }}>
            <div style={{ fontSize: 8, color: 'var(--dim-2)', fontFamily: 'var(--font-geist-mono)', marginTop: 14, flexShrink: 0 }}>↓</div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
              {OUTPUTS.map((out, i) => {
                const active = outputStep === i
                return (
                  <div key={out.id} style={{
                    background: active ? `${out.color}18` : 'var(--surface-2)',
                    border: `1px solid ${active ? out.color : 'var(--hair)'}`,
                    borderRadius: 7, padding: '6px 8px',
                    transition: 'all .3s',
                    boxShadow: active ? `0 0 8px ${out.color}33` : 'none',
                  }}>
                    <div style={{ fontSize: 12, marginBottom: 3 }}>{out.icon}</div>
                    <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, fontWeight: 700, color: active ? out.color : 'var(--ink-2)' }}>{out.label}</div>
                    <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 8, color: 'var(--dim)' }}>{out.sub}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Live activity */}
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--hair)',
            borderRadius: 6, padding: '6px 10px',
            fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)',
          }}>
            running → <span style={{ color: 'var(--accent)' }}>{EXAMPLES[exIdx]}</span>
          </div>
        </div>
      )}

      {/* ── Outputs view ── */}
      {view === 'outputs' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)', marginBottom: 2 }}>
            delivery channels
          </div>
          {OUTPUTS.map(out => (
            <div key={out.id} style={{
              background: 'var(--surface-2)', border: `1px solid ${out.color}33`,
              borderRadius: 7, padding: '9px 12px',
              display: 'grid', gridTemplateColumns: '20px 1fr',
              gap: 10, alignItems: 'start',
            }}>
              <span style={{ fontSize: 14 }}>{out.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10.5, fontWeight: 700, color: out.color, marginBottom: 2 }}>
                  {out.label}
                </div>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)' }}>
                  {out.sub}
                </div>
              </div>
            </div>
          ))}
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--hair)',
            borderRadius: 6, padding: '7px 10px', marginTop: 2,
            fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)',
          }}>
            AI Copilot formats and routes each message per channel
          </div>
        </div>
      )}

      {/* ── Examples view ── */}
      {view === 'examples' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)', marginBottom: 2 }}>
            live automation examples
          </div>
          {EXAMPLES.map((ex, i) => {
            const active = i === exIdx
            return (
              <div key={i} style={{
                background: active ? 'rgba(var(--accent-rgb, 16,185,129),0.08)' : 'var(--surface-2)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--hair)'}`,
                borderRadius: 6, padding: '7px 10px',
                fontFamily: 'var(--font-geist-mono)', fontSize: 9.5,
                color: active ? 'var(--ink)' : 'var(--dim)',
                opacity: active ? 1 : 0.6,
                transition: 'all .3s',
              }}>
                {active && <span style={{ color: 'var(--accent)', marginRight: 6 }}>▶</span>}
                {ex}
              </div>
            )
          })}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--dim-2)',
        paddingTop: 8, borderTop: '1px solid var(--hair)', marginTop: 'auto',
      }}>
        <span>python · graph api · power automate · copilot</span>
        <span style={{ color: 'var(--dim)' }}>fully automated · zero touch</span>
      </div>
    </div>
  )
}
