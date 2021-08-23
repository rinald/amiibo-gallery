import React from 'react'
import { Popover } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'

import { useAutocomplete } from '../hooks/search-hook'
import useInput from '../hooks/input-hook'

type Props = {
  search: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    nameQuery: string,
  ) => void
}

const SearchBar: React.FC<Props> = ({ search }) => {
  const { setValue: setName, ...textField } = useInput('text')
  const nameSuggestions = useAutocomplete(textField.value)

  return (
    <div>
      <div className='flex flex-row py-2 bg-red-600'>
        <div className='flex flex-row gap-4 p-2 mx-auto'>
          {textField.value !== '' && nameSuggestions?.length !== 0 ? (
            <Popover className='relative'>
              <Popover.Panel static className='absolute z-10 mx-5 my-12'>
                <div className='flex flex-col divide-y gap-2 bg-gray-200 p-4 w-64 sm:w-80 rounded-md'>
                  {nameSuggestions?.map((name, index) => (
                    <div
                      key={`${name}-${index}`}
                      className='hover:font-bold'
                      onClick={_ => setName(name)}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Popover>
          ) : (
            <></>
          )}
          <input
            className='w-64 sm:w-96 p-2 focus:outline-none'
            {...textField}
          />
          <button onClick={event => search(event, textField.value)}>
            <SearchIcon className='h-6 w-6 text-white hover:opacity-70' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
