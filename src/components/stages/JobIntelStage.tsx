'use client'

import { useState, useEffect, useRef } from 'react'

// ── Data collection - both methods ──────────────────────────────────────────
const SOURCES = [
  { name: 'seek.com.au',     method: 'playwright', country: 'AU', pages: 1842, jobs: 892  },
  { name: 'linkedin.com',    method: 'playwright', country: 'AU', pages: 621,  jobs: 401  },
  { name: 'indeed.com.au',   method: 'playwright', country: 'AU', pages: 234,  jobs: 189  },
  { name: 'careerjet api',   method: 'api',        country: 'AU', pages: 284,  jobs: 1299 },
  { name: 'jobsdb.com',      method: 'playwright', country: 'SG', pages: 142,  jobs: 109  },
  { name: 'linkedin.com',    method: 'playwright', country: 'US', pages: 78,   jobs: 56   },
]

// ── Intelligence extracted ───────────────────────────────────────────────────
const TOP_SKILLS = [
  { skill: 'AWS',               cnt: 891, pct: 100 },
  { skill: 'Network Engineering', cnt: 832, pct: 93 },
  { skill: 'Python',            cnt: 714, pct: 80  },
  { skill: 'Ansible',           cnt: 623, pct: 70  },
  { skill: 'BGP / OSPF',        cnt: 589, pct: 66  },
  { skill: 'Cisco',             cnt: 541, pct: 61  },
  { skill: 'Azure',             cnt: 498, pct: 56  },
  { skill: 'network security',  cnt: 421, pct: 47  },
]

const TOP_CERTS = [
  { cert: 'CCNP',               cnt: 512, pct: 100 },
  { cert: 'AWS Solutions Arch', cnt: 389, pct: 76  },
  { cert: 'CCIE',               cnt: 201, pct: 39  },
  { cert: 'CCNA',               cnt: 187, pct: 37  },
  { cert: 'Azure Network Eng',  cnt: 134, pct: 26  },
]

const SALARY = [
  { country: 'AU', seniority: 'senior', min: 130, max: 180, currency: 'AUD', n: 87  },
  { country: 'AU', seniority: 'mid',    min: 90,  max: 130, currency: 'AUD', n: 142 },
  { country: 'SG', seniority: 'senior', min: 95,  max: 140, currency: 'SGD', n: 31  },
  { country: 'US', seniority: 'senior', min: 120, max: 185, currency: 'USD', n: 18  },
]

const VIEWS = ['collect', 'skills', 'salary', 'certs'] as const
type View = typeof VIEWS[number]

const VIEW_LABELS: Record<View, string> = {
  collect: 'Collection',
  skills:  'Top Skills',
  salary:  'Pay Ranges',
  certs:   'Certs',
}

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

