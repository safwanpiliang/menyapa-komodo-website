// Prefix untuk file di public/ yang dipanggil lewat string biasa (bukan
// next/link atau import statis) — keduanya itu sudah otomatis ikut basePath.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// URL game KomodoVerse (Vite, root repo). Override lewat env saat deploy.
export const GAME_URL = process.env.NEXT_PUBLIC_GAME_URL ?? "http://localhost:5173";

export const NAV_LINKS = [
  { key: "beranda", label: "Beranda", href: "/" },
  { key: "jelajah", label: "Jelajah", href: "/#jelajah" },
  { key: "dua-desa", label: "Dua Desa", href: "/#dua-desa" },
  { key: "cerita", label: "Cerita", href: "/cerita" },
  { key: "tentang", label: "Tentang", href: "/tentang" },
];
