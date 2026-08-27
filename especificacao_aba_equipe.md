# Especificação de Interface — Aba de Equipe

Este documento descreve detalhadamente a estrutura, componentes, layout, estilos e comportamentos da **Aba de Equipe**.

---

## 1. Filtro por Projeto (Botões no Topo)

- **Layout CSS / Container:** `flex items-center gap-2 flex-wrap mb-5`
- **Composição:**
  - Botão **"Todos"**
  - 1 botão por projeto específico (Total de **6 botões**)
- **Especificações de Estilo dos Botões:**
  - **Shape:** `px-4 py-2`, `border-radius: 8px`, `13px font-medium`, `transition-all`
  - **Estado Inativo:** 
    - `background: t.chipBg`
    - `color: t.textSub`
    - `border: 1px solid t.border`
  - **Estado Ativo:** 
    - `background: t.accentBg`
    - `color: t.accent`
    - `border: 1px solid t.accentBorder`
  - **Comportamento Padrão:** Botão **"Todos"** vem selecionado por padrão.

---

## 2. Banner de Resumo do Projeto

- **Comportamento de Exibição:** 
  - Aparece **somente** quando um projeto específico está selecionado (oculto no modo "Todos").
  - Anima suavemente ao aparecer (fade / slide-in).
- **Layout CSS / Container:** `rounded-xl px-5 py-4 mb-5 flex items-center gap-6`
- **Estilo Visual:** `background: t.surface`, `border: 1px solid t.border`
- **Conteúdo (da esquerda para a direita):**
  1. **Bloco de Nome:**
     - Nome do Projeto: `14px semibold t.text`
     - Cliente: `12px t.textMuted`
  2. **Separador Vertical:** `w-px h-8 background: t.border`
  3. **StatusBadge do Projeto:**
     - Utiliza o mesmo componente da aba de Projetos.
  4. **Separador Vertical:** `w-px h-8 background: t.border`
  5. **Bloco de Progresso:**
     - Label: `"PROGRESSO"` — `11px mono uppercase t.textMuted`
     - Valor: `"XX%"` — `14px semibold`, cor baseada no status.
     - Mini barra de progresso inline: `w-24 h-1.5`, `border-radius: full`, `background: rgba(128,128,128,0.15)` + preenchimento colorido conforme o status.
  6. **Separador Vertical:** `w-px h-8 background: t.border`
  7. **Bloco de Prazo:**
     - Label: `"PRAZO"` — `11px mono uppercase t.textMuted`
     - Data formatada: `13px mono t.text`
     - Dias restantes: `12px mono` colorido
       - **Verde:** `> 30 dias`
       - **Laranja:** `≤ 30 dias`
       - **Vermelho:** Atrasado
  8. **Bloco de Contagem:** (Posicionado à direita via `ml-auto`)
     - Número de pessoas no projeto: `22px semibold t.text`
     - Label: `"profissionais"` — `12px t.textMuted`

---

## 3. Barra de Busca (Dentro da Tabela)

- **Posicionamento:** Ocupa a largura total como a **primeira linha dentro do `<thead>`**, antes do cabeçalho das colunas.
- **Estrutura:** Linha especial `<tr>` contendo um único `<td colspan="5">`.
- **Estilo da Célula (`<td>`):**
  - `px-4 py-3`
  - `border-bottom: 1px solid t.border`
  - `background: t.headerBg`
- **Input de Busca (Interno):**
  - Container: `flex items-center gap-2 w-full`
  - Ícone de Lupa: SVG `14×14`, cor `t.textMuted` (à esquerda).
  - Campo `<input type="text">`:
    - Sem borda (`border: none`)
    - Sem fundo (`background: transparent`, herda `headerBg`)
    - `outline: none`
    - Largura total (`w-full`)
    - Tipografia: `13px t.text`
    - Placeholder: `"Buscar por nome..."` em `t.textMuted`

---

## 4. Cabeçalho da Tabela (Colunas)

- **Posicionamento:** Segunda linha do `<thead>`.
- **Colunas:** `Nome` · `Cargo` · `Departamento` · `Projetos ativos` · `Ingresso`
- **Estilo das Células de Cabeçalho (`<th>`):**
  - `px-4 py-3`
  - Tipografia: `11px mono uppercase t.textSub`
  - `border-bottom: 1px solid t.border`
  - `text-align: left`

---

## 5. Linhas da Tabela (`<tbody>`)

