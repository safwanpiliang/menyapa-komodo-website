import Image, { type StaticImageData } from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Text } from "assets-design-system";
import komodo from "@/assets/jelajah-komodo.webp";
import pelabuhan from "@/assets/jelajah-pelabuhan.webp";
import penenun from "@/assets/jelajah-penenun.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { copy } from "@/content/copy";
import { Motif } from "@/components/ui/Motif";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cardTitle } from "@/components/ui/card-title";
import { cn } from "@/lib/cn";

type Category = {
  title: string;
  description: string;
  href: string;
  /** Foto cutout (PNG transparan) yang menonjol keluar di atas card. */
  cutout: { src: StaticImageData; alt: string; width: number; height: number };
};

const categories: Category[] = [
  {
    ...copy.jelajah.categories.wisata,
    href: "/jelajah/wisata",
    // Figma 8068:1652: kotak 261×546, alasnya rata dengan bawah card.
    cutout: { src: komodo, alt: "Komodo", width: 261, height: 546 },
  },
  {
    ...copy.jelajah.categories.umkm,
    href: "/jelajah/umkm",
    // Figma 8068:1671: kotak 281×365 (dicerminkan), alasnya rata dengan bawah card.
    cutout: { src: penenun, alt: "Penenun kain tenun", width: 281, height: 365 },
  },
];

/*
 * Section 3 — Jelajah (Figma: Home Page New › "Wireframe - 3" 8067:213).
 * Latar Neutral/1100 dengan foto pelabuhan hitam-putih (efek pikselnya sudah
 * tertanam di foto) dan ornamen motif tenun. Card horizontal dibuat di sini,
 * bukan pakai `Card` package, karena fotonya cutout yang menonjol keluar card.
 */
export function Jelajah() {
  return (
    <section
      id="jelajah"
      // pt-0: menyambung latar gelap Dua desa, jaraknya sudah dari padding bawah Dua desa.
      className="relative isolate overflow-clip bg-neutral-1100 px-gutter pb-section-lg"
    >
      <Motif
        name="welaKawu"
        className="reveal reveal-right absolute top-[151px] left-[calc(50%+421px)] -z-10 hidden size-[544px] opacity-15 md:block"
      />
      <Image
        src={pelabuhan}
        alt=""
        sizes="100vw"
        // Foto 2880×1520 (proporsi asli) ditempel ke bawah section supaya teluk
        // & kapalnya terlihat; bagian atas foto sudah gelap menyatu dengan latar.
        className="absolute bottom-0 left-1/2 -z-10 h-auto w-[max(1440px,100%)] max-w-none -translate-x-1/2"
      />

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-10">
        <SectionHeader
          tone="dark"
          title={copy.jelajah.title}
          subtitle={copy.jelajah.subtitle}
          cta={
            <ButtonLink href="/jelajah" size="lg" iconRight={<ArrowRightUp weight="LineDuotone" />}>
              {copy.jelajah.cta}
            </ButtonLink>
          }
        />

        <ul className="grid gap-20 pt-16 md:grid-cols-2 md:gap-8 md:pt-10">
          {categories.map((item, i) => (
            <li key={item.title} className="reveal" style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
              <a
                href={item.href}
                // Saat hover seluruh card (beserta fotonya) yang naik, bukan fotonya saja,
                // supaya foto tidak terlepas dari alas card dan menyisakan celah putih.
                className="relative flex min-h-[180px] rounded-3 bg-white shadow-[0_16px_16px_rgba(88,92,95,0.1)] [transition:translate_300ms,box-shadow_300ms,scale_150ms_var(--ease-out-soft)] hover:-translate-y-1 active:scale-[0.98] hover:shadow-[0_24px_24px_rgba(88,92,95,0.16)] motion-reduce:transition-none md:h-[259px]"
              >
                {/* Foto cutout muncul dari bawah card sedikit setelah card-nya. */}
                <div
                  className="reveal relative w-[136px] shrink-0 md:w-[218px]"
                  style={{ "--reveal-delay": `${i * 60 + 120}ms` } as React.CSSProperties}
                >
                  <Image
                    src={item.cutout.src}
                    alt={item.cutout.alt}
                    sizes="281px"
                    // < md: diperkecil ke 54% supaya lebar cutout (komodo 261px → 141px)
                    // tidak masuk ke kolom teks dan menyentuh judul card.
                    className="absolute bottom-0 left-0 h-auto max-w-none origin-bottom-left max-md:scale-[0.54]"
                    style={{ width: item.cutout.width }}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-4 p-6">
                  <Text variant="h5" as="h3" className={cn(cardTitle.place, "text-neutral-1000")}>
                    {item.title}
                  </Text>
                  <Text variant="b2" className="text-ink-body">
                    {item.description}
                  </Text>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Motif
        name="ranggong"
        className="reveal reveal-left absolute top-[328px] left-[-192px] hidden size-[544px] opacity-15 md:block"
      />
    </section>
  );
}
