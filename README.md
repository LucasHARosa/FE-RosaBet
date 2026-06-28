# RosaBet — Frontend

> Plataforma de apostas esportivas e cassino online.

---

<!-- GIF DA PLATAFORMA -->

---

## O que é

RosaBet é uma plataforma completa de apostas esportivas e cassino. O frontend foi construído em Next.js 14 e consome uma API FastAPI em tempo real, incluindo odds ao vivo via WebSocket.

Funcionalidades principais:

- Login, cadastro e gerenciamento de conta
- Apostas esportivas com odds em tempo real (WebSocket)
- Cassino com slots, roleta, ao vivo, bingo e outros
- Depósito via PIX simulado com bônus de boas-vindas
- Histórico de apostas e extrato financeiro

---

## Como rodar

**Pré-requisito:** Node.js 20.13.1 (use `nvm use 20.13.1`)

```bash
npm install
npm run dev
```

O frontend sobe em `http://localhost:3000`.

Certifique-se de que o backend FastAPI está rodando em `http://localhost:8000` — veja o [README do backend](../BE-RosaBet/README.md).

---

## Estrutura de pastas

```
RosaBet/
├── src/
│   ├── app/                        # Rotas do Next.js (App Router)
│   │   ├── (auth)/                 # Páginas de login e cadastro
│   │   ├── (private)/              # Páginas protegidas (aposta, perfil, cassino)
│   │   └── (public)/               # Páginas abertas (home, esportes)
│   │
│   ├── components/                 # Componentes reutilizáveis
│   ├── context/                    # Contextos React (auth, betslip, user)
│   ├── hooks/                      # Custom hooks (useGame, useBetslip, etc.)
│   ├── service/                    # Clientes HTTP e WebSocket
│   └── types/                      # Tipos TypeScript globais
│
├── public/                         # Assets estáticos
└── .env.local                      # Variáveis de ambiente (não vai pro git)
```

---

## Variáveis de ambiente

Crie um `.env.local` na raiz:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SOCKET_URL=ws://localhost:8000
NEXT_WEBSITE_URL=http://localhost:3000/
```

---

## Stack

| Tecnologia | Versão |
|---|---|
| Next.js | 14.2.3 |
| React | 18.3.1 |
| TypeScript | — |
| Styled Components | — |
| Node.js | 20.13.1 |
