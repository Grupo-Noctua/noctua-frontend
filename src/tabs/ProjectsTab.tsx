import React, { useEffect, useMemo, useState } from 'react'
import ProjectDrawer from '../widgets/ProjectDrawer'
import dashboard, { ProjetoDTO } from '../api'

export default function ProjectsTab(){
  const [query,setQuery] = useState('')
  const [openProject, setOpenProject] = useState<string|null>(null)
  const [projects, setProjects] = useState<ProjetoDTO[] | null>(null)

  useEffect(()=>{
    let mounted = true
    dashboard.projetos().then(list=>{ if(mounted) setProjects(list) }).catch(()=>{ if(mounted) setProjects([]) })
    return ()=>{ mounted = false }
  },[])

  const filtered = useMemo(()=>{
    if(!projects) return []
    return projects.filter(p=>{
      if(query && !(p.nomeProjeto || '').toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  },[projects,query])

  return (
    <div>
      <div className="mb-4">
        <input className="w-full input" placeholder="Buscar projetos pelo nome" value={query} onChange={e=>setQuery(e.target.value)} />
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
            {filtered.map((p)=> (
              <tr key={p.idProcessamento} onClick={()=>setOpenProject(String(p.idProcessamento))} style={{cursor:'pointer'}}>
                <td>{p.nomeProjeto}<div className="text-sub">{p.cliente}</div></td>
                <td className="cell-num">{p.orcamento ? `R$ ${Number(p.orcamento).toLocaleString('pt-BR')}` : '—'}</td>
                <td>{p.dataInicioPrevista ? new Date(p.dataInicioPrevista).toLocaleDateString('pt-BR') : '—'}</td>
                <td className="avatar-stack">{(p.profissionaisRecomendados || []).map((pr,idx)=>{
                  const initials = pr.nome ? pr.nome.split(' ').map(s=>s[0]).slice(0,2).join('') : (pr.idProfissional || '?')
                  return <div key={idx} className="inline-block avatar" style={{width:28,height:28,borderRadius:999,background:'var(--accentBg)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginLeft: idx===0?0:-8,border:'2px solid var(--surface)'}}>{initials}</div>
                })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openProject && <ProjectDrawer id={openProject} onClose={()=>setOpenProject(null)} />}
    </div>
  )
}
