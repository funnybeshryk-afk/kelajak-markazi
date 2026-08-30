import Image from "next/image";
import Link from "next/link";
import { getMailtoUrl, getTelUrl, getTelegramUrl, type SiteSettings } from "@/lib/site-settings";
import { createPublicClient } from "@/lib/supabase/public";

type FooterProps = {
  siteSettings: SiteSettings;
};

type DirectionLink = {
  id: string;
  slug: string;
  title: string;
};

// Same 4 directions the footer has always linked to — used only if Supabase is
// unreachable or returns no active rows, so the footer nav never goes blank.
const FALLBACK_DIRECTIONS: DirectionLink[] = [
  { id: "fallback-it-dasturlash", slug: "it-dasturlash", title: "IT va dasturlash" },
  { id: "fallback-robototexnika", slug: "robototexnika", title: "Robototexnika" },
  { id: "fallback-ingliz-tili", slug: "ingliz-tili", title: "Ingliz tili" },
  { id: "fallback-ijodiy", slug: "ijodiy", title: "Ijodiy yo‘nalishlar" },
];

export default async function Footer({ siteSettings }: FooterProps) {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("directions")
    .select("id, slug, title")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .returns<DirectionLink[]>();

  if (error) {
    console.error("Supabase: footer uchun yo‘nalishlarni yuklashda xatolik:", error);
  }

  const directions = data && data.length > 0 ? data : FALLBACK_DIRECTIONS;
  const telegramUrl = getTelegramUrl(siteSettings.telegram);
  const telUrl = getTelUrl(siteSettings.phone);
  const mailtoUrl = getMailtoUrl(siteSettings.email);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-badge">
            <Image src="/images/logo.png" alt="Kelajak Markazi Beshariq tumani" width={140} height={77} />
          </div>
          <p>Kelajak Markazi Beshariq tumani yoshlarga bilim va imkoniyatlar uchun o‘z eshiklarini ochadi.</p>
        </div>
        <div>
          <h4>Sayt bo‘limlari</h4>
          <Link href="/">Bosh sahifa</Link>
          <Link href="/biz-haqimizda">Biz haqimizda</Link>
          <Link href="/yonalishlar">Yo‘nalishlar</Link>
          <Link href="/yangiliklar">Yangiliklar</Link>
          <Link href="/tadbirlar">Tadbirlar</Link>
          <Link href="/yutuqlar">Yutuqlar</Link>
          <Link href="/galereya">Galereya</Link>
          <Link href="/boglanish">Bog‘lanish</Link>
        </div>
        <div>
          <h4>Yo‘nalishlarimiz</h4>
          {directions.map((direction) => (
            <Link key={direction.id} href={`/yonalishlar/${direction.slug}`}>
              {direction.title}
            </Link>
          ))}
        </div>
        <div>
          <h4>Bog‘lanish</h4>
          <p>📍 {siteSettings.address}</p>
          <a href={telUrl}>☎️ {siteSettings.phone}</a>
          <a href={mailtoUrl}>✉️ {siteSettings.email}</a>
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer">➤ {siteSettings.telegram}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Kelajak Markazi Beshariq tumani. Barcha huquqlar himoyalangan.</span>
      </div>
    </footer>
  );
}
