import React from 'react'
import { dashboard } from '../api'
import useApiQuery from '../useApiQuery'
import ApiContent from './ApiContent'

export default function KPIs(){
  const totalEmployees = useApiQuery(dashboard.totalFuncionarios)
  const projectsAnalyzed = useApiQuery(dashboard.totalProjetos)
  const tools = useApiQuery(dashboard.ferramentasMaisUtilizadas)
  // The API orders tied tools alphabetically; show only the first one.
  const mostUsed = tools.data?.[0]?.ferramenta || 'Não informado'

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-8">
      <div className="card kpi-accent-1">
        <div className="kpi-label">Número de Funcionários</div>
        <ApiContent query={totalEmployees}><div className="kpi-value">{totalEmployees.data?.total}</div></ApiContent>
        <div className="kpi-sub">Total de funcionários cadastrados</div>
      </div>

      <div className="card kpi-accent-2">
        <div className="kpi-label">Número de Projetos Analisados</div>
        <ApiContent query={projectsAnalyzed}><div className="kpi-value">{projectsAnalyzed.data?.total}</div></ApiContent>
        <div className="kpi-sub">Projetos usados para as métricas</div>
      </div>

      <div className="card kpi-accent-3">
        <div className="kpi-label">Ferramenta mais utilizada</div>
        <ApiContent query={tools} empty={tools.data?.length === 0}><div className="kpi-value">{mostUsed}</div></ApiContent>
        <div className="kpi-sub">Baseado no somatório de uso por projeto</div>
      </div>
    </div>
  )
}
