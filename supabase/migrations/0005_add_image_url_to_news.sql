-- 0005_add_image_url_to_news.sql
-- Adds nullable image_url to public.news, mirroring gallery_items.image_url:
-- NULL until a real photo is set, in which case NewsCard falls back to its
-- existing gradient placeholder (image-1/image-2/image-3).
-- NOT applied automatically — review and run manually in Supabase Studio,
-- same as 0001/0002/0003/0004.

alter table public.news add column image_url text;
