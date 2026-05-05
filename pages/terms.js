export default function TermsOfServicePage() {
  return (
    <div className="legal-page">
      <div className="legal-content">
        <p className="eyebrow">MVP legal draft</p>
        <h1>Terms of Service</h1>

        <section>
          <h2>Service Nature</h2>
          <p>SafeHome provides assistive safety monitoring for elderly individuals.</p>
          <p>This system is not a medical device and does not guarantee prevention of incidents.</p>
          <p>Users are responsible for ensuring devices are properly installed, whether by themselves or by an installer, maintaining internet and power connectivity, and reviewing alerts provided by the system.</p>
          <p>SafeHome provides assistive monitoring and does not replace human supervision or emergency services.</p>
        </section>

        <section>
          <h2>User Responsibility</h2>
          <ul>
            <li>Proper device placement</li>
            <li>Maintaining connectivity</li>
            <li>Responding to alerts</li>
          </ul>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <ul>
            <li>Service interruptions</li>
            <li>Device failures</li>
            <li>Missed alerts</li>
            <li>Network or power outages</li>
          </ul>
        </section>

        <section>
          <h2>Emergency Disclaimer</h2>
          <p>Users must call emergency services (e.g., 911) in urgent situations.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>support@linkrytech.com</p>
        </section>
      </div>
    </div>
  )
}
