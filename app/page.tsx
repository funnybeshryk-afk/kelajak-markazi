import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import NewsCard from "@/components/NewsCard";
import EventCard from "@/components/EventCard";
import DirectionCard from "@/components/DirectionCard";
import { directions, newsItems, eventItems } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">BESHARIQ TUMANI</div>
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
              <div className="photo-placeholder">
                <div className="photo-icon">👩‍💻</div>
                <strong>Kelajak Markazi</strong>
                <span>Yoshlar bilan birga</span>
              </div>
            </div>
            <div className="floating-card">
              <span className="floating-icon">✦</span>
              <div>
                <strong>Kelajak sari</strong>
                <small>Har kuni yangi imkoniyat</small>
              </div>
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

      <section className="section news-section" id="news">
        <div className="container">
          <SectionTitle
            label="SO‘NGGI YANGILIKLAR"
            title={<>Markaz hayotidan <span>yangiliklar</span></>}
            action={{ href: "/yangiliklar", label: "Barcha yangiliklar" }}
          />

          <div className="news-grid">
            {newsItems.slice(0, 3).map((item, index) => (
              <NewsCard
                key={item.id}
                date={item.date}
                title={item.title}
                text={item.text}
                kind={item.kind}
                variant={((index % 3) + 1) as 1 | 2 | 3}
                href="/yangiliklar"
              />
            ))}
          </div>
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

            {eventItems.slice(0, 3).map((item) => (
              <EventCard key={item.id} day={item.day} month={item.month} title={item.title} text={item.text} />
            ))}
          </div>

          <div className="panel achievements" id="achievements">
            <div className="section-label">YUTUQLARIMIZ</div>
            <div className="panel-title">
              <h2>Faxrli <span>natijalar</span></h2>
              <Link className="text-link" href="/yutuqlar">Barchasi →</Link>
            </div>

            <div className="achievement"><div className="achievement-icon">🏆</div><div><h3>Informatika olimpiadasi</h3><p>Tuman bosqichida 1-o‘rin</p></div></div>
            <div className="achievement"><div className="achievement-icon">🤖</div><div><h3>Robototexnika musobaqasi</h3><p>Viloyat bosqichida 2-o‘rin</p></div></div>
            <div className="achievement"><div className="achievement-icon">🥇</div><div><h3>Ingliz tili tanlovi</h3><p>Tuman bosqichida 1, 2, 3-o‘rinlar</p></div></div>
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

          <div className="gallery-grid">
            <div className="gallery-item gallery-one"><span>IT mashg‘ulotlari</span></div>
            <div className="gallery-item gallery-two"><span>Robototexnika</span></div>
            <div className="gallery-item gallery-three"><span>O‘quvchilarimiz</span></div>
            <div className="gallery-item gallery-four"><span>Tadbirlar</span></div>
          </div>
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
