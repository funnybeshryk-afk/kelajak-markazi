import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryTile from "@/components/GalleryTile";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Galereya — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani foto galereyasi.",
};

const GALLERY_BUCKET = "gallery";

type GalleryRow = {
  id: string;
  title: string;
  image_url: string | null;
};

export default async function GalereyaPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_items")
    .select("id, title, image_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .returns<GalleryRow[]>();

  if (error) {
    // Xatoni yashirmaymiz — server logida ko'rinadi, foydalanuvchiga esa xavfsiz xabar chiqadi.
    console.error("Supabase: galereyani yuklashda xatolik:", error);
  }

  const galleryItems = (data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    imageUrl: item.image_url
      ? supabase.storage.from(GALLERY_BUCKET).getPublicUrl(item.image_url).data.publicUrl
      : null,
  }));

  return (
    <>
      <PageHero
        eyebrow="GALEREYA"
        title={<>Markazimiz <span>hayotidan lavhalar</span></>}
        description="Markaz mashg‘ulotlari, tadbirlari va o‘quvchilarimizning fotolavhalari."
      />

      <section className="section">
        <div className="container">
          {error ? (
            <p className="page-note">
              <strong>Diqqat:</strong> galereyani yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
            </p>
          ) : galleryItems.length === 0 ? (
            <p className="page-note">Hozircha galereya bo‘sh.</p>
          ) : (
            <div className="gallery-page-grid">
              {galleryItems.map((item, index) => (
                <GalleryTile
                  key={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  variant={((index % 4) + 1) as 1 | 2 | 3 | 4}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
