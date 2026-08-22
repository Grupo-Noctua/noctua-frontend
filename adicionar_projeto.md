# Documentação de UI/UX: Formulário de Criação de Projeto e Tela de Análise da IA

Esta documentação detalha as especificações técnicas, estrutura visual, componentes, comportamentos e estados dos fluxos de **Formulário de Criação de Projeto** e **Tela de Análise da IA — Criação da Equipe**.

---

## 1. Formulário de Criação de Projeto

### Container Principal
* **Estrutura:** Card único centralizado.
* **Largura Máxima (`max-width`):** `672px`
* **Arredondamento (`border-radius`):** `16px`
* **Overflow:** `hidden`
* **Background:** `t.surface`
* **Borda:** `1px solid t.border`
* **Disposição:** Sem seções separadas — tudo contido em um único painel fluido.

---

### Header do Card
* **Espaçamento (`padding`):** `px-8 py-6` (`32px` horizontal, `24px` vertical)
* **Borda Inferior:** `1px solid t.border`
* **Título:** `"Novo projeto"`
  * **Fonte:** `16px`, `semibold`
  * **Cor:** `t.text`
* **Subtítulo:** `"Defina a composição da equipe e envie o documento de descrição para análise"`
  * **Fonte:** `12px`, `font-mono`
  * **Cor:** `t.textMuted`

---

### Corpo do Card
* **Espaçamento (`padding`):** `px-8 py-7` (`32px` horizontal, `28px` vertical)
* **Layout:** `flex flex-col gap-8`
* **Divisores:** Três blocos separados por divisores horizontais (`height: 1px`, `background: t.border`).

#### Bloco 1 — Orçamento
* **Label de Seção:** `"ORÇAMENTO"`
  * **Estilo:** `11px`, `DM Mono`, `uppercase`, `letter-spacing: 0.08em`, `semibold`, cor `t.accent`
* **Campo de Entrada:**
  * **Label do Campo:** `"Orçamento total do projeto (R$)"` — `11px`, `mono`, `uppercase`, `t.textSub`
  * **Prefixo Fixo:** `"R$"` posicionado absolutamente à esquerda (`left: 14px`), `14px`, `mono`, cor `t.textMuted`.
  * **Input:**
    * **Padding Interno:** `padding-left: 40px` (para evitar sobreposição com o prefixo) e `padding: 10px 14px`.
    * **Estilo Visual:** `background: t.inputBg`, `border: 1px solid t.border`, `border-radius: 10px`, `color: t.text`, `outline: none`, `font-mono`, `14px`.
    * **Atributos:** `type="number"`, `min="0"`, `placeholder="0,00"`.
  * **Preview Formatado:**
    * Ao digitar um valor `> 0`, exibe abaixo do input (em `12px`, `mono`, `t.textMuted`) o valor formatado via JavaScript:
      `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })`

#### Bloco 2 — Composição da Equipe
* **Label de Seção:** `"COMPOSIÇÃO DA EQUIPE"` — `11px`, `DM Mono`, `uppercase`, `letter-spacing: 0.08em`, `semibold`, cor `t.accent`.
* **Sub-campo: Quantidade de Profissionais**
  * **Cabeçalho do Sub-campo:**
    * **Esquerda:** Label `"Quantidade de profissionais"` (`11px`, `mono`, `uppercase`, `t.textSub`).
    * **Direita:** Valor atual alinhado na baseline — Número em `26px`, `semibold`, `mono`, `t.text` + unidade `"pessoa"` / `"pessoas"` em `12px`, `t.textMuted`.
  * **Slider Horizontal:**
    * **Atributos:** `<input type="range" min="1" max="100">`, largura `100%`.
    * **Track:** `4px` de altura, `border-radius: 2px`, `background: t.border`.
    * **Thumb:** Círculo de `20px × 20px`, `background: t.accent`, `border: 3px solid t.surface`, `box-shadow: 0 0 0 1.5px t.accent`, `margin-top: -8px`.
    * **Customização:** Implementado via bloco `<style>` utilizando os seletores `::-webkit-slider-*` e `::-moz-range-*`.
  * **Ticks de Escala (Abaixo do Slider):**
    * **Layout:** `flex justify-between mt-1.5 px-0.5`
    * **Valores:** `1`, `20`, `40`, `60`, `80`, `100` em `10px`, `mono`, `t.textMuted`.
  * **Entrada Manual (Sincronizada):**
    * **Label:** `"Ou insira manualmente:"` (`12px`, `t.textMuted`).
    * **Input:** `type="number"`, `width: 64px`, `height: 32px`, `border-radius: 8px`, `background: t.inputBg`, `border: 1px solid t.border`, `14px`, `mono`, `semibold`, texto centralizado.
    * **Sincronização:** Slider e Input manual atualizados bidirecionalmente em tempo real.
