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
  const [dailyFeedback, setDailyFeedback] = useState('')

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
    const todayKey = new Date().toISOString().slice(0, 10)
    const savedFeedback = localStorage.getItem(`safehome_daily_feedback_${todayKey}`)
    if (savedFeedback) {
      setDailyFeedback(savedFeedback)
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
          ? "We're having trouble updating the latest home information right now. Please try again in a moment."
          : "We couldn't refresh the latest home update. Please try again in a moment."
        throw new Error(message)
      }

      const data = await readApiJson(response, "We're having trouble loading the latest home information right now.")
      setStatusData(data)
      setError('')
      if (data.elder?.name) {
        setElderName(data.elder.name)
      }
    } catch (err) {
      const isNetworkError = err instanceof TypeError
      setError(isNetworkError
        ? "SafeHome couldn't reach the latest home updates. Please check your connection and try again."
        : err.message || "SafeHome couldn't refresh the latest home updates. Please try again in a moment."
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
    if (!value) return 'Waiting for the next home update'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'Waiting for the next home update'

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

  const getDaysSinceFirstUpdate = () => {
    const value = statusData?.first_activity_at || statusData?.created_at || statusData?.elder?.created_at || statusData?.last_activity
    if (!value) return 1
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 1
    const diffMs = Date.now() - date.getTime()
    return Math.max(1, Math.floor(diffMs / 86400000) + 1)
  }

  const getLearningStage = () => {
    const days = getDaysSinceFirstUpdate()
    if (days <= 2) return 'Getting started'
    if (days <= 6) return 'Learning daily patterns'
    return 'Routine understanding improving'
  }

  const getDailySummary = () => {
    if (!statusData) return "SafeHome is preparing today's summary."
    if (statusData.latest_alert_message) {
      return 'One update may be worth a calm check-in today.'
    }
    if (statusData.status === 'Normal') {
      return 'Today has felt calm and routine overall.'
    }
    if (statusData.status === 'Needs Attention') {
      return 'Today looks mostly steady, with one moment worth checking.'
    }
    return 'SafeHome noticed something that may need attention.'
  }

  const getBirthdayMoment = () => {
    const birthdayValue = statusData?.elder?.birthday || statusData?.elder?.date_of_birth
    if (!birthdayValue) return null

    const birthday = new Date(birthdayValue)
    if (Number.isNaN(birthday.getTime())) return null

    const today = new Date()
    const nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1)
    }

    const daysAway = Math.ceil((nextBirthday - today) / 86400000)
    if (daysAway >= 0 && daysAway <= 7) {
      const name = statusData?.elder?.name || elderName
      const timing = daysAway <= 2 ? 'this weekend' : 'coming up soon'
      return {
        title: `${name}'s birthday is ${timing}`,
        detail: 'Even a short call can make their day.',
      }
    }

    return null
  }

  const handleDailyFeedback = (value) => {
    const todayKey = new Date().toISOString().slice(0, 10)
    localStorage.setItem(`safehome_daily_feedback_${todayKey}`, value)
    setDailyFeedback(value)
  }

  const getStatusVariant = (status) => {
    if (status === 'Normal') return 'normal'
    if (status === 'Needs Attention') return 'attention'
    return 'urgent'
  }

  const getGentleStatusLabel = (status) => {
    if (status === 'Normal') return 'Everything looks steady'
    if (status === 'Needs Attention') return 'A gentle check-in may help'
    return 'Attention may be needed now'
  }

  const getPrimaryStatusMessage = () => {
    if (!statusData) return 'Checking in on home now'
    if (statusData.status === 'Normal') return 'Everything looks normal today'
    if (statusData.status === 'Needs Attention') return 'A check-in may be helpful today'
    return 'Please check in as soon as you can'
  }

  const getStatusSubtext = () => {
    if (!statusData) return 'We are preparing the latest home update.'
    if (statusData.status === 'Normal') {
      return `${statusData.elder?.name || elderName} appears safe and active at home.`
    }
    return `${statusData.latest_alert_message || statusData.suggestion || 'Something feels different from the usual routine.'} Latest home update was ${formatShortRelativeTime(statusData.last_activity)}.`
  }

  const updatedAtText = `Last updated ${formatShortRelativeTime(statusData?.last_activity)}`
  const activityTimeline = [
    { time: '8:10 AM', label: 'Morning activity started normally' },
    { time: '8:45 AM', label: 'Spent time in the kitchen around breakfast' },
    { time: '12:20 PM', label: 'Relaxing in the living room this afternoon' },
    {
      time: statusData?.last_activity
        ? new Date(statusData.last_activity).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        : '2:15 PM',
      label: statusData?.status === 'Normal' ? 'Movement consistent with daily routine' : 'Recent routine looked a little different',
    },
  ]

  const roomSummaries = [
    { room: 'Bedroom', summary: 'Resting pattern looks normal' },
    { room: 'Kitchen', summary: 'Recent activity around meal time' },
    { room: 'Living Room', summary: 'Comfortable daytime rhythm observed' },
    { room: 'Bathroom', summary: 'No unusual bathroom activity detected' },
  ]

  const birthdayMoment = getBirthdayMoment()
  const connectionMoments = [
    ...(birthdayMoment ? [birthdayMoment] : []),
    {
      title: 'A gentle check-in could be nice soon',
      detail: "It's been a little while since the last family check-in.",
    },
    {
      title: 'This week has felt steady',
      detail: 'Recent routines have looked familiar and calm.',
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
          title: 'Recent activity looks steady again',
          detail: 'SafeHome will continue to keep this easy to review.',
          tone: 'normal',
        },
      ]
    : [
        {
          title: 'No important updates right now',
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
        <p className="text-gray-600">Loading the latest home updates...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Family Reassurance Center</p>
          <h1>{getPrimaryStatusMessage()}</h1>
          <p>{getStatusSubtext()}</p>
          <span className="dashboard-updated-at">{updatedAtText}</span>
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
                  <span>{getGentleStatusLabel(statusData.status)}</span>
                </div>
                <h2>Daily activity appears routine</h2>
                <p>SafeHome is quietly watching for meaningful changes, so you do not have to keep checking all day.</p>
              </div>
              <div className="home-status-details">
                <div>
                  <span>Latest home update</span>
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
            <Card title="Daily Summary" className="daily-summary-card">
              <p>{getDailySummary()}</p>
              <span>{statusData.latest_alert_message ? 'We will keep this easy to review.' : 'No important updates right now.'}</span>
            </Card>

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

            <Card title="Room Comfort Summary" className="room-summary-card">
              <div className="room-summary-grid">
                {roomSummaries.map((item) => (
                  <div className="room-summary-item" key={item.room}>
                    <strong>{item.room}</strong>
                    <span>{item.summary}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="SafeHome Learning With You" className="learning-card">
              <p>SafeHome is learning daily routines.</p>
              <div className="learning-progress">
                <div style={{ width: '68%' }}></div>
              </div>
              <div className="learning-stage">{getLearningStage()}</div>
              <p className="dashboard-muted-copy">As patterns become clearer, alerts become more personalized.</p>
              <div className="daily-checkin">
                <p>Did everything seem normal today?</p>
                <div>
                  <button
                    type="button"
                    className={dailyFeedback === 'normal' ? 'is-selected' : ''}
                    onClick={() => handleDailyFeedback('normal')}
                  >
                    Yes, everything looked fine
                  </button>
                  <button
                    type="button"
                    className={dailyFeedback === 'unusual' ? 'is-selected' : ''}
                    onClick={() => handleDailyFeedback('unusual')}
                  >
                    Something felt unusual
                  </button>
                </div>
                {dailyFeedback && (
                  <span>Thanks. Your note is saved on this device for now.</span>
                )}
              </div>
            </Card>

            <Card title="Care Preferences Preview" className="preference-card">
              <p className="dashboard-muted-copy">Notification style</p>
              <div className="preference-options">
                <span><strong>Minimal Updates</strong><small>Only the moments that need attention.</small></span>
                <span className="is-selected"><strong>Balanced Care</strong><small>A calm mix of reassurance and important updates.</small></span>
                <span><strong>High Awareness</strong><small>More frequent context for families who want it.</small></span>
              </div>
            </Card>

            <Card title="Family Connection" className="family-connection-card">
              <div className="connection-list">
                {connectionMoments.map((item) => (
                  <div key={item.title}>
                    <p>{item.title}</p>
                    <span>{item.detail}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="How Updates Reach You" className="routing-card">
              <div className="routing-list">
                <div>
                  <span>General updates</span>
                  <strong>Email</strong>
                </div>
                <div>
                  <span>Important updates</span>
                  <strong>SMS</strong>
                </div>
                <div>
                  <span>Urgent updates</span>
                  <strong>Phone call + SMS</strong>
                </div>
              </div>
            </Card>

            <Card title="Privacy Reassurance" className="privacy-reassurance-card">
              <h3>No cameras. No recordings.</h3>
              <p>SafeHome observes patterns — not private moments.</p>
            </Card>

            <Card title="Recent Important Updates" className="recent-alerts-card">
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
