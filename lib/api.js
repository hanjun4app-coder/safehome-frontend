export function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    throw new Error('SafeHome service is not configured. Please contact support@linkrytech.com.')
  }

  return apiUrl.replace(/\/$/, '')
}

export async function readApiJson(response, fallbackMessage) {
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    throw new Error(fallbackMessage)
  }

  try {
    return await response.json()
  } catch (error) {
    throw new Error(fallbackMessage)
  }
}
