import React from 'react'
import { employees, projects, tools } from '../data/mock'

function BarChart({labels,counts,width=520,height=220}:{labels:string[],counts:number[],width?:number,height?:number}){
  const max = Math.max(...counts,1)
  // ensure enough vertical space per row to fit larger text
  const rowH = Math.max(60, Math.floor((height-20)/Math.max(1,labels.length)))
  // allocate more space for labels when text is larger
  const leftLabelW = Math.min(420, Math.max(140, Math.floor(width * 0.34)))
  // Use responsive svg: viewBox controls internal coords, rendered width is 100% of container
  return (
    <svg style={{width:'100%',height:'auto'}} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMin meet">
      {labels.map((l,i)=>{
        const w = (counts[i]/max) * (width - leftLabelW - 40)
        const y = 10 + i*rowH
        return (
          <g key={l}>
            <text x={12} y={y+rowH/2} dominantBaseline="middle" style={{fontSize:20,fontWeight:700}} fill="var(--text)">{l}</text>
            <rect x={leftLabelW} y={y+6} width={Math.max(8,w)} height={rowH-12} rx={6} fill="var(--accent)" />
            <text x={leftLabelW + Math.max(8,w) + 12} y={y+rowH/2} dominantBaseline="middle" style={{fontSize:18,fontFamily:'DM Mono',fontWeight:800}} fill="var(--text)">{counts[i]}</text>
          </g>
        )
      })}
    </svg>
  )
}

function VerticalBarChart({labels,counts,width=800,height=240,showYAxis=false,numTicks=5}:{labels:string[],counts:number[],width?:number,height?:number,showYAxis?:boolean,numTicks?:number}){
  const max = Math.max(...counts,1)
  const w = Math.max(24, Math.floor(width / Math.max(1, labels.length)))
  const gap = Math.max(6, Math.floor(w * 0.2))
  const innerW = labels.length * (w + gap)
  const leftPadding = showYAxis ? 80 : 40
  // extra vertical space reserved for rotated labels so they don't get clipped
  const labelSpace = Math.max(160, Math.floor(height * 0.35))
  const drawArea = height
  const viewH = drawArea + labelSpace

  return (
    <svg style={{width:'100%',height:'auto'}} viewBox={`0 0 ${innerW + leftPadding + 20} ${viewH}`} preserveAspectRatio="xMinYMin meet">
      {/* y axis grid and labels */}
      {showYAxis && (()=>{
        const ticks = [] as JSX.Element[]
        for(let i=0;i<=numTicks;i++){
          const v = (i/numTicks) * max
          const y = drawArea - (v/max) * (drawArea - 40)
          ticks.push(
            <g key={i}>
              <line x1={leftPadding-8} x2={leftPadding + innerW} y1={y} y2={y} stroke="rgba(255,255,255,0.04)" />
              <text x={leftPadding-12} y={y+4} textAnchor="end" style={{fontSize:14,fontFamily:'DM Mono'}} fill="var(--text)">{Math.round(v)}</text>
            </g>
          )
        }
        return ticks
      })()}

      {/* bars */}
      {labels.map((l,i)=>{
        const barH = (counts[i]/max) * (drawArea - 40)
        const x = leftPadding + i * (w + gap)
        const y = drawArea - barH
        return (
          <g key={l}>
            <rect x={x} y={y} width={w} height={barH} rx={6} fill="var(--accent)" />
            <text x={x + w/2} y={y - 14} textAnchor="middle" style={{fontSize:20,fontFamily:'DM Mono',fontWeight:800}} fill="var(--text)">{counts[i]}</text>
            <g transform={`translate(${x + w/2}, ${drawArea + (labelSpace * 0.6)}) rotate(-45)`}>
              <text x={0} y={0} textAnchor="end" style={{fontSize:20,fontWeight:700}} fill="var(--text)">{l}</text>
            </g>
          </g>
        )
      })}
      {/* x axis line */}
      <line x1={leftPadding} x2={leftPadding + innerW} y1={drawArea} y2={drawArea} stroke="var(--border)" />
    </svg>
  )
}

