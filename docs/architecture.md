# Arquitetura do Sistema - ClinicFlow Studio

Este documento define os padrões de arquitetura e organização de código para garantir escalabilidade e manutenibilidade. O princípio fundamental é **Modularidade Vertical e Horizontal**, evitando arquivos gigantescos ("Monolitos").

## 1. Estrutura de Diretórios (Frontend)

A estrutura deve separar claramente responsabilidades (UI, Lógica, Páginas, Dados).

```
src/
├── api/                # Funções de interação com Backend/Server Actions
├── assets/             # Imagens, fontes, ícones estáticos
├── components/         # Componentes Reutilizáveis (UI)
│   ├── ui/             # Componentes base (Botões, Inputs, Cards) - "Design System"
│   ├── layout/         # Componentes estruturais (Navbar, Sidebar, Footers)
│   └── shared/         # Componentes funcionais compartilhados (EmptyStates, Loaders)
├── db/                 # Configuração do Drizzle ORM e Schema
├── hooks/              # Custom React Hooks (Lógica reutilizável)
├── layouts/            # Wrappers de páginas (AuthLayout, DashboardLayout)
├── lib/                # Utilitários puros (formatters, validators, classes helper)
├── pages/              # Visualizações principais (Cada pasta é uma rota)
│   ├── Auth/           # Login, Register, ForgotPassword
│   ├── Dashboard/      # Paineis do cliente (Home, Content, Site)
│   ├── Onboarding/     # Quiz e configuração inicial
│   └── Landing/        # Landing Page pública
├── routes/             # Definição de rotas e proteção (Guards)
├── services/           # Integrações externas (Stripe, Catbox, etc)
├── styles/             # CSS globais e configurações de tema
└── types/              # Definições de tipos TypeScript globais
```

## 2. Princípios de Desenvolvimento

### Atomicidade e Componentização
*   **Regra de Ouro:** Se um componente exceder 200-300 linhas, ele provavelemente deve ser quebrado em sub-componentes.
*   **Exemplo:** Em vez de um arquivo `Quiz.tsx` com 800 linhas contendo todo o formulário:
    *   `src/pages/Onboarding/Quiz/index.tsx` (Orquestrador)
    *   `src/pages/Onboarding/Quiz/components/StepIndicator.tsx`
    *   `src/pages/Onboarding/Quiz/steps/ClinicInfoForm.tsx`
    *   `src/pages/Onboarding/Quiz/steps/VisualIdentityForm.tsx`
    *   `src/pages/Onboarding/Quiz/hooks/useQuizState.ts` (Lógica de estado)

### Separação de Lógica (Hooks)
*   Componentes visuais (`.tsx`) devem focar em **renderização**.
*   Lógica complexa, `useEffect`s e manipulação de estado devem ser extraídos para **Custom Hooks** (`useNomeDoHook.ts`).
*   Isso facilita testes e reutilização.

### Estilização
*   Utilizar **Tailwind CSS** para estilização utilitária.
*   Para componentes complexos com muitas variantes (ex: Botões com primary, secondary, ghost...), usar `cva` (Class Variance Authority) e `clsx` para manter o template limpo.

## 3. Gerenciamento de Estado
*   **Server State (Dados):** Usar `React Query` (TanStack Query) ou similar para cache e invalidação de dados vindos da API.
*   **Global State (App):** `Context API` apenas para estados verdadeiramente globais (Tema, Sessão do Usuário, Toasts).
*   **Local State:** `useState` / `useReducer` para interações locais de componentes.
*   **Form State:** `React Hook Form` + `Zod` para validação de esquemas complexos. Evitar controlar formulários manualmente com dezenas de `useState`.

## 4. Backend (Serverless Functions)
Como estamos na Vercel:
*   Cada arquivo em `api/` é uma "Rota".
*   Manter a lógica de negócios ("Service Layer") separada dos Handlers da API.
    *   `api/users/create.ts` (Handler: Recebe Request -> Chama Service -> Retorna Response)
    *   `src/services/UserService.ts` (Regra de Negócio: Valida, Hasha Senha, Salva no DB).

Isso permite que a regra de negócio seja testada independentemente do framework de API (Next/Express/Vercel).
