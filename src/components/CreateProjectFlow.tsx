import React, { useMemo, useState } from 'react'
import { employees } from '../data/mock'

function range(n:number){return Array.from({length:n}).map((_,i)=>i)}

export default function CreateProjectFlow({onClose}:{onClose:()=>void}){
  const [stage,setStage] = useState(1)
  const [budget,setBudget] = useState(100000)
  const [qty,setQty] = useState(3)
  const [seniorities,setSeniorities] = useState<string[]>(['Júnior','Pleno','Sênior'])
  const [fileName,setFileName] = useState<string|undefined>(undefined)
  const [dragging, setDragging] = useState(false)
  const [assigned, setAssigned] = useState<Record<number,string|undefined>>({})

  const seniorPool = useMemo(()=>({
    'Estagiário':['Estagiário de QA','Estagiário de Frontend'],
    'Júnior':['Analista Júnior','Desenvolvedor Júnior'],
    'Pleno':['Desenvolvedor Pleno','Analista Pleno'],
    'Sênior':['Desenvolvedor Sênior','Arquiteto Sênior'],
    'Especialista':['Especialista de Dados'],
    'Tech Lead':['Tech Lead']
  } as Record<string,string[]>),[])

  function simulateAI(){
    // generate N vacancies round-robin
    const vacs = range(qty).map(i=>{
      const s = seniorities[i % seniorities.length]
      const titles = seniorPool[s] || ['Profissional']
      return {vaga: i+1, cargo: titles[i % titles.length], senioridade: s}
    })
    return vacs
  }

  const vacs = simulateAI()

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel open" onClick={e=>e.stopPropagation()} style={{left:'50%',transform:'translateX(-50%)',right:'auto',width:'720px',top:'6%'}}>
        <div className="form-card">
          <div className="form-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontSize:16,fontWeight:600}}>Novo projeto</div>
              <div style={{fontSize:12,fontFamily:'DM Mono',color:'var(--textMuted)'}}>Defina a composição da equipe e envie o documento de descrição para análise</div>
            </div>
            <div>
              <button onClick={onClose} style={{background:'var(--chipBg)',border:'1px solid var(--border)',padding:'8px',borderRadius:8}}>Fechar</button>
            </div>
          </div>

          <div className="form-body">
            {stage===1 && (
              <div style={{display:'flex',flexDirection:'column',gap:24}}>
                {/* Bloco 1 - Orçamento */}
                <div>
                  <div className="section-label">ORÇAMENTO</div>
                  <div className="divider" />
                  <div style={{marginTop:12}}>
                    <div className="field-label">Orçamento total do projeto (R$)</div>
                    <div className="input-prefix" style={{marginTop:8}}>
                      <span className="prefix">R$</span>
                      <input type="number" min={0} placeholder="0,00" value={budget} onChange={e=>setBudget(Number(e.target.value))} className="input" />
                    </div>
                    {budget > 0 && <div style={{marginTop:6}} className="field-sub">{budget.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0})}</div>}
                  </div>
                </div>

                {/* Bloco 2 - Composição */}
                <div>
                  <div className="section-label">COMPOSIÇÃO DA EQUIPE</div>
                  <div className="divider" />

                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                    <div className="field-label">Quantidade de profissionais</div>
                    <div style={{display:'flex',alignItems:'baseline',gap:8}}>
                      <div style={{fontSize:26,fontWeight:600,fontFamily:'DM Mono'}}>{qty}</div>
                      <div className="field-sub">{qty === 1 ? 'pessoa' : 'pessoas'}</div>
                    </div>
                  </div>
                  <div className="range-wrapper" style={{marginTop:8}}>
                    <input type="range" min={1} max={100} value={qty} onChange={e=>setQty(Number(e.target.value))} onMouseDown={()=>{}} />
                    <div className="range-ticks">{[1,20,40,60,80,100].map(n=> <span key={n}>{n}</span>)}</div>
                  </div>

                  <div style={{marginTop:8}}>
                    <div className="field-label">Ou insira manualmente:</div>
                    <input type="number" value={qty} onChange={e=>setQty(Number(e.target.value))} className="input" style={{width:80,marginTop:6}} />
                  </div>

                  <div style={{marginTop:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div className="field-label">Senioridades desejadas</div>
                      {seniorities.length > 0 && <div style={{fontSize:12,fontFamily:'DM Mono',background:'rgba(208,74,2,0.10)',color:'var(--accent)',border:'1px solid rgba(208,74,2,0.22)',borderRadius:999,padding:'2px 8px'}}>{seniorities.length} selecionados</div>}
                    </div>

                  </div>
                  <div style={{marginTop:8}} className="chips-grid">
                    {['Estagiário','Júnior','Pleno','Sênior','Especialista','Tech Lead'].map(s=> {
                      const sel = seniorities.includes(s)
                      return (
                        <button key={s} onClick={()=>setSeniorities(prev=> prev.includes(s)? prev.filter(x=>x!==s) : [...prev,s])} className={`chip ${sel? 'selected':''}`}>
                          <div className="level">{sel? '●' : '○'}</div>
                          <div style={{flex:1,textAlign:'left'}}>{s}</div>
                          <div className="check">{sel? '✓': ''}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Bloco 3 - Documento */}
                <div>
                  <div className="section-label">DOCUMENTO DO PROJETO</div>
                  <div className="divider" />
                  <div style={{marginTop:12}}>
                    <div className="field-label">Descrição padrão do projeto (PDF)</div>
                    <div className={`dropzone ${dragging? 'dragging':''} ${fileName? 'filled':''}`} onClick={()=>setFileName('projeto-exemplo.pdf')} onDragEnter={(e)=>{e.preventDefault(); setDragging(true)}} onDragLeave={(e)=>{e.preventDefault(); setDragging(false)}} onDrop={(e)=>{e.preventDefault(); setDragging(false); setFileName('projeto-exemplo.pdf')}}>
                      {!fileName && (
                        <>
                          <div className="dz-icon">📄</div>
                          <div className="dz-title">Arraste o PDF aqui</div>
                          <div className="dz-sub">ou clique para selecionar · apenas arquivos .pdf</div>
                        </>
                      )}
                      {fileName && (
                        <>
                          <div className="dz-icon" style={{background:'rgba(208,74,2,0.12)',color:'var(--accent)'}}>📄</div>
                          <div className="dz-title">{fileName}</div>
                          <div className="dz-sub">123 KB · clique para substituir</div>
                          <button className="dz-remove" onClick={(e)=>{e.stopPropagation(); setFileName(undefined)}}>×</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-footer">
                  <button className="" onClick={()=>{setBudget(100000); setQty(3); setSeniorities(['Júnior','Pleno','Sênior']); setFileName(undefined)}} style={{background:'transparent',border:0,color:'var(--textMuted)',fontSize:14}}>Limpar campos</button>
                  <button className="btn-accent" onClick={()=>setStage(2)} style={{padding:'10px 18px',borderRadius:8,fontWeight:600}}>Analisar e montar equipe →</button>
                </div>
              </div>
            )}

            {stage===2 && (
              <div className="split-container">
                <div className="split-left">
                  <div className="toolbar-sticky">
                    <div style={{width:20,height:20,background:'rgba(208,74,2,0.12)',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)'}}>📄</div>
                    <div style={{fontSize:12,fontFamily:'DM Mono',color:'var(--textSub)'}}>{fileName || 'projeto-exemplo.pdf'}</div>
                    <div style={{marginLeft:'auto',fontSize:10,fontFamily:'DM Mono',background:'rgba(208,74,2,0.10)',color:'var(--accent)',padding:'2px 6px',borderRadius:4}}>IA</div>
                  </div>

                  <div style={{padding:'28px'}}>
                    <div className="doc-header-meta">Análise gerada por IA · PwC Brasil · 01/01/2026</div>
                    <div className="doc-title">Análise de Viabilidade e Composição de Equipe</div>
                    <div className="doc-sub" style={{marginTop:6}}>Baseado no documento de descrição de projeto enviado</div>
                    <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
                      {seniorities.map(s=> <div key={s} style={{fontSize:11,fontFamily:'DM Mono',background:'rgba(208,74,2,0.08)',color:'var(--accent)',border:'1px solid rgba(208,74,2,0.2)',borderRadius:4,padding:'2px 6px'}}>{s}</div>)}
                      <div style={{fontSize:11,fontFamily:'DM Mono',background:'var(--chipBg)',color:'var(--textSub)',borderRadius:4,padding:'2px 6px'}}>{qty} vagas</div>
                    </div>
                    <div style={{borderBottom:'1px solid var(--border)',paddingBottom:12,marginTop:12}} />

                    <div style={{marginTop:12}} className="doc-section">
                      {[
                        {n:'01',t:'Resumo Executivo',b:'Resumo curto sobre o objetivo e escopo do projeto.'},
                        {n:'02',t:'Tecnologias Identificadas',b:'React, Node.js, AWS e Postgres.'},
                        {n:'03',t:'Complexidade Estimada',b:'Média — integração com sistemas legados.'},
                        {n:'04',t:'Perfil de Equipe Recomendado',b:'Desenvolvedor Backend, Engenheiro de Dados, Gerente de Projeto.'},
                        {n:'05',t:'Riscos Identificados',b:'① Dependências externas\n② Falta de testes automatizados'},
                        {n:'06',t:'Pontuação de Confiança',b:'75% — base suficiente para sugestão inicial.'}
                      ].map(s=> (
                        <div key={s.n}>
                          <div className="section-row">
                            <div className="section-num">{s.n}</div>
                            <div style={{flex:1,height:1,background:'var(--border)'}} />
                            <div className="section-title">{s.t}</div>
                          </div>
                          <div className="section-body">{s.b}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{borderTop:'1px solid var(--border)',paddingTop:12,textAlign:'center',fontSize:10,fontFamily:'DM Mono',color:'var(--textMuted)'}}>Documento gerado automaticamente · Sujeito à revisão humana</div>
                  </div>
                </div>

                <div className="split-right">
                  <div className="toolbar-sticky" style={{justifyContent:'space-between'}}>
                    <div style={{fontSize:12,fontFamily:'DM Mono',color:'var(--textSub)',fontWeight:600}}>Equipe sugerida pela IA</div>
                    <div style={{fontSize:12,fontFamily:'DM Mono',background:'rgba(208,74,2,0.10)',color:'var(--accent)',border:'1px solid rgba(208,74,2,0.20)',borderRadius:999,padding:'2px 8px'}}>{qty} vagas</div>
                  </div>

                  <div style={{padding:'20px'}}>
                    <div style={{padding:'12px',borderRadius:12,background:'var(--surfaceAlt)',border:'1px solid var(--border)',display:'flex',gap:12,alignItems:'center'}}>
                      <div style={{width:20,height:20,background:'var(--accent)',borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>i</div>
                      <div style={{fontSize:12,color:'var(--textSub)',lineHeight:1.4}}>Esta composição foi gerada automaticamente com base na análise do documento de descrição do projeto e nas preferências de senioridade informadas. <strong style={{color:'var(--text)',fontWeight:600}}>Editar equipe</strong> para ajustar manualmente.</div>
                    </div>

                    <div className="vacancies-list">
                      {vacs.map(v=>{
                        const assignedId = assigned[v.vaga]
                        const u = employees.find(e=>e.id===assignedId)
                        return (
                          <div key={v.vaga} className={`vacancy-card ${assignedId? 'vacancy-assigned':''}`}>
                            <div className="vacancy-row">
                              <div className="vacancy-num">{String(v.vaga).padStart(2,'0')}</div>
                              <div className="vacancy-avatar" style={{background: assignedId? 'rgba(208,74,2,0.18)': 'var(--chipBg)', border: assignedId? '1px solid rgba(208,74,2,0.25)': '1px dashed var(--border)', color: assignedId? 'var(--accent)': 'var(--textMuted)'}}>{assignedId? (u?.nome.split(' ').map(n=>n[0]).slice(0,2).join('')) : '?'}</div>
                              <div className="vacancy-content">
                                <div className="vacancy-title">{v.cargo}</div>
                                <div className="vacancy-sub">{v.senioridade} · Engenharia{assignedId? ` · ${u?.nome}`: ''}</div>
                              </div>
                              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8}}>
                                {assignedId && <div style={{fontSize:10,fontFamily:'DM Mono',padding:'2px 6px',borderRadius:4,background:u!.disponibilidade>=60? '#e6f8ed': u!.disponibilidade>=30? 'rgba(219,78,24,0.10)' : 'rgba(173,27,2,0.08)',color: u!.disponibilidade>=60? '#1e7a45': u!.disponibilidade>=30? '#DB4E18': '#AD1B02'}}>{u!.disponibilidade}%</div>}
                                <button className="surface" onClick={()=>{
                                  if(assignedId){
                                    setAssigned(a=>{ const na = {...a}; delete na[v.vaga]; return na })
                                  } else {
                                    const chosen = employees.find(e=>!Object.values(assigned).includes(e.id))
                                    setAssigned(a=>({ ...a, [v.vaga]: chosen?.id }))
                                  }
                                }}>{assignedId? 'Remover': 'Atribuir'}</button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
                      <button className="surface" onClick={()=>setStage(1)}>← Voltar</button>
                      <div>
                        <button className="surface" style={{marginRight:8}}>Editar equipe</button>
                        <button className="btn-accent" onClick={() => setStage(3)}>Confirmar equipe</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {stage===3 && (
              <div style={{textAlign:'center',marginTop:16}}>
                <div style={{fontSize:36}}>✔</div>
                <div style={{fontSize:18,fontWeight:600,marginTop:8}}>Equipe confirmada! {qty} vagas alocadas ao novo projeto.</div>
                <div style={{marginTop:12}}><button className="btn-accent" onClick={onClose}>Voltar ao portfólio</button></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
