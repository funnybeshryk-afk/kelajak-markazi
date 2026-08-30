import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Biz haqimizda — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani haqida: maqsadimiz, qadriyatlarimiz va yoshlar uchun imkoniyatlar.",
};

type AboutItemRow = {
  id: string;
  icon: string;
  title: string;
  text: string;
};

export default async function BizHaqimizdaPage() {
  const supabase = await createClient();

  const [valuesResult, opportunitiesResult] = await Promise.all([
    supabase
      .from("about_items")
      .select("id, icon, title, text")
      .eq("kind", "value")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .returns<AboutItemRow[]>(),
    supabase
      .from("about_items")
      .select("id, icon, title, text")
      .eq("kind", "opportunity")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .returns<AboutItemRow[]>(),
  ]);

  if (valuesResult.error) {
    console.error("Supabase: qadriyatlarni yuklashda xatolik:", valuesResult.error);
  }
  if (opportunitiesResult.error) {
    console.error("Supabase: imkoniyatlarni yuklashda xatolik:", opportunitiesResult.error);
  }

  const values = valuesResult.data ?? [];
  const opportunities = opportunitiesResult.data ?? [];

  return (
    <>
      <PageHero
        eyebrow="BIZ HAQIMIZDA"
        title={<>Yoshlar uchun bilim va <span>imkoniyatlar maskani</span></>}
        description="Kelajak Markazi — Beshariq tumani yoshlarining bilim olishi, yangi ko‘nikmalarni egallashi va ijodiy salohiyatini namoyon qilishi uchun yaratilgan zamonaviy ta’lim maskani."
      />

      <section className="section">
        <div className="container about-page-grid">
          <div className="about-page-block about-intro">
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
          {valuesResult.error ? (
            <p className="page-note">
              <strong>Diqqat:</strong> qadriyatlarni yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
            </p>
          ) : values.length === 0 ? (
            <p className="page-note">Hozircha qadriyatlar ro‘yxati bo‘sh.</p>
          ) : (
            <div className="values-grid">
              {values.map((value) => (
                <div className="value-card" key={value.id}>
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              ))}
            </div>
          )}
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
          {opportunitiesResult.error ? (
            <p className="page-note">
              <strong>Diqqat:</strong> imkoniyatlarni yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
            </p>
          ) : opportunities.length === 0 ? (
            <p className="page-note">Hozircha imkoniyatlar ro‘yxati bo‘sh.</p>
          ) : (
            <div className="opportunities-list">
              {opportunities.map((item) => (
                <div className="opportunity-item" key={item.id}>
                  <div className="opportunity-icon">{item.icon}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
