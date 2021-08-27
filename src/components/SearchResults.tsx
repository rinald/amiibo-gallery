import React from 'react'

import { useAmiiboSearch } from '../hooks/search-hook'
import AmiiboCard from './AmiiboCard'

import { GlobeIcon, EmojiSadIcon } from '@heroicons/react/outline'

type Props = {
  name: string
}

const SearchResults: React.FC<Props> = ({ name }) => {
  const { data, isLoading } = useAmiiboSearch(name)

  return isLoading ? (
    <div className='grid h-screen justify-center content-center'>
      <GlobeIcon className='w-32 h-32 animate-pulse text-gray-400' />
    </div>
  ) : data && 'amiibo' in data ? (
    <div className='grid gap-2 m-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data.amiibo.map(amiibo => (
        <AmiiboCard
          key={amiibo.character + '-' + amiibo.head + amiibo.tail}
          amiibo={amiibo}
        />
      ))}
    </div>
  ) : (
    <div className='grid h-screen justify-center content-center '>
      <EmojiSadIcon className='w-32 h-32 text-gray-400 mx-auto' />
      <div>No search results for {name}</div>
    </div>
  )
}

export default SearchResults
