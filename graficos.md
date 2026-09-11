
Gráfico 1 — Funcionários x Tecnologia (Gráfico de Colunas Verticais)
Tipo: Column chart (barras verticais) Layout: Ocupa metade da largura da tela (grid 2 colunas)

Estrutura visual:

Container com título "Funcionários x Tecnologia" no topo, separado por uma borda inferior
Área do gráfico com height: 176px, padding-top: 24px, itens alinhados pela base (align-items: end)
9 colunas distribuídas com flex: 1 e gap: 8px entre elas
Cada coluna contém (de cima para baixo):

Número — font-size: 11px, monospace, negrito, centralizado acima da barra
Barra — width: 100%, border-radius: 4px 4px 0 0 (arredondado só no topo), cor #D04A02 (acento PwC), opacidade variando de 0.75 até 0.99 progressivamente da esquerda para a direita. A altura é calculada proporcionalmente ao valor máximo: height = (count / maxCount) * 110px, com mínimo de 6px
Label — font-size: 9px, texto rotacionado verticalmente (writing-mode: vertical-rl, rotate: 180deg), height: 44px, cor cinza-médio, overflow hidden
Dados:

Tecnologia	Funcionários
Node.js	11
Spark	8
React	10
Postgres	7
Docker	13
Figma	6
AWS	9
PowerBI	5
Python	12
Gráfico 2 — Número de Funcionários por Área (Barras Horizontais)
Tipo: Horizontal bar chart Layout: Metade da largura (grid 2 colunas)

Estrutura visual:

Lista vertical com gap: 10px entre itens
Dados derivados dos departamentos reais dos funcionários, ordenados do maior para o menor
Cada barra contém:

Label à esquerda — width: 130px fixo, font-size: 12px, cor textual secundária, truncado com ellipsis
Trilha da barra — flex: 1, height: 24px, border-radius: 8px, fundo levemente contrastado com borda de 1px. Dentro: a barra preenchida com border-radius: 8px, cor rgba(208,74,2, 0.65), largura proporcional ao máximo. Sobre a barra, número sobreposto em position: absolute, font-size: 11px, monospace, negrito — branco se a barra passa de 25% da largura, escuro caso contrário
Número à direita — width: 24px, alinhado à direita, font-size: 12px, monospace
Departamentos (exemplo de dados): Engenharia, Analytics, Design, Qualidade, Dados, Infraestrutura, Produto — quantidades derivadas dos funcionários cadastrados.

Gráfico 3 — Número de Funcionários por Senioridade (Barras Horizontais com Gradiente de Cor)
Tipo: Horizontal bar chart com paleta progressiva Layout: Metade da largura (grid 2 colunas)

Estrutura visual: Idêntica ao Gráfico 2, mas com cor de preenchimento variando por nível de senioridade:

Nível	Cor
Estagiário	rgba(208,74,2, 0.28) — quase transparente
Júnior	rgba(208,74,2, 0.44)
Pleno	rgba(208,74,2, 0.60)
Sênior	rgba(208,74,2, 0.76)
Especialista	rgba(208,74,2, 0.88)
Tech Lead	#D04A02 — cor sólida máxima
Ordenação: fixa pela hierarquia (Estagiário → Tech Lead), não por quantidade. Níveis sem funcionários são omitidos.

Gráfico 4 — Projetos x Tecnologia (Gráfico de Pizza / Donut)
Tipo: Donut chart SVG + legenda lateral Layout: Metade da largura (grid 2 colunas)

Estrutura visual:

Flex row com gap: 40px: pizza à esquerda, legenda à direita
Pizza SVG:

width: 220px, height: 220px, viewBox: 0 0 220 220
Centro: cx=110, cy=110
Raio externo: r=90, raio interno (buraco): r=48 → formato donut
Cada fatia desenhada com <path> usando arco SVG. Separação entre fatias: stroke branco de 2px sobre o fill
Ponto de início: -90° (topo do círculo)
Centro do donut: número total (79) em font-size: 22px, monospace, negrito + texto "usos totais" em font-size: 10px abaixo
Paleta de cores das fatias (em ordem):

#D04A02 (acento sólido)
rgba(208,74,2, 0.78)
rgba(208,74,2, 0.60)
rgba(208,74,2, 0.44)
#6B7280 (cinza médio)
#9CA3AF (cinza claro)
rgba(208,74,2, 0.30)
#4B5563 (cinza escuro)
#D1D5DB (cinza muito claro)
Legenda (coluna à direita):

gap: 10px entre itens
Cada item: quadrado de cor 12×12px com border-radius: 2px + nome da tecnologia (flex: 1, font-size: 14px) + quantidade ("X proj.", font-size: 12px, monospace, cor muted) + percentual ("XX%", font-size: 12px, monospace, negrito, alinhado à direita, width: 36px)
Dados:

Tecnologia	Projetos	%
Node.js	11	14%
Spark	11	14%
React	9	11%
Postgres	9	11%
Docker	9	11%
Figma	9	11%
AWS	7	9%
PowerBI	7	9%
Python	7	9%
Container dos Gráficos (ChartCard)
Todos os 4 gráficos compartilham o mesmo wrapper:

border-radius: 16px
background: superfície do tema (#e8e4de claro / variante escura)
border: 1px solid cor de borda do tema
Header interno: padding: 16px 24px, flex row com justify-content: space-between, título em font-size: 14px, negrito, separado do corpo por border-bottom: 1px solid
Corpo: padding: 20px 24px
Layout geral da tela de Métricas
display: flex, flex-direction: column, gap: 24px
Os 4 gráficos ficam dentro de um display: grid, grid-template-columns: 1fr 1fr, gap: 16px
Ordem na grade: Funcionários x Tecnologia (topo esquerdo) → Por Área (topo direito) → Por Senioridade (baixo esquerdo) → Projetos x Tecnologia (baixo direito)