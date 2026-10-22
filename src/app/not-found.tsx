import type { Metadata } from "next";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { Text } from "assets-design-system";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: copy.comingSoon.metaTitle,
};

/*
 * Halaman "Coming soon" (Figma: High Fidelity › "Cominsoon" 8106:2453).
 * Dipakai sebagai not-found, jadi semua tautan ke halaman yang belum dibuat
 * (Cerita, Tentang, detail desa, dst.) tampil di sini. Begitu halaman
 * aslinya dibuat, rute itu otomatis menggantikan halaman ini.
 */
export default function ComingSoon() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-neutral-300 px-5">
      <div className="flex flex-col items-center gap-6 text-center">
        <Text
          variant="h4"
          as="h1"
          className="intro-up font-display font-normal text-primary-600 max-md:text-h6"
        >
          {copy.comingSoon.titleLines[0]}
          <br />
          {copy.comingSoon.titleLines[1]}
        </Text>
        <ButtonLink
          href="/"
          tone="secondary"
          className="intro-up"
          style={{ "--intro-delay": "150ms" } as React.CSSProperties}
          iconRight={<ArrowRightUp weight="LineDuotone" />}
        >
          {copy.comingSoon.cta}
        </ButtonLink>
      </div>
    </main>
  );
}
