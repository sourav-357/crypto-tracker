import { NavLink } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import styles from './Navbar.module.css'

function Navbar() {
  const { watchlist } = useWatchlist()

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>CryptoTracker</div>

      <nav className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Watchlist
          <span className={styles.badge}>{watchlist.length}</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
