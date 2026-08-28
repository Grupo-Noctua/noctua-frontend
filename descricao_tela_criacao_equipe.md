# Tela de Criação da Equipe — Descrição Detalhada

## Contexto e Fluxo

Esta tela aparece imediatamente após o usuário clicar em **"Analisar e montar equipe →"** no formulário de criação de projeto. Ela substitui o formulário na mesma área de conteúdo da aba, sem abrir uma nova página. O formulário desaparece e esta tela ocupa todo o espaço disponível abaixo do *header* e das *tabs*.

---

## Container Principal

- **Estilização e Layout:**
  - `border-radius: 16px`
  - `overflow: hidden`
  - `border: 1px solid t.border`
  - `background: t.surface`
  - `min-height: 600px`
- **Estrutura Interna:** Layout Flexbox vertical (`flex flex-col`), composto por um *Header* fixo no topo e o *Body* ocupando o espaço restante abaixo (`flex-1`).

---

## Header da Tela

- **Layout e Espaçamento:** `px-8 py-5`, `border-bottom: 1px solid t.border`, `flex items-center justify-between`

### Lado Esquerdo — Navegação e Título
- **Botão Voltar:**
  - **Dimensões & Estilo:** `28×28px`, `border-radius: 8px`, `background: t.chipBg`, `color: t.textSub`, `border: 1px solid t.border`
  - **Ícone:** Chevron SVG `14×14px` apontando para a esquerda.
  - **Ação (`onClick`):** Retorna ao formulário (limpa o estado `teamCreationData`, mantendo os valores do formulário para evitar perda de preenchimento).
- **Bloco de Título (ao lado do botão, `gap-3`):**
  - **Título:** `"Criação da equipe"` — `14px`, `semibold`, `t.text`
  - **Subtítulo:** `"Análise de IA · N vagas sugeridas"` — `12px`, `mono`, `t.textMuted` (*onde N é o número de profissionais informado no formulário*).

### Lado Direito — Ações
- **Botão "Editar equipe":**
  - **Estilo:** `flex items-center gap-2 px-4 py-2`, `border-radius: 8px`, `14px font-medium`
  - **Ícone:** Lápis SVG `13×13px`
  - **Estado Inativo (Padrão):** `background: t.chipBg`, `color: t.textSub`, `border: 1px solid t.border`
  - **Estado Ativo (Modo edição ligado):** `background: rgba(accent, 0.10)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.30)`
  - **Label Dinâmico:** Alterna entre `"Editar equipe"` (inativo) e `"Concluir edição"` (ativo).
  - **Ação:** Toggle `setEditing(e => !e)`.
- **Botão "Confirmar equipe":**
  - **Estilo:** `px-4 py-2`, `border-radius: 8px`, `14px semibold`, `background: t.accent`, `color: #fff`
  - **Ação:** Define `confirmed: true`, exibindo a Tela de Sucesso.

---

## Body Split 50/50

- **Layout General:** `flex flex-1`, `min-height: 520px`
- **Comportamento:** Divisão exata ao meio (50% / 50%). O painel esquerdo possui `border-right: 1px solid t.border`. Ambos os painéis possuem rolagem vertical independente (`overflow-y: auto`).

---

### Painel Esquerdo — Análise de IA
- **Estrutura:** `width: 50%`, `border-right: 1px solid t.border`, `flex flex-col`, `overflow-y: auto`

#### Toolbar do Documento (Sticky)
- **Estilo:** `sticky top-0 z-10`, `px-6 py-3`, `background: t.surfaceAlt`, `border-bottom: 1px solid t.border`, `flex items-center gap-2`
- **Ícone PDF:**
  - Container `20×20px`, `border-radius: 4px`, `background: rgba(accent, 0.12)`
  - SVG de documento `11×11px`, `color: t.accent` (Retângulo com canto superior direito dobrado e linha horizontal no centro).
- **Nome do Arquivo:**
  - `12px mono t.textSub`
  - Exibe o nome do arquivo enviado pelo usuário (`data.pdf.name`) ou `"descricao_projeto.pdf"` como *placeholder*.
- **Badge "IA":**
  - Posicionamento: `ml-auto`
  - `10px mono`, `background: rgba(accent, 0.10)`, `color: t.accent`, `px-1.5 py-0.5`, `border-radius: 4px`
  - Texto: `"IA"`

#### Conteúdo do Documento
- **Container:** `px-8 py-7`, `flex flex-col gap-7`

