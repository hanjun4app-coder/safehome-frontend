import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../components/Button'
import Card from '../components/Card'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [elderName, setElderName] = useState('Your loved one')
  const [statusData, setStatusData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      const elderNameStored = localStorage.getItem('elder_name')
      if (elderNameStored) {
        setElderName(elderNameStored)
      }

      const response = await fetch('/api/home/status', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 401) {
        localStorage.removeItem('token')
        router.push('/login')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const data = await response.json()
      setStatusData(data)
    } catch (err) {
      setError('Unable to load your dashboard')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('elder_name')
    router.push('/')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ok':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'critical':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'ok':
        return '✓'
      case 'warning':
        return '⚠'
      case 'critical':
        return '!'
      default:
        return '?'
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600">{elderName}'s Care Monitor</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          Sign out
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
          {error}
        </div>
      )}

      {/* Status Card */}
      {statusData && (
        <>
          <Card>
            <div className={`text-center p-6 rounded-lg ${
              statusData.status === 'ok' ? 'bg-green-50' :
              statusData.status === 'warning' ? 'bg-yellow-50' :
              'bg-red-50'
            }`}>
              <div className="mb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                  statusData.status === 'ok' ? 'bg-green-100' :
                  statusData.status === 'warning' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <span className={`text-3xl font-bold ${getStatusColor(statusData.status)}`}>
                    {getStatusEmoji(statusData.status)}
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">{statusData.primary_message}</h2>
              <p className="text-gray-600 mb-2">{statusData.suggestion}</p>
              <p className="text-sm text-gray-500">Last activity: {statusData.last_activity}</p>
            </div>
          </Card>

          {/* Recent Alerts */}
          {statusData.recent_alerts && statusData.recent_alerts.length > 0 && (
            <Card title="Recent Activity" className="mt-6">
              <div className="space-y-3">
                {statusData.recent_alerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{alert.type}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Refresh Button */}
          <div className="mt-8 text-center">
            <button
              onClick={fetchDashboardData}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Refresh Status
            </button>
          </div>
        </>
      )}
    </div>
  )
}
