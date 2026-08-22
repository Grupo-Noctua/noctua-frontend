import React from 'react'

export default function Header({ onToggleTheme, onCreate, userName }:{onToggleTheme:()=>void,onCreate:()=>void,userName:string}){
  return (
    <header className="app-header flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="logo-badge">D</div>
        <div>
          <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{userName}</div>
          <div style={{fontSize:12,fontFamily:'DM Mono',color:'var(--textMuted)'}}>Diretor de Projetos</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-3 py-1.5 rounded" style={{borderRadius:8,background:'var(--chipBg)',color:'var(--textSub)',border:'1px solid var(--border)'}} onClick={onCreate}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
           Criar projeto
        </button>
        <button className="px-3 py-1.5 rounded" style={{borderRadius:8,background:'var(--chipBg)',color:'var(--textSub)',border:'1px solid var(--border)'}} onClick={onToggleTheme}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="avatar-rd">RD</div>
      </div>
    </header>
  )
}
