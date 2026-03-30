# CryptoTracker

A clean cryptocurrency tracker built with **React** and **Vite**. It lets users browse the top 50 coins, search and sort market data, open detailed coin pages, and keep a personal watchlist saved in `localStorage`.

## ✨ Features

- View the **top 50 cryptocurrencies** by market cap
- **Search** coins by name or symbol
- **Sort** market data directly from the table
- Browse results with **pagination**
- Auto-refresh prices every **60 seconds**
- Open a **coin detail page** with price, market cap, ATH, and performance stats
- Save favorites to a **persistent watchlist**
- Friendly loading and error states for a smoother UX

## 🛠️ Tech Stack

- `React 18`
- `Vite 5`
- `React Router DOM`
- `CSS Modules`
- `CoinGecko API`

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build locally |

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI pieces like table, navbar, pagination
├── context/        # Watchlist state management
├── hooks/          # Custom hooks such as data fetching
├── pages/          # Home, coin detail, and watchlist pages
├── services/       # API requests to CoinGecko
└── utils/          # Formatting helpers
```

## 🌐 Data Source

This project uses the public **CoinGecko API** to fetch cryptocurrency market and coin detail data.

## ✅ What You Can Do in the App

1. Browse the latest crypto rankings on the home page
2. Search and sort coins to find what you need quickly
3. Open any coin for more detailed information
4. Add coins to your watchlist and keep them saved after refresh

## 📌 Notes

- Watchlist data is stored in the browser using `localStorage`
- The app depends on a public API, so temporary rate limits or network issues may affect results

---

A solid beginner-to-intermediate React project for practicing **routing**, **state management**, **API integration**, and **responsive UI structure**.
