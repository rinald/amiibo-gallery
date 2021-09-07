import React, { useState, useContext } from 'react'

import Notification from '../components/Notification'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

import { SettingsContext } from '../App'

const HomePage: React.FC = () => {
  // search query
  // updates only when the search button is clicked (pressed)
  // or when pressing return
  // ensures that search results do not update while typing
  const [query, setQuery] = useState('')

  const [settings] = useContext(SettingsContext)

  // handles the search action triggered
  // by a mouse or form event
  const search = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLInputElement>,
    nameQuery: string,
  ) => {
    event.preventDefault()
    setQuery(nameQuery)
  }

  return (
    <div className={settings.darkMode ? 'dark' : ''}>
      <div className='min-h-screen h-full dark:bg-gray-600'>
        <SearchBar search={search} />
        <SearchResults name={query} />
        <Notification />
      </div>
    </div>
  )
}

export default HomePage
