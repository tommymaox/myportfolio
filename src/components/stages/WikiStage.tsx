'use client'

import { useState, useEffect, useRef } from 'react'

const SOURCES = [
  { name: 'Gmail',          type: 'email',      items: 1847, processed: 1203, health: 95,  color: '#ea4335', icon: '✉' },
  { name: 'Slack',          type: 'slack',      items: 4231, processed: 2890, health: 98,  color: '#4a154b', icon: '💬' },
  { name: 'Google Drive',   type: 'drive',      items: 312,  processed: 289,  health: 92,  color: '#34a853', icon: '📁' },
  { name: 'Excel / CSV',    type: 'excel',      items: 5620, processed: 4100, health: 72,  color: '#217346', icon: '📊' },
  { name: 'Ops Database',   type: 'database',   items: 924,  processed: 924,  health: 100, color: '#f59e0b', icon: '🗄' },
  { name: 'Transcripts',    type: 'transcript', items: 87,   processed: 62,   health: 88,  color: '#8b5cf6', icon: '🎙' },
  { name: 'Obsidian Vault', type: 'obsidian',   items: 218,  processed: 218,  health: 100, color: '#7c3aed', icon: '💎' },
  { name: 'Markdown Files', type: 'markdown',   items: 341,  processed: 310,  health: 95,  color: '#64748b', icon: '📝' },
  { name: 'Notion Export',  type: 'notion',     items: 43,   processed: 43,   health: 100, color: '#555',    icon: '◼' },
]

// AI agents that run on the data
const AGENTS = [
  { name: 'Claude Haiku',    role: 'extract + normalise raw text', color: '#f97316' },
  { name: 'Claude Sonnet',   role: 'synthesise + write wiki pages', color: '#a855f7' },
  { name: 'Cowork Agent',    role: 'route tasks · multi-agent coord', color: '#3b82f6' },
  { name: 'OpenClaw',        role: 'ingest via Telegram · WhatsApp', color: '#10b981' },
]

const PIPELINE = [
  { label: 'Collect',   color: '#4f8ef7' },
  { label: 'Extract',   color: '#7c6cf8' },
  { label: 'AI Clean',  color: '#a855f7' },
  { label: 'Classify',  color: '#ec4899' },
  { label: 'Generate',  color: '#10b981' },
  { label: 'Index',     color: '#f59e0b' },
]

const WIKI_PAGES = [
  'networking / IS-IS L2 core notes',
  'career / CCNP study guide',
  'projects / Docker deployment patterns',
  'learning / Python async patterns',
  'reference / BGP route policies',
  'ideas / self-hosted monitoring stack',
  'obsidian / meeting notes 2026-04',
]

const VIEWS = ['sources', 'agents', 'pipeline'] as const
type View = typeof VIEWS[number]

function useCountUp(target: number, ms = 1600) {
  const [val, setVal] = useState(0)
  const raf = useRef<number>(0)
  useEffect(() => {
    let start: number | null = null
    const frame = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / ms, 1)
      setVal(Math.floor(p * target))
      if (p < 1) raf.current = requestAnimationFrame(frame)
    }
    raf.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf.current)
  }, [target, ms])
  return val
}

