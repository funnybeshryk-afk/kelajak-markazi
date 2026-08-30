import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsCard from "@/components/NewsCard";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

export const metadata: Metadata = {
  title: "Yangiliklar — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani hayotidan so‘nggi yangiliklar.",
};

const GALLERY_BUCKET = "gallery";

type NewsRow = {
  id: string;
  published_at: string;
  title: string;
  text: string;
  kind: string;
  image_url: string | null;
};

const UZ_MONTHS = [
  "YANVAR", "FEVRAL", "MART", "APREL", "MAY", "IYUN",
  "IYUL", "AVGUST", "SENTYABR", "OKTYABR", "NOYABR", "DEKABR",
];

function formatNewsDate(iso: string) {
  const d = new Date(iso);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = UZ_MONTHS[d.getUTCMonth()];
  return `${day} ${month}, ${d.getUTCFullYear()}`;
}

export default async function YangiliklarPage() {
  const supabase = await createClient();
  const publicSupabase = createPublicClient();

  const { data, error } = await supabase
    .from("news")
    .select("id, published_at, title, text, kind, image_url")
    .eq("is_active", true)
    .order("published_at", { ascending: false })
    .returns<NewsRow[]>();

  if (error) {
    // Xatoni yashirmaymiz — server logida ko'rinadi, foydalanuvchiga esa xavfsiz xabar chiqadi.
    console.error("Supabase: yangiliklarni yuklashda xatolik:", error);
  }

  const news = data ?? [];

  return (
    <>
      <PageHero
        eyebrow="YANGILIKLAR"
        title={<>Markaz hayotidan <span>yangiliklar</span></>}
        description="Kelajak Markazida bo‘lib o‘tayotgan mashg‘ulotlar, tadbirlar va yutuqlar haqida so‘nggi ma’lumotlar."
      />

      <section className="section">
        <div className="container">
          {error ? (
            <p className="page-note">
              <strong>Diqqat:</strong> yangiliklarni yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
            </p>
          ) : news.length === 0 ? (
            <p className="page-note">Hozircha yangiliklar mavjud emas.</p>
          ) : (
            <div className="news-grid news-grid-featured">
              {news.map((item, index) => {
                const imageUrl = item.image_url
                  ? publicSupabase.storage.from(GALLERY_BUCKET).getPublicUrl(item.image_url).data.publicUrl
                  : null;

                return (
                  <NewsCard
                    key={item.id}
                    date={formatNewsDate(item.published_at)}
                    title={item.title}
                    text={item.text}
                    kind={item.kind}
                    variant={((index % 3) + 1) as 1 | 2 | 3}
                    imageUrl={imageUrl}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
