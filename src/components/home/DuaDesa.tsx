import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Text } from "assets-design-system";
import islands from "@/assets/komodo-islands.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Motif } from "@/components/ui/Motif";

// Foto desa masih placeholder dari Figma (foto pulau yang sama).
const villages = [
  {
    name: "Golo Mori",
    description: "Perbukitan dengan sebagian pesisir. KKN difokuskan di Golo Mori atas.",
    href: "/dua-desa/golo-mori",
    image: islands,
  },
  {
    name: "Warloka Pesisir",
    description: "Desa pesisir hasil pemekaran, dengan perikanan, UMKM, dan pariwisata.",
    href: "/dua-desa/warloka-pesisir",
    image: islands,
  },
];

/*
 * Section 2 — Dua desa, satu gerbang (Figma: Home Page New › "Wireframe - 2"
 * 8067:180). Tidak punya latar sendiri: dirender di dalam <Hero> di atas
 * lanjutan foto pulau, lalu dipudarkan ke Neutral/1100 lewat gradien.
 */
export function DuaDesa() {
  return (
    <section id="dua-desa" className="relative px-5 py-20 md:px-20 md:py-30">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--color-neutral-1100)_75%,transparent)_44.638%,var(--color-neutral-1100))]"
      />
      <Motif
        name="ranggong"
        className="absolute top-[91px] left-[-112px] hidden size-[408px] opacity-15 md:block"
      />

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center gap-10">
        <header className="flex max-w-[668px] flex-col items-center gap-2 text-center">
          <Text variant="h2" className="font-display font-normal text-white max-md:text-h4">
            Dua desa, satu gerbang
          </Text>
          <Text variant="b1" className="text-neutral-300">
            Kenali lebih dalam dua desa tujuan KKN Menyapa Komodo tahun 2027.
          </Text>
        </header>

        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-8">
          {villages.map((village) => (
            <article key={village.name} className="flex flex-col items-start gap-6">
              <div className="relative h-[240px] w-full overflow-clip rounded-3 md:h-[359px]">
                <Image
                  src={village.image}
                  placeholder="blur"
                  alt={`Foto ${village.name}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex w-full flex-col">
                <Text variant="h5" as="h3" className="font-display font-normal text-white">
                  {village.name}
                </Text>
                <Text variant="b2" className="text-neutral-300">
                  {village.description}
                </Text>
              </div>
              <ButtonLink href={village.href} iconRight={<ArrowRightUp weight="LineDuotone" />}>
                Selengkapnya
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
