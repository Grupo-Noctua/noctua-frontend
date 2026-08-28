# Tela de Criar Projeto — Descrição Detalhada

## Contexto e Fluxo

A tela é acessada ao clicar no botão **"+ Criar projeto"** no *header* principal. O botão alterna seu estado visual (*accent* ativo) e a aba `'novo'` é renderizada no lugar do conteúdo atual. 

O formulário é estruturado em um card único, sem paginação — todos os campos permanecem visíveis simultaneamente, organizados em blocos internos delimitados por divisores.

Ao clicar em **"Analisar e montar equipe →"**, o formulário é substituído pela tela de **Criação da Equipe** (descrita separadamente). Se o usuário clicar no botão voltar daquela tela, ele retorna a este formulário com os valores previamente preenchidos e preservados.

---

## Container do Formulário

- **Dimensões & Alinhamento:** `max-width: 672px`, `margin: 0 auto`
- **Estilização:** `border-radius: 16px`, `overflow: hidden`, `background: t.surface`, `border: 1px solid t.border`
- **Estrutura Interna:** Layout Flexbox vertical (`flex flex-col`), composto por *Header*, *Corpo* e *Footer*.

---

## Header do Card

- **Layout e Espaçamento:** `px-8 py-6`, `border-bottom: 1px solid t.border`
- **Título:** `"Novo projeto"` — `16px semibold t.text`
- **Subtítulo:** `"Defina a composição da equipe e envie o documento de descrição para análise"` — `12px font-mono t.textMuted`, `margin-top: 2px`

---

## Corpo do Card

- **Layout e Espaçamento:** `px-8 py-7`, `flex flex-col gap-8`
- **Divisores:** O corpo contém três blocos internos separados por linhas horizontais (`height: 1px`, `background: t.border`).

---

### Bloco 1 — Orçamento

#### Label de Seção
- **Texto:** `"ORÇAMENTO"`
- **Estilo:** `11px DM Mono uppercase`, `letter-spacing: 0.08em`, `semibold`, `color: t.accent`, `margin-bottom: 12px`

#### Campo de Orçamento
- **Label do Campo:** `"Orçamento total do projeto (R$)"` — `11px mono uppercase t.textSub`, `margin-bottom: 6px`, `display: block`
- **Input com Prefixo:**
  - **Container:** `position: relative`
  - **Prefixo ("R$"):** `position: absolute`, `left: 14px`, `top: 50%`, `transform: translateY(-50%)`, `14px mono semibold t.textMuted`, `pointer-events: none`
  - **Input (`<input type="number" min="0" placeholder="0,00">`):**
    - `padding-left: 40px` (espaço reservado para o prefixo)
    - `padding-right: 14px`, `padding-top: 10px`, `padding-bottom: 10px`
    - `background: t.inputBg`, `border: 1px solid t.border`, `border-radius: 10px`
    - `color: t.text`, `font-family: DM Mono`, `font-size: 14px`, `outline: none`, `width: 100%`
- **Preview Formatado:**
  - Exibido abaixo do input apenas quando `budget > 0`.
  - Formatado via `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })`.
  - Estilo: `12px mono t.textMuted`, `margin-top: 6px`.
  - *Exemplo:* Digitou `"500000"` → Exibe `"R$ 500.000"`.

---

### Bloco 2 — Composição da Equipe

#### Label de Seção
- **Texto:** `"COMPOSIÇÃO DA EQUIPE"`
- **Estilo:** Mesmo padrão de label de seção (`11px DM Mono uppercase`, `letter-spacing: 0.08em`, `semibold`, `color: t.accent`, `margin-bottom: 12px`).

#### Sub-campo 1: Quantidade de Profissionais
- **Linha de Label + Valor Atual:**
  - Layout: `flex items-baseline justify-between`, `margin-bottom: 12px`
  - Esquerda: Label `"Quantidade de profissionais"` — `11px mono uppercase t.textSub`
  - Direita: Valor atual em tempo real
    - Número: `26px semibold mono tabular-nums t.text`, `line-height: 1`
    - Unidade: `"pessoa"` (se 1) ou `"pessoas"` (se >1) — `12px t.textMuted`, `padding-top: 6px` (alinhado na baseline com o número)
