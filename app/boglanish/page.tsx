import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Bog‘lanish — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani bilan bog‘lanish uchun aloqa ma’lumotlari.",
};

const contactItems = [
  { icon: "📍", title: "Manzil", value: "Beshariq tumani, Farg‘ona viloyati" },
  { icon: "☎️", title: "Telefon", value: "+998 90 123 45 67" },
  { icon: "✉️", title: "Email", value: "info@kelajakmarkazi.uz" },
  { icon: "➤", title: "Telegram", value: "@kelajakmarkazi" },
];

export default function BoglanishPage() {
  return (
    <>
      <PageHero
        eyebrow="BOG‘LANISH"
        title={<>Biz bilan <span>bog‘laning</span></>}
        description="Savol va takliflaringiz bo‘lsa, quyidagi aloqa vositalari orqali murojaat qilishingiz mumkin."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            {contactItems.map((item) => (
              <div className="contact-item" key={item.title}>
                <span className="contact-icon">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                  <em>Vaqtinchalik ma’lumot — tez orada yangilanadi</em>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-map-placeholder">
            <span>🗺️</span>
            <strong>Xarita tez orada qo‘shiladi</strong>
            <small>Manzil tasdiqlangach, shu yerga interaktiv xarita joylashtiriladi.</small>
          </div>
        </div>
      </section>
    </>
  );
}
