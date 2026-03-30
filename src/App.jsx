import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CoinDetail from './pages/CoinDetail'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'

function App() {
  return (
    <div>
      <Navbar />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
