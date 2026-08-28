"use client";

import { useState } from "react";
import Image from "next/image";

type HeroPhotoProps = {
  imageUrl: string | null;
};

export default function HeroPhoto({ imageUrl }: HeroPhotoProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !failed;

  if (!showImage) {
    return (
      <div className="photo-placeholder">
        <div className="photo-icon">👩‍💻</div>
        <strong>Kelajak Markazi</strong>
        <span>Yoshlar bilan birga</span>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl as string}
      alt="Kelajak Markazi"
      fill
      priority
      sizes="(max-width: 800px) 100vw, 610px"
      style={{ objectFit: "cover" }}
      onError={() => setFailed(true)}
    />
  );
}
