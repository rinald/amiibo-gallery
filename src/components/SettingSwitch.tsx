import React, { useState, useContext, useEffect } from 'react'
import { Switch } from '@headlessui/react'

import { SettingsContext, NotificationContext } from '../App'
import { useDidMount } from '../hooks/util'

type Props = {
  label: string
  setting: string
  value: boolean
}

const SettingSwitch: React.FC<Props> = ({ label, setting, value }) => {
  const [settings, setSettings] = useContext(SettingsContext) // get user settings from global context
  const [, setNotification] = useContext(NotificationContext) // used to show notifications to reflect settings changes
  const [enabled, setEnabled] = useState(value) // state of the switch

  const didMount = useDidMount() // check if component mounted

  useEffect(() => {
    // update settings only if component is mounted
    // avoids calling setState each time the settings popup is opened
    // which triggers unneccesary writes to localStorage
    if (didMount) {
      setSettings({ ...settings, [setting]: enabled })
      setNotification({
        message: `${label} ${enabled ? 'enabled' : 'disabled'}`,
        type: 'success',
      })
    }
  }, [enabled])

  return (
    <Switch.Group>
      <div className='flex justify-between'>
        <Switch.Label>{label}</Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-red-600' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className='sr-only'>Enable notifications</span>
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}

export default SettingSwitch
