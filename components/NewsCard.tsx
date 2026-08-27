import Link from "next/link";

type NewsCardProps = {
  date: string;
  title: string;
  text: string;
  kind: string;
  href?: string;
  variant?: 1 | 2 | 3;
};

export default function NewsCard({ date, title, text, kind, href = "/yangiliklar", variant = 1 }: NewsCardProps) {
  return (
    <article className="news-card">
      <div className={`news-image image-${variant}`}>
        <span>{kind}</span>
      </div>
      <div className="news-content">
        <div className="date">{date}</div>
        <h3>{title}</h3>
        <p>{text}</p>
        <Link href={href}>Batafsil o‘qish →</Link>
      </div>
    </article>
  );
}
