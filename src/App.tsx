import React, { createContext, useState } from 'react'
import HomePage from './pages/HomePage'
import type { Notification } from './types'

const NotificationContext = createContext<
  [
    Notification | null,
    React.Dispatch<React.SetStateAction<Notification | null>>,
  ]
>([null, () => {}])

const App = () => {
  const [notification, setNotification] = useState<Notification | null>(null)

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      <HomePage />
    </NotificationContext.Provider>
  )
}

export default App
export { NotificationContext }
