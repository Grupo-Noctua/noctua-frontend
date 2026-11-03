import React from 'react'
import { ProjetoDTO } from '../api'
import { formatCurrency, formatDate } from '../format'

export default function ProjectDrawer({ project, onClose }: { project: ProjetoDTO, onClose: () => void }) {
  const candidates = project.profissionaisRecomendados || []

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel open" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <button className="btn" aria-label="Fechar detalhes" onClick={onClose}>×</button>
        </div>
        <div className="drawer-content">
          <h3 id="project-title" style={{ fontSize: 16, fontWeight: 600 }}>{project.nomeProjeto || 'Projeto sem nome'}</h3>
          <div className="text-sub">{project.cliente || 'Cliente não informado'}</div>
          <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
            <div><strong>Gestor responsável:</strong> {project.gestorResponsavel || 'Não informado'}</div>
            <div><strong>Orçamento:</strong> {formatCurrency(project.orcamento)}</div>
            <div><strong>Início previsto:</strong> {formatDate(project.dataInicioPrevista)}</div>
            <div><strong>Duração estimada:</strong> {project.duracaoEstimada || 'Não informada'}</div>
            <div><strong>Descrição:</strong> {project.descricao || 'Não informada'}</div>
            <div><strong>Objetivo geral:</strong> {project.objetivoGeral || 'Não informado'}</div>
          </div>

          <h4 style={{ marginTop: 24, fontWeight: 600 }}>Profissionais recomendados</h4>
          <p className="text-sub" style={{ marginBottom: 12 }}>Ranking retornado pela API para este processamento.</p>
          {candidates.length === 0 && <p className="text-sub">Nenhum profissional recomendado neste processamento.</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {candidates.map((candidate, index) => (
              <div key={`${candidate.idProfissional}-${candidate.vaga}-${index}`} style={{ padding: 12, borderRadius: 8, background: 'var(--surfaceAlt)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{candidate.nome || candidate.idProfissional || 'Nome não informado'}</div>
                <div className="text-sub">{candidate.vaga || 'Vaga não informada'} · {candidate.senioridade || 'Senioridade não informada'}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
                  <span>Posição: {candidate.posicaoRanking ?? 'Não informada'}</span>
                  <span>Pontuação: {candidate.scoreTotal == null ? 'Não informada' : Number(candidate.scoreTotal).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</span>
                </div>
                {candidate.justificativa && <p style={{ marginTop: 8 }}>{candidate.justificativa}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
