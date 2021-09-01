import React, { Fragment } from 'react'

import { Transition, Dialog } from '@headlessui/react'
import type { Amiibo } from '../types'

const AmiiboModal: React.FC<{
  state: [Amiibo | null, React.Dispatch<React.SetStateAction<Amiibo | null>>]
}> = ({ state }) => {
  const [amiibo, setAmiibo] = state

  return (
    <Transition appear show={amiibo !== null} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={() => setAmiibo(null)}
      >
        <div className='min-h-screen px-4 text-center'>
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

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                {amiibo?.character}
              </Dialog.Title>
              <div className='mt-2'>
                <p>
                  <b>Name: </b>
                  {amiibo?.name}
                </p>
                <p>
                  <b>Franchise: </b> {amiibo?.gameSeries}
                </p>
                <p>
                  <b>Series: </b>
                  {amiibo?.amiiboSeries}
                </p>
                <p>
                  <b>Released: </b>
                  {new Date(amiibo?.release.na ?? '').toLocaleDateString() ??
                    'Unreleased'}
                </p>
              </div>

              <div className='mt-4'>
                <button
                  type='button'
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500'
                  onClick={() => setAmiibo(null)}
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

export default AmiiboModal