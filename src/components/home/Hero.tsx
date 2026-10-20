import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Flower, heroFlower } from "@/components/ui/Flower";
import { GAME_URL } from "@/lib/links";
import islandsForeground from "@/assets/komodo-islands-foreground.webp";
import islandsTall from "@/assets/komodo-islands-tall.webp";

/*
 * Hero (Figma: Home Page New › "Wireframe - 1" 8067:152, frame 1440×1024).
 * Foto pulau (8067:381) kini memanjang 1980×1962 sampai ke belakang section
 * berikutnya (Dua Desa), jadi Hero menjadi wadah bersama: `children` dirender
 * di atas lanjutan foto itu.
 *
 * Komposisi berlapis: foto pulau → bunga → judul → foto yang sama tapi hanya
 * bukit depan (PNG transparan) → tombol. Lapisan bukit depan yang membuat
 * "Komodo" terlihat berada di balik bukit.
 *
 * Ukuran artwork memakai unit --u = 1px Figma di lebar 1440, jadi komposisinya
 * tetap sama di lebar layar lain (minimal 0.5px per unit).
 */
const u = (n: number) => `calc(${n} * var(--u))`;
// x di Figma diukur dari kiri frame 1440 → ubah jadi relatif ke tengah.
const fromCenter = (x: number) => `calc(50% + ${x - 720} * var(--u))`;

// Judul dinaikkan 40px dari posisi Figma (y 380) supaya "Komodo" tidak
// terlalu banyak tertutup bukit.
const TITLE_TOP = 380 - 40;

/*
 * Parallax (lihat globals.css): judul, bunga, dan tombol bergeser ke bawah
 * sejauh `n` unit selama hero di-scroll habis, sedangkan foto tidak bergerak.
 * Hasilnya judul perlahan "tenggelam" di balik bukit.
 */
const parallax = (n: number) => ({ "--parallax-shift": u(n) }) as React.CSSProperties;

const islandImage: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: fromCenter(-270),
  width: u(1980),
  maxWidth: "none",
  objectFit: "cover",
  objectPosition: "top",
};

export function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="@container relative isolate w-full overflow-clip bg-neutral-1100"
      style={{ "--u": "max(calc(100cqw / 1440), 0.5px)" } as React.CSSProperties}
    >
      <Image
        src={islandsTall}
        alt=""
        placeholder="blur"
        priority
        sizes="140vw"
        className="-z-10"
        style={{ ...islandImage, height: u(1962) }}
      />
      {/* Ujung bawah foto dipudarkan ke latar, supaya tidak terlihat sebagai
          garis keras saat section di bawahnya lebih tinggi dari foto (layar
          sempit). Lapisan gradien biasa, bukan mask-image di foto yang besar. */}
      <div
        aria-hidden
        className="absolute inset-x-0 -z-10 bg-linear-to-b from-transparent to-neutral-1100"
        style={{ top: u(1962 * 0.85), height: u(1962 * 0.15 + 2) }}
      />

      <section
        className="parallax-hero relative w-full"
        style={{ height: u(1024) }}
        aria-labelledby="hero-title"
      >
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
          <span className="absolute top-0 left-1/2 -translate-x-1/2" style={{ fontSize: u(14.688) }}>
            KKN PM UGM 2027
          </span>
          <span className="absolute top-0 left-1/2 -translate-x-1/2" style={{ fontSize: u(72) }}>
            Menyapa
          </span>
          <span
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: u(438.195 - 380), fontSize: u(116.399) }}
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
          // Bayangan Figma (drop-shadow 0 -3.75 25 rgba(0,0,0,.3)) sudah dipanggang
          // ke file gambarnya; filter CSS di gambar selebar ini mahal saat scroll.
          style={{ ...islandImage, height: u(1321) }}
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
            Selengkapnya
          </ButtonLink>
        </div>
      </section>

      {children}
    </div>
  );
}
