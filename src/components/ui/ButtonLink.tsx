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
const tones = {
  primary:
    "bg-primary-400 text-white hover:bg-primary-500 focus-visible:ring-4 focus-visible:ring-primary-400/10",
  secondary:
    "bg-secondary-400 text-white hover:bg-secondary-500 focus-visible:ring-4 focus-visible:ring-secondary-400/10",
  // Button-Primary ghost (tanpa latar), dipakai di aksi card.
  ghost:
    "text-primary-400 hover:bg-primary-400/10 focus-visible:ring-4 focus-visible:ring-primary-400/10",
  // Button-Secondary putih di hero: bg putih, stroke default, teks oranye.
  // Stroke Figma ada di dalam (inside), jadi dibuat dengan inset ring
  // supaya tinggi tombol tetap 45px seperti varian solid.
  light:
    "bg-white text-secondary-400 inset-ring inset-ring-border-default hover:bg-disabled-fill focus-visible:ring-4 focus-visible:ring-secondary-400/10",
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
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm leading-[21px] font-bold transition-colors focus-visible:outline-none",
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
