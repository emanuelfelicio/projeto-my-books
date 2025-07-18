import { React, useState } from 'react'
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage
} from '../utils/localStorageFavorites'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'

const FavoriteButton = ({ id, button = false, onChange }) => {
  const [isFav, setIsFav] = useState(() => {
    const storage = getFavoritesFromStorage()
    return Boolean(storage[id])
  })

  function toggleFavorite (e) {
    e.stopPropagation()

    const storage = getFavoritesFromStorage()

    if (storage[id]) {
      delete storage[id]
      setIsFav(false)
    } else {
      storage[id] = true
      setIsFav(true)
    }

    saveFavoritesToStorage(storage)
    if (onChange) onChange()
  }

  return (
    <span onClick={toggleFavorite}>
      {button ? (
        !isFav ? (
          <button className='font-bold bg-blue-600 py-2.5 px-3 rounded-2xl text-white  hover:bg-blue-700 transition-all duration-200 cursor-pointer whitespace-nowrap'>
            Favoritar
          </button>
        ) : (
          <button className='font-bold bg-blue-400 py-2.5 px-3 rounded-2xl text-white  hover:bg-blue-500 transition-all duration-200 cursor-pointer whitespace-nowrap'>
            Desfavoritar
          </button>
        )
      ) : isFav ? (
        <StarIcon
          className={`absolute -right-2 -top-2.5 w-7 h-7 text-yellow-400 cursor-pointer z-20 hover:scale-[115%] transition-all ${'bounceOnce'}`}
        />
      ) : (
        <StarIconOutline
          className={`absolute -right-2 -top-2.5 w-7 h-7 text-yellow-600 stroke-2 fill-white cursor-pointer z-20 hover:scale-[115%] transition-all ${'bounceOnce'}`}
        />
      )}
    </span>
  )
}

export default FavoriteButton
