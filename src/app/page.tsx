import { CeritaDesa } from "@/components/home/CeritaDesa";
import { DuaDesa } from "@/components/home/DuaDesa";
import { Galeri } from "@/components/home/Galeri";
import { Hero } from "@/components/home/Hero";
import { Jelajah } from "@/components/home/Jelajah";
import { Mitra } from "@/components/home/Mitra";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function Home() {
  return (
    <>
      <SiteNavbar active="beranda" />
      <main>
        <Hero>
          <DuaDesa />
        </Hero>
        <Jelajah />
        <CeritaDesa />
        <Mitra />
        <Galeri />
      </main>
      <SiteFooter />
      <RevealOnScroll />
    </>
  );
}
