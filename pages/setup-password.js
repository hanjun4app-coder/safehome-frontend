import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'

export default function SetupPasswordPage() {
  const router = useRouter()
  const { token } = router.query
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')

  const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || ''

  useEffect(() => {
    if (!router.isReady) return
    if (!token) {
      setError('This password setup link is missing a token.')
      setChecking(false)
      return
    }

    const verifyToken = async () => {
      setChecking(true)
      setError('')
      try {
        const response = await fetch(`${getApiUrl()}/api/auth/verify-setup-token?token=${encodeURIComponent(token)}`)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.detail || 'Invalid setup link')
        }
        setEmail(data.email || '')
        if (data.password_set) {
          setError('This account already has a password. Please sign in.')
        }
      } catch (err) {
        setError(err.message || 'This password setup link is invalid or expired.')
      } finally {
        setChecking(false)
      }
    }

    verifyToken()
  }, [router.isReady, token])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${getApiUrl()}/api/auth/setup-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password,
          password_confirm: confirmPassword,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || 'Unable to set password')
      }
      router.push('/login')
    } catch (err) {
      setError(err.message || 'Unable to set password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Set your password</h1>
        <p className="text-gray-600">Create a password for your SafeHome account.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <Card>
        {checking ? (
          <p className="text-gray-600">Checking your setup link...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {email && (
              <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Login email</p>
                <p className="font-semibold text-gray-900">{email}</p>
              </div>
            )}

            <Input
              label="New password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <Button type="submit" disabled={loading || !token} className="w-full">
              {loading ? 'Setting password...' : 'Set Password'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}
