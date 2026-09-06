import React from 'react'
import { projects, employees } from '../data/mock'

export default function ProjectDrawer({id,onClose}:{id:string,onClose:()=>void}){
  const p = projects.find(x=>x.id===id)!

  function compatibilityScore(emp: typeof employees[0]){
    let score = emp.disponibilidade || 0
    const ctx = `${p.nome} ${p.fase} ${p.cliente}`.toLowerCase()
    // data/analytics projects
    if(/data|bi|lake|spark|databricks|etl|dashboard/i.test(ctx)){
      if(emp.departamento==='Dados') score += 30
      if(/engenheiro|dados|data/i.test(emp.cargo)) score += 20
    }
    // web/app projects
    if(/app|portal|mobile|frontend|backend|erp|portal|cliente/i.test(ctx)){
      if(emp.departamento==='TI') score += 30
      if(/desenvolvedor|analista|dev/i.test(emp.cargo)) score += 20
    }
    // infra/security
    if(/seguran|security|cloud|infra|aws|kubernetes|devops/i.test(ctx)){
      if(emp.departamento==='Infra') score += 30
      if(/infra|devops|engenheiro/i.test(emp.cargo)) score += 15
    }
    return Math.min(100, Math.round(score))
  }

  // choose number of slots equal to current equipe length or fallback to 3
  const slots = Math.max(1, p.equipe?.length || 3)

  const candidates = employees.map(e=>({...e, score: compatibilityScore(e)})).filter(e=>!!e.id && !p.equipe.includes(e.id))
  candidates.sort((a,b)=>b.score - a.score)
  const suggested = candidates.slice(0, slots)

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className={`drawer-panel open`} onClick={e=>e.stopPropagation()}>
        <div className="drawer-header">
          <button onClick={onClose} style={{width:32,height:32,borderRadius:8,background:'var(--chipBg)',border:'1px solid var(--border)'}}>×</button>
        </div>
        <div className="drawer-content">
          <h3 style={{fontSize:16,fontWeight:600}}>{p.nome}</h3>
          <div style={{fontSize:12,fontFamily:'DM Mono',color:'var(--textMuted)'}}>{p.cliente} · {p.fase}</div>

          <div style={{marginTop:8}}>
            <div><strong>Orçamento:</strong> R$ {p.orcamento.toLocaleString('pt-BR')}</div>
            <div><strong>Prazo:</strong> {p.deadline}</div>
          </div>

          <div>
            <h4 className="text-sub" style={{marginTop:12,fontFamily:'DM Mono',fontSize:11,textTransform:'uppercase',color:'var(--textMuted)'}}>Equipe sugerida</h4>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {suggested.map(u=> (
                <div key={u.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,padding:'8px',borderRadius:8,background:'var(--surfaceAlt)',border:'1px solid var(--border)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:8,background:'var(--chipBg)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>{u.nome.split(' ').map(p=>p[0]).slice(0,2).join('')}</div>
                    <div>
                      <div style={{fontSize:14,fontWeight:600}}>{u.nome}</div>
                      <div style={{fontSize:12,color:'var(--textMuted)'}}>{u.cargo} · {u.departamento}</div>
                    </div>
                  </div>

                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6}}>
                    <div style={{fontFamily:'DM Mono',fontSize:12}}>{u.disponibilidade}% livre</div>
                    <div style={{width:120,height:8,background:'rgba(0,0,0,0.06)',borderRadius:6,overflow:'hidden'}}>
                      <div style={{width:`${u.score}%`,height:'100%',background:'var(--accent)'}} />
                    </div>
                    <div style={{fontSize:12,fontFamily:'DM Mono',color:'var(--textMuted)'}}>{u.score}% compatibilidade</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
