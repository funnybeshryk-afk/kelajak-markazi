import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kelajak Markazi — Beshariq tumani",
  description: "Kelajak Markazi Beshariq tumani — zamonaviy ta’lim, innovatsiya va yoshlar uchun yangi imkoniyatlar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
