# Definition of Done (DoD) - ClinicFlow Studio

Para que uma funcionalidade ou o projeto total seja considerado "Concluído", os seguintes critérios devem ser atendidos:

## 1. Funcionalidades de Usuário (Frontend)
- [ ] **Quiz de Onboarding:**
    - [ ] Todas as etapas (Dados, Identidade, Marca, Diferenciais) coletam e salvam dados corretamente no banco.
    - [ ] UX fluida com progresso visível e sem bugs de navegação.
    - [ ] Responsivo (Mobile/Desktop).
- [ ] **Dashboard - Site Tracker:**
    - [ ] Exibe corretamente o status atual vindo do banco de dados.
    - [ ] Bloqueia acesso a etapas futuras (ex: Publicação) se o pagamento não estiver "Aprovado".
    - [ ] Vídeo de preview roda corretamente no modal/player.
    - [ ] Opções de escolha de domínio funcionam e salvam a preferência.
- [ ] **Dashboard - Conteúdos:**
    - [ ] Grid de meses renderiza status correto.
    - [ ] Botão de "Copiar Legenda" copia texto para o clipboard com feedback visual ("Copiado!").
    - [ ] Botão "Baixar" inicia o download ou abre a mídia em nova aba.

## 2. Funcionalidades Administrativas (Admin)
- [ ] **Gestão de Status:**
    - [ ] Admin consegue alterar o status do projeto de qualquer usuário e a alteração reflete em tempo real (ou no refresh) para o usuário.
- [ ] **Gestão de Conteúdo:**
    - [ ] Admin consegue adicionar links de imagem e textos de legenda para um usuário específico em um mês específico.
- [ ] **Controle Financeiro:**
    - [ ] Admin consegue visualizar status de pagamento e alterar manualmente se necessário.

## 3. Infraestrutura e Dados
- [ ] **Banco de Dados:**
    - [ ] Schema criado e migrado no Neon (Postgres).
    - [ ] Relacionamentos (User -> Project -> Content) funcionando.
- [ ] **Integração:**
    - [ ] Webhook de pagamento recebendo e atualizando status do usuário (simulado ou real).
- [ ] **Deploy:**
    - [ ] Aplicação rodando na Vercel sem erros de build.
    - [ ] Variáveis de ambiente configuradas corretamente (Produção).

## 4. Qualidade e Polimento
- [ ] **UI/UX:**
    - [ ] Design consistente com o "Glassmorphism" e "Pill Design" solicitados.
    - [ ] Feedbacks de carregamento (Skeleton screens ou Spinners) em todas as requisições.
    - [ ] Tratamento de erros amigável (ex: "Não foi possível carregar seus posts").
- [ ] **Testes Manuais:**
    - [ ] Fluxo completo "Novo Usuário -> Quiz -> Dashboard -> Pagamento -> Acesso" testado e aprovado.