##### 1. Cabeçalho do Documento
- **Linha de Metadados:** `"Análise gerada por IA · PwC Brasil · DD/MM/AAAA"` (*Data atual via `new Date().toLocaleDateString('pt-BR')`*), `10px mono uppercase t.textMuted`, `letter-spacing: wider`, `margin-bottom: 8px`.
- **Título Principal:** `"Análise de Viabilidade e Composição de Equipe"` — `18px semibold leading-snug t.text`.
- **Subtítulo:** `"Baseado no documento de descrição de projeto enviado"` — `14px t.textMuted`, `margin-top: 4px`.
- **Tags de Contexto (`flex flex-wrap gap-2 mt-3`):**
  - **Por Senioridade:** Uma tag por senioridade selecionada — `11px mono`, `background: rgba(accent, 0.08)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.2)`, `border-radius: 4px`, `px-2 py-0.5`.
  - **Por Quantidade:** `"N profissional/profissionais"` — mesma forma, porém `background: t.chipBg`, `color: t.textSub`, `border: 1px solid t.border`.
  - *Obs.: Se nenhuma senioridade for selecionada, exibe apenas a tag de quantidade.*
- **Separador:** `border-bottom: 1px solid t.border pb-5`

##### 2. Seções do Documento (01 a 06)
Cada seção segue o padrão visual estrito:
- **Cabeçalho da Seção:** `flex items-center gap-2`
  - Número (`"01"`–`"06"`): `10px mono tabular-nums t.textMuted`
  - Linha horizontal: `h-px flex-1 background: t.border`
  - Título da seção: `11px mono semibold uppercase letter-spacing: wider t.accent`, alinhado à direita.
- **Corpo da Seção:** `padding-left: 20px`, `14px leading-relaxed t.textSub`, com `whitespace-pre-line` para respeitar quebras de linha.

**Conteúdos Fictícios por Seção:**
1. **01 — Resumo Executivo:**
   > "O documento analisado descreve um projeto de transformação digital de média-alta complexidade, com escopo centrado em integração de sistemas legados e desenvolvimento de novas interfaces orientadas a dados. A análise indica viabilidade técnica com nível de risco moderado."
2. **02 — Tecnologias Identificadas:**
   > "React / TypeScript · Node.js · PostgreSQL · REST APIs · Docker · CI/CD (GitHub Actions) · Cloud AWS (EC2, RDS, S3). Integração com sistemas SAP identificada como ponto crítico de atenção."
3. **03 — Complexidade Estimada:**
   > "Alta — presença de múltiplos stakeholders, dependências externas e requisitos de conformidade regulatória (LGPD). Estimativa de esforço: 8–14 meses para entrega completa com uma equipe de porte médio."
4. **04 — Perfil de Equipe Recomendado:**
   > "A IA identificou necessidade de cobertura nas disciplinas de Engenharia de Software (Sênior/Pleno), Arquitetura de Soluções, UX/UI, QA, DevOps e Gestão de Projeto. Recomenda-se ao menos um Tech Lead dedicado à integração."
5. **05 — Riscos Identificados:**
   > "① Dependência de APIs de terceiros sem SLA documentado.  
   > ② Escopo de migração de dados subestimado.  
   > ③ Necessidade de alinhamento regulatório para módulo financeiro.  
   > ④ Ausência de documentação técnica dos sistemas legados."
6. **06 — Pontuação de Confiança da Análise:**
   > "Confiança geral: 87% · Completude do documento: alta · Ambiguidades detectadas: 3 pontos menores resolvíveis em kickoff."

##### 3. Rodapé do Documento
- `border-top: 1px solid t.border`, `padding-top: 16px`, `text-align: center`
- Texto: `"Documento gerado automaticamente · Sujeito à revisão humana"` — `10px mono t.textMuted`

---

### Painel Direito — Equipe Sugerida
- **Estrutura:** `width: 50%`, `flex flex-col`, `overflow-y: auto`

#### Toolbar do Painel (Sticky)
- **Estilo:** `sticky top-0 z-10`, `px-6 py-3`, `background: t.surfaceAlt`, `border-bottom: 1px solid t.border`, `flex items-center justify-between`
- **Label Esquerda:** `"Equipe sugerida pela IA"` — `12px mono semibold t.textSub`
- **Badge Direita:** `"N vaga / vagas"` — `12px mono`, `background: rgba(accent, 0.10)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.20)`, `border-radius: full`, `px-2 py-0.5`

#### Banner Informativo
- **Container:** `px-6 pt-5 pb-1`
- **Card Interno:** `flex gap-3 px-4 py-3.5`, `border-radius: 12px`, `background: t.surfaceAlt`, `border: 1px solid t.border`
- **Ícone Info:** SVG `14×14px`, `color: t.accent`, `flex-shrink-0 mt-0.5` (Círculo com stroke + ponto acima + linha vertical abaixo).
- **Texto (`12px leading-relaxed t.textSub`):**
  > "Esta composição foi gerada automaticamente com base na análise do documento de descrição do projeto e nas preferências de senioridade informadas. Revise as sugestões antes de confirmar ou use **Editar equipe** para ajustar manualmente."  
  *(Obs.: A palavra "Editar equipe" deve ter `color: t.text bold`).*

#### Lista de Vagas
- **Container:** `px-6 py-4 flex flex-col gap-2`

