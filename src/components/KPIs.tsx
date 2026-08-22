import React from 'react'
import { projects } from '../data/mock'

function currency(n:number){
  return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0})
}

export default function KPIs(){
  const active = projects.filter(p=>p.status!=='Concluído')
  const inDay = active.filter(p=>p.status==='Em dia').length
  const inRisk = active.filter(p=>p.status==='Em risco').length
  const avgProgress = Math.round(projects.reduce((s,p)=>s+p.progresso,0)/projects.length)
  const totalBudget = projects.reduce((s,p)=>s+p.orcamento, 0)
  const totalSpent = projects.reduce((s,p)=>s+p.gasto, 0)
  const pctUsed = Math.round((totalSpent/totalBudget)*100)

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="card kpi-left-accent">
        <div className="kpi-label">Projetos ativos</div>
        <div className="kpi-value">{active.length}</div>
        <div className="kpi-sub">{inDay} em dia · {inRisk} em risco</div>
      </div>
      <div className="card">
        <div className="kpi-label">Progresso médio</div>
        <div className="kpi-value">{avgProgress}%</div>
      </div>
      <div className="card">
        <div className="kpi-label">Em risco / atrasados</div>
        <div className="kpi-value">{projects.filter(p=>p.status==='Em risco' || p.status==='Atrasado').length}</div>
        <div className="kpi-sub">{projects.filter(p=>p.status==='Em dia').length} em dia</div>
      </div>
      <div className="card">
        <div className="kpi-label">Orçamento total</div>
        <div className="kpi-value">{currency(totalBudget)}</div>
        <div className="kpi-sub">{currency(totalSpent)} gasto — {pctUsed}% utilizado</div>
      </div>
    </div>
  )
}
