import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Button from '../components/Button'

export default function LandingPage() {
  const heroVideoRef = useRef(null)
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false)

  useEffect(() => {
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const slowConnection =
      connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType)

    if (!slowConnection) {
      setShouldLoadHeroVideo(true)
    }
  }, [])

  useEffect(() => {
    if (shouldLoadHeroVideo && heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {})
    }
  }, [shouldLoadHeroVideo])

  return (
    <div>
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-copy">
            <p className="eyebrow">Private home safety monitoring</p>
            <h1>Know your parent is safe, even when you're not there.</h1>
            <p>
              SafeHome quietly notices unusual activity at home and lets you know when something may need attention, without cameras or wearables.
            </p>

            <div className="hero-actions">
              <Link href="/onboarding">
                <Button>Get Early Access</Button>
              </Link>
              <Link href="/pre-install-guide">
                <Button variant="secondary">See How It Works</Button>
              </Link>
            </div>

            <p className="trust-signal">
              Limited pilot spots available. Setup takes about 30-60 minutes.
            </p>
          </div>

          <div className="hero-visual">
            <video
              ref={heroVideoRef}
              className="hero-video"
              poster="/images/hero-elderly-reading.jpg"
              preload="none"
              autoPlay={shouldLoadHeroVideo}
              muted
              loop
              playsInline
              aria-label="SafeHome privacy-first home safety monitoring"
            >
              {shouldLoadHeroVideo && (
                <source src="/videos/safehome-hero.mp4" type="video/mp4" />
              )}
            </video>
            <div className="hero-visual-overlay"></div>
            <div className="hero-status-card">
              <div className="hero-status-row">
                <strong>Home status</strong>
                <span className="status-pill">All normal</span>
              </div>
              <p>Regular motion detected in the living room. No action needed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-header">
            <h2>Designed for dignity at home.</h2>
            <p>Quiet sensing, timely updates, and privacy controls built for families navigating elder care.</p>
          </div>

          <div className="feature-grid">
            <div className="card feature-card">
              <span className="feature-icon">01</span>
              <h3>No cameras</h3>
              <p>We monitor motion patterns, not people. Privacy and independence come first.</p>
            </div>

            <div className="card feature-card">
              <span className="feature-icon">02</span>
              <h3>No wearables</h3>
              <p>Nothing to wear, charge, or lose. Works quietly in the background.</p>
            </div>

            <div className="card feature-card">
              <span className="feature-icon">03</span>
              <h3>Privacy-first</h3>
              <p>Encrypted. No third-party access. No ads. Your data is yours.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>How it works</h2>
            <p>Simple installation, a short learning period, and alerts only when something needs attention.</p>
          </div>

          <div className="steps-list">
            <div className="card step-card">
              <span className="step-number is-active">1</span>
              <div>
                <h3>Install sensors</h3>
                <p>Small motion sensors in bedroom, bathroom, and living room. Takes about 30-60 minutes.</p>
              </div>
            </div>

            <div className="card step-card">
              <span className="step-number is-active">2</span>
              <div>
                <h3>System learns routines</h3>
                <p>Over a week, AI learns normal patterns, from waking and sleeping to bathroom routines.</p>
              </div>
            </div>

            <div className="card step-card">
              <span className="step-number is-active">3</span>
              <div>
                <h3>You get alerts when needed</h3>
                <p>Receive alerts only for real concerns, like prolonged inactivity or unusual patterns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="privacy-panel">
            <div className="section-header">
              <h2>Your privacy matters</h2>
            </div>

            <div className="privacy-list">
              <div className="card privacy-row">
                <span className="check-icon">✓</span>
                <div>
                  <h3>Data stays protected</h3>
                  <p>We process everything locally or on encrypted servers. Not shared with third parties.</p>
                </div>
              </div>

              <div className="card privacy-row">
                <span className="check-icon">✓</span>
                <div>
                  <h3>No ads, no selling</h3>
                  <p>We don't profile users or sell data. You're the customer, not the product.</p>
                </div>
              </div>

              <div className="card privacy-row">
                <span className="check-icon">✓</span>
                <div>
                  <h3>You're in control</h3>
                  <p>Cancel anytime. Delete your data anytime. No lock-in contracts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <h2>Ready to get early access?</h2>
            <p>We're building SafeHome with early adopters. Get on the list and help shape the future of elder care.</p>
            <Link href="/onboarding">
              <Button>Get Early Access</Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-panel">
              <h3>Questions?</h3>
              <p>
                Email us at <a href="mailto:support@linkrytech.com">support@linkrytech.com</a>
              </p>
            </div>
            <div className="footer-panel">
              <h3>Resources</h3>
              <ul>
                <li>
                  <Link href="/pre-install-guide">Installation guide</Link>
                </li>
                <li>
                  <Link href="/login">Sign in</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
