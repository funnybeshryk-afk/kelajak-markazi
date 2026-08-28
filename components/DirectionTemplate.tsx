"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";

type Direction = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  symbol: string;
  imageUrl: string | null;
};

export default function DirectionTemplate({ direction }: { direction: Direction }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(direction.imageUrl) && !failed;

  return (
    <>
      <PageHero eyebrow="YO‘NALISH" title={direction.title} description={direction.shortDescription} />

      <section className="section">
        <div className="container direction-grid">
          <div className="direction-image-placeholder">
            {showImage ? (
              <Image
                src={direction.imageUrl as string}
                alt={direction.title}
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                onError={() => setFailed(true)}
              />
            ) : (
              <>
                <span className="direction-symbol">{direction.symbol}</span>
                <strong>{direction.title}</strong>
              </>
            )}
          </div>

          <div className="direction-content">
            <SectionTitle label="YO‘NALISH HAQIDA" title={<>Nima haqida <span>bu yo‘nalish</span></>} />
            <p className="direction-text">{direction.description}</p>
            <Link className="button primary" href="/boglanish">
              Batafsil ma’lumot olish <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section direction-cta">
        <div className="container">
          <SectionTitle
            align="center"
            label="BOSHQA YO‘NALISHLAR"
            title={<>Boshqa <span>yo‘nalishlarimiz</span> bilan ham tanishing</>}
          />
          <div className="direction-cta-actions">
            <Link className="button secondary" href="/yonalishlar">
              Barcha yo‘nalishlar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
