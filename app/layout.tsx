import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettingsStatic } from "@/lib/site-settings";

export const metadata: Metadata = {
  metadataBase: new URL("https://kelajak-markazi.vercel.app"),
  title: "Kelajak Markazi — Beshariq tumani",
  description: "Kelajak Markazi Beshariq tumani — zamonaviy ta’lim, innovatsiya va yoshlar uchun yangi imkoniyatlar.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettingsStatic();

  return (
    <html lang="uz">
      <body>
        <Header />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
