import type { ReactNode } from "react";
import { Text } from "assets-design-system";
import { cn } from "@/lib/cn";

const tones = {
  // Section berlatar terang (Neutral/300).
  light: { title: "text-primary-600", subtitle: "text-neutral-900" },
  // Section berlatar gelap (Neutral/1100 / foto).
  dark: { title: "text-white", subtitle: "text-neutral-300" },
};

/*
 * Header section beranda — satu pola untuk semua section:
 * - judul H3 (H4 di layar < md), Momo Trust Display, rata kiri;
 * - CTA (opsional) selalu di kanan judul di layar ≥ md, di bawah judul di
 *   layar sempit;
 * - sub-judul B1 di bawahnya, lebar maksimum ±70 karakter.
 * `decoration` dirender di belakang judul (mis. motif tenun di section Mitra),
 * diposisikan absolut terhadap pojok kiri-atas header.
 */
export function SectionHeader({
  title,
  subtitle,
  cta,
  decoration,
  tone = "light",
  titleAs = "h2",
  titleId,
  reveal = true,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: ReactNode;
  decoration?: ReactNode;
  tone?: keyof typeof tones;
  titleAs?: "h2" | "p";
  titleId?: string;
  /** Matikan kalau pembungkusnya sudah punya animasi sendiri (Galeri). */
  reveal?: boolean;
  className?: string;
}) {
  return (
    <header className={cn("relative flex flex-col gap-2", reveal && "reveal", className)}>
      {decoration}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
        <Text
          variant="h3"
          as={titleAs}
          id={titleId}
          className={cn("relative font-display font-normal max-md:text-h4 md:flex-1", tones[tone].title)}
        >
          {title}
        </Text>
        {cta}
      </div>
      {subtitle && (
        <Text variant="b1" className={cn("max-w-2xl", tones[tone].subtitle)}>
          {subtitle}
        </Text>
      )}
    </header>
  );
}
