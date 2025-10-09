# Home MFE

Dashboard do aplicativo financeiro.

## Desenvolvimento

### Com Docker
```bash
docker build -t mfe-home .
docker run -p 4444:4444 -v $(pwd):/app -v /app/node_modules mfe-home
```

### Sem Docker
```bash
npm install
npm run dev
```

Acesse: http://localhost:4444/home

## Porta
- Desenvolvimento: 4444
- Base path: `/home`
