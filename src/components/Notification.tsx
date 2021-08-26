import React, { useContext, useEffect } from 'react'
import { NotificationContext } from '../App'
import { Transition } from '@headlessui/react'

const Notification: React.FC = () => {
  const [notification, setNotification] = useContext(NotificationContext)

  useEffect(() => {
    if (notification !== null) {
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
  }, [notification])

  return (
    <Transition
      show={notification !== null}
      enter='transition-opacity ease-in duration-100'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity ease-out duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      {notification ? (
        <div
          className={`fixed bottom-5 right-5 p-2 rounded-md ${
            notification.type === 'success'
              ? 'bg-green-200 text-green-600'
              : 'bg-red-200 text-red-600'
          } font-semibold text-lg`}
        >
          {notification.message}
        </div>
      ) : (
        <></>
      )}
    </Transition>
  )
}

export default Notification
