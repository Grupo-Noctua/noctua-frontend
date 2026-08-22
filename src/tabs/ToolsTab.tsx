import React, { useState } from 'react'
import { tools } from '../data/mock'

export default function ToolsTab(){
  const [cat, setCat] = useState('Desenvolvimento')
  const cats = ['Desenvolvimento','Gestão de Projeto','Infraestrutura e DevOps','Dados e Análise','Segurança']

  const list = tools.filter(t=>t.categoria===cat)

  return (
    <div>
      <div className="flex justify-end mb-2">
        <select value={cat} onChange={e=>setCat(e.target.value)} className="p-2 surface rounded">
          {cats.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="card rounded p-2">
        {list.map(t=> (
          <div key={t.id} className="flex items-center justify-between border-b py-2">
            <div>{t.ferramenta} <div className="text-sm text-gray-500">{t.subcategoria}</div></div>
            <div className="flex gap-1">
              {['p1','p2','p3','p4','p5','p6'].map(pid=>{
                const level = t.usoPorProjeto[pid]
                return <div key={pid} className={`w-3 h-3 rounded ${level===0? 'bg-gray-300' : level===1? 'bg-yellow-400' : level===2? 'bg-orange-500' : 'bg-green-600'}`}></div>
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
