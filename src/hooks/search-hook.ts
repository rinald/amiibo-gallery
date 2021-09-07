import { useContext } from 'react'
import useSWR from 'swr'

import type { AmiiboResponse, ErrorResponse, Response } from '../types/index'
import { SettingsContext } from '../App'

const fetcher = (url: string) => fetch(url).then(res => res.json())
const baseUrl = 'https://amiiboapi.com/api'

// hook for providing autocomplete suggestions
const useAutocomplete = (character: string) => {
  const url = `${baseUrl}/character/`

  // load character names from the character API endpoint
  // the data is prefetched in index.html
  const { data } = useSWR<Response, Error>(url, fetcher)

  let characters = data?.amiibo
    .map(({ name }) => name) // extract name from character object
    .filter(name => name.toLowerCase().includes(character.toLowerCase())) // filter the names that match the search query

  characters = [...new Set(characters)] // remove duplicates

  return character !== '' ? characters.slice(0, 5) : []
}

// hook for providing amiibo search results
const useAmiiboSearch = (character: string) => {
  const [settings] = useContext(SettingsContext) // load app settings

  const url = `${baseUrl}/amiibo/`

  // pick amiibo type to display from settings and
  // display a specific character or all characters
  const { data, error } = useSWR<AmiiboResponse | ErrorResponse, Error>(
    `${url}?type=${settings.amiiboType ?? 'figure'}${
      character !== '' ? `&character=${character}` : ''
    }`,
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export { useAutocomplete, useAmiiboSearch }
