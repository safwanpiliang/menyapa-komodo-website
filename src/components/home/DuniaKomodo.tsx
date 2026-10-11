import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Text } from "assets-design-system";
import preview from "@/assets/dunia-komodo-preview.webp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GAME_URL } from "@/lib/links";

/*
 * Section 4 — Dunia Komodo, teaser game 3D (Figma: "Wireframe - 4" 8040:5886).
 * Latar hijau adalah pita Primary/500 yang dimiringkan -0.95° di belakang
 * konten; lebarnya minimal 1661px (Figma) supaya ujungnya tidak terlihat.
 */
export function DuniaKomodo() {
  return (
    <section
      id="dunia-komodo"
      className="relative isolate overflow-clip bg-neutral-300 px-5 py-20 md:px-20 md:py-30"
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 h-[calc(100%-55px)] w-[max(1661px,115vw)] -translate-1/2 -rotate-[0.95deg] bg-primary-500 shadow-e1"
      />

      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 lg:flex-row">
        <div className="relative aspect-[652.8/367.2] w-full shrink-0 overflow-clip rounded-3 lg:w-[51%]">
          <div className="parallax-media absolute inset-x-0 -inset-y-[10%]">
            <Image
              src={preview}
              alt="Tampilan awal game Dunia Komodo"
              placeholder="blur"
              fill
              sizes="(min-width: 1024px) 653px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
          <div className="flex flex-col gap-2">
            <Text variant="h3" as="h2" className="font-display font-normal text-white max-md:text-h4">
              Dunia Komodo
            </Text>
            <Text variant="b1" className="text-neutral-300">
              Jelajahi dunia 3D dua desa. Temukan tempat wisata, makanan khas, dan cerita.
            </Text>
          </div>
          <ButtonLink
            href={GAME_URL}
            tone="secondary"
            size="lg"
            iconRight={<ArrowRightUp weight="LineDuotone" />}
          >
            Masuk Dunia Komodo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
