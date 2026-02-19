# Roadmap de Desenvolvimento - ClinicFlow Studio

Este documento serve como guia passo-a-passo para  - Implement the "Payment Spreadsheet": A grid of months where clicking a cell mark as paid (creates a payment record for that month).

---

## Technical Phase: Onboarding Data Visualization

### [MODIFY] API: `api/admin/client-details.ts`
- **Selection**: Enrich the `clinics` join to return:
  - `phone`, `instagram`, `colors`, `fonts`, `toneTags`, `differentials`.

### [MODIFY] UI: `AdminClients.tsx`
- **Tabs**: Add "Onboarding / Quiz" tab.
- **Content**: 
  - **Identidade Visual**: Mostrar as cores hexadecimais e o estilo de fonte escolhido.
  - **Presença Digital**: Links para Instagram e WhatsApp.
  - **Estratégia**: Exibir as Tone Tags (Voz da Marca) e Diferenciais competitivos.
- **Visuals**: Use icons and badges for a premium display of these insights.

## Verification Plan

### Manual Verification
- Verify that the "Onboarding" tab appears for clients who have completed the quiz.
- Ensure the color codes and fonts are displayed clearly.

## 1. Configuração Inicial (Base)
- [ ] **Setup**: Instalar dependências (`react-router-dom`, `drizzle-orm`, `pg`, `lucide-react`, `framer-motion`).
- [ ] **Database**: Configurar conexão Neon + Drizzle no arquivo `db/index.ts`.
- [ ] **Schema**: Criar tabelas `users`, `clinics`, `projects`, `posts` no `db/schema.ts` e rodar migration.
- [ ] **Roteamento**: Configurar `Router.tsx` com as rotas vazias (`/login`, `/dashboard`, etc) e envolver o App.

## 2. Autenticação & Conta
### Frontend (Telas)
- [x] **Login**: Criar tela com email/senha (Layout Glassmorphism).
- [x] **Cadastro**: Criar tela de registro (Nome, Email, Senha).
- [ ] **Recuperar Senha**: Criar tela simples de solicitação de reset.
- [ ] **Proteção**: Criar componente `PrivateRoute` para bloquear acesso não autorizado.

### Backend (API)
- [x] **API Login**: Criar endpoint `/api/auth/login` (Verificar credenciais, gerar JWT/Session).
- [x] **API Register**: Criar endpoint `/api/auth/register` (Hash de senha, criar user no DB).
- [ ] **API Logout**: Criar endpoint ou função de logout.

## 3. Onboarding (Quiz Dopaminérgico)
### Backend (API)
- [ ] **API Save Clinic**: Criar endpoint `/api/clinic/create` para receber o JSON do quiz e salvar na tabela `clinics`.

### Frontend (Componentes)
- [ ] **Layout do Quiz**: Tela limpa com Barra de Progresso animada.
- [ ] **Passo 1 (Intro)**: Tela de boas vindas "Vamos configurar sua clínica".
- [ ] **Passo 2 (Dados)**: Form de Nome, Telefone, Insta.
- [ ] **Passo 3 (Visual)**: Color Picker e Seleção de Fontes.
- [ ] **Passo 4 (Marca)**: Seleção de Tags (Autoridade, Luxo...).
- [ ] **Passo 5 (Conclusão)**: Animação de sucesso e redirecionamento para Dashboard.
- [ ] **Integração**: Conectar o passo final ao endpoint `/api/clinic/create`.

## 4. Dashboard do Cliente (Acesso)
### Backend (API)
- [ ] **API Get Project**: Endpoint para buscar status do site e link de preview.
- [ ] **API Get Posts**: Endpoint para buscar os posts do mês atual.

### Frontend (Telas)
- [ ] **Sidebar/Header**: Estrutura de navegação da área logada.
- [ ] **Timeline do Site**: Componente visual mostrando os passos (Pagamento -> Produção -> Publicado).
- [ ] **Gate de Pagamento**: Bloquear abas se status for `pending_payment`.
- [ ] **Player de Preview**: Modal para assistir vídeo do site pronto.
- [ ] **Config Domínio**: Formulário para escolher subdomínio ou domínio próprio.

## 5. Gestão de Conteúdos (Social Media)
### Frontend
- [ ] **Grid Anual**: Visualização dos 12 meses com status (Disponível/Bloqueado).
- [ ] **Visualização Mensal**: Grid com os 18 posts.
- [ ] **Modal de Post**: Ao clicar, ver imagem grande + legenda.
- [ ] **Ações**: Botão "Baixar Imagem" e "Copiar Legenda" (funcionais).

## 6. Painel Admin Master
### Backend (API)
- [ ] **API List Clients**: Buscar todos os clientes com seus status.
- [ ] **API Update Status**: Alterar status do projeto (ex: de "Em andamento" para "Concluído").
- [ ] **API Upload Content**: Salvar links de imagem e legendas para um cliente.

### Frontend
- [ ] **Lista de Clientes**: Tabela com filtros.
- [ ] **Editor de Status**: Modal para mudar o status do projeto.
- [ ] **Uploader**: Interface para colar links do Catbox e textos dos posts.

## 7. Pagamentos & Integrações
- [ ] **Webhook Stripe**: Endpoint para receber confirmação de pagamento e mudar status para `approved` automaticamente.
- [ ] **Botão de Assinatura**: Integrar link de checkout no Dashboard caso esteja pendente.
