import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DirectionTemplate from "@/components/DirectionTemplate";
import { createPublicClient } from "@/lib/supabase/public";

type DirectionPageProps = {
  params: Promise<{ slug: string }>;
};

// Structurally the same shape DirectionTemplate already expects (see
// components/DirectionTemplate.tsx / lib/content.ts's Direction type) — defined
// locally so this route no longer depends on lib/content.ts at all, even for types.
type DirectionData = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  symbol: string;
  imageUrl: string | null;
};

const GALLERY_BUCKET = "gallery";

const metaDescriptions: Record<string, string> = {
  "it-dasturlash": "Kelajak Markazi IT va dasturlash yo‘nalishi haqida ma’lumot.",
  "robototexnika": "Kelajak Markazi Robototexnika yo‘nalishi haqida ma’lumot.",
  "ingliz-tili": "Kelajak Markazi Ingliz tili yo‘nalishi haqida ma’lumot.",
  "ijodiy": "Kelajak Markazi Ijodiy yo‘nalishlar bo‘limi haqida ma’lumot.",
};

// ISR: pages stay pre-rendered (SSG), but regenerate in the background at most
// once per hour so edits made in Supabase reach the site without a new deploy.
export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createPublicClient();

  try {
    const { data, error } = await supabase
      .from("directions")
      .select("slug")
      .eq("is_active", true);

    if (error) {
      console.error("Supabase: build-time slug ro‘yxatini olishda xatolik:", error);
      return [];
    }

    return (data ?? []).map((row) => ({ slug: row.slug as string }));
  } catch (err) {
    console.error("Supabase: build-time slug ro‘yxatiga ulanib bo‘lmadi:", err);
    return [];
  }
}

export async function generateMetadata({ params }: DirectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createPublicClient();

  const { data } = await supabase
    .from("directions")
    .select("title")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!data) {
    return {};
  }

  return {
    title: `${data.title} — Kelajak Markazi`,
    description: metaDescriptions[slug] ?? `Kelajak Markazi ${data.title} yo‘nalishi haqida ma’lumot.`,
  };
}

export default async function DirectionPage({ params }: DirectionPageProps) {
  const { slug } = await params;
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("directions")
    .select("slug, title, short_description, description, symbol")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Supabase: yo‘nalishni yuklashda xatolik:", error);
  }

  if (!data) {
    notFound();
  }

  // Real photo for this direction, matched by exact title against
  // gallery_items — no new table/column, reuses the existing bucket.
  const { data: photoRow } = await supabase
    .from("gallery_items")
    .select("image_url")
    .eq("title", data.title)
    .eq("is_active", true)
    .maybeSingle();

  const imageUrl = photoRow?.image_url
    ? supabase.storage.from(GALLERY_BUCKET).getPublicUrl(photoRow.image_url).data.publicUrl
    : null;

  const direction: DirectionData = {
    slug: data.slug,
    title: data.title,
    shortDescription: data.short_description,
    description: data.description,
    symbol: data.symbol,
    imageUrl,
  };

  return <DirectionTemplate direction={direction} />;
}
