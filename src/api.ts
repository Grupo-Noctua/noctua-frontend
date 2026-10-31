// Simple API client for dashboard endpoints. Uses relative paths so Vite
// dev proxy can forward requests to the Spring backend.

export type TotalDTO = { total: number }
export type FerramentaDTO = { ferramenta: string | null, quantidade: number }
export type TecnologiaDTO = { tecnologia: string | null, quantidade: number }
export type SenioridadeDTO = { senioridade: string | null, quantidade: number }
export type AreaDTO = { area: string | null, quantidade: number }

export type ProfissionalRecomendadoDTO = {
  idProfissional?: string | null,
  nome?: string | null,
}

export type ProjetoDTO = {
  idProcessamento: number,
  idProjeto?: number | null,
  nomeProjeto?: string | null,
  cliente?: string | null,
  dataInicioPrevista?: string | null,
  orcamento?: number | string | null,
  profissionaisRecomendados?: ProfissionalRecomendadoDTO[]
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { credentials: 'same-origin' })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API ${path} failed: ${res.status} ${res.statusText} ${text}`)
  }
  return res.json() as Promise<T>
}

export const dashboard = {
  totalFuncionarios: () => fetchJson<TotalDTO>('/api/dashboard/funcionarios/total'),
  totalProjetos: () => fetchJson<TotalDTO>('/api/dashboard/projetos/total'),
  ferramentasMaisUtilizadas: () => fetchJson<FerramentaDTO[]>('/api/dashboard/ferramentas/mais-utilizada'),
  funcionariosPorTecnologia: () => fetchJson<TecnologiaDTO[]>('/api/dashboard/funcionarios/tecnologia'),
  funcionariosPorSenioridade: () => fetchJson<SenioridadeDTO[]>('/api/dashboard/funcionarios/senioridade'),
  funcionariosPorArea: () => fetchJson<AreaDTO[]>('/api/dashboard/funcionarios/area'),
  projetosPorTecnologia: () => fetchJson<TecnologiaDTO[]>('/api/dashboard/projetos/tecnologia'),
  projetos: () => fetchJson<ProjetoDTO[]>('/api/dashboard/projetos'),
}

export default dashboard
