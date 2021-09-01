import React, { useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { SearchIcon, CogIcon } from '@heroicons/react/outline'

import { useAutocomplete } from '../hooks/search-hook'
import useInput from '../hooks/input-hook'

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

  const {
    setValue: setName,
    onChange: _,
    ref: inputRef,
    ...textField
  } = useInput('text')

  const nameSuggestions = useAutocomplete(textField.value)

  return (
    <div>
      <div className='flex flex-row py-2 bg-red-600'>
        <div className='flex flex-row gap-4 p-2 mx-auto'>
          <Popover className='relative'>
            {({ open }) => (
              <>
                <input
                  placeholder='Search amiibo'
                  ref={inputRef}
                  className='w-64 sm:w-96 p-2 focus:outline-none caret-red-500'
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
                  <Popover.Panel className='absolute z-10 my-1'>
                    {({ close }) =>
                      nameSuggestions.length !== 0 && (
                        <div className='flex flex-col gap-2 bg-gray-50 p-2 w-64 sm:w-96 rounded-md border border-gray-300'>
                          {nameSuggestions.map((name, index) => (
                            <button
                              key={`${name}-${index}`}
                              className='text-left transition-all duration-200 ease-in-out hover:font-bold hover:bg-red-200 hover:text-red-500 p-2 cursor-pointer rounded-md focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-50'
                              onClick={_ => {
                                setName(name)
                                close(inputRef)
                              }}
                            >
                              {name}
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
        <button>
          <CogIcon className='h-7 w-7 text-white ml-auto mr-4 transition duration-100 ease-in-out hover:rotate-[24deg] hover:text-gray-200 hover:scale-110' />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
