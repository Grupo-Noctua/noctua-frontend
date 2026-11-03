import React, { useMemo, useState } from 'react'
import ProjectDrawer from '../widgets/ProjectDrawer'
import dashboard, { ProjetoDTO } from '../api'
import useApiQuery from '../useApiQuery'
import ApiContent from '../components/ApiContent'
import { formatCurrency, formatDate } from '../format'

export default function ProjectsTab(){
  const [query,setQuery] = useState('')
  const [openProject, setOpenProject] = useState<ProjetoDTO|null>(null)
  const projectsQuery = useApiQuery(dashboard.projetos)
  const projects = projectsQuery.data

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

      <ApiContent query={projectsQuery} empty={projects?.length === 0}>
      <div className="table-wrapper">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Orçamento</th>
              <th>Início previsto</th>
              <th>Profissionais recomendados</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p)=> (
              <tr key={p.idProcessamento} onClick={()=>setOpenProject(p)} style={{cursor:'pointer'}}>
                <td>{p.nomeProjeto}<div className="text-sub">{p.cliente}</div></td>
                <td className="cell-num">{formatCurrency(p.orcamento)}</td>
                <td>{formatDate(p.dataInicioPrevista)}</td>
                <td className="avatar-stack">{(p.profissionaisRecomendados || []).map((pr,idx)=>{
                  const initials = pr.nome ? pr.nome.split(' ').map(s=>s[0]).slice(0,2).join('') : (pr.idProfissional || '?')
                  return <div key={idx} title={pr.nome || pr.idProfissional || 'Nome não informado'} className="inline-block avatar" style={{width:28,height:28,borderRadius:999,background:'var(--accentBg)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginLeft: idx===0?0:-8,border:'2px solid var(--surface)'}}>{initials}</div>
                })}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={4}>Nenhum projeto encontrado para esta busca.</td></tr>}
          </tbody>
        </table>
      </div>
      </ApiContent>

      {openProject && <ProjectDrawer project={openProject} onClose={()=>setOpenProject(null)} />}
    </div>
  )
}
