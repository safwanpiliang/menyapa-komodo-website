import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Salinan `cn` dari assets-design-system. Versi package tidak bisa dipanggil
// dari Server Component karena seluruh bundle-nya bertanda "use client".
// Grup font-size diperluas supaya text-h2 tidak dibuang saat digabung
// dengan text-primary-400.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "b1", "b2", "b3", "b4", "b5"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
