import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Flower, heroFlower } from "@/components/ui/Flower";
import { GAME_URL } from "@/lib/links";
import islands from "@/assets/komodo-islands.webp";
import islandsForeground from "@/assets/komodo-islands-foreground.webp";

/*
 * Hero (Figma: "Wireframe - 1" 8010:3726, frame 1440×1024).
 * Komposisinya berlapis: foto pulau → bunga → judul → foto yang sama tapi
 * hanya bukit depan (PNG transparan) → tombol & navbar. Lapisan ke-4 yang
 * membuat "Komodo" terlihat berada di balik bukit.
 *
 * Semua ukuran artwork memakai unit --u = 1px Figma di lebar 1440, jadi
 * komposisinya tetap sama di lebar layar lain (minimal 0.5px per unit).
 */
const u = (n: number) => `calc(${n} * var(--u))`;
// x di Figma diukur dari kiri frame 1440 → ubah jadi relatif ke tengah.
const fromCenter = (x: number) => `calc(50% + ${x - 720} * var(--u))`;

// Judul dinaikkan dari posisi Figma (y 306) supaya "Komodo" tidak terlalu
// banyak tertutup bukit.
const TITLE_TOP = 306 - 64;

/*
 * Parallax (lihat globals.css): tiap lapisan bergeser ke bawah sejauh `n`
 * unit selama hero di-scroll habis. Makin jauh geserannya, makin lambat
 * lapisan itu terlihat bergerak. Bukit depan tidak digeser, jadi judul
 * perlahan "tenggelam" di balik bukit.
 */
const parallax = (n: number) => ({ "--parallax-shift": u(n) }) as React.CSSProperties;

const islandImage: React.CSSProperties = {
  position: "absolute",
  left: fromCenter(-270),
  width: u(1980),
  height: u(1321),
  maxWidth: "none",
  objectFit: "cover",
};

export function Hero() {
  return (
    <section className="parallax-hero @container relative w-full overflow-clip bg-white" aria-labelledby="hero-title">
      <div
        className="relative w-full"
        style={{ "--u": "max(calc(100cqw / 1440), 0.5px)", height: u(1024) } as React.CSSProperties}
      >
        <Image
          src={islands}
          alt=""
          placeholder="blur"
          priority
          sizes="140vw"
          className="parallax-hero-layer"
          style={{ ...islandImage, top: u(-33), ...parallax(1024 * 0.45) }}
        />

        <Flower
          preset={heroFlower}
          className="parallax-hero-layer is-flower pointer-events-none absolute"
          style={{
            left: fromCenter(740),
            top: u(218),
            width: u(535.895),
            height: u(588.222),
            ...parallax(1024 * 0.6),
            "--parallax-rotate": "40deg",
          } as React.CSSProperties}
        />

        <h1
          id="hero-title"
          className="parallax-hero-layer absolute inset-x-0 font-display whitespace-nowrap text-center leading-normal font-normal text-white"
          style={{ top: u(TITLE_TOP), ...parallax(1024 * 0.5) }}
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2" style={{ fontSize: u(19.583) }}>
            KKN PM UGM 2027
          </span>
          <span className="absolute top-0 left-1/2 -translate-x-1/2" style={{ fontSize: u(96) }}>
            Menyapa
          </span>
          <span
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: u(383.594 - 306), fontSize: u(155.198) }}
          >
            Komodo
          </span>
        </h1>

        <Image
          src={islandsForeground}
          alt="Bukit dan teluk Kepulauan Komodo"
          priority
          sizes="140vw"
          className="pointer-events-none"
          style={{
            ...islandImage,
            top: u(-35),
            filter: `drop-shadow(0 ${u(-3.75)} ${u(25)} rgba(0, 0, 0, 0.3))`,
          }}
        />

        <div
          className="parallax-hero-layer is-fade absolute left-1/2 flex -translate-x-1/2 items-center gap-3"
          // Tombol tidak ikut mengecil, jadi di layar sempit diturunkan agar
          // tidak menimpa judul.
          style={{ top: `max(${u(597)}, 330px)`, ...parallax(160) }}
        >
          <ButtonLink
            href={GAME_URL}
            tone="secondary"
            iconRight={<ArrowRightUp weight="LineDuotone" />}
          >
            Masuk Dunia Komodo
          </ButtonLink>
          <ButtonLink href="/#dua-desa" tone="light">
            Kenali Komodo
          </ButtonLink>
        </div>

      </div>
    </section>
  );
}
