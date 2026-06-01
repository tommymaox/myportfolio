'use client'

const ALERTS = [
  { time: '03:14', node: 'mel-agg-04',   sev: 'crit', msg: 'BGP peer down · timer expired' },
  { time: '03:14', node: 'mel-agg-04',   sev: 'crit', msg: 'sync source lost · holdover' },
  { time: '04:02', node: 'syd-edge-12',  sev: 'warn', msg: 'queue drop > 0.4%/min' },
  { time: '06:21', node: 'bne-leaf-02',  sev: 'info', msg: 'crash dump uploaded · 18MB' },
  { time: '07:48', node: 'mel-agg-04',   sev: 'ok',   msg: 'restored · BGP up 1h12m' },
]

const SEV: Record<string, { fg: string; bg: string; label: string }> = {
  crit: { fg: 'var(--red)',    bg: 'oklch(69% 0.2 24 / 0.10)', label: 'CRIT' },
  warn: { fg: 'var(--amber)',  bg: 'oklch(79% 0.14 76 / 0.10)', label: 'WARN' },
  info: { fg: 'var(--ink-2)',  bg: 'var(--hair)',               label: 'INFO' },
  ok:   { fg: 'var(--accent)', bg: 'var(--accent-glow)',        label: ' OK ' },
}

export function AlarmCheckerStage() {
  return (
    <div
      style={{
        border: '1px solid var(--hair)',
        borderRadius: 'var(--r-lg)',
        background: 'var(--surface)',
        padding: 22,
        display: 'grid',
        gap: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 12,
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 11,
          color: 'var(--dim)',
        }}
      >
        <span>alarm-checker · NBN nodes</span>
        <span style={{ color: 'var(--dim-2)' }}>polled · enriched · → Teams</span>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        {ALERTS.map((a, i) => {
          const s = SEV[a.sev]!
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '54px 56px 130px 1fr',
                gap: 12,
                alignItems: 'center',
                padding: '10px 12px',
                border: '1px solid var(--hair)',
                borderRadius: 'var(--r-md)',
                background: 'var(--bg-2)',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 11.5,
              }}
            >
              <span style={{ color: 'var(--dim)' }}>{a.time}</span>
              <span
                style={{
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: s.bg,
                  color: s.fg,
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  textAlign: 'center',
                }}
              >
                {s.label}
              </span>
              <span style={{ color: 'var(--ink-2)' }}>{a.node}</span>
              <span style={{ color: 'var(--ink-2)' }}>{a.msg}</span>
            </div>
          )
        })}
      </div>

      <div
        style={{
          paddingTop: 12,
          borderTop: '1px solid var(--hair)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 10.5,
          color: 'var(--dim)',
          letterSpacing: '0.04em',
        }}
      >
        <span>scheduled poll · crash dump parse · enriched alert</span>
        <span style={{ color: 'var(--dim-2)' }}>python · paramiko · webhook</span>
      </div>
    </div>
  )
}
