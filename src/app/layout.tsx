import type { Metadata, Viewport } from "next";
import { Momo_Trust_Display, Plus_Jakarta_Sans } from "next/font/google";
import "assets-design-system/style.css";
import "./globals.css";
import { copy } from "@/content/copy";

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
  title: copy.site.title,
  description: copy.site.description,
};

// viewport-fit=cover: halaman menggambar sampai ke area notch & home
// indicator; konten dijauhkan dari area itu lewat env(safe-area-inset-*)
// (gutter section, navbar, footer).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Warna status bar / toolbar browser HP = langit di bagian paling atas foto
  // hero (sampel rata-rata 2% teratas foto). Situs belum punya mode gelap,
  // jadi satu nilai untuk kedua skema.
  themeColor: "#2c5a77",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} ${momo.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
