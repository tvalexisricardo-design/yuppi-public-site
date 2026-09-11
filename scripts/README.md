# Descoberta de profissionais

A Yuppi usa pesquisa de websites públicos para descobrir negócios e profissionais que podem integrar o diretório.

## Scraper

```bash
node scripts/scrape-professionals.mjs
```

O script recolhe apenas metadados públicos básicos de uma lista de websites oficiais: título, descrição meta, URL canónica, categorias e localidades indicadas na configuração.

**Não copia o corpo das páginas, fotografias, avaliações ou textos comerciais para a Yuppi.** Os resultados devem ser revistos antes de publicar um perfil.

Para adicionar um perfil publicado, cria um ficheiro Markdown em `content/profissionais/` com:

- nome
- categorias
- localidades
- resumo original escrito para a Yuppi
- website oficial
- fonte
- data de atualização

A regra é simples: **a Internet é a fonte de descoberta; a Yuppi cria o seu próprio conteúdo editorial.**
