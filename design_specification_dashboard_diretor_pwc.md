# Design Specification — Dashboard Diretor de Projetos · PwC Brasil

## 1. Visão geral

Este documento especifica o sistema visual e os padrões de interface do **Dashboard de Diretor de Projetos da PwC Brasil**.

A especificação define:

- fundação tipográfica;
- tokens de cores;
- temas claro e escuro;
- layout global;
- header;
- KPI Cards;
- tabs;
- tabelas;
- badges de status;
- barras de progresso;
- avatares;
- drawers;
- dropdowns;
- formulário de criação de projeto;
- tela de criação e edição da equipe;
- análise visual do documento por IA;
- componentes de seleção de funcionários.

O objetivo é garantir consistência visual, hierarquia de informação e comportamento uniforme em toda a aplicação.

---

# 2. Fundação tipográfica

## 2.1 Fonte principal

A fonte principal da aplicação é:

**DM Sans**

Pesos utilizados:

- 300 — Light
- 400 — Regular
- 500 — Medium
- 600 — Semibold
- 700 — Bold

A DM Sans deve ser utilizada para:

- textos gerais;
- títulos;
- subtítulos;
- botões;
- informações de interface;
- descrições;
- conteúdo dos componentes.

---

## 2.2 Fonte monoespaçada

A fonte mono é:

**DM Mono**

Pesos utilizados:

- 400 — Regular
- 500 — Medium

A DM Mono deve ser utilizada principalmente para:

- dados numéricos;
- labels;
- informações técnicas;
- badges;
- valores destacados;
- elementos que precisam de aparência de dados/telemetria.

---

# 3. Escala tipográfica

## Corpo

Tamanho base:

`14px`

## Labels

Labels devem utilizar:

- `11px`;
- DM Mono;
- uppercase;
- tracking `0.08em`.

## Títulos de seção

Tamanho:

`13px` a `16px`

Peso:

`600` / semibold.

## Dados numéricos grandes

Tamanho:

`26px` a `36px`

Fonte:

DM Mono.

---

# 4. Letter spacing e line-height

## Labels

Tracking:

`0.08em`

## Badges

Utilizar:

`tracking-wide`

## Texto corrido

Utilizar:

`leading-relaxed`

Equivalente aproximado:

`1.625`

## Títulos

Utilizar:

`leading-snug`

---

# 5. Anti-aliasing

O `body` deve utilizar:

```css
-webkit-font-smoothing: antialiased;
```

O objetivo é melhorar a renderização e legibilidade das fontes.

---

# 6. Sistema de tokens de cor

A aplicação deve utilizar um sistema centralizado de tokens para permitir alternância entre tema claro e escuro.

Existem dois conjuntos:

- **Tema Claro**
- **Tema Escuro**

Os componentes não devem depender diretamente de cores hardcoded quando uma variável de token equivalente existir.

---

# 7. Tokens — Tema Claro

| Token | Valor | Uso |
|---|---|---|
| `bg` | `#dedad5` | Fundo da página |
| `surface` | `#e8e4de` | Cards, tabelas e painéis |
| `surfaceAlt` | `#dedad5` | Fundos alternativos dentro de cards |
| `panel` | `#e8e4de` | Painéis |
| `panelHover` | `#f0ebe3` | Hover de linhas de tabela |
| `border` | `#c8c2ba` | Bordas padrão |
| `borderStrong` | `#b0a89e` | Bordas de destaque |
| `text` | `#1a1a1a` | Texto principal |
| `textSub` | `#5a554f` | Texto secundário |
| `textMuted` | `#8a8078` | Texto terciário e placeholders |
| `accent` | `#D04A02` | Laranja PwC primário |
| `accentBg` | `rgba(208,74,2,0.10)` | Fundo de elementos accent |
| `accentBorder` | `rgba(208,74,2,0.32)` | Bordas accent |
| `rowEven` | `#e8e4de` | Linhas pares |
| `rowOdd` | `#e2ddd7` | Linhas ímpares |
| `headerBg` | `#dedad5` | Cabeçalhos |
| `inputBg` | `#e8e4de` | Inputs |
| `chipBg` | `#d4cfc8` | Chips e controles |
| `sortActiveBg` | `#cdc7bf` | Ordenação ativa |
| `overlay` | `rgba(26,26,26,0.45)` | Overlay de drawers |
| `shadow` | `0 24px 60px rgba(26,26,26,0.18)` | Sombras |

---

# 8. Tokens — Tema Escuro

| Token | Valor | Uso |
|---|---|---|
| `bg` | `#111111` | Fundo da página |
| `surface` | `#1a1a1a` | Cards, tabelas e painéis |
| `surfaceAlt` | `#141414` | Fundos alternativos |
| `panel` | `#1a1a1a` | Painéis |
| `panelHover` | `#222222` | Hover de linhas |
| `border` | `#2a2a2a` | Bordas padrão |
| `borderStrong` | `#383838` | Bordas de destaque |
| `text` | `#f0ede8` | Texto principal |
| `textSub` | `#a09890` | Texto secundário |
| `textMuted` | `#6a6058` | Texto terciário |
| `accent` | `#E8622A` | Accent do tema escuro |
| `accentBg` | `rgba(232,98,42,0.12)` | Fundo accent |
| `accentBorder` | `rgba(232,98,42,0.35)` | Borda accent |
| `rowEven` | `#1a1a1a` | Linhas pares |
| `rowOdd` | `#171717` | Linhas ímpares |
| `headerBg` | `#141414` | Cabeçalhos |
| `inputBg` | `#1f1f1f` | Inputs |
| `chipBg` | `#252525` | Chips |
| `sortActiveBg` | `#2e2e2e` | Ordenação ativa |
| `overlay` | `rgba(0,0,0,0.60)` | Overlay |
| `shadow` | `0 24px 60px rgba(0,0,0,0.50)` | Sombras |

---

# 9. Layout global

A raiz da aplicação deve possuir:

- `min-height: 100vh`;
- background baseado em `t.bg`;
- font-family `DM Sans`.

## Transição de tema

O wrapper raiz deve utilizar:

```text
transition-colors duration-300
```

A mudança entre os temas deve ocorrer de forma suave.

---

# 10. Scrollbar

A scrollbar deve ser visualmente fina.

Utilizar:

```css
scrollbar-width: thin;
```

No tema claro, o thumb deve utilizar aproximadamente:

`#c9c4bc`

---

# 11. Header

O header deve ser fixo visualmente durante a navegação.

## Posicionamento

```text
sticky
top-0
z-30
```

## Espaçamento

Utilizar:

```text
px-8
py-4
```

## Background

O fundo deve ser baseado em:

`t.bg + 'eb'`

Representando aproximadamente **85% de opacidade**.

Deve utilizar:

```css
backdrop-filter: blur(12px);
```

## Borda

```text
border-bottom: 1px solid t.border
```

---

# 12. Logo Badge

O logo/inicial deve ser apresentado em um badge.

Dimensões:

`32 × 32px`

## Estilo

- border-radius: `8px`;
- background: `t.accent`;
- texto branco;
- peso bold;
- tamanho `14px`.

Conteúdo:

`D`

---

# 13. Identificação do usuário

O header deve apresentar:

### Título

`14px`

Peso:

semibold.

Cor:

`t.text`

### Subtítulo

`12px`

Fonte:

DM Mono.

Cor:

`t.textMuted`

---

# 14. Botão "+ Criar projeto"

O botão deve utilizar:

```text
px-3 py-1.5
```

Border-radius:

`8px`

Fonte:

`12px`

Peso:

`font-medium`

Deve possuir um ícone SVG `+` com:

`13 × 13px`

## Estado ativo

Quando a aba de criação estiver aberta:

- background: `accentBg`;
- texto: `t.accent`;
- border: `accentBorder`.

## Estado inativo

Utilizar:

- background: `chipBg`;
- texto: `textSub`;
- border.

---

# 15. ThemeToggle

O botão de alternância de tema deve possuir o mesmo formato visual do botão de criação.

Deve utilizar:

- ícone SVG de sol/lua;
- transição suave;
- background e bordas consistentes com o estado atual.

---

# 16. Avatar RD

O avatar do Diretor deve possuir:

- `32 × 32px`;
- formato circular;
- background: `accentBg`;
- texto: `t.accent`;
- tamanho `12px`;
- peso semibold;
- border: `1px solid accentBorder`.

Conteúdo:

`RD`

---

# 17. KPI Cards

Os indicadores principais devem utilizar uma grade de quatro colunas.

## Grid

```text
grid-cols-4
gap-4
mb-8
```

## Card

Cada card deve possuir:

- border-radius: `16px`;
- padding: `20px`;
- background: `t.surface`;
- border: `1px solid t.border`.

---

# 18. Label dos KPI Cards

Características:

- `11px`;
- DM Mono;
- uppercase;
- `t.textMuted`.

---

# 19. Valor dos KPI Cards

Características:

- `28px`;
- semibold;
- `t.text`.

Quando necessário, o valor pode utilizar uma cor accent personalizada.

---

# 20. Subtexto dos KPI Cards

Características:

- `12px`;
- `t.textMuted`;
- margin-top: `4px`.

---

# 21. Borda accent dos KPI Cards

Os cards devem possuir uma borda esquerda de:

`3px`

A cor deve representar o contexto do indicador.

Pode utilizar:

- verde;
- vermelho;
- laranja.

---

# 22. Tabs de navegação

O container das tabs deve utilizar:

```text
flex
gap-1
border-bottom: 1px solid t.border
mb-6
```

## Tab button

Características:

- `px-5`;
- `py-3`;
- `14px`;
- `font-medium`.

### Tab ativa

Cor:

`t.text`

### Tab inativa

Cor:

`t.textMuted`

---

# 23. Indicador de tab ativa

A tab ativa deve possuir um indicador inferior.

Características:

- posição absoluta;
- bottom: `0`;
- left: `0`;
- right: `0`;
- height: `0.5`;
- border-radius: full;
- background: `t.accent`.

---

# 24. Tabelas — padrão geral

Todas as tabelas principais devem seguir o mesmo padrão visual.

## Wrapper

Características:

- border-radius: `12px`;
- overflow: hidden;
- border: `1px solid t.border`.

## Table

Utilizar:

```text
w-full
text-sm
```

---

# 25. Cabeçalho da tabela

O `<thead>` deve possuir:

```text
background: t.headerBg
```

Os `<th>` devem possuir:

- `px-4`;
- `py-3`;
- `11px`;
- DM Mono;
- uppercase;
- `t.textSub`;
- border-bottom: `1px solid t.border`;
- alinhamento à esquerda.

---

# 26. Linhas da tabela

As linhas devem utilizar zebraing:

- `rowEven`;
- `rowOdd`.

Também devem possuir:

```text
border-bottom: 1px solid t.border
cursor: pointer
```

Ao passar o mouse:

```text
onMouseEnter → panelHover
```

---

# 27. Células da tabela

As células devem utilizar:

```text
px-4 py-3.5
```

## Células numéricas

Utilizar:

- DM Mono;
- `12px`.

---

# 28. StatusBadge

O componente StatusBadge representa visualmente o estado de um projeto.

## Formato

Utilizar:

```text
inline-flex
items-center
gap-1.5
px-2.5
py-1
```

Border-radius:

`4px`

Fonte:

- `12px`;
- DM Mono;
- font-medium;
- tracking-wide.

---

# 29. Indicador do StatusBadge

O badge deve possuir um ponto circular:

`6 × 6px`

O ponto deve utilizar a mesma cor do texto do badge.

---

# 30. Cores dos status

| Status | Cor do texto | Background |
|---|---|---|
| Em dia | `#1e7a45` | `rgba(30,122,69,0.10)` |
| Em risco | `#DB4E18` | `rgba(219,78,24,0.10)` |
| Atrasado | `#AD1B02` | `rgba(173,27,2,0.10)` |
| Concluído | `#5a5a5a` | `rgba(90,90,90,0.10)` |

---

# 31. ProgressBar

A barra de progresso deve ser composta por:

1. track;
2. fill;
3. label percentual.

## Track

Características:

- `flex-1`;
- altura `6px`;
- border-radius full;
- background `rgba(128,128,128,0.15)`.

## Fill

Características:

- mesma cor do status;
- `transition-all`.

## Label

Características:

- `12px`;
- DM Mono;
- largura `32px`;
- text-align right;
- cor do status.

---

# 32. Avatar de funcionário

O avatar deve possuir:

`28 × 28px`

Formato:

circular.

## Background

Pode utilizar:

- `accentBg`;
- ou uma cor derivada pelo índice do funcionário.

## Texto

- iniciais;
- `11px`;
- bold;
- `t.accent`.

---

# 33. Avatares sobrepostos

Quando vários funcionários forem exibidos juntos, os avatares subsequentes devem utilizar:

```text
margin-left: -8px
```

Também devem possuir:

```text
border: 2px solid t.surface
```

Isso cria o efeito visual de grupo de equipe.

---

# 34. Drawers

Existem dois principais tipos de drawer:

- `ProjectDetail`;
- `EmployeeDetail`.

---

# 35. Overlay do Drawer

O overlay deve ser:

```text
fixed
inset-0
z-40
```

Background:

`t.overlay`

Ao clicar no overlay, o drawer deve ser fechado.

---

# 36. Painel do Drawer

O painel deve ser:

```text
fixed
right-0
top-0
h-full
z-50
```

Largura:

`420px`

Background:

`t.surface`

Box-shadow:

`t.shadow`

---

# 37. Animação do Drawer

O drawer deve possuir animação de entrada:

**slide-in pela direita**

A abertura e fechamento devem ocorrer de maneira suave.

---

# 38. Header do Drawer

O header deve possuir:

```text
px-6 py-5
border-bottom: 1px solid t.border
```

## Título

- `16px`;
- semibold.

## Botão fechar

Características:

- símbolo `×`;
- `w-8 h-8`;
- `rounded-lg`;
- background `chipBg`.

---

# 39. Conteúdo do Drawer

O conteúdo deve utilizar:

```text
px-6 py-5
flex
flex-col
gap-6
overflow-y-auto
```

---

# 40. Seções internas do Drawer

Cada seção deve apresentar:

### Label

- `11px`;
- DM Mono;
- uppercase;
- `textMuted`.

### Valor

- `14px`;
- `t.text`.

---

# 41. Dropdowns customizados

Os dropdowns personalizados serão utilizados principalmente nas áreas:

- Equipe;
- Ferramentas.

---

# 42. Trigger do Dropdown

Características:

- `px-3 py-2`;
- border-radius: `8px`;
- border: `1px solid t.border`;
- background: `t.surface`;
- `13px`;
- `font-medium`.

Deve possuir ícone de chevron.

O chevron deve possuir animação durante abertura/fechamento.

---

# 43. Menu do Dropdown

O menu deve utilizar:

```text
position: absolute
top: calc(100% + 4px)
min-width: 200px
```

Características:

- border-radius: `10px`;
- border: `1px solid t.border`;
- background: `t.surface`;
- box-shadow: `t.shadow`;
- `z-50`.

---

# 44. Item de menu

Cada item deve utilizar:

```text
px-3 py-2.5
```

Ao passar o mouse:

```text
background: panelHover
```

Fonte:

`13px`

Cada item pode conter:

- ícone da categoria;
- label;
- badge de contagem;
- checkmark quando selecionado.

---

# 45. Fechamento de dropdown

O dropdown deve fechar quando ocorrer um clique fora do componente.

A implementação deve utilizar:

```text
useEffect
```

com um:

```text
mousedown listener
```

registrado no `document`.

---

# 46. Formulário de criação de projeto

O formulário deve utilizar um único card centralizado.

## Card

Características:

- border-radius: `16px`;
- overflow: hidden;
- background: `t.surface`;
- border: `1px solid t.border`;
- max-width: `672px`;
- centralizado.

---

# 47. Header do formulário

Utilizar:

```text
px-8 py-6
border-bottom: 1px solid t.border
```

Deve possuir:

- título `16px` semibold;
- subtítulo `12px` mono.

---

# 48. Separadores do formulário

Os blocos internos devem ser separados por um divisor de:

```text
height: 1px
background: t.border
```

---

# 49. Labels de seção

As labels das seções devem utilizar:

- `11px`;
- DM Mono;
- uppercase;
- `tracking-widest`;
- semibold;
- `t.accent`.

---

# 50. Inputs

Os campos de entrada devem possuir:

```text
background: t.inputBg
border: 1px solid t.border
border-radius: 10px
padding: 10px 14px
font-size: 14px
outline: none
```

---

# 51. Campo de orçamento

O campo de orçamento deve possuir o prefixo:

`R$`

O prefixo deve estar em posição absoluta:

```text
left: 14px
```

O input deve possuir:

```text
padding-left: 40px
```

Abaixo do input deve aparecer uma prévia formatada do valor.

A prévia deve utilizar:

- `12px`;
- DM Mono;
- `t.textMuted`.

---

# 52. Slider de quantidade de profissionais

O slider deve possuir CSS customizado.

## Track

- altura: `4px`;
- cor: `t.border`.

## Thumb

- `20px`;
- círculo;
- cor `t.accent`;
- border: `3px solid t.surface`;
- box-shadow:

```text
0 0 0 1.5px t.accent
```

---

# 53. Chips de senioridade

Os chips devem utilizar uma grade:

```text
3 × 2
```

Cada chip deve possuir:

```text
px-4 py-3
border-radius: 12px
```

Conteúdo:

- ícone de nível;
- label;
- checkmark SVG.

## Ícone

Características:

- `10px`;
- DM Mono;
- opacidade `60%`.

## Estado selecionado

Quando selecionado:

- background: `accentBg`;
- texto: `t.accent`;
- border: `1.5px solid accentBorder`.

---

# 54. Drop Zone de PDF

A área de upload deve possuir:

```text
border: 2px dashed
padding: 36px
border-radius: 12px
```

Ela possui três estados.

## Idle

- background: `t.surfaceAlt`;
- border: `t.border`.

## Dragging

- background: `accentBg`;
- border: `t.accent`.

## Filled

- background: `rgba(accent,0.04)`;
- border: `rgba(accent,0.4)`.

---

# 55. Footer do formulário

O footer deve utilizar:

```text
px-8 py-5
border-top: 1px solid t.border
background: t.surfaceAlt
```

## Botão limpar

Posicionado à esquerda.

Características:

- `14px`;
- `t.textMuted`.

## Botão submit

Posicionado à direita.

Características:

- background: `t.accent`;
- texto branco;
- `px-6`;
- `py-2.5`;
- border-radius: `8px`.

---

# 56. Tela Split — Criação de equipe

A tela de criação da equipe deve utilizar um container dividido em dois painéis.

## Container

Características:

- border-radius: `16px`;
- overflow hidden;
- border: `1px solid t.border`;
- min-height: `600px`.

---

# 57. Header da tela split

O header deve utilizar:

```text
px-8 py-5
border-bottom: 1px solid t.border
```

Deve possuir:

- botão voltar;
- título;
- subtítulo;
- botão Editar;
- botão Confirmar.

---

# 58. Botão voltar

Dimensão:

`28 × 28px`

Background:

`chipBg`

Deve possuir:

- chevron SVG;
- aparência compacta;
- feedback visual de interação.

---

# 59. Divisão dos painéis

O conteúdo deve utilizar:

```text
display: flex
```

com divisão:

`50% / 50%`

O painel esquerdo deve possuir:

```text
border-right: 1px solid t.border
```

---

# 60. Toolbar do PDF

A toolbar do documento deve utilizar:

```text
px-6 py-3
sticky top-0
z-10
background: t.surfaceAlt
```

Deve apresentar:

- ícone PDF;
- nome do arquivo;
- badge `IA`.

## Badge IA

Características:

- `10px`;
- DM Mono;
- texto `t.accent`;
- background `accentBg`.

---

# 61. Documento gerado pela IA

O conteúdo do documento deve utilizar:

```text
px-8 py-7
flex
flex-col
gap-7
```

Cada seção deve possuir:

- numeração;
- linha horizontal;
- título;
- corpo de texto.

## Numeração

Características:

- `10px`;
- DM Mono;
- `t.textMuted`.

## Título

Características:

- DM Mono;
- uppercase;
- `t.accent`;
- alinhado à direita.

## Corpo

Características:

- `14px`;
- `leading-relaxed`;
- `t.textSub`.

---

# 62. Vagas da equipe

Cada vaga deve ser representada por um card.

## Card

Características:

- border-radius: `12px`;
- overflow hidden.

## Estado normal

Utilizar borda padrão.

## Estado atribuído

Quando uma pessoa estiver atribuída à vaga, utilizar:

`accentBorder`

com aproximadamente:

`28%`

de intensidade.

---

# 63. Placeholder da vaga

Quando a vaga estiver vazia, utilizar:

- avatar com `?`;
- aparência tracejada.

Quando estiver atribuída, mostrar:

- avatar;
- iniciais do funcionário.

---

# 64. Dropdown de funcionário

No modo de edição, o dropdown deve possuir:

```text
border-top: 1px solid t.border
```

Cada funcionário deve ser apresentado utilizando:

```text
px-4 py-2.5
```

Informações:

- avatar `28px`;
- nome;
- cargo;
- disponibilidade.

A disponibilidade deve utilizar indicação colorida.

---

# 65. Banner informativo

O banner da equipe deve possuir:

- ícone SVG de informação;
- `t.accent`;
- texto `12px`;
- `t.textSub`;
- `leading-relaxed`;
- background `t.surfaceAlt`;
- border `t.border`;
- border-radius `12px`.

O objetivo do banner é explicar que a composição da equipe foi gerada automaticamente com base na análise do documento.

---

# 66. Princípios de consistência visual

Toda a aplicação deve manter os seguintes princípios:

1. **Consistência tipográfica**  
   DM Sans para interface e DM Mono para dados, labels e informações técnicas.

2. **Uso centralizado de tokens**  
   Cores, bordas, superfícies, sombras e textos devem respeitar os tokens de tema.

3. **Hierarquia visual clara**  
   Valores importantes devem possuir maior tamanho e contraste.

4. **Feedback de interação**  
   Hover, seleção, abertura de drawers, dropdowns e mudança de tema devem possuir transições suaves.

5. **Identidade PwC**  
   O laranja deve ser utilizado como elemento de destaque sem dominar toda a interface.

6. **Tema claro e escuro**  
   Todos os componentes devem adaptar suas cores aos tokens do tema atual.

7. **Interface orientada a dados**  
   Valores numéricos e informações de acompanhamento devem utilizar DM Mono sempre que apropriado.

8. **Componentização**  
   Elementos repetidos como badges, avatares, progress bars, drawers, dropdowns e cards devem possuir comportamento e aparência consistentes.

---

# 67. Resumo dos principais componentes visuais

| Componente | Característica principal |
|---|---|
| Header | Sticky, blur, identidade PwC |
| Logo | Badge `D` 32×32 |
| Avatar RD | Círculo 32×32 |
| KPI Card | 16px radius, accent border |
| Tab | Indicador inferior accent |
| Tabela | Zebraing + hover |
| StatusBadge | Dot + cor por status |
| ProgressBar | Track + fill + percentual |
| Avatar funcionário | 28×28 |
| Drawer | 420px, slide-in |
| Dropdown | Menu customizado com shadow |
| Formulário | Card 672px centralizado |
| Slider | Thumb accent customizado |
| Senioridade | Grid 3×2 |
| Drop Zone | Dashed border + estados |
| Tela Split | 50/50 |
| Documento IA | Estrutura editorial |
| Vaga | Card com estado vazio/atribuído |
| Banner | SurfaceAlt + informação |

---

# 68. Resultado visual esperado

O dashboard deve apresentar uma estética **corporativa, sofisticada e orientada a dados**, combinando:

- bege quente no tema claro;
- quase preto no tema escuro;
- laranja PwC como accent;
- tipografia DM Sans;
- elementos de dados em DM Mono;
- cards com cantos arredondados;
- tabelas com zebraing;
- badges compactos;
- drawers laterais;
- controles customizados;
- transições suaves;
- hierarquia visual forte.

A especificação deve ser utilizada como referência para a implementação de todos os componentes visuais do Dashboard de Diretor de Projetos.
