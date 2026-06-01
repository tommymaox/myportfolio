'use client'

const MODULES = [
  { id: 'calendar', label: 'calendar',    note: 'events · reminders' },
  { id: 'brief',    label: 'daily brief', note: 'ai · scheduled' },
  { id: 'jobs',     label: 'job intel',   note: 'scrape · score' },
  { id: 'wiki',     label: 'llm wiki',    note: 'ingest · index' },
  { id: 'food',     label: 'food log',    note: 'macros · trends' },
  { id: 'finance',  label: 'finance',     note: 'tx · cashflow' },
]

const STACK = [
  { label: 'FastAPI',  note: 'backend' },
  { label: 'SQLite',   note: 'store' },
  { label: 'Vanilla JS', note: 'frontend' },
  { label: 'Docker',   note: 'runtime' },
]

export function ZuyuStage() {
  return (
    <div
      style={{
        border: '1px solid var(--hair)',
        borderRadius: 'var(--r-lg)',
        background: 'var(--surface)',
        padding: 22,
        display: 'grid',
        gap: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 12,
          flexWrap: 'wrap',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 11,
          color: 'var(--dim)',
        }}
      >
        <span>zuyu · personal os</span>
        <span style={{ color: 'var(--dim-2)' }}>:4000 · single binary</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}
      >
        {MODULES.map((m) => (
          <div
            key={m.id}
            style={{
              padding: '12px 12px 14px',
              border: '1px solid var(--hair)',
              borderRadius: 'var(--r-md)',
              background: 'var(--bg-2)',
              display: 'grid',
              gap: 4,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 11.5,
                color: 'var(--ink)',
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 10,
                color: 'var(--dim)',
                letterSpacing: '0.04em',
              }}
            >
              {m.note}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          paddingTop: 14,
          borderTop: '1px solid var(--hair)',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 10.5,
          color: 'var(--dim)',
          letterSpacing: '0.04em',
        }}
      >
        {STACK.map((s) => (
          <span key={s.label}>
            <span style={{ color: 'var(--ink-2)' }}>{s.label}</span>
            <span style={{ color: 'var(--dim-2)' }}> · {s.note}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
