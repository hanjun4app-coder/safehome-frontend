import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Card from '../components/Card'
import Button from '../components/Button'
import { getApiUrl, readApiJson } from '../lib/api'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [installations, setInstallations] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [devices, setDevices] = useState([])
  const [error, setError] = useState('')
  const [selectedTab, setSelectedTab] = useState('pending')
  const [deviceMessage, setDeviceMessage] = useState('')
  const [deviceSaving, setDeviceSaving] = useState(false)
  const [selectedFamilyId, setSelectedFamilyId] = useState('')
  const [selectedElderId, setSelectedElderId] = useState('')
  const [customerSearch, setCustomerSearch] = useState('')
  const [deviceForm, setDeviceForm] = useState({
    room: 'bathroom',
    device_type: 'aqara_fp2',
    device_name: '',
    device_id: '',
    notes: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchAdminData()
  }, [selectedTab])

  const roomOptions = [
    { value: 'bathroom', label: 'Bathroom' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'living_room', label: 'Living Room' },
    { value: 'hallway', label: 'Hallway' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'other', label: 'Other' },
  ]

  const deviceTypeOptions = [
    { value: 'aqara_fp2', label: 'Aqara FP2 / Presence Sensor' },
    { value: 'bed_sensor', label: 'Bed Sensor' },
    { value: 'radar', label: 'Radar Motion Sensor' },
    { value: 'door_contact', label: 'Door / Contact Sensor' },
    { value: 'generic', label: 'Generic Sensor' },
  ]

  const fetchAdminData = async () => {
    setLoading(true)
    await Promise.all([fetchInstallations(), fetchOnboardingSubmissions()])
    setLoading(false)
  }

  const fetchOnboardingSubmissions = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/api/admin/onboarding-submissions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 401 || response.status === 403) {
        router.push('/login')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch onboarding submissions')
      }

      const data = await readApiJson(response, 'Unable to load onboarding submissions')
      setSubmissions(data.submissions || [])
    } catch (err) {
      setError('Unable to load onboarding submissions')
      console.error(err)
    }
  }

  useEffect(() => {
    if (!selectedFamilyId && submissions.length > 0) {
      const firstReadySubmission = submissions.find((submission) => submission.runtime_family_id && submission.runtime_elder_id)
      if (firstReadySubmission) {
        setSelectedFamilyId(firstReadySubmission.runtime_family_id)
        setSelectedElderId(firstReadySubmission.runtime_elder_id)
      }
    }
  }, [submissions, selectedFamilyId])

  useEffect(() => {
    if (selectedFamilyId) {
      fetchDevices(selectedFamilyId)
    }
  }, [selectedFamilyId])

  const familyOptions = submissions
    .filter((submission) => submission.runtime_family_id)
    .reduce((families, submission) => {
      if (!families.some((family) => family.family_id === submission.runtime_family_id)) {
        families.push({
          family_id: submission.runtime_family_id,
          label: submission.customer_email || submission.runtime_family_id,
          customer_email: submission.customer_email || '',
          elder_name: submission.elder_name || '',
        })
      }
      return families
    }, [])

  const searchableInstallations = submissions
    .filter((submission) => submission.runtime_family_id && submission.runtime_elder_id)
    .filter((submission) => {
      const search = customerSearch.trim().toLowerCase()
      if (!search) return true
      return [
        submission.customer_email,
        submission.elder_name,
        submission.runtime_family_id,
      ].some((value) => String(value || '').toLowerCase().includes(search))
    })

  const elderOptions = submissions
    .filter((submission) => submission.runtime_family_id === selectedFamilyId && submission.runtime_elder_id)
    .map((submission) => ({
      elder_id: submission.runtime_elder_id,
      label: submission.elder_name || submission.runtime_elder_id,
    }))

  const selectedSubmission = submissions.find(
    (submission) => submission.runtime_family_id === selectedFamilyId && submission.runtime_elder_id === selectedElderId
  )

  const getRoomLabel = (value) => roomOptions.find((room) => room.value === value)?.label || value || 'Room not set'
  const getDeviceTypeLabel = (value) => deviceTypeOptions.find((deviceType) => deviceType.value === value)?.label || value || 'Device type not set'
  const hasBeenTested = (device) => Boolean(device.last_test_result)

  const fetchDevices = async (familyId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/api/admin/devices?family_id=${encodeURIComponent(familyId)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch devices')
      }

      const data = await readApiJson(response, 'Unable to load devices for this customer.')
      setDevices(data.devices || [])
    } catch (err) {
      setDeviceMessage('Unable to load devices for this customer.')
      console.error(err)
    }
  }

  const handleDeviceFieldChange = (field, value) => {
    setDeviceForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleFamilyChange = (familyId) => {
    setSelectedFamilyId(familyId)
    const matchingElders = submissions.filter((submission) => submission.runtime_family_id === familyId && submission.runtime_elder_id)
    setSelectedElderId(matchingElders.length === 1 ? matchingElders[0].runtime_elder_id : '')
    setDeviceMessage('')
  }

  const handleInstallationSelect = (submission) => {
    setSelectedFamilyId(submission.runtime_family_id)
    setSelectedElderId(submission.runtime_elder_id)
    setCustomerSearch(submission.customer_email || submission.elder_name || '')
    setDeviceMessage('')
  }

  const handleAddDevice = async (event) => {
    event.preventDefault()
    setDeviceMessage('')

    if (!selectedFamilyId || !selectedElderId || !deviceForm.device_id || !deviceForm.device_name) {
      setDeviceMessage('Please choose a customer, choose an elder, and enter the device name and ID.')
      return
    }

    setDeviceSaving(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/api/admin/devices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          family_id: selectedFamilyId,
          elder_id: selectedElderId,
          room: deviceForm.room,
          device_type: deviceForm.device_type,
          device_name: deviceForm.device_name,
          device_id: deviceForm.device_id,
          notes: deviceForm.notes,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add device')
      }

      await fetchDevices(selectedFamilyId)
      setDeviceMessage('Device added. You can test it now.')
    } catch (err) {
      setDeviceMessage('Unable to add device. Check the fields and try again.')
      console.error(err)
    } finally {
      setDeviceSaving(false)
    }
  }

  const handleTestDevice = async (deviceId = deviceForm.device_id) => {
    setDeviceMessage('')

    if (!selectedFamilyId || !deviceId) {
      setDeviceMessage('Choose a customer and device first.')
      return
    }

    setDeviceSaving(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/api/admin/devices/${encodeURIComponent(deviceId)}/test`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ family_id: selectedFamilyId }),
      })

      if (!response.ok) {
        throw new Error('Failed to test device')
      }

      await fetchDevices(selectedFamilyId)
      setDeviceMessage('Device test successful.')
    } catch (err) {
      setDeviceMessage('Device test failed. Check the device ID and try again.')
      console.error(err)
    } finally {
      setDeviceSaving(false)
    }
  }

  const handleMarkSetupComplete = async () => {
    if (!selectedSubmission) {
      setDeviceMessage('Choose a customer before marking setup complete.')
      return
    }

    setDeviceSaving(true)
    setDeviceMessage('')
    try {
      const token = localStorage.getItem('token')
      if (selectedSubmission.installation_status === 'pending') {
        const confirmResponse = await fetch(`${getApiUrl()}/api/admin/installations/${selectedSubmission.id}/confirm`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (!confirmResponse.ok) {
          throw new Error('Failed to schedule setup')
        }
      }

      const roomMapping = devices.reduce((mapping, device) => {
        mapping[device.device_id] = device.room
        return mapping
      }, {})

      const completeResponse = await fetch(`${getApiUrl()}/api/admin/installations/${selectedSubmission.id}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: devices.map((device) => device.device_id),
          notes: 'Device setup completed from admin page.',
          room_mapping: roomMapping,
        }),
      })

      if (!completeResponse.ok) {
        throw new Error('Failed to complete setup')
      }

      await fetchAdminData()
      setDeviceMessage('Setup marked complete.')
    } catch (err) {
      setDeviceMessage('Unable to mark setup complete. Please try again.')
      console.error(err)
    } finally {
      setDeviceSaving(false)
    }
  }

  const fetchInstallations = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/api/admin/installations?status_filter=${selectedTab}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 401 || response.status === 403) {
        router.push('/login')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch installations')
      }

      const data = await readApiJson(response, 'Unable to load installations')
      setInstallations(data.installations || [])
    } catch (err) {
      setError('Unable to load installations')
      console.error(err)
    }
  }

  const handleConfirmInstallation = async (installationId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/api/admin/installations/${installationId}/confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to confirm installation')
      }

      fetchAdminData()
      alert('Installation confirmed')
    } catch (err) {
      alert('Error confirming installation')
      console.error(err)
    }
  }

  const handleCompleteInstallation = async (installationId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/api/admin/installations/${installationId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: [],
          notes: '',
          room_mapping: {},
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to complete installation')
      }

      fetchAdminData()
      alert('Installation completed')
    } catch (err) {
      alert('Error completing installation')
      console.error(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  const tabOptions = [
    { id: 'pending', label: 'Pending Requests' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'completed', label: 'Completed' },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Installation Manager</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          Sign out
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
          Loading admin data. Device Setup is still available.
        </div>
      )}

      <section className="mb-10">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">Device Setup</h2>
          <p className="text-base text-gray-600">Follow each step to add sensors and confirm the home is ready.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-5">
          {[
            'Connect device to Home Assistant',
            'Confirm device is visible',
            'Add device',
            'Test device',
            'Repeat'
          ].map((step, index) => (
            <div key={step} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="text-sm font-bold text-blue-600 mb-2">Step {index + 1}</div>
              <p className="text-sm font-semibold text-gray-900 leading-snug">{step}</p>
            </div>
          ))}
        </div>

        <Card>
          {deviceMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-semibold">
              {deviceMessage}
            </div>
          )}

          <form onSubmit={handleAddDevice} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Choose Home</h3>
                  <p className="text-sm text-gray-600">Start by selecting the customer and elder for this installation.</p>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">Search Customer or Elder</label>
                  <input
                    value={customerSearch}
                    onChange={(event) => setCustomerSearch(event.target.value)}
                    placeholder="Search by customer email or elder name"
                    className="w-full rounded-lg border border-gray-300 px-5 py-4 text-lg text-gray-900 bg-white"
                  />
                  <p className="mt-2 text-sm text-gray-500">Search and choose the correct customer before adding a device.</p>
                </div>

                <div>
                  <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-64 overflow-y-auto bg-white">
                    {searchableInstallations.length === 0 ? (
                      <div className="p-4 text-sm text-gray-600">No matching customers found.</div>
                    ) : (
                      searchableInstallations.slice(0, 8).map((submission) => {
                        const isSelected = submission.runtime_family_id === selectedFamilyId && submission.runtime_elder_id === selectedElderId
                        return (
                          <button
                            key={`${submission.runtime_family_id}-${submission.runtime_elder_id}-${submission.id}`}
                            type="button"
                            onClick={() => handleInstallationSelect(submission)}
                            className={`w-full text-left p-4 transition-colors ${
                              isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                            }`}
                          >
                            <p className="font-semibold text-gray-900">{submission.customer_email || 'No email'}</p>
                            <p className="text-sm text-gray-600">{submission.elder_name || 'Unnamed elder'}</p>
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>

                {selectedSubmission ? (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm font-semibold text-blue-700">Installing for:</p>
                    <p className="text-lg font-bold text-gray-900">{selectedSubmission.elder_name || selectedElderId}</p>
                    <p className="text-sm text-gray-600">{selectedSubmission.customer_email}</p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <p className="text-sm font-semibold text-yellow-800">Choose a customer and elder before adding a device.</p>
                  </div>
                )}

                {elderOptions.length > 1 && (
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-2">Elder</label>
                    <select
                      value={selectedElderId}
                      onChange={(event) => setSelectedElderId(event.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-5 py-4 text-lg text-gray-900 bg-white"
                    >
                      <option value="">Choose elder</option>
                      {elderOptions.map((elder) => (
                        <option key={elder.elder_id} value={elder.elder_id}>
                          {elder.label}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-sm text-gray-500">This customer has more than one elder. Choose the correct person.</p>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Add Sensor</h3>
                  <p className="text-sm text-gray-600">Enter the sensor details exactly as they appear during setup.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-2">Room</label>
                    <select
                      value={deviceForm.room}
                      onChange={(event) => handleDeviceFieldChange('room', event.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-5 py-4 text-lg text-gray-900 bg-white"
                    >
                      {roomOptions.map((room) => (
                        <option key={room.value} value={room.value}>
                          {room.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-2">Device Type</label>
                    <select
                      value={deviceForm.device_type}
                      onChange={(event) => handleDeviceFieldChange('device_type', event.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-5 py-4 text-lg text-gray-900 bg-white"
                    >
                      {deviceTypeOptions.map((deviceType) => (
                        <option key={deviceType.value} value={deviceType.value}>
                          {deviceType.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">Device Name</label>
                  <input
                    value={deviceForm.device_name}
                    onChange={(event) => handleDeviceFieldChange('device_name', event.target.value)}
                    placeholder="Bathroom Sensor"
                    className="w-full rounded-lg border border-gray-300 px-5 py-4 text-lg text-gray-900"
                  />
                  <p className="mt-2 text-sm text-gray-500">Use a simple name the family will recognize.</p>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">Device ID</label>
                  <input
                    value={deviceForm.device_id}
                    onChange={(event) => handleDeviceFieldChange('device_id', event.target.value)}
                    placeholder="sensor_bathroom_1"
                    className="w-full rounded-lg border border-gray-300 px-5 py-4 text-lg text-gray-900"
                  />
                  <p className="mt-2 text-sm text-gray-500">Enter the device ID shown in Home Assistant or on the setup label.</p>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">Notes</label>
                  <textarea
                    value={deviceForm.notes}
                    onChange={(event) => handleDeviceFieldChange('notes', event.target.value)}
                    rows={3}
                    placeholder="Optional setup notes"
                    className="w-full rounded-lg border border-gray-300 px-5 py-4 text-lg text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-600">After adding the device, test it from the device list below.</p>
              <Button type="submit" variant="primary" disabled={deviceSaving}>
                Add Device
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Added Devices</h3>
              <span className="text-sm text-gray-500">{devices.length} total</span>
            </div>

            {devices.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 bg-gray-50">
                <p className="font-semibold text-gray-900">No devices added yet.</p>
                <p className="text-sm text-gray-600 mt-1">Choose a customer, enter the first sensor, then press Add Device.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {devices.map((device) => (
                  <div key={`${device.family_id}-${device.device_id}`} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{device.device_name || device.device_id}</p>
                        <p className="text-sm text-gray-600">{getRoomLabel(device.room)} · {getDeviceTypeLabel(device.device_type)}</p>
                        <p className="text-sm text-gray-500 mt-1">Device ID: {device.device_id}</p>
                        {device.notes && <p className="text-sm text-gray-500 mt-1">{device.notes}</p>}
                      </div>
                      <div className="md:text-right">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          hasBeenTested(device)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {hasBeenTested(device) ? 'tested' : 'not tested'}
                        </span>
                        <p className="text-sm font-medium text-gray-900 mt-2">{device.last_test_result || 'Ready for test'}</p>
                        <p className="text-xs text-gray-500">
                          {device.last_test_time ? new Date(device.last_test_time).toLocaleString() : 'No test time'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={deviceSaving}
                        className="text-sm"
                        onClick={() => handleTestDevice(device.device_id)}
                      >
                        Test Device
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Onboarding Submissions</h2>
            <p className="text-sm text-gray-600">Customer intake, elder profile, installation request, and family-reported baseline.</p>
          </div>
          <span className="text-sm text-gray-500">{submissions.length} total</span>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <p className="text-center text-gray-600">No onboarding submissions yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id}>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{submission.elder_name || 'Unnamed elder'}</h3>
                    <p className="text-sm text-gray-600">{submission.address}</p>
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {submission.installation_status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Customer</p>
                    <p className="font-medium text-gray-900">{submission.customer_name || submission.customer_email}</p>
                    <p className="text-gray-600">{submission.customer_email}</p>
                    <p className="text-gray-600">{submission.customer_phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Elder</p>
                    <p className="font-medium text-gray-900">{submission.elder_name}</p>
                    <p className="text-gray-600">Age {submission.elder_age || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Preferred Installation</p>
                    <p className="font-medium text-gray-900">{submission.preferred_date || 'Not selected'}</p>
                    <p className="text-gray-600">{submission.preferred_time_window || 'No time window'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Baseline</p>
                    <p className="font-medium text-gray-900">
                      Wake {submission.baseline?.wake_up_time || '--'} / Sleep {submission.baseline?.sleep_time || '--'}
                    </p>
                    <p className="text-gray-600">
                      Bathroom {submission.baseline?.bathroom_duration_minutes ?? '--'} min
                    </p>
                    <p className="text-gray-600">
                      Night visits {submission.baseline?.night_bathroom_frequency ?? '--'}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {tabOptions.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              selectedTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Installations List */}
      {installations.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600">No installations in this category</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {installations.map((installation) => (
            <Card key={installation.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{installation.elder_name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {installation.family_name} — {installation.address}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Contact</p>
                      <p className="font-medium text-gray-900">{installation.family_email}</p>
                      <p className="text-gray-600">{installation.family_phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Preferred Date & Time</p>
                      <p className="font-medium text-gray-900">{installation.preferred_date}</p>
                      <p className="text-gray-600">{installation.preferred_time_window}</p>
                    </div>
                  </div>
                  {installation.installation_notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                      <p className="text-gray-500 mb-1">Notes</p>
                      <p className="text-gray-700">{installation.installation_notes}</p>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 ml-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      selectedTab === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : selectedTab === 'scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                {selectedTab === 'pending' && (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => handleConfirmInstallation(installation.id)}
                      className="text-sm"
                    >
                      Confirm
                    </Button>
                    <Button variant="secondary" className="text-sm">
                      Decline
                    </Button>
                  </>
                )}
                {selectedTab === 'scheduled' && (
                  <Button
                    variant="primary"
                    onClick={() => handleCompleteInstallation(installation.id)}
                    className="text-sm"
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
