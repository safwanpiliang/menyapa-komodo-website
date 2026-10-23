import Image from "next/image";
import Link from "next/link";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Text } from "assets-design-system";
import islands from "@/assets/komodo-islands.webp";
import { copy } from "@/content/copy";
import { Motif } from "@/components/ui/Motif";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cardTitle } from "@/components/ui/card-title";
import { cn } from "@/lib/cn";
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
    <section id="dua-desa" className="relative px-gutter py-section [--section-pt:var(--spacing-section)]">
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
                className={cn(
                  "group/desa reveal relative flex flex-col gap-5 rounded-5 p-3 sm:flex-row",
                  // Wadah halus di atas latar gelap: isian putih 4% + garis cahaya
                  // 1px dan bayangan, keduanya dari box-shadow semi-transparan.
                  "bg-white/[0.04] shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_16px_32px_-16px_rgb(0_0_0/0.6)]",
                  "transition-[background-color,box-shadow] duration-200 ease-out",
                  "hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgb(255_255_255/0.14),0_20px_40px_-16px_rgb(0_0_0/0.7)]",
                  "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-primary-200",
                )}
                style={{ "--reveal-delay": `${150 + i * 150}ms` } as React.CSSProperties}
              >
                <div
                  // Radius foto = radius card (20) − padding (12), supaya sudutnya sejajar.
                  className="reveal-media relative h-[200px] shrink-0 overflow-clip rounded-2 sm:h-auto sm:min-h-[176px] sm:flex-1"
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
                <div className="flex flex-col items-start justify-between gap-4 pb-1 sm:flex-1 sm:py-1 sm:pr-3">
                  <div className="flex flex-col">
                    <Text variant="h5" as="h3" className={cn(cardTitle.place, "text-white")}>
                      {village.name}
                    </Text>
                    <Text variant="b2" className="text-neutral-300">
                      {village.description}
                    </Text>
                  </div>
                  {/* Satu tautan untuk seluruh card: ::after-nya menutupi card
                      (stretched link), jadi teks tautan tetap nama aksesibelnya. */}
                  <Link
                    href={village.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-b2 font-bold text-primary-200 underline-offset-4",
                      "group-hover/desa:underline focus-visible:outline-none",
                      "after:absolute after:inset-0 after:rounded-5",
                    )}
                  >
                    {village.cta}
                    <ArrowRightUp weight="LineDuotone" className="size-5 shrink-0" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
