import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Biz haqimizda — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani haqida: maqsadimiz, qadriyatlarimiz va yoshlar uchun imkoniyatlar.",
};

const values = [
  { icon: "◆", title: "Bilim va rivojlanish", text: "Har bir yoshning bilim olishi va o‘z ustida ishlashini qadrlaymiz." },
  { icon: "◈", title: "Hamkorlik", text: "Jamoaviy ishlash va o‘zaro qo‘llab-quvvatlashni muhim deb bilamiz." },
  { icon: "✦", title: "Ijodkorlik", text: "Yangi g‘oyalar va ijodiy yondashuvlarni rag‘batlantiramiz." },
  { icon: "◎", title: "Hurmat va ochiqlik", text: "Har bir yoshning fikri va tashabbusini hurmat bilan qabul qilamiz." },
];

const opportunities = [
  { icon: "▣", title: "Yo‘nalishlarni tanlash", text: "O‘z qiziqishlariga mos yo‘nalishni tanlab, bilim olish imkoniyati." },
  { icon: "⚙", title: "Amaliy mashg‘ulotlar", text: "Nazariy bilimlarni amaliyotda qo‘llash uchun loyihalar ustida ishlash." },
  { icon: "◉", title: "Tadbir va tanlovlar", text: "Markaz tomonidan tashkil etiladigan tadbirlarda faol ishtirok etish." },
  { icon: "✦", title: "Ijodiy salohiyat", text: "O‘z iste’dodini namoyon qilish va yangi ko‘nikmalarni kashf etish." },
];

export default function BizHaqimizdaPage() {
  return (
    <>
      <PageHero
        eyebrow="BIZ HAQIMIZDA"
        title={<>Yoshlar uchun bilim va <span>imkoniyatlar maskani</span></>}
        description="Kelajak Markazi — Beshariq tumani yoshlarining bilim olishi, yangi ko‘nikmalarni egallashi va ijodiy salohiyatini namoyon qilishi uchun yaratilgan zamonaviy ta’lim maskani."
      />

      <section className="section">
        <div className="container about-page-grid">
          <div className="about-page-block">
            <SectionTitle label="BIZ HAQIMIZDA" title={<>Kelajak Markazi <span>haqida</span></>} />
            <p>
              Kelajak Markazi — Beshariq tumani yoshlari uchun bilim olish, yangi ko‘nikmalar
              egallash va ijodiy salohiyatni namoyon qilish imkonini beruvchi zamonaviy maskan
              sifatida faoliyat yuritadi. Markaz turli yo‘nalishlar orqali yoshlarning shaxsiy
              va kasbiy rivojlanishiga ko‘maklashishni maqsad qilgan.
            </p>
          </div>
          <div className="about-page-block">
            <SectionTitle label="MAQSADIMIZ" title={<>Bizning <span>maqsadimiz</span></>} />
            <p>
              Bizning asosiy maqsadimiz — yoshlarga zamonaviy bilim va ko‘nikmalarni egallash,
              o‘z qiziqishlarini rivojlantirish va kelajakka ishonch bilan qadam qo‘yish uchun
              qulay muhit yaratishdir.
            </p>
          </div>
        </div>
      </section>

      <section className="section programs-section">
        <div className="container">
          <SectionTitle align="center" label="QADRIYATLARIMIZ" title={<>Bizning <span>qadriyatlarimiz</span></>} />
          <div className="values-grid">
            {values.map((value) => (
              <div className="value-card" key={value.title}>
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            align="center"
            label="YOSHLAR UCHUN"
            title={<>Yoshlar uchun <span>imkoniyatlar</span></>}
            description="Kelajak Markazida yoshlar turli yo‘nalishlar bo‘yicha bilim olish, amaliy mashg‘ulotlarda qatnashish va tengdoshlari bilan hamkorlikda ishlash imkoniyatiga ega bo‘ladilar."
          />
          <div className="opportunities-list">
            {opportunities.map((item) => (
              <div className="opportunity-item" key={item.title}>
                <div className="opportunity-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
