import React from 'react'
import { projects, employees } from '../data/mock'

// Small helpers to build SVG shapes for lightweight simulated charts
function PieChart({counts, colors, size=140}:{counts:number[],colors:string[],size?:number}){
  const total = counts.reduce((s,c)=>s+c,0) || 1
  const radius = size/2
  const cx = radius, cy = radius
  let angle = -90
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {counts.map((c,i)=>{
        const frac = c/total
        const sweep = frac * 360
        const large = sweep > 180 ? 1 : 0
        const start = angle
        const end = angle + sweep
        const toRad = (a:number)=> (a * Math.PI) / 180
        const x1 = cx + radius * Math.cos(toRad(start))
        const y1 = cy + radius * Math.sin(toRad(start))
        const x2 = cx + radius * Math.cos(toRad(end))
        const y2 = cy + radius * Math.sin(toRad(end))
        angle += sweep
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`
        return <path key={i} d={path} fill={colors[i]||'#ddd'} />
      })}
      <circle cx={cx} cy={cy} r={radius*0.5} fill="var(--surface)" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" style={{fontSize:12,fontWeight:700}}>{total} itens</text>
    </svg>
  )
}

function LineChart({values, width=420, height=120}:{values:number[],width?:number,height?:number}){
  const max = Math.max(...values,1)
  const points = values.map((v,i)=> {
    const x = (i/(values.length-1)) * width
    const y = height - (v/max) * (height - 12) - 6
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {values.map((v,i)=>{
        const x = (i/(values.length-1)) * width
        const y = height - (v/max) * (height - 12) - 6
        return <circle key={i} cx={x} cy={y} r={3} fill="var(--accent)" />
      })}
    </svg>
  )
}

export default function MetricsTab(){
  // status distribution (donut)
  const statusCounts = ['Em dia','Em risco','Atrasado','Concluído'].map(s=> projects.filter(p=>p.status===s).length)
  const statusColors = ['#1e7a45','#DB4E18','#AD1B02','#5a5a5a']

  // budget vs spent per project (bar chart like)
  const maxBudget = Math.max(...projects.map(p=>p.orcamento),1)

  // simulated trend: use project progress averages over last 6 periods
  const trend = [Math.round(Math.random()*10)+40, Math.round(Math.random()*10)+45, Math.round(Math.random()*10)+50, Math.round(Math.random()*10)+48, Math.round(Math.random()*10)+55, Math.round(Math.random()*10)+60]

  // utilization: average disponibilidade across employees (simulada por departamento)
  const depts = Array.from(new Set(employees.map(e=>e.departamento)))
  const deptUtil = depts.map(d=> Math.round(employees.filter(e=>e.departamento===d).reduce((s,e)=>s+e.disponibilidade,0) / Math.max(1, employees.filter(e=>e.departamento===d).length)))

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card">
          <div style={{fontSize:13,fontWeight:600}}>Métricas de Status</div>
          <div style={{marginTop:12,display:'flex',gap:12,alignItems:'center'}}>
            <PieChart counts={statusCounts} colors={statusColors} />
            <div>
              {['Em dia','Em risco','Atrasado','Concluído'].map((s,i)=> (
                <div key={s} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                  <div style={{width:12,height:12,background:statusColors[i],borderRadius:4}} />
                  <div style={{fontSize:13}}>{s}</div>
                  <div style={{marginLeft:'auto',fontFamily:'DM Mono'}}>{statusCounts[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{fontSize:13,fontWeight:600}}>Tendência de Progresso (simulado)</div>
          <div style={{marginTop:12}}>
            <LineChart values={trend} />
            <div className="text-sub" style={{marginTop:8}}>Últimos 6 períodos — valores simulados para demonstração</div>
          </div>
        </div>

        <div className="card">
          <div style={{fontSize:13,fontWeight:600}}>Utilização por Departamento (simulado)</div>
          <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:10}}>
            {depts.map((d,i)=> (
              <div key={d} style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600}}>{d}</div>
                  <div style={{height:8,marginTop:6,borderRadius:999,background:'rgba(0,0,0,0.06)'}}>
                    <div style={{width:`${deptUtil[i]}%`,height:8,borderRadius:999,background:'var(--accent)'}} />
                  </div>
                </div>
                <div style={{fontFamily:'DM Mono'}}>{deptUtil[i]}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{fontSize:13,fontWeight:600}}>Orçamento x Gasto por projeto (simulado)</div>
        <div style={{marginTop:12}}>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {projects.map(p=> (
              <div key={p.id} style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:220}}>{p.nome}</div>
                <div style={{flex:1,height:28,position:'relative',background:'rgba(0,0,0,0.04)',borderRadius:8}}>
                  <div style={{position:'absolute',left:0,top:0,bottom:0,width:`${Math.min(100, Math.round((p.orcamento/maxBudget)*100))}%`,background:'rgba(30,122,69,0.12)',borderRadius:8}} />
                  <div style={{position:'absolute',left:0,top:0,bottom:0,width:`${Math.min(100, Math.round((p.gasto/maxBudget)*100))}%`,background:'rgba(30,122,69,0.5)',borderRadius:8}} />
                </div>
                <div style={{width:110,textAlign:'right',fontFamily:'DM Mono'}}>{`R$ ${Math.round(p.gasto/1000)}k / ${Math.round(p.orcamento/1000)}k`}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
