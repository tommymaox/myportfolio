import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['var(--font-kanit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-instrument-serif)', 'serif'],
      },
      colors: {
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        dim: 'var(--dim)',
        'dim-2': 'var(--dim-2)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        hair: 'var(--hair)',
        'hair-2': 'var(--hair-2)',
        'hair-3': 'var(--hair-3)',
      },
      borderRadius: {
        '4xl': '28px',
      },
    },
  },
  plugins: [],
}

export default config
