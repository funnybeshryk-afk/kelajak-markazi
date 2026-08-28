import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import NewsCard from "@/components/NewsCard";
import EventCard from "@/components/EventCard";
import DirectionCard from "@/components/DirectionCard";
import HeroPhoto from "@/components/HeroPhoto";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

const GALLERY_BUCKET = "gallery";

type DirectionRow = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  symbol: string;
};

type NewsRow = {
  id: string;
  published_at: string;
  title: string;
  text: string;
  kind: string;
};

type EventRow = {
  id: string;
  event_date: string;
  title: string;
  text: string;
};

type GalleryRow = {
  id: string;
  title: string;
  image_url: string | null;
};

type GalleryTitleRow = {
  title: string;
  image_url: string | null;
};

// Matches the fixed 4-slot bento layout in globals.css (.gallery-one spans two
// rows, .gallery-four spans two columns) — positional, not a cyclic pattern.
const GALLERY_POSITION_CLASSES = ["gallery-one", "gallery-two", "gallery-three", "gallery-four"];

const UZ_MONTHS = [
  "YANVAR", "FEVRAL", "MART", "APREL", "MAY", "IYUN",
  "IYUL", "AVGUST", "SENTYABR", "OKTYABR", "NOYABR", "DEKABR",
];

function formatNewsDate(iso: string) {
  const d = new Date(iso);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = UZ_MONTHS[d.getUTCMonth()];
  return `${day} ${month}, ${d.getUTCFullYear()}`;
}

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: String(d.getUTCDate()).padStart(2, "0"),
    month: UZ_MONTHS[d.getUTCMonth()],
  };
}

