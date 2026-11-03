# noctua-frontend
Frontend repository by Noctua team.

## Desenvolvimento local com dados da AWS

Siga o [guia integrado](../noctua-backend/docs/DESENVOLVIMENTO_LOCAL_AWS.md)
para iniciar o túnel SSM e o backend local. Depois, nesta pasta:

```powershell
npm ci
npm run dev -- --host localhost --port 5173 --strictPort
```

Abra `http://localhost:5173`. O Vite já encaminha `/api` para `http://localhost:8080`.
Seu cache fica na pasta temporária do sistema para evitar bloqueios do OneDrive.

## Imagem Docker

```sh
docker build -t noctua-frontend:local .
docker run --rm -p 127.0.0.1:8081:8080 -e BACKEND_UPSTREAM=http://host.docker.internal:8080 noctua-frontend:local
```

O build utiliza `npm ci` e `vite build`. Nginx serve os arquivos e encaminha `/api/`
ao backend, preservando o prefixo. `/healthz` verifica o servidor estático. O arquivo
DOCX usado como modelo de projeto também é incluído no build.

KPIs, métricas, lista de projetos e detalhes dos profissionais recomendados consultam
a API. O dashboard publicado não importa a base `src/data/mock.tsx`. Os componentes
de protótipo permanecem no código, fora da navegação e do bundle de produção.

A criação de projetos ainda não possui endpoint integrado. O botão informa essa
limitação e permite baixar o modelo de documento, sem simular análise de IA ou
confirmação de criação. Os projetos Alpha Platform, Beta Integration e Gamma
Analytics são registros retornados pelo MySQL da AWS.

O deploy AWS, publicação no Docker Hub e HTTPS estão documentados em
`../noctua-infraestructure/docs/IMPLANTACAO_APLICACAO.md`.

### Release do dashboard — 02/11/2026

- Imagem: `elersonalves/noctua-frontend:release-20261102-dashboard-01`.
- Digest: `sha256:eea625bc8981c011a805340a3daaea8ea61ce730f862512ec9c69edb1c69e0cf`.
- Senioridades do gráfico: Júnior, Pleno e Sênior.
- O KPI mostra uma ferramenta; em empates, usa a primeira da ordenação alfabética da API.
- Implantação via SSM nas duas instâncias frontend da stack `noctua-application`.
- Validação: build de produção, oito endpoints por instância, targets saudáveis e
  HTML/JavaScript da nova versão disponíveis pelo balanceador.

### Correção de integração — release-20261102-dashboard-02

- Imagem: `elersonalves/noctua-frontend:release-20261102-dashboard-02`.
- Digest: `sha256:8c783676549d001b78d118389f9188455e25444f0c18559c80abf0807a45eba1`.
- Detalhes exibem candidatos, vagas, ranking, pontuação e justificativas da API.
- Datas preservam o dia informado pelo backend; orçamento zero e campos nulos são tratados.
- Consultas distinguem carregamento, erro com nova tentativa e ausência de dados.
- Validação com TypeScript, build Docker e navegação automatizada em Edge/Playwright,
  comparando os valores da interface aos oito endpoints no ambiente local e no ALB.
- Cenários adicionais: falha HTTP e retry, orçamento zero/nulo, fuso de São Paulo
  e lista vazia. As duas instâncias passaram nos smoke tests e estão saudáveis.

### Correção de assets — release-20261102-dashboard-03

Corrige a tela em branco causada por HTML antigo referenciando JavaScript removido.
HTML usa `no-store`, assets ausentes retornam 404 e o deploy na EC2 retém os
arquivos das releases anteriores. A configuração também valida o MIME do bundle.

Digest: `sha256:c5b532f2f102b9ce23c0cf97322cd6ab0c0a30714eba4b23078987e27ddd7a3c`.
Veja [causa, configuração e validações](../noctua-infraestructure/docs/CORRECAO_CACHE_FRONTEND.md).
