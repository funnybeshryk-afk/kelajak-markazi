-- 0002_create_site_settings.sql
-- Creates public.site_settings: single source of truth for the site-wide contact
-- info currently hardcoded independently in Header, Footer, and /boglanish.
-- NOT applied automatically — review and run manually (e.g. via Supabase Studio),
-- same as 0001_create_directions.sql.

create table public.site_settings (
  id          uuid primary key default gen_random_uuid(),
  address     text not null,
  phone       text not null,
  email       text not null,
  telegram    text not null,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.site_settings is 'Site-wide contact info (address/phone/email/telegram) shown in Header, Footer and /boglanish.';

-- Exactly one row is expected to be active at a time. A partial unique index on a
-- boolean column enforces "at most one row with is_active = true" at the database
-- level, so the app can safely assume a single active settings row.
create unique index site_settings_single_active_idx
  on public.site_settings (is_active)
  where is_active;

-- Row Level Security -----------------------------------------------------------

alter table public.site_settings enable row level security;

-- Public (anon + authenticated) clients may only read the active settings row.
-- No insert/update/delete policies are defined, so those operations are denied
-- by default under RLS. Admin writes will go through a protected server-side
-- mechanism added later.
create policy "Public can read active site settings"
  on public.site_settings
  for select
  to public
  using (is_active = true);

-- updated_at maintenance ---------------------------------------------------------
-- Reuses public.set_updated_at(), created in 0001_create_directions.sql.

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row
  execute function public.set_updated_at();

-- Seed data: the contact info currently hardcoded in Header/Footer/boglanish -------
-- No secrets here — this is the same publicly-displayed contact info already live
-- on the site today.

insert into public.site_settings (address, phone, email, telegram)
values (
  'Beshariq tumani, Farg‘ona viloyati',
  '+998 90 123 45 67',
  'info@kelajakmarkazi.uz',
  '@kelajakmarkazi'
);
