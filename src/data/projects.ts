export type StageKey = 'regression' | 'jobintel' | 'wiki' | 'zuyu' | 'isis' | 'alarm' | 'm365' | 'homelab'

export type ProjectCategory = 'automation' | 'ai' | 'infra'

export type LayoutVariant =
  | 'stacked'       // narrative on top, stage full-width below - best for wide topology diagrams
  | 'split'         // 1:1 narrative | stage - balanced pairing
  | 'text-heavy'    // 6:5 narrative | stage - dense technical write-up, medium diagram
  | 'visual-heavy'  // 5:7 narrative | stage - dashboards / analytics stages
  | 'compact'       // narrower card, text + small diagram stacked - light content

export interface DescLine {
  label?: string
  text: string
}

export interface DescBlock {
  title?: string
  lines: DescLine[]
  highlight?: boolean
}

export interface Project {
  id: string
  code: string
  title: string
  desc: DescBlock[]
  tags: string[]
  status: string
  metric: string               // one-line signal: primary scale / outcome
  stageKey: StageKey
  category: ProjectCategory
  layout?: LayoutVariant       // how this project should render (default: 'split')
  stageHeight?: number         // override min-height of the stage area
  textMaxWidth?: number        // override max-width of the narrative column
}

export const CATEGORIES: { key: ProjectCategory; label: string; sub: string }[] = [
  { key: 'automation', label: 'Automation',       sub: 'CI/CD · release validation · scheduled bots' },
  { key: 'ai',         label: 'AI Systems',       sub: 'multi-agent Claude pipelines · data intelligence' },
  { key: 'infra',      label: 'Labs & Infrastructure', sub: 'home lab · self-hosted · networking labs' },
]

