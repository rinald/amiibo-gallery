import useSWR from 'swr'
import type { AmiiboResponse, Response, Endpoint } from '../types/index'

const fetcher = (url: string) => fetch(url).then(res => res.json())
const baseUrl = 'https://amiiboapi.com/api/'

const useAutocomplete = (partialName: string) => {
  const url = `${baseUrl}/character`
  const { data } = useSWR<Response, Error>(url, fetcher)

  return partialName !== ''
    ? data?.amiibo
        .map(({ name }) => name)
        .filter(name => name.toLowerCase().includes(partialName.toLowerCase()))
        .slice(0, 5)
    : undefined
}

const useAmiiboSearch = (name: string) => {
  const url = `${baseUrl}/amiibo`
  const { data, error } = useSWR<AmiiboResponse, Error>(
    `${url}${name !== '' ? `?name=${name}` : ''}`,
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

// const useSearch = (query: string, endpoint: Endpoint) => {}

export { useAutocomplete, useAmiiboSearch }
