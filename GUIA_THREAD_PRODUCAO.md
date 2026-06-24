# Guia do Thread de Publicacao em Producao

Este documento consolida o thread completo de evolucao do app-ip-genius ate um estado operacional com autenticacao real, persistencia por usuario e deploy publico no GitHub Pages.

## 1. Objetivo do thread

Transformar o app em um produto funcional de verdade, com:

- deploy publico estavel
- suporte a usuarios reais
- persistencia em nuvem por conta
- automacao de etapas operacionais via DOM/Playwright

## 2. Estado inicial do projeto

- Frontend React + Vite + TypeScript
- PWA com vite-plugin-pwa
- Dados locais com localStorage e massa mock
- Pipeline de deploy ainda instavel para GitHub Pages

## 3. Problemas encontrados no caminho

### 3.1 CI/CD e publicacao

- Falhas no GitHub Pages por lockfile ausente
- Instabilidade de workflows antigos de deploy
- Erros de subpath em GitHub Pages

### 3.2 Runtime em producao

- Falhas de MIME e 404 por caminhos absolutos
- PWA com links/escopo inconsistentes no subpath /ip-genius/

### 3.3 Backend e autenticacao

- Projeto inicialmente sem backend real
- Necessidade de autenticar usuarios reais
- Necessidade de persistir estado individual por usuario

### 3.4 UX de dados iniciais

- Usuarios novos recebiam o mesmo perfil/progresso ficticio
- Sensacao de conta compartilhada, mesmo com login real

## 4. Decisoes tecnicas tomadas

### 4.1 Deploy

Migracao para fluxo oficial de GitHub Pages com GitHub Actions:

- actions/checkout
- actions/configure-pages
- actions/upload-pages-artifact
- actions/deploy-pages

### 4.2 Backend

Adocao de Supabase com:

- Auth email/senha
- tabela public.aura_user_state
- RLS por auth.uid() = user_id

### 4.3 Configuracao segura

Uso de secrets no GitHub Actions:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

### 4.4 Estrategia de resiliencia

Modo cloud com fallback local quando necessario, mantendo o app utilizavel durante inconsistencias de rede/configuracao.

## 5. Implementacoes realizadas

## 5.1 Arquitetura cloud no app

- Inicializacao de cliente Supabase via variaveis de ambiente
- Gate de autenticacao no App
- Bootstrap de estado remoto/local
- Sincronizacao periodica para nuvem
- Tela de login/cadastro integrada

### 5.2 Persistencia de estado

- Leitura de snapshot remoto por user_id
- Upsert de payload jsonb por usuario
- Snapshot local padronizado

### 5.3 Schema e politicas

Tabela criada:

- public.aura_user_state (PK user_id, payload jsonb, updated_at)

Politicas RLS:

- SELECT proprio usuario
- INSERT proprio usuario
- UPDATE proprio usuario

### 5.4 Correcao de dados iniciais compartilhados

Problema: usuario novo recebia massa mock pronta (nome fixo, nivel 4, progresso parcial).

Correcao aplicada:

- identidade inicial baseada no usuario autenticado
- progresso inicial zerado para contas novas
- nivel inicial 1, xp 0, rank 0, emblemas 0, atividades vazias
- persistencia dessa base individual no Supabase

## 6. Automacoes via DOM/Playwright executadas

Foram executadas automacoes reais de painel para reduzir operacao manual:

- criacao de projeto Supabase
- obtencao de URL e anon key
- cadastro de secrets no GitHub
- disparo de workflow de deploy
- aplicacao de schema SQL na base
- alteracao de Confirm email para desativado
- ajuste de URL Configuration (Site URL e Redirect URL de producao)
- validacoes runtime do app publicado

## 7. Validacoes finais realizadas

### 7.1 Deploy

- Workflow de deploy executado com sucesso
- URL publica validada: https://dmenezes007.github.io/ip-genius/

### 7.2 Autenticacao

- Cadastro/login funcionando em producao
- Fluxo sem confirmacao obrigatoria de email (por configuracao)

### 7.3 Persistencia por usuario

- Usuarios novos com estado individual
- Confirmacao em banco de payload por email/conta

### 7.4 Correcao do cache antigo

Durante validacao, houve leitura de bundle antigo por Service Worker/cache.
Foi feita limpeza de SW + caches + storage para confirmar comportamento da versao nova.

## 8. Status atual

O app esta funcional em producao com:

- deploy estavel
- autenticacao real
- estado isolado por usuario
- sincronizacao em nuvem
- configuracao de URL adequada para ambiente publico

## 9. Checklist operacional (reutilizavel)

1. Confirmar secrets no GitHub Actions.
2. Confirmar Site URL e Redirect URLs no Supabase.
3. Rodar deploy e validar run verde (build + deploy).
4. Testar cadastro de usuario novo.
5. Verificar no banco se payload inicial ficou individual.
6. Validar login/logout e persistencia de alteracoes.
7. Em caso de divergencia visual, limpar cache/SW e retestar.

## 10. Proximos aprimoramentos sugeridos

1. Migrar massa inicial de missoes para modelos por perfil de usuario.
2. Criar rotina de migracao de snapshots legados para formato atual.
3. Adicionar telemetria basica de erros de sync/autenticacao.
4. Endurecer CI com verificacoes automatizadas de smoke test em Pages.
