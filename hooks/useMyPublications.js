import { useContext, useEffect, useState } from 'react'
import { MyPublicationsContext } from '@/context/MyPublicationsProvider'

export function useMyPublications () {
  const [isLoading, setIsLoading] = useState(true)
  const { publications, dispatch, ACTION_TYPES } = useContext(MyPublicationsContext)

  useEffect(() => {
    if (publications === null) setIsLoading(true)
    else if (publications?.length >= 0) setIsLoading(false)
  }, [publications])

  return { publications, dispatch, ACTION_TYPES, isLoading }
}
