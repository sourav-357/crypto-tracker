import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WatchlistContext = createContext()
const STORAGE_KEY = 'crypto-watchlist'

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY)
    return savedItems ? JSON.parse(savedItems) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (coin) => {
    setWatchlist((currentItems) => {
      const alreadySaved = currentItems.some((item) => item.id === coin.id)
      return alreadySaved ? currentItems : [...currentItems, coin]
    })
  }

  const removeFromWatchlist = (coinId) => {
    setWatchlist((currentItems) =>
      currentItems.filter((item) => item.id !== coinId),
    )
  }

  const toggleWatchlist = (coin) => {
    const exists = watchlist.some((item) => item.id === coin.id)

    if (exists) {
      removeFromWatchlist(coin.id)
    } else {
      addToWatchlist(coin)
    }
  }

  const isInWatchlist = (coinId) =>
    watchlist.some((item) => item.id === coinId)

  const value = useMemo(
    () => ({
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      toggleWatchlist,
      isInWatchlist,
    }),
    [watchlist],
  )

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)

  if (!context) {
    throw new Error('useWatchlist must be used inside WatchlistProvider')
  }

  return context
}
