import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key)
    return  JSON.parse(item) 
  })

  useEffect(() => {
    const item = JSON.stringify(value)
    localStorage.setItem(key, item)
    // eslint-disable-next-line
  }, [value])

  return [value, setValue]
}