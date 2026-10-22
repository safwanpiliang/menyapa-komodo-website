import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Card, Chip, Text, type ChipProps } from "assets-design-system";
import ceritaThumb from "@/assets/cerita-thumb.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TenunBand } from "./TenunBand";

// Judul & kategori dari Figma; ringkasan ditulis netral (sudut pandang
// sebelum KKN) sampai tim menulis isi aslinya.
const stories: {
  title: string;
  category: string;
  status: ChipProps["status"];
  excerpt: string;
  href: string;
}[] = [
  {
    title: "Kenalan dengan Golo Mori",
    category: "Cerita Desa",
    status: "secondary",
    excerpt: "Mengenal Golo Mori, desa perbukitan dengan sebagian pesisir yang menjadi tujuan KKN 2027.",
    href: "/cerita/kenalan-dengan-golo-mori",
  },
  {
    title: "Jejak pelabuhan kuno Warloka",
    category: "Sejarah & Fun Fact",
    status: "primary",
    excerpt: "Menelusuri cerita dan jejak sejarah pelabuhan kuno di Warloka Pesisir.",
    href: "/cerita/jejak-pelabuhan-kuno-warloka",
  },
  {
    title: "Memilah sampah bersama Golo Mori",
    category: "Catatan KKN",
    status: "default",
    excerpt: "Gambaran program pemilahan sampah yang akan dijalankan bersama warga Golo Mori.",
    href: "/cerita/memilah-sampah-bersama-golo-mori",
  },
];

/*
 * Section 5 — Cerita dari Komodo (Figma: Home Page New › "Wireframe - 5" 8068:1752).
 * Card memakai `Card` vertikal assets-design-system; judul di Figma B-1
 * bold (18/27), sedikit lebih besar dari judul bawaan Card (B-2).
 */
export function CeritaDesa() {
  // Pita tenun menempel di atas section (Figma: konten mulai di y 240,
  // tinggi section 1030 → padding atas & bawah 240 di desktop).
  return (
    <section id="cerita" className="relative bg-neutral-300 px-5 pt-[200px] pb-20 md:px-20 md:py-60">
      <TenunBand className="absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <header className="reveal flex flex-col gap-2">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-2.5">
            <Text variant="h3" as="h2" className="font-display md:flex-1 font-normal text-primary-600 max-md:text-h4">
              Cerita dari Komodo
            </Text>
            <ButtonLink href="/cerita" size="lg" iconRight={<ArrowRightUp weight="LineDuotone" />}>
              Lihat Semua Cerita
            </ButtonLink>
          </div>
          <Text variant="b1" className="text-neutral-900">
            Kisah warga, sejarah, dan cerita menarik dari Golo Mori dan Warloka Pesisir.
          </Text>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, i) => (
            <Card
              key={story.href}
              className={`reveal ${["", "[--reveal-delay:120ms]", "[--reveal-delay:240ms]"][i] ?? ""}`}
              image={
                <Image
                  src={ceritaThumb}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 1024px) 411px, (min-width: 768px) 50vw, 100vw"
                  className="object-[0%_26%]"
                />
              }
              chip={
                <Chip variant="tint" status={story.status} size="sm">
                  {story.category}
                </Chip>
              }
              title={<span className="text-b1">{story.title}</span>}
              description={story.excerpt}
              actions={
                <ButtonLink
                  href={story.href}
                  tone="ghost"
                  size="sm"
                  iconRight={<ArrowRightUp weight="LineDuotone" />}
                >
                  Selengkapnya
                </ButtonLink>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
