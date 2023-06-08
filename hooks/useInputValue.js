import { useState } from 'react'

export function useInputValue () {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function onChange (e) {
    setValue(e.target.value)
  }

  return { value, onChange, error, setError }
}
