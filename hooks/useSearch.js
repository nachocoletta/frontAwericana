import { useEffect, useState } from 'react'

export function useSearch () {
  const [url, setUrl] = useState(new URL(`${process.env.NEXT_PUBLIC_API_URL}/busqueda?`))
  const [queryParams, setQueryParams] = useState({})

  useEffect(() => {
    console.log(queryParams)
    const searchParams = new URLSearchParams()
    Object.entries(queryParams).forEach(([key, value]) => {
      if (!searchParams.get(key)) {
        searchParams.append(key, value)
      } else if (searchParams.get(key)) {
        searchParams.delete(key)
        searchParams.append(key, value)
      }
    })
    setUrl(`${`${process.env.NEXT_PUBLIC_API_URL}/busqueda?`}${searchParams.toString()}`)
  }, [queryParams])

  const add = (key, value) => {
    const clone = structuredClone(queryParams)
    if (value) {
      clone[key] = value
    } else {
      delete clone[key]
    }
    setQueryParams(clone)
  }

  return { url, add }
}