* **Sub-campo: Senioridades Desejadas**
  * **Cabeçalho:**
    * Label à esquerda + Badge contador à direita: `"X selecionados"` em `12px`, `mono`, `background: rgba(accent, 0.10)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.22)`, `border-radius: full`, `px-2 py-0.5` (exibido apenas quando houver seleções).
  * **Grid de Opções:** Grid `3×2` de Chips.
  * **Estilo Base do Chip:** `flex items-center gap-3 px-4 py-3`, `border-radius: 12px`, `14px font-medium`, `text-align: left`.
    * **Esquerda:** Indicador visual de nível em `10px`, `mono`, `opacity-60` (`·`, `○○`, `●○`, `●●`, `★`, `★★`).
    * **Centro:** Label da senioridade (`flex-1`).
    * **Direita:** Ícone SVG de checkmark em círculo (`w-14 h-14`) quando selecionado.
  * **Estados do Chip:**
    * **Normal:** `background: t.surfaceAlt`, `color: t.textSub`, `border: 1.5px solid t.border`.
    * **Selecionado:** `background: rgba(accent, 0.10)`, `color: t.accent`, `border: 1.5px solid rgba(accent, 0.35)`.

#### Bloco 3 — Documento do Projeto
* **Label de Seção:** `"DOCUMENTO DO PROJETO"` — mesmo padrão dos blocos anteriores.
* **Label do Campo:** `"Descrição padrão do projeto (PDF)"` — `11px`, `mono`, `uppercase`, `t.textSub`.
* **Drop Zone (Área de Upload):**
  * **Estilo:** `padding: 36px 24px`, `border-radius: 12px`, `cursor: pointer`, `flex flex-col items-center justify-center gap-3`.
  * **Borda e Fundo por Estado (Borda `2px dashed`):**
    * **Idle (Repouso):** `border: t.border`, `background: t.surfaceAlt`.
    * **Dragging (Arrastando):** `border: t.accent`, `background: rgba(accent, 0.05)`.
    * **Com Arquivo:** `border: rgba(accent, 0.4)`, `background: rgba(accent, 0.04)`.
  * **Conteúdo por Estado:**
    * **Estado Vazio (Idle):** Ícone SVG de upload `20×20` (`t.textSub`) em container `44×44` com `border-radius: 12px` e `background: t.chipBg` + Título `"Arraste o PDF aqui"` (`14px semibold t.text`) + Subtítulo `"ou clique para selecionar · apenas arquivos .pdf"` (`12px t.textMuted`).
    * **Estado Arrastando (Dragging):** Texto do título substituído por `"Solte o arquivo aqui"`.
    * **Estado Com Arquivo:** Ícone SVG de documento `t.accent` em container `44×44` (`rgba(accent, 0.12)`) + Nome do arquivo (`14px semibold t.text`) + Detalhes `"X KB · clique para substituir"` (`12px t.textMuted`) + Botão de remoção `"×"` absoluto no canto superior direito (`top-3 right-3`, `24×24`, círculo `t.chipBg`).

---

### Footer do Card
* **Espaçamento (`padding`):** `px-8 py-5`
* **Estilo:** `border-top: 1px solid t.border`, `background: t.surfaceAlt`, `flex items-center justify-between`.
* **Esquerda:** Botão texto `"Limpar campos"` — `14px font-medium t.textMuted`, sem borda, sem fundo.
* **Direita:** Botão `"Analisar e montar equipe →"` — `px-6 py-2.5`, `border-radius: 8px`, `14px semibold`, `background: t.accent`, `color: #fff`.

---

## 2. Tela de Análise da IA — Criação da Equipe

