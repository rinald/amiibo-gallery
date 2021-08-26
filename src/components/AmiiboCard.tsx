import React, { Fragment, useState, useContext } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'

import { NotificationContext } from '../App'

import type { Amiibo } from '../types/index'

type Props = {
  amiibo: Amiibo
}

const Img: React.FC<{ src: string }> = ({ src }) => (
  <img
    src={src}
    className='transition duration-200 ease-in-out w-2/5 hover:scale-110'
  />
)

const AmiiboCard: React.FC<Props> = ({ amiibo }) => {
  const [favorite, setFavorite] = useState(false)
  const [, setNotification] = useContext(NotificationContext)

  return (
    <Transition
      as={Fragment}
      show={true}
      appear={true}
      enter='transition-opacity duration-150 ease-in'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-150 ease-out'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='flex flex-row gap-2 p-4 border rounded-md border-gray-300 bg-white shadow-sm'>
        <Img src={amiibo.image} />
        <div className='flex flex-col gap-2 p-2'>
          <div className='text-xl font-semibold'>{amiibo.character}</div>
          <div className='text-gray-600'>{amiibo.gameSeries}</div>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button>
                  <div className='inline-flex flex-row p-2 gap-2 border bg-gray-50 hover:bg-gray-100 rounded-md text-gray-600'>
                    <span>Release</span>

                    <ChevronDownIcon
                      className={`transition duration-100 ease-out h-6 w-6 ${
                        open ? 'scale-y-[-1]' : ''
                      }`}
                    />
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
        <div className='ml-auto relative'>
          <Transition
            show={!favorite}
            enter='transition-opacity ease-in duration-200'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-out duration-50'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <StarIconOutline
              className='absolute right-0 transition duration-200 ease-in-out w-6 h-6 text-yellow-400 hover:text-yellow-600 hover:cursor-pointer hover:scale-125'
              onClick={() => {
                setFavorite(!favorite)
                setNotification({
                  type: 'success',
                  message: `Added ${amiibo.name} to favorites`,
                })
              }}
            />
          </Transition>
          <Transition
            show={favorite}
            enter='transition-opacity ease-in duration-200'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-out duration-50'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <StarIconSolid
              className='absolute right-0 transition duration-200 ease-in-out w-6 h-6 text-yellow-400 hover:text-yellow-600 hover:cursor-pointer hover:scale-150'
              onClick={() => {
                setFavorite(!favorite)
                setNotification({
                  type: 'success',
                  message: `Removed ${amiibo.name} from favorites`,
                })
              }}
            />
          </Transition>
        </div>
      </div>
    </Transition>
  )
}

export default AmiiboCard
