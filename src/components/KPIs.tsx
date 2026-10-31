import React, { useEffect, useState } from 'react'
import { dashboard, FerramentaDTO } from '../api'

export default function KPIs(){
  const [totalEmployees, setTotalEmployees] = useState<number | null>(null)
  const [projectsAnalyzed, setProjectsAnalyzed] = useState<number | null>(null)
  const [mostUsed, setMostUsed] = useState<string>('—')

  useEffect(()=>{
    let mounted = true
    dashboard.totalFuncionarios().then(r=> { if(mounted) setTotalEmployees(r.total) }).catch(()=>{})
    dashboard.totalProjetos().then(r=> { if(mounted) setProjectsAnalyzed(r.total) }).catch(()=>{})
    dashboard.ferramentasMaisUtilizadas().then((list: FerramentaDTO[])=>{
      if(!mounted) return
      if(!list || list.length===0){ setMostUsed('—'); return }
      // join names if multiple tied
      setMostUsed(list.map(l=>l.ferramenta || '—').join(', '))
    }).catch(()=>{})
    return ()=>{ mounted = false }
  },[])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-8">
      <div className="card kpi-accent-1">
        <div className="kpi-label">Número de Funcionários</div>
        <div className="kpi-value">{totalEmployees ?? '—'}</div>
        <div className="kpi-sub">Total de funcionários cadastrados</div>
      </div>

      <div className="card kpi-accent-2">
        <div className="kpi-label">Número de Projetos Analisados</div>
        <div className="kpi-value">{projectsAnalyzed ?? '—'}</div>
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
