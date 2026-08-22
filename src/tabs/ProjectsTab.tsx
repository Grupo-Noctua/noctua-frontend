import React, { useMemo, useState } from 'react'
import { projects } from '../data/mock'
import ProjectDrawer from '../widgets/ProjectDrawer'

export default function ProjectsTab(){
  const [query,setQuery] = useState('')
  const [filter,setFilter] = useState<'Todos'|'Em dia'|'Em risco'|'Atrasado'|'Concluído'>('Todos')
  const [openProject, setOpenProject] = useState<string|null>(null)

  const filtered = useMemo(()=>projects.filter(p=>{
    if(filter!=='Todos' && p.status!==filter) return false
    if(query && !p.nome.toLowerCase().includes(query.toLowerCase())) return false
    return true
  }),[query,filter])

  return (
    <div>
      <div className="mb-4">
        <input className="w-full input" placeholder="Buscar projetos pelo nome" value={query} onChange={e=>setQuery(e.target.value)} />
        <div className="flex gap-2 mt-2">
          {['Todos','Em dia','Em risco','Atrasado','Concluído'].map(f=> (
            <button key={f} className={`px-3 py-1 rounded ${filter===f? 'btn-accent' : 'surface'}`} onClick={()=>setFilter(f as any)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Status</th>
              <th>Orçamento</th>
              <th>Prazo</th>
              <th>Equipe</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p=> (
              <tr key={p.id} onClick={()=>setOpenProject(p.id)} style={{cursor:'pointer'}}>
                <td>{p.nome}<div className="text-sub">{p.cliente} · {p.fase}</div></td>
                <td><span className="inline-flex items-center gap-1.5 px-2.5 py-1" style={{borderRadius:4,background: p.status==='Em dia'? 'rgba(30,122,69,0.10)' : p.status==='Em risco' ? 'rgba(219,78,24,0.10)' : p.status==='Atrasado' ? 'rgba(173,27,2,0.10)' : 'rgba(90,90,90,0.10)', color: p.status==='Em dia'? '#1e7a45' : p.status==='Em risco' ? '#DB4E18' : p.status==='Atrasado' ? '#AD1B02' : '#5a5a5a', fontFamily:'DM Mono',fontSize:12,fontWeight:500}}>
                  <span style={{width:6,height:6,display:'inline-block',borderRadius:999,background: p.status==='Em dia'? '#1e7a45' : p.status==='Em risco' ? '#DB4E18' : p.status==='Atrasado' ? '#AD1B02' : '#5a5a5a'}}></span>
                  {p.status}
                </span></td>
                <td className="cell-num">R$ {Math.round(p.orcamento/1000)}k · {p.progresso}%</td>
                <td>{p.deadline}</td>
                <td className="avatar-stack">{p.equipe.map((id,idx)=><div key={id} className="inline-block avatar" style={{width:28,height:28,borderRadius:999,background:'var(--accentBg)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginLeft: idx===0?0:-8,border:'2px solid var(--surface)'}}>{id.replace('u','').toUpperCase()}</div>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openProject && <ProjectDrawer id={openProject} onClose={()=>setOpenProject(null)} />}
    </div>
  )
}
