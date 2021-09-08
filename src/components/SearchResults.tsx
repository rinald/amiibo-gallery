import React, { useState, useContext } from 'react'
import { GlobeIcon, EmojiSadIcon } from '@heroicons/react/outline'

import { trackWindowScroll } from 'react-lazy-load-image-component'
import type { ScrollPosition } from 'react-lazy-load-image-component'

import AmiiboCard from './AmiiboCard'
import AmiiboDialog from './AmiiboDialog'

import { SettingsContext } from '../App'

import { useAmiiboSearch, useAutocomplete } from '../hooks/search-hook'
import type { Amiibo } from '../types'

type Props = {
  name: string
  scrollPosition: ScrollPosition
}

const SearchResults: React.FC<Props> = ({ name, scrollPosition }) => {
  const { data, isLoading } = useAmiiboSearch(name)
  const [amiibo, setAmiibo] = useState<Amiibo | null>(null)
  const suggestions = useAutocomplete(name)
  const [settings] = useContext(SettingsContext)

  return (
    <div>
      <AmiiboDialog
        amiiboState={[amiibo, setAmiibo]}
        darkMode={settings.darkMode}
      />
      {isLoading ? (
        <div className='grid h-screen justify-center content-center'>
          <GlobeIcon className='w-32 h-32 animate-pulse text-gray-400 dark:text-white' />
        </div>
      ) : data && 'amiibo' in data ? (
        <div
          className={`grid gap-2 m-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
        >
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
        <div className='grid h-screen justify-center content-center dark:text-white'>
          <EmojiSadIcon className='w-32 h-32 text-gray-400 dark:text-white mx-auto' />
          {name !== '' ? (
            <p>No search results for {name}</p>
          ) : (
            <p>Try searching for something</p>
          )}
          {suggestions.length !== 0 && name.length >= 3 && (
            <>
              {suggestions[0] !== name && (
                <p className='mx-auto'>
                  Did you mean{' '}
                  <span className='text-red-500 dark:text-red-300'>
                    {suggestions[0]}
                  </span>
                  ?
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default trackWindowScroll(SearchResults)
