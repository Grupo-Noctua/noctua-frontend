import React from 'react'
import { employees, projects, tools } from '../data/mock'

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

function ColumnChartEmployeesTech(){
  // data from graficos.md
  const data = [
    ['Node.js',11],
    ['Spark',8],
    ['React',10],
    ['Postgres',7],
    ['Docker',13],
    ['Figma',6],
    ['AWS',9],
    ['PowerBI',5],
    ['Python',12]
  ] as [string,number][]

  const max = Math.max(...data.map(d=>d[1]))
  // use a single orange color for all bars
  const barColor = 'var(--accent)'

  return (
    <div style={{height:176,paddingTop:24,display:'flex',alignItems:'end',gap:8}}>
      {data.map(([label,count],i)=>{
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

function HorizontalBarsByDept(){
  const deptMap = new Map<string,number>()
  for(const e of employees){
    deptMap.set(e.departamento, (deptMap.get(e.departamento)||0) + 1)
  }
  const items = Array.from(deptMap.entries()).sort((a,b)=>b[1]-a[1])
  const max = items.length? items[0][1]:1
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {items.map(([label,value])=> (
        <HorizontalBar key={label} label={label} value={value} max={max} color={'var(--accent)'} />
      ))}
    </div>
  )
}

function HorizontalBarsBySeniority(){
  // hierarchy and color opacities as per graficos.md
  const hierarchy = ['Estagiário','Júnior','Pleno','Sênior','Especialista','Tech Lead']
  // use solid hex shades instead of translucent rgba so colors don't get darker in dark mode
  // use the same orange for all seniority bars
  const opacityMap: Record<string,string> = {
    'Estagiário':'var(--accent)',
    'Júnior':'var(--accent)',
    'Pleno':'var(--accent)',
    'Sênior':'var(--accent)',
    'Especialista':'var(--accent)',
    'Tech Lead':'var(--accent)'
  }

  // map mock seniorities to these labels
  const mapName: Record<string,string> = { 'Junior':'Júnior', 'Pleno':'Pleno', 'Senior':'Sênior' }
  const counts = new Map<string,number>()
  for(const e of employees){
    const s = e.senioridade? (mapName[e.senioridade] || e.senioridade) : 'Estagiário'
    counts.set(s, (counts.get(s)||0) + 1)
  }
  // include all seniority levels from the form (show zero if none)
  const items = hierarchy.map(h=> [h, counts.get(h)||0] as [string,number])
  const max = items.length? Math.max(...items.map(i=>i[1])):1

  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {items.map(([label,value])=> (
        <HorizontalBar key={label} label={label} value={value} max={max} color={opacityMap[label] || 'rgba(208,74,2,0.6)'} />
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

function DonutChart(){
  const data = [
    ['Node.js',11],['Spark',11],['React',9],['Postgres',9],['Docker',9],['Figma',9],['AWS',7],['PowerBI',7],['Python',7]
  ] as [string,number][]
  const total = data.reduce((s,[,v])=>s+v,0)
  const colors = ['#D04A02','rgba(208,74,2,0.78)','rgba(208,74,2,0.60)','rgba(208,74,2,0.44)','#6B7280','#9CA3AF','rgba(208,74,2,0.30)','#4B5563','#D1D5DB']

  let angle = -Math.PI/2 // start at top
  const cx = 110, cy = 110, outerR = 90, innerR = 48

  return (
    // center the whole donut+legend block inside the card
    <div style={{display:'flex',gap:40,alignItems:'center',justifyContent:'center',width:'100%',minHeight:260}}>
      <svg width={220} height={220} viewBox={`0 0 220 220`}>
        <g>
          {data.map(([label,value],i)=>{
            const sliceAngle = (value/total) * Math.PI * 2
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
          const pct = Math.round((value/total)*100)
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
  return (
    <div style={{display:'flex',flexDirection:'column',gap:24}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <ChartCard title="Funcionários x Tecnologia">
          <ColumnChartEmployeesTech />
        </ChartCard>

        <ChartCard title="Número de funcionários por Área">
          <HorizontalBarsByDept />
        </ChartCard>

        <ChartCard title="Número de funcionários por Senioridade">
          <HorizontalBarsBySeniority />
        </ChartCard>

        <ChartCard title="Projetos x Tecnologia">
          <DonutChart />
        </ChartCard>
      </div>
    </div>
  )
}
