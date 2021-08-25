import React from 'react'

import { useAmiiboSearch } from '../hooks/search-hook'
import AmiiboCard from './AmiiboCard'

type Props = {
  name: string
}

const SearchResults: React.FC<Props> = ({ name }) => {
  const { data, isLoading } = useAmiiboSearch(name)

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className='grid gap-2 m-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data?.amiibo?.map(amiibo => (
        <AmiiboCard
          key={amiibo.character + '-' + amiibo.head + amiibo.tail}
          amiibo={amiibo}
        />
      ))}
    </div>
  )
}

export default SearchResults
