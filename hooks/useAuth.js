import { loginUser } from '@/lib/loginUser'
import { registerUser } from '@/lib/registerUser'
import { logoutUser } from '@/lib/logoutUser'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from '@/hooks/useSession'

export function useAuth () {
  const { push } = useRouter()
  const { setSession } = useSession()
  const [error, setError] = useState(null)

  async function register (data) {
    const response = await registerUser(data)
    const json = await response.json()

    if (response.ok) return json
    setError(json)
    return false
  }

  async function login (data) {
    const response = await loginUser(data)
    const json = await response.json()
    if (response.ok) {
      setSession(json.user)
      return json
    }
    setError(json)
    return false
  }

  async function logout () {
    const isLoggedOut = await logoutUser()
    if (!isLoggedOut) {
      setError({ error: 'Could not logout' })
      return false
    }
    setSession(null)
    push('/auth/signin')
    if (window) window.location.reload()
    return true
  }

  async function googleLogin () {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
    window.open(URL, '_self')
  }

  return { login, register, error, logout, googleLogin }
}
