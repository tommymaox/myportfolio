import { RevealWrapper } from '@/components/ui/RevealWrapper'

interface BulletSection {
  title: string
  pts: string[]
}

interface Entry {
  date: string
  role: string
  co: string
  pts?: string[]
  sections?: BulletSection[]
}

const ENTRIES: Entry[] = [
  {
    date: '2024 - present',
    role: 'Network Automation & Infrastructure Engineer',
    co: 'Ericsson · Telstra & NBN programs',
    sections: [
      {
        title: 'Telstra Network CI/CD',
        pts: [
          'Led release validation and regression automation for 10,000+ live production nodes - safe rollouts, high availability, and rapid rollback across Telstra\'s distributed network.',
          'Built a Python-based automation framework (Python, FastAPI, Bash, YAML, REST APIs, SQLite) - regression cycles cut 50% (2d → 1d), running as the daily CI/CD validation backbone.',
          'Supported L2 on-call incident response across mitigation, service restoration, and RCA-driven remediation.',
          'Replaced legacy Excel trackers, manual maintenance logs, and repetitive ticketing with automation for recurring operational workflows.',
          'Designed upgrade-safe network features preserving critical service continuity during nationwide Telstra rollouts.',
          'Led lab operations designing production-like test environments spanning L1–L7 to validate real-world failure modes and traffic flows.',
        ],
      },
      {
        title: 'Telstra Router New Product Introduction (NPI)',
        pts: [
          'Validated new router platforms across spine-leaf, redundant, and transport-integrated architectures.',
          'Performed traffic generation, SyncJack timing, stability, failover, and QoS testing before production introduction.',
        ],
      },
      {
        title: 'NBN Network Integration',
        pts: [
          'Built automated health-check and alarm monitoring - scheduled node polling, crash dump analysis, and enriched Microsoft Teams alerting.',
          'Configured and deployed transport and backhaul infrastructure across 3,000 geographically distributed rural sites.',
          'Automated a licensing pipeline reducing provisioning turnaround from 3 days → 1 day (Python, Playwright, REST APIs).',
        ],
      },
    ],
  },
  {
    date: '2022 - 2023',
    role: 'Solutions Consultant',
    co: 'Optus · consumer & small business',
    pts: [
      'Ranked #1 sales consultant for three consecutive months - consistently exceeded both sales and customer-outcome KPIs.',
      'Delivered technical recommendations in English and Mandarin across mobile, broadband, NBN, 4G/5G, and WiFi.',
    ],
  },
  {
    date: '2021 - 2023',
    role: 'Electrical Engineering',
    co: 'University of Melbourne',
    pts: [],
  },
  {
    date: '2024',
    role: 'Cisco Certified Network Associate',
    co: 'CCNA · studying CCNP',
    pts: [],
  },
]

function BulletList({ pts }: { pts: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--ink-2)', fontSize: 14, maxWidth: 720 }}>
      {pts.map((p, j) => (
        <li key={j} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--dim-2)', fontFamily: 'var(--font-geist-mono)', flexShrink: 0, marginTop: 2, fontSize: 12 }}>→</span>
          <span style={{ lineHeight: 1.6 }}>{p}</span>
        </li>
      ))}
    </ul>
  )
}

export function Timeline() {
  return (
    <section id="experience" style={{ padding: '40px 0 20px' }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap',
        paddingBottom: 22, borderBottom: '1px solid var(--hair)', marginBottom: 40,
        maxWidth: 1180, marginLeft: 'auto', marginRight: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span className="section-label" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--dim)' }}>
            Experience
          </span>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            lineHeight: 1, letterSpacing: '-0.022em',
            margin: 0, fontWeight: 400,
          }}>
            Track record<em style={{ fontStyle: 'italic', color: 'var(--ink-2)' }}>.</em>
          </h2>
        </div>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--dim-2)' }}>
          2021 → present
        </span>
      </div>

      <RevealWrapper>
        <div style={{ maxWidth: 1180, marginLeft: 'auto', marginRight: 'auto' }}>
          {ENTRIES.map((x, i) => (
            <div
              key={i}
              style={{ display: 'grid', gap: 28, padding: '24px 0', borderTop: '1px solid var(--hair)' }}
              className="tl-row"
            >
              <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11.5, color: 'var(--dim)', paddingTop: 6, letterSpacing: '0.01em' }}>{x.date}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-instrument-serif)', fontSize: 24, letterSpacing: '-0.018em', lineHeight: 1.1, marginBottom: 4 }}>{x.role}</div>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11.5, color: 'var(--ink-2)', marginBottom: 18, letterSpacing: '0.005em' }}>{x.co}</div>

                {x.sections ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {x.sections.map((s, si) => (
                      <div key={si}>
                        <div style={{
                          fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'var(--dim)',
                          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10,
                        }}>
                          {s.title}
                        </div>
                        <BulletList pts={s.pts} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <BulletList pts={x.pts ?? []} />
                )}
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--hair)' }} />
        </div>
      </RevealWrapper>
    </section>
  )
}
