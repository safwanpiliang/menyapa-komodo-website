import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Card, Chip, Text, type ChipProps } from "assets-design-system";
import ceritaThumb from "@/assets/cerita-thumb.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Konten contoh dari Figma; deskripsi masih lorem ipsum di sana.
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
    excerpt: "Mengenal lebih dekat desa di perbukitan dengan pemandangan laut yang luas.",
    href: "/cerita/kenalan-dengan-golo-mori",
  },
  {
    title: "Jejak pelabuhan kuno Warloka",
    category: "Sejarah & Fun Fact",
    status: "primary",
    excerpt: "Warloka pernah menjadi titik singgah perdagangan jauh sebelum era wisata Komodo.",
    href: "/cerita/jejak-pelabuhan-kuno-warloka",
  },
  {
    title: "Memilah sampah bersama Golo Mori",
    category: "Catatan KKN",
    status: "default",
    excerpt: "Catatan program pengelolaan sampah bersama warga dan sekolah di Golo Mori.",
    href: "/cerita/memilah-sampah-bersama-golo-mori",
  },
];

/*
 * Section 5 — Cerita dari dua desa (Figma: "Wireframe - 5" 8040:6075).
 * Card memakai `Card` vertikal assets-design-system; judul di Figma B-1
 * bold (18/27), sedikit lebih besar dari judul bawaan Card (B-2).
 */
export function CeritaDesa() {
  return (
    <section id="cerita" className="bg-neutral-300 px-5 py-20 md:px-20 md:py-30">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <Text variant="h3" as="h2" className="flex-1 font-display font-normal text-primary-400 max-md:text-h4">
              Cerita dari dua desa
            </Text>
            <ButtonLink href="/cerita" size="lg" iconRight={<ArrowRightUp weight="LineDuotone" />}>
              Lihat Cerita
            </ButtonLink>
          </div>
          <Text variant="b1" className="text-neutral-900">
            Kenali lebih dalam dua desa tujuan KKN Menyapa Komodo tahun 2027.
          </Text>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Card
              key={story.href}
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
