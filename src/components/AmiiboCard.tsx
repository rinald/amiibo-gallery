import React from 'react'
import type { Amiibo } from '../types/index'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'

type Props = {
  amiibo: Amiibo
}

const AmiiboCard: React.FC<Props> = ({ amiibo }) => {
  return (
    <div className='flex flex-row gap-2 p-4 border rounded-md border-gray-300 bg-white shadow-sm'>
      <img src={amiibo.image} className='w-32'></img>
      <div className='flex flex-col gap-2 p-2'>
        <div className='text-xl font-semibold'>{amiibo.character}</div>
        <div>{amiibo.gameSeries}</div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button>
                <div className='inline-flex flex-row p-2 gap-2 bg-gray-200 hover:bg-gray-300 rounded-md'>
                  <span>Release</span>
                  {open ? (
                    <ChevronUpIcon className='h-6 w-6' />
                  ) : (
                    <ChevronDownIcon className='h-6 w-6' />
                  )}
                </div>
              </Disclosure.Button>
              <Transition
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <Disclosure.Panel>
                  <ul>
                    <li>AU: {amiibo.release.au ?? 'Unreleaded'}</li>
                    <li>EU: {amiibo.release.eu ?? 'Unreleaded'}</li>
                    <li>JP: {amiibo.release.jp ?? 'Unreleaded'}</li>
                    <li>NA: {amiibo.release.na ?? 'Unreleaded'}</li>
                  </ul>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}

export default AmiiboCard
