import Link from 'next/link'
import Button from '../components/Button'

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen">
      {/* Hero Section - Premium Design */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        {/* Emotional Trigger */}
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          Most families only realize something is wrong after it's too late.
        </p>

        {/* Trust Badge */}
        <div className="mb-8 inline-block">
          <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2 flex items-center gap-2">
            <span className="text-green-600 text-sm font-semibold">✓ Privacy Protected</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Keep your loved one safe at home
          <span className="text-blue-600"> — without cameras</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          We help you notice when something might be wrong — early.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/onboarding">
            <Button className="px-8 py-3 text-lg">See how this works for your family →</Button>
          </Link>
          <Link href="/pre-install-guide">
            <Button variant="secondary" className="px-8 py-3 text-lg">
              See what's involved →
            </Button>
          </Link>
        </div>

        {/* Hero Stats / Social Proof */}
        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto pt-8 border-t border-gray-200">
          <div>
            <div className="text-3xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Cameras in your home</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Data encrypted</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">30-60</div>
            <div className="text-sm text-gray-600">Min to install</div>
          </div>
        </div>

        {/* Social Proof */}
        <p className="text-sm text-gray-500 mt-8">
          Trusted by local families during our pilot phase
        </p>
      </section>

      {/* Core Benefits - Card Design */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why families choose us</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Benefit Card 1 */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 mb-4">
              <span className="text-2xl">🚫</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No cameras</h3>
            <p className="text-gray-600 leading-relaxed">
              We monitor only activity patterns, not people. Your loved one's dignity and privacy are fully protected.
            </p>
          </div>

          {/* Benefit Card 2 */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No wearable devices</h3>
            <p className="text-gray-600 leading-relaxed">
              Nothing to wear, charge, or lose. The system works silently in the background, zero burden.
            </p>
          </div>

          {/* Benefit Card 3 */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy-first</h3>
            <p className="text-gray-600 leading-relaxed">
              All data encrypted. No third-party access. No ads. Your data is yours alone.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Design */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How it works</h2>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white font-bold text-lg mb-2">
                1
              </div>
              <div className="w-1 h-12 bg-blue-200"></div>
            </div>
            <div className="pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Install small sensors</h3>
              <p className="text-gray-600 leading-relaxed">
                Tiny motion sensors go in bedroom, bathroom, and living areas. Our installer handles everything. Takes about 30-60 minutes.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                ℹ️ WiFi connection required
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white font-bold text-lg mb-2">
                2
              </div>
              <div className="w-1 h-12 bg-blue-200"></div>
            </div>
            <div className="pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">System learns daily routine</h3>
              <p className="text-gray-600 leading-relaxed">
                Over 7 days, the AI learns normal patterns—when they wake, sleep, shower, and use the bathroom. It adapts to their unique schedule.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                💡 More alerts during learning week (normal)
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white font-bold text-lg">
                3
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You get alerts only when needed</h3>
              <p className="text-gray-600 leading-relaxed">
                After learning, you receive alerts only for genuine concerns—prolonged inactivity, bathroom falls, unexpected patterns. Peace of mind without noise.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                ✓ Alerts go to your phone, email, and dashboard
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions about privacy? You should be.</h2>
            <div className="space-y-4 text-gray-700 mb-6">
              <div className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Your data stays with you.</strong> We process everything locally or on encrypted servers.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>We never use your data for ads.</strong> No profiling, no selling, no tracking.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>You're in control.</strong> Delete data anytime. Cancel anytime. No long contracts.</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">
              We'd rather be boring about privacy than revolutionary. It's just the right thing to do.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Join our pilot program and give your family peace of mind.
        </p>
        <Link href="/onboarding">
          <Button className="px-8 py-3 text-lg">Get Started</Button>
        </Link>
      </section>

      {/* Footer Section */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 pb-12 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Have questions?</h3>
              <p className="text-gray-600 mb-2">support@safehome.com</p>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Next steps</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/pre-install-guide" className="text-blue-600 hover:text-blue-700 font-medium">
                    Pre-installation checklist →
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Already set up? Sign in →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 pt-8">
            Keeping your loved ones safe at home, with privacy in mind. © SafeHome 2026
          </p>
        </div>
      </section>
    </div>
  )
}
