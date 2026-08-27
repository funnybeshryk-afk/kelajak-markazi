import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import { eventItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tadbirlar — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani tadbirlari.",
};

export default function TadbirlarPage() {
  return (
    <>
      <PageHero
        eyebrow="TADBIRLAR"
        title={<>Yaqinlashayotgan <span>tadbirlar</span></>}
        description="Markazimizda o‘tkaziladigan tadbirlar, ochiq darslar va musobaqalar haqida ma’lumot."
      />

      <section className="section">
        <div className="container">
          <p className="page-note">
            <strong>Diqqat:</strong> quyidagi sana va tadbirlar namuna sifatida keltirilgan bo‘lib,
            haqiqiy voqealarni ifodalamaydi. Aniq jadval tez orada e’lon qilinadi.
          </p>

          <div className="panel">
            {eventItems.map((item) => (
              <EventCard key={item.id} day={item.day} month={item.month} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
