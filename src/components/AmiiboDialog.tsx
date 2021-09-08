import React, { Fragment, useEffect, useState } from 'react'

import { Transition, Dialog } from '@headlessui/react'
import type { Amiibo } from '../types'

type Props = {
  amiiboState: [
    Amiibo | null,
    React.Dispatch<React.SetStateAction<Amiibo | null>>,
  ]
  darkMode: boolean
}

const AmiiboDialog: React.FC<Props> = ({ amiiboState, darkMode }) => {
  const [show, setShow] = useState(false)
  const [amiibo, setAmiibo] = amiiboState

  useEffect(() => {
    if (amiibo !== null) {
      setShow(true)
    }
  }, [amiibo])

  useEffect(() => {
    if (!show) {
      setTimeout(() => setAmiibo(null), 200)
    }
  }, [show])

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as='div'
        className={`${
          darkMode ? 'dark' : ''
        } fixed inset-0 z-10 overflow-y-auto`}
        onClose={() => setShow(false)}
      >
        <div className='flex items-center justify-center min-h-screen p-4'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='relative bg-white dark:bg-gray-700 dark:text-white rounded-2xl max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg w-full mx-auto p-6'>
              <Dialog.Title
                as='h3'
                className='font-header text-xl font-bold leading-6 text-gray-900 dark:text-white'
              >
                {amiibo?.character}
              </Dialog.Title>
              <ul className='mt-2'>
                <li>
                  <b>Name: </b>
                  {amiibo?.name}
                </li>
                <li>
                  <b>Franchise: </b> {amiibo?.gameSeries}
                </li>
                <li>
                  <b>Series: </b>
                  {amiibo?.amiiboSeries}
                </li>
                <li>
                  <b>Released: </b>
                  {new Date(amiibo?.release.na ?? '').toLocaleDateString(
                    'en-GB',
                  ) ?? 'Unreleased'}
                </li>
              </ul>

              <div className='mt-4 flex flex-row justify-end'>
                <button
                  type='button'
                  className='font-semibold px-4 py-2 text-sm text-red-900 dark:text-gray-800 bg-red-100 dark:bg-gray-300 border border-transparent rounded-md hover:bg-red-200 dark:hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500'
                  onClick={() => setShow(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AmiiboDialog
