import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsCard from "@/components/NewsCard";
import { newsItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Yangiliklar — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani hayotidan so‘nggi yangiliklar.",
};

export default function YangiliklarPage() {
  return (
    <>
      <PageHero
        eyebrow="YANGILIKLAR"
        title={<>Markaz hayotidan <span>yangiliklar</span></>}
        description="Kelajak Markazida bo‘lib o‘tayotgan mashg‘ulotlar, tadbirlar va yutuqlar haqida so‘nggi ma’lumotlar."
      />

      <section className="section">
        <div className="container">
          <p className="page-note">
            <strong>Diqqat:</strong> quyidagi yangiliklar namuna sifatida joylashtirilgan bo‘lib,
            tez orada haqiqiy materiallar bilan almashtiriladi.
          </p>

          <div className="news-grid">
            {newsItems.map((item, index) => (
              <NewsCard
                key={item.id}
                date={item.date}
                title={item.title}
                text={item.text}
                kind={item.kind}
                variant={((index % 3) + 1) as 1 | 2 | 3}
                href="/yangiliklar"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
