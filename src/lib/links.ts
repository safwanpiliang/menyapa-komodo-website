// Prefix untuk file di public/ yang dipanggil lewat string biasa (bukan
// next/link atau import statis) — keduanya itu sudah otomatis ikut basePath.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// URL game KomodoVerse (Vite, root repo). Selama game belum di-deploy, tombol
// "Masuk Dunia Komodo" mengarah ke /dunia-komodo yang belum ada, sehingga
// tampil halaman Coming Soon. Isi env NEXT_PUBLIC_GAME_URL saat game sudah online.
export const GAME_URL = process.env.NEXT_PUBLIC_GAME_URL || "/dunia-komodo";

export const NAV_LINKS = [
  { key: "beranda", label: "Beranda", href: "/" },
  { key: "dua-desa", label: "Dua Desa", href: "/#dua-desa" },
  { key: "jelajah", label: "Jelajah", href: "/#jelajah" },
  { key: "cerita", label: "Cerita", href: "/cerita" },
  { key: "tentang", label: "Tentang", href: "/tentang" },
];