export const PROJECTS: Project[] = [
  // ── AUTOMATION ─────────────────────────────────────────────────────────
  {
    id: 'PRJ-001',
    code: '// flagship',
    title: 'Release Validation Pipeline',
    category: 'automation',
    desc: [
      {
        lines: [
          { text: 'A custom Python automation framework inspired by Ansible-style playbooks, built from scratch.' },
          { label: 'DSL',        text: 'Custom YAML playbooks describe network device configuration and validation commands.' },
          { label: 'Runtime',    text: 'Python executes against lab hardware from internal Linux servers.' },
          { label: 'Deploy',     text: 'ADB drives OS pushes to test devices.' },
          { label: 'Validation', text: 'Pass/fail checks validate results, populate the database, and render a live dashboard.' },
          { label: 'CI/CD',      text: 'GitLab CI/CD orchestrates updates and config changes to the framework itself.' },
        ],
      },
      {
        title: 'Deployment process',
        lines: [
          { text: 'Testing / provisioning → small-cluster deploy → integration → report & KPI monitor → wider rollout.' },
        ],
      },
      {
        highlight: true,
        lines: [
          { text: 'Reduced regression time by 50% and the deployment window from 13h → 9h per upgrade.' },
        ],
      },
    ],
    tags: ['Python', 'FastAPI', 'YAML', 'SQLite', 'GitLab CI', 'ADB', 'Bash', 'REST', 'SNMP'],
    stageKey: 'regression',
    status: 'Production · Ericsson / Telstra',
    metric: '10,000+ production nodes · −50% regression time',
    layout: 'text-heavy',
    stageHeight: 520,
  },
  {
    id: 'PRJ-006',
    code: '// automation',
    title: 'Node Auto Alarm Checker',
    category: 'automation',
    desc: [
      {
        lines: [
          { label: 'Poll',     text: 'Scheduled Python and Bash scripts polling distributed infrastructure.' },
          { label: 'Process',  text: 'Scans crash dumps and dispatches enriched event digests to Microsoft Teams.' },
          { label: 'Schedule', text: 'Runs 3× daily — 08:00, 13:00, and 17:00 AEST.' },
        ],
      },
    ],
    tags: ['Python', 'REST', 'Power Automate', 'Teams'],
    stageKey: 'alarm',
    status: 'Scheduled · 3× daily',
    metric: 'daily node polling → Teams digest',
    layout: 'split',
    stageHeight: 420,
  },
  {
    id: 'PRJ-008',
    code: '// m365 automation',
    title: 'M365 Automation Pipeline',
    category: 'automation',
    desc: [
      {
        lines: [
          { text: 'End-to-end automation bridging Linux infrastructure and Microsoft 365.' },
          { label: 'Fetch',   text: 'Python fetches live data from the server and pushes it to SharePoint via Graph API.' },
          { label: 'Process', text: 'Power Automate flows trigger AI Copilot for natural-language parsing.' },
          { label: 'Output',  text: 'Teams chatbot alerts, formatted email digests, and auto-raised ITSM tickets - zero manual steps.' },
        ],
      },
    ],
    tags: ['Python', 'Graph API', 'SharePoint', 'Power Automate', 'AI Copilot', 'Teams', 'Outlook'],
    stageKey: 'm365',
    status: 'Scheduled · 06:00 AEST',
    metric: 'Linux → M365 · zero manual steps',
    layout: 'split',
    stageHeight: 460,
  },

  // ── AI SYSTEMS ──────────────────────────────────────────────────────────
  {
    id: 'PRJ-007',
    code: '// AI knowledge',
    title: 'LLM Wiki - AI Knowledge Base',
    category: 'ai',
    desc: [
      {
        lines: [
          { text: 'Multi-agent knowledge pipeline across 9 sources.' },
          { label: 'Sources',    text: 'Ingests Gmail, Slack, Drive, Obsidian, and Notion data.' },
          { label: 'Sources',    text: 'OpenClaw pulls iOS device data via Telegram and WhatsApp bots.' },
          { label: 'Agents',     text: 'Claude Cowork agents connect to Google tools and plugins.' },
          { label: 'Processing', text: 'Locally-run LLaMA handles bulk extraction and normalisation on-device; Claude Haiku cleans edge cases; Claude Sonnet synthesises and writes structured wiki pages.' },
          { label: 'Scale',      text: '13,643 items ingested, 53 searchable pages, ongoing.' },
          { label: 'Result',     text: 'A searchable knowledge base that compounds — every ingest sharpens retrieval and context.' },
        ],
      },
    ],
    tags: ['Claude API', 'Python', 'SQLite', 'FastAPI', 'Gmail', 'Slack', 'Google Drive'],
    stageKey: 'wiki',
    status: 'Live · ongoing ingestion',
    metric: '13,643 items · 53 structured pages',
    layout: 'visual-heavy',
    stageHeight: 500,
  },
  {
    id: 'PRJ-002',
    code: '// AI + data',
    title: 'Job Intelligence Bot',
    category: 'ai',
    desc: [
      {
        lines: [
          { label: 'Collect', text: 'Dual collection: a Playwright bot scraping Seek, LinkedIn, Indeed, and JobsDB, plus the CareerJet REST API.' },
          { label: 'Extract', text: 'Each posting passes through Claude Haiku for structured extraction.' },
          { label: 'Surface', text: 'Real market intelligence - top skills, salary ranges by country and seniority, most-requested certifications.' },
          { label: 'Scale',   text: '10,512 pages scraped, 5,751 jobs extracted, 26,200 skills indexed.' },
        ],
      },
    ],
    tags: ['Python', 'Playwright', 'CareerJet API', 'Claude Haiku', 'SQLite', 'FastAPI'],
    stageKey: 'jobintel',
    status: 'Running · ongoing collection',
    metric: '5,751 jobs extracted · 26,200 skills indexed',
    layout: 'visual-heavy',
    stageHeight: 480,
  },
  {
    id: 'PRJ-003',
    code: '// platform',
    title: 'Zuyu — Personal OS',
    category: 'ai',
    desc: [
      {
        lines: [
          { text: 'A single self-hosted web app that runs my life - planning, work, training, dieting, and AI research in one place.' },
          { label: 'Board',    text: 'Jira-style kanban built from scratch — columns, labels, drag-and-drop, Personal/Work views.' },
          { label: 'Modules',  text: 'Calendar, Training, Food, Goals, Wiki, Notes, Brief, AI Usage, Job Intel — 12+ modules growing weekly.' },
          { label: 'AI brief', text: 'Claude synthesises feeds, notes, and logs into a daily structured brief.' },
          { label: 'Stack',    text: 'FastAPI backend, single-file Vanilla JS frontend, SQLite, Docker, Claude API.' },
          { label: 'Infra',    text: 'Self-hosted on mel-01 behind a Cloudflare tunnel. Zero SaaS, fully owned.' },
        ],
      },
    ],
    tags: ['FastAPI', 'SQLite', 'Vanilla JS', 'Docker', 'Claude API', 'Cloudflare ZT'],
    stageKey: 'zuyu',
    status: 'Live · zuyu.feifei.food',
    metric: '12+ modules · Jira-style kanban · daily AI brief',
    layout: 'split',
    stageHeight: 440,
  },

  // ── LABS & INFRASTRUCTURE ──────────────────────────────────────────────
  {
    id: 'PRJ-004',
    code: '// home lab',
    title: 'Self-Hosted Home Lab',
    category: 'infra',
    desc: [
      {
        lines: [
          { text: 'Full stack running on a single Linux server - mel-01.' },
          { label: 'Server',     text: 'Ubuntu 24.04 · Docker host · 15 containers always on.' },
          { label: 'Network',    text: 'Unifi Dream Machine routing with VLAN-isolated IoT subnet · One AC Lite AP.' },
          { label: 'IoT',        text: '6+ Zigbee devices via Zigbee2MQTT → Home Assistant automations.' },
          { label: 'Edge',       text: 'Three Cloudflare Zero Trust tunnels - zero open inbound ports.' },
          { label: 'Redundancy', text: 'AWS S3 nightly backup · failover if mel-01 goes down.' },
          { label: 'Lab',        text: 'ContainerLab spins up multi-vendor topologies (Cisco IOS XRd, Nokia SR Linux, Arista cEOS) for protocol testing - IS-IS L2 cores, MPLS L3VPN, MP-BGP VPNv4, OSPF PE-CE.' },
        ],
      },
    ],
    tags: ['Docker', 'Ubuntu 24.04', 'Unifi', 'Home Assistant', 'Zigbee2MQTT', 'Cloudflare', 'AWS S3', 'nginx', 'ContainerLab'],
    stageKey: 'homelab',
    status: 'Always-on · mel-01 · Melbourne',
    metric: '15 containers · 6+ IoT · 3 CF tunnels',
    layout: 'stacked',
    stageHeight: 640,
  },
  {
    id: 'PRJ-005',
    code: '// networking',
    title: 'Network Lab',
    category: 'infra',
    desc: [
      {
        lines: [
          { text: 'Personal Containerlab environment for practicing enterprise routing, BGP overlays, route reflection, and spine-leaf fabric design using Arista cEOS.' },
        ],
      },
    ],
    tags: ['ContainerLab', 'Arista cEOS', 'IS-IS', 'iBGP', 'eBGP', 'Spine-Leaf', 'ECMP'],
    stageKey: 'isis',
    status: 'On-demand · clab',
    metric: '8 nodes · backbone + leaf-spine',
    layout: 'stacked',
    stageHeight: 820,
  },
]
