import React, { useMemo, useState } from 'react'
import { projects } from '../data/mock'
import ProjectDrawer from '../widgets/ProjectDrawer'

export default function ProjectsTab(){
  const [query,setQuery] = useState('')
  const [openProject, setOpenProject] = useState<string|null>(null)

  const filtered = useMemo(()=>projects.filter(p=>{
    if(query && !p.nome.toLowerCase().includes(query.toLowerCase())) return false
    return true
  }),[query])

  return (
    <div>
      <div className="mb-4">
        <input className="w-full input" placeholder="Buscar projetos pelo nome" value={query} onChange={e=>setQuery(e.target.value)} />
        {/* filters removed per request */}
      </div>

      <div className="table-wrapper">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Orçamento</th>
              <th>Prazo</th>
              <th>Equipe</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p=> (
              <tr key={p.id} onClick={()=>setOpenProject(p.id)} style={{cursor:'pointer'}}>
                <td>{p.nome}<div className="text-sub">{p.cliente} · {p.fase}</div></td>
                <td className="cell-num">R$ {p.orcamento.toLocaleString('pt-BR')}</td>
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
