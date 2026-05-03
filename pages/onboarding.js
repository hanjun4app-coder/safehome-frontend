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
    <div className="container mx-auto px-4 py-16" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">Let's get started</h1>
        <p className="text-text-light mb-12">We'll need some information to set up your system. <span className="font-semibold">Step {step} of 4</span></p>

        {/* Progress Indicator */}
        <div className="mb-16">
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(step / 4) * 100}%`, backgroundColor: 'var(--color-primary)' }}
              ></div>
            </div>

            <div className="progress-steps flex justify-between mt-6">
              {[
                { step: 1, label: 'Family Info' },
                { step: 2, label: 'Daily Routine' },
                { step: 3, label: 'Contact' },
                { step: 4, label: 'Safety' }
              ].map((item) => (
                <div
                  key={item.step}
                  className="progress-step flex flex-col items-center text-center"
                  style={{
                    opacity: item.step <= step ? 1 : 0.5
                  }}
                >
                  <div
                    className="step-number rounded-full w-10 h-10 flex items-center justify-center font-semibold mb-2 transition-all"
                    style={{
                      backgroundColor: item.step <= step ? 'var(--color-primary)' : 'var(--color-border)',
                      color: item.step <= step ? 'white' : 'var(--color-text-lighter)',
                      borderRadius: '9999px'
                    }}
                  >
                    {item.step < step ? '✓' : item.step}
                  </div>
                  <span className="step-label text-xs font-medium" style={{ color: item.step <= step ? 'var(--color-primary)' : 'var(--color-text-lighter)' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mb-8">
            {error}
          </div>
        )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: About your loved one */}
        {step === 1 && (
          <div className="card card-lg">
            <div className="card-header">
              <h2 className="card-title">About your loved one</h2>
            </div>
            <div className="card-body">
              <p className="text-text-light mb-8">
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
            </div>
          </div>
        )}

        {/* Step 2: Daily routine */}
        {step === 2 && (
          <div className="card card-lg">
            <div className="card-header">
              <h2 className="card-title">Daily routine</h2>
            </div>
            <div className="card-body">
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
            </div>
          </div>
        )}

        {/* Step 3: Contact information */}
        {step === 3 && (
          <div className="card card-lg">
            <div className="card-header">
              <h2 className="card-title">Contact information</h2>
            </div>
            <div className="card-body">
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
            </div>
          </div>
        )}

        {/* Step 4: Safety & Installation */}
        {step === 4 && (
          <div className="card card-lg">
            <div className="card-header">
              <h2 className="card-title">Final setup details</h2>
            </div>
            <div className="card-body">
              {/* Trust-building copy - Optimization 3 */}
              <div className="alert alert-info mb-8">
                <p className="text-sm">
                  <strong>Why these questions:</strong> These help us reduce false alerts and better understand your loved one's routine. Everything you share stays private and secure.
                </p>
              </div>

              {/* Time reassurance */}
              <p className="text-sm text-text-light mb-8 font-medium">
                ⏱️ This only takes about 1 minute.
              </p>

              {/* Required Fields Section */}
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="text-lg font-semibold text-text mb-6">Emergency Information</h3>

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
                  <h3 className="text-lg font-semibold text-text mb-6">Main Safety Concern</h3>
                  <div className="space-y-4 mb-6">
                    {[
                      { value: 'falls', label: 'Fall risk' },
                      { value: 'inactivity', label: 'Long periods of inactivity' },
                      { value: 'bathroom', label: 'Bathroom safety' },
                      { value: 'no_response', label: 'Not responding to calls/alerts' },
                      { value: 'other', label: 'Other' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.mainSafetyConcern.includes(option.value)}
                          onChange={() => handleSafetyConcernChange(option.value)}
                          className="w-5 h-5 rounded accent-primary cursor-pointer"
                        />
                        <span className="text-text-light font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-text-lighter mt-4 mb-4">Select up to 2 that apply most</p>

                  {/* User control/agency copy - Optimization 5 */}
                  <div className="bg-accent bg-opacity-5 border border-accent border-opacity-20 rounded-lg p-4">
                    <p className="text-sm text-text-light">
                      💡 We'll prioritize alerts based on what matters most to you and customize them to your family's needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Optional Fields - Accordion - Optimization 1 */}
              <div className="mb-8">
                <button
                  type="button"
                  onClick={() => setExpandedAccordion(!expandedAccordion)}
                  className="flex items-center justify-between w-full py-4 px-0 font-semibold text-text hover:text-primary transition-colors"
                >
                  <span>Home Details (Optional)</span>
                  <span className="text-lg" style={{ color: 'var(--color-primary)' }}>{expandedAccordion ? '−' : '+'}</span>
                </button>

                {expandedAccordion && (
                <div className="pt-6 space-y-6 border-t border-border">
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
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="text-lg font-semibold text-text mb-6">Installation Scheduling</h3>

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
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-12">
          {step > 1 && (
            <Button onClick={handlePrevious} className="button-secondary">
              ← Back
            </Button>
          )}
          {step < 4 && (
            <Button onClick={handleNext} className="button-primary ml-auto">
              Next →
            </Button>
          )}
          {step === 4 && (
            <Button type="submit" disabled={loading} className="button-primary ml-auto" style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Submitting...' : 'Complete Setup'}
            </Button>
          )}
        </div>
      </form>
      </div>
    </div>
  )
}
