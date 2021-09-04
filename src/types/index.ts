type Games = {
  amiiboUsage?: { Usage: string; write: boolean }[]
  gameID: string[]
  gameName: string
}

type Amiibo = {
  amiiboSeries: string
  character: string
  gameSeries: string
  head: string
  image: string
  name: string
  release: { [key in 'au' | 'eu' | 'jp' | 'na']?: string }
  tail: string
  type: string
  games3DS?: Games[]
  gamesSwitch?: Games[]
  gamesWiiU?: Games[]
}

type AmiiboResponse = {
  amiibo: Amiibo[]
}

type ErrorResponse = {
  code: number
  error: string
}

type Response = {
  amiibo: { key: string; name: string }[]
}

type Notification = {
  type: 'success' | 'error'
  message: string
}

type Settings = {
  [key in 'darkMode' | 'figures' | 'cards' | 'yarn']: boolean
  //   darkMode: boolean
  //   figures: boolean
  //   cards: boolean
  //   yarn: boolean
}

export {
  Amiibo,
  AmiiboResponse,
  ErrorResponse,
  Response,
  Notification,
  Settings,
}
