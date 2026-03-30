import { useEffect, useState } from 'react'

function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    setLoading(true)
    setError('')

    fetchFunction()
      .then((result) => {
        if (!ignore) {
          setData(result)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || 'Something went wrong.')
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, dependencies)

  return { data, loading, error }
}

export default useFetch
