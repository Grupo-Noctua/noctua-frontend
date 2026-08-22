import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import KPIs from './components/KPIs'
import ProjectsTab from './tabs/ProjectsTab'
import TeamTab from './tabs/TeamTab'
import ToolsTab from './tabs/ToolsTab'
import CreateProjectFlow from './components/CreateProjectFlow'

export default function App() {
  const [theme, setTheme] = useState<'light'|'dark'>(() => {
    const raw = localStorage.getItem('theme')
    return (raw as 'light'|'dark') || 'light'
  })
  const [activeTab, setActiveTab] = useState<'projetos'|'equipe'|'ferramentas'>('projetos')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [theme])

  return (
    <div className="min-h-screen p-6">
      <Header
        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        onCreate={() => setCreating(true)}
        userName="Rafael Drummond · Diretor de Projetos"
      />

      <div className="mt-6">
        <KPIs />
      </div>

      <div className="mt-6">
        <div className="tabs-container">
          <button className={`tab-btn ${activeTab==='projetos' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('projetos')}>PROJETOS</button>
          <button className={`tab-btn ${activeTab==='equipe' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('equipe')}>EQUIPE</button>
          <button className={`tab-btn ${activeTab==='ferramentas' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('ferramentas')}>FERRAMENTAS</button>
        </div>
      </div>

      <main className="mt-6">
        {activeTab === 'projetos' && <ProjectsTab />}
        {activeTab === 'equipe' && <TeamTab />}
        {activeTab === 'ferramentas' && <ToolsTab />}
      </main>

      {creating && <CreateProjectFlow onClose={() => setCreating(false)} />}
    </div>
  )
}
