import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import { formatCurrency, formatPercent } from '../utils/formatters'
import styles from './Watchlist.module.css'

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist()

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Your watchlist</h1>
        <p>Saved coins are stored in localStorage, so they stay after refresh.</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="status-box">
          No coins saved yet. <Link to="/">Go back home</Link>
        </div>
      ) : (
        <div className={styles.list}>
          {watchlist.map((coin) => (
            <article key={coin.id} className={styles.card}>
              <div className={styles.coinInfo}>
                {coin.image && <img src={coin.image} alt={coin.name} className={styles.image} />}
                <div>
                  <h3>{coin.name}</h3>
                  <p>{coin.symbol.toUpperCase()}</p>
                  <p>Price: {formatCurrency(coin.current_price)}</p>
                  <p>24h: {formatPercent(coin.price_change_percentage_24h)}</p>
                </div>
              </div>

              <div className={styles.actions}>
                <Link to={`/coin/${coin.id}`} className={styles.linkButton}>
                  View Details
                </Link>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromWatchlist(coin.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Watchlist
