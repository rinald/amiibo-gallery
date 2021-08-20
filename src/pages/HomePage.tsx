import React, { useState } from 'react'

import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
// import useInput from '../hooks/input-hook'

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('')

  const search = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    nameQuery: string,
  ) => {
    event.preventDefault()
    setQuery(nameQuery)
  }

  return (
    <div>
      <SearchBar search={search} />
      <SearchResults name={query} />
    </div>
  )
}

export default HomePage
