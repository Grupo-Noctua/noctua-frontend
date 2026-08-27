import React, { useEffect, useMemo, useRef, useState } from 'react'
import { tools, projects, Tool } from '../data/mock'

const CATEGORIES = [
  { key: 'Desenvolvimento', emoji: '🖥️' },
  { key: 'Gestão de Projeto', emoji: '📋' },
  { key: 'Infraestrutura e DevOps', emoji: '☁️' },
  { key: 'Dados e Análise', emoji: '📊' },
  { key: 'Segurança', emoji: '🔒' }
]

function padProjectId(id: string){
  // p1 -> P001
  const n = id.replace(/[^0-9]/g,'')
  return `P${n.padStart(3,'0')}`
}

export default function ToolsTab(){
  const [cat, setCat] = useState(CATEGORIES[0].key)
  const [open, setOpen] = useState(false)
  const ddRef = useRef<HTMLDivElement|null>(null)

  // close on outside click (mousedown as spec)
  useEffect(()=>{
    function handler(e: MouseEvent){
      if(!ddRef.current) return
      if(!ddRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return ()=> document.removeEventListener('mousedown', handler)
  },[])

  const list = useMemo(()=> tools.filter(t=>t.categoria===cat),[cat])

  // KPI: total unique tools
  const totalTools = useMemo(()=> new Set(tools.map(t=>t.ferramenta)).size,[])

  // KPI: most adopted -> sum of usage levels per tool
  const mostAdopted = useMemo(()=>{
    let best: {tool: Tool|null,score:number} = {tool:null,score:-1}
    for(const t of tools){
      const score = Object.values(t.usoPorProjeto).reduce((s,v)=>s+v,0)
      if(score>best.score) best = {tool:t,score}
    }
    return best.tool
  },[])

  // group by subcategory
  const groups = useMemo(()=>{
    const m = new Map<string, Tool[]>()
    for(const t of list){
      const arr = m.get(t.subcategoria) || []
      arr.push(t)
      m.set(t.subcategoria, arr)
    }
    return Array.from(m.entries()) // [ [subcat, tools[]], ... ]
  },[list])

  function colorFor(level: number){
    if(level===0) return 'var(--textMuted)'
    if(level===1) return 'rgba(208,74,2,0.35)'
    if(level===2) return 'rgba(208,74,2,0.65)'
    return 'var(--accent)'
  }

  return (
    <div>
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card kpi-left-accent">
          <div className="kpi-label">Ferramentas em uso</div>
          <div className="kpi-value">{totalTools}</div>
          <div className="kpi-sub">Distribuídas entre {CATEGORIES.length} categorias</div>
        </div>

        <div className="card" style={{borderLeft:'3px solid #1e7a45', paddingLeft:16}}>
          <div className="kpi-label">Mais adotada</div>
          <div className="kpi-value">{mostAdopted?.ferramenta ?? '—'}</div>
          <div className="kpi-sub">{mostAdopted?.subcategoria ?? ''}</div>
        </div>
      </div>

      {/* Header + dropdown */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div style={{fontSize:20}}>{CATEGORIES.find(c=>c.key===cat)?.emoji}</div>
          <div>
            <div style={{fontSize:16,fontWeight:600}} className="">{cat}</div>
            <div className="text-sub" style={{fontFamily:'DM Mono'}}>{list.length} ferramentas</div>
          </div>
        </div>

        <div ref={ddRef} className="relative">
          <button onClick={()=>setOpen(v=>!v)} className="flex items-center gap-2 px-3 py-2 rounded border" style={{background:'var(--surface)'}}>
            <span style={{fontSize:16}}>{CATEGORIES.find(c=>c.key===cat)?.emoji}</span>
            <span style={{fontSize:13,fontWeight:500}}>{cat}</span>
            <svg style={{transform: open? 'rotate(180deg)':''}} width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {open && (
            <div style={{position:'absolute',top:'calc(100% + 6px)',right:0,minWidth:220,zIndex:50,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:10,boxShadow:'var(--shadow)'}}>
              {CATEGORIES.map((c,i)=>{
                const count = tools.filter(t=>t.categoria===c.key).length
                const selected = c.key===cat
                return (
                  <div key={c.key} onClick={()=>{setCat(c.key); setOpen(false)}} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',cursor:'pointer',background:selected? 'var(--panelHover)':'transparent',borderTopLeftRadius:i===0?10:0,borderTopRightRadius:i===0?10:0,borderBottomLeftRadius:i===CATEGORIES.length-1?10:0,borderBottomRightRadius:i===CATEGORIES.length-1?10:0}}>
                    <div style={{width:16,fontSize:16}}>{c.emoji}</div>
                    <div style={{flex:1,fontSize:13}}>{c.key}</div>
                    <div style={{fontSize:11,fontFamily:'DM Mono',background:'var(--chipBg)',borderRadius:9999,padding:'2px 8px',color:'var(--textSub)'}}>{count}</div>
                    {selected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th style={{width:300}}>Ferramenta</th>
              <th>Subcategoria</th>
              {projects.map(p=> <th key={p.id} style={{textAlign:'center',width:80}} className="cell-num">{padProjectId(p.id)}</th>)}
            </tr>
          </thead>
          <tbody>
            {groups.length===0 && (
              <tr><td colSpan={2 + projects.length} className="text-sub">Nenhuma ferramenta nesta categoria</td></tr>
            )}

            {groups.map(([subcat, tools])=> (
              <React.Fragment key={subcat}>
                <tr><td colSpan={2 + projects.length} style={{background:'var(--headerBg)',padding:'8px 16px',fontFamily:'DM Mono',fontSize:11,fontWeight:600,color:'var(--accent)'}}>— {subcat}</td></tr>

                {tools.map(t=> (
                  <tr key={t.id}>
                    <td style={{padding:'12px 16px'}}>
                      <div style={{fontSize:14,fontWeight:600}}>{t.ferramenta}</div>
                      <div className="text-sub" style={{fontSize:12}}>{t.categoria}</div>
                    </td>
                    <td style={{fontFamily:'DM Mono',fontSize:12,color:'var(--textSub)'}}>{t.subcategoria}</td>

                    {projects.map(p=>{
                      const level = t.usoPorProjeto[p.id] ?? 0
                      return (
                        <td key={p.id} style={{textAlign:'center'}}>
                          {level===0 ? <span className="text-sub">—</span> : (
                            <div style={{width:8,height:8,borderRadius:9999,margin:'0 auto',background: colorFor(level)}} />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
