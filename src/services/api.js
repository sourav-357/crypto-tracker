const BASE_URL = 'https://api.coingecko.com/api/v3'

async function fetchData(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Unable to load crypto data. Please try again.')
  }

  return response.json()
}

export const getTopCoins = (page = 1, perPage = 50) =>
  fetchData(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d`,
  )

export const getCoinById = (id) =>
  fetchData(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
  )

export const searchCoins = (query) =>
  fetchData(`${BASE_URL}/search?query=${encodeURIComponent(query)}`)
