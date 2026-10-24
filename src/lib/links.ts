import { copy } from "@/content/copy";

// Prefix untuk file di public/ yang dipanggil lewat string biasa (bukan
// next/link atau import statis) — keduanya itu sudah otomatis ikut basePath.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// Demo game Nusaverse (dibuka di tab baru oleh tombol "Masuk Dunia Komodo").
// Env NEXT_PUBLIC_GAME_URL, kalau diisi, menggantikan alamat ini.
export const GAME_URL = process.env.NEXT_PUBLIC_GAME_URL || "https://nusaverse.vercel.app/";

export const NAV_LINKS = [
  { key: "beranda", label: copy.nav.beranda, href: "/" },
  { key: "dua-desa", label: copy.nav.duaDesa, href: "/#dua-desa" },
  { key: "jelajah", label: copy.nav.jelajah, href: "/#jelajah" },
  { key: "cerita", label: copy.nav.cerita, href: "/cerita" },
  { key: "tentang", label: copy.nav.tentang, href: "/tentang" },
];
