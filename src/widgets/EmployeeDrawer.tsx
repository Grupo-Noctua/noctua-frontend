import React from 'react'
import { employees, projects } from '../data/mock'

function formatJoin(dateStr:string){
  const d = new Date(dateStr)
  if(isNaN(d.getTime())) return dateStr
  const day = String(d.getDate()).padStart(2,'0')
  const month = d.toLocaleString('pt-BR',{month:'short'})
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

function timeAtCompany(joinDate:string){
  const start = new Date(joinDate)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  if(months < 0){ years -= 1; months += 12 }
  return {years, months}
}

export default function EmployeeDrawer({id,onClose}:{id:string,onClose:()=>void}){
  const u = employees.find(x=>x.id===id)!
  const proj = u.projectId ? projects.find(p=>p.id===u.projectId) : null

  const availColor = u.disponibilidade >= 60 ? 'green' : u.disponibilidade >= 30 ? 'orange' : 'red'
  const {years,months} = timeAtCompany(u.dataIngresso)

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className={`drawer-panel open`} onClick={e=>e.stopPropagation()} style={{width:400}}>
        <div className="drawer-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:44,height:44,borderRadius:9999,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--accent)',color:'white',fontWeight:700}}>{u.nome.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
            <div>
              <div style={{fontSize:16,fontWeight:600,color:'var(--text)'}}>{u.nome}</div>
              <div style={{fontSize:13,color:'var(--textMuted)'}}>{u.cargo}</div>
            </div>
          </div>

          <button onClick={onClose} style={{width:32,height:32,borderRadius:8,background:'var(--chipBg)',border:'1px solid var(--border)'}}>×</button>
        </div>

        <div className="drawer-content">
          {/* Seção 1: Informações */}
          <div>
            <div style={{fontSize:11,fontFamily:'DM Mono',textTransform:'uppercase',color:'var(--textMuted)',marginBottom:12}}>INFORMAÇÕES</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div>
                <div style={{fontSize:11,fontFamily:'DM Mono',color:'var(--textMuted)'}}>Departamento</div>
                <div style={{fontSize:14,color:'var(--text)'}}>{u.departamento}</div>
              </div>

              <div>
                <div style={{fontSize:11,fontFamily:'DM Mono',color:'var(--textMuted)'}}>Localização</div>
                <div style={{fontSize:14,color:'var(--text)'}}>{u.localizacao}</div>
              </div>

              <div>
                <div style={{fontSize:11,fontFamily:'DM Mono',color:'var(--textMuted)'}}>Data de ingresso</div>
                <div style={{fontSize:14,color:'var(--text)'}}>{formatJoin(u.dataIngresso)}</div>
              </div>

              <div>
                <div style={{fontSize:11,fontFamily:'DM Mono',color:'var(--textMuted)'}}>Disponibilidade</div>
                <div style={{fontSize:14,color:availColor,fontWeight:600}}>{u.disponibilidade}%</div>
                <div style={{width:'100%',height:6,background:'rgba(128,128,128,0.12)',borderRadius:999,marginTop:6}}>
                  <div style={{width:`${u.disponibilidade}%`,height:6,borderRadius:999,background:availColor}} />
                </div>
              </div>
            </div>
          </div>

          <div style={{height:1,background:'var(--border)',margin:'16px 0'}} />

          {/* Seção 2: Projeto atual */}
          <div>
            <div style={{fontSize:11,fontFamily:'DM Mono',textTransform:'uppercase',color:'var(--textMuted)',marginBottom:12}}>PROJETO ATUAL</div>
            {proj ? (
              <div style={{borderRadius:12,padding:'12px 14px',background:'var(--surfaceAlt)',border:'1px solid var(--border)'}}>
                <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{proj.nome}</div>
                <div style={{fontSize:12,color:'var(--textMuted)'}}>{proj.cliente}</div>
                <div style={{marginTop:8}}>
                  <div style={{display:'inline-block',padding:'4px 8px',borderRadius:8,background:'var(--chipBg)',border:'1px solid var(--border)',fontSize:12,color:'var(--textSub)'}}>{proj.status}</div>
                </div>
                <div style={{width:'100%',height:6,background:'rgba(128,128,128,0.12)',borderRadius:999,marginTop:8}}>
                  <div style={{width:`${proj.progresso}%`,height:6,borderRadius:999,background:'var(--accent)'}} />
                </div>
              </div>
            ) : (
              <div style={{fontSize:13,color:'var(--textMuted)'}}>Sem projeto ativo</div>
            )}
          </div>

          <div style={{height:1,background:'var(--border)',margin:'16px 0'}} />

          {/* Seção 3: Tempo na Empresa */}
          <div>
            <div style={{fontSize:11,fontFamily:'DM Mono',textTransform:'uppercase',color:'var(--textMuted)',marginBottom:12}}>TEMPO NA EMPRESA</div>
            <div style={{fontSize:14,color:'var(--text)'}}>{years} anos e {months} meses</div>
            <div style={{fontSize:12,fontFamily:'DM Mono',color:'var(--textMuted)',marginTop:6}}>{formatJoin(u.dataIngresso)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
