import React from 'react'
import { projects, employees, tools } from '../data/mock'

export default function KPIs(){
  const totalEmployees = employees.length
  const projectsAnalyzed = projects.length

  // determine most used tool by summing usoPorProjeto values
  const mostUsed = (()=>{
    let best = {toolName: '—', score:-1}
    for(const t of tools){
      const score = Object.values(t.usoPorProjeto).reduce((s,v)=>s+v,0)
      if(score > best.score){ best = {toolName: t.ferramenta, score} }
    }
    return best.toolName
  })()

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-8">
      <div className="card kpi-accent-1">
        <div className="kpi-label">Número de Funcionários</div>
        <div className="kpi-value">{totalEmployees}</div>
        <div className="kpi-sub">Total de funcionários cadastrados</div>
      </div>

      <div className="card kpi-accent-2">
        <div className="kpi-label">Número de Projetos Analisados</div>
        <div className="kpi-value">{projectsAnalyzed}</div>
        <div className="kpi-sub">Projetos usados para as métricas</div>
      </div>

      <div className="card kpi-accent-3">
        <div className="kpi-label">Ferramenta mais utilizada</div>
        <div className="kpi-value">{mostUsed}</div>
        <div className="kpi-sub">Baseado no somatório de uso por projeto</div>
      </div>
    </div>
  )
}
