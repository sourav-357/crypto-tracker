import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import { formatCurrency, formatLargeNumber, formatPercent } from '../utils/formatters'
import styles from './CoinRow.module.css'

function CoinRow({ coin }) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist()
  const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0

  return (
    <tr className={styles.row}>
      <td>
        <div className={styles.coinInfo}>
          <img src={coin.image} alt={coin.name} className={styles.image} />
          <div>
            <Link to={`/coin/${coin.id}`} className={styles.nameLink}>
              {coin.name}
            </Link>
            <div className={styles.symbol}>{coin.symbol.toUpperCase()}</div>
          </div>
        </div>
      </td>
      <td>{formatCurrency(coin.current_price)}</td>
      <td className={isPositive ? styles.positive : styles.negative}>
        {formatPercent(coin.price_change_percentage_24h)}
      </td>
      <td>{formatLargeNumber(coin.market_cap)}</td>
      <td>
        <button
          className={styles.watchButton}
          onClick={() => toggleWatchlist(coin)}
        >
          {isInWatchlist(coin.id) ? 'Remove' : 'Save'}
        </button>
      </td>
    </tr>
  )
}

export default CoinRow