export function JobIntelStage() {
  const [view,    setView]    = useState<View>('collect')
  const [srcIdx,  setSrcIdx]  = useState(0)
  const [viewIdx, setViewIdx] = useState(0)

  const pages  = useCountUp(10512)
  const jobs   = useCountUp(5751)
  const skills = useCountUp(26200)

  // auto-cycle views
  useEffect(() => {
    const id = setInterval(() => {
      setViewIdx(v => {
        const next = (v + 1) % VIEWS.length
        setView(VIEWS[next])
        return next
      })
      setSrcIdx(s => (s + 1) % SOURCES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const src = SOURCES[srcIdx]

  return (
    <div style={{ padding: '14px 16px', height: '100%', display: 'flex', flexDirection: 'column', gap: 11 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--dim-2)' }}>
          job-intel · playwright + careerjet api · weekly
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)', display: 'inline-block' }} className="pulse" />
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: '#10b981' }}>LIVE</span>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
        {[
          { val: pages.toLocaleString(),  lbl: 'pages scraped' },
          { val: jobs.toLocaleString(),   lbl: 'jobs extracted' },
          { val: skills.toLocaleString(), lbl: 'skills indexed' },
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
            {VIEW_LABELS[v]}
          </button>
        ))}
      </div>

      {/* ── Collection view ── */}
      {view === 'collect' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)', marginBottom: 2 }}>
            seek · linkedin · indeed · jobsdb - playwright headless &nbsp;+&nbsp; careerjet rest api
          </div>
          {SOURCES.map((s, i) => {
            const active = i === srcIdx
            const isApi  = s.method === 'api'
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '40px 1fr 44px 50px 28px',
                alignItems: 'center', gap: 7,
                fontFamily: 'var(--font-geist-mono)', fontSize: 10,
                opacity: active ? 1 : 0.55, transition: 'opacity .3s',
              }}>
                <span style={{
                  padding: '1px 5px', borderRadius: 3, fontSize: 8.5,
                  background: isApi ? 'rgba(16,185,129,0.12)' : 'rgba(124,108,248,0.12)',
                  color: isApi ? '#10b981' : '#7c6cf8',
                  border: `1px solid ${isApi ? 'rgba(16,185,129,0.25)' : 'rgba(124,108,248,0.25)'}`,
                  textAlign: 'center', whiteSpace: 'nowrap',
                }}>
                  {isApi ? 'API' : 'PW'}
                </span>
                <span style={{ color: active ? 'var(--ink)' : 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {s.name}
                </span>
                <span style={{ color: 'var(--dim)', fontSize: 9, textAlign: 'right' }}>{s.country}</span>
                <span style={{ color: 'var(--dim)', fontSize: 9, textAlign: 'right' }}>{s.pages.toLocaleString()} pg</span>
                <span style={{ color: active ? 'var(--accent)' : 'var(--dim)', fontSize: 9, textAlign: 'right', fontWeight: active ? 700 : 400 }}>
                  {s.jobs}
                </span>
              </div>
            )
          })}
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--hair)',
            borderRadius: 6, padding: '6px 10px', marginTop: 4,
            fontFamily: 'var(--font-geist-mono)', fontSize: 9.5,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span style={{ color: 'var(--dim-2)' }}>now crawling</span>
            <span style={{ color: src.method === 'api' ? '#10b981' : '#7c6cf8' }}>
              {src.name} · {src.method === 'api' ? 'api' : 'playwright'} · {src.country}
            </span>
          </div>
        </div>
      )}

      {/* ── Top Skills view ── */}
      {view === 'skills' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)', marginBottom: 2 }}>
            most required skills across 2,946 postings
          </div>
          {TOP_SKILLS.map(s => (
            <div key={s.skill} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 28px', gap: 8, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.skill}
              </span>
              <div style={{ height: 5, background: 'var(--surface-3)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: 'var(--accent)', borderRadius: 2, transition: 'width 1s' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)', textAlign: 'right' }}>
                {s.cnt}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Salary view ── */}
      {view === 'salary' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)', marginBottom: 2 }}>
            average salary ranges · {SALARY.reduce((s,r)=>s+r.n,0)} postings with salary data
          </div>
          {SALARY.map((r, i) => (
            <div key={i} style={{
              background: 'var(--surface-2)', border: '1px solid var(--hair)',
              borderRadius: 6, padding: '8px 11px',
              display: 'grid', gridTemplateColumns: '24px 46px 1fr auto',
              alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-geist-mono)',
            }}>
              <span style={{ fontSize: 9, color: 'var(--dim-2)', fontWeight: 700 }}>{r.country}</span>
              <span style={{
                fontSize: 8.5, padding: '1px 5px', borderRadius: 3,
                background: r.seniority === 'senior' ? 'rgba(16,185,129,0.12)' : 'rgba(124,108,248,0.12)',
                color: r.seniority === 'senior' ? '#10b981' : '#7c6cf8',
                border: `1px solid ${r.seniority === 'senior' ? 'rgba(16,185,129,0.3)' : 'rgba(124,108,248,0.3)'}`,
                textAlign: 'center',
              }}>
                {r.seniority}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)' }}>
                {r.currency} {r.min}k – {r.max}k
              </span>
              <span style={{ fontSize: 9, color: 'var(--dim)' }}>n={r.n}</span>
            </div>
          ))}
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)', marginTop: 2 }}>
            only 15% of postings include salary - data skews higher
          </div>
        </div>
      )}

      {/* ── Certifications view ── */}
      {view === 'certs' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim-2)', marginBottom: 2 }}>
            most requested certifications
          </div>
          {TOP_CERTS.map(c => (
            <div key={c.cert} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 28px', gap: 8, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {c.cert}
              </span>
              <div style={{ height: 5, background: 'var(--surface-3)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${c.pct}%`, height: '100%', borderRadius: 2, background: '#f59e0b', transition: 'width 1s' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'var(--dim)', textAlign: 'right' }}>
                {c.cnt}
              </span>
            </div>
          ))}
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--hair)',
            borderRadius: 6, padding: '7px 10px', marginTop: 4,
            fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--dim)',
          }}>
            CCNP is required in <span style={{ color: 'var(--accent)' }}>17% of AU roles</span> · CCIE in 7% · AWS SAA rising
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-geist-mono)', fontSize: 9.5, color: 'var(--dim-2)',
        paddingTop: 8, borderTop: '1px solid var(--hair)', marginTop: 'auto',
      }}>
        <span>2,946 jobs · AU · SG · US · weekly run</span>
        <span style={{ color: 'var(--dim)' }}>claude haiku · ~$0.001/job</span>
      </div>
    </div>
  )
}
