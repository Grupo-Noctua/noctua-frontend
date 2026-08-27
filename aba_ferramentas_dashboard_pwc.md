# Especificação — Aba de Ferramentas · Dashboard Diretor de Projetos PwC Brasil

## 1. Visão geral

A aba **Ferramentas** apresenta a visão consolidada das tecnologias utilizadas nos projetos, permitindo ao Diretor de Projetos visualizar:

- quantidade total de ferramentas disponíveis;
- quantidade de categorias existentes;
- ferramenta mais adotada;
- ferramentas agrupadas por categoria;
- agrupamento por subcategoria;
- nível de adoção de cada ferramenta em cada projeto;
- comparação visual de adoção entre projetos.

A interface deve seguir o mesmo sistema visual do Dashboard, utilizando os tokens `t.*`, suporte aos temas claro e escuro e tipografia DM Sans / DM Mono.

---

## 2. KPI Cards

A parte superior da aba apresenta dois cards.

### Layout

```text
grid-cols-2
gap-4
mb-6
```

Os cards seguem a mesma estrutura dos KPI cards globais do dashboard.

### 2.1 Ferramentas em uso

**Label:** `Ferramentas em uso`

- 11px
- DM Mono
- uppercase
- `t.textMuted`

**Valor:** total de ferramentas únicas no catálogo.

- 28px
- semibold
- `t.text`

**Subtexto:** `Distribuídas entre X categorias`

- 12px
- `t.textMuted`

**Borda esquerda:**

```text
3px solid t.accent
```

### 2.2 Mais adotada

**Label:** `Mais adotada`

- 11px
- DM Mono
- uppercase
- `t.textMuted`

**Valor:** nome da ferramenta mais utilizada.

- 28px
- semibold
- `t.text`

**Subtexto:** nome da subcategoria.

- 12px
- `t.textMuted`

**Borda esquerda:**

```text
3px solid #1e7a45
```

---

## 3. Seletor de categoria

O seletor deve ser um **dropdown customizado**, posicionado no canto superior direito do bloco da tabela, alinhado ao título da categoria atual.

### Trigger

```text
flex items-center gap-2
px-3 py-2
border-radius: 8px
border: 1px solid t.border
background: t.surface
```

Conteúdo:

1. emoji da categoria;
2. nome da categoria;
3. chevron SVG de 12×12px.

Texto:

- 13px
- font-medium
- `t.text`

O chevron deve girar 180° quando o menu estiver aberto.

Hover:

```text
background: t.panelHover
```

---

## 4. Menu dropdown

### Posicionamento

```text
position: absolute
top: calc(100% + 4px)
right: 0
min-width: 220px
z-index: 50
```

### Estilo

- border-radius: 10px;
- border: 1px solid `t.border`;
- background: `t.surface`;
- box-shadow: `t.shadow`.

### Fechamento

Utilizar:

- `useEffect`;
- `useRef`;
- listener de `mousedown` no `document`.

Ao clicar fora do container do dropdown, o menu deve ser fechado.

---

## 5. Itens do dropdown

Cada categoria deve utilizar:

```text
flex items-center gap-3
px-3 py-2.5
```

Hover:

```text
background: t.panelHover
```

Cada item contém:

1. emoji da categoria;
2. nome;
3. badge com quantidade de ferramentas;
4. checkmark quando selecionado.

### Emoji

- 16px.

### Nome

- 13px;
- `t.text`;
- `flex-1`.

### Badge

- 11px;
- DM Mono;
- `t.textSub`;
- background `t.chipBg`;
- border-radius `full`;
- `px-2 py-0.5`.

### Categoria selecionada

Checkmark SVG:

- 14×14px;
- `t.accent`.

O primeiro e o último item devem respeitar o border-radius do menu.

---

## 6. Categorias

| Ícone | Categoria |
|---|---|
| 🖥️ | Desenvolvimento |
| 📋 | Gestão de Projeto |
| ☁️ | Infraestrutura e DevOps |
| 📊 | Dados e Análise |
| 🔒 | Segurança |

---

## 7. Tabela de ferramentas

Deve existir **uma única tabela visível por vez**, correspondente à categoria selecionada.

Ao trocar de categoria:

1. a tabela anterior desaparece;
2. a nova tabela aparece;
3. o título é atualizado;
4. a contagem é atualizada;
5. os agrupamentos por subcategoria são recalculados.

### Header da tabela

```text
flex items-center justify-between
mb-4
```

**Esquerda:**

- emoji;
- nome da categoria em 16px semibold `t.text`;
- quantidade em formato `X ferramentas`, 12px DM Mono `t.textMuted`.

**Direita:**

- dropdown de categoria.

### Wrapper

```text
border-radius: 12px
overflow: hidden
border: 1px solid t.border
```

