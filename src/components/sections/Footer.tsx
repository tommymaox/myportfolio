export function Footer() {
  return (
    <footer
      style={{
        padding: '28px 0 24px',
        marginTop: 24,
        borderTop: '1px solid var(--hair)',
        maxWidth: 1180,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-geist-mono)',
        fontSize: 11.5,
        color: 'var(--dim-2)',
        gap: 20,
        flexWrap: 'wrap',
        letterSpacing: '0.01em',
      }}
    >
      <div>© 2026 Tommy Mao</div>
      <div style={{ display: 'flex', gap: 0 }}>
        <a href="mailto:tommy.mao@outlook.com" className="nav-link">
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/tommymaoau"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
