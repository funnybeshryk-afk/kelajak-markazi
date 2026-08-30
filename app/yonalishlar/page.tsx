import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import DirectionCard from "@/components/DirectionCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Yo‘nalishlar — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani yo‘nalishlari: IT va dasturlash, Robototexnika, Ingliz tili, Ijodiy yo‘nalishlar.",
};

const GALLERY_BUCKET = "gallery";

type DirectionRow = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  symbol: string;
};

type GalleryTitleRow = {
  title: string;
  image_url: string | null;
};

export default async function YonalishlarPage() {
  const supabase = await createClient();

  const [directionsResult, photosResult] = await Promise.all([
    supabase
      .from("directions")
      .select("id, slug, title, short_description, description, symbol")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .returns<DirectionRow[]>(),
    supabase
      .from("gallery_items")
      .select("title, image_url")
      .eq("is_active", true)
      .returns<GalleryTitleRow[]>(),
  ]);

  const { data, error } = directionsResult;

  if (error) {
    // Xatoni yashirmaymiz — server logida ko'rinadi, foydalanuvchiga esa xavfsiz xabar chiqadi.
    console.error("Supabase: yo‘nalishlarni yuklashda xatolik:", error);
  }
  if (photosResult.error) {
    console.error("Supabase: yo‘nalish rasmlarini yuklashda xatolik:", photosResult.error);
  }

  const directions = data ?? [];

  // Real photos matched by exact title against gallery_items — no new
  // table/column, reuses the existing bucket.
  const photoByTitle = new Map(
    (photosResult.data ?? [])
      .filter((row): row is GalleryTitleRow & { image_url: string } => Boolean(row.image_url))
      .map((row) => [row.title, supabase.storage.from(GALLERY_BUCKET).getPublicUrl(row.image_url).data.publicUrl])
  );

  return (
    <>
      <PageHero
        eyebrow="YO‘NALISHLAR"
        title={<>Kelajak uchun <span>zarur ko‘nikmalar</span></>}
        description="Markazimizda yoshlar o‘z qiziqishlariga mos yo‘nalishni tanlab, bilim va ko‘nikmalarini rivojlantirishlari mumkin."
      />

      <section className="section direction-listing">
        <div className="container">
          {error ? (
            <p className="page-note">
              <strong>Diqqat:</strong> yo‘nalishlar ro‘yxatini yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
            </p>
          ) : directions.length === 0 ? (
            <p className="page-note">Hozircha faol yo‘nalishlar mavjud emas.</p>
          ) : (
            <div className="program-grid">
              {directions.map((direction, index) => (
                <DirectionCard
                  key={direction.id}
                  number={`0${index + 1}`}
                  symbol={direction.symbol}
                  title={direction.title}
                  description={direction.short_description}
                  href={`/yonalishlar/${direction.slug}`}
                  imageUrl={photoByTitle.get(direction.title) ?? null}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