- **Slider (`<input type="range" min="1" max="100">`):**
  - Sincronizado com o estado `professionals`.
  - Valor do slider: `Math.min(professionals, 100)` (clampado ao máximo visual).
  - Estilização customizada via `<style>`:
    - `.prof-slider`: `-webkit-appearance: none`, `width: 100%`, `height: 4px`, `background: transparent`, `cursor: pointer`, `outline: none`
    - `::-webkit-slider-runnable-track` / `::-moz-range-track`: `height: 4px`, `border-radius: 2px`, `background: t.border`
    - `::-webkit-slider-thumb` / `::-moz-range-thumb`: `-webkit-appearance: none`, `width: 20px`, `height: 20px`, `border-radius: 50%`, `background: t.accent`, `border: 3px solid t.surface`, `box-shadow: 0 0 0 1.5px t.accent`, `margin-top: -8px`
- **Ticks de Referência:**
  - Layout: `flex justify-between`, `mt-1.5 px-0.5`
  - Valores exibidos: `1` · `20` · `40` · `60` · `80` · `100`
  - Estilo: `10px mono t.textMuted`
- **Campo de Entrada Manual:**
  - Layout: `flex items-center gap-2 mt-3`
  - Label: `"Ou insira manualmente:"` — `12px t.textMuted`
  - Input (`<input type="number" min="1">` — sem valor máximo estrito):
    - `width: 64px`, `height: 32px`, `border-radius: 8px`
    - `background: t.inputBg`, `border: 1px solid t.border`
    - `color: t.text`, `14px mono semibold`, `text-align: center`, `outline: none`
  - **Sincronização Bidirecional:** Alterar o slider atualiza a caixa de texto e vice-versa em tempo real. Se o valor inserido for maior que 100, o label exibe o valor real (ex: "150 pessoas"), mas o *thumb* do slider trava visualmente no limite de 100.

#### Sub-campo 2: Senioridades Desejadas
- **Linha de Label + Badge Contador:**
  - Layout: `flex items-center justify-between`, `margin-bottom: 8px`
  - Esquerda: Label `"Senioridades desejadas"` — `11px mono uppercase t.textSub`
  - Direita: Badge de contagem (exibido apenas quando `seniorities.length > 0`):
    - Texto: `"X selecionado"` / `"X selecionados"`
    - Estilo: `12px mono`, `background: rgba(accent, 0.10)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.22)`, `border-radius: full`, `px-2 py-0.5`
- **Grid de Chips de Senioridade:**
  - Layout: `grid grid-cols-3 gap-2`
  - 6 Chips disponíveis: **Estagiário**, **Júnior**, **Pleno**, **Sênior**, **Especialista** e **Tech Lead**.
- **Estilo dos Chips (`<button type="button">`):**
  - Layout General: `flex items-center gap-3 px-4 py-3`, `border-radius: 12px`, `14px font-medium`, `text-align: left`, `transition-all`
  - Estado Não Selecionado: `background: t.surfaceAlt`, `color: t.textSub`, `border: 1.5px solid t.border`
  - Estado Selecionado: `background: rgba(accent, 0.10)`, `color: t.accent`, `border: 1.5px solid rgba(accent, 0.35)`
- **Conteúdo Interno do Chip (3 Elementos):**
  1. **Indicador de Nível (`flex-shrink-0 width: 20px`):** `10px mono`, `opacity: 0.60`, `line-height: 1`
     - Estagiário → `"·"`
     - Júnior → `"○○"`
     - Pleno → `"●○"`
     - Sênior → `"●●"`
     - Especialista → `"★"`
     - Tech Lead → `"★★"`
  2. **Label da Senioridade (`flex-1`):** Nome da senioridade em texto simples.
  3. **Checkmark SVG (Exibido apenas quando selecionado, `flex-shrink-0`):**
     - SVG `14×14px`, `color: t.accent`
     - Círculo de fundo: `cx=7`, `cy=7`, `r=6.5`, `stroke: currentColor`, `stroke-opacity: 0.35`
     - Path do Check: `M4.5 7l2 2 3-3`, `stroke: currentColor`, `strokeWidth: 1.5`, `strokeLinecap: round`, `strokeLinejoin: round`

---

### Bloco 3 — Documento do Projeto

#### Label de Seção
- **Texto:** `"DOCUMENTO DO PROJETO"`
- **Estilo:** Mesmo padrão de label de seção (`11px DM Mono uppercase`, `letter-spacing: 0.08em`, `semibold`, `color: t.accent`, `margin-bottom: 12px`).

