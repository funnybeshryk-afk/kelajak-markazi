import Image from "next/image";
import Link from "next/link";
import { directions } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/images/logo.png" alt="Kelajak Markazi" width={170} height={66} />
          <p>Kelajak Markazi Beshariq tumani yoshlarga bilim va imkoniyatlar uchun o‘z eshiklarini ochadi.</p>
          <div className="socials">
            <span>◉</span>
            <span>◎</span>
            <span>f</span>
          </div>
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
            <Link key={direction.slug} href={`/yonalishlar/${direction.slug}`}>
              {direction.title}
            </Link>
          ))}
        </div>
        <div>
          <h4>Bog‘lanish</h4>
          <p>📍 Beshariq tumani, Farg‘ona viloyati</p>
          <p>☎️ +998 90 123 45 67</p>
          <p>✉️ info@kelajakmarkazi.uz</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Kelajak Markazi Beshariq tumani. Barcha huquqlar himoyalangan.</span>
        <span>O‘zbekcha · Русский · English</span>
      </div>
    </footer>
  );
}
