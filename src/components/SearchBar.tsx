import React, { createRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'

import { useAutocomplete } from '../hooks/search-hook'
import useInput from '../hooks/input-hook'

type Props = {
  search: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    nameQuery: string,
  ) => void
}

const popoverRef = createRef<HTMLButtonElement>()
const inputRef = createRef<HTMLInputElement>()

const SearchBar: React.FC<Props> = ({ search }) => {
  const { setValue: setName, onChange, ...textField } = useInput('text')
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
                  className='w-64 sm:w-96 p-2 focus:outline-none'
                  onChange={event => {
                    event.preventDefault()

                    if (!open) {
                      popoverRef.current?.click()
                      inputRef.current?.focus()
                    }

                    setName(event.target.value)
                  }}
                  {...textField}
                />
                <Popover.Button ref={popoverRef}></Popover.Button>
                <Transition
                  enter='transition duration-100 ease-out'
                  enterFrom='transform scale-95 opacity-0'
                  enterTo='transform scale-100 opacity-100'
                  leave='transition duration-75 ease-out'
                  leaveFrom='transform scale-100 opacity-100'
                  leaveTo='transform scale-95 opacity-0'
                >
                  <Popover.Panel className='absolute z-10 mx-2 my-2'>
                    {({ close }) =>
                      nameSuggestions.length !== 0 && (
                        <div className='flex flex-col gap-2 bg-gray-50 p-2 w-64 sm:w-80 rounded-md border border-gray-300'>
                          {nameSuggestions.map((name, index) => (
                            <div
                              key={`${name}-${index}`}
                              className='transition-all duration-200 ease-in-out hover:font-bold hover:bg-red-200 hover:text-red-500 p-2 cursor-pointer rounded-md'
                              onClick={_ => {
                                setName(name)
                                close(inputRef)
                              }}
                            >
                              {name}
                            </div>
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
            <SearchIcon className='h-6 w-6 text-white hover:opacity-70' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
