import { useContext, useEffect, useCallback } from 'react'
import { SessionContext } from '@/context/SessionProvider'
import { useRouter } from 'next/router'

export function useSession (initialState) {
  const [session, setSession] = useContext(SessionContext)
  const { push } = useRouter()

  useEffect(() => {
    if (initialState?.nombre && !session?.nombre) setSession(initialState)
  }, [])

  const checkAndRedirect = useCallback(() => {
    if (!session?.nombre) {
      push('/auth/signin')
      return false
    }

    return true
  }, [session?.nombre])

  return { session, setSession, checkAndRedirect }
}
