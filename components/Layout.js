import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="brand-mark">
            <span className="brand-dot" aria-hidden="true"></span>
            <span>SafeHome</span>
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <Link href="/pre-install-guide">How it works</Link>
            <Link href="/login">Sign in</Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {children}
      </main>

      <footer className="site-footer">
        <div className="container site-footer-inner">
          <p>Keeping your loved ones safe at home, with privacy in mind.</p>
          <nav className="site-footer-links" aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
