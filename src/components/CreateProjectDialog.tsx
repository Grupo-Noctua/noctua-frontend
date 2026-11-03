import React from 'react'

const docBaseUrl = new URL('../../DocumentacaoBase-Projetos.docx', import.meta.url).href

export default function CreateProjectDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel open" role="dialog" aria-modal="true" aria-labelledby="create-project-title" onClick={e => e.stopPropagation()}>
        <div className="drawer-header"><button className="btn" onClick={onClose}>Voltar</button></div>
        <div className="drawer-content">
          <h3 id="create-project-title" style={{ fontSize: 18, fontWeight: 600 }}>Novo projeto</h3>
          <p style={{ marginTop: 16 }}>A API atual permite consultar projetos e recomendações já processados. O envio de documentos, a análise de IA e a criação de projetos ainda não estão integrados.</p>
          <p className="text-sub" style={{ marginTop: 12, marginBottom: 24 }}>Você pode baixar o modelo para preparar o documento. Nenhum projeto será criado nesta tela.</p>
          <a className="btn" href={docBaseUrl} download>Download Documento base</a>
        </div>
      </div>
    </div>
  )
}
