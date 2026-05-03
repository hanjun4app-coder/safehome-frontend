import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Card from '../components/Card'
import Button from '../components/Button'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [installations, setInstallations] = useState([])
  const [error, setError] = useState('')
  const [selectedTab, setSelectedTab] = useState('pending')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchInstallations()
  }, [selectedTab])

  const fetchInstallations = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/installations?status=${selectedTab}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 401) {
        router.push('/login')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch installations')
      }

      const data = await response.json()
      setInstallations(data.installations || [])
    } catch (err) {
      setError('Unable to load installations')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmInstallation = async (installationId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/installations/${installationId}/confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to confirm installation')
      }

      fetchInstallations()
      alert('Installation confirmed')
    } catch (err) {
      alert('Error confirming installation')
      console.error(err)
    }
  }

  const handleCompleteInstallation = async (installationId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/installations/${installationId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to complete installation')
      }

      fetchInstallations()
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

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const tabOptions = [
    { id: 'pending', label: 'Pending Requests' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'completed', label: 'Completed' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
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
