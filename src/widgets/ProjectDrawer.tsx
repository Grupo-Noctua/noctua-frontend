import React from 'react'
import { projects, employees } from '../data/mock'

export default function ProjectDrawer({id,onClose}:{id:string,onClose:()=>void}){
  const p = projects.find(x=>x.id===id)!
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className={`drawer-panel open`} onClick={e=>e.stopPropagation()}>
        <div className="drawer-header">
          <button onClick={onClose} style={{width:32,height:32,borderRadius:8,background:'var(--chipBg)',border:'1px solid var(--border)'}}>×</button>
        </div>
        <div className="drawer-content">
          <h3 style={{fontSize:16,fontWeight:600}}>{p.nome}</h3>
          <div style={{fontSize:12,fontFamily:'DM Mono',color:'var(--textMuted)'}}>{p.cliente} · {p.fase}</div>
          <div>
            <div><strong>Status:</strong> {p.status}</div>
            <div><strong>Progresso:</strong> {p.progresso}%</div>
            <div><strong>Orçamento:</strong> R$ {p.orcamento.toLocaleString('pt-BR')}</div>
            <div><strong>Gasto:</strong> R$ {p.gasto.toLocaleString('pt-BR')}</div>
            <div><strong>Prazo:</strong> {p.deadline}</div>
          </div>

          <div>
            <h4 className="text-sub" style={{marginTop:12,fontFamily:'DM Mono',fontSize:11,textTransform:'uppercase',color:'var(--textMuted)'}}>Equipe</h4>
            <ul>
              {p.equipe.map(id=>{
                const u = employees.find(e=>e.id===id)
                return <li key={id} className="py-1">{u?.nome} · {u?.cargo}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
