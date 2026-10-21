"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Gamepad from "@solar-icons/react/ssr/devices/Gamepad";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GAME_URL, NAV_LINKS } from "@/lib/links";

// Jarak scroll sebelum navbar berganti ke varian "Close".
const SCROLL_THRESHOLD = 80;
// Varian Close: pill link (+padding 8px kiri-kanan) · gap 8px · tombol ikon 53px.
const CLOSE_EXTRA_WIDTH = 16 + 8 + 53;

/*
 * Navbar situs (Figma: Design System › Navbar 8024:5063), dua varian:
 * - "Full Frame" (8024:5064): selebar layar, link putih transparan di atas
 *   hero — dipakai saat halaman masih di paling atas.
 * - "Close" (8024:5062): pill putih di tengah + tombol game ikon saja —
 *   dipakai setelah halaman di-scroll.
 * Satu elemen yang berubah bentuk: lebar navbar menyusut dari selebar layar
 * ke lebar pill, latar pill muncul, dan label tombol melipat.
 */
export function SiteNavbar({ active = "beranda" }: { active?: string }) {
  const [closed, setClosed] = useState(false);
  const [closedWidth, setClosedWidth] = useState<number>();
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const update = () => setClosed(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Lebar varian Close dihitung dari lebar asli daftar link (bergantung font).
  useLayoutEffect(() => {
    const list = linksRef.current;
    if (!list) return;
    const measure = () => setClosedWidth(list.scrollWidth + CLOSE_EXTRA_WIDTH);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="intro-down pointer-events-none fixed inset-x-0 top-[35px] z-50 flex justify-center px-5 md:px-20">
      <nav
        aria-label="Navigasi utama"
        data-closed={closed || undefined}
        style={{ "--nav-closed-w": closedWidth ? `${closedWidth}px` : "fit-content" } as React.CSSProperties}
        className={cn(
          "group/nav pointer-events-auto flex w-full items-center justify-between gap-2",
          "transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          "md:data-closed:w-(--nav-closed-w)",
        )}
      >
        <ul
          ref={linksRef}
          className={cn(
            "hidden shrink-0 items-center rounded-full md:flex",
            "transition-[background-color,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-data-closed/nav:bg-white group-data-closed/nav:p-2",
          )}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                aria-current={link.key === active ? "page" : undefined}
                className={cn(
                  "flex h-[37px] items-center rounded-full px-4 py-2 text-b3 text-white transition-colors duration-500 hover:bg-primary-400/10",
                  "group-data-closed/nav:text-neutral-1000",
                  link.key === active && "bg-primary-400/10",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ButtonLink
          href={GAME_URL}
          size="lg"
          aria-label="Masuk Dunia Komodo"
          className="ml-auto h-[53px] gap-0 overflow-hidden"
          iconLeft={<Gamepad weight="BoldDuotone" />}
        >
          {/* Label melipat ke lebar 0 di varian Close (tombol jadi ikon saja). */}
          <span
            aria-hidden
            className={cn(
              "ml-2 grid grid-cols-[1fr] transition-[grid-template-columns,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-data-closed/nav:ml-0 group-data-closed/nav:grid-cols-[0fr] group-data-closed/nav:opacity-0",
            )}
          >
            <span className="overflow-hidden">Masuk Dunia Komodo</span>
          </span>
        </ButtonLink>
      </nav>
    </header>
  );
}
