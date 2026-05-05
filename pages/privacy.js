export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="legal-content">
        <p className="eyebrow">MVP legal draft</p>
        <h1>Privacy Policy</h1>
        <p className="legal-date">Effective Date: May 5, 2026</p>

        <section>
          <h2>Introduction</h2>
          <p>SafeHome (by Linkry Tech) provides privacy-first elderly home safety monitoring.</p>
        </section>

        <section>
          <h2>Data Collection</h2>
          <p>We may collect:</p>
          <ul>
            <li>Account information (email, name)</li>
            <li>Onboarding information (address, elder profile)</li>
            <li>Device setup information</li>
            <li>De-identified activity data such as presence, motion, in-bed status, room location, and timestamps</li>
          </ul>
        </section>

        <section>
          <h2>Privacy Approach</h2>
          <ul>
            <li>We do NOT use cameras or audio recording</li>
            <li>When possible, raw device data stays local via Home Assistant</li>
            <li>Only standardized activity signals are sent to the cloud</li>
          </ul>
        </section>

        <section>
          <h2>Data Usage</h2>
          <p>We use data only for:</p>
          <ul>
            <li>Safety monitoring</li>
            <li>Behavior pattern learning</li>
            <li>Alert notifications</li>
            <li>Account access</li>
            <li>Customer support</li>
          </ul>
        </section>

        <section>
          <h2>Data Sharing</h2>
          <ul>
            <li>We do NOT sell personal information</li>
            <li>We do NOT share data with third parties except when legally required</li>
          </ul>
        </section>

        <section>
          <h2>User Rights</h2>
          <p>Users may request:</p>
          <ul>
            <li>Access to their data</li>
            <li>Correction</li>
            <li>Deletion</li>
          </ul>
        </section>

        <section>
          <h2>Contact</h2>
          <p>support@linkrytech.com</p>
        </section>
      </div>
    </div>
  )
}
