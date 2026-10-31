import React, { useEffect, useState } from 'react'
import dashboard, { TecnologiaDTO, AreaDTO, SenioridadeDTO } from '../api'

function ChartCard({title,children}:{title:string,children:React.ReactNode}){
  return (
    <div style={{borderRadius:16,background:'var(--surface)',border:'1px solid var(--border)'}}>
      <div style={{padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid var(--border)'}}>
        <div style={{fontSize:14,fontWeight:700}}>{title}</div>
      </div>
      <div style={{padding:'20px 24px'}}>{children}</div>
    </div>
  )
}

function ColumnChartEmployeesTech({data}:{data:[string,number][]}){
  const max = data.length ? Math.max(...data.map(d=>d[1])) : 1
  const barColor = 'var(--accent)'
  return (
    <div style={{height:176,paddingTop:24,display:'flex',alignItems:'end',gap:8}}>
      {data.map(([label,count])=>{
        const h = Math.max(6, Math.round((count / max) * 110))
        return (
          <div key={label} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
            <div style={{fontSize:11,fontFamily:'DM Mono',fontWeight:700,textAlign:'center'}}>{count}</div>
            <div style={{width:'100%',display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
              <div style={{width:'76%',height:h,background:barColor,borderRadius:'4px 4px 0 0'}} />
            </div>
            <div style={{height:44,overflow:'hidden',fontSize:9,color:'var(--textMuted)',writingMode:'vertical-rl',transform:'rotate(180deg)',textAlign:'center'}}>{label}</div>
          </div>
        )
      })}
    </div>
  )
}

function HorizontalBar({label, value, max, color}:{label:string,value:number,max:number,color:string}){
  const pct = max? (value/max):0
  const showWhite = pct > 0.25
  return (
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <div style={{width:130,fontSize:12,color:'var(--textSub)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={label}>{label}</div>
      <div style={{flex:1,position:'relative',height:24,borderRadius:8,background:'var(--chipBg)',border:'1px solid var(--border)',overflow:'hidden'}}>
        <div style={{width:`${Math.round(pct*100)}%`,height:'100%',background:color,borderRadius:8,transition:'width .25s'}} />
        <div style={{position:'absolute',left:8,top:0,bottom:0,display:'flex',alignItems:'center',pointerEvents:'none',fontSize:11,fontFamily:'DM Mono',fontWeight:700,color: showWhite? '#fff' : 'var(--text)'}}>{value}</div>
      </div>
      <div style={{width:40,textAlign:'right',fontSize:12,fontFamily:'DM Mono'}}>{value}</div>
    </div>
  )
}

function HorizontalBarsByDept({items}:{items: [string,number][]}){
  const sorted = items.slice().sort((a,b)=>b[1]-a[1])
  const max = sorted.length? sorted[0][1]:1
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {sorted.map(([label,value])=> (
        <HorizontalBar key={label} label={label} value={value} max={max} color={'var(--accent)'} />
      ))}
    </div>
  )
}

function HorizontalBarsBySeniority({items}:{items:[string,number][]}){
  const hierarchy = ['Estagiário','Júnior','Pleno','Sênior','Especialista','Tech Lead']
  const mapItems = hierarchy.map(h=> [h, items.find(i=>i[0]===h)?.[1] || 0] as [string,number])
  const max = mapItems.length? Math.max(...mapItems.map(i=>i[1])):1
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {mapItems.map(([label,value])=> (
        <HorizontalBar key={label} label={label} value={value} max={max} color={'var(--accent)'} />
      ))}
    </div>
  )
}

// helper to draw donut slice path
function describeDonutSlice(cx:number,cy:number,outerR:number,innerR:number,startAngle:number,endAngle:number){
  const startOuterX = cx + outerR * Math.cos(startAngle)
  const startOuterY = cy + outerR * Math.sin(startAngle)
  const endOuterX = cx + outerR * Math.cos(endAngle)
  const endOuterY = cy + outerR * Math.sin(endAngle)
  const startInnerX = cx + innerR * Math.cos(endAngle)
  const startInnerY = cy + innerR * Math.sin(endAngle)
  const endInnerX = cx + innerR * Math.cos(startAngle)
  const endInnerY = cy + innerR * Math.sin(startAngle)

  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  return `M ${startOuterX} ${startOuterY} A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuterX} ${endOuterY} L ${startInnerX} ${startInnerY} A ${innerR} ${innerR} 0 ${largeArc} 0 ${endInnerX} ${endInnerY} Z`
}

function DonutChart({data}:{data:[string,number][]}){
  const total = data.reduce((s,[,v])=>s+v,0)
  const colors = ['#D04A02','#F97316','#FB923C','#FDBA74','#6B7280','#9CA3AF','#4B5563','#D1D5DB','#FEEBC8']
  let angle = -Math.PI/2 // start at top
  const cx = 110, cy = 110, outerR = 90, innerR = 48
  return (
    <div style={{display:'flex',gap:40,alignItems:'center',justifyContent:'center',width:'100%',minHeight:260}}>
      <svg width={220} height={220} viewBox={`0 0 220 220`}>
        <g>
          {data.map(([label,value],i)=>{
            const sliceAngle = total ? (value/total) * Math.PI * 2 : 0
            const path = describeDonutSlice(cx,cy,outerR,innerR,angle, angle + sliceAngle)
            const key = `s${i}`
            angle += sliceAngle
            return (<path key={key} d={path} fill={colors[i%colors.length]} stroke="#fff" strokeWidth={2} />)
          })}
          <text x={110} y={110} textAnchor="middle" dominantBaseline="middle" style={{fontSize:22,fontFamily:'DM Mono',fontWeight:800}} fill="var(--text)">{total}</text>
          <text x={110} y={132} textAnchor="middle" dominantBaseline="hanging" style={{fontSize:10,fontFamily:'DM Mono'}} fill="var(--textMuted)">usos totais</text>
        </g>
      </svg>

      <div style={{display:'flex',flexDirection:'column',gap:10,width:260}}>
        {data.map(([label,value],i)=>{
          const pct = total ? Math.round((value/total)*100) : 0
          return (
            <div key={label} style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:12,height:12,background:colors[i%colors.length],borderRadius:2,flex:'0 0 12px'}} />
              <div style={{flex:1,fontSize:14,color:'var(--text)',minWidth:0,marginLeft:6}}>{label}</div>
              <div style={{width:72,fontSize:12,fontFamily:'DM Mono',color:'var(--textMuted)',textAlign:'right'}}>{value} proj.</div>
              <div style={{width:36,textAlign:'right',fontSize:12,fontFamily:'DM Mono',fontWeight:700}}>{pct}%</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function MetricsTab(){
  const [tech, setTech] = useState<TecnologiaDTO[]>([])
  const [area, setArea] = useState<AreaDTO[]>([])
  const [seniority, setSeniority] = useState<SenioridadeDTO[]>([])
  const [projTech, setProjTech] = useState<TecnologiaDTO[]>([])

  useEffect(()=>{
    let mounted = true
    dashboard.funcionariosPorTecnologia().then(r=>{ if(mounted) setTech(r) }).catch(()=>{})
    dashboard.funcionariosPorArea().then(r=>{ if(mounted) setArea(r) }).catch(()=>{})
    dashboard.funcionariosPorSenioridade().then(r=>{ if(mounted) setSeniority(r) }).catch(()=>{})
    dashboard.projetosPorTecnologia().then(r=>{ if(mounted) setProjTech(r) }).catch(()=>{})
    return ()=>{ mounted = false }
  },[])

  const techData = tech.map(t=> [t.tecnologia || '—', Number(t.quantidade)] as [string,number])
  const areaData = area.map(a=> [a.area || '—', Number(a.quantidade)] as [string,number])
  const seniorData = seniority.map(s=> [s.senioridade || '—', Number(s.quantidade)] as [string,number])
  const projTechData = projTech.map(t=> [t.tecnologia || '—', Number(t.quantidade)] as [string,number])

  return (
    <div style={{display:'flex',flexDirection:'column',gap:24}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <ChartCard title="Funcionários x Tecnologia">
          <ColumnChartEmployeesTech data={techData.length ? techData : [['—',0]]} />
        </ChartCard>

        <ChartCard title="Número de funcionários por Área">
          <HorizontalBarsByDept items={areaData} />
        </ChartCard>

        <ChartCard title="Número de funcionários por Senioridade">
          <HorizontalBarsBySeniority items={seniorData} />
        </ChartCard>

        <ChartCard title="Projetos x Tecnologia">
          <DonutChart data={projTechData.length ? projTechData : [['—',0]]} />
        </ChartCard>
      </div>
    </div>
  )
}
