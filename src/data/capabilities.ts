export interface Capability {
  code: string
  title: string
  tagline: string
  level: number
  color: string
  tools: string[]
  projects: { name: string; id: string }[]
  highlight: string
}

export const CAPABILITIES: Capability[] = [
  {
    code: 'CAP-01',
    title: 'Automation & Pipelines',
    tagline: 'CI/CD · regression · release validation · 10,000+ nodes',
    level: 5,
    color: '#10b981',
    tools: ['Python', 'FastAPI', 'Bash', 'YAML', 'GitLab CI', 'REST APIs', 'Playwright', 'SQLite', 'ADB', 'Git'],
    projects: [
      { name: 'Release Validation Pipeline', id: 'PRJ-001' },
      { name: 'Node Auto Alarm Checker',    id: 'PRJ-006' },
    ],
    highlight: 'Built my own Ansible-style automation framework - now validating 10K+ production nodes.',
  },
  {
    code: 'CAP-02',
    title: 'AI & LLM Integration',
    tagline: 'multi-agent · structured extraction · orchestrated pipelines',
    level: 4,
    color: '#a855f7',
    tools: ['Claude API', 'GPT', 'LLaMA', 'RAG', 'multi-agent', 'Nano Banana', 'Kling', 'Claude Cowork', 'Power Automate', 'Graph API'],
    projects: [
      { name: 'LLM Wiki - AI Knowledge Base', id: 'PRJ-007' },
      { name: 'Job Intelligence Bot',         id: 'PRJ-002' },
      { name: 'M365 Automation Pipeline',     id: 'PRJ-008' },
    ],
    highlight: 'Multi-agent pipelines that extract structured intelligence from unstructured data.',
  },
  {
    code: 'CAP-03',
    title: 'Infrastructure',
    tagline: 'linux-first · self-hosted · Unifi network · AWS failover',
    level: 4,
    color: '#f59e0b',
    tools: ['Docker', 'Linux', 'nginx', 'Cloudflare Zero Trust', 'AWS EC2', 'Unifi', 'Portainer', 'Home Assistant'],
    projects: [
      { name: 'Self-Hosted Home Lab', id: 'PRJ-004' },
      { name: 'Zuyu Ops Platform',    id: 'PRJ-003' },
    ],
    highlight: '15 containers · 3 CF tunnels · 24 Zigbee devices · AWS failover · zero SaaS dependency.',
  },
  {
    code: 'CAP-04',
    title: 'Network Engineering',
    tagline: 'multi-vendor · routing protocols · CCNA · studying CCNP',
    level: 5,
    color: '#3b82f6',
    tools: ['BGP', 'OSPF', 'IS-IS', 'MPLS', 'LDP', 'IPSec', 'TCP/IP', 'Leaf-Spine', 'MP-BGP VPNv4', 'Ansible', 'Cisco IOS XR', 'Nokia SR Linux', 'Arista EOS', 'Palo Alto PAN', 'ContainerLab'],
    projects: [
      { name: 'Service Provider Core Lab', id: 'PRJ-005' },
    ],
    highlight: 'Hands-on multi-vendor labs - Cisco, Nokia, Arista - spinning up MPLS L3VPNs from scratch.',
  },
]

export const META_ROWS = [
  { label: 'Languages', value: 'Python · Bash · SQL · TypeScript · YAML' },
  { label: 'Certs',     value: 'CCNA · CCNP in progress' },
]