export default async function Home() {
  const supabase = await createClient();
  const publicSupabase = createPublicClient();

  // Computed fresh on every request (page is already dynamic) — UTC-based to
  // match how event_date is otherwise treated in this file (formatEventDate).
  const todayStr = new Date().toISOString().slice(0, 10);

  const [directionsResult, newsResult, eventsResult, galleryResult, directionPhotosResult] = await Promise.all([
    supabase
      .from("directions")
      .select("id, slug, title, short_description, description, symbol")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .returns<DirectionRow[]>(),
    supabase
      .from("news")
      .select("id, published_at, title, text, kind")
      .eq("is_active", true)
      .order("published_at", { ascending: false })
      .limit(3)
      .returns<NewsRow[]>(),
    supabase
      .from("events")
      .select("id, event_date, title, text")
      .eq("is_active", true)
      .gte("event_date", todayStr)
      .order("event_date", { ascending: true })
      .limit(3)
      .returns<EventRow[]>(),
    publicSupabase
      .from("gallery_items")
      .select("id, title, image_url")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(4)
      .returns<GalleryRow[]>(),
    // Independent of the gallery teaser query above (which is intentionally
    // capped to 4) — used only to match direction photos by title.
    publicSupabase
      .from("gallery_items")
      .select("title, image_url")
      .eq("is_active", true)
      .returns<GalleryTitleRow[]>(),
  ]);

  if (directionsResult.error) {
    console.error("Supabase: yo‘nalishlarni yuklashda xatolik:", directionsResult.error);
  }
  if (newsResult.error) {
    console.error("Supabase: yangiliklarni yuklashda xatolik:", newsResult.error);
  }
  if (eventsResult.error) {
    console.error("Supabase: tadbirlarni yuklashda xatolik:", eventsResult.error);
  }
  if (galleryResult.error) {
    console.error("Supabase: galereyani yuklashda xatolik:", galleryResult.error);
  }
  if (directionPhotosResult.error) {
    console.error("Supabase: yo‘nalish rasmlarini yuklashda xatolik:", directionPhotosResult.error);
  }

  const directions = directionsResult.data ?? [];
  const news = newsResult.data ?? [];
  const events = eventsResult.data ?? [];
  const galleryItems = galleryResult.data ?? [];

  // Real photos matched by exact title against gallery_items — no new
  // table/column, reuses the existing bucket.
  const directionPhotoByTitle = new Map(
    (directionPhotosResult.data ?? [])
      .filter((row): row is GalleryTitleRow & { image_url: string } => Boolean(row.image_url))
      .map((row) => [row.title, publicSupabase.storage.from(GALLERY_BUCKET).getPublicUrl(row.image_url).data.publicUrl])
  );

  // Active gallery item with the lowest sort_order — reuses the same query
  // above rather than a second round trip, since galleryItems is already
  // ordered ascending by sort_order.
  const heroGalleryItem = galleryItems[0];
  const heroImageUrl = heroGalleryItem?.image_url
    ? publicSupabase.storage.from(GALLERY_BUCKET).getPublicUrl(heroGalleryItem.image_url).data.publicUrl
    : null;

  return (
    <>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              Kelajakni
              <br />
              <span>birgalikda</span>
              <br />
              yaratamiz.
            </h1>
            <p>
              Zamonaviy ta’lim, innovatsion g‘oyalar va yangi imkoniyatlar
              sari birgalikda qadam tashlaymiz.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/biz-haqimizda">Biz haqimizda <span>→</span></Link>
              <Link className="button secondary" href="/yangiliklar">Yangiliklarni ko‘rish</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orb orb-one" />
            <div className="hero-orb orb-two" />
            <div className="hero-card main-photo">
              <HeroPhoto imageUrl={heroImageUrl} />
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container benefits-grid">
          <div className="benefit">
            <div className="benefit-icon">▣</div>
            <div><strong>Zamonaviy ta’lim</strong><span>Innovatsion metodlar va amaliy bilim</span></div>
          </div>
          <div className="benefit">
            <div className="benefit-icon">♙</div>
            <div><strong>Malakali ustozlar</strong><span>Soha mutaxassislaridan ta’lim</span></div>
          </div>
          <div className="benefit">
            <div className="benefit-icon">⌂</div>
            <div><strong>Qulay muhit</strong><span>Zamonaviy sinfxonalar va texnologiyalar</span></div>
          </div>
          <div className="benefit">
            <div className="benefit-icon">🏆</div>
            <div><strong>Kelajak sari qadam</strong><span>Bilim, ko‘nikma va yutuqlar sari</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container about-grid">
          <div>
            <div className="section-label">BIZ HAQIMIZDA</div>
            <h2>Yoshlar uchun <span>yangi imkoniyatlar</span> maskani</h2>
          </div>
          <div className="about-text">
            <p>
              Kelajak Markazi — yoshlarning bilim olishi, yangi ko‘nikmalarni
              egallashi va o‘z iste’dodini namoyon qilishi uchun yaratilgan
              zamonaviy ta’lim maskani.
            </p>
            <Link className="text-link" href="/biz-haqimizda">Batafsil ma’lumot →</Link>
          </div>
        </div>
      </section>

      <section className="section programs-section" id="programs">
        <div className="container">
          <SectionTitle
            label="YO‘NALISHLAR"
            title={<>Kelajak uchun <span>zarur ko‘nikmalar</span></>}
            action={{ href: "/yonalishlar", label: "Barcha yo‘nalishlar" }}
          />

          {directionsResult.error ? (
            <p className="page-note">
              <strong>Diqqat:</strong> yo‘nalishlar ro‘yxatini yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
            </p>
          ) : directions.length === 0 ? (
            <p className="page-note">Hozircha faol yo‘nalishlar mavjud emas.</p>
          ) : (
            <div className="program-grid">
              {directions.map((direction, index) => (
                <DirectionCard
                  key={direction.id}
                  number={`0${index + 1}`}
                  symbol={direction.symbol}
                  title={direction.title}
                  description={direction.short_description}
                  href={`/yonalishlar/${direction.slug}`}
                  imageUrl={directionPhotoByTitle.get(direction.title) ?? null}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section news-section" id="news">
        <div className="container">
          <SectionTitle
            label="SO‘NGGI YANGILIKLAR"
            title={<>Markaz hayotidan <span>yangiliklar</span></>}
            action={{ href: "/yangiliklar", label: "Barcha yangiliklar" }}
          />

          {newsResult.error ? (
            <p className="page-note">
              <strong>Diqqat:</strong> yangiliklarni yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
            </p>
          ) : news.length === 0 ? (
            <p className="page-note">Hozircha yangiliklar mavjud emas.</p>
          ) : (
            <div className="news-grid">
              {news.map((item, index) => (
                <NewsCard
                  key={item.id}
                  date={formatNewsDate(item.published_at)}
                  title={item.title}
                  text={item.text}
                  kind={item.kind}
                  variant={((index % 3) + 1) as 1 | 2 | 3}
                  href="/yangiliklar"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section events-section" id="events">
        <div className="container split-grid">
          <div className="panel">
            <div className="section-label">TADBIRLAR</div>
            <div className="panel-title">
              <h2>Yaqinlashayotgan <span>tadbirlar</span></h2>
              <Link className="text-link" href="/tadbirlar">Barchasi →</Link>
            </div>

            {eventsResult.error ? (
              <p className="page-note">
                <strong>Diqqat:</strong> tadbirlarni yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
              </p>
            ) : events.length === 0 ? (
              <p className="page-note">Hozircha rejalashtirilgan tadbirlar mavjud emas.</p>
            ) : (
              events.map((item) => {
                const { day, month } = formatEventDate(item.event_date);
                return <EventCard key={item.id} day={day} month={month} title={item.title} text={item.text} />;
              })
            )}
          </div>

          <div className="panel achievements" id="achievements">
            <div className="section-label">YUTUQLARIMIZ</div>
            <div className="panel-title">
              <h2>Faxrli <span>natijalar</span></h2>
              <Link className="text-link" href="/yutuqlar">Barchasi →</Link>
            </div>

            <p className="page-note">Hozircha bu bo‘limda aniq ma’lumotlar mavjud emas.</p>
          </div>
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="container">
          <SectionTitle
            label="GALEREYA"
            title={<>Markazimiz <span>hayotidan lavhalar</span></>}
            action={{ href: "/galereya", label: "Barcha foto va videolar" }}
          />

          {galleryResult.error ? (
            <p className="page-note">
              <strong>Diqqat:</strong> galereya lavhalarini yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
            </p>
          ) : galleryItems.length === 0 ? (
            <p className="page-note">Hozircha galereya lavhalari mavjud emas.</p>
          ) : (
            <div className="gallery-grid">
              {galleryItems.map((item, index) => {
                const imageUrl = item.image_url
                  ? publicSupabase.storage.from(GALLERY_BUCKET).getPublicUrl(item.image_url).data.publicUrl
                  : null;

                return (
                  <div key={item.id} className={`gallery-item ${GALLERY_POSITION_CLASSES[index]}`}>
                    {imageUrl ? (
                      <Image src={imageUrl} alt={item.title} fill style={{ objectFit: "cover" }} />
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="telegram">
        <div className="container telegram-inner">
          <div className="telegram-icon">➤</div>
          <div><strong>Yangiliklarimizdan xabardor bo‘lib boring!</strong><span>Telegram kanalimizga obuna bo‘ling.</span></div>
          <Link className="telegram-button" href="/boglanish">Obuna bo‘lish</Link>
        </div>
      </section>
    </>
  );
}
