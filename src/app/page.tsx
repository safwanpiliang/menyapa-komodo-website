import { CeritaDesa } from "@/components/home/CeritaDesa";
import { DuaDesa } from "@/components/home/DuaDesa";
import { DuniaKomodo } from "@/components/home/DuniaKomodo";
import { Galeri } from "@/components/home/Galeri";
import { Hero } from "@/components/home/Hero";
import { Jelajah } from "@/components/home/Jelajah";
import { SiteNavbar } from "@/components/layout/SiteNavbar";

export default function Home() {
  return (
    <>
      <SiteNavbar active="beranda" />
      <main>
        <Hero />
        <DuaDesa />
        <Jelajah />
        <DuniaKomodo />
        <CeritaDesa />
        <Galeri />
      </main>
    </>
  );
}
