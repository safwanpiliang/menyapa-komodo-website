import { cn } from "@/lib/cn";
import { MAP_HEIGHT, MAP_LAND_PATH, MAP_POINTS, MAP_WIDTH } from "./komodo-map-data";

type Pin = {
  /** Sama dengan `data-desa` di card desa, untuk efek hover card → pin. */
  id: string;
  label: string;
  href: string;
  point: readonly [number, number];
};

export const MAP_PINS: Pin[] = [
  { id: "warloka-pesisir", label: "Warloka Pesisir", href: "/dua-desa/warloka-pesisir", point: MAP_POINTS.warloka },
  { id: "golo-mori", label: "Golo Mori", href: "/dua-desa/golo-mori", point: MAP_POINTS.goloMori },
];

// Label wilayah sebagai acuan (bukan tujuan KKN).
// anchor "end": label rata kanan di titiknya (Flores ada di tepi kanan peta).
const PLACES: { label: string; point: readonly [number, number]; anchor?: "end" }[] = [
  { label: "Pulau Komodo", point: MAP_POINTS.komodo },
  { label: "Pulau Padar", point: [MAP_POINTS.padar[0], MAP_POINTS.padar[1] - 26] },
  { label: "Pulau Rinca", point: [MAP_POINTS.rinca[0] - 34, MAP_POINTS.rinca[1] + 30] },
  { label: "Flores", point: [MAP_WIDTH - 4, MAP_POINTS.warloka[1] - 70], anchor: "end" },
];

/*
 * Peta vektor Kepulauan Komodo & ujung barat Flores dengan penanda dua desa
 * tujuan KKN. Label pulau dirender sebagai HTML di atas SVG (bukan <text>
 * di dalam SVG) supaya ukurannya tetap 12px berapa pun lebar peta; teks di
 * dalam SVG ikut mengecil bersama viewBox. Satu SVG statis (±20 KB, dirender di server). Animasi hanya
 * gelang "berdenyut" di pin (scale + opacity) dan reveal saat pertama
 * terlihat; pin membesar saat card desanya di-hover (lihat globals.css).
 */
export function KomodoMap({ className }: { className?: string }) {
  return (
    <figure className={cn("komodo-map", className)}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-labelledby="komodo-map-title"
        >
          <title id="komodo-map-title">
            Peta Kepulauan Komodo dan ujung barat Pulau Flores, menandai Desa Warloka Pesisir dan Desa Golo Mori
          </title>

          <path
            d={MAP_LAND_PATH}
            className="fill-primary-600/80 stroke-primary-400/70"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />

          {MAP_PINS.map((pin, i) => {
            const [x, y] = pin.point;
            return (
              <a key={pin.id} href={pin.href} aria-label={`Desa ${pin.label}`} data-desa-link={pin.id}>
                <g
                  className="reveal reveal-zoom"
                  style={
                    { "--reveal-delay": `${240 + i * 60}ms`, transformOrigin: `${x}px ${y}px` } as React.CSSProperties
                  }
                >
                  {/* Area sentuh tak terlihat (hanya pointer: coarse, lihat globals.css):
                    radius 42 unit ≈ 46px di peta selebar 300px (360px layar). */}
                <circle cx={x} cy={y} r={42} fill="transparent" className="map-hit" />
                <g data-desa={pin.id} className="map-pin" style={{ transformOrigin: `${x}px ${y}px` }}>
                    {/* Gelang berdenyut di bawah pin. */}
                    <circle cx={x} cy={y} r={9} className="map-pin-pulse fill-secondary-400/40" />
                    <circle cx={x} cy={y} r={9} className="fill-secondary-400 stroke-neutral-100" strokeWidth={3} />
                    {/* Label di kiri pin: Flores hanya pita tipis di tepi kanan peta. */}
                    <g transform={`translate(${x - 16 - (pin.label.length * 8.6 + 20)} ${y - 15})`}>
                      <rect
                        width={pin.label.length * 8.6 + 20}
                        height={30}
                        rx={15}
                        className="fill-neutral-1100/85 stroke-secondary-400/60"
                      />
                      <text x={10} y={20} fontSize={15} className="fill-neutral-100 font-display">
                        {pin.label}
                      </text>
                    </g>
                  </g>
                </g>
              </a>
            );
          })}
        </svg>
        {/* Titik label = garis dasar teks di koordinat peta (seperti <text> SVG
            dengan text-anchor middle). Dekoratif: nama tempat sudah ada di
            <title> peta. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {PLACES.map((place) => (
            <span
              key={place.label}
              className={cn(
                "absolute -translate-y-full text-b4 leading-none font-medium tracking-[0.14em] whitespace-nowrap text-neutral-300 uppercase",
                place.anchor === "end" ? "-translate-x-full" : "-translate-x-1/2",
              )}
              style={{ left: `${(place.point[0] / MAP_WIDTH) * 100}%`, top: `${(place.point[1] / MAP_HEIGHT) * 100}%` }}
            >
              {place.label}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-b4 text-neutral-300">
        <span className="sr-only">
          Desa Warloka Pesisir dan Desa Golo Mori berada di pesisir barat daya Pulau Flores, di seberang Pulau Rinca
          dan selatan Labuan Bajo.{" "}
        </span>
        {/* Wajib menurut lisensi ODbL data garis pantai. */}
        Data peta © kontributor OpenStreetMap
      </figcaption>
    </figure>
  );
}