#### Campo de Entrada
- **Label do Campo:** `"Descrição padrão do projeto (PDF)"` — `11px mono uppercase t.textSub`, `margin-bottom: 6px`

#### Drop Zone (Área de Upload)
- **Container Base:** `position: relative`, `flex flex-col items-center justify-center gap-3`, `border-radius: 12px`, `cursor: pointer`, `transition-all`, `padding: 36px 24px`, `border: 2px dashed`
- **Estados Visuais da Drop Zone:**
  1. **Idle (Sem arquivo, sem drag):** `border-color: t.border`, `background: t.surfaceAlt`
  2. **Dragging (Arquivo sendo arrastado sobre a zona):** `border-color: t.accent`, `background: rgba(accent, 0.05)` (o label alterna para *"Solte o arquivo aqui"*).
  3. **Preenchido (Arquivo selecionado):** `border-color: rgba(accent, 0.4)`, `background: rgba(accent, 0.04)`

- **Conteúdo — Estados Idle / Dragging:**
  - **Ícone Upload:** Container `44×44px`, `border-radius: 12px`, `background: t.chipBg`
    - SVG Upload `20×20px`, `color: t.textSub`
    - Path: `M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12` (`strokeWidth: 1.5`, `strokeLinecap: round`, `strokeLinejoin: round`)
  - **Texto Principal:**
    - Idle: `"Arraste o PDF aqui"` — `14px semibold t.text`
    - Dragging: `"Solte o arquivo aqui"` — `14px semibold t.text`
  - **Texto Secundário (Apenas no Idle):** `"ou clique para selecionar · apenas arquivos .pdf"` — `12px t.textMuted`

- **Conteúdo — Estado Preenchido:**
  - **Ícone Documento:** Container `44×44px`, `border-radius: 12px`, `background: rgba(accent, 0.12)`
    - SVG Documento `22×22px`, `color: t.accent`
    - Path do Documento: `M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z`
    - Linhas de texto: `M14 2v6h6 M9 13h6 M9 17h4` (`strokeWidth: 1.5`)
  - **Nome do Arquivo:** `pdf.name` — `14px font-medium t.text`, `text-align: center`
  - **Tamanho & Instrução:** `(pdf.size / 1024).toFixed(0) + " KB · clique para substituir"` — `12px t.textMuted`, `margin-top: 4px`
  - **Botão de Remover Arquivo:**
    - Posicionamento: `position: absolute`, `top: 12px`, `right: 12px`
    - Formato: Círculo `24×24px`, `background: t.chipBg`, `color: t.textSub`
    - Conteúdo: `"×"` (caractere `&times;` em HTML)
    - Evento `onClick`: `e.stopPropagation()` (impede o acionamento de seleção no container principal) + `setPdf(null)`

- **Estrutura Técnica & Eventos da Drop Zone:**
  - Input Oculto: `<input type="file" accept="application/pdf" className="hidden" id="pdf-input">`
  - Clique no Container: Dispara `document.getElementById('pdf-input')?.click()`
  - Evento `onChange`: Extrai `e.target.files?.[0]` e atualiza `setPdf`
  - Handlers de Drag and Drop:
    - `onDragOver`: `e.preventDefault()`, `setDragging(true)`
    - `onDragLeave`: `setDragging(false)`
    - `onDrop`: `e.preventDefault()`, `setDragging(false)`, valida `file.type === 'application/pdf'`, atualiza `setPdf(file)`

---

## Footer do Card

- **Layout e Espaçamento:** `px-8 py-5`, `border-top: 1px solid t.border`, `background: t.surfaceAlt`, `flex items-center justify-between`
- **Botão "Limpar campos" (Lado Esquerdo):**
  - Estilo: Sem borda, sem fundo explícito (herda `surfaceAlt`), `14px font-medium t.textMuted`
  - Evento `onClick`: Reseta todos os estados do formulário (`setProfessionals(1)`, `setSeniorities([])`, `setPdf(null)`, `setBudget('')`).
- **Botão "Analisar e montar equipe →" (Lado Direito):**
  - Estilo: `px-6 py-2.5`, `border-radius: 8px`, `14px semibold`, `background: t.accent`, `color: #fff`
  - Atributo: `type="submit"` — dispara o manipulador `handleSubmit`
  - Evento `handleSubmit`: Invoca `onSubmit({ professionals, seniorities, pdf, budget })`, que armazena `teamCreationData` no Dashboard e aciona a renderização da tela de **Criação da Equipe**.
