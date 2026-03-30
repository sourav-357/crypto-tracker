import { useEffect, useMemo, useState } from 'react'
import CoinTable from '../components/CoinTable'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import useFetch from '../hooks/useFetch'
import { getTopCoins } from '../services/api'
import styles from './Home.module.css'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({
    key: 'market_cap',
    direction: 'desc',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [refreshTick, setRefreshTick] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshTick((previousValue) => previousValue + 1)
    }, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const { data, loading, error } = useFetch(() => getTopCoins(1, 50), [refreshTick])
  const coins = data || []

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) => {
      const text = `${coin.name} ${coin.symbol}`.toLowerCase()
      return text.includes(searchQuery.toLowerCase())
    })
  }, [coins, searchQuery])

  const sortedCoins = useMemo(() => {
    const copiedCoins = [...filteredCoins]

    copiedCoins.sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] - b[sortConfig.key]
      }

      return b[sortConfig.key] - a[sortConfig.key]
    })

    return copiedCoins
  }, [filteredCoins, sortConfig])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortConfig])

  const totalPages = Math.ceil(sortedCoins.length / 10)
  const startIndex = (currentPage - 1) * 10
  const paginatedCoins = sortedCoins.slice(startIndex, startIndex + 10)

  const handleSortChange = (key) => {
    setSortConfig((currentValue) => {
      if (currentValue.key === key) {
        return {
          key,
          direction: currentValue.direction === 'asc' ? 'desc' : 'asc',
        }
      }

      return { key, direction: 'desc' }
    })
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Top 50 cryptocurrencies</h1>
          <p>Search, sort, and auto-refresh the latest market data every 60 seconds.</p>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : sortedCoins.length === 0 ? (
        <div className="status-box">No coins match your search.</div>
      ) : (
        <>
          <CoinTable
            coins={paginatedCoins}
            sortConfig={sortConfig}
            onSortChange={handleSortChange}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  )
}

export default Home
