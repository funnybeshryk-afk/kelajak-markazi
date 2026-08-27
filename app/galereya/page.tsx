import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Galereya — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani foto galereyasi.",
};

type GalleryItem = {
  id: number;
  label: string;
  src?: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, label: "IT mashg‘ulotlari" },
  { id: 2, label: "Robototexnika" },
  { id: 3, label: "Ingliz tili darslari" },
  { id: 4, label: "Ijodiy mashg‘ulotlar" },
  { id: 5, label: "Tadbirlar" },
  { id: 6, label: "O‘quvchilarimiz" },
  { id: 7, label: "Markaz muhiti" },
  { id: 8, label: "Jamoaviy loyihalar" },
];

export default function GalereyaPage() {
  return (
    <>
      <PageHero
        eyebrow="GALEREYA"
        title={<>Markazimiz <span>hayotidan lavhalar</span></>}
        description="Markaz mashg‘ulotlari, tadbirlari va o‘quvchilarimizning fotolavhalari. Hozircha bu yerda vaqtinchalik rasm o‘rnini bosuvchi bloklar joylashtirilgan."
      />

      <section className="section">
        <div className="container">
          <div className="gallery-page-grid">
            {galleryItems.map((item, index) => (
              <div key={item.id} className={`gallery-tile gallery-tile-${(index % 4) + 1}`}>
                {item.src ? (
                  <Image src={item.src} alt={item.label} fill style={{ objectFit: "cover" }} />
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
