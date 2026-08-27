import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import DirectionCard from "@/components/DirectionCard";
import { directions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Yo‘nalishlar — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani yo‘nalishlari: IT va dasturlash, Robototexnika, Ingliz tili, Ijodiy yo‘nalishlar.",
};

export default function YonalishlarPage() {
  return (
    <>
      <PageHero
        eyebrow="YO‘NALISHLAR"
        title={<>Kelajak uchun <span>zarur ko‘nikmalar</span></>}
        description="Markazimizda yoshlar o‘z qiziqishlariga mos yo‘nalishni tanlab, bilim va ko‘nikmalarini rivojlantirishlari mumkin."
      />

      <section className="section">
        <div className="container">
          <div className="program-grid">
            {directions.map((direction, index) => (
              <DirectionCard
                key={direction.slug}
                number={`0${index + 1}`}
                symbol={direction.symbol}
                title={direction.title}
                description={direction.shortDescription}
                href={`/yonalishlar/${direction.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
