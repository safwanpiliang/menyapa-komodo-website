import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Text } from "assets-design-system";
import islands from "@/assets/komodo-islands.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { copy } from "@/content/copy";
import { Motif } from "@/components/ui/Motif";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KomodoMap } from "./KomodoMap";

// Foto desa masih placeholder dari Figma (foto pulau yang sama).
// `id` dipakai untuk menyorot pin desa di peta saat card-nya di-hover.
const villages = [
  {
    id: "golo-mori",
    name: "Golo Mori",
    ...copy.duaDesa.villages["golo-mori"],
    href: "/dua-desa/golo-mori",
    image: islands,
  },
  {
    id: "warloka-pesisir",
    name: "Warloka Pesisir",
    ...copy.duaDesa.villages["warloka-pesisir"],
    href: "/dua-desa/warloka-pesisir",
    image: islands,
  },
];

/*
 * Section 2 — Dua desa (Figma: Home Page New map › "Wireframe - 2"
 * 8116:2488). Tidak punya latar sendiri: dirender di dalam <Hero> di atas
 * lanjutan foto pulau, lalu dipudarkan ke Neutral/1100 lewat gradien.
 * Kiri: peta Kepulauan Komodo dengan pin dua desa. Kanan (680px): card desa
 * tersusun ke bawah — foto 200px di kiri, teks & tombol di kanan.
 */
export function DuaDesa() {
  return (
    <section id="dua-desa" className="relative px-5 py-section md:px-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--color-neutral-1100)_75%,transparent)_44.638%,var(--color-neutral-1100))]"
      />
      <Motif
        name="ranggong"
        className="reveal reveal-left absolute top-[91px] left-[-112px] hidden size-[408px] opacity-15 md:block"
      />

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-10">
        <SectionHeader tone="dark" title={copy.duaDesa.title} subtitle={copy.duaDesa.subtitle} />

        <div className="grid w-full items-center gap-10 lg:min-h-[524px] lg:grid-cols-[1fr_680px]">
          <KomodoMap className="reveal mx-auto w-full max-w-[560px]" />

          <div className="flex flex-col gap-8">
            {villages.map((village, i) => (
              <article
                key={village.id}
                data-desa-card={village.id}
                className="reveal flex flex-col gap-6 sm:h-[200px] sm:flex-row"
                style={{ "--reveal-delay": `${150 + i * 150}ms` } as React.CSSProperties}
              >
                <div
                  className="reveal-media relative h-[200px] shrink-0 overflow-clip rounded-3 sm:h-full sm:flex-1"
                  style={{ "--reveal-delay": `${150 + i * 150}ms` } as React.CSSProperties}
                >
                  <Image
                    src={village.image}
                    placeholder="blur"
                    // Foto placeholder (lanskap Kepulauan Komodo), belum foto desa aslinya.
                    alt="Lanskap Kepulauan Komodo"
                    fill
                    sizes="(min-width: 1024px) 328px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col items-start gap-6 sm:flex-1">
                  <div className="flex flex-col">
                    <Text variant="h5" as="h3" className="font-display font-normal text-white">
                      {village.name}
                    </Text>
                    <Text variant="b2" className="text-neutral-300">
                      {village.description}
                    </Text>
                  </div>
                  <ButtonLink href={village.href} iconRight={<ArrowRightUp weight="LineDuotone" />}>
                    {village.cta}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
