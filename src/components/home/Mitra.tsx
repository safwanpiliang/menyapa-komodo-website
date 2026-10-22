import Image, { type StaticImageData } from "next/image";
import { Text } from "assets-design-system";
import { Motif } from "@/components/ui/Motif";
import { cn } from "@/lib/cn";

type Partner = {
  name: string;
  /** Logo mitra; selama belum ada, nama mitra ditampilkan sebagai teks. */
  logo?: StaticImageData;
};

type PartnerGroup = {
  label: string;
  /** Tiga mitra utama (kotak besar), lalu sisanya di baris kotak kecil. */
  featured: Partner[];
  others: Partner[];
};

// Isi masih placeholder seperti di Figma; ganti dengan nama & logo mitra asli.
const groups: PartnerGroup[] = [
  {
    label: "Sponsor",
    featured: [{ name: "Sponsor 1" }, { name: "Sponsor 2" }, { name: "Sponsor 3" }],
    others: [{ name: "Sponsor 4" }, { name: "Sponsor 5" }, { name: "Sponsor 6" }, { name: "Sponsor 7" }],
  },
  {
    label: "Media Partner",
    featured: [{ name: "Media Partner 1" }, { name: "Media Partner 2" }, { name: "Media Partner 3" }],
    others: [
      { name: "Media Partner 4" },
      { name: "Media Partner 5" },
      { name: "Media Partner 6" },
      { name: "Media Partner 7" },
    ],
  },
];

function PartnerTile({ partner, size, delay = 0 }: { partner: Partner; size: "lg" | "sm"; delay?: number }) {
  return (
    <li
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(
        "reveal reveal-zoom flex items-center justify-center rounded-3 bg-white p-2.5",
        size === "lg" ? "h-[160px] md:h-[280px]" : "h-[96px] md:h-[120px]",
      )}
    >
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          sizes={size === "lg" ? "400px" : "300px"}
          className={cn("h-auto w-auto object-contain", size === "lg" ? "max-h-[60%] max-w-[70%]" : "max-h-[60%] max-w-[75%]")}
        />
      ) : (
        <Text
          as="span"
          variant={size === "lg" ? "h4" : "h6"}
          className={cn(
            "text-center font-display font-normal text-neutral-1000",
            size === "lg" ? "max-md:text-h6" : "max-md:text-b1",
          )}
        >
          {partner.name}
        </Text>
      )}
    </li>
  );
}

/*
 * Section 6 — Bersama Mitra Kami (Figma: Home Page New › "Wireframe - 6"
 * 8092:2396). Dua grup mitra (Sponsor, Media Partner), masing-masing: label +
 * garis titik oranye, 3 kotak logo besar (280px), lalu 4 kotak kecil (120px).
 */
export function Mitra() {
  return (
    <section id="mitra" className="bg-neutral-300 px-5 py-20 md:px-20 md:py-30">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <header className="flex flex-col items-center gap-2 text-center">
          <div className="relative">
            {/* Figma 8097:2480: motif 102px di kiri-atas judul, sedikit menimpanya. */}
            <Motif
              name="ranggongOranye"
              className="reveal reveal-spin absolute top-[-48px] left-[-82.5px] hidden size-[102px] md:block"
            />
            <Text variant="h2" className="reveal relative font-display font-normal text-primary-600 max-md:text-h4">
              Bersama Mitra Kami
            </Text>
          </div>
          <Text variant="b1" className="reveal text-neutral-900 [--reveal-delay:120ms]">
            Terima kasih kepada sponsor dan media partner yang mendukung KKN Menyapa Komodo 2027.
          </Text>
        </header>

        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <Text variant="h7" as="h3" className="reveal font-display font-normal text-primary-600">
                {group.label}
              </Text>
              <span aria-hidden className="reveal reveal-line dotted-rule text-secondary-500 [--reveal-delay:150ms]" />
            </div>
            <div className="flex flex-col gap-6">
              <ul className="grid gap-6 md:grid-cols-3">
                {group.featured.map((partner, i) => (
                  <PartnerTile key={partner.name} partner={partner} size="lg" delay={i * 100} />
                ))}
              </ul>
              <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {group.others.map((partner, i) => (
                  <PartnerTile key={partner.name} partner={partner} size="sm" delay={i * 80} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
