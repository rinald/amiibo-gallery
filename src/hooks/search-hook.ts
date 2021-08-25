import useSWR from 'swr'
import type { AmiiboResponse, Response } from '../types/index'

const fetcher = (url: string) => fetch(url).then(res => res.json())
const baseUrl = 'https://amiiboapi.com/api/'

const useAutocomplete = (character: string) => {
  const url = `${baseUrl}/character`
  const { data } = useSWR<Response, Error>(url, fetcher)

  let characters = data?.amiibo
    .map(({ name }) => name)
    .filter(name => name.toLowerCase().includes(character.toLowerCase()))

  characters = [...new Set(characters)]

  return character !== '' ? characters.slice(0, 5) : []
}

const useAmiiboSearch = (character: string) => {
  const url = `${baseUrl}/amiibo`
  const { data, error } = useSWR<AmiiboResponse, Error>(
    `${url}?type=figure${character !== '' ? `&character=${character}` : ''}`,
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export { useAutocomplete, useAmiiboSearch }
