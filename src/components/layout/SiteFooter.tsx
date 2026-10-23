import { Footer, Text, type FooterColumn } from "assets-design-system";
import { copy } from "@/content/copy";
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
    <div className="site-footer bg-primary-700 text-white">
      <span aria-hidden className="tenun-dots opacity-40" />
      <Footer
        className="reveal mx-auto max-w-[1440px] bg-primary-700 px-gutter py-16"
        logo={
          <div className="flex flex-col">
            <Text as="span" variant="b4" className="tracking-[0.2em] text-primary-200 uppercase">
              {copy.footer.eyebrow}
            </Text>
            <Text as="span" variant="h5" className="font-display font-normal text-white">
              {copy.footer.brand}
            </Text>
          </div>
        }
        description={
          <span className="text-neutral-300">
            {copy.footer.description}
          </span>
        }
        columns={columns}
      />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-white/10 px-gutter pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] text-b4 text-neutral-300">
        <span>{copy.footer.copyright}</span>
      </div>
    </div>
  );
}
