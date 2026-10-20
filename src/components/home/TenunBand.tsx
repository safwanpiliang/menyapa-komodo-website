import { Motif, type MotifName } from "@/components/ui/Motif";

const pattern: MotifName[] = ["welaRunu", "ranggong", "ntala", "welaKawu"];
// Cukup banyak ulangan supaya pita tetap penuh di layar lebar.
const TILES = 10;

/*
 * Pita motif tenun (Figma: Home Page New › 8068:4266). Pita Primary/700 lurus
 * (tidak miring), berpusat 42px di atas batas section Jelajah dan Cerita, berisi motif
 * Wela Runu · Ranggong · Ntala · Wela Kawu berulang (tiap motif 102px, jarak
 * 90px) diapit dua garis titik 6px. Pitanya diam (tanpa animasi).
 */
export function TenunBand() {
  return (
    <div aria-hidden className="relative z-10 h-0 overflow-x-clip">
      <div className="absolute inset-x-0 top-[-42px] h-[144px] -translate-y-1/2 overflow-clip bg-primary-700">
        <div className="flex h-full w-max flex-col justify-center gap-1.5">
          <span className="tenun-dots" />
          <div className="flex">
            {Array.from({ length: TILES }, (_, tile) =>
              pattern.map((name) => (
                <Motif key={`${tile}-${name}`} name={name} eager className="-mr-3 size-[102px] shrink-0" />
              )),
            )}
          </div>
          <span className="tenun-dots" />
        </div>
      </div>
    </div>
  );
}
