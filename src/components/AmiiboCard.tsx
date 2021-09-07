import React, { Fragment, useState, useContext } from 'react'
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component'

import { Transition } from '@headlessui/react'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import {
  InformationCircleIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/outline'

import { NotificationContext } from '../App'
import type { Amiibo } from '../types'

type Props = {
  amiibo: Amiibo
  onExpand: () => void
  scrollPosition: ScrollPosition
}

const LazyImage: React.FC<{ src: string; scrollPosition: ScrollPosition }> = ({
  src,
  scrollPosition,
}) => (
  <div className='max-w-[40%] my-auto'>
    <LazyLoadImage
      src={src}
      placeholder={
        <img
          src='images/amiibo-placeholder.png'
          className='animate-pulse'
        ></img>
      }
      className='transition duration-200 ease-in-out hover:scale-110'
      scrollPosition={scrollPosition}
    />
  </div>
)

const AmiiboCard: React.FC<Props> = ({ amiibo, onExpand, scrollPosition }) => {
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
      <div className='flex flex-row gap-2 p-4 border rounded-md border-gray-300 dark:border-none bg-white dark:bg-gray-900 shadow-sm'>
        <LazyImage src={amiibo.image} scrollPosition={scrollPosition} />
        <div className='flex flex-col gap-2 p-2'>
          <div className='prose prose-2xl font-header font-semibold dark:text-white'>
            {amiibo.character}
          </div>
          <div className='prose dark:text-gray-200'>{amiibo.gameSeries}</div>
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
              className='absolute right-0 transition duration-100 ease-in-out w-6 h-6 text-yellow-400 dark:text-yellow-200 hover:text-yellow-600 dark:hover:text-yellow-400 hover:cursor-pointer hover:scale-125'
              onClick={() => {
                setFavorite(!favorite)
                setNotification({
                  type: 'success',
                  message: `Added '${amiibo.name}' to favorites`,
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
              className='absolute right-0 transition duration-100 ease-in-out w-6 h-6 text-yellow-400 dark:text-yellow-200 hover:text-yellow-600 dark:hover:text-yellow-400 hover:cursor-pointer hover:scale-150'
              onClick={() => {
                setFavorite(!favorite)
                setNotification({
                  type: 'success',
                  message: `Removed '${amiibo.name}' from favorites`,
                })
              }}
            />
          </Transition>
          <button className='absolute bottom-0 right-0 inline-flex gap-2'>
            <InformationCircleIcon
              className='w-6 h-6 text-gray-600 dark:text-gray-200 transition duration-100 ease-in-out hover:text-gray-400 hover:scale-110'
              onClick={onExpand}
            />
          </button>
        </div>
      </div>
    </Transition>
  )
}

export default AmiiboCard
