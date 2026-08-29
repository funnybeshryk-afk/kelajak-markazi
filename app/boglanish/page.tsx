import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getMailtoUrl, getMapsUrl, getSiteSettings, getTelUrl, getTelegramUrl } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Bog‘lanish — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani bilan bog‘lanish uchun aloqa ma’lumotlari.",
};

export default async function BoglanishPage() {
  const siteSettings = await getSiteSettings();
  const mapsUrl = getMapsUrl(siteSettings.address);

  const contactItems = [
    { icon: "📍", title: "Manzil", value: siteSettings.address, href: mapsUrl, external: true },
    { icon: "☎️", title: "Telefon", value: siteSettings.phone, href: getTelUrl(siteSettings.phone), external: false },
    { icon: "✉️", title: "Email", value: siteSettings.email, href: getMailtoUrl(siteSettings.email), external: false },
    { icon: "➤", title: "Telegram", value: siteSettings.telegram, href: getTelegramUrl(siteSettings.telegram), external: true },
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
              <a
                className="contact-item"
                key={item.title}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="contact-icon">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          <a className="contact-map-placeholder" href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <span>🗺️</span>
            <strong>Xaritada ko‘rish</strong>
            <small>Google Maps orqali manzilimizni ko‘ring.</small>
          </a>
        </div>
      </section>
    </>
  );
}