export default function MetricsTab(){
  // Projects x Technology: for each tool, compute a varied usage metric (sum of usage levels across projects)
  const TOP_PROJECT_TECH = 12
  const EXCLUDE_TOOLS = new Set(['Kubernetes','ElasticSearch'])
  const projUse = tools.map(t=> ({name: t.ferramenta, count: Object.values(t.usoPorProjeto).reduce<number>((s,v)=>s + (v||0), 0) }))
  const projUseFiltered = projUse.filter(pu=> !EXCLUDE_TOOLS.has(pu.name))
  const projUseSorted = projUseFiltered.sort((a,b)=>b.count - a.count)

  // Employees counts map
  const techCountMap = new Map<string, number>()
  for(const e of employees){
    if(!e.tecnologia) continue
    techCountMap.set(e.tecnologia, (techCountMap.get(e.tecnologia) || 0) + 1)
  }

  // choose top N technologies ensuring none have zero in either projects or employees
  const selected: string[] = []
  const selectedProjCounts: number[] = []
  const selectedEmpCounts: number[] = []
  for(const item of projUseSorted){
    if(selected.length >= TOP_PROJECT_TECH) break
    const empCount = techCountMap.get(item.name) || 0
    const projCount = item.count
    if(projCount > 0 && empCount > 0){
      selected.push(item.name)
      selectedProjCounts.push(projCount)
      selectedEmpCounts.push(empCount)
    }
  }
  // fallback: if none selected (edge case), pick top by projCount (may include zeros in employees)
  if(selected.length === 0){
    const fallback = projUseSorted.slice(0, TOP_PROJECT_TECH)
    for(const item of fallback){ selected.push(item.name); selectedProjCounts.push(item.count); selectedEmpCounts.push(techCountMap.get(item.name)||0) }
  }

  const techLabelsAll = selected
  const techProjectCounts = selectedProjCounts
  const techs = techLabelsAll
  const techCounts = selectedEmpCounts

  

  // Employees per area (departamento)
  const depts = Array.from(new Set(employees.map(e=>e.departamento)))
  const deptCounts = depts.map(d=> employees.filter(e=>e.departamento===d).length)

  // Employees by seniority
  const seniorities = Array.from(new Set(employees.map(e=>e.senioridade))).filter(Boolean) as string[]
  const seniorCounts = seniorities.map(s=> employees.filter(e=>e.senioridade===s).length)

  // (projUseSorted and techLabelsAll already computed above)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="card">
          <div style={{fontSize:13,fontWeight:600}}>Funcionários x Tecnologia</div>
          <div style={{marginTop:12}}>
            <VerticalBarChart labels={techs} counts={techCounts} width={1000} height={500} />
          </div>
        </div>

        <div className="card">
          <div style={{fontSize:13,fontWeight:600}}>Número de funcionários por Área</div>
          <div style={{marginTop:12}}>
            <BarChart labels={depts} counts={deptCounts} width={1000} height={Math.max(420, 80 + depts.length * 100)} />
          </div>
        </div>

        <div className="card">
          <div style={{fontSize:13,fontWeight:600}}>Número de funcionários por Senioridade</div>
          <div style={{marginTop:12}}>
            {/* increased height to improve readability */}
            <BarChart labels={seniorities} counts={seniorCounts} width={1000} height={Math.max(420, 80 + seniorities.length * 100)} />
          </div>
        </div>

        <div className="card">
          <div style={{fontSize:13,fontWeight:600}}>Projetos x Tecnologia</div>
          <div style={{marginTop:12}}>
            {/* increased height for vertical bar chart */}
            <VerticalBarChart labels={techLabelsAll} counts={techProjectCounts} width={1000} height={500} />
          </div>
        </div>
      </div>
    </div>
  )
}
