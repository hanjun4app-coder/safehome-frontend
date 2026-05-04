import Link from 'next/link'
import Button from '../components/Button'

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9' }}>
      {/* ========== HERO SECTION ========== */}
      <section className="hero-section">
        <div className="hero-container">

          {/* LEFT: Hero Copy */}
          <div className="hero-copy">
            <h1>Know your parent is safe — even when you're not there.</h1>

            <p>
              SafeHome quietly notices unusual activity at home and lets you know when something may need attention — without cameras or wearables.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <Link href="/onboarding">
                <Button className="button-primary" style={{ fontSize: '16px' }}>
                  Get Early Access
                </Button>
              </Link>
              <Link href="/pre-install-guide">
                <Button className="button-secondary" style={{ fontSize: '16px' }}>
                  See How It Works
                </Button>
              </Link>
            </div>

            <p className="trust-signal">
              Limited pilot spots available. Setup takes about 30–60 minutes.
            </p>
          </div>

          {/* RIGHT: Hero Visual */}
          <div className="hero-visual">
            <img
              src="/images/hero-elderly-reading.jpg"
              alt="Elderly person reading at home safely"
            />
            <div className="hero-visual-overlay"></div>
          </div>

        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section style={{ paddingTop: '60px', paddingBottom: '60px', backgroundColor: '#f5f5f4' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {/* Benefit 1 */}
            <div className="card">
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>🎯</div>
              <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600' }}>No cameras</h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6' }}>
                We monitor motion patterns, not people. Privacy and independence come first.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="card">
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>⚡</div>
              <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600' }}>No wearables</h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6' }}>
                Nothing to wear, charge, or lose. Works quietly in the background.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="card">
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>🔒</div>
              <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600' }}>Privacy-first</h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6' }}>
                Encrypted. No third-party access. No ads. Your data is yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS SECTION ========== */}
      <section style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>How it works</h2>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Step 1 */}
            <div style={{ marginBottom: '40px', display: 'flex', gap: '24px' }}>
              <div style={{ minWidth: '40px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#10b981', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '16px' }}>
                  1
                </div>
              </div>
              <div>
                <h3 style={{ marginBottom: '8px' }}>Install sensors</h3>
                <p style={{ fontSize: '15px', color: '#6b7280' }}>
                  Small motion sensors in bedroom, bathroom, living room. Takes about 30-60 minutes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ marginBottom: '40px', display: 'flex', gap: '24px' }}>
              <div style={{ minWidth: '40px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#10b981', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '16px' }}>
                  2
                </div>
              </div>
              <div>
                <h3 style={{ marginBottom: '8px' }}>System learns routines</h3>
                <p style={{ fontSize: '15px', color: '#6b7280' }}>
                  Over a week, AI learns normal patterns—when they wake, sleep, shower. Adapts to their schedule.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ minWidth: '40px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#10b981', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '16px' }}>
                  3
                </div>
              </div>
              <div>
                <h3 style={{ marginBottom: '8px' }}>You get alerts when needed</h3>
                <p style={{ fontSize: '15px', color: '#6b7280' }}>
                  Receive alerts only for real concerns—falls, prolonged inactivity, unusual patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRIVACY SECTION ========== */}
      <section style={{ paddingTop: '60px', paddingBottom: '60px', backgroundColor: '#f0f9ff', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Your privacy matters</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ minWidth: '24px', marginTop: '2px', color: '#10b981', fontWeight: 'bold' }}>✓</div>
                <div>
                  <p style={{ color: '#1f2937', fontWeight: '500', marginBottom: '4px' }}>Data stays local</p>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    We process everything locally or on encrypted servers. Not shared with third parties.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ minWidth: '24px', marginTop: '2px', color: '#10b981', fontWeight: 'bold' }}>✓</div>
                <div>
                  <p style={{ color: '#1f2937', fontWeight: '500', marginBottom: '4px' }}>No ads, no selling</p>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    We don't profile users or sell data. You're the customer, not the product.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ minWidth: '24px', marginTop: '2px', color: '#10b981', fontWeight: 'bold' }}>✓</div>
                <div>
                  <p style={{ color: '#1f2937', fontWeight: '500', marginBottom: '4px' }}>You're in control</p>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    Cancel anytime. Delete your data anytime. No lock-in contracts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '24px' }}>Ready to get early access?</h2>
            <p style={{ fontSize: '16px', marginBottom: '32px', color: '#6b7280' }}>
              We're building SafeHome with early adopters. Get on the list and help shape the future of elder care.
            </p>
            <div style={{ marginBottom: '16px' }}>
              <Link href="/onboarding">
                <Button className="button-primary" style={{ fontSize: '16px' }}>
                  Get Early Access
                </Button>
              </Link>
            </div>
            <p className="trust-signal">
              Limited pilot spots available. Setup takes about 30–60 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ paddingTop: '40px', paddingBottom: '40px', borderTop: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>Questions?</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Email us at <a href="mailto:support@linkrytech.com" style={{ color: '#2563eb' }}>support@linkrytech.com</a>
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>Resources</h3>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link href="/pre-install-guide" style={{ fontSize: '14px', color: '#2563eb' }}>
                    Installation guide
                  </Link>
                </li>
                <li>
                  <Link href="/login" style={{ fontSize: '14px', color: '#2563eb' }}>
                    Sign in
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>
              © 2026 Linkry Tech. Building trust in elder care technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
