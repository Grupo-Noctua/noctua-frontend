# noctua-frontend
Frontend repository by Noctua team.

## Imagem Docker

```sh
docker build -t noctua-frontend:local .
docker run --rm -p 127.0.0.1:8081:8080 -e BACKEND_UPSTREAM=http://host.docker.internal:8080 noctua-frontend:local
```

O build utiliza `npm ci` e `vite build`. Nginx serve os arquivos e encaminha `/api/`
ao backend, preservando o prefixo. `/healthz` verifica o servidor estático. O arquivo
DOCX usado como modelo de projeto também é incluído no build.

As telas atuais ainda utilizam dados simulados; preparar o proxy não substitui a
integração dos componentes React com os endpoints.

O deploy AWS, publicação no Docker Hub e HTTPS estão documentados em
`../noctua-infraestructure/docs/IMPLANTACAO_APLICACAO.md`.
