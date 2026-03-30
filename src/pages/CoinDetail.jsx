import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useWatchlist } from '../context/WatchlistContext'
import useFetch from '../hooks/useFetch'
import { getCoinById } from '../services/api'
import { formatCurrency, formatLargeNumber, formatPercent } from '../utils/formatters'
import styles from './CoinDetail.module.css'

function CoinDetail() {
  const { id } = useParams()
  const { toggleWatchlist, isInWatchlist } = useWatchlist()
  const { data: coin, loading, error } = useFetch(() => getCoinById(id), [id])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!coin) {
    return <div className="status-box">Coin not found.</div>
  }

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.coinInfo}>
            <img src={coin.image.small} alt={coin.name} className={styles.image} />
            <div>
              <h1>{coin.name}</h1>
              <p>{coin.symbol.toUpperCase()}</p>
            </div>
          </div>

          <button className={styles.actionButton} onClick={() => toggleWatchlist(coin)}>
            {isInWatchlist(coin.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span>Current Price</span>
            <strong>{formatCurrency(coin.market_data.current_price.usd)}</strong>
          </div>
          <div className={styles.statBox}>
            <span>Market Cap</span>
            <strong>{formatLargeNumber(coin.market_data.market_cap.usd)}</strong>
          </div>
          <div className={styles.statBox}>
            <span>All-Time High</span>
            <strong>{formatCurrency(coin.market_data.ath.usd)}</strong>
          </div>
        </div>

        <div className={styles.changeRow}>
          <p>
            <strong>1h:</strong> {formatPercent(coin.market_data.price_change_percentage_1h_in_currency.usd)}
          </p>
          <p>
            <strong>24h:</strong> {formatPercent(coin.market_data.price_change_percentage_24h)}
          </p>
          <p>
            <strong>7d:</strong> {formatPercent(coin.market_data.price_change_percentage_7d)}
          </p>
        </div>

        <div className={styles.description}>
          <h2>Description</h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                coin.description.en || 'No description available for this coin.',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default CoinDetail
