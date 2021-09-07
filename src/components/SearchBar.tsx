import React, { useContext, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { SearchIcon, CogIcon } from '@heroicons/react/outline'

import SettingSwitch from './SettingSwitch'

import { useAutocomplete } from '../hooks/search-hook'
import useInput from '../hooks/input-hook'
import { SettingsContext } from '../App'
import AmiiboTypeSwitcher from './AmiiboTypeSwitcher'

type Props = {
  search: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLInputElement>,
    nameQuery: string,
  ) => void
}

const SearchBar: React.FC<Props> = ({ search }) => {
  const popoverRef = useRef<HTMLButtonElement | null>(null)
  const [settings] = useContext(SettingsContext)

  const {
    setValue: setName,
    onChange: _,
    ref: inputRef,
    ...textField
  } = useInput('text')

  const nameSuggestions = useAutocomplete(textField.value)

  return (
    <div>
      <div className='flex flex-row py-2 bg-red-600 dark:bg-gray-900'>
        <div className='flex flex-row gap-4 p-2 mx-auto'>
          <Popover className='relative'>
            {({ open }) => (
              <>
                <input
                  placeholder='Search amiibo'
                  ref={inputRef}
                  className='w-64 sm:w-96 p-2 focus:outline-none caret-red-500 dark:caret-gray-900 dark:bg-gray-500 dark:placeholder-white dark:text-white rounded-md'
                  onChange={event => {
                    event.preventDefault()

                    if (!open) {
                      popoverRef.current?.click()
                      inputRef.current?.focus()
                    }

                    setName(event.target.value)
                  }}
                  onSubmit={event => search(event, textField.value)}
                  {...textField}
                />
                <Popover.Button ref={popoverRef} tabIndex={-1}></Popover.Button>
                <Transition
                  enter='transition duration-100 ease-out'
                  enterFrom='transform scale-95 opacity-0'
                  enterTo='transform scale-100 opacity-100'
                  leave='transition duration-75 ease-out'
                  leaveFrom='transform scale-100 opacity-100'
                  leaveTo='transform scale-95 opacity-0'
                >
                  <Popover.Panel className='absolute z-10 right-0 mt-1'>
                    {({ close }) =>
                      nameSuggestions.length !== 0 && (
                        <div className='flex flex-col gap-2 bg-gray-50 dark:bg-gray-500 p-2 w-64 sm:w-96 rounded-md border border-gray-300 dark:border-gray-800'>
                          {nameSuggestions.map((name, index) => (
                            <button
                              key={`${name}-${index}`}
                              className='text-left transition-all duration-200 ease-in-out hover:font-bold hover:bg-red-200 dark:hover:bg-gray-800 hover:text-red-500 dark:hover:text-white p-2 cursor-pointer rounded-md focus:outline-none focus-visible:ring focus-visible:ring-red-500 dark:focus-visible:ring-gray-700'
                              onClick={_ => {
                                setName(name)
                                close(inputRef)
                              }}
                            >
                              <span className='dark:text-white'>{name}</span>
                            </button>
                          ))}
                        </div>
                      )
                    }
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <button onClick={event => search(event, textField.value)}>
            <SearchIcon className='h-7 w-7 text-white hover:text-gray-200 transition duration-100 ease-in-out hover:scale-110' />
          </button>
        </div>

        <Popover className='flex flex-row my-auto relative'>
          <Popover.Button>
            <CogIcon className='h-7 w-7 text-white mr-4 transition duration-100 ease-in-out hover:rotate-[24deg] hover:text-gray-200 hover:scale-110 my-auto' />
          </Popover.Button>
          <Popover.Panel className='absolute z-10 top-10 right-2'>
            <div className='dark:text-white flex flex-col gap-2 divide-y-2 dark:divide-gray-900 bg-gray-50 dark:bg-gray-500 p-4 w-64 rounded-md border border-gray-300 dark:border-gray-800'>
              <SettingSwitch
                label='Dark Mode'
                setting='darkMode'
                value={settings.darkMode}
              />
              <AmiiboTypeSwitcher />
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  )
}

export default SearchBar
