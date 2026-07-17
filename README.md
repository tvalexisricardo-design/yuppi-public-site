# Yuppi — Público + Validação de Mercado

Website público da Yuppi: Homepage + Torna-te Parceiro. Next.js 15 (App Router), TypeScript, Tailwind.

## Ligar os formulários a hello@yuppi.pt

Os dois formulários (`QuoteRequestForm` e `PartnerForm`) enviam as respostas por
email usando o [Web3Forms](https://web3forms.com) — um serviço gratuito que
recebe o envio do formulário e reencaminha para o teu email, sem precisares de
configurar um servidor de emails.

**Configuração (5 minutos, uma única vez):**

1. Vai a https://web3forms.com
2. Introduz `hello@yuppi.pt` e clica em "Create Access Key"
3. Vais receber um email de confirmação com a tua chave de acesso (um código
   tipo `a1b2c3d4-...`)
4. Copia `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
5. Cola a chave no `.env.local`:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=a1b2c3d4-...
   ```
6. Reinicia o `npm run dev` para carregar a variável de ambiente

**Em produção (Vercel ou Hostinger):** adiciona a mesma variável de ambiente
(`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`) nas definições do projeto — não fica
guardada no código nem no repositório Git.

**Fotografias e vídeos:** em vez de upload direto, o formulário de parceiros
pede um link Dropbox ou Google Drive (sem marca de água, sem contactos
visíveis). Isto evita problemas de limite de tamanho de anexo e mantém o
controlo do candidato sobre o que partilha.

## Proteger o /admin/orcamento

A ferramenta de propostas (`/admin/orcamento`) está protegida por autenticação
básica (utilizador + password) via `middleware.ts`. Sem configurar isto, a
página fica **bloqueada** (por segurança — falha fechada, não aberta).

No `.env.local`:
```
ADMIN_USER=o-teu-utilizador
ADMIN_PASSWORD=uma-password-forte
```

Em produção (Vercel/Hostinger), adiciona as mesmas duas variáveis nas
definições de ambiente do projeto. Ao aceder a `/admin/orcamento`, o browser
mostra um popup nativo a pedir estas credenciais — não há ecrã de login
customizado, é autenticação HTTP standard.

Isto não é um sistema de contas com múltiplos utilizadores — é uma fechadura
simples para a fase de validação. Se um dia precisares de dar acesso a mais
pessoas com permissões diferentes, isso já pede um sistema de autenticação a
sério (ligado ao Supabase, por exemplo).

## Correr localmente

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estrutura

```
app/
  layout.tsx          — fonts, metadata global, JSON-LD Organization
  page.tsx             — Homepage
  categorias/
    page.tsx            — página dedicada às categorias
  torna-te-parceiro/
    page.tsx            — página de recrutamento de parceiros
  contactos/
    page.tsx            — email + telefone
  sitemap.ts / robots.ts — SEO técnico (metadata routes do Next.js)
  globals.css
components/
  Navbar.tsx / Footer.tsx
  Confetti.tsx          — motivo assinatura (constelação de confetti), usado com moderação
  Reveal.tsx             — scroll-reveal via IntersectionObserver
  QuoteRequestForm.tsx   — formulário "Pedir Orçamento" (família)
  PartnerForm.tsx        — formulário de candidatura de parceiro
lib/
  submitForm.ts          — helper partilhado para envio via Web3Forms
```

## Decisões de arquitetura

- **Route groups por audiência**: quando o Partner Portal for integrado neste
  repo, sugiro mover este conteúdo para `app/(public)/` e o portal para
  `app/(portal)/`, partilhando `components/ui`, Tailwind config e o cliente
  Supabase. Isto evita duplicar componentes à medida que cresce para
  Motor de Reservas → Dashboard Cliente → Backoffice.
- **Formulários via Web3Forms (solução provisória)**: `QuoteRequestForm` e
  `PartnerForm` enviam diretamente para hello@yuppi.pt via Web3Forms (ver
  secção acima). Isto evita depender de um backend próprio nesta fase de
  validação. Quando o Partner Portal e a tabela `partner_applications` (ou
  equivalente) estiverem prontos no Supabase, substituir `lib/submitForm.ts`
  por uma chamada direta à base de dados — os formulários já enviam todos os
  campos com `name=` correspondentes, por isso a troca é local a esse ficheiro.

## Por fazer antes de produção

- [ ] Substituir `og-image.png`, favicons e `apple-touch-icon.png` gerados
      automaticamente por versões finais desenhadas, se desejado (já usam os
      logótipos finais fornecidos).
- [ ] Criar a chave Web3Forms e configurar `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
      em produção (ver secção "Ligar os formulários" acima).
- [ ] Confirmar domínio final em `SITE_URL` (`app/layout.tsx`,
      `app/sitemap.ts`, `app/robots.ts`, `torna-te-parceiro/page.tsx`) —
      atualmente `https://www.yuppi.pt`.
- [ ] Quando as páginas de cidade (SEO programático) forem criadas,
      adicioná-las a `app/sitemap.ts` e ligar a partir do footer.
- [ ] Correr Lighthouse em produção (Vercel) e confirmar >95 em todas as
      métricas — o código foi escrito para isso (fonts otimizadas via
      `next/font`, imagens via `next/image`, sem JS desnecessário no
      cliente), mas vale confirmar após deploy real.
- [ ] Rever textos legais (política de privacidade, termos) antes de captar
      emails/candidaturas reais.
