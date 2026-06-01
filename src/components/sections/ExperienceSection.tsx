'use client'

import { FadeIn } from '@/components/ui/FadeIn'

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
          "Led release validation and regression automation for 10,000+ live production nodes — supporting safe rollouts, high availability, and rapid rollback across Telstra's distributed network.",
          'Built a custom Python automation framework inspired by Ansible-style playbooks (Python, FastAPI, Bash, YAML, REST APIs, SQLite) — regression cycles cut 50% (2d → 1d), running as the daily CI/CD validation backbone.',
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
          'Built automated health-check and alarm monitoring — scheduled node polling, crash-dump analysis, and enriched Microsoft Teams alerting.',
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
      'Ranked #1 sales consultant for three consecutive months — consistently exceeded both sales and customer-outcome KPIs.',
      'Delivered technical recommendations in English and Mandarin across mobile, broadband, NBN, 4G/5G, and WiFi.',
    ],
  },
  {
    date: '2021 - 2023',
    role: 'B.Sc. Electrical Systems',
    co: 'University of Melbourne',
    pts: ['Systems-level foundation across electrical, signals, and computing.'],
  },
  {
    date: '2024',
    role: 'Cisco Certified Network Associate',
    co: 'CCNA · studying CCNP',
    pts: [
      'Routing, switching, and network protocol fundamentals — hands-on lab practice across multi-vendor topologies.',
    ],
  },
]

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-rounded section-alt"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 9vw, 120px) 0',
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
        }}
      >
        <FadeIn>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
              marginBottom: 'clamp(40px, 5vw, 64px)',
            }}
          >
            <div>
              <div className="uppercase-label" style={{ marginBottom: 14 }}>
                · Experience
              </div>
              <h2
                className="display-heading-md gradient-heading"
                style={{ margin: 0 }}
              >
                Track record.
              </h2>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 11,
                color: 'var(--dim-2)',
                letterSpacing: '0.08em',
              }}
            >
              2021 → present
            </span>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gap: 'clamp(20px, 2vw, 28px)' }}>
          {ENTRIES.map((x, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <article
                className="glow-card"
                style={{
                  padding: 'clamp(20px, 2.4vw, 32px)',
                  display: 'grid',
                  gridTemplateColumns: '180px minmax(0, 1fr)',
                  gap: 'clamp(20px, 2.5vw, 36px)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: 11.5,
                    letterSpacing: '0.05em',
                    color: 'var(--dim)',
                  }}
                >
                  {x.date}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-kanit), sans-serif',
                      fontWeight: 600,
                      fontSize: 'clamp(20px, 2vw, 26px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      margin: 0,
                      marginBottom: 6,
                      color: 'var(--ink)',
                    }}
                  >
                    {x.role}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: 11.5,
                      color: 'var(--ink-2)',
                      marginBottom: 20,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {x.co}
                  </div>

                  {x.sections ? (
                    <div style={{ display: 'grid', gap: 22 }}>
                      {x.sections.map((s, si) => (
                        <div key={si}>
                          <div className="uppercase-label" style={{ marginBottom: 10 }}>
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
              </article>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          #experience article {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}

function BulletList({ pts }: { pts: string[] }) {
  return (
    <ul
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        display: 'grid',
        gap: 10,
      }}
    >
      {pts.map((p, j) => (
        <li
          key={j}
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            color: 'var(--ink-2)',
            fontSize: 14.5,
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              color: 'var(--accent)',
              fontFamily: 'var(--font-geist-mono), monospace',
              marginTop: 2,
              fontSize: 11,
              flexShrink: 0,
            }}
          >
            →
          </span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  )
}
