import { Footer, Text, type FooterColumn } from "assets-design-system";
import { NAV_LINKS } from "@/lib/links";

// Tautan sosial & kontak masih placeholder (konten dari wireframe lo-fi
// 8024:5285); ganti href "#" dengan akun dan surel tim yang asli.
const columns: FooterColumn[] = [
  {
    key: "menu",
    title: "Menu",
    links: NAV_LINKS.map(({ key, label, href }) => ({ key, label, href })),
  },
  {
    key: "ikuti",
    title: "Ikuti",
    links: [
      { key: "instagram", label: "Instagram", href: "#" },
      { key: "tiktok", label: "TikTok", href: "#" },
    ],
  },
  {
    key: "kontak",
    title: "Kontak",
    links: [
      { key: "surel", label: "Surel tim", href: "#" },
      { key: "lokasi", label: "Golo Mori & Warloka Pesisir", href: "/#dua-desa" },
    ],
  },
];

/*
 * Footer situs — versi sederhana (belum ada desain hi-fi di Figma). Memakai
 * `Footer` assets-design-system dengan latar Primary/700, diawali garis titik
 * motif tenun, dan baris hak cipta di bawahnya.
 */
export function SiteFooter() {
  return (
    <div className="bg-primary-700 text-white">
      <span aria-hidden className="tenun-dots opacity-40" />
      <Footer
        className="mx-auto max-w-[1440px] bg-primary-700 px-5 py-16 md:px-20"
        logo={
          <div className="flex flex-col">
            <Text as="span" variant="b4" className="tracking-[0.2em] text-primary-200 uppercase">
              KKN PM UGM 2027
            </Text>
            <Text as="span" variant="h5" className="font-display font-normal text-white">
              Menyapa Komodo
            </Text>
          </div>
        }
        description={
          <span className="text-neutral-300">
            Etalase dua desa tujuan KKN PM UGM 2027: Golo Mori dan Warloka Pesisir, Kabupaten
            Manggarai Barat, Nusa Tenggara Timur.
          </span>
        }
        columns={columns}
      />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-white/10 px-5 py-6 text-b4 text-neutral-300 md:px-20">
        <span>© 2027 KKN PM UGM · Menyapa Komodo</span>
      </div>
    </div>
  );
}
