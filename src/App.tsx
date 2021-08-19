import React from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const useAmiibo = () => {
  const url = 'https://amiiboapi.com/api/amiibo/'
  const { data, error } = useSWR(url, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

function App() {
  const { data, isLoading, isError } = useAmiibo()

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isError) {
    return <div>Error!</div>
  } else {
    return (
      <div className='flex flex-col gap-2 divide-y'>
        {data.amiibo.map(amiibo => (
          <div id={amiibo.head + amiibo.tail}>{amiibo.character}</div>
        ))}
      </div>
    )
  }
}

export default App
