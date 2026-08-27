-- 0001_create_directions.sql
-- Creates public.directions: the catalog of program "yo'nalishlar" shown on the site.
-- This migration only creates and seeds the table. Nothing in the app reads from it yet.

-- gen_random_uuid() is built into Postgres 13+, but Supabase projects created from
-- older templates may still rely on pgcrypto for it. Enabling it is a no-op if already present.
create extension if not exists "pgcrypto";

create table public.directions (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  title              text not null,
  short_description  text not null,
  description        text not null,
  symbol             text not null,
  is_active          boolean not null default true,
  sort_order         integer not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  constraint directions_sort_order_check check (sort_order >= 0)
);

comment on table public.directions is 'Program directions ("yo''nalishlar") shown on the public site.';

-- The only read pattern the site needs today is "active directions, in display order".
-- A partial index keeps it small (inactive rows are never indexed here) and serves
-- exactly that query without adding an index for access patterns that don't exist yet.
create index directions_active_sort_order_idx
  on public.directions (sort_order)
  where is_active = true;

-- Row Level Security -----------------------------------------------------------

alter table public.directions enable row level security;

-- Public (anon + authenticated) clients may only read active directions.
-- No insert/update/delete policies are defined, so those operations are denied
-- by default under RLS for anon/authenticated. Admin writes will go through a
-- protected server-side mechanism (e.g. service_role on the server) added later.
create policy "Public can read active directions"
  on public.directions
  for select
  to public
  using (is_active = true);

-- updated_at maintenance ---------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger directions_set_updated_at
  before update on public.directions
  for each row
  execute function public.set_updated_at();

-- Seed data: the 4 directions currently hardcoded in lib/content.ts ----------------

insert into public.directions (slug, title, short_description, description, symbol, sort_order)
values
  (
    'it-dasturlash',
    'IT va dasturlash',
    'Zamonaviy dasturlash va raqamli ko‘nikmalar',
    'Bu yo‘nalish dasturlash asoslari, raqamli tafakkur va zamonaviy texnologiyalar bilan tanishishni istagan yoshlar uchun mo‘ljallangan. Mashg‘ulotlar davomida amaliy loyihalar orqali mustaqil fikrlash va muammolarni hal qilish ko‘nikmalari rivojlantiriladi.',
    '⌘',
    1
  ),
  (
    'robototexnika',
    'Robototexnika',
    'Amaliy loyihalar va muhandislik fikrlashi',
    'Robototexnika yo‘nalishi texnika va muhandislikka qiziqqan yoshlarni jamlaydi. O‘quvchilar amaliy loyihalar ustida ishlab, jamoada ishlash va ijodiy yechimlar topish tajribasini orttiradilar.',
    '⚙',
    2
  ),
  (
    'ingliz-tili',
    'Ingliz tili',
    'Muloqot va xalqaro imkoniyatlar uchun til',
    'Ingliz tili yo‘nalishi yoshlarning xalqaro muloqot ko‘nikmalarini rivojlantirishga qaratilgan. Mashg‘ulotlarda tilni amaliyotda qo‘llash, so‘zlashuv va o‘zaro muloqotga alohida e’tibor qaratiladi.',
    'A',
    3
  ),
  (
    'ijodiy',
    'Ijodiy yo‘nalishlar',
    'Ijodkorlik, yangi g‘oyalar va jamoaviy ish',
    'Ijodiy yo‘nalishlar o‘z iste’dodini namoyon qilishni istagan yoshlar uchun imkoniyat yaratadi. Bu yerda ijodiy fikrlash, yangi g‘oyalarni ilgari surish va jamoaviy loyihalar ustida ishlash qo‘llab-quvvatlanadi.',
    '✦',
    4
  )
on conflict (slug) do nothing;
