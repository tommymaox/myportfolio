import { STACK_COLUMNS } from '@/data/stack'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export function StackSection() {
  return (
    <section id="stack" style={{ padding: '120px 0 40px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '120px 1fr auto',
        gap: 24, alignItems: 'end',
        paddingBottom: 32, borderBottom: '1px solid var(--hair)', marginBottom: 40,
      }}>
        <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--dim-2)' }}>§ 06 · STACK & ECOSYSTEM</div>
        <h2 style={{ fontFamily: 'var(--font-instrument-serif)', fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-0.025em', margin: 0, fontWeight: 400 }}>
          Tools I <em style={{ fontStyle: 'italic', color: 'var(--ink-2)' }}>reach</em> for.
        </h2>
        <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--dim)' }}>boring on purpose</div>
      </div>

      <RevealWrapper>
        <div style={{ display: 'grid', border: '1px solid var(--hair)', borderRadius: 14, overflow: 'hidden', background: 'var(--surface)' }} className="stack-grid">
          {STACK_COLUMNS.map((c, i) => (
            <div
              key={i}
              style={{ padding: 22, borderRight: i < 3 ? '1px solid var(--hair)' : 'none', minHeight: 220, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-geist-mono)', fontSize: 10.5, color: 'var(--dim)', marginBottom: 20 }}>
                <span>{c.head}</span>
                <span>{String(c.items.length).padStart(2, '0')}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-instrument-serif)', fontSize: 22, marginBottom: 16, lineHeight: 1, letterSpacing: '-0.02em' }}>{c.title}</div>
              <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: 'var(--ink-2)' }}>
                {c.items.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                    <span style={{ color: 'var(--ink-2)' }}>{k}</span>
                    <span style={{ color: 'var(--dim-2)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RevealWrapper>
    </section>
  )
}
