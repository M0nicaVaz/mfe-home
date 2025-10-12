# Home MFE

Dashboard do aplicativo financeiro.

## Desenvolvimento

### Pré-requisitos
- `shared` deve estar instalado (`npm install` na raiz do monorepo e em `shared/`).
- Defina `NEXT_PUBLIC_API_URL` em `home/.env.local` (veja `.env.example`).

### Com Docker
```bash
docker build -t mfe-home .
docker run \
  -p 4444:4444 \
  -e NEXT_PUBLIC_API_URL=http://localhost:5555/api \
  -v $(pwd):/app \
  -v /app/node_modules \
  mfe-home
```

### Sem Docker
```bash
npm install
NEXT_PUBLIC_API_URL=http://localhost:5555/api npm run dev
```

Acesse: http://localhost:4444/home (base path `/home`).

## Portas
- Desenvolvimento: 4444
- Backend esperado: `http://localhost:5555/api`
