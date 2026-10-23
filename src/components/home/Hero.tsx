import Image from "next/image";
import ArrowRightUp from "@solar-icons/react/ssr/arrows/ArrowRightUp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Flower, heroFlower } from "@/components/ui/Flower";
import { copy } from "@/content/copy";
import { GAME_URL } from "@/lib/links";
import islandsForeground from "@/assets/komodo-islands-foreground.webp";
import islandsTall from "@/assets/komodo-islands-tall.webp";

/*
 * Hero (Figma: Home Page New › "Wireframe - 1" 8067:152, frame 1440×1024).
 * Foto pulau (8067:381) kini memanjang 1980×1962 sampai ke belakang section
 * berikutnya (Dua Desa), jadi Hero menjadi wadah bersama: `children` dirender
 * di atas lanjutan foto itu.
 *
 * Komposisi berlapis: foto pulau → bunga → judul → foto yang sama tapi hanya
 * bukit depan (PNG transparan) → tombol. Lapisan bukit depan yang membuat
 * "Komodo" terlihat berada di balik bukit.
 *
 * Ukuran artwork memakai unit --u = 1px Figma di lebar 1440, jadi komposisinya
 * tetap sama di lebar layar lain. Minimal 0.62px per unit: di HP (360–430px)
 * "Komodo" ±307px lebar sehingga tetap muat dengan gutter 20px, dan hero
 * ±635px tinggi (bukan 512px).
 */
const u = (n: number) => `calc(${n} * var(--u))`;
// x di Figma diukur dari kiri frame 1440 → ubah jadi relatif ke tengah.
const fromCenter = (x: number) => `calc(50% + ${x - 720} * var(--u))`;

// Judul 16px di atas posisi Figma (y 380): "Komodo" tidak terlalu tertutup
// bukit, tapi tetap dekat dengan tombol CTA.
const TITLE_TOP = 380 - 16;

/*
 * Parallax (lihat globals.css): judul, bunga, dan tombol bergeser ke bawah
 * sejauh `n` unit selama hero di-scroll habis, sedangkan foto tidak bergerak.
 * Hasilnya judul perlahan "tenggelam" di balik bukit. Jaraknya sengaja dibatasi
 * supaya lapisan yang bergerak tetap di dalam hero (≤1024): kalau menimpa
 * section Dua Desa, seluruh section itu ikut jadi lapisan GPU dan scroll berat.
 */
const parallax = (n: number) => ({ "--parallax-shift": u(n) }) as React.CSSProperties;

const islandImage: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: fromCenter(-270),
  width: u(1980),
  maxWidth: "none",
  objectFit: "cover",
  objectPosition: "top",
};

/*
 * Layar lebar tapi pendek (mis. laptop): hero 1024u lebih tinggi dari layar,
 * sehingga judul & tombol jatuh ke bawah. --crop memotong langit di atas:
 * seluruh komposisi (foto, bunga, judul, bukit, tombol) digeser naik sejauh
 * kelebihan tinggi hero terhadap layar, dibatasi supaya judul tidak naik
 * melewati ±120px dari atas (di bawah navbar). Di layar yang cukup tinggi,
 * --crop = 0 dan tampilan sama persis dengan Figma.
 */
const crop = "var(--crop)";
const CROP = `clamp(0px, calc(1024 * var(--u) - 100svh), calc(${TITLE_TOP} * var(--u) - 120px))`;

