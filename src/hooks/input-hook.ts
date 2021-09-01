import React, { useState, useRef } from 'react'

const useInput = (type: string) => {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLInputElement | null>(null)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    event.preventDefault()
    setValue(event.target.value)
  }

  return {
    value,
    setValue,
    type,
    ref,
    onChange,
  }
}

export default useInput