---

## 8. Cabeçalho da tabela

Background:

```text
t.headerBg
```

Colunas:

1. Ferramenta;
2. Subcategoria;
3. uma coluna por projeto, usando nome abreviado.

Cada `<th>`:

```text
px-4 py-3
```

Características:

- 11px;
- DM Mono;
- uppercase;
- `t.textSub`;
- border-bottom: `1px solid t.border`;
- text-align: left.

Colunas de projeto:

- text-align: center;
- largura aproximada de 80px.

---

## 9. Agrupamento por subcategoria

As ferramentas devem ser agrupadas por subcategoria.

Cada grupo inicia com uma linha separadora não clicável.

### Linha de subcategoria

```text
<tr>
```

Background:

```text
t.headerBg
```

O `<td>` deve ocupar todas as colunas:

```text
colspan=N
px-4 py-2
```

Texto:

```text
— Subcategoria
```

Características:

- 11px;
- DM Mono;
- semibold;
- uppercase;
- `t.accent`;
- border-bottom: `1px solid t.border`.

---

## 10. Linhas de ferramentas

Utilizar zebraing:

```text
rowEven
rowOdd
```

Cada linha possui:

```text
border-bottom: 1px solid t.border
```

### Coluna Ferramenta

```text
px-4 py-3.5
```

Conteúdo:

```text
Nome da ferramenta · Categoria pai
```

Nome:

- 14px;
- semibold;
- `t.text`.

Categoria pai:

- 12px;
- `t.textMuted`.

### Coluna Subcategoria

```text
px-4 py-3.5
```

Características:

- 12px;
- DM Mono;
- `t.textSub`.

### Colunas de projeto

```text
px-4 py-3.5
text-center
```

Cada célula representa o nível de uso da ferramenta naquele projeto.

---

## 11. Escala de adoção

Cada ferramenta possui um nível entre `0` e `3`.

| Valor | Nível | Indicador |
|---:|---|---|
| 0 | Não utilizada | — |
| 1 | Básico | indicador leve |
| 2 | Intermediário | indicador médio |
| 3 | Avançado | indicador completo |

### Valor 0

- célula vazia ou dash;
- `t.textMuted`;
- nenhum indicador visual.

### Valor 1

- bolinha de 8×8px ou barra curta;
- `rgba(accent, 0.35)`;
- representa **Básico**.

### Valor 2

- bolinha de 8×8px ou barra média;
- `rgba(accent, 0.65)`;
- representa **Intermediário**.

### Valor 3

- bolinha de 8×8px ou barra cheia;
- `t.accent`;
- representa **Avançado**.

### Indicador visual

Quando utilizada a bolinha:

```text
width: 8px
height: 8px
border-radius: full
```

A bolinha deve ficar centralizada na célula.

Escala:

```text
0 → —
1 → rgba(accent, 0.35)
2 → rgba(accent, 0.65)
3 → t.accent
```

---

## 12. Barra alternativa de intensidade

Pode ser utilizada uma barra em vez da bolinha.

### Track

```text
w-16
h-1.5
border-radius: full
background: rgba(128,128,128,0.12)
```

### Fill

- background `t.accent`;
- largura proporcional ao percentual de adoção.

---

## 13. Estrutura dos dados

Cada ferramenta deve seguir:

```typescript
interface ToolUsage {
  tool: string
  category: string
  subcategory: string
  usage: Record<string, 0 | 1 | 2 | 3>
}
```

### Campos

**tool:** nome da ferramenta.

**category:** categoria principal.

**subcategory:** subcategoria.

**usage:** mapa de `projectId` para nível de uso entre 0 e 3.

Exemplo:

```javascript
{
  P001: 3,
  P002: 1,
  P003: 0
}
```

---

## 14. Dados mock

### Desenvolvimento

**Frontend**
- React
- TypeScript
- Figma

**Backend**
- Node.js
- Python
- Java

**Mobile**
- React Native
- Flutter

### Gestão de Projeto

**Planejamento**
- Jira
- Confluence
- Notion

**Comunicação**
- Slack
- Microsoft Teams

**Documentação**
- SharePoint
- Google Workspace

### Infraestrutura e DevOps

**Cloud**
- AWS
- Azure
- GCP

**CI/CD**
- GitHub Actions
- Jenkins

**Containers**
- Docker
- Kubernetes

### Dados e Análise

**BI**
- Power BI
- Tableau

**Banco de Dados**
- PostgreSQL
- MongoDB
- Redis

**Pipeline**
- Apache Kafka
- Airflow

### Segurança

**Identidade**
- Okta
- Azure AD

**Monitoramento**
- Splunk
- Datadog

**Conformidade**
- SonarQube
- Vault

---

## 15. Uso por projeto

