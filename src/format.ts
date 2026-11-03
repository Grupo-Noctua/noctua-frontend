export function formatCurrency(value: number | string | null | undefined) {
  if (value == null || value === '') return 'Não informado'
  const amount = Number(value)
  return Number.isFinite(amount)
    ? amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'Não informado'
}

export function formatDate(value: string | null | undefined) {
  if (!value) return 'Não informado'
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? 'Não informado'
    : date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}