export function WikiStage() {
  const [pipeStep, setPipeStep] = useState(0)
  const [srcIdx,   setSrcIdx]   = useState(0)
  const [pageIdx,  setPageIdx]  = useState(0)
  const [view,     setView]     = useState<View>('sources')
  const [viewIdx,  setViewIdx]  = useState(0)

  const totalItems  = useCountUp(13643)
  const processed   = useCountUp(10039)
  const wikiPages   = useCountUp(53)

  useEffect(() => {
    const id = setInterval(() => {
      setPipeStep(s => (s + 1) % PIPELINE.length)
      setSrcIdx(s => (s + 1) % SOURCES.length)
      setPageIdx(p => (p + 1) % WIKI_PAGES.length)
    }, 1500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setViewIdx(v => {
        const next = (v + 1) % VIEWS.length
        setView(VIEWS[next])
        return next
      })
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const activeSrc = SOURCES[srcIdx]

  return (
    <div style={{ padding: '14px 16px', height: '100%', display: 'flex', flexDirection: 'column', gap: 11 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--dim-2)' }}>
          wiki · ai knowledge base · {SOURCES.length} sources · ongoing
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)', display: 'inline-block' }} className="pulse" />
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: '#10b981' }}>INGESTING</span>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
        {[
          { val: totalItems.toLocaleString(), lbl: 'items ingested' },
          { val: processed.toLocaleString(),  lbl: 'AI processed'   },
          { val: wikiPages.toString(),         lbl: 'wiki pages'     },
        ].map(s => (
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

      {/* ── Sources view ── */}
      {view === 'sources' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)', marginBottom: 2 }}>
            email · slack · drive · excel · db · obsidian · markdown · transcripts · notion
          </div>
          {SOURCES.map((s, i) => {
            const pct = Math.round(s.processed / s.items * 100)
            const active = i === srcIdx
            return (
              <div key={s.name} style={{
                display: 'grid', gridTemplateColumns: '14px 82px 1fr 28px',
                gap: 7, alignItems: 'center',
                opacity: active ? 1 : 0.55, transition: 'opacity .3s',
              }}>
                <span style={{ fontSize: 9, textAlign: 'center' }}>{s.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-geist-mono)', fontSize: 9.5,
                  color: active ? s.color : 'var(--ink-2)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {s.name}
                </span>
                <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%', borderRadius: 2,
                    background: s.health >= 90 ? '#10b981' : s.health >= 70 ? '#f59e0b' : '#ef4444',
                  }} />
                </div>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)', textAlign: 'right' }}>
                  {pct}%
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Agents view ── */}
      {view === 'agents' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)', marginBottom: 2 }}>
            ai agents powering the pipeline
          </div>
          {AGENTS.map((a, i) => (
            <div key={a.name} style={{
              background: 'var(--surface-2)', border: `1px solid ${a.color}33`,
              borderRadius: 7, padding: '8px 11px',
              display: 'grid', gridTemplateColumns: '8px 1fr',
              gap: 9, alignItems: 'start',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, marginTop: 2, flexShrink: 0, boxShadow: `0 0 6px ${a.color}55` }} />
              <div>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10.5, fontWeight: 700, color: a.color, marginBottom: 2 }}>
                  {a.name}
                </div>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--dim)' }}>
                  {a.role}
                </div>
              </div>
            </div>
          ))}
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--hair)',
            borderRadius: 6, padding: '6px 10px', marginTop: 2,
            fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)',
          }}>
            latest page → <span style={{ color: 'var(--accent)' }}>📄 {WIKI_PAGES[pageIdx]}</span>
          </div>
        </div>
      )}

      {/* ── Pipeline view ── */}
      {view === 'pipeline' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {PIPELINE.map((s, idx) => {
              const active = idx === pipeStep
              const done   = idx < pipeStep
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1, minWidth: 0 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: done || active ? `${s.color}22` : 'var(--surface-3)',
                      border: `1px solid ${active ? s.color : done ? `${s.color}44` : 'var(--hair)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, color: active ? s.color : done ? `${s.color}cc` : 'var(--dim)',
                      fontFamily: 'var(--font-geist-mono)', fontWeight: 700,
                      boxShadow: active ? `0 0 8px ${s.color}44` : 'none',
                      transition: 'all .3s',
                    }}>
                      {done ? '✓' : String(idx + 1)}
                    </div>
                    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 8, color: active ? s.color : 'var(--dim)', textAlign: 'center' }}>
                      {s.label}
                    </span>
                  </div>
                  {idx < PIPELINE.length - 1 && (
                    <div style={{ fontSize: 9, color: 'var(--dim-2)', flexShrink: 0, marginBottom: 12 }}>›</div>
                  )}
                </div>
              )
            })}
          </div>

          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--hair)',
            borderRadius: 7, padding: '7px 10px',
            fontFamily: 'var(--font-geist-mono)', fontSize: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ color: 'var(--dim-2)' }}>ingesting</span>
              <span style={{ color: activeSrc.color }}>{activeSrc.type}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '12px 1fr auto auto', gap: 7, alignItems: 'center' }}>
              <span style={{ fontSize: 9 }}>{activeSrc.icon}</span>
              <span style={{ color: 'var(--ink-2)' }}>{activeSrc.name}</span>
              <span style={{ color: 'var(--dim)' }}>{activeSrc.items.toLocaleString()} items</span>
              <span style={{ color: '#10b981' }}>{activeSrc.health}%</span>
            </div>
          </div>

          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--hair)', borderRadius: 6, padding: '6px 10px', fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)' }}>
            latest → <span style={{ color: 'var(--accent)' }}>📄 {WIKI_PAGES[pageIdx]}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--dim-2)',
        paddingTop: 8, borderTop: '1px solid var(--hair)', marginTop: 'auto',
      }}>
        <span>claude · cowork · openclaw · telegram</span>
        <span style={{ color: 'var(--dim)' }}>multi-agent · ongoing</span>
      </div>
    </div>
  )
}
