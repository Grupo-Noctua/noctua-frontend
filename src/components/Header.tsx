import React from 'react'

export default function Header({ onToggleTheme, onCreate, userName, theme }:{onToggleTheme:()=>void,onCreate:()=>void,userName:string, theme: 'light'|'dark'}){
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
          + Criar projeto
        </button>
        <button aria-label="Alternar tema" className="px-3 py-1.5 rounded" style={{borderRadius:8,background:'var(--chipBg)',color:'var(--textSub)',border:'1px solid var(--border)',padding:'8px 10px',display:'inline-flex',alignItems:'center',justifyContent:'center'}} onClick={onToggleTheme}>
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}

        </button>
      </div>
    </header>
  )
}
