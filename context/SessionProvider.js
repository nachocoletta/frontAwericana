import { createContext, useState, useEffect } from 'react'

export const SessionContext = createContext([])

export function SessionProvider ({ children }) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    if (!session?.nombre) {
      fetch('/api/session', { credentials: 'include' })
        .then(res => res.json())
        .then(res => {
          if (!res?.error) {
            setSession(res)
          }
        })
        .catch(e => console.error(e))
    }
  }, [])

  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  )
}
