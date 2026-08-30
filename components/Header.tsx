"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/biz-haqimizda", label: "Biz haqimizda" },
  { href: "/yonalishlar", label: "Yo‘nalishlar" },
  { href: "/yangiliklar", label: "Yangiliklar" },
  { href: "/tadbirlar", label: "Tadbirlar" },
  { href: "/yutuqlar", label: "Yutuqlar" },
  { href: "/galereya", label: "Galereya" },
  { href: "/boglanish", label: "Bog‘lanish" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="header">
      <div className="container nav">
        <Link className="brand" href="/">
          <Image src="/images/logo.png" alt="Kelajak Markazi Beshariq tumani" width={180} height={70} priority />
        </Link>

        <nav>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="menu-button"
          aria-label="Menyu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="mobile-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
