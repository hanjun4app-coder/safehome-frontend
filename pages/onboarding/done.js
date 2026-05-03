import Link from 'next/link'
import Button from '../../components/Button'

export default function ConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Section */}
      <div className="text-center mb-12">
        <div className="inline-block mb-6">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto">
            <span className="text-3xl">✓</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">You're all set!</h1>
        <p className="text-lg text-gray-600 mb-4">
          We'll contact you within 24 hours to confirm your installation.
        </p>
        <p className="text-sm text-gray-500">
          You can always reach us if you have questions.
        </p>
      </div>

      {/* Learning Period - Optimization 4 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About Your Learning Period</h2>
        <p className="text-gray-700 mb-4">
          After installation, the system will take <strong>about 7 days</strong> to learn your loved one's daily patterns and routines. During this time:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>You may see more alerts than usual as the system adjusts to what's normal</span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>Feedback is valuable—let us know if an alert isn't relevant to you</span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>After the learning period, alerts become smarter and more personalized</span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>You're in control—you can adjust sensitivity and alert types anytime</span>
          </li>
        </ul>
      </div>

      {/* What Happens Next */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">What happens next</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                1
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">We'll contact you to confirm</h3>
              <p className="text-gray-600">
                Our team will call or email you within 24 hours to confirm your installation date and time.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                2
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">We'll prepare your sensors</h3>
              <p className="text-gray-600">
                Before your appointment, we'll prepare your sensors and get everything ready for installation.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                3
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Installation day</h3>
              <p className="text-gray-600">
                Our installer will set up sensors in key rooms and make sure everything is working properly. Takes about 30-60 minutes.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                4
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">You'll get access</h3>
              <p className="text-gray-600">
                Once installation is complete and verified, we'll send you a password setup link so you can log in and monitor your loved one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-installation Checklist */}
      <div className="bg-blue-50 rounded-lg p-8 mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Please prepare these items</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span className="text-gray-700">
              <strong>Stable WiFi:</strong> 2.4GHz WiFi works best. Please have your WiFi password ready.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span className="text-gray-700">
              <strong>Power outlets:</strong> Make sure power outlets are accessible in bedroom, bathroom, and living room areas.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span className="text-gray-700">
              <strong>Room access:</strong> Our installer will need access to bedrooms, bathrooms, and living areas.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-0.5">✓</span>
            <span className="text-gray-700">
              <strong>Someone at home:</strong> Please make sure someone is home during the installation appointment.
            </span>
          </li>
        </ul>
      </div>

      {/* Email Confirmation Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-12">
        <p className="text-gray-700">
          <strong>Check your email:</strong> We've sent a confirmation email with more details. Please check your inbox (and spam folder) for our message.
        </p>
      </div>

      {/* Support */}
      <div className="text-center border-t border-gray-200 pt-8">
        <p className="text-gray-600 mb-4">Questions or need to reschedule?</p>
        <p className="text-gray-600 mb-4">Contact us at <strong>support@safehome.com</strong> or <strong>(555) 123-4567</strong></p>
      </div>

      {/* Return to Home */}
      <div className="text-center mt-8">
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
          Return to home page
        </Link>
      </div>
    </div>
  )
}
