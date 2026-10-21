import { Motif, type MotifName } from "@/components/ui/Motif";
import { cn } from "@/lib/cn";

const pattern: MotifName[] = ["welaRunu", "ranggong", "ntala", "welaKawu"];
// Cukup banyak ulangan supaya pita tetap penuh di layar lebar.
const TILES = 10;

/*
 * Pita motif tenun (Figma: Home Page New › Cerita › 8101:4263). Pita
 * Primary/700 lurus setinggi 145.5px yang menjadi bagian atas section Cerita,
 * berisi motif Wela Runu · Ranggong · Ntala · Wela Kawu berulang (tiap motif
 * 102px, jarak 90px) diapit dua garis titik 6px. Pitanya diam (tanpa animasi).
 */
export function TenunBand({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("h-[145.5px] overflow-clip bg-primary-700 shadow-e2", className)}>
      <div className="flex h-full w-max flex-col justify-center gap-1.5">
        <span className="tenun-dots" />
        {/* Deretan motif bergeser masuk dari kiri saat pita pertama terlihat. */}
        <div className="reveal reveal-left flex">
          {Array.from({ length: TILES }, (_, tile) =>
            pattern.map((name) => (
              <Motif key={`${tile}-${name}`} name={name} eager className="-mr-3 size-[102px] shrink-0" />
            )),
          )}
        </div>
        <span className="tenun-dots" />
      </div>
    </div>
  );
}
