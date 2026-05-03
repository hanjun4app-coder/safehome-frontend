import Link from 'next/link'
import Button from '../components/Button'

export default function LandingPage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #F7F9FB 0%, #EEF4FA 100%)' }} className="min-h-screen">
      {/* Hero Section - Premium Design */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center">
        {/* Emotional Trigger */}
        <p className="text-text-light mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
          Most families only realize something is wrong after it's too late.
        </p>

        {/* Trust Badge */}
        <div className="mb-12 inline-block">
          <div className="badge badge-success flex items-center gap-2 px-6 py-3">
            <span className="text-accent font-semibold">✓ Privacy Protected</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-text mb-8 leading-tight max-w-4xl mx-auto">
          Keep your loved one safe at home
          <span className="text-primary"> — without cameras</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-text-light mb-12 leading-relaxed max-w-3xl mx-auto">
          We help you notice when something might be wrong — early.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/onboarding">
            <Button className="button-primary px-8 py-4 text-lg font-semibold">See how this works for your family →</Button>
          </Link>
          <Link href="/pre-install-guide">
            <Button className="button-secondary px-8 py-4 text-lg font-semibold">
              See what's involved →
            </Button>
          </Link>
        </div>

        {/* Hero Stats / Social Proof */}
        <div className="grid grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto pt-12 border-t border-border">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">0</div>
            <div className="text-sm text-text-light">Cameras in your home</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-text-light">Data encrypted</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30-60</div>
            <div className="text-sm text-text-light">Min to install</div>
          </div>
        </div>

        {/* Social Proof */}
        <p className="text-sm text-text-lighter mt-12">
          Trusted by local families during our pilot phase
        </p>
      </section>

      {/* Core Benefits - Card Design */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-16 text-center">Why families choose us</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Benefit Card 1 */}
          <div className="card card-lg">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6" style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
              <span className="text-3xl">🚫</span>
            </div>
            <h3 className="text-xl font-bold text-text mb-4">No cameras</h3>
            <p className="text-text-light leading-relaxed">
              We monitor only activity patterns, not people. Your loved one's dignity and privacy are fully protected.
            </p>
          </div>

          {/* Benefit Card 2 */}
          <div className="card card-lg">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6" style={{ backgroundColor: 'rgba(111, 207, 151, 0.1)' }}>
              <span className="text-3xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-text mb-4">No wearable devices</h3>
            <p className="text-text-light leading-relaxed">
              Nothing to wear, charge, or lose. The system works silently in the background, zero burden.
            </p>
          </div>

          {/* Benefit Card 3 */}
          <div className="card card-lg">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6" style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
              <span className="text-3xl">🔐</span>
            </div>
            <h3 className="text-xl font-bold text-text mb-4">Privacy-first</h3>
            <p className="text-text-light leading-relaxed">
              All data encrypted. No third-party access. No ads. Your data is yours alone.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Design */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-16 text-center">How it works</h2>

        <div className="space-y-12 max-w-3xl mx-auto">
          {/* Step 1 */}
          <div className="flex gap-8">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white font-bold text-xl mb-3 shadow-md">
                1
              </div>
              <div className="w-1 h-16 bg-primary opacity-20"></div>
            </div>
            <div className="pb-8 pt-2">
              <h3 className="text-xl font-bold text-text mb-3">Install small sensors</h3>
              <p className="text-text-light leading-relaxed mb-4">
                Tiny motion sensors go in bedroom, bathroom, and living areas. Our installer handles everything. Takes about 30-60 minutes.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-primary inline-block">
                ℹ️ WiFi connection required
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-8">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white font-bold text-xl mb-3 shadow-md">
                2
              </div>
              <div className="w-1 h-16 bg-primary opacity-20"></div>
            </div>
            <div className="pb-8 pt-2">
              <h3 className="text-xl font-bold text-text mb-3">System learns daily routine</h3>
              <p className="text-text-light leading-relaxed mb-4">
                Over 7 days, the AI learns normal patterns—when they wake, sleep, shower, and use the bathroom. It adapts to their unique schedule.
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800 inline-block">
                💡 More alerts during learning week (normal)
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-8">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent text-white font-bold text-xl shadow-md">
                3
              </div>
            </div>
            <div className="pt-2">
              <h3 className="text-xl font-bold text-text mb-3">You get alerts only when needed</h3>
              <p className="text-text-light leading-relaxed mb-4">
                After learning, you receive alerts only for genuine concerns—prolonged inactivity, bathroom falls, unexpected patterns. Peace of mind without noise.
              </p>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3 text-sm text-green-800 inline-block">
                ✓ Alerts go to your phone, email, and dashboard
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ backgroundColor: 'var(--color-background-light)' }} className="border-t border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="card card-lg max-w-3xl mx-auto" style={{ background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.03) 0%, rgba(111, 207, 151, 0.03) 100%)', borderColor: 'var(--color-primary)' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-8">Questions about privacy? You should be.</h2>
            <div className="space-y-5 text-text-light mb-8">
              <div className="flex gap-4">
                <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                <div><strong className="text-text">Your data stays with you.</strong> We process everything locally or on encrypted servers.</div>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                <div><strong className="text-text">We never use your data for ads.</strong> No profiling, no selling, no tracking.</div>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-bold text-xl flex-shrink-0">✓</span>
                <div><strong className="text-text">You're in control.</strong> Delete data anytime. Cancel anytime. No long contracts.</div>
              </div>
            </div>
            <p className="text-sm text-text-lighter italic">
              We'd rather be boring about privacy than revolutionary. It's just the right thing to do.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">Ready to get started?</h2>
        <p className="text-lg text-text-light mb-10 max-w-2xl mx-auto">
          Join our pilot program and give your family peace of mind.
        </p>
        <Link href="/onboarding">
          <Button className="button-primary px-8 py-4 text-lg font-semibold">Get Started →</Button>
        </Link>
      </section>

      {/* Footer Section */}
      <section style={{ backgroundColor: 'var(--color-background)' }} className="border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 pb-12 border-b border-border">
            <div>
              <h3 className="font-semibold text-text mb-4">Have questions?</h3>
              <p className="text-text-light mb-2">support@safehome.com</p>
              <p className="text-text-light">(555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-4">Next steps</h3>
              <ul className="space-y-3 text-text-light">
                <li>
                  <Link href="/pre-install-guide" className="text-primary hover:text-primary-dark font-medium transition-colors">
                    Pre-installation checklist →
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
                    Already set up? Sign in →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-text-lighter pt-12">
            Keeping your loved ones safe at home, with privacy in mind. © SafeHome 2026
          </p>
        </div>
      </section>
    </div>
  )
}
