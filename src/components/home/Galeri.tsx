import Image, { type StaticImageData } from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import ceritaThumb from "@/assets/cerita-thumb.webp";
import previewGame from "@/assets/dunia-komodo-preview.webp";
import jelajahThumb from "@/assets/jelajah-thumb.webp";
import islands from "@/assets/komodo-islands.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Flower, heroFlower } from "@/components/ui/Flower";
import { copy } from "@/content/copy";
import "./galeri.css";

type Photo = {
  src: StaticImageData;
  caption: string;
  /** Posisi akhir relatif ke tengah layar, dalam cqw/cqh. */
  x: number;
  y: number;
  /** Posisi akhir di layar sempit (<700px): foto disusun di atas & bawah buku. */
  sm: [x: number, y: number];
  /** Rotasi akhir (deg) dan putaran tambahan selama terbang. */
  rotate: number;
  spin: number;
  /** Titik mulai terbang, dalam % rentang "contain" section (lihat galeri.css). */
  start: number;
};

// Foto sementara dari aset yang sudah ada; keterangannya menggambarkan isi
// foto apa adanya. Ganti foto & keterangan saat foto galeri asli tersedia.
const photos: Photo[] = [
  { src: islands, caption: "Panorama Kepulauan Komodo", x: -37, y: -23, sm: [-34, -27], rotate: -8, spin: -160, start: 40 },
  { src: ceritaThumb, caption: "Tim KKN-PPM UGM", x: 15, y: -26, sm: [12, -30], rotate: -4, spin: 140, start: 42.2 },
  { src: jelajahThumb, caption: "Dokumentasi tim", x: 41, y: 3, sm: [36, -25], rotate: -7, spin: 190, start: 44.4 },
  { src: previewGame, caption: "Dunia Komodo (game 3D)", x: -13, y: 33, sm: [-12, 24], rotate: 7, spin: -120, start: 46.6 },
  { src: islands, caption: "Panorama Kepulauan Komodo", x: 36, y: -20, sm: [-11, -32], rotate: 9, spin: 170, start: 48.8 },
  { src: ceritaThumb, caption: "Tim KKN-PPM UGM", x: -41, y: 5, sm: [-35, 22], rotate: 6, spin: -200, start: 51.0 },
  { src: jelajahThumb, caption: "Dokumentasi tim", x: 13, y: 32, sm: [13, 25], rotate: -9, spin: 150, start: 53.2 },
  { src: islands, caption: "Panorama Kepulauan Komodo", x: -16, y: -27, sm: [-22, 38], rotate: 5, spin: -140, start: 55.4 },
  { src: previewGame, caption: "Dunia Komodo (game 3D)", x: 34, y: 28, sm: [36, 23], rotate: 4, spin: 120, start: 57.6 },
  { src: ceritaThumb, caption: "Tim KKN-PPM UGM", x: -34, y: 28, sm: [22, 39], rotate: -5, spin: -170, start: 59.8 },
];

// Titik cahaya kecil yang memercik keluar dari buku.
const sparks = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + (i % 2 ? 0.2 : -0.1);
  const distance = 18 + (i % 4) * 6;
  return {
    x: Math.round(Math.cos(angle) * distance * 10) / 10,
    y: Math.round(Math.sin(angle) * distance * 0.8 * 10) / 10,
    delay: (i % 5) * 2,
  };
});

/*
 * Section 6 — Galeri (belum ada hi-fi di Figma; interpretasi dari style web).
 * Scrollytelling: section setinggi ±4 layar dan isinya menempel di layar.
 * Tiap lapisan punya animasi CSS sendiri yang terikat ke posisi scroll
 * (lihat galeri.css), dengan persentase dari rentang saat section menempel:
 *   saat masuk  buku tertutup muncul
 *   5–36%       sampul membuka, latar menggelap ke Primary/700
 *   24–47%      cahaya keluar dari buku
 *   40–83%      foto terlempar keluar menjadi kolase polaroid
 *   83–96%      isi halaman buku + tombol muncul
 */
export function Galeri() {
  return (
    <section id="galeri" className="galeri" aria-labelledby="galeri-title">
      <div className="galeri-stage">
        <div className="galeri-dim" aria-hidden />
        <p className="galeri-hint" aria-hidden>
          <span className="font-display text-h3 text-primary-400">{copy.galeri.title}</span>
          <span className="text-b2 text-neutral-900">{copy.galeri.hint}</span>
        </p>

        <div className="galeri-book-wrap">
          <div className="galeri-book">
            <div className="galeri-board" aria-hidden />
            <div className="galeri-pages">
              <div className="galeri-page-content galeri-page-right">
                <p className="text-b3 text-ink-body">
                  {copy.galeri.rightPage}
                </p>
                <ButtonLink href="/galeri" size="md" iconRight={<ArrowRightUp weight="LineDuotone" />}>
                  {copy.galeri.cta}
                </ButtonLink>
              </div>
              <span className="galeri-ribbon" aria-hidden />
            </div>

            <div className="galeri-cover">
              <div className="galeri-cover-front" aria-hidden>
                <div className="galeri-cover-frame">
                  <Flower preset={heroFlower} className="galeri-cover-flower" />
                  <span className="font-display text-white">{copy.galeri.title}</span>
                  <span className="text-b5 tracking-[0.2em] text-primary-100 uppercase">{copy.galeri.coverTagline}</span>
                </div>
              </div>
              <div className="galeri-cover-inside">
                <div className="galeri-page-content galeri-page-left">
                  <h2 id="galeri-title" className="font-display text-h5 text-primary-400">
                    {copy.galeri.title}
                  </h2>
                  <p className="text-b3 text-ink-body">{copy.galeri.leftPage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="galeri-glow" aria-hidden>
          <div className="galeri-glow-inner">
            <div className="galeri-rays" />
            <div className="galeri-core" />
            {sparks.map((spark, i) => (
              <span
                key={i}
                className="galeri-spark"
                style={{ "--sx": spark.x, "--sy": spark.y, "--sd": `${spark.delay}%` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        <ul className="galeri-photos">
          {photos.map((photo, i) => (
            <li
              key={i}
              className="galeri-photo"
              style={
                {
                  "--tx": photo.x,
                  "--ty": photo.y,
                  "--tx-sm": photo.sm[0],
                  "--ty-sm": photo.sm[1],
                  "--rot": photo.rotate,
                  "--spin": photo.spin,
                  "--s": `${photo.start}%`,
                  "--e": `${photo.start + 23}%`,
                } as React.CSSProperties
              }
            >
              <figure>
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  placeholder="blur"
                  sizes="220px"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="text-b4 text-neutral-900">{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
