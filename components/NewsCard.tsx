"use client";

import { useState } from "react";
import Image from "next/image";

type NewsCardProps = {
  date: string;
  title: string;
  text: string;
  kind: string;
  variant?: 1 | 2 | 3;
  imageUrl?: string | null;
};

export default function NewsCard({ date, title, text, kind, variant = 1, imageUrl = null }: NewsCardProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !failed;

  return (
    <article className="news-card">
      <div className={showImage ? "news-image" : `news-image image-${variant}`}>
        {showImage && (
          <Image
            src={imageUrl as string}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            onError={() => setFailed(true)}
          />
        )}
        <span>{kind}</span>
      </div>
      <div className="news-content">
        <div className="date">{date}</div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
