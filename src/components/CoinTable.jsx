import CoinRow from './CoinRow'
import styles from './CoinTable.module.css'

function CoinTable({ coins, sortConfig, onSortChange }) {
  const getArrow = (key) => {
    if (sortConfig.key !== key) {
      return '↕'
    }

    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              <button
                className={styles.headerButton}
                onClick={() => onSortChange('current_price')}
              >
                Price {getArrow('current_price')}
              </button>
            </th>
            <th>24h Change</th>
            <th>
              <button
                className={styles.headerButton}
                onClick={() => onSortChange('market_cap')}
              >
                Market Cap {getArrow('market_cap')}
              </button>
            </th>
            <th>Watchlist</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <CoinRow key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoinTable
