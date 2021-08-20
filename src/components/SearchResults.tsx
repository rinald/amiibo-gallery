import React from 'react'

import { useAmiiboSearch } from '../hooks/search-hook'

type Props = {
  name: string
}

const SearchResults: React.FC<Props> = ({ name }) => {
  const { data, isLoading } = useAmiiboSearch(name)

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className='bg-gray-50 grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data?.amiibo?.map(amiibo => (
        <div className='flex flex-row gap-2 p-4'>
          <img src={amiibo.image} className='w-32'></img>
          <div className='flex flex-col gap-2 p-2 font-bold'>
            <div>Character: {amiibo.character}</div>
            <div>Game Series: {amiibo.gameSeries}</div>
            <ul>
              <li>AU: {amiibo.release.au ?? 'Unreleaded'}</li>
              <li>EU: {amiibo.release.eu ?? 'Unreleaded'}</li>
              <li>JP: {amiibo.release.jp ?? 'Unreleaded'}</li>
              <li>NA: {amiibo.release.na ?? 'Unreleaded'}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchResults
