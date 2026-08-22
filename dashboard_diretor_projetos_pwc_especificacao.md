# Dashboard de Diretor de Projetos — PwC Brasil

## 1. Visão geral

Este documento descreve integralmente a especificação do dashboard web destinado a um **Diretor de Projetos da PwC Brasil**.

A aplicação deve permitir acompanhar, em uma única interface, informações de:

- projetos;
- indicadores de desempenho;
- orçamento e gastos;
- prazos;
- equipes;
- funcionários;
- ferramentas utilizadas;
- criação de novos projetos;
- análise de documentos por IA;
- montagem e confirmação de equipes.

O dashboard deve possuir uma interface corporativa, responsiva e moderna, baseada na identidade visual da PwC, com suporte a **tema claro e escuro**.

---

## 2. Stack tecnológica

A aplicação deve ser construída utilizando:

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**

### Tipografia

- **DM Sans**: utilizada no corpo da aplicação e textos gerais.
- **DM Mono**: utilizada para dados, números e elementos que tenham aparência monoespaçada.

---

## 3. Identidade visual

A paleta principal deve ser baseada na identidade visual da PwC.

### Cores principais

| Uso | Cor |
|---|---|
| Laranja primário | `#D04A02` |
| Laranja escuro | `#DB4E18` |
| Vermelho | `#AD1B02` |

### Cores de status

| Status | Cor |
|---|---|
| Em dia | `#1e7a45` |
| Em risco | `#DB4E18` |
| Atrasado | `#AD1B02` |
| Concluído | `#5a5a5a` |

---

# 4. Estrutura geral da aplicação

A aplicação deve apresentar um **header fixo** no topo.

## 4.1 Header

O header deve conter:

1. Logo ou inicial **"D"**.
2. Nome do usuário:
   - **Rafael Drummond · Diretor de Projetos**
3. Botão:
   - **+ Criar projeto**
4. Botão de alternância entre:
   - tema claro;
   - tema escuro.

Abaixo do header devem aparecer:

1. quatro KPI Cards;
2. tabs de navegação.

---

# 5. KPI Cards

O dashboard principal deve possuir quatro cards de indicadores.

## 5.1 Projetos ativos

Exibir:

- total de projetos ativos;
- breakdown:
  - `X em dia`;
  - `Y em risco`.

Exemplo conceitual:

> Projetos ativos  
> 6  
> 4 em dia · 2 em risco

---

## 5.2 Progresso médio

Exibir a média percentual de conclusão considerando todos os projetos.

Exemplo:

> Progresso médio  
> 68%

---

## 5.3 Em risco / atrasados

Exibir:

- quantidade de projetos em risco ou atrasados;
- subtexto informando quantos projetos estão em dia.

Exemplo:

> Em risco / atrasados  
> 2  
> 4 em dia

---

## 5.4 Orçamento total

Exibir:

- soma dos orçamentos dos projetos;
- valor gasto;
- percentual utilizado.

Exemplo:

> Orçamento total  
> R$ 4,2M  
> R$ 2,1M gasto — 50% utilizado

---

# 6. Aba PROJETOS

A primeira aba principal da aplicação deve ser **PROJETOS**.

Ela deve apresentar uma tabela com todos os projetos.

## 6.1 Colunas da tabela

A tabela deve conter:

### Projeto

Exibir:

- nome do projeto;
- cliente;
- fase atual.

### Status

Exibir um badge visual com um dos seguintes estados:

- Em dia;
- Em risco;
- Atrasado;
- Concluído.

### Orçamento

Exibir:

- valor do orçamento;
- percentual utilizado.

### Prazo

Exibir:

- data de deadline;
- quantidade de dias restantes;

ou, quando ultrapassado:

- quantidade de dias atrasado.

### Equipe

Exibir:

- avatares dos membros da equipe;
- preferencialmente utilizando as iniciais dos funcionários.

---

# 7. Busca e filtros de projetos

Acima da tabela deve existir uma área de filtros.

## Busca

Campo para pesquisar projetos pelo nome.

## Filtro de status

Utilizar botões para:

- Todos;
- Em dia;
- Em risco;
- Atrasado;
- Concluído.

Os filtros devem atualizar a tabela dinamicamente.

---

# 8. Drawer de detalhes do projeto

Ao clicar em uma linha da tabela de projetos, deve ser aberto um **painel lateral (drawer)**.

O drawer deve apresentar detalhes completos do projeto.

Informações mínimas:

- nome;
- cliente;
- status;
- progresso;
- orçamento;
- valor gasto;
- percentual utilizado;
- prazo;
- quantidade de dias restantes ou atrasados;
- fase;
- equipe alocada.

## Equipe do projeto

Deve existir uma lista de membros contendo:

- nome;
- avatar;
- papel/cargo;
- disponibilidade.

---

# 9. Aba EQUIPE

A segunda aba principal deve ser **EQUIPE**.

## 9.1 Filtro por projeto

No topo da aba devem existir botões:

- Todos;
- um botão para cada projeto existente.

Ao selecionar um projeto, deve ser exibido um **banner de resumo**.

O banner deve mostrar:

- nome do projeto;
- status;
- progresso;
- prazo.

---

# 10. Tabela de funcionários

A tabela de equipe deve possuir as seguintes colunas:

| Coluna | Conteúdo |
|---|---|
| Nome | Avatar + nome + localização |
| Cargo | Cargo do funcionário |
| Departamento | Departamento |
| Projetos ativos | Quantidade de projetos em que atua |
| Data de ingresso | Data de entrada |

## Busca

A busca deve estar integrada ao cabeçalho da tabela.

Ela deve aparecer como a **primeira linha acima das colunas** e ocupar a largura total disponível.

---

# 11. Drawer de funcionário

Ao clicar em um funcionário, abrir um drawer lateral.

O drawer deve apresentar:

- nome;
- avatar;
- cargo;
- departamento;
- localização;
- data de ingresso;
- projeto atual;
- disponibilidade.

---

# 12. Aba FERRAMENTAS

A terceira aba principal deve ser **FERRAMENTAS**.

No topo devem existir dois KPI Cards.

## 12.1 Ferramentas em uso

Mostrar:

- total de ferramentas únicas utilizadas nos projetos.

## 12.2 Mais adotada

Mostrar:

- ferramenta com maior índice de adoção.

---

# 13. Categorias de ferramentas

A aplicação deve trabalhar com cinco categorias:

1. Desenvolvimento
2. Gestão de Projeto
3. Infraestrutura e DevOps
4. Dados e Análise
5. Segurança

No canto superior direito da tabela deve existir um **dropdown customizado** para seleção da categoria.

A aplicação deve exibir uma tabela por vez, correspondente à categoria selecionada.

As ferramentas devem estar agrupadas por **subcategoria**.

---

# 14. Tabela de ferramentas

Cada linha deve conter:

- nome da ferramenta;
- subcategoria;
- indicador de adoção por projeto.

O indicador de adoção deve utilizar:

- barras; ou
- bolinhas.

A escala deve ser:

- `0` = não utilizada;
- `1` = baixa adoção;
- `2` = média adoção;
- `3` = alta adoção.

O indicador deve permitir identificar visualmente a adoção da ferramenta em cada projeto.

---

# 15. Criação de projeto

O botão **+ CRIAR PROJETO**, localizado no header, deve abrir o fluxo de criação de um novo projeto.

Esse fluxo possui **dois estágios principais**:

1. formulário;
2. criação da equipe.

---

# 16. Estágio 1 — Formulário

O primeiro estágio deve apresentar um **card único**.

O card deve ser dividido em três blocos, separados visualmente por divisores.

## 16.1 Bloco de orçamento

Campo numérico para informar o orçamento.

O campo deve possuir:

- prefixo `R$`;
- preview formatado do valor informado.

---

# 17. Composição da equipe

O usuário deve definir a quantidade e o perfil da equipe.

## Quantidade

Utilizar um slider de:

- 1 a 100 profissionais.

Também deve existir um campo manual que permita informar valores **acima de 100**.

## Senioridade

Exibir chips em uma grade **3×2**:

1. Estagiário
2. Júnior
3. Pleno
4. Sênior
5. Especialista
6. Tech Lead

Cada chip deve possuir:

- ícone representando nível;
- nome da senioridade;
- checkmark quando selecionado.

O usuário pode selecionar as senioridades que deseja utilizar na composição.

---

# 18. Documento do projeto

O terceiro bloco deve possuir uma zona de **drag-and-drop** para upload de um documento PDF.

O objetivo é permitir que o documento seja analisado posteriormente pela IA.

A interface deve deixar claro que o arquivo esperado é um **PDF do projeto**.

---

# 19. Footer do formulário

Na parte inferior do card devem existir dois botões:

### Esquerda

**Limpar campos**

Deve limpar os valores preenchidos.

### Direita

**Analisar e montar equipe →**

Deve avançar para o Estágio 2.

Esse botão deve utilizar a cor accent da aplicação.

---

# 20. Estágio 2 — Criação da equipe

O segundo estágio deve utilizar uma tela dividida em aproximadamente **50/50**.

### Painel esquerdo

Análise de IA.

### Painel direito

Equipe sugerida.

---

# 21. Painel esquerdo — Análise de IA

O painel deve apresentar uma toolbar contendo:

- ícone de PDF;
- nome do arquivo enviado;
- badge `IA`.

Abaixo deve existir um documento fictício gerado pela IA.

O documento deve possuir seis seções numeradas:

1. **Resumo Executivo**
2. **Tecnologias Identificadas**
3. **Complexidade Estimada**
4. **Perfil de Equipe Recomendado**
5. **Riscos Identificados**
6. **Pontuação de Confiança**

A interface deve simular visualmente uma análise de documento feita por inteligência artificial.

---

# 22. Tags da análise

A análise deve apresentar tags indicando:

- senioridades escolhidas;
- quantidade de profissionais.

Essas informações devem refletir as escolhas realizadas no formulário.

---

# 23. Painel direito — Equipe sugerida

O painel direito deve apresentar a equipe recomendada.

No topo deve existir um banner informativo com a mensagem:

> Esta composição foi gerada automaticamente com base na análise do documento...

Abaixo devem ser listadas **N vagas**, onde:

> N = quantidade de profissionais definida no formulário.

Cada vaga deve apresentar:

- número da vaga;
- cargo sugerido;
- senioridade;
- departamento.

Os cargos são fictícios, porém devem ser plausíveis.

---

# 24. Distribuição das vagas

Os cargos devem ser distribuídos utilizando um sistema de **round-robin** entre as senioridades selecionadas.

Exemplo:

Se o usuário selecionar:

- Júnior;
- Pleno;
- Sênior;

a distribuição deve alternar:

1. Júnior
2. Pleno
3. Sênior
4. Júnior
5. Pleno
6. Sênior
7. Júnior
8. ...

Deve existir um **pool de títulos reais/plausíveis por nível de senioridade** para gerar os cargos.

---

# 25. Header da tela de criação da equipe

A tela split deve possuir um header com:

- botão **← Voltar**;
- título;
- subtítulo;
- botão **Editar equipe**;
- botão **Confirmar equipe**.

---

# 26. Modo Editar equipe

Ao clicar em **Editar equipe**, cada vaga deve poder ser expandida.

Ao expandir uma vaga, mostrar um dropdown contendo **todos os 15 funcionários reais** disponíveis nos dados mock.

Cada funcionário deve possuir uma indicação visual de disponibilidade.

## Disponibilidade

Utilizar cores:

- verde = alta disponibilidade;
- laranja = disponibilidade intermediária;
- vermelho = baixa disponibilidade.

Ao selecionar um funcionário:

1. o funcionário é atribuído à vaga;
2. o dropdown é fechado;
3. a vaga passa a mostrar o funcionário selecionado.

---

# 27. Confirmação da equipe

Ao clicar em **Confirmar equipe**, deve ser apresentada uma tela de sucesso.

A tela deve conter:

- ícone de check;
- mensagem:

> Equipe confirmada! X vagas alocadas ao novo projeto.

Também deve existir um botão:

**Voltar ao portfólio**

Esse botão deve levar o usuário novamente à visão principal dos projetos.

---

# 28. Dados mock

A aplicação deve funcionar inicialmente utilizando dados fictícios/mockados.

## 28.1 Projetos

Devem existir **6 projetos**.

Cada projeto deve possuir:

- `id`
- `nome`
- `cliente`
- `status`
- `progresso`
- `orcamento`
- `gasto`
- `deadline`
- `fase`
- `equipe`

O campo `equipe` deve ser um array contendo IDs de funcionários.

---

# 29. Funcionários

Devem existir **15 funcionários**.

Cada funcionário deve possuir:

- `id`
- `nome`
- `cargo`
- `departamento`
- `projectId`
- `disponibilidade`
- `data de ingresso`
- `localização`
- `avatar`

O avatar deve utilizar as **iniciais do funcionário**.

A disponibilidade deve ser representada em percentual.

---

# 30. Ferramentas

Devem existir aproximadamente **40 entradas de ferramentas**.

Cada entrada deve possuir:

- ferramenta;
- categoria;
- subcategoria;
- uso por projeto.

O uso por projeto deve ser um mapa:

```text
projectId → 0 | 1 | 2 | 3
```

Onde os valores representam o nível de adoção.

---

# 31. Sistema de temas

A aplicação deve possuir dois objetos de tokens:

