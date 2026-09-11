# Yuppi — checklist antes de publicar e pedir AdSense

## Publicação sem publicidade visível
- `NEXT_PUBLIC_ADSENSE_CLIENT` deve ficar vazio enquanto a conta AdSense não estiver configurada.
- Os componentes `AdUnit` permanecem no código, mas devolvem `null` sem um publisher ID. Não aparecem caixas, placeholders ou texto "AdSense" no site público.
- Quando o AdSense estiver aprovado/configurado, preencher `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...` no ambiente de produção. Os espaços preparados passam então a renderizar anúncios.

## Conteúdo e UX
- A Yuppi apresenta-se como diretório e recurso editorial, não como agência/intermediário.
- O footer não mostra email, WhatsApp, YouTube ou TikTok.
- O email `hello@yuppi.pt` é usado na página "Torna-te parceiro".
- As categorias do footer apontam diretamente para as páginas de serviço.
- Cards usam "Ver perfil" / "Ver profissionais", não "Ver serviço".
- Fotografias de profissionais devem ser URLs de imagens que a Yuppi esteja autorizada a apresentar; não é necessário receber ficheiros.
- Se não existir imagem, o perfil usa fallback visual em vez de uma imagem quebrada.

## CMS
1. Criar projeto Supabase.
2. Executar `supabase-schema.sql`.
3. Copiar `.env.example` para `.env.local`.
4. Definir `SUPABASE_URL`, `SUPABASE_SECRET_KEY` (recomendado; a chave legacy `SUPABASE_SERVICE_ROLE_KEY` continua aceite temporariamente), `ADMIN_USER` e `ADMIN_PASSWORD`.
5. Executar `npm run cms:seed` uma vez para importar os perfis atuais.
6. Em produção, abrir `/admin` e gerir perfis sem novo deploy.

## Scraper
- URLs de descoberta em `scripts/sources.txt`.
- Executar `npm run scrape:professionals`.
- Rever candidatos antes de publicar.
- O scraper recolhe metadados públicos e `og:image`; não publica automaticamente.

## AdSense / EEA
Antes de servir publicidade personalizada a utilizadores no EEE, Reino Unido ou Suíça, configurar uma CMP certificada pelo Google e o consentimento necessário para o setup de AdSense. Rever também a política de privacidade/cookies e a configuração de consent mode/CMP aplicável.

## Verificação local
```bash
npm install
npm run build
npm run dev
```

Abrir `http://localhost:3000`.
