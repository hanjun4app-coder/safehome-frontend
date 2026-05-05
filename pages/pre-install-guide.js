import Link from 'next/link'
import Button from '../components/Button'

export default function PreInstallGuidePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header Section */}
        <section className="max-w-2xl mx-auto px-6 py-16 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-8 inline-block">
            Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Before installation
          </h1>
          <p className="text-xl text-gray-600 mb-3">
            A quick checklist to make sure your home is ready. Takes 5 minutes to prepare.
          </p>
          <p className="text-gray-600">
            We'll handle everything — this just helps things go faster.
          </p>
        </section>

        {/* Main Content */}
        <section className="max-w-2xl mx-auto px-6 py-12">
        {/* What You Need To Do */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Please prepare these items</h2>

          <div className="space-y-6">
            {/* Checklist Item 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-bold"></span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stable WiFi (2.4GHz preferred)</h3>
                <p className="text-gray-600 leading-relaxed">
                  The sensors communicate with our servers via WiFi. Make sure you have stable WiFi coverage in the rooms where sensors will be installed (typically bedroom, bathroom, living room).
                </p>
                <div className="mt-3 text-sm text-gray-500 bg-gray-50 p-3 rounded">
                  You'll need your WiFi password during installation
                </div>
              </div>
            </div>

            {/* Checklist Item 2 */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-bold"></span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Access to bedroom, bathroom & living room</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our installer needs to place sensors in key rooms to monitor daily activity. All rooms should be accessible and tidy.
                </p>
                <div className="mt-3 text-sm text-gray-500 bg-gray-50 p-3 rounded">
                  We don't install in private areas. Sensors detect motion, not activity details.
                </div>
              </div>
            </div>

            {/* Checklist Item 3 */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-bold"></span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Power outlets available</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sensors need to be powered. Make sure there are accessible power outlets near bedroom, bathroom, and living room areas.
                </p>
                <div className="mt-3 text-sm text-gray-500 bg-gray-50 p-3 rounded">
                  We can work with limited outlets—our installer will assess and advise
                </div>
              </div>
            </div>

            {/* Checklist Item 4 */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-bold"></span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Someone should be home during installation</h3>
                <p className="text-gray-600 leading-relaxed">
                  We need someone present to let our installer in, answer questions, and confirm the setup works properly. The process takes about 30-60 minutes.
                </p>
                <div className="mt-3 text-sm text-gray-500 bg-gray-50 p-3 rounded">
                  Our installer is trained to be respectful and efficient
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Installation timeline</h2>

          <div className="space-y-6">
            {/* Timeline Item 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-sm">
                  1
                </div>
                <div className="w-0.5 h-12 bg-blue-300"></div>
              </div>
              <div className="pb-4">
                <h3 className="font-semibold text-gray-900 mb-1">Arrival & Introduction</h3>
                <p className="text-gray-600 text-sm">5-10 min | Installer arrives, discusses plan</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-sm">
                  2
                </div>
                <div className="w-0.5 h-12 bg-blue-300"></div>
              </div>
              <div className="pb-4">
                <h3 className="font-semibold text-gray-900 mb-1">Sensor Placement</h3>
                <p className="text-gray-600 text-sm">15-20 min | Sensors installed in key rooms</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-sm">
                  3
                </div>
                <div className="w-0.5 h-12 bg-blue-300"></div>
              </div>
              <div className="pb-4">
                <h3 className="font-semibold text-gray-900 mb-1">WiFi Setup</h3>
                <p className="text-gray-600 text-sm">5-10 min | Connect sensors to your WiFi</p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-sm">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Testing & Walkthrough</h3>
                <p className="text-gray-600 text-sm">5-10 min | Test sensors, explain dashboard</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-300 text-center">
            <p className="text-lg font-semibold text-gray-900">
              Total time: 30-60 minutes
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Common questions</h2>

          <div className="space-y-8">
            {/* Q1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What if I don't have good WiFi?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Let us know during your onboarding. Our installer can assess your setup and may recommend a WiFi extender or alternative placement to ensure solid connectivity.
              </p>
            </div>

            {/* Q2 */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I reschedule if something comes up?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely. Just contact us at support@linkrytech.com. We'll work with you to find a time that fits.
              </p>
            </div>

            {/* Q3 */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Will the installer need to move furniture?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Not typically. We find discreet spots on shelves, tables, or corners. If we need to move something, we'll ask permission first.
              </p>
            </div>

            {/* Q4 */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What happens after installation?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You'll get a confirmation email with your login details. The system takes about 7 days to learn daily patterns. During this time, you may see more alerts as the AI adapts to your loved one's routine.
              </p>
            </div>

            {/* Q5 */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is my data safe?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes. All data is encrypted in transit and at rest. We don't store video or detailed activity logs—only pattern data to improve the system. No third-party access. No ads. You're always in control.
              </p>
            </div>
          </div>
        </div>

        {/* Ready Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-8 mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <span className="text-3xl"></span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            If you've gone through this checklist and your home is prepared, let's move forward with your onboarding.
          </p>
          <Link href="/onboarding">
            <Button className="px-8 py-3 text-lg">Continue to onboarding</Button>
          </Link>
        </div>

        {/* Support Section */}
        <div className="text-center py-12 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our team is here to help</p>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> support@linkrytech.com
            </p>
          </div>
        </div>
        </section>
      </div>
    </div>
  )
}
