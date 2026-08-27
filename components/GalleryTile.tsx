"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryTileProps = {
  title: string;
  imageUrl: string | null;
  variant: 1 | 2 | 3 | 4;
};

export default function GalleryTile({ title, imageUrl, variant }: GalleryTileProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !failed;

  if (!showImage) {
    return (
      <div className="gallery-tile gallery-tile-empty">
        <span>{title}</span>
      </div>
    );
  }

  return (
    <div className={`gallery-tile gallery-tile-${variant}`}>
      <Image
        src={imageUrl as string}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        onError={() => setFailed(true)}
      />
      <span>{title}</span>
    </div>
  );
}
