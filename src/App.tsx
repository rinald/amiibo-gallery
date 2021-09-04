import React, { createContext, useEffect, useState } from 'react'

import { useDidMount } from './hooks/util'
import HomePage from './pages/HomePage'
import type { Notification, Settings } from './types'

const NotificationContext = createContext<
  [
    Notification | null,
    React.Dispatch<React.SetStateAction<Notification | null>>,
  ]
>([null, () => {}])

const defaultSettings: Settings = {
  darkMode: false,
  amiiboType: 'figure',
}

const SettingsContext = createContext<
  [Settings, React.Dispatch<React.SetStateAction<Settings>>]
>([defaultSettings, () => {}])

const App = () => {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  const didMount = useDidMount()

  // load user settings (if any) from local storage
  useEffect(() => {
    const userSettings = localStorage.getItem('settings')

    if (userSettings) {
      setSettings(JSON.parse(userSettings))
    }
  }, [])

  // update settings on disk, to match client-side changes
  useEffect(() => {
    if (didMount) {
      localStorage.setItem('settings', JSON.stringify(settings))
    }
  }, [settings])

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      <NotificationContext.Provider value={[notification, setNotification]}>
        <HomePage />
      </NotificationContext.Provider>
    </SettingsContext.Provider>
  )
}

export default App
export { NotificationContext, SettingsContext }
