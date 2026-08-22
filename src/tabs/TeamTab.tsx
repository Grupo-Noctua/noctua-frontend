import React, { useState } from 'react'
import { employees, projects } from '../data/mock'
import EmployeeDrawer from '../widgets/EmployeeDrawer'

export default function TeamTab(){
  const [filterProject, setFilterProject] = useState<'Todos'|string>('Todos')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<string|null>(null)

  const list = employees.filter(e=>{
    if(filterProject!=='Todos' && e.projectId!==filterProject) return false
    if(q && !e.nome.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <button className={`px-3 py-1 rounded ${filterProject==='Todos' ? 'btn-accent' : 'surface'}`} onClick={()=>setFilterProject('Todos')}>Todos</button>
        {projects.map(p=> <button key={p.id} className={`px-3 py-1 rounded ${filterProject===p.id ? 'btn-accent' : 'surface'}`} onClick={()=>setFilterProject(p.id)}>{p.nome}</button>)}
      </div>

      <input className="w-full p-2 card rounded mb-2" placeholder="Buscar funcionários" value={q} onChange={e=>setQ(e.target.value)} />

      <div className="card rounded">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600"><th className="p-2">Nome</th><th className="p-2">Cargo</th><th className="p-2">Departamento</th><th className="p-2">Projetos ativos</th><th className="p-2">Data de ingresso</th></tr>
          </thead>
          <tbody>
            {list.map(u=> (
              <tr key={u.id} className="border-t" onClick={()=>setOpen(u.id)} style={{cursor:'pointer'}}>
                <td className="p-2">{u.nome} <div className="text-sm text-gray-500">{u.localizacao}</div></td>
                <td className="p-2">{u.cargo}</td>
                <td className="p-2">{u.departamento}</td>
                <td className="p-2">{projects.filter(p=>p.equipe.includes(u.id)).length}</td>
                <td className="p-2">{u.dataIngresso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && <EmployeeDrawer id={open} onClose={()=>setOpen(null)} />}
    </div>
  )
}
