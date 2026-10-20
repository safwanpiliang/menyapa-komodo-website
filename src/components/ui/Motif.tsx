import Image from "next/image";
import ntala from "@/assets/motif/ntala.svg";
import ranggong from "@/assets/motif/ranggong.svg";
import ranggongOranye from "@/assets/motif/ranggong-oranye.svg";
import welaKawu from "@/assets/motif/welakawu.svg";
import welaRunu from "@/assets/motif/welarunu.svg";
import { cn } from "@/lib/cn";

/*
 * Motif tenun Manggarai dari Figma (komponen "Wela Runu", "Ranggong",
 * "Ntala", "Wela Kawu"). SVG asli 102×102 berwarna putih hangat (#FDFCF8);
 * ukuran diatur lewat className/style pemanggil.
 */
export const motifs = {
  welaRunu,
  ranggong,
  // Varian Secondary/500 (#E88500), dipakai di judul section Mitra.
  ranggongOranye,
  ntala,
  welaKawu,
};

export type MotifName = keyof typeof motifs;

export function Motif({
  name,
  className,
  style,
  eager,
}: {
  name: MotifName;
  className?: string;
  style?: React.CSSProperties;
  /** Muat langsung, tanpa lazy-load (SVG-nya hanya ±0.7 KB). */
  eager?: boolean;
}) {
  return (
    <Image
      src={motifs[name]}
      alt=""
      aria-hidden
      unoptimized
      loading={eager ? "eager" : undefined}
      className={cn("pointer-events-none select-none", className)}
      style={style}
    />
  );
}
