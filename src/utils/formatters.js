export function formatCurrency(value) {
  const safeValue = Number(value ?? 0)

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: safeValue < 1 ? 6 : 2,
  }).format(safeValue)
}

export function formatLargeNumber(value) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(Number(value ?? 0))
}

export function formatPercent(value) {
  return `${Number(value ?? 0).toFixed(2)}%`
}
