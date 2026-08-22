import React from 'react'
import { employees } from '../data/mock'

export default function EmployeeDrawer({id,onClose}:{id:string,onClose:()=>void}){
  const u = employees.find(x=>x.id===id)!
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className={`drawer-panel open`} onClick={e=>e.stopPropagation()}>
        <div className="drawer-header">
          <button onClick={onClose} style={{width:32,height:32,borderRadius:8,background:'var(--chipBg)',border:'1px solid var(--border)'}}>×</button>
        </div>
        <div className="drawer-content">
          <h3 style={{fontSize:16,fontWeight:600}}>{u.nome}</h3>
          <div style={{fontSize:12,fontFamily:'DM Mono',color:'var(--textMuted)'}}>{u.cargo} · {u.departamento}</div>
          <div className="mt-4">Localização: {u.localizacao}</div>
          <div>Data de ingresso: {u.dataIngresso}</div>
          <div>Disponibilidade: {u.disponibilidade}%</div>
        </div>
      </div>
    </div>
  )
}
