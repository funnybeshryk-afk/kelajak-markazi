import Link from "next/link";
import type { ReactNode } from "react";

type SectionTitleProps = {
  label: string;
  title: ReactNode;
  description?: string;
  action?: { href: string; label: string };
  align?: "left" | "center";
};

export default function SectionTitle({ label, title, description, action, align = "left" }: SectionTitleProps) {
  return (
    <div className={`section-head${align === "center" ? " section-head-center" : ""}`}>
      <div>
        <div className="section-label">{label}</div>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && (
        <Link className="text-link" href={action.href}>
          {action.label} →
        </Link>
      )}
    </div>
  );
}