### Container Principal
* **Arredondamento (`border-radius`):** `16px`
* **Overflow:** `hidden`
* **Borda:** `1px solid t.border`
* **Altura Mínima:** `min-height: 600px`
* **Background:** `t.surface`

---

### Header da Tela
* **Espaçamento (`padding`):** `px-8 py-5`
* **Estilo:** `border-bottom: 1px solid t.border`, `flex items-center justify-between`.
* **Lado Esquerdo:**
  * Botão de voltar `"←"` (`28×28`, `border-radius: 8px`, `background: t.chipBg`, borda com chevron SVG `14×14 t.textSub`).
  * Ao lado: Título `"Criação da equipe"` (`14px semibold t.text`) + Subtítulo `"Análise de IA · N vagas sugeridas"` (`12px mono t.textMuted`).
* **Lado Direito (Ações):**
  * Botão `"Editar equipe"`: `px-4 py-2`, `border-radius: 8px`, `14px font-medium`, ícone de lápis SVG `13×13`.
    * *Inativo:* `background: t.chipBg`, `color: t.textSub`, com borda.
    * *Ativo:* `background: rgba(accent, 0.10)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.30)`.
  * Botão `"Confirmar equipe"`: `px-4 py-2`, `border-radius: 8px`, `14px semibold`, `background: t.accent`, `color: #fff`.

---

### Layout do Corpo (Body Split 50/50)
* **Estrutura:** `flex`, `min-height: 520px`.
* **Divisão:** Duas colunas iguais com `50%` de largura cada.

---

### Painel Esquerdo — Documento de Análise da IA
* **Dimensões:** `width: 50%`, `border-right: 1px solid t.border`, `overflow-y: auto`.

#### Toolbar Sticky Superior
* **Posicionamento:** `sticky top-0 z-10`
* **Espaçamento & Estilo:** `px-6 py-3`, `background: t.surfaceAlt`, `border-bottom: 1px solid t.border`, `flex items-center gap-2`.
* **Elementos:**
  * Ícone PDF: Container `20×20`, `border-radius: 4px`, `background: rgba(accent, 0.12)` com SVG de documento `t.accent` (`11×11`).
  * Nome do Arquivo: `12px mono t.textSub`.
  * Badge `"IA"`: `ml-auto`, `10px mono`, `background: rgba(accent, 0.10)`, `color: t.accent`, `px-1.5 py-0.5`, `border-radius: 4px`.

#### Conteúdo do Documento
* **Container:** `px-8 py-7 flex flex-col gap-7`
* **Cabeçalho:**
  * Linha Meta: `"Análise gerada por IA · PwC Brasil · DD/MM/AAAA"` — `10px mono uppercase t.textMuted`, `mb-2`.
  * Título: `"Análise de Viabilidade e Composição de Equipe"` — `18px semibold leading-snug t.text`.
  * Subtítulo: `"Baseado no documento de descrição de projeto enviado"` — `14px t.textMuted`.
  * Tags: Chips das senioridades selecionadas (`11px mono`, `background: rgba(accent, 0.08)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.2)`, `border-radius: 4px`, `px-2 py-0.5`) + Chip de quantidade de vagas (`t.chipBg`, `t.textSub`, com borda).
  * Separador: `border-bottom: 1px solid t.border pb-5`.

* **6 Seções do Documento (Padrão Unificado):**
  * **Linha de Cabeçalho da Seção:** `flex items-center gap-2`
    * Número sequencial (`"01"` até `"06"`): `10px mono t.textMuted`.
    * Linha divisora: `h-px flex-1 t.border`.
    * Título da seção: `11px mono semibold uppercase letter-spacing: wider t.accent`.
  * **Corpo do Texto:** `14px leading-relaxed t.textSub`, `padding-left: 20px`, `whitespace-pre-line` (respeitando quebras de linha).
  * **Lista das Seções:**
    1. **Resumo Executivo:** Descrição geral do projeto e nível de complexidade.
    2. **Tecnologias Identificadas:** Stack técnica inferida a partir do documento.
    3. **Complexidade Estimada:** Nível de complexidade (Alta/Média/Baixa) e estimativa de prazo.
    4. **Perfil de Equipe Recomendado:** Disciplinas e competências necessárias identificadas.
    5. **Riscos Identificados:** Lista numerada de riscos (`①`, `②`, `③`, `④`).
    6. **Pontuação de Confiança da Análise:** Percentual de confiança e grau de completude.