##### Banner de Instrução (Modo Edição)
- *Exibido apenas quando `editing === true`*
- **Estilo:** `text-xs px-3 py-2 rounded-lg mb-2 font-mono`, `background: rgba(accent, 0.07)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.18)`
- **Texto:** `"Clique em uma vaga para expandir e escolher manualmente o profissional."`

##### Card de Vaga
- **Container:** `rounded-xl overflow-hidden transition-all`
  - Borda sem atribuição: `1.5px solid t.border`
  - Borda com funcionário atribuído: `1.5px solid rgba(accent, 0.28)`
- **Row Principal da Vaga:** `flex items-center gap-3 px-4 py-3`, `cursor-pointer` (somente no modo edição)
  - Background padrão: `t.surfaceAlt`
  - Background com atribuição: `rgba(accent, 0.06)`
- **Elementos da Row:**
  1. **Número da Vaga:** Formato `String(i+1).padStart(2, '0')` (`"01"`, `"02"`...), `10px mono t.textMuted`, `width: 20px`, `text-align: center`, `flex-shrink-0`.
  2. **Avatar Circular (`32×32px`):**
     - *Vazio:* `background: t.chipBg`, `color: t.textMuted`, `border: 1px dashed t.border`, Conteúdo: `"?"`
     - *Preenchido:* `background: rgba(accent, 0.18)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.25)`, Conteúdo: Iniciais (ex: `"AC"`).
  3. **Bloco de Texto (`flex-1 min-w-0`):**
     - Linha Superior: Cargo sugerido pela IA — `14px semibold t.text`, `truncate`.
     - Linha Inferior: `"Senioridade · Departamento"` — `12px t.textMuted`, `truncate`.
     - *Se houver funcionário atribuído:* Concatena `" · Nome do funcionário"` inline com `color: t.accent`.
  4. **Área Direita (`flex items-center gap-2 flex-shrink-0`):**
     - **Badge de Disponibilidade** (quando atribuído): `10px mono`, `px-1.5 py-0.5`, `border-radius: 4px`
       - `≥ 60%`: `background: #1e7a4514`, `color: #1e7a45`
       - `≥ 30%`: `background: rgba(219,78,24,0.08)`, `color: #DB4E18`
       - `< 30%`: `background: rgba(173,27,2,0.08)`, `color: #AD1B02`
       - Texto: `"XX% livre"`
     - **Chevron SVG (`12×12px t.textMuted`)** (somente no modo edição):
       - Transição: `transform 0.2s`
       - Fechado: `rotate(0deg)`
       - Aberto (Slot expandido): `rotate(180deg)`

##### Dropdown de Seleção de Funcionário
- *Exibido abaixo da row quando o slot está expandido no modo edição.*
- **Estilo:** `border-top: 1px solid t.border`, `background: t.surface`
- **Item do Funcionário (`<button type="button">`):**
  - **Layout:** `flex items-center gap-3 w-full px-4 py-2.5 text-left transition-all`, `border-bottom: 1px solid t.border` (exceto o último).
  - **Background:** `transparent` (padrão) / `rgba(accent, 0.07)` (se selecionado para o slot).
  - **Avatar (`28×28px`):** `background: rgba(accent, 0.18)`, `color: t.accent` (se selecionado) ou `background: t.chipBg`, `color: t.textSub` (se não selecionado). Texto com as iniciais.
  - **Textos:**
    - Nome: `14px font-medium t.text`, `truncate`
    - Cargo: `12px t.textMuted`, `truncate`
  - **Disponibilidade (à direita):** `10px mono`, formato `"XX% livre"` (com as cores de status descritas acima).
- **Comportamento ao Clicar:**
  - Atribui o funcionário ao slot (`assigned`).
  - Fecha o dropdown do slot (`setExpandedSlot(null)`).
  - Atualiza imediatamente a visualização da vaga (avatar, nome inline, badge de disponibilidade e borda accent).

---

## Tela de Sucesso

- *Exibida após clicar em "Confirmar equipe", substituindo todo o conteúdo do container.*
- **Layout:** `flex flex-col items-center justify-center py-24 gap-5`
- **Ícone de Confirmação:**
  - Círculo `64×64px`, `background: t.accentBg`, `border: 2px solid t.accent`
  - SVG Checkmark `28×28px` centralizado (`color: t.accent`, `strokeWidth: 2.5`, `strokeLinecap: round`, `strokeLinejoin: round`, `path: M5 13l4 4L19 7`).
- **Textos Centralizados:**
  - Título: `"Equipe confirmada!"` — `18px semibold t.text`
  - Subtítulo: `"N vaga/vagas alocada/alocadas ao novo projeto."` — `14px t.textMuted`, `margin-top: 4px`
- **Botão de Retorno:**
  - Estilo: `mt-6 px-5 py-2`, `border-radius: 8px`, `14px font-medium`, `background: t.chipBg`, `color: t.textSub`, `border: 1px solid t.border`
  - Texto: `"Voltar ao portfólio"`
  - **Ação:** Executa `onConfirm()` -> Limpa `teamCreationData`, altera a aba para `'projetos'`.
