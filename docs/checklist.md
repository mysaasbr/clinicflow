# Checklist de Segurança e Regras de Negócio (Error Prevention)

## Controle de Acesso e Pagamentos
- [ ] **Verificação de Pagamento no Backend:** Não confiar apenas no estado do frontend. Ao tentar publicar o site ou baixar conteúdos restritos, o backend deve verificar se `payment_status === 'approved'`.
- [ ] **Webhook Idempotente:** Garantir que o webhook de pagamento possa ser recebido múltiplas vezes sem causar duplicidade ou erros de estado.
- [ ] **Fallback Manual:** Garantir que o Admin possa liberar o acesso manualmente caso o webhook falhe ou o pagamento seja feito por outros meios (Pix direto, etc).

## Upload e Mídia
- [ ] **Links Externos:** Verificar se os links do Catbox.moe estão funcionais e acessíveis (não bloqueados por CORS, embora links diretos de imagem costumem funcionar).
- [ ] **Validação de Conteúdo:** No Admin, garantir que campos obrigatórios (Legenda, Link da Imagem) não sejam salvos vazios.

## Dados do Usuário (LGPD/Privacy)
- [ ] **Sanitização:** Escapar inputs de texto do usuário (nome, diferenciais) para evitar injeção de script se forem renderizados em HTML puro.
- [ ] **Acesso Privado:** Garantir que um usuário não consiga acessar os conteúdos ou status de outro usuário alterando IDs na URL (Row Level Security ou verificação de sessão no Backend).

## UX e "Dopamina"
- [ ] **Persistência do Quiz:** Se o usuário abandonar o quiz no meio, salvar o progresso (localstorage ou banco parcial) para ele não ter que digitar tudo de novo.
- [ ] **Feedback de Erro no Quiz:** Se falhar o envio, não apagar os dados preenchidos.

## Infraestrutura
- [ ] **Environment Variables:** NÃO commitar chaves de API (Stripe, Neon) no repositório. Usar `.env`.
- [ ] **Build Check:** Rodar `npm run build` localmente antes de cada deploy para garantir que typescript errors não quebrem a produção.
