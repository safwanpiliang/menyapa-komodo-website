import type { Metadata } from "next";
import { Momo_Trust_Display, Plus_Jakarta_Sans } from "next/font/google";
import "assets-design-system/style.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const momo = Momo_Trust_Display({
  variable: "--font-momo",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Menyapa Komodo · KKN PM UGM 2027",
  description:
    "Etalase dua desa tujuan KKN PM UGM 2027: Golo Mori dan Warloka Pesisir.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} ${momo.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
