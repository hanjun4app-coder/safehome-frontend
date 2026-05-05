import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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
    const intervalId = setInterval(fetchDashboardData, 12000)
    return () => clearInterval(intervalId)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      const elderNameStored = localStorage.getItem('elder_name')
      if (elderNameStored) {
        setElderName(elderNameStored)
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      const response = await fetch(`${apiUrl}/api/home/status`, {
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
      if (data.elder?.name) {
        setElderName(data.elder.name)
      }
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
      case 'Normal':
        return 'text-green-600'
      case 'Needs Attention':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'Normal':
        return '✓'
      case 'Needs Attention':
        return '⚠'
      default:
        return '?'
    }
  }

  const formatTime = (value) => {
    if (!value) return 'No activity yet'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'No activity yet'

    const diffMs = Date.now() - date.getTime()
    const diffMinutes = Math.max(0, Math.round(diffMs / 60000))
    const relativeTime = diffMinutes < 1
      ? 'Just now'
      : diffMinutes < 60
      ? `${diffMinutes} min ago`
      : diffMinutes < 1440
      ? `${Math.round(diffMinutes / 60)} hr ago`
      : `${Math.round(diffMinutes / 1440)} day${Math.round(diffMinutes / 1440) === 1 ? '' : 's'} ago`

    return `${relativeTime} • ${date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })}`
  }

  const statusTone = statusData?.status === 'Normal' ? 'All clear' : 'Action may be needed'

  const latestAlert = statusData?.latest_alert_message || 'No active alerts.'

  if (loading) {
    return (
      <div className="loading-state">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      {/* Header with Logout */}
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Care monitor</p>
          <h1>Dashboard</h1>
          <p>{elderName}'s home safety overview</p>
        </div>
        <button
          onClick={handleLogout}
          className="link-button"
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
        <div className="dashboard-grid">
          <Card className="status-card">
            <div className={`status-panel ${
              statusData.status === 'Normal' ? 'status-ok' :
              statusData.status === 'Needs Attention' ? 'status-warning' :
              'status-critical'
            }`}>
              <div className="status-icon">
                <span className={getStatusColor(statusData.status)}>
                  {getStatusEmoji(statusData.status)}
                </span>
              </div>
              <div className={`status-badge ${
                statusData.status === 'Normal' ? 'status-badge-ok' : 'status-badge-warning'
              }`}>
                {statusData.status}
              </div>
              <h2>{statusData.primary_message}</h2>
              <p>{statusData.suggestion}</p>
              <p className="status-summary">{statusTone}</p>

              <div className="metric-row">
                <div className="metric">
                  <span>Current status</span>
                  <strong>{statusData.status}</strong>
                </div>
                <div className="metric">
                  <span>Last activity</span>
                  <strong>{formatTime(statusData.last_activity)}</strong>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Alerts */}
          <div>
            <Card title="Elder Info">
              <div className="activity-list">
                <div className="activity-item">
                  <p>{statusData.elder?.name || elderName}</p>
                  <p>{statusData.elder?.age ? `Age ${statusData.elder.age}` : statusData.elder?.elder_id || 'Profile active'}</p>
                </div>
              </div>
            </Card>

            {statusData.latest_alert_message ? (
              <Card title="Latest Alert" className={`mt-6 ${
                statusData.status === 'Needs Attention' ? 'latest-alert-card-attention' : ''
              }`}>
                <div className="activity-list">
                  <div className={`activity-item latest-alert-item ${
                    statusData.status === 'Needs Attention' ? 'latest-alert-attention' : ''
                  }`}>
                    <p>{latestAlert}</p>
                    <p>{statusData.secondary_info?.[0] || 'Active alert'}</p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card title="Latest Alert" className="mt-6">
                <div className="activity-item latest-alert-item latest-alert-clear">
                  <p>{latestAlert}</p>
                  <p>Nothing needs attention right now.</p>
                </div>
              </Card>
            )}

            <button
              onClick={fetchDashboardData}
              className="link-button mt-6"
            >
              Refresh Status
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
