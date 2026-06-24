<div align="center">
  <h1>🚀 Aura - Progresso Gamificado</h1>
  <p>Uma plataforma móvel moderna de evolução gamificada</p>
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PWA-Ready-green?logo=pwa" alt="PWA" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</div>

---

## ⚡ Início Rápido

### Pré-requisitos
- **Node.js** 18+ com npm 9+
- Git

### Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/app-ip-genius.git
cd app-ip-genius

# 2. Instale dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**.

## 📦 Build para Produção

```bash
npm run build      # Compila para produção em ./dist
npm run preview    # Visualiza o build localmente
npm run clean      # Limpa arquivos de build
```

## 🎯 Funcionalidades

- ✅ **Dashboard Gamificado**: Acompanhe progresso, XP e nível
- ✅ **Sistema de Missões**: Diárias, Semanais e Especiais com recompensas
- ✅ **Ranking em Tempo Real**: Compita com outros usuários
- ✅ **Emblemas Desbloqueáveis**: Conquiste troféus digitais
- ✅ **Loja de Recompensas**: Resgate XP por vouchers
- ✅ **Autenticação Real**: Login/cadastro com email e senha
- ✅ **Persistência em Nuvem**: Dados sincronizados por usuário (Supabase)
- ✅ **Progressive Web App (PWA)**: Instale em qualquer dispositivo
- ✅ **Offline-First**: Funciona sem conexão com sincronização automática
- ✅ **Totalmente Responsivo**: Mobile, tablet e desktop

## 📱 Instalação em Dispositivos

### iOS (Safari)
1. Abra em Safari
2. Toque o ícone de compartilhamento (↑)
3. Selecione "Adicionar à Tela de Início"
4. Confirme

### Android (Chrome)
1. Abra em Chrome
2. Toque o menu (⋮)
3. Selecione "Instalar aplicativo"
4. Confirme

### Desktop
1. Visite a URL de produção
2. Clique no ícone de instalação na barra de endereços
3. Confirme

## 🌐 Publicação

Para publicar em produção, consulte [PUBLICACAO.md](PUBLICACAO.md) para:
- ✅ Vercel (recomendado)
- ✅ Netlify
- ✅ GitHub Pages
- ✅ Docker + Cloud Run
- ✅ Nginx/Apache auto-hospedado

## 🛠️ Stack Técnico

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build**: Vite 6, VitePWA
- **Animações**: Motion (Framer Motion)
- **Ícones**: Lucide React
- **Estado**: React Hooks + LocalStorage + Sync em Supabase
- **Tipos**: TypeScript 5.8+
- **Backend Gerenciado**: Supabase Auth + Postgres

## 📋 Estrutura do Projeto

```
app-ip-genius/
├── src/
│   ├── App.tsx                 # Lógica e estado principal
│   ├── index.css               # Estilos Tailwind
│   ├── types.ts                # Tipos TypeScript
│   └── components/
│       ├── Dashboard.tsx       # Visão principal
│       ├── Missions.tsx        # Painel de missões
│       ├── Ranking.tsx         # Leaderboard
│       ├── Badges.tsx          # Galeria de emblemas
│       ├── Rewards.tsx         # Loja de recompensas
│       ├── Profile.tsx         # Perfil do usuário
│       └── ...
├── index.html                  # HTML com meta tags PWA
├── vite.config.ts              # Vite + VitePWA
└── package.json
```

## 🧪 Testes Locais

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Performance (Lighthouse)
# Instale: npm install -g lighthouse
lighthouse http://localhost:3000
```

## 🔐 Segurança

- HTTPS obrigatório em produção
- Service Worker com cache seguro
- CSP headers recomendados
- LocalStorage encriptado para dados sensíveis (recomendado)

## 📊 Métricas de Performance

- Bundle: ~127 KB (gzipped)
- Lighthouse: 95+ score
- FCP: < 1.5s
- TTI: < 3s

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit (`git commit -m 'Adiciona MinhaFeature'`)
4. Push (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Variáveis de Ambiente

Cópia `.env.local.example` para `.env.local` e customize conforme necessário:

```bash
NODE_ENV=production
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON
# VITE_APP_URL=https://dmenezes007.github.io/ip-genius
```

## 📄 Licença

MIT License - veja [LICENSE](LICENSE)

## 🆘 Suporte

- 📧 **Email**: suporte@aura-app.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/app-ip-genius/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/app-ip-genius/discussions)

---

<div align="center">
  <strong>Aura</strong> © 2026 - Construído com ❤️ para motivar seu progresso pessoal.
  
  ⭐ Se gostou, deixe uma estrela no repositório!
</div>
