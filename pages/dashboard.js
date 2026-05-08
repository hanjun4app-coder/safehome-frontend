import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Card from '../components/Card'
import { getApiUrl, readApiJson } from '../lib/api'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [elderName, setElderName] = useState('Your loved one')
  const [statusData, setStatusData] = useState(null)
  const [error, setError] = useState('')

  const getStoredToken = () => {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token')
    if (!token || token === 'undefined' || token === 'null') {
      return ''
    }
    return token.trim()
  }

  const redirectToSignIn = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('elder_name')
    router.push('/login')
  }

  useEffect(() => {
    const token = getStoredToken()
    if (!token) {
      redirectToSignIn()
      return
    }
    fetchDashboardData()
    const intervalId = setInterval(fetchDashboardData, 12000)
    return () => clearInterval(intervalId)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = getStoredToken()
      if (!token) {
        redirectToSignIn()
        return
      }

      const elderNameStored = localStorage.getItem('elder_name')
      if (elderNameStored) {
        setElderName(elderNameStored)
      }

      const response = await fetch(`${getApiUrl()}/api/home/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 401 || response.status === 403) {
        redirectToSignIn()
        return
      }

      if (!response.ok) {
        const message = response.status >= 500
          ? 'SafeHome is having trouble reaching your dashboard right now. Please try again in a moment.'
          : 'We could not refresh your dashboard. Please try again.'
        throw new Error(message)
      }

      const data = await readApiJson(response, 'Unable to load your dashboard')
      setStatusData(data)
      setError('')
      if (data.elder?.name) {
        setElderName(data.elder.name)
      }
    } catch (err) {
      const isNetworkError = err instanceof TypeError
      setError(isNetworkError
        ? 'SafeHome could not reach your dashboard. Please check your connection and try again.'
        : err.message || 'SafeHome could not refresh your dashboard. Please try again.'
      )
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('elder_name')
    router.push('/')
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

  const formatShortRelativeTime = (value) => {
    if (!value) return 'recently'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'recently'

    const diffMs = Date.now() - date.getTime()
    const diffMinutes = Math.max(0, Math.round(diffMs / 60000))
    if (diffMinutes < 1) return 'just now'
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
    const diffHours = Math.round(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
    const diffDays = Math.round(diffHours / 24)
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  }

  const getStatusVariant = (status) => {
    if (status === 'Normal') return 'normal'
    if (status === 'Needs Attention') return 'attention'
    return 'urgent'
  }

  const getPrimaryStatusMessage = () => {
    if (!statusData) return `${elderName} is being monitored.`
    if (statusData.status === 'Normal') return `${statusData.elder?.name || elderName} is doing well today.`
    if (statusData.status === 'Needs Attention') return `${statusData.elder?.name || elderName} may need a check-in.`
    return `${statusData.elder?.name || elderName} needs attention now.`
  }

  const getStatusSubtext = () => {
    if (!statusData) return 'We are preparing the latest home update.'
    if (statusData.status === 'Normal') {
      return `Activity looks normal. Last movement detected ${formatShortRelativeTime(statusData.last_activity)}.`
    }
    return `${statusData.latest_alert_message || statusData.suggestion || 'Something may need your attention.'} Last activity was ${formatShortRelativeTime(statusData.last_activity)}.`
  }

  const latestAlert = statusData?.latest_alert_message || 'No important alerts right now.'
  const activityTimeline = [
    { time: '8:10 AM', label: 'Morning activity detected' },
    { time: '8:45 AM', label: 'Kitchen activity' },
    { time: '12:20 PM', label: 'Living room activity' },
    {
      time: statusData?.last_activity
        ? new Date(statusData.last_activity).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        : '2:15 PM',
      label: statusData?.status === 'Normal' ? 'Resting quietly' : 'Recent activity checked',
    },
  ]

  const recentAlerts = statusData?.latest_alert_message
    ? [
        {
          title: statusData.latest_alert_message,
          detail: statusData.secondary_info?.[0] || 'We recommend a calm check-in.',
          tone: statusData.status === 'Needs Attention' ? 'attention' : 'urgent',
        },
        {
          title: 'Daily safety check completed',
          detail: 'SafeHome is continuing to watch for unusual changes.',
          tone: 'normal',
        },
      ]
    : [
        {
          title: 'No important alerts right now',
          detail: 'Everything looks steady based on recent activity.',
          tone: 'normal',
        },
        {
          title: 'Daily routine looks familiar',
          detail: 'Recent activity is in the expected range.',
          tone: 'normal',
        },
      ]

  const statusVariant = getStatusVariant(statusData?.status)

  if (loading) {
    return (
      <div className="loading-state">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Family Reassurance Center</p>
          <h1>{elderName}'s home today</h1>
          <p>A simple view of comfort, routine, and anything that may need attention.</p>
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

      {statusData && (
        <>
          <Card className={`home-status-card home-status-${statusVariant}`}>
            <div className="home-status-content">
              <div>
                <div className="home-status-topline">
                  <span className="home-status-dot"></span>
                  <span>{statusData.status || 'Normal'}</span>
                </div>
                <h2>{getPrimaryStatusMessage()}</h2>
                <p>{getStatusSubtext()}</p>
              </div>
              <div className="home-status-details">
                <div>
                  <span>Last activity</span>
                  <strong>{formatTime(statusData.last_activity)}</strong>
                </div>
                <div>
                  <span>Profile</span>
                  <strong>{statusData.elder?.age ? `${statusData.elder.name || elderName}, age ${statusData.elder.age}` : statusData.elder?.name || elderName}</strong>
                </div>
              </div>
            </div>
          </Card>

          <div className="dashboard-reassurance-grid">
            <Card title="Today's Activity Timeline" className="dashboard-timeline-card">
              <div className="family-timeline">
                {activityTimeline.map((item) => (
                  <div className="family-timeline-item" key={`${item.time}-${item.label}`}>
                    <span>{item.time}</span>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="AI Learning Your Home" className="learning-card">
              <p>SafeHome is learning daily routines.</p>
              <div className="learning-progress">
                <div style={{ width: '68%' }}></div>
              </div>
              <div className="learning-percent">Learning progress: 68%</div>
              <p className="dashboard-muted-copy">As SafeHome learns, alerts become more personalized.</p>
            </Card>

            <Card title="Care Preferences Preview" className="preference-card">
              <p className="dashboard-muted-copy">Notification style</p>
              <div className="preference-options">
                <span>Essential only</span>
                <strong>Balanced care</strong>
                <span>Detailed updates</span>
              </div>
            </Card>

            <Card title="Alert Routing Preview" className="routing-card">
              <div className="routing-list">
                <div>
                  <span>General updates</span>
                  <strong>Email</strong>
                </div>
                <div>
                  <span>Important alerts</span>
                  <strong>SMS</strong>
                </div>
                <div>
                  <span>Emergency alerts</span>
                  <strong>Phone call + SMS</strong>
                </div>
              </div>
            </Card>

            <Card title="Privacy Reassurance" className="privacy-reassurance-card">
              <h3>No cameras. No recordings.</h3>
              <p>SafeHome monitors patterns — not people.</p>
            </Card>

            <Card title="Recent Alerts" className="recent-alerts-card">
              <div className="calm-alert-list">
                {recentAlerts.slice(0, 3).map((alert) => (
                  <div className={`calm-alert calm-alert-${alert.tone}`} key={alert.title}>
                    <p>{alert.title}</p>
                    <span>{alert.detail}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <button
            onClick={fetchDashboardData}
            className="link-button dashboard-refresh-button"
          >
            Refresh status
          </button>
        </>
      )}
    </div>
  )
}
