"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import CloseCircle from "@solar-icons/react/ssr/ui/CloseCircle";
import HamburgerMenu from "@solar-icons/react/ssr/ui/HamburgerMenu";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/links";

/*
 * Menu navigasi untuk layar < md (link navbar desktop disembunyikan di sana).
 * Panel = <dialog> modal native (showModal), sehingga browser yang mengurus:
 * - Escape menutup menu;
 * - fokus terkurung di dalam panel dan konten di belakangnya inert;
 * - fokus kembali ke tombol menu saat ditutup (dijaga lagi di onClose).
 * Tambahan di sini: tap di luar panel menutup menu, dan scroll halaman
 * terkunci selama menu terbuka (globals.css, html:has(.mobile-menu[open])).
 * Link & tujuannya sama persis dengan desktop (NAV_LINKS).
 */
export function MobileMenu({ active, current }: { active: string; current: string | null }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // Layar melebar ke ≥ md (rotasi tablet): menu disembunyikan CSS, jadi tutup
  // juga supaya halaman tidak tertinggal dalam keadaan inert & terkunci.
  useEffect(() => {
    const desktop = matchMedia("(width >= 48rem)");
    const onChange = () => desktop.matches && dialogRef.current?.close();
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-controls="mobile-menu"
        aria-label="Buka menu"
        className={cn(
          "flex size-[53px] shrink-0 items-center justify-center rounded-full bg-white text-neutral-1000 shadow-e1 md:hidden",
          "transition-transform duration-150 ease-out active:scale-[0.96] motion-reduce:transition-none",
          "focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none",
        )}
      >
        <HamburgerMenu weight="LineDuotone" className="size-6" />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu"
        className="mobile-menu md:hidden"
        // Tap di luar panel: target klik = <dialog> itu sendiri (::backdrop),
        // karena isinya (panel) menutupi seluruh kotak dialog.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onClose={() => {
          if (document.activeElement === document.body) buttonRef.current?.focus();
        }}
      >
        <div className="rounded-6 bg-white p-2 text-neutral-1000 shadow-e3">
          <div className="flex items-center justify-between py-1 pr-1 pl-4">
            <span className="text-b4 font-bold tracking-[0.2em] text-neutral-900 uppercase">Menu</span>
            <button
              type="button"
              onClick={close}
              aria-label="Tutup menu"
              className={cn(
                "flex size-11 items-center justify-center rounded-full text-neutral-900",
                "transition-[background-color,scale] duration-150 ease-out hover:bg-neutral-400 active:scale-[0.94] active:bg-neutral-400",
                "focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:outline-none",
              )}
            >
              <CloseCircle weight="LineDuotone" className="size-6" />
            </button>
          </div>
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={link.key === active ? "page" : link.key === current ? "location" : undefined}
                  className={cn(
                    // Target sentuh 52px (minimal 44px).
                    "flex min-h-13 items-center rounded-4 px-4 text-b1 font-medium",
                    "transition-colors duration-150 hover:bg-neutral-400 active:bg-neutral-500",
                    "focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:outline-none",
                    link.key === current && "bg-primary-400/10 text-primary-600",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
