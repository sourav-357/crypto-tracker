function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by coin name or symbol"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="search-input"
    />
  )
}

export default SearchBar