- `LIGHT`
- `DARK`

Cada tema deve possuir aproximadamente 20 tokens.

Tokens previstos:

```text
bg
surface
surfaceAlt
panel
panelHover
border
borderStrong
text
textSub
textMuted
accent
accentBg
accentBorder
rowEven
rowOdd
headerBg
overlay
shadow
inputBg
chipBg
sortActiveBg
```

---

# 32. Tema claro

O tema claro deve utilizar:

### Fundo

`#dedad5`

Trata-se de um bege quente.

### Accent

`#D04A02`

---

# 33. Tema escuro

O tema escuro deve utilizar:

### Fundo

`#111111`

Trata-se de um tom quase preto.

### Accent

`#E8622A`

---

# 34. Requisitos de interação

A aplicação deve ser interativa e não apenas visual.

As principais interações são:

- alternar tema claro/escuro;
- navegar entre as abas;
- pesquisar projetos;
- filtrar projetos por status;
- abrir drawer de projeto;
- filtrar funcionários por projeto;
- pesquisar funcionários;
- abrir drawer de funcionário;
- selecionar categoria de ferramentas;
- consultar adoção das ferramentas;
- abrir fluxo de criação de projeto;
- preencher orçamento;
- selecionar quantidade de profissionais;
- selecionar senioridades;
- fazer upload/seleção de PDF;
- limpar formulário;
- executar análise simulada de IA;
- visualizar equipe recomendada;
- editar vagas;
- selecionar funcionários;
- confirmar equipe;
- retornar ao portfólio.

---

# 35. Regras de negócio principais

## Projetos

- O progresso deve ser exibido em percentual.
- O orçamento deve permitir comparação entre valor total e gasto.
- O percentual utilizado deve ser calculado com base no gasto em relação ao orçamento.
- O prazo deve indicar dias restantes ou dias de atraso.
- O status deve possuir representação visual consistente.

## Equipe

- Um funcionário pode atuar em múltiplos projetos.
- A quantidade de projetos ativos deve ser calculada.
- A disponibilidade deve ser mostrada visualmente.
- A seleção de funcionários na criação de equipe deve utilizar os 15 funcionários mockados.

## Ferramentas

- O dashboard deve calcular o número de ferramentas únicas.
- Deve identificar a ferramenta com maior adoção.
- As ferramentas devem ser filtradas por categoria.
- A adoção deve ser exibida por projeto em escala de 0 a 3.

## Criação de projeto

- A quantidade de vagas deve corresponder à quantidade informada pelo usuário.
- As senioridades escolhidas devem influenciar a distribuição das vagas.
- A distribuição deve utilizar round-robin.
- A edição permite associar funcionários reais às vagas.
- A confirmação deve apresentar a quantidade de vagas alocadas.

---

# 36. Fluxo completo do usuário

O fluxo esperado é:

```text
Dashboard
   │
   ├── Projetos
   │     └── Abrir projeto
   │            └── Drawer de detalhes
   │
   ├── Equipe
   │     └── Filtrar por projeto
   │            └── Abrir funcionário
   │                   └── Drawer de detalhes
   │
   ├── Ferramentas
   │     └── Selecionar categoria
   │            └── Visualizar adoção
   │
   └── + Criar projeto
          │
          ├── Estágio 1
          │     ├── Orçamento
          │     ├── Quantidade
          │     ├── Senioridades
          │     └── PDF
          │
          ├── Estágio 2
          │     ├── Análise de IA
          │     ├── Equipe sugerida
          │     └── Editar equipe
          │
          └── Confirmar equipe
                 │
                 └── Tela de sucesso
                        │
                        └── Voltar ao portfólio
```

---

# 37. Resultado esperado

O resultado final deve ser um **dashboard executivo de gestão de projetos**, com aparência corporativa alinhada à PwC e foco em tomada de decisão.

A aplicação deve permitir que o Diretor de Projetos:

- acompanhe rapidamente a situação dos projetos;
- identifique riscos e atrasos;
- monitore orçamento e gastos;
- visualize a composição das equipes;
- consulte disponibilidade de profissionais;
- identifique ferramentas utilizadas;
- compare adoção tecnológica entre projetos;
- crie novos projetos;
- envie documentos para análise;
- visualize uma recomendação de equipe baseada em IA;
- ajuste manualmente a equipe recomendada;
- confirme a alocação de profissionais.

A interface deve priorizar **clareza, hierarquia visual, consistência, legibilidade e interação**, mantendo a identidade visual definida e o suporte completo aos temas claro e escuro.
