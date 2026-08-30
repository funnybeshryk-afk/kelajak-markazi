import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Tadbirlar — Kelajak Markazi",
  description: "Kelajak Markazi Beshariq tumani tadbirlari.",
};

type EventRow = {
  id: string;
  event_date: string;
  title: string;
  text: string;
};

const UZ_MONTHS = [
  "YANVAR", "FEVRAL", "MART", "APREL", "MAY", "IYUN",
  "IYUL", "AVGUST", "SENTYABR", "OKTYABR", "NOYABR", "DEKABR",
];

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: String(d.getUTCDate()).padStart(2, "0"),
    month: UZ_MONTHS[d.getUTCMonth()],
  };
}

export default async function TadbirlarPage() {
  const supabase = await createClient();

  // Computed fresh on every request (page is already dynamic) — UTC-based to
  // match how event_date is otherwise treated in this file (formatEventDate).
  const todayStr = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("events")
    .select("id, event_date, title, text")
    .eq("is_active", true)
    .gte("event_date", todayStr)
    .order("event_date", { ascending: true })
    .returns<EventRow[]>();

  if (error) {
    // Xatoni yashirmaymiz — server logida ko'rinadi, foydalanuvchiga esa xavfsiz xabar chiqadi.
    console.error("Supabase: tadbirlarni yuklashda xatolik:", error);
  }

  const events = data ?? [];

  return (
    <>
      <PageHero
        eyebrow="TADBIRLAR"
        title={<>Yaqinlashayotgan <span>tadbirlar</span></>}
        description="Markazimizda o‘tkaziladigan tadbirlar, ochiq darslar va musobaqalar haqida ma’lumot."
      />

      <section className="section">
        <div className="container">
          {error ? (
            <p className="page-note">
              <strong>Diqqat:</strong> tadbirlarni yuklab bo‘lmadi. Iltimos, sahifani keyinroq qayta yuklab ko‘ring.
            </p>
          ) : events.length === 0 ? (
            <p className="page-note">Hozircha rejalashtirilgan tadbirlar mavjud emas.</p>
          ) : (
            <div className="panel events-timeline">
              {events.map((item) => {
                const { day, month } = formatEventDate(item.event_date);
                return <EventCard key={item.id} day={day} month={month} title={item.title} text={item.text} />;
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
