import { useEffect, useState } from 'react'

export function useError () {
  const [error, setError] = useState({})

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError({})
      }, 2500)

      return () => clearTimeout(timeout)
    }
  }, [error])

  return { error, setError }
}
