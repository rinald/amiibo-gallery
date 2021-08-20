import React, { useState } from 'react'

const useInput = (type: string) => {
  const [value, setValue] = useState('')

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    event.preventDefault()
    setValue(event.target.value)
  }

  return {
    value,
    setValue,
    type,
    onChange,
  }
}

export default useInput
