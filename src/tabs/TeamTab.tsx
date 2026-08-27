import React, { useMemo, useState } from 'react'
import { employees, projects } from '../data/mock'
import EmployeeDrawer from '../widgets/EmployeeDrawer'

function avatarBg(idx:number){
  const hue = (idx * 47) % 360
  return `hsl(${hue}deg 70% 45% / 1)`
}

function formatJoin(dateStr:string){
  const d = new Date(dateStr)
  if(isNaN(d.getTime())) return dateStr
  const day = String(d.getDate()).padStart(2,'0')
  const month = d.toLocaleString('pt-BR',{month:'short'})
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

function daysRemaining(deadline:string){
  const d = new Date(deadline)
  const now = new Date()
  const diff = Math.ceil((d.getTime() - now.getTime()) / (1000*60*60*24))
  return diff
}

export default function TeamTab(){
  const [filterProject, setFilterProject] = useState<'Todos'|string>('Todos')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<string|null>(null)

  // filtered list according to project filter and search
  const list = useMemo(()=> employees.filter(e=>{
    if(filterProject!=='Todos' && e.projectId!==filterProject) return false
    if(q && !e.nome.toLowerCase().includes(q.toLowerCase())) return false
    return true
  }),[filterProject,q])

  const selectedProject = useMemo(()=> projects.find(p=>p.id===filterProject),[filterProject])

  return (
    <div>
      {/* 1. Filtro por Projeto */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <button onClick={()=>setFilterProject('Todos')} style={filterProject==='Todos' ? {background:'var(--accentBg)',color:'var(--accent)',border:'1px solid var(--accentBorder)',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:500} : {background:'var(--chipBg)',color:'var(--textSub)',border:'1px solid var(--border)',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:500}}>Todos</button>
        {projects.map(p=> (
          <button key={p.id} onClick={()=>setFilterProject(p.id)} style={filterProject===p.id ? {background:'var(--accentBg)',color:'var(--accent)',border:'1px solid var(--accentBorder)',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:500} : {background:'var(--chipBg)',color:'var(--textSub)',border:'1px solid var(--border)',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:500}}>{p.nome}</button>
        ))}
      </div>

      {/* 2. Banner resumo do projeto (aparece apenas quando um projeto específico está selecionado) */}
      {selectedProject && (
        <div className="rounded-xl px-5 py-4 mb-5 flex items-center gap-6" style={{background:'var(--surface)',border:'1px solid var(--border)'}}>
          <div>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{selectedProject.nome}</div>
            <div style={{fontSize:12,color:'var(--textMuted)'}}>{selectedProject.cliente}</div>
          </div>

          <div style={{width:1,height:32,background:'var(--border)'}} />

          <div>
            <div style={{fontSize:11,fontFamily:'DM Mono',textTransform:'uppercase',color:'var(--textMuted)'}}>Status</div>
            <div style={{marginTop:6}}>{selectedProject.status}</div>
          </div>

          <div style={{width:1,height:32,background:'var(--border)'}} />

          <div>
            <div style={{fontSize:11,fontFamily:'DM Mono',textTransform:'uppercase',color:'var(--textMuted)'}}>PROGRESSO</div>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{selectedProject.progresso}%</div>
            <div style={{width:96,height:6,borderRadius:999,background:'rgba(128,128,128,0.15)',marginTop:6}}>
              <div style={{width:`${selectedProject.progresso}%`,height:6,borderRadius:999,background:'var(--accent)'}} />
            </div>
          </div>

          <div style={{width:1,height:32,background:'var(--border)'}} />

          <div>
            <div style={{fontSize:11,fontFamily:'DM Mono',textTransform:'uppercase',color:'var(--textMuted)'}}>PRAZO</div>
            <div style={{fontSize:13,fontFamily:'DM Mono',color:'var(--text)'}}>{new Date(selectedProject.deadline).toLocaleDateString('pt-BR')}</div>
            <div style={{fontSize:12,fontFamily:'DM Mono',marginTop:4,color: daysRemaining(selectedProject.deadline) > 30 ? 'green' : daysRemaining(selectedProject.deadline) >= 0 ? 'orange' : 'red'}}>
              {daysRemaining(selectedProject.deadline) < 0 ? 'Atrasado' : `${daysRemaining(selectedProject.deadline)} dias`}
            </div>
          </div>

          <div style={{marginLeft:'auto',textAlign:'right'}}>
            <div style={{fontSize:22,fontWeight:600,color:'var(--text)'}}>{selectedProject.equipe.length}</div>
            <div style={{fontSize:12,color:'var(--textMuted)'}}>profissionais</div>
          </div>
        </div>
      )}

      {/* Search + Table using same pattern as ProjectsTab */}
      <div className="mb-4">
        <input className="w-full input" placeholder="Buscar por nome" value={q} onChange={e=>setQ(e.target.value)} />
      </div>

      <div className="table-wrapper">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Projetos ativos</th>
              <th>Ingresso</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u,idx)=>{
              const activeProjects = projects.filter(p=>p.equipe.includes(u.id)).length
              return (
                <tr key={u.id} onClick={()=>setOpen(u.id)} style={{cursor:'pointer'}}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <div className="inline-block" style={{width:32,height:32,borderRadius:9999,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,background: avatarBg(idx)}}>{u.nome.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
                      <div>
                        <div style={{fontSize:14,fontWeight:500,color:'var(--text)'}}>{u.nome}</div>
                        <div className="text-sub" style={{fontSize:12}}>{u.localizacao}</div>
                      </div>
                    </div>
                  </td>

                  <td className="text-sub">{u.cargo}</td>

                  <td>
                    <span className="chip" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 10px'}}>{u.departamento}</span>
                  </td>

                  <td>
                    {activeProjects===0 ? <span className="text-muted">—</span> : <div><div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{activeProjects}</div><div style={{fontSize:12,color:'var(--textMuted)'}}>{activeProjects===1? 'projeto':'projetos'}</div></div>}
                  </td>

                  <td className="cell-num">{formatJoin(u.dataIngresso)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {open && <EmployeeDrawer id={open} onClose={()=>setOpen(null)} />}
    </div>
  )
}
