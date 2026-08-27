-- 0003_create_gallery_items.sql
-- Creates public.gallery_items: the photo catalog for /galereya, currently a
-- hardcoded array of 8 label-only placeholder tiles in app/galereya/page.tsx.
-- NOT applied automatically — review and run manually (e.g. via Supabase Studio),
-- same as 0001_create_directions.sql and 0002_create_site_settings.sql.

create table public.gallery_items (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,          -- was `label` in the hardcoded array
  image_url   text,                   -- nullable: no real photos yet, tile falls back to a label placeholder
  is_active   boolean not null default true,
  sort_order  integer not null default 0 check (sort_order >= 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.gallery_items is 'Photo tiles shown on /galereya. image_url is null until a real photo is uploaded (renders the label placeholder instead).';

-- The only read pattern the site needs is "active tiles, in display order" —
-- same partial-index pattern used for directions/site_settings.
create index gallery_items_active_sort_order_idx
  on public.gallery_items (sort_order)
  where is_active = true;

-- Row Level Security -----------------------------------------------------------

alter table public.gallery_items enable row level security;

-- Public (anon + authenticated) clients may only read active tiles.
-- No insert/update/delete policies are defined, so those operations are denied
-- by default under RLS. Admin writes will go through a protected server-side
-- mechanism added later.
create policy "Public can read active gallery items"
  on public.gallery_items
  for select
  to public
  using (is_active = true);

-- updated_at maintenance ---------------------------------------------------------
-- Reuses public.set_updated_at(), created in 0001_create_directions.sql.

create trigger gallery_items_set_updated_at
  before update on public.gallery_items
  for each row
  execute function public.set_updated_at();

-- Seed data: the 8 placeholder tiles currently hardcoded in app/galereya/page.tsx --
-- image_url left null for all of them — no real photos exist yet.

insert into public.gallery_items (title, sort_order)
values
  ('IT mashg‘ulotlari', 1),
  ('Robototexnika', 2),
  ('Ingliz tili darslari', 3),
  ('Ijodiy mashg‘ulotlar', 4),
  ('Tadbirlar', 5),
  ('O‘quvchilarimiz', 6),
  ('Markaz muhiti', 7),
  ('Jamoaviy loyihalar', 8);
