import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import { getApiUrl, readApiJson } from '../lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${getApiUrl()}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await readApiJson(response, "We're having trouble signing you in right now. Please try again in a moment.")

      if (!response.ok) {
        setError('Please check your email and password, then try again.')
        return
      }

      const authToken = data.token || data.access_token
      if (!authToken) {
        setError("We're having trouble opening your dashboard right now. Please try again in a moment.")
        return
      }

      localStorage.setItem('token', authToken)
      localStorage.setItem('access_token', authToken)
      
      // Redirect to dashboard if family, admin if installer
      if (data.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError("We're having trouble signing you in right now. Please try again in a moment.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError('')
    if (!email) {
      setError('Please enter your email address so we can send the reset link.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${getApiUrl()}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await readApiJson(response, "We're having trouble sending the reset email right now. Please try again in a moment.")

      if (!response.ok) {
        throw new Error("We're having trouble sending the reset email right now. Please try again in a moment.")
      }

      setShowForgotPassword(false)
      setError('') // Clear error
      alert('If an account is available for this email, a reset link will arrive shortly.')
    } catch (err) {
      setError("We're having trouble sending the reset email right now. Please try again in a moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
        <p className="text-gray-600">Check on your loved one's status</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {!showForgotPassword ? (
        <Card>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Preparing your family dashboard...' : 'Sign in'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              Forgot your password?
            </button>
          </div>
        </Card>
      ) : (
        <Card>
          <form onSubmit={handleForgotPassword}>
            <p className="text-gray-600 mb-4 text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending a secure reset link...' : 'Send reset link'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setShowForgotPassword(false)
                setError('')
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              Back to sign in
            </button>
          </div>
        </Card>
      )}

      {/* New User? */}
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Don't have an account yet?{' '}
          <Link href="/onboarding" className="text-blue-600 hover:text-blue-700 font-semibold">
            Start onboarding
          </Link>
        </p>
      </div>
    </div>
  )
}
