-- 0004_create_about_items.sql
-- Creates public.about_items: the "values" and "opportunities" lists on
-- /biz-haqimizda, currently two hardcoded arrays (values, opportunities) in
-- app/biz-haqimizda/page.tsx. Both arrays are structurally identical
-- (icon+title+text), so they share one table with a `kind` discriminator
-- instead of two near-duplicate tables.
-- NOT applied automatically — review and run manually in Supabase Studio,
-- same as 0001/0002/0003.

create table public.about_items (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('value', 'opportunity')),
  icon        text not null,
  title       text not null,
  text        text not null,
  is_active   boolean not null default true,
  sort_order  integer not null default 0 check (sort_order >= 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.about_items is 'Values ("qadriyatlarimiz") and opportunities ("imkoniyatlar") lists shown on /biz-haqimizda, distinguished by kind.';

-- The app queries one kind at a time ("active items of this kind, in display
-- order"), so a composite partial index on (kind, sort_order) serves that
-- exactly, without indexing inactive rows.
create index about_items_active_kind_sort_order_idx
  on public.about_items (kind, sort_order)
  where is_active = true;

-- Row Level Security -----------------------------------------------------------

alter table public.about_items enable row level security;

-- Public (anon + authenticated) clients may only read active items.
-- No insert/update/delete policies are defined, so those operations are denied
-- by default under RLS. Admin writes will go through a protected server-side
-- mechanism added later.
create policy "Public can read active about items"
  on public.about_items
  for select
  to public
  using (is_active = true);

-- updated_at maintenance ---------------------------------------------------------
-- Reuses public.set_updated_at(), created in 0001_create_directions.sql.

create trigger about_items_set_updated_at
  before update on public.about_items
  for each row
  execute function public.set_updated_at();

-- Seed data: the values/opportunities arrays currently hardcoded in
-- app/biz-haqimizda/page.tsx ------------------------------------------------------

insert into public.about_items (kind, icon, title, text, sort_order)
values
  ('value', '◆', 'Bilim va rivojlanish', 'Har bir yoshning bilim olishi va o‘z ustida ishlashini qadrlaymiz.', 1),
  ('value', '◈', 'Hamkorlik', 'Jamoaviy ishlash va o‘zaro qo‘llab-quvvatlashni muhim deb bilamiz.', 2),
  ('value', '✦', 'Ijodkorlik', 'Yangi g‘oyalar va ijodiy yondashuvlarni rag‘batlantiramiz.', 3),
  ('value', '◎', 'Hurmat va ochiqlik', 'Har bir yoshning fikri va tashabbusini hurmat bilan qabul qilamiz.', 4),
  ('opportunity', '▣', 'Yo‘nalishlarni tanlash', 'O‘z qiziqishlariga mos yo‘nalishni tanlab, bilim olish imkoniyati.', 1),
  ('opportunity', '⚙', 'Amaliy mashg‘ulotlar', 'Nazariy bilimlarni amaliyotda qo‘llash uchun loyihalar ustida ishlash.', 2),
  ('opportunity', '◉', 'Tadbir va tanlovlar', 'Markaz tomonidan tashkil etiladigan tadbirlarda faol ishtirok etish.', 3),
  ('opportunity', '✦', 'Ijodiy salohiyat', 'O‘z iste’dodini namoyon qilish va yangi ko‘nikmalarni kashf etish.', 4);
