import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Bog‘lanish — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani bilan bog‘lanish uchun aloqa ma’lumotlari.",
};

export default async function BoglanishPage() {
  const siteSettings = await getSiteSettings();

  const contactItems = [
    { icon: "📍", title: "Manzil", value: siteSettings.address },
    { icon: "☎️", title: "Telefon", value: siteSettings.phone },
    { icon: "✉️", title: "Email", value: siteSettings.email },
    { icon: "➤", title: "Telegram", value: siteSettings.telegram },
  ];

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
