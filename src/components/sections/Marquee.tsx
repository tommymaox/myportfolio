'use client'

const KEYWORDS = [
  'Python', 'FastAPI', 'Linux', 'Docker', 'Kubernetes',
  'CI/CD', 'GitLab', 'YAML', 'BGP', 'OSPF', 'IS-IS', 'MPLS',
  'Cloudflare Zero Trust', 'AWS', 'SQLite', 'PostgreSQL',
  'Cisco IOS XR', 'Nokia SR Linux', 'Arista EOS', 'Ericsson RAN',
  'Home Assistant', 'Zigbee2MQTT', 'ContainerLab', 'Playwright',
  'Claude API', 'Local LLaMA', 'RAG', 'OpenTelemetry',
]

export function Marquee() {
  const items = [...KEYWORDS, ...KEYWORDS]
  return (
    <section
      aria-label="Tech stack marquee"
      style={{
        position: 'relative',
        padding: 'clamp(40px, 5vw, 64px) 0',
        borderTop: '1px solid var(--hair)',
        borderBottom: '1px solid var(--hair)',
        overflow: 'hidden',
        background: 'var(--bg)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <div className="marquee-track">
        {items.map((kw, i) => (
          <span
            key={`${kw}-${i}`}
            style={{
              fontFamily: 'var(--font-kanit), sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(28px, 4vw, 56px)',
              letterSpacing: '-0.02em',
              color: 'var(--dim-2)',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 56,
            }}
          >
            {kw}
            <span style={{ color: 'var(--accent)', opacity: 0.5, fontSize: '0.4em' }}>●</span>
          </span>
        ))}
      </div>
    </section>
  )
}
