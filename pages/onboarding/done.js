import Link from 'next/link'
import Button from '../../components/Button'

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-16" style={{ backgroundColor: 'var(--color-background)', position: 'relative', zIndex: 2 }}>
      <div className="max-w-2xl mx-auto">
        {/* Success Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8 relative">
            <div className="flex items-center justify-center h-24 w-24 rounded-full mx-auto animate-float" style={{ backgroundColor: 'var(--color-accent-pale)' }}>
              <span className="text-5xl" style={{ animation: 'pulse 2s ease-in-out infinite' }}>✓</span>
            </div>
          </div>
          <p className="label-mono justify-center mb-6">
            INSTALLATION SCHEDULED
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-6" style={{ fontFamily: 'var(--font-serif)' }}>You're all set!</h1>
          <p className="text-xl text-text-soft mb-6">
            We'll contact you within 24 hours to confirm your installation.
          </p>
          <p className="text-base text-text-light">
            You can always reach us if you have questions.
          </p>
        </div>

        {/* Learning Period - Optimization 4 */}
        <div className="card card-lg mb-16" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
          <h2 className="text-2xl font-bold text-text mb-6" style={{ fontFamily: 'var(--font-serif)' }}>About Your Learning Period</h2>
          <p className="text-text-light mb-6">
            After installation, the system will take <strong>about 7 days</strong> to learn your loved one's daily patterns and routines. During this time:
          </p>
          <ul className="space-y-4 text-text-light">
            <li className="flex gap-4">
              <span className="text-warning font-bold text-lg flex-shrink-0 mt-0">•</span>
              <span>You may see more alerts than usual as the system adjusts to what's normal</span>
            </li>
            <li className="flex gap-4">
              <span className="text-warning font-bold text-lg flex-shrink-0 mt-0">•</span>
              <span>Feedback is valuable—let us know if an alert isn't relevant to you</span>
            </li>
            <li className="flex gap-4">
              <span className="text-warning font-bold text-lg flex-shrink-0 mt-0">•</span>
              <span>After the learning period, alerts become smarter and more personalized</span>
            </li>
            <li className="flex gap-4">
              <span className="text-warning font-bold text-lg flex-shrink-0 mt-0">•</span>
              <span>You're in control—you can adjust sensitivity and alert types anytime</span>
            </li>
          </ul>
        </div>

        {/* What Happens Next */}
        <div className="card card-lg mb-16">
          <h2 className="text-2xl font-bold text-text mb-8" style={{ fontFamily: 'var(--font-serif)' }}>What happens next</h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg shadow-md">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-2" style={{ fontFamily: 'var(--font-serif)' }}>We'll contact you to confirm</h3>
                <p className="text-text-light">
                  Our team will call or email you within 24 hours to confirm your installation date and time.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg shadow-md" style={{ fontFamily: 'var(--font-serif)' }}>
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-2" style={{ fontFamily: 'var(--font-serif)' }}>We'll prepare your sensors</h3>
                <p className="text-text-light">
                  Before your appointment, we'll prepare your sensors and get everything ready for installation.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg shadow-md" style={{ fontFamily: 'var(--font-serif)' }}>
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Installation day</h3>
                <p className="text-text-light">
                  Our installer will set up sensors in key rooms and make sure everything is working properly. Takes about 30-60 minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold text-lg shadow-md" style={{ fontFamily: 'var(--font-serif)' }}>
                  4
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-text mb-2" style={{ fontFamily: 'var(--font-serif)' }}>You'll get access</h3>
                <p className="text-text-light">
                  Once installation is complete and verified, we'll send you a password setup link so you can log in and monitor your loved one.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-installation Checklist */}
        <div className="card card-lg mb-16" style={{ backgroundColor: 'rgba(74, 144, 226, 0.05)', borderColor: 'rgba(74, 144, 226, 0.2)' }}>
          <h2 className="text-2xl font-bold text-text mb-8" style={{ fontFamily: 'var(--font-serif)' }}>Please prepare these items</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="text-primary font-bold text-lg flex-shrink-0 mt-0">✓</span>
              <span className="text-text-light">
                <strong className="text-text">Stable WiFi:</strong> 2.4GHz WiFi works best. Please have your WiFi password ready.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-primary font-bold text-lg flex-shrink-0 mt-0">✓</span>
              <span className="text-text-light">
                <strong className="text-text">Power outlets:</strong> Make sure power outlets are accessible in bedroom, bathroom, and living room areas.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-primary font-bold text-lg flex-shrink-0 mt-0">✓</span>
              <span className="text-text-light">
                <strong className="text-text">Room access:</strong> Our installer will need access to bedrooms, bathrooms, and living areas.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-primary font-bold text-lg flex-shrink-0 mt-0">✓</span>
              <span className="text-text-light">
                <strong className="text-text">Someone at home:</strong> Please make sure someone is home during the installation appointment.
              </span>
            </li>
          </ul>
        </div>

        {/* Email Confirmation Notice */}
        <div className="alert alert-success mb-16">
          <p>
            <strong>Check your email:</strong> We've sent a confirmation email with more details. Please check your inbox (and spam folder) for our message.
          </p>
        </div>

        {/* Support */}
        <div className="text-center border-t border-border pt-12 mb-12">
          <p className="text-text-light mb-4">Questions or need to reschedule?</p>
          <p className="text-text-light mb-6">Contact us at <strong className="text-text">support@safehome.com</strong> or <strong className="text-text">(555) 123-4567</strong></p>
        </div>

        {/* Return to Home */}
        <div className="text-center">
          <Link href="/" className="text-primary hover:text-primary-dark font-semibold transition-colors">
            ← Return to home page
          </Link>
        </div>
      </div>
    </div>
  )
}
