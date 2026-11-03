import React from 'react'

type QueryState = { loading: boolean, error: string | null, retry: () => void }

export default function ApiContent({ query, empty = false, children }: {
  query: QueryState,
  empty?: boolean,
  children: React.ReactNode
}) {
  if (query.loading) return <div role="status" className="text-sub">Carregando dados da API...</div>
  if (query.error) return (
    <div role="alert">
      <p>{query.error}</p>
      <button className="btn" onClick={query.retry}>Tentar novamente</button>
    </div>
  )
  if (empty) return <div className="text-sub">Nenhum dado retornado pela API.</div>
  return <>{children}</>
}
