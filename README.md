# Yuppi — Diretório de animação infantil

A Yuppi é um diretório editorial de profissionais, empresas e espetáculos para festas infantis em Portugal.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Produção

```bash
npm run build
npm start
```

## Descoberta de profissionais

```bash
npm run scrape:professionals
```

O scraper recolhe apenas metadados públicos de websites oficiais previamente selecionados. Os perfis publicados em `content/profissionais/` usam resumos originais da Yuppi; não copiamos em massa texto, imagens ou avaliações de terceiros.

## Google AdSense

Os espaços publicitários já estão posicionados no site e aparecem como placeholders enquanto o AdSense não está configurado.

Posições atuais:

- Homepage: abaixo do hero.
- Homepage: entre categorias e diretório.
- Diretório: abaixo da introdução.
- Página categoria + cidade: abaixo da introdução.
- Perfil individual: entre o conteúdo do perfil e a galeria/CTA.
- Página "Adicionar o teu negócio": abaixo do cabeçalho.

Configuração através de `.env.local`:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT=
```
