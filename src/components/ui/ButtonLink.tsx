import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Versi <a> dari `Button` assets-design-system. Button di package selalu
 * merender <button> (belum ada `href`/`asChild`), sedangkan semua CTA di
 * beranda adalah navigasi. Kelas warna disalin dari compoundVariants Button
 * package; bentuk pill (radius/full) mengikuti Button-Primary/Secondary di
 * Figma Menyapa Komodo.
 */
// Warna latar & teks memakai token action-* (globals.css) supaya semua tone
// lolos kontras ≥4.5:1; cek dengan `npm run contrast`.
const tones = {
  primary:
    "bg-action-primary text-white hover:bg-action-primary-hover focus-visible:ring-4 focus-visible:ring-primary-400/10",
  secondary:
    "bg-action-secondary text-white hover:bg-action-secondary-hover focus-visible:ring-4 focus-visible:ring-secondary-400/10",
  // Button-Primary ghost (tanpa latar), dipakai di aksi card.
  ghost:
    "text-action-primary hover:bg-primary-400/10 hover:text-action-primary-hover active:bg-primary-400/15 active:text-action-primary-hover focus-visible:ring-4 focus-visible:ring-primary-400/10",
  // Button-Secondary putih di hero: bg putih, stroke default, teks oranye.
  // Stroke Figma ada di dalam (inside), jadi dibuat dengan inset ring
  // supaya tinggi tombol tetap 45px seperti varian solid.
  light:
    "bg-white text-action-secondary inset-ring inset-ring-border-default hover:bg-disabled-fill focus-visible:ring-4 focus-visible:ring-secondary-400/10",
};

const sizes = {
  sm: "p-2 text-xs leading-[18px]", // Spacing/Padding/S, B-4 bold
  md: "p-3", // Spacing/Padding/M
  lg: "p-4", // Spacing/Padding/L
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
};

export function ButtonLink({
  tone = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm leading-[21px] font-bold focus-visible:outline-none",
        // Umpan balik tekan langsung saat jari/klik turun (bukan saat dilepas).
        "transition-[color,background-color,box-shadow,scale] duration-150 ease-out active:scale-[0.97] motion-reduce:active:scale-100",
        tones[tone],
        sizes[size],
        className,
      )}
      {...props}
    >
      {iconLeft && <span className="size-5 shrink-0 [&>svg]:size-full">{iconLeft}</span>}
      {children}
      {iconRight && <span className="size-5 shrink-0 [&>svg]:size-full">{iconRight}</span>}
    </Link>
  );
}
