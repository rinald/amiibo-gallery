import React, { useState, useContext, useEffect } from 'react'

import { CheckCircleIcon } from '@heroicons/react/outline'
import { SettingsContext } from '../App'

import { RadioGroup } from '@headlessui/react'

const AmiiboType: React.FC<{ value: string }> = ({ value }) => {
  return (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <div
          className={`flex flex-row justify-between p-2 hover:cursor-pointer rounded-md ${
            checked ? 'bg-red-500 text-white font-bold' : 'hover:bg-red-200'
          }`}
        >
          <p className='first-letter:capitalize'>{value}</p>
          {checked && <CheckCircleIcon className='w-6 h-6 text-white' />}
        </div>
      )}
    </RadioGroup.Option>
  )
}

const AmiiboTypeSwitcher: React.FC = () => {
  const [settings, setSettings] = useContext(SettingsContext)
  const [amiiboType, setAmiiboType] = useState(settings.amiiboType)

  useEffect(() => {
    setSettings({ ...settings, amiiboType })
  }, [amiiboType])

  return (
    <RadioGroup
      value={amiiboType}
      onChange={setAmiiboType}
      className='flex flex-col gap-2'
    >
      <AmiiboType value='figure' />
      <AmiiboType value='card' />
      <AmiiboType value='yarn' />
    </RadioGroup>
  )
}

export default AmiiboTypeSwitcher
