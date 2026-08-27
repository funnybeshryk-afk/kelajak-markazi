import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Yutuqlar — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani yutuqlari.",
};

const categories = [
  { icon: "📘", title: "Ilmiy yutuqlar" },
  { icon: "🤖", title: "Texnik yutuqlar" },
  { icon: "🎨", title: "Ijodiy yutuqlar" },
  { icon: "⚽", title: "Sport yutuqlari" },
];

export default function YutuqlarPage() {
  return (
    <>
      <PageHero
        eyebrow="YUTUQLAR"
        title={<>Faxrli <span>natijalarimiz</span></>}
        description="Kelajak Markazi o‘quvchilari va yo‘nalishlarining yutuqlari shu sahifada aks ettiriladi."
      />

      <section className="section">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🏆</div>
            <h2>Yutuqlar tez orada shu yerda joylashtiriladi</h2>
            <p>
              Hozircha bu bo‘limda aniq ma’lumotlar mavjud emas. Markazimiz faoliyati davomida
              qo‘lga kiritilgan yutuqlar tasdiqlangach, ular shu sahifada e’lon qilinadi.
            </p>
          </div>

          <div className="achievement-categories">
            {categories.map((category) => (
              <div className="achievement-category" key={category.title}>
                <span>{category.icon}</span>
                <h3>{category.title}</h3>
                <p>Tez orada</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