export function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <div
      id="hero"
      // data-hero-wait/-ready dipasang skrip inline di bawah sebelum hydration.
      suppressHydrationWarning
      className="hero-root @container relative isolate w-full overflow-clip bg-neutral-1100"
      style={{ "--u": "max(calc(100cqw / 1440), 0.62px)", "--crop": CROP } as React.CSSProperties}
    >
      <Image
        src={islandsTall}
        alt=""
        placeholder="blur"
        priority
        sizes="140vw"
        data-hero-photo
        className="intro-zoom -z-10"
        style={{ ...islandImage, top: `calc(-1 * ${crop})`, height: u(1962) }}
      />
      {/*
        Gate intro: selama foto utama belum termuat, animasi intro hero ditahan
        di frame pertamanya (globals.css), jadi judul tidak tampil di atas
        gumpalan blur. Batas tunggu 2.5 dtk. Tanpa JavaScript, atribut wait
        tidak pernah dipasang dan intro berjalan seperti biasa.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var r=document.getElementById("hero");if(!r)return;var i=r.querySelector("img[data-hero-photo]");function go(){r.setAttribute("data-hero-ready","")}r.setAttribute("data-hero-wait","");if(!i||i.complete){go();return}i.addEventListener("load",go,{once:true});i.addEventListener("error",go,{once:true});setTimeout(go,2500)})()`,
        }}
      />
      {/* Ujung bawah foto dipudarkan ke latar, supaya tidak terlihat sebagai
          garis keras saat section di bawahnya lebih tinggi dari foto (layar
          sempit). Lapisan gradien biasa, bukan mask-image di foto yang besar. */}
      <div
        aria-hidden
        className="absolute inset-x-0 -z-10 bg-linear-to-b from-transparent to-neutral-1100"
        style={{ top: `calc(${u(1962 * 0.85)} - ${crop})`, height: u(1962 * 0.15 + 2) }}
      />

      <section
        // overflow-clip: foto bukit (tinggi 1321) dipotong di batas hero. Bagian
        // yang terpotong identik dengan foto latar, jadi tidak terlihat bedanya.
        className="parallax-hero relative w-full overflow-clip"
        style={{ height: `calc(${u(1024)} - ${crop})` }}
        aria-labelledby="hero-title"
      >
        {/* Bidang artwork 1024u (koordinat Figma), digeser naik sejauh --crop. */}
        <div className="absolute inset-x-0" style={{ top: `calc(-1 * ${crop})`, height: u(1024) }}>
          {/* Wrapper = animasi "mekar" saat dibuka; svg di dalamnya = parallax. */}
          {/* Bunga 75% ukuran Figma, mengecil ke arah kiri-bawah (sudut kiri-bawah
              tetap, jadi top turun 25% tinggi). < md: diperkecil lagi (--flower-s)
              supaya tidak terpotong tepi layar. */}
          <div
            className="intro-bloom pointer-events-none absolute max-md:[--flower-s:0.55]"
            style={{
              left: fromCenter(740),
              top: `calc(218 * var(--u) + 588.222 * var(--u) * var(--flower-s, 1) * 0.25)`,
              width: `calc(535.895 * var(--u) * var(--flower-s, 1) * 0.75)`,
              height: `calc(588.222 * var(--u) * var(--flower-s, 1) * 0.75)`,
            }}
          >
            <Flower
              preset={heroFlower}
              className="parallax-hero-layer is-flower size-full"
              style={{ ...parallax(150), "--parallax-rotate": "12deg" } as React.CSSProperties}
            />
          </div>

          <h1
            id="hero-title"
            className="parallax-hero-layer absolute inset-x-0 font-display whitespace-nowrap text-center leading-normal font-normal text-white"
            style={{ top: u(TITLE_TOP), ...parallax(400) }}
          >
            {/* Eyebrow minimal 12px; kalau dibesarkan (HP), digeser naik sebanyak
                tambahan ukurannya supaya tidak menempel ke "Menyapa". */}
            <span
              className="intro-up absolute inset-x-0"
              style={
                {
                  top: `calc(-1.5 * max(0px, 12px - ${u(14.688)}))`,
                  fontSize: `max(12px, ${u(14.688)})`,
                  "--intro-delay": "100ms",
                } as React.CSSProperties
              }
            >
              {copy.hero.eyebrow}
            </span>
            <span className="intro-up absolute inset-x-0 top-0" style={{ fontSize: u(72), "--intro-delay": "200ms" } as React.CSSProperties}>
              {copy.hero.titleTop}
            </span>
            <span
              className="intro-up absolute inset-x-0"
              style={{ top: u(438.195 - 380), fontSize: u(116.399), "--intro-delay": "300ms" } as React.CSSProperties}
            >
              {copy.hero.titleBottom}
            </span>
          </h1>

          <Image
            src={islandsForeground}
            alt="Bukit dan teluk Kepulauan Komodo"
            priority
            sizes="140vw"
            className="intro-zoom pointer-events-none"
            // Bayangan Figma (drop-shadow 0 -3.75 25 rgba(0,0,0,.3)) sudah dipanggang
            // ke file gambarnya; filter CSS di gambar selebar ini mahal saat scroll.
            style={{ ...islandImage, height: u(1321) }}
          />

          <div
            className="parallax-hero-layer is-fade absolute left-1/2 flex w-max max-w-[calc(100vw-2*var(--gutter-x))] -translate-x-1/2 flex-col items-center gap-4"
            // Tombol tidak ikut mengecil, jadi di layar sempit diturunkan agar
            // tidak menimpa judul.
            style={{ top: `max(${u(597)}, 330px)`, ...parallax(160) }}
          >
            {/* < sm: dua tombol ditumpuk selebar konten (tidak mepet tepi layar). */}
            <div className="flex items-center gap-3 max-sm:w-[calc(100vw-2*var(--gutter-x))] max-sm:flex-col max-sm:items-stretch">
              <ButtonLink
                href={GAME_URL}
                tone="secondary"
                className="intro-up"
                style={{ "--intro-delay": "450ms" } as React.CSSProperties}
                iconRight={<ArrowRightUp weight="LineDuotone" />}
              >
                {copy.hero.ctaGame}
              </ButtonLink>
              <ButtonLink
                href="/#dua-desa"
                tone="light"
                className="intro-up"
                style={{ "--intro-delay": "550ms" } as React.CSSProperties}
              >
                {copy.hero.ctaVillages}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {children}
    </div>
  );
}
