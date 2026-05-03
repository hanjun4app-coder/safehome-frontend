import { useState } from 'react'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import Card from '../components/Card'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    // Step 1: About your loved one
    elderName: '',
    elderAge: '',
    livesAlone: '',
    mobilityLevel: '',
    // Step 2: Daily routine
    wakeUpTime: '07:00',
    sleepTime: '22:00',
    showerTime: '08:00',
    bathroomDuration: '15',
    nightBathroomFrequency: '1',
    // Step 3: Contact
    familyEmail: '',
    familyPhone: '',
    address: '',
    // Step 4: Safety & Installation (expanded)
    emergencyContactName: '',
    emergencyContactPhone: '',
    mainSafetyConcern: [], // Multi-select array (max 2)
    hasPets: '',
    hasRegularVisitors: '',
    regularVisitorsNotes: '',
    fallHistoryLastYear: '',
    nighttimeBathroomActivity: '',
    careNotes: '',
    preferredDate: '',
    preferredTimeWindow: '',
    installationNotes: '',
  })

  const [expandedAccordion, setExpandedAccordion] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSafetyConcernChange = (concern) => {
    setFormData((prev) => {
      const current = prev.mainSafetyConcern || []
      if (current.includes(concern)) {
        return { ...prev, mainSafetyConcern: current.filter((c) => c !== concern) }
      } else {
        // Max 2 selections
        if (current.length < 2) {
          return { ...prev, mainSafetyConcern: [...current, concern] }
        }
        return prev
      }
    })
  }

  const validateStep = (currentStep) => {
    setError('')
    if (currentStep === 1) {
      if (!formData.elderName || !formData.elderAge || !formData.livesAlone || !formData.mobilityLevel) {
        setError('Please fill in all fields')
        return false
      }
    } else if (currentStep === 2) {
      if (!formData.wakeUpTime || !formData.sleepTime || !formData.showerTime || !formData.bathroomDuration) {
        setError('Please fill in all fields')
        return false
      }
    } else if (currentStep === 3) {
      if (!formData.familyEmail || !formData.familyPhone || !formData.address) {
        setError('Please fill in all fields')
        return false
      }
      if (!formData.familyEmail.includes('@')) {
        setError('Please enter a valid email address')
        return false
      }
    } else if (currentStep === 4) {
      if (!formData.emergencyContactName || !formData.emergencyContactPhone) {
        setError('Please provide emergency contact information')
        return false
      }
      if (!formData.mainSafetyConcern || formData.mainSafetyConcern.length === 0) {
        setError('Please select at least one main safety concern')
        return false
      }
      if (!formData.preferredDate || !formData.preferredTimeWindow) {
        setError('Please select a preferred date and time window')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(step)) return

    setLoading(true)
    try {
      const response = await fetch('/api/onboarding/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          elder_name: formData.elderName,
          elder_age: parseInt(formData.elderAge),
          lives_alone: formData.livesAlone === 'yes',
          mobility_level: formData.mobilityLevel,
          family_email: formData.familyEmail,
          family_phone: formData.familyPhone,
          address: formData.address,
          wake_up_time: formData.wakeUpTime,
          sleep_time: formData.sleepTime,
          shower_time: formData.showerTime,
          bathroom_duration_minutes: parseInt(formData.bathroomDuration),
          night_bathroom_frequency: parseInt(formData.nightBathroomFrequency),
          emergency_contact_name: formData.emergencyContactName,
          emergency_contact_phone: formData.emergencyContactPhone,
          main_safety_concern: formData.mainSafetyConcern,
          has_pets: formData.hasPets === 'yes',
          has_regular_visitors: formData.hasRegularVisitors === 'yes',
          regular_visitors_notes: formData.regularVisitorsNotes || '',
          fall_history_last_year: formData.fallHistoryLastYear === 'yes',
          nighttime_bathroom_activity: formData.nighttimeBathroomActivity,
          care_notes: formData.careNotes || '',
          preferred_date: formData.preferredDate,
          preferred_time_window: formData.preferredTimeWindow,
          installation_notes: formData.installationNotes || '',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const data = await response.json()
      if (data.success) {
        router.push('/onboarding/done')
      } else {
        setError(data.message || 'Failed to submit form')
      }
    } catch (err) {
      setError('Unable to submit your information. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's get started</h1>
      <p className="text-gray-600 mb-8">We'll need some information to set up your system. Step {step} of 4.</p>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-12">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              s <= step ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: About your loved one */}
        {step === 1 && (
          <Card title="About your loved one">
            <p className="text-gray-600 mb-6">
              We're setting up your home safety profile.
            </p>
            <Input
              label="Name"
              name="elderName"
              value={formData.elderName}
              onChange={handleInputChange}
              placeholder="e.g., Mom, Dad, Grandpa"
              required
            />
            <Input
              label="Age"
              name="elderAge"
              type="number"
              value={formData.elderAge}
              onChange={handleInputChange}
              placeholder="e.g., 75"
              required
            />
            <Select
              label="Lives alone?"
              name="livesAlone"
              value={formData.livesAlone}
              onChange={handleInputChange}
              options={[
                { value: 'yes', label: 'Yes, lives alone' },
                { value: 'no', label: 'No, lives with others' },
              ]}
              required
            />
            <Select
              label="Mobility level"
              name="mobilityLevel"
              value={formData.mobilityLevel}
              onChange={handleInputChange}
              options={[
                { value: 'independent', label: 'Independent (walks without assistance)' },
                { value: 'needs_assistance', label: 'Needs assistance (uses cane, walker, or help)' },
                { value: 'limited', label: 'Limited (mostly in one room)' },
              ]}
              required
            />
          </Card>
        )}

        {/* Step 2: Daily routine */}
        {step === 2 && (
          <Card title="Daily routine">
            <Input
              label="Wake up time"
              name="wakeUpTime"
              type="time"
              value={formData.wakeUpTime}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Sleep time"
              name="sleepTime"
              type="time"
              value={formData.sleepTime}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Shower time"
              name="showerTime"
              type="time"
              value={formData.showerTime}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Bathroom duration (minutes)"
              name="bathroomDuration"
              type="number"
              value={formData.bathroomDuration}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Night bathroom visits per night (average)"
              name="nightBathroomFrequency"
              type="number"
              value={formData.nightBathroomFrequency}
              onChange={handleInputChange}
              required
            />
          </Card>
        )}

        {/* Step 3: Contact information */}
        {step === 3 && (
          <Card title="Contact information">
            <Input
              label="Email address"
              name="familyEmail"
              type="email"
              value={formData.familyEmail}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
            />
            <Input
              label="Phone number"
              name="familyPhone"
              type="tel"
              value={formData.familyPhone}
              onChange={handleInputChange}
              placeholder="555-123-4567"
              required
            />
            <Input
              label="Home address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Main St, City, State"
              required
            />
          </Card>
        )}

        {/* Step 4: Safety & Installation */}
        {step === 4 && (
          <Card title="Final setup details">
            {/* Trust-building copy - Optimization 3 */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Why these questions:</strong> These help us reduce false alerts and better understand your loved one's routine. Everything you share stays private and secure.
              </p>
            </div>

            {/* Time reassurance */}
            <p className="text-sm text-gray-600 mb-8">
              <strong>This only takes about 1 minute.</strong>
            </p>

            {/* Required Fields Section */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Emergency Information</h3>

              <Input
                label="Emergency contact name"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                placeholder="e.g., John, Sarah"
                required
              />
              <Input
                label="Emergency contact phone"
                name="emergencyContactPhone"
                type="tel"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                placeholder="555-123-4567"
                required
              />

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Safety Concern</h3>
                <div className="space-y-3 mb-3">
                  {[
                    { value: 'falls', label: 'Fall risk' },
                    { value: 'inactivity', label: 'Long periods of inactivity' },
                    { value: 'bathroom', label: 'Bathroom safety' },
                    { value: 'no_response', label: 'Not responding to calls/alerts' },
                    { value: 'other', label: 'Other' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.mainSafetyConcern.includes(option.value)}
                        onChange={() => handleSafetyConcernChange(option.value)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Select up to 2 that apply most</p>

                {/* User control/agency copy - Optimization 5 */}
                <p className="text-sm text-gray-600 mt-4 italic">
                  💡 We'll prioritize alerts based on what matters most to you and customize them to your family's needs.
                </p>
              </div>
            </div>

            {/* Optional Fields - Accordion - Optimization 1 */}
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setExpandedAccordion(!expandedAccordion)}
                className="flex items-center justify-between w-full py-4 px-0 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                <span>Home Details (Optional)</span>
                <span className="text-lg">{expandedAccordion ? '−' : '+'}</span>
              </button>

              {expandedAccordion && (
                <div className="pt-4 space-y-6 border-t border-gray-200">
                  <Select
                    label="Do you have pets?"
                    name="hasPets"
                    value={formData.hasPets}
                    onChange={handleInputChange}
                    options={[
                      { value: '', label: 'Select...' },
                      { value: 'yes', label: 'Yes, we have pets' },
                      { value: 'no', label: 'No pets' },
                    ]}
                  />

                  <Select
                    label="Do you have regular visitors?"
                    name="hasRegularVisitors"
                    value={formData.hasRegularVisitors}
                    onChange={handleInputChange}
                    options={[
                      { value: '', label: 'Select...' },
                      { value: 'yes', label: 'Yes, regular visitors (family, caregiver, etc)' },
                      { value: 'no', label: 'No regular visitors' },
                    ]}
                  />

                  {formData.hasRegularVisitors === 'yes' && (
                    <Input
                      label="Who visits and how often?"
                      name="regularVisitorsNotes"
                      value={formData.regularVisitorsNotes}
                      onChange={handleInputChange}
                      placeholder="e.g., Daughter on weekends, home care nurse 3x/week"
                    />
                  )}

                  <Select
                    label="Fall history in the past year?"
                    name="fallHistoryLastYear"
                    value={formData.fallHistoryLastYear}
                    onChange={handleInputChange}
                    options={[
                      { value: '', label: 'Select...' },
                      { value: 'yes', label: 'Yes, one or more falls' },
                      { value: 'no', label: 'No falls' },
                    ]}
                  />

                  <Select
                    label="Nighttime bathroom activity"
                    name="nighttimeBathroomActivity"
                    value={formData.nighttimeBathroomActivity}
                    onChange={handleInputChange}
                    options={[
                      { value: '', label: 'Select...' },
                      { value: 'rarely', label: 'Rarely (0-1 times)' },
                      { value: 'sometimes', label: 'Sometimes (1-2 times)' },
                      { value: 'frequently', label: 'Frequently (2+ times)' },
                      { value: 'unsure', label: 'Unsure' },
                    ]}
                  />

                  <Input
                    label="Any other care notes?"
                    name="careNotes"
                    value={formData.careNotes}
                    onChange={handleInputChange}
                    placeholder="e.g., Uses walker, has dementia, takes sleeping medication"
                  />
                </div>
              )}
            </div>

            {/* Installation Details */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Installation Scheduling</h3>

              <Input
                label="Preferred installation date"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleInputChange}
                required
              />
              <Select
                label="Preferred time window"
                name="preferredTimeWindow"
                value={formData.preferredTimeWindow}
                onChange={handleInputChange}
                options={[
                  { value: '', label: 'Select...' },
                  { value: 'morning', label: 'Morning (8am - 12pm)' },
                  { value: 'afternoon', label: 'Afternoon (12pm - 5pm)' },
                  { value: 'evening', label: 'Evening (5pm - 8pm)' },
                ]}
                required
              />
              <Input
                label="Special notes or requests"
                name="installationNotes"
                value={formData.installationNotes}
                onChange={handleInputChange}
                placeholder="e.g., Please be quiet, has a pet dog, etc."
              />
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="secondary">
              Back
            </Button>
          )}
          {step < 4 && (
            <Button onClick={handleNext} className="ml-auto">
              Next
            </Button>
          )}
          {step === 4 && (
            <Button type="submit" disabled={loading} className="ml-auto">
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
