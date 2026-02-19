# Escopo do Projeto: ClinicFlow Studio

## Visão Geral
O ClinicFlow Studio é uma plataforma SaaS para clínicas de estética e odontologia que automatiza a criação de sites de alta conversão e entrega de conteúdo para redes sociais. O sistema guia o usuário desde o onboarding (coleta de informações) até a entrega final do site e materiais de marketing.

## Fluxo do Usuário (Cliente)

### 1. Onboarding & Quizz (Dopaminérgico)
O primeiro contato do usuário pós-cadastro. Deve ser visualmente estimulante, com barras de progresso e feedback imediato.
*   **Dados Básicos:** Nome da Clínica, Endereço, Telefone, Instagram.
*   **Identidade Visual:**
    *   Seleção de Cores: Picker Hex ou Paletas Prontas (ex: "Elegante", "Minimalista", "Vibrante").
    *   Tipografia: Upload de fonte ou seleção de Kits Tipográficos.
*   **Posicionamento de Marca:**
    *   Seleção de Tags (Múltipla escolha): Autoridade, Conexão, Humanização, Cuidado, Tecnologia, Luxo, etc.
*   **Diferenciais:** Campo de texto livre para descrever pontos fortes.
*   **Conversão:** Criação da conta ao final ou vinculação se já existir.

### 2. Dashboard do Cliente (Área Logada)
Central de controle onde o cliente acompanha o progresso do seu site e acessa seus conteúdos.

#### A. Status do Site (Timeline)
Estados possíveis do projeto:
1.  **Aguardando Pagamento:** Primeiro estágio.
2.  **Pagamento Aprovado:** Confirmação visual.
3.  **Projeto em Andamento:** Staff trabalhando.
4.  **Finalizando:** Ajustes finais.
5.  **Projeto Concluído (Preview):** Usuário visualiza um vídeo de apresentação do site.
    *   *Bloqueio:* Se o pagamento de R$97 não estiver confirmado, o acesso final é travado.
6.  **Configuração de Domínio:** Usuário escolhe entre:
    *   Subdomínio ClinicFlow (Gratuito/Incluso).
    *   Domínio Próprio (Instruções de apontamento/CNAME).
7.  **Configurando Servidor:** Status de deploy.
8.  **Site Publicado:** Botão de acesso ao site ao vivo.

#### B. Gestão de Conteúdos (Social Media)
*   **Visualização Anual:** Grid com os meses do ano.
*   **Status Mensal:** (ex: "Em produção", "Disponível", "Baixado").
*   **Visualização de Conteúdo:** Ao clicar em um mês "Pronto/Disponível":
    *   Lista de 18 posts.
    *   Preview da imagem/vídeo.
    *   Botão **"Baixar Mídia"**.
    *   Botão **"Copiar Legenda"**.

## Painel Admin Master (Gestão Interna)
Painel para a equipe ClinicFlow gerenciar a base de clientes.

*   **Dashboard Financeiro:** Visão geral de assinantes, pagamentos pendentes/aprovados (integração visual ou dados reais).
*   **Gestão de Clientes:**
    *   Lista de usuários.
    *   Edição manual de Status do Site (ex: mover de "Em andamento" para "Concluído").
    *   Upload de vídeo de preview do site.
    *   Liberação manual de pagamento (override).
*   **Gestão de Conteúdos:**
    *   Seleção de cliente e mês.
    *   Upload de mídias (Links diretos, ex: Catbox.moe).
    *   Cadastro de legendas.

## Infraestrutura & Integrações
*   **Frontend:** React (Vite) + Tailwind CSS + Framer Motion.
*   **Banco de Dados:** Neon Database (PostgreSQL).
*   **Hospedagem App:** Vercel.
*   **Pagamentos:** Integração via Webhook (Stripe/Gateway) para liberação automática, com fallback manual no Admin.
*   **Armazenamento de Mídia:** Links externos (Catbox.moe conforme solicitado).

## Regras de Negócio Críticas
1.  **Gate de Pagamento:** O usuário pode ver o progresso ("Em andamento", "Concluído"), mas só pode **configurar o domínio** e **acessar o site final** após o status de pagamento ser "Aprovado" (R$97).
2.  **Fluxo de Publicação:** A mudança para "Site Publicado" depende da configuração do domínio.
3.  **Dopamina:** O Quiz deve ser engajador para reduzir drop-off inicial.
