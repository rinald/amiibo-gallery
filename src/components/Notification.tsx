import React, { useContext, useEffect } from 'react'
import { NotificationContext } from '../App'
import { Transition } from '@headlessui/react'

const Notification: React.FC = () => {
  const [notification, setNotification] = useContext(NotificationContext)

  useEffect(() => {
    let timer: number

    if (notification !== null) {
      timer = setTimeout(() => {
        setNotification(null)
      }, 2000)
    }

    return () => clearTimeout(timer)
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
          className={`fixed w-screen bottom-0 sm:w-max sm:bottom-5 sm:right-5 p-2 sm:rounded-md ${
            notification.type === 'success'
              ? 'bg-gray-300 text-gray-800'
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
