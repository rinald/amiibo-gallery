import React, { useState } from 'react'

import Notification from '../components/Notification'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

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
      <Notification />
    </div>
  )
}

export default HomePage