Cada ferramenta deve possuir um mapa de uso por projeto:

```text
P001 → 0 | 1 | 2 | 3
P002 → 0 | 1 | 2 | 3
P003 → 0 | 1 | 2 | 3
...
```

Os valores devem variar para simular uma adoção heterogênea.

Os dados devem permitir representar:

- ferramentas muito utilizadas;
- ferramentas pouco utilizadas;
- ferramentas exclusivas de determinados projetos;
- ferramentas não utilizadas em alguns projetos;
- diferentes níveis de maturidade;
- diferentes padrões de adoção.

---

## 16. Cálculo de "Ferramentas em uso"

O KPI deve representar o número de ferramentas únicas no catálogo.

A contagem deve considerar o campo:

```text
tool
```

e não a quantidade de registros de uso por projeto.

---

## 17. Cálculo de "Mais adotada"

A ferramenta mais adotada deve ser calculada a partir dos níveis de uso registrados nos projetos.

Uma estratégia é somar os valores de `usage` de cada ferramenta:

```text
score = soma dos níveis de uso em todos os projetos
```

A ferramenta com maior score será exibida no KPI **Mais adotada**.

Em caso de empate, utilizar critério determinístico, como a primeira ferramenta encontrada na ordenação original.

---

## 18. Contagem por categoria

Cada categoria deve possuir sua quantidade de ferramentas:

```text
Desenvolvimento → X ferramentas
Gestão de Projeto → X ferramentas
Infraestrutura e DevOps → X ferramentas
Dados e Análise → X ferramentas
Segurança → X ferramentas
```

A contagem deve aparecer no dropdown e no título da tabela.

---

## 19. Fluxo de seleção

Fluxo esperado:

```text
Aba Ferramentas
      │
      ├── KPI Ferramentas em uso
      │
      ├── KPI Mais adotada
      │
      └── Tabela
            │
            ├── Categoria atual
            │
            └── Dropdown
                  │
                  ├── Desenvolvimento
                  ├── Gestão de Projeto
                  ├── Infraestrutura e DevOps
                  ├── Dados e Análise
                  └── Segurança
```

Ao selecionar uma categoria:

```text
Dropdown
   ↓
Atualiza categoria selecionada
   ↓
Atualiza título
   ↓
Atualiza contador
   ↓
Filtra ferramentas
   ↓
Agrupa por subcategoria
   ↓
Renderiza tabela
```

---

## 20. Estados do dropdown

O componente deve contemplar:

1. fechado;
2. aberto;
3. categoria selecionada;
4. hover em item;
5. clique fora.

### Fechado

Exibir apenas o trigger.

### Aberto

Exibir o menu abaixo do trigger.

### Selecionado

Mostrar checkmark na categoria atual.

### Hover

Aplicar:

```text
background: t.panelHover
```

### Clique fora

Fechar utilizando listener de `mousedown` no documento.

---

## 21. Estados da tabela

A tabela deve funcionar para:

- Desenvolvimento;
- Gestão de Projeto;
- Infraestrutura e DevOps;
- Dados e Análise;
- Segurança;
- categoria sem dados.

Somente uma tabela deve estar visível por vez.

---

## 22. Responsividade

Em telas amplas, todas as colunas de projeto podem ser exibidas simultaneamente.

Em telas menores, utilizar:

```text
overflow-x: auto
```

O wrapper deve preservar:

- cabeçalho;
- zebraing;
- alinhamento;
- largura aproximada de 80px das colunas de projeto.

---

## 23. Diretrizes visuais

A aba deve manter:

1. identidade visual do Dashboard PwC;
2. suporte consistente aos temas claro e escuro;
3. uso do accent para destaques;
4. hierarquia entre categoria, subcategoria e ferramenta;
5. leitura rápida dos níveis de adoção;
6. consistência com os KPI cards globais;
7. consistência com as tabelas existentes;
8. feedback visual no dropdown;
9. indicação clara da categoria atual;
10. diferenciação visual entre níveis 0, 1, 2 e 3.

---

## 24. Resultado esperado

Ao acessar a aba **Ferramentas**, o Diretor de Projetos deve conseguir identificar rapidamente:

- quantas ferramentas existem no catálogo;
- entre quantas categorias elas estão distribuídas;
- qual é a ferramenta mais adotada;
- quais ferramentas pertencem à categoria selecionada;
- em qual subcategoria cada ferramenta está;
- quais projetos utilizam determinada ferramenta;
- qual é o nível de utilização em cada projeto;
- quais ferramentas possuem adoção básica, intermediária ou avançada.

A interface deve funcionar como uma visão comparativa do **stack tecnológico e do nível de adoção de ferramentas por projeto**, mantendo o padrão visual e de interação definido para o Dashboard de Diretor de Projetos da PwC Brasil.
