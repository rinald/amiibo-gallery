import React, { useState } from 'react'
import { GlobeIcon, EmojiSadIcon } from '@heroicons/react/outline'

import { trackWindowScroll } from 'react-lazy-load-image-component'
import type { ScrollPosition } from 'react-lazy-load-image-component'

import AmiiboCard from './AmiiboCard'
import AmiiboDialog from './AmiiboDialog'

import { useAmiiboSearch } from '../hooks/search-hook'
import type { Amiibo } from '../types'

type Props = {
  name: string
  scrollPosition: ScrollPosition
}

const SearchResults: React.FC<Props> = ({ name, scrollPosition }) => {
  const { data, isLoading } = useAmiiboSearch(name)
  const [amiibo, setAmiibo] = useState<Amiibo | null>(null)

  return (
    <div>
      <AmiiboDialog amiiboState={[amiibo, setAmiibo]} />
      {isLoading ? (
        <div className='grid h-screen justify-center content-center'>
          <GlobeIcon className='w-32 h-32 animate-pulse text-gray-400' />
        </div>
      ) : data && 'amiibo' in data ? (
        <div className='grid gap-2 m-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.amiibo.map(amiibo => (
            <AmiiboCard
              key={amiibo.character + '-' + amiibo.head + amiibo.tail}
              amiibo={amiibo}
              onExpand={() => setAmiibo(amiibo)}
              scrollPosition={scrollPosition}
            />
          ))}
        </div>
      ) : (
        <div className='grid h-screen justify-center content-center '>
          <EmojiSadIcon className='w-32 h-32 text-gray-400 mx-auto' />
          <div>No search results for {name}</div>
        </div>
      )}
    </div>
  )
}

export default trackWindowScroll(SearchResults)
