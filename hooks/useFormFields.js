import { useState } from 'react'

export function useFormFields (initialState = {}) {
  const [data, setData] = useState(initialState)

  function handleChange (e) {
    const { name, value } = e.target
    setData({ ...data, [name]: value.trim() })
  }

  return { data, handleChange }
}
