export interface StackColumn {
  title: string
  head: string
  items: [string, string][]
}

export const STACK_COLUMNS: StackColumn[] = [
  {
    title: 'Languages',
    head: 'lang/*',
    items: [
      ['Python', 'primary'],
      ['Bash', 'ops'],
      ['SQL', 'postgres · sqlite'],
      ['TypeScript', 'UI'],
      ['YAML', 'config'],
      ['Perl', 'legacy'],
    ],
  },
  {
    title: 'Runtime',
    head: 'sys/runtime',
    items: [
      ['Linux', 'Ubuntu 24.04'],
      ['Docker', 'containers'],
      ['nginx', 'proxy'],
      ['SQLite', 'embedded'],
      ['PostgreSQL', 'relational'],
      ['FastAPI', 'APIs'],
    ],
  },
  {
    title: 'Networking',
    head: 'net/*',
    items: [
      ['BGP', 'eBGP · iBGP'],
      ['OSPF', 'IGP'],
      ['IS-IS', 'IGP'],
      ['MPLS', 'transport'],
      ['QoS', 'policy'],
      ['DNS · TLS', 'edge'],
    ],
  },
  {
    title: 'Platforms',
    head: 'hw/*',
    items: [
      ['Arista EOS', 'DC'],
      ['Nokia SR Linux', 'core'],
      ['Cisco IOS XR', 'core'],
      ['Palo Alto', 'security'],
      ['Ericsson HW', 'RAN'],
      ['ContainerLab', 'lab'],
    ],
  },
]
