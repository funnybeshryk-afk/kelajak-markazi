"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type DirectionCardProps = {
  number: string;
  symbol: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string | null;
};

export default function DirectionCard({ number, symbol, title, description, href, imageUrl }: DirectionCardProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !failed;

  return (
    <Link href={href} className="program-card">
      <div className="program-number">{number}</div>
      <div className="program-media">
        {showImage && (
          <Image
            src={imageUrl as string}
            alt={title}
            fill
            sizes="(max-width: 1050px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
            onError={() => setFailed(true)}
          />
        )}
        <span className="program-symbol">{symbol}</span>
      </div>
      <div className="program-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="program-card-cta">Batafsil →</span>
      </div>
    </Link>
  );
}
