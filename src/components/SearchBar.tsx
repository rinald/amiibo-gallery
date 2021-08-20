import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import useInput from '../hooks/input-hook'
import { useAmiiboSearch, useAutocomplete } from '../hooks/search-hook'

const SearchBar: React.FC = () => {
  const textField = useInput('text')
  const nameSuggestions = useAutocomplete(textField.value)

  return (
    <div>
      <div className='flex flex-row gap-4 mx-auto'>
        <input {...textField} />
        <button>
          <SearchIcon />
        </button>
      </div>
      <div className='flex flex-col divide-y gap-2'>
        {nameSuggestions?.map(name => (
          <div>{name}</div>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