- **Estilos Globais da Linha (`<tr>`):**
  - Zebraing alternado (`rowEven` / `rowOdd`)
  - `border-bottom: 1px solid t.border`
  - `cursor: pointer`
  - **Hover:**
    - `onMouseEnter` → `background: t.panelHover`
    - `onMouseLeave` → Retorna a `rowEven` / `rowOdd`
- **Detalhamento das Colunas:**
  - **Coluna 1 — Nome** (`px-4 py-3.5`):
    - Layout: `flex items-center gap-3`
    - **Avatar:** Círculo `32×32`, iniciais do nome em `12px bold`. Cor de fundo varia conforme o índice do funcionário (pool de cores derivadas de `accent` em diferentes opacidades ou matizes complementares).
    - **Bloco de Texto:** 
      - Nome: `14px medium t.text`
      - Localização: `12px t.textMuted` (abaixo do nome)
  - **Coluna 2 — Cargo** (`px-4 py-3.5`):
    - Texto: `14px t.textSub`
  - **Coluna 3 — Departamento** (`px-4 py-3.5`):
    - **Chip:** `inline-flex px-2.5 py-1`, `border-radius: 6px`, `12px mono`, `background: t.chipBg`, `color: t.textSub`, `border: 1px solid t.border`
  - **Coluna 4 — Projetos Ativos** (`px-4 py-3.5`):
    - Número de projetos em que o funcionário atua no momento (calculado contando instâncias únicas de `projectId` no array de colaboradores).
    - Exibição: Número em `14px semibold t.text` + label `"projeto"` / `"projetos"` em `12px t.textMuted`.
    - Caso seja **0 projetos**: Exibir traço `"—"` em `t.textMuted`.
  - **Coluna 5 — Ingresso** (`px-4 py-3.5`):
    - Data formatada (`dd/MMM/yyyy`) em `13px mono t.textSub`.

---

## 6. Drawer de Detalhe do Funcionário

- **Gatilho de Abertura:** Ativado ao clicar em qualquer linha da tabela.
- **Overlay:**
  - `fixed inset-0 z-40`
  - `background: t.overlay`
  - Clique no overlay fecha o drawer.
- **Painel:**
  - `fixed right-0 top-0 h-full`
  - `width: 400px`
  - `background: t.surface`
  - `box-shadow: t.shadow`
  - `z-50`
  - `overflow-y: auto`

### Header do Drawer
- `px-6 py-5 flex items-center justify-between border-bottom: 1px solid t.border`
- **Esquerda:** Avatar grande `44×44` + Nome `16px semibold t.text` + Cargo `13px t.textMuted` (abaixo).
- **Direita:** Botão fechar (`×`) — `32×32`, `border-radius: 8px`, `chipBg`, `border`, ícone SVG `×`, fecha o drawer ao ser clicado.

### Corpo do Drawer
- `px-6 py-5 flex flex-col gap-6`

#### Seção 1: Informações
- Label: `"INFORMAÇÕES"` — `11px mono uppercase t.textMuted mb-3`
- Grid 2×2 de Campos:
  - Cada campo possui Label (`11px mono t.textMuted`) e Valor (`14px t.text` abaixo).
  - **Campos:** `Departamento` · `Localização` · `Data de ingresso` · `Disponibilidade`
  - **Campo Disponibilidade:**
    - Valor em `%` colorido:
      - **Verde:** `≥ 60%`
      - **Laranja:** `≥ 30%`
      - **Vermelho:** `< 30%`
    - Mini barra de progresso: `w-full h-1.5`, `border-radius: full`, `mt-1`
- **Separador:** `height: 1px`, `background: t.border`

#### Seção 2: Projeto Atual
- Label: `"PROJETO ATUAL"` — `11px mono uppercase t.textMuted mb-3`
- **Card do Projeto:** `rounded-xl px-4 py-3.5 background: t.surfaceAlt border: 1px solid t.border`
  - Nome do Projeto — `14px semibold t.text`
  - Cliente — `12px t.textMuted`
  - `StatusBadge` inline
  - Mini barra de progresso
- **Se sem projeto:** Mensagem `"Sem projeto ativo"` em `13px t.textMuted`.
- **Separador:** `height: 1px`, `background: t.border`

#### Seção 3: Tempo na Empresa
- Cálculo de anos/meses decorridos desde a `joinDate` até a data atual.
- Exibição: `"X anos e Y meses"` em `14px t.text` + subtexto com a data exata em `12px mono t.textMuted`.
