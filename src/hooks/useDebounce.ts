import { useEffect, useState } from 'react'

const useDebounce = (value = '', delay = 1000) => {
  const [debounceValue, setDebounceValue] = useState<string>('')

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(handler)
  })
  return debounceValue
}

export default useDebounce
