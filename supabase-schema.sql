-- Yuppi CMS / directory database
create extension if not exists pgcrypto;

create table if not exists public.professionals (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nome text not null,
  categorias jsonb not null default '[]'::jsonb,
  localidades jsonb not null default '[]'::jsonb,
  preco_desde text not null default '',
  resumo text not null default '',
  content_html text not null default '',
  cover_image text,
  foto_fonte text,
  fotos jsonb not null default '[]'::jsonb,
  website text,
  instagram text,
  facebook text,
  whatsapp text,
  fonte text,
  tipo_perfil text not null default 'diretorio' check (tipo_perfil in ('diretorio','parceiro')),
  status text not null default 'published' check (status in ('draft','published','archived')),
  atualizado_em timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.scrape_candidates (
  id uuid primary key default gen_random_uuid(),
  url text not null unique,
  nome text,
  descricao text,
  imagem text,
  categoria_sugerida text,
  localidade_sugerida text,
  estado text not null default 'novo' check (estado in ('novo','revisto','publicado','rejeitado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists professionals_status_idx on public.professionals(status);
create index if not exists candidates_estado_idx on public.scrape_candidates(estado);

-- Keep API access locked down. The application uses the server-only service role key.
alter table public.professionals enable row level security;
alter table public.scrape_candidates enable row level security;

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists professionals_updated_at on public.professionals;
create trigger professionals_updated_at before update on public.professionals for each row execute function public.set_updated_at();
drop trigger if exists candidates_updated_at on public.scrape_candidates;
create trigger candidates_updated_at before update on public.scrape_candidates for each row execute function public.set_updated_at();