* **Rodapé do Documento:**
  * Estilo: `border-top: 1px solid t.border pt-4 text-center`.
  * Texto: `"Documento gerado automaticamente · Sujeito à revisão humana"` — `10px mono t.textMuted`.

---

### Painel Direito — Equipe Sugerida
* **Dimensões:** `width: 50%`, `overflow-y: auto`.

#### Toolbar Sticky Superior
* **Posicionamento:** `sticky top-0 z-10`
* **Espaçamento & Estilo:** `px-6 py-3`, `background: t.surfaceAlt`, `border-bottom: 1px solid t.border`, `flex items-center justify-between`.
* **Elementos:**
  * Label: `"Equipe sugerida pela IA"` — `12px mono semibold t.textSub`.
  * Badge: `"N vagas"` — `12px mono`, `background: rgba(accent, 0.10)`, `color: t.accent`, `border: 1px solid rgba(accent, 0.20)`, `border-radius: full`, `px-2 py-0.5`.

#### Banner Informativo
* **Espaçamento:** `px-6 pt-5 pb-1`
* **Card:** `px-4 py-3.5`, `border-radius: 12px`, `background: t.surfaceAlt`, `border: 1px solid t.border`, `flex gap-3`.
  * Ícone Info: SVG `14×14 t.accent` (círculo com `"i"`), `flex-shrink-0 mt-0.5`.
  * Texto: `"Esta composição foi gerada automaticamente com base na análise do documento de descrição do projeto e nas preferências de senioridade informadas. Revise as sugestões antes de confirmar ou use Editar equipe para ajustar manualmente."` (`12px leading-relaxed t.textSub`, com o trecho `"Editar equipe"` em `color: t.text bold`).

#### Lista de Vagas
* **Container:** `px-6 py-4 flex flex-col gap-2`
* **Estrutura dos Cards de Vaga:**
  * **Container:** `border-radius: 12px overflow-hidden`.
  * **Borda:**
    * *Sem funcionário atribuído:* `1.5px solid t.border`.
    * *Com funcionário atribuído:* `1.5px solid rgba(accent, 0.28)`.
  * **Row Principal (`flex items-center gap-3 px-4 py-3 cursor-pointer`):**
    1. **Número:** `"01"`–`"NN"` em `10px mono t.textMuted`, largura fixa de `20px` centralizado.
    2. **Avatar (`32×32` círculo):**
       * *Vazio:* exibe `"?"` (`t.textMuted`, `background: t.chipBg`, `border: 1px dashed t.border`).
       * *Preenchido:* exibe as iniciais do funcionário (`t.accent`, `background: rgba(accent, 0.18)`, `border: 1px solid rgba(accent, 0.25)`).
    3. **Conteúdo Central:**
       * Cargo sugerido: `14px semibold t.text` (`flex-1`).
       * Detalhes (Abaixo): `"Senioridade · Departamento"` (`12px t.textMuted`). Se atribuído, concatena `" · Nome do funcionário"` em `t.accent`.
    4. **Badges e Indicadores (Direita):**
       * Badge de disponibilidade colorida (`10px mono`, `border-radius: 4px`, `px-1.5 py-0.5`) exibido quando atribuído.
       * Chevron SVG `12×12 t.textMuted` com animação de rotação (`rotate 180°` quando expandido no modo de edição).

#### Dropdown de Atribuição (Modo Edição com Slot Expandido)
* **Estrutura:** `border-top: 1px solid t.border`, `background: t.surface`.
* **Item de Funcionário:** `flex items-center gap-3 w-full px-4 py-2.5`, efeito hover `rgba(accent, 0.07)`, `border-bottom: 1px solid t.border`.
  * Avatar `28×28` + Nome (`14px t.text`) + Cargo (`12px t.textMuted`) + Disponibilidade (`10px mono`).
* **Ação:** Ao selecionar um funcionário, fecha o dropdown, atribui o profissional e atualiza dinamicamente o card da vaga.

#### Regras de Cores para Disponibilidade
* **$\ge$ 60%:** `#1e7a45` (Verde)
* **30% – 59%:** `#DB4E18` (Laranja)
* **< 30%:** `#AD1B02` (Vermelho)
