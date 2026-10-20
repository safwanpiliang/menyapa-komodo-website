import Image, { type StaticImageData } from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Text } from "assets-design-system";
import komodo from "@/assets/jelajah-komodo.webp";
import pelabuhan from "@/assets/jelajah-pelabuhan.webp";
import penenun from "@/assets/jelajah-penenun.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Motif } from "@/components/ui/Motif";

type Category = {
  title: string;
  description: string;
  href: string;
  /** Foto cutout (PNG transparan) yang menonjol keluar di atas card. */
  cutout: { src: StaticImageData; alt: string; width: number; height: number };
};

// Deskripsi masih lorem ipsum di Figma; diisi dari wireframe lo-fi.
const categories: Category[] = [
  {
    title: "Wisata",
    description: "Tempat wisata dan hidden gem yang bisa didatangi di Golo Mori dan Warloka Pesisir.",
    href: "/jelajah/wisata",
    // Figma 8068:1652: kotak 261×546, alasnya rata dengan bawah card.
    cutout: { src: komodo, alt: "Komodo", width: 261, height: 546 },
  },
  {
    title: "UMKM & Karya Lokal",
    description: "Usaha dan karya warga: kopi, olahan ikan, oleh-oleh. Informasi saja, tanpa jual-beli.",
    href: "/jelajah/umkm",
    // Figma 8068:1671: kotak 281×365 (dicerminkan), alasnya rata dengan bawah card.
    cutout: { src: penenun, alt: "Penenun dari Golo Mori", width: 281, height: 365 },
  },
];

/*
 * Section 3 — Ada apa di sini? (Figma: Home Page New › "Wireframe - 3" 8067:213).
 * Latar Neutral/1100 dengan foto pelabuhan hitam-putih (efek pikselnya sudah
 * tertanam di foto) dan ornamen motif tenun. Card horizontal dibuat di sini,
 * bukan pakai `Card` package, karena fotonya cutout yang menonjol keluar card.
 */
export function Jelajah() {
  return (
    <section
      id="jelajah"
      className="relative isolate overflow-clip bg-neutral-1100 px-5 pt-20 pb-40 md:px-20 md:pt-30 md:pb-[237px]"
    >
      <Motif
        name="welaKawu"
        className="absolute top-[271px] left-[calc(50%+421px)] -z-10 hidden size-[544px] opacity-15 md:block"
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
        <header className="flex flex-col gap-2">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-2.5">
            <Text variant="h3" as="h2" className="font-display md:flex-1 font-normal text-white max-md:text-h4">
              Ada apa di sini?
            </Text>
            <ButtonLink href="/jelajah" size="lg" iconRight={<ArrowRightUp weight="LineDuotone" />}>
              Lihat Jelajah
            </ButtonLink>
          </div>
          <Text variant="b1" className="text-neutral-300">
            Tempat yang bisa dikunjungi dan karya warga dua desa, dikumpulkan dalam satu halaman Jelajah.
          </Text>
        </header>

        <ul className="grid gap-20 pt-16 md:grid-cols-2 md:gap-8 md:pt-10">
          {categories.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                // Saat hover seluruh card (beserta fotonya) yang naik, bukan fotonya saja,
                // supaya foto tidak terlepas dari alas card dan menyisakan celah putih.
                className="relative flex min-h-[180px] rounded-3 bg-white shadow-[0_16px_16px_rgba(88,92,95,0.1)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_24px_rgba(88,92,95,0.16)] motion-reduce:transition-none md:h-[259px]"
              >
                <div className="relative w-[136px] shrink-0 md:w-[218px]">
                  <Image
                    src={item.cutout.src}
                    alt={item.cutout.alt}
                    sizes="281px"
                    className="absolute bottom-0 left-0 h-auto max-w-none origin-bottom-left max-md:scale-[0.62]"
                    style={{ width: item.cutout.width }}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-4 p-6">
                  <Text variant="h5" as="h3" className="font-display font-normal text-neutral-1000 max-md:text-h6">
                    {item.title}
                  </Text>
                  <Text variant="b2" className="text-neutral-800">
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
        className="absolute top-[448px] left-[-192px] hidden size-[544px] opacity-15 md:block"
      />
    </section>
  );
}
