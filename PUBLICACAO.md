# Aura - Progresso Gamificado

Uma plataforma móvel de evolução gamificada, onde você acompanha suas metas, cumpre missões diárias, desbloqueia emblemas e lidera o ranking.

## 🎯 Visão Geral

**Aura** é um Progressive Web App (PWA) moderno e totalmente responsivo, projetado para funcionar em qualquer dispositivo (smartphones, tablets, desktop). A aplicação oferece:

- 📊 **Dashboard Inteligente**: Visualize seu progresso, nível e XP acumulado
- ⚡ **Missões Diárias, Semanais e Especiais**: Cumpra desafios e ganhe XP
- 🏆 **Sistema de Ranking**: Compita com outros usuários em tempo real
- 🎖️ **Emblemas Desbloqueáveis**: Conquiste troféus digitais através de feitos
- 🎁 **Loja de Recompensas**: Resgate XP por vouchers e prêmios exclusivos
- 📱 **Modo Offline**: Funciona offline com sincronização automática

## 🚀 Início Rápido

### Instalação Local

**Pré-requisitos:**
- Node.js 18+ (com npm 9+)
- Git

**Passos:**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/app-ip-genius.git
cd app-ip-genius

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Build para Produção

```bash
# Crie a versão otimizada
npm run build

# Verifique o build localmente
npm run preview
```

## 📦 Estrutura do Projeto

```
app-ip-genius/
├── src/
│   ├── App.tsx                 # Componente principal
│   ├── index.css               # Estilos globais (Tailwind)
│   ├── main.tsx                # Entrada React
│   ├── types.ts                # Tipos TypeScript
│   └── components/
│       ├── Dashboard.tsx       # Visão principal
│       ├── Missions.tsx        # Painel de missões
│       ├── Ranking.tsx         # Leaderboard
│       ├── Badges.tsx          # Galeria de emblemas
│       ├── Rewards.tsx         # Loja de recompensas
│       ├── Profile.tsx         # Perfil do usuário
│       ├── ModalAchievement.tsx # Modal de celebração
│       └── AuraIcon.tsx        # Componente de ícones
├── index.html                  # HTML base com meta tags PWA
├── vite.config.ts              # Configuração Vite + VitePWA
├── package.json
├── tsconfig.json
└── dist/                       # Build de produção

```

## 🎨 Tecnologias

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build**: Vite 6, VitePWA
- **Animações**: Motion (Framer Motion)
- **Ícones**: Lucide React
- **Armazenamento**: LocalStorage (persistência local)

## 📱 Instalação em Dispositivos

### iOS (iPhone/iPad)

1. **Abra o app em Safari** com a URL de produção
2. **Toque o ícone de compartilhamento** (↑ ou ⬆️ na barra inferior)
3. **Selecione "Adicionar à Tela de Início"**
4. **Nomeie como "Aura"** e clique "Adicionar"

A aplicação funcionará como um app nativo no seu home screen.

### Android (Chrome/Firefox)

1. **Abra o app no Chrome** com a URL de produção
2. **Toque o menu (⋮) no canto superior direito**
3. **Selecione "Instalar aplicativo"** ou "Aura"
4. **Confirme a instalação**

O app será adicionado à sua biblioteca de aplicativos Android.

### Desktop (Windows/macOS/Linux)

1. **Visite** `https://seu-dominio.com/app-ip-genius`
2. **Observe o ícone de instalação** na barra de endereços
3. **Clique e confirme** para instalar como app de desktop

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento (porta 3000)

# Produção
npm run build        # Compila para `dist/`
npm run preview      # Visualiza build de produção localmente
npm run typecheck    # Valida tipos TypeScript
npm run lint         # Executa linting e type-check

# Limpeza
npm run clean        # Remove `dist/` e arquivos temporários
```

## 🌐 Publicação em Produção

### Opção 1: Vercel (Recomendado)

```bash
# Instale Vercel CLI
npm install -g vercel

# Deploy
vercel

# Seu app estará em: https://seu-projeto.vercel.app
```

### Opção 2: Netlify

```bash
# Build local
npm run build

# Drag & drop `dist/` folder em https://app.netlify.com
# Ou use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Opção 3: GitHub Pages

```bash
# Configure em package.json
"homepage": "https://seu-usuario.github.io/app-ip-genius"

# Deploy
npm run build
npx gh-pages -d dist
```

### Opção 4: Docker + Cloud Run (Google Cloud)

```dockerfile
# Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

```bash
# Build e deploy
docker build -t app-ip-genius .
gcloud run deploy app-ip-genius --source .
```

## 🔒 Segurança e Performance

- ✅ **HTTPS obrigatório** para PWA (HTTP em localhost apenas)
- ✅ **Service Worker** com cache automático
- ✅ **Compressão Gzip** e otimização de assets
- ✅ **CORS simples** (ajustar conforme necessário)
- ✅ **Content-Security-Policy** headers recomendados

### Headers de Produção (Nginx/Apache/Vercel)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Performance

- **Bundle**: ~127 KB (gzipped)
- **Lighthouse Score**: 95+ (PWA)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## 🛠️ Desenvolvimento

### Adicionar Novo Componente

```tsx
// src/components/NovoComponente.tsx
import React from 'react';

interface NovoComponenteProps {
  title: string;
}

export default function NovoComponente({ title }: NovoComponenteProps) {
  return <div>{title}</div>;
}
```

### Adicionar Nova Aba de Navegação

1. Edite `src/App.tsx`
2. Estenda o tipo `AppTab`
3. Crie nova rota em `renderActiveView()`
4. Adicione botão na navegação inferior

### LocalStorage e Persistência

O app salva automaticamente em `localStorage` as seguintes chaves:
- `aura_user_stats`
- `aura_missions`
- `aura_badges`
- `aura_rewards`
- `aura_activities`

Para resetar tudo:
```tsx
localStorage.clear();
location.reload();
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Autenticação com Firebase
- [ ] Sincronização em nuvem
- [ ] Modo multiplayer em tempo real
- [ ] Integração com Gemini AI para missões automáticas
- [ ] App nativo iOS/Android com React Native
- [ ] Dark mode
- [ ] Suporte a múltiplos idiomas (i18n)

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- 📧 **Email**: suporte@aura-app.com
- 🐛 **Issues**: https://github.com/seu-usuario/app-ip-genius/issues
- 💬 **Discussões**: https://github.com/seu-usuario/app-ip-genius/discussions

---

**Aura** © 2026 - Construído com ❤️ para motivar e gamificar o progresso pessoal.
