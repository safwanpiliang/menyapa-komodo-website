import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Card, Chip, type ChipProps } from "assets-design-system";
import ceritaThumb from "@/assets/cerita-thumb.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cardTitle } from "@/components/ui/card-title";
import { copy } from "@/content/copy";
import { TenunBand } from "./TenunBand";

// Teks cerita ada di copy.ts; di sini hanya warna chip & tautan.
const stories: {
  title: string;
  category: string;
  status: ChipProps["status"];
  excerpt: string;
  href: string;
}[] = [
  {
    ...copy.cerita.stories.kenalan,
    status: "secondary",
    href: "/cerita/kenalan-dengan-golo-mori",
  },
  {
    ...copy.cerita.stories.warloka,
    status: "primary",
    href: "/cerita/jejak-pelabuhan-kuno-warloka",
  },
  {
    ...copy.cerita.stories.sampah,
    status: "default",
    href: "/cerita/memilah-sampah-bersama-golo-mori",
  },
];

// Teks chip tint bawaan package terlalu terang di atas latar tint-nya
// (1.84–3.19:1); ditimpa dengan token chip-* (≥5:1).
const chipText: Partial<Record<NonNullable<ChipProps["status"]>, string>> = {
  primary: "text-chip-primary",
  secondary: "text-chip-secondary",
};

/*
 * Section 5 — Cerita dari Komodo (Figma: Home Page New › "Wireframe - 5" 8068:1752).
 * Card memakai `Card` vertikal assets-design-system; judul mengikuti aturan
 * cardTitle.article (B-1 bold), sedikit lebih besar dari judul bawaan Card (B-2).
 */
export function CeritaDesa() {
  // Pita tenun menempel di atas section; padding atas = tinggi pita + ritme
  // section biasa (satu-satunya pengecualian ritme spacing).
  return (
    <section id="cerita" className="relative bg-neutral-300 px-5 pt-[calc(var(--tenun-band-h)+var(--spacing-section))] pb-section [--section-pt:calc(var(--tenun-band-h)+var(--spacing-section))] md:px-20">
      <TenunBand className="absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <SectionHeader
          title={copy.cerita.title}
          subtitle={copy.cerita.subtitle}
          cta={
            <ButtonLink href="/cerita" size="lg" iconRight={<ArrowRightUp weight="LineDuotone" />}>
              {copy.cerita.cta}
            </ButtonLink>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, i) => (
            <Card
              key={story.href}
              // Card package mengunci blok teksnya setinggi 98px, sehingga judul
              // dua baris memotong ringkasan. Di sini dibuat min-height (tinggi
              // card sebaris tetap sama karena grid), tanpa mengubah package.
              // relative + stretched link di tombol: seluruh card bisa diklik.
              className={`reveal relative transition-shadow duration-200 ease-out hover:shadow-e3 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-action-primary [&>div:last-child]:justify-between [&>div:last-child>div:first-child]:h-auto [&>div:last-child>div:first-child]:min-h-[98px] ${["", "[--reveal-delay:120ms]", "[--reveal-delay:240ms]"][i] ?? ""}`}
              // Elemen yang dioper ke Card (client component package) diberi `key`:
              // Card menaruhnya berdampingan dalam satu array children, dan elemen
              // dari Server Component tidak membawa tanda validasi key, sehingga
              // React dev memunculkan peringatan "unique key" palsu.
              image={
                <Image
                  key="image"
                  src={ceritaThumb}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 1024px) 411px, (min-width: 768px) 50vw, 100vw"
                  className="object-[0%_26%]"
                />
              }
              chip={
                <Chip key="chip" variant="tint" status={story.status} size="sm" className={chipText[story.status ?? "default"]}>
                  {story.category}
                </Chip>
              }
              title={<span key="title" className={cardTitle.article}>{story.title}</span>}
              // Card package mewarnai isi dengan Neutral/800 (3.71:1); span ini
              // menimpanya dengan token ink-body tanpa mengubah package.
              description={<span key="description" className="text-ink-body">{story.excerpt}</span>}
              actions={
                <ButtonLink
                  key="actions"
                  href={story.href}
                  tone="ghost"
                  // ::after menutupi seluruh card (Card package sudah overflow-hidden
                  // + rounded), jadi klik di mana pun membuka cerita dan hover card
                  // ikut menyalakan latar tombol.
                  className="after:absolute after:inset-0"
                  iconRight={<ArrowRightUp weight="LineDuotone" />}
                >
                  {copy.cerita.cardCta}
                </ButtonLink>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
