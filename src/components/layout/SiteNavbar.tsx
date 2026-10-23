"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Gamepad from "@solar-icons/react/ssr/devices/Gamepad";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MobileMenu } from "./MobileMenu";
import { GAME_URL, NAV_LINKS } from "@/lib/links";

// Jarak scroll sebelum navbar berganti ke varian "Close".
const SCROLL_THRESHOLD = 80;

// Section beranda → link navbar yang ditandai saat section itu sedang dilihat.
// `null` = section tanpa link (tidak ada yang ditandai). Tujuan tautannya
// sendiri tetap dari NAV_LINKS.
const SECTION_LINKS: { id: string; key: string | null }[] = [
  { id: "dua-desa", key: "dua-desa" },
  { id: "jelajah", key: "jelajah" },
  { id: "cerita", key: "cerita" },
  { id: "mitra", key: null },
  { id: "galeri", key: null },
];
// Garis baca: section yang memotong garis 40% tinggi layar dianggap "dilihat".
const READING_LINE = 0.4;

function sectionInView(fallback: string): string | null {
  const line = window.innerHeight * READING_LINE;
  let found = false;
  for (const { id, key } of SECTION_LINKS) {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (!rect) continue;
    found = true;
    if (rect.top <= line && rect.bottom > line) return key;
  }
  // Di atas section pertama (hero) atau halaman tanpa section ini.
  const first = document.getElementById(SECTION_LINKS[0].id)?.getBoundingClientRect();
  return !found || (first && first.top > line) ? fallback : null;
}

/*
 * Navbar situs (Figma: Design System › Navbar 8024:5063), dua varian:
 * - "Full Frame" (8024:5064): selebar layar, link putih transparan di atas
 *   hero — dipakai saat halaman masih di paling atas.
 * - "Close" (8024:5062): pill putih di tengah + tombol game ikon saja —
 *   dipakai setelah halaman di-scroll.
 *
 * Perpindahan varian = crossfade dua lapisan (opacity + scale 0.98 → 1, lihat
 * .nav-layer di globals.css). Tata letaknya berganti seketika di balik
 * crossfade, jadi tidak ada width/padding/grid yang dianimasikan (tanpa
 * hitung ulang layout per frame). Lapisan yang tidak tampil di-`inert` dan
 * `visibility: hidden`, jadi tidak bisa difokus atau dibaca pembaca layar.
 */
type Variant = "full" | "close";

function NavLinks({ variant, active, current }: { variant: Variant; active: string; current: string | null }) {
  const full = variant === "full";
  return (
    <ul
      className={cn(
        "pointer-events-auto hidden shrink-0 items-center rounded-full md:flex",
        // Pill putih solid di varian Close (keputusan tim, tanpa blur).
        !full && "bg-white p-2",
      )}
    >
      {NAV_LINKS.map((link) => {
        const isCurrent = link.key === current;
        return (
          <li key={link.key}>
            <Link
              href={link.href}
              // "page" = halaman ini; "location" = section yang sedang dilihat.
              aria-current={link.key === active ? "page" : isCurrent ? "location" : undefined}
              data-current={isCurrent || undefined}
              className={cn(
                "group/link relative flex h-[37px] items-center rounded-full px-4 py-2 text-b3",
                full ? "text-white" : isCurrent ? "text-primary-600" : "text-neutral-1000",
              )}
            >
              {/* Penanda section aktif / hover / tekan: satu lapisan yang
                  hanya berubah opacity (crossfade antarlink, tanpa geser). */}
              <span
                aria-hidden
                className={cn("nav-indicator absolute inset-0 rounded-full", full ? "bg-white/15" : "bg-primary-400/10")}
              />
              <span className="relative">{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteNavbar({ active = "beranda" }: { active?: string }) {
  const [closed, setClosed] = useState(false);
  const [current, setCurrent] = useState<string | null>(active);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setClosed(window.scrollY > SCROLL_THRESHOLD);
      setCurrent(sectionInView(active));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active]);

  return (
    <header className="intro-down pointer-events-none fixed inset-x-0 top-(--nav-top) z-50 px-gutter">
      <div className="relative h-[53px]">
        {/* Tombol menu mobile di luar kedua lapisan: satu dialog saja. */}
        <div className="pointer-events-auto absolute top-0 left-0 md:hidden">
          <MobileMenu active={active} current={current} />
        </div>

        {/* Varian Full Frame */}
        <nav
          aria-label="Navigasi utama"
          inert={closed}
          data-visible={!closed || undefined}
          className="nav-layer absolute inset-0 flex items-center justify-between gap-2"
        >
          <NavLinks variant="full" active={active} current={current} />
          <ButtonLink
            href={GAME_URL}
            size="lg"
            className="pointer-events-auto ml-auto h-[53px]"
            iconLeft={<Gamepad weight="BoldDuotone" />}
          >
            <span className="nav-label">Masuk Dunia Komodo</span>
          </ButtonLink>
        </nav>

        {/* Varian Close: pill + tombol ikon, di tengah (desktop) / kanan (HP) */}
        <nav
          aria-label="Navigasi utama"
          inert={!closed}
          data-visible={closed || undefined}
          className="nav-layer absolute inset-0 flex items-center justify-end gap-2 md:justify-center"
        >
          <NavLinks variant="close" active={active} current={current} />
          <ButtonLink
            href={GAME_URL}
            size="lg"
            aria-label="Masuk Dunia Komodo"
            className="pointer-events-auto size-[53px] p-0"
            iconLeft={<Gamepad weight="BoldDuotone" />}
          >
            {null}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
