import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Text } from "assets-design-system";
import islands from "@/assets/komodo-islands.webp";
import jelajahThumb from "@/assets/jelajah-thumb.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Deskripsi masih lorem ipsum di Figma; diisi dari wireframe lo-fi.
const categories = [
  {
    title: "Wisata",
    description: "Tempat wisata dan hidden gem yang bisa didatangi di Golo Mori dan Warloka Pesisir.",
    href: "/jelajah/wisata",
  },
  {
    title: "UMKM & Karya Lokal",
    description: "Usaha dan karya warga: kopi, olahan ikan, oleh-oleh. Informasi saja, tanpa jual-beli.",
    href: "/jelajah/umkm",
  },
];

/*
 * Section 3 — Ada apa di sini? (Figma: "Wireframe - 3" 8026:5666).
 * Card horizontal dibuat di sini, bukan pakai `Card` package: judul di Figma
 * memakai heading display 32px dan tinggi konten bebas, sedangkan `Card`
 * package mengunci judul ke B-2 bold dengan tinggi konten 98px.
 */
export function Jelajah() {
  return (
    <section id="jelajah" className="bg-neutral-300 px-5 py-20 md:px-20 md:py-30">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 lg:flex-row lg:items-stretch">
        <div className="relative h-[280px] shrink-0 overflow-clip rounded-3 lg:h-auto lg:w-[472px]">
          <div className="parallax-media absolute inset-x-0 -inset-y-[10%]">
            <Image
              src={islands}
              placeholder="blur"
              alt="Pemandangan Kepulauan Komodo"
              fill
              sizes="(min-width: 1024px) 472px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <header className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <Text variant="h3" as="h2" className="flex-1 font-display font-normal text-primary-400 max-md:text-h4">
                Ada apa di sini?
              </Text>
              <ButtonLink href="/jelajah" size="lg" iconRight={<ArrowRightUp weight="LineDuotone" />}>
                Lihat Jelajah
              </ButtonLink>
            </div>
            <Text variant="b1" className="text-neutral-900">
              Tempat yang bisa dikunjungi dan karya warga dua desa, dikumpulkan dalam satu halaman Jelajah.
            </Text>
          </header>

          <ul className="flex flex-col gap-6">
            {categories.map((item) => (
              <li key={item.title}>
                <a
                  href={item.href}
                  className="group flex overflow-hidden rounded-3 bg-white shadow-e2 transition-shadow hover:shadow-e3"
                >
                  <div className="relative w-[120px] shrink-0 self-stretch overflow-hidden sm:w-[218px]">
                    <Image
                      src={jelajahThumb}
                      alt=""
                      fill
                      sizes="218px"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-h-[160px] flex-1 flex-col justify-center gap-4 p-6">
                    <Text variant="h5" as="h3" className="font-display font-normal text-neutral-1000 max-sm:text-h6">
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
      </div>
    </section>
  );
}
