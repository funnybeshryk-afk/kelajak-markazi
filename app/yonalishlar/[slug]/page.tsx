import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DirectionTemplate from "@/components/DirectionTemplate";
import { directions } from "@/lib/content";

type DirectionPageProps = {
  params: Promise<{ slug: string }>;
};

const metaDescriptions: Record<string, string> = {
  "it-dasturlash": "Kelajak Markazi IT va dasturlash yo‘nalishi haqida ma’lumot.",
  "robototexnika": "Kelajak Markazi Robototexnika yo‘nalishi haqida ma’lumot.",
  "ingliz-tili": "Kelajak Markazi Ingliz tili yo‘nalishi haqida ma’lumot.",
  "ijodiy": "Kelajak Markazi Ijodiy yo‘nalishlar bo‘limi haqida ma’lumot.",
};

export function generateStaticParams() {
  return directions.map((direction) => ({ slug: direction.slug }));
}

export async function generateMetadata({ params }: DirectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const direction = directions.find((item) => item.slug === slug);

  if (!direction) {
    return {};
  }

  return {
    title: `${direction.title} — Kelajak Markazi`,
    description: metaDescriptions[slug] ?? `Kelajak Markazi ${direction.title} yo‘nalishi haqida ma’lumot.`,
  };
}

export default async function DirectionPage({ params }: DirectionPageProps) {
  const { slug } = await params;
  const direction = directions.find((item) => item.slug === slug);

  if (!direction) {
    notFound();
  }

  return <DirectionTemplate direction={direction} />;
}
