import { useCallback, useEffect, useState } from 'react'

export default function useApiQuery<T>(load: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  const retry = useCallback(() => setAttempt(value => value + 1), [])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    setData(null)
    load().then(result => {
      if (mounted) setData(result)
    }).catch(() => {
      if (mounted) setError('Não foi possível carregar os dados da API.')
    }).finally(() => {
      if (mounted) setLoading(false)
    })
    return () => { mounted = false }
  }, [load, attempt])

  return { data, loading, error, retry }
}
