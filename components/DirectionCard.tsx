import Link from "next/link";

type DirectionCardProps = {
  number: string;
  symbol: string;
  title: string;
  description: string;
  href: string;
};

export default function DirectionCard({ number, symbol, title, description, href }: DirectionCardProps) {
  return (
    <Link href={href} className="program-card">
      <div className="program-number">{number}</div>
      <div className="program-symbol">{symbol}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="program-card-cta">Batafsil →</span>
    </Link>
  );
}
