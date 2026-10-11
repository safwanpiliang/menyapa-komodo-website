import { asset } from "@/lib/links";

/*
 * Ornamen bunga kuning dari Figma. Tiap kelopak adalah file SVG asli dari
 * Figma (public/decor), disusun ulang dengan posisi & transform persis dari
 * node-nya. Koordinat memakai sistem koordinat frame Figma (px), sehingga
 * `viewBox` = bounding box grup bunga di frame tersebut.
 */
type Petal = {
  src: string;
  /** Bounding box node (sudah ter-transform) di koordinat frame. */
  box: [x: number, y: number, w: number, h: number];
  /** Ukuran asli SVG sebelum transform. */
  size: [w: number, h: number];
  rotate: number;
  scale?: [x: number, y: number];
  skewX?: number;
};

type FlowerPreset = {
  viewBox: [x: number, y: number, w: number, h: number];
  petals: Petal[];
};

const petal = (n: number) => asset(`/decor/petal-${n}.svg`);

// Hero "Wireframe - 1" › Group 48096204 (8010:3737)
export const heroFlower: FlowerPreset = {
  viewBox: [740, 218, 535.895, 588.222],
  petals: [
    { src: petal(6628), box: [893.2, 332.2, 189.628, 182.418], size: [132.666, 133.661], rotate: -52.75, scale: [1.01, 0.99], skewX: 2.28 },
    { src: petal(6629), box: [958.36, 347.44, 171.838, 167.304], size: [133.171, 133.158], rotate: -19.03, scale: [1.02, 0.98], skewX: 0.43 },
    { src: petal(6630), box: [867.27, 381.02, 140.848, 133.509], size: [133.526, 132.802], rotate: -178.82, scale: [1.01, -0.99], skewX: -1.2 },
    { src: petal(6631), box: [939.47, 512.94, 181.984, 174.458], size: [132.666, 133.661], rotate: 25.05, scale: [1.01, -0.99], skewX: -2.28 },
    { src: petal(6632), box: [1000.23, 492.39, 152.945, 149.634], size: [133.171, 133.158], rotate: -8.68, scale: [1.02, -0.98], skewX: -0.43 },
    { src: petal(6633), box: [882.49, 512.68, 184.187, 178.638], size: [133.526, 132.802], rotate: 151.12, scale: [1.01, 0.99], skewX: 1.2 },
    { src: petal(6634), box: [852.24, 485.16, 164.017, 156.418], size: [135.252, 131.044], rotate: -167.62, skewX: -1.88 },
    { src: petal(6635), box: [825.11, 417.83, 191.308, 184.757], size: [133.138, 133.191], rotate: -133.01, scale: [0.99, 1.01], skewX: -1.93 },
    { src: petal(6636), box: [1001.62, 431.45, 191.071, 184.589], size: [135.252, 131.044], rotate: -40.09, scale: [1, -1], skewX: 1.88 },
    { src: petal(6637), box: [1001.5, 391.34, 165.752, 158.145], size: [133.138, 133.191], rotate: -74.69, scale: [0.99, -1.01], skewX: 1.93 },
  ],
};

// "Wireframe - 2" › Group 48096204 (8026:5860)
export const sideFlower: FlowerPreset = {
  viewBox: [-150, 43, 535.895, 588.222],
  petals: [
    { src: asset("/decor/flower-group-a.svg"), box: [-71.64, 99.8, 354.026, 326.191], size: [270.533, 240.243], rotate: 24.3, skewX: -2.27 },
    { src: asset("/decor/flower-group-b.svg"), box: [-40.55, 232.2, 361.58, 353.469], size: [270.533, 240.243], rotate: -52, scale: [1, -1], skewX: 2.27 },
    { src: asset("/decor/flower-group-c.svg"), box: [-72.29, 239.45, 204.024, 228.012], size: [221.654, 191.488], rotate: -86.73, skewX: 1.26 },
    { src: asset("/decor/flower-group-d.svg"), box: [63.59, 168.6, 280.394, 284.961], size: [221.654, 191.488], rotate: -120.98, scale: [1, -1], skewX: -1.26 },
  ],
};

export function Flower({
  preset,
  className,
  style,
}: {
  preset: FlowerPreset;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      className={className}
      style={{ overflow: "visible", ...style }}
      viewBox={preset.viewBox.join(" ")}
      preserveAspectRatio="none"
    >
      {preset.petals.map(({ src, box: [x, y, bw, bh], size: [w, h], rotate, scale = [1, 1], skewX = 0 }) => (
        <image
          key={src}
          href={src}
          width={w}
          height={h}
          preserveAspectRatio="none"
          transform={`translate(${x + bw / 2} ${y + bh / 2}) rotate(${rotate}) scale(${scale[0]} ${scale[1]}) skewX(${skewX}) translate(${-w / 2} ${-h / 2})`}
        />
      ))}
    </svg>
  );
}
