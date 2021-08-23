import React from 'react'
import type { Amiibo } from '../types/index'

type Props = {
  amiibo: Amiibo
}

const AmiiboCard: React.FC<Props> = ({ amiibo }) => {
  return (
    <div className='flex flex-row gap-2 p-4 border rounded-md border-gray-300 bg-white shadow-sm'>
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
  )
}

export default AmiiboCard
