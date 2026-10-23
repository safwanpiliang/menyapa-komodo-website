// Hitung rasio kontras WCAG untuk pasangan teks/latar di tombol & card.
// Nilai warna dibaca langsung dari token @theme di src/app/globals.css,
// jadi skrip ini selalu mencerminkan token yang sedang dipakai.
//
//   node scripts/contrast.mjs
//
// Notasi latar "primary-400/10@white" = primary-400 opasitas 10% di atas putih
// (sama seperti kelas Tailwind bg-primary-400/10 di atas card putih).
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
);
tokens.white = "#FFFFFF";

function hex(name) {
  const value = tokens[name];
  if (!value) throw new Error(`Token tidak ditemukan: ${name}`);
  const ref = value.match(/^var\(--color-([\w-]+)\)$/);
  return ref ? hex(ref[1]) : value;
}

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

function color(expr) {
  const [top, base] = expr.split("@");
  const [name, alpha] = top.split("/");
  const fg = rgb(hex(name));
  if (!alpha) return fg;
  const a = Number(alpha) / 100;
  const bg = color(base ?? "white");
  return fg.map((c, i) => c * a + bg[i] * (1 - a));
}

function luminance([r, g, b]) {
  const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(fg, bg) {
  const [a, b] = [luminance(color(fg)), luminance(color(bg))].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

// Pasangan yang sengaja dibiarkan di bawah minimum atas keputusan tim:
// tetap dilaporkan ❌, tapi tidak membuat skrip gagal.
const accepted = new Set([
  "Tombol secondary (CTA hero)",
  "Tombol secondary (hover)",
  "Tombol light (teks oranye)",
  "Tombol light (hover)",
]);

// [label, [teks, latar] sebelum, [teks, latar] sesudah, minimum]
// Minimum 4.5 untuk teks biasa; 3 hanya untuk teks besar (≥24px, atau ≥18.67px bold).
const pairs = [
  ["Tombol primary", ["white", "primary-400"], ["white", "action-primary"], 4.5],
  ["Tombol primary (hover)", ["white", "primary-500"], ["white", "action-primary-hover"], 4.5],
  ["Tombol secondary (CTA hero)", ["white", "secondary-400"], ["white", "action-secondary"], 4.5],
  ["Tombol secondary (hover)", ["white", "secondary-500"], ["white", "action-secondary-hover"], 4.5],
  ["Tombol light (teks oranye)", ["secondary-400", "white"], ["action-secondary", "white"], 4.5],
  ["Tombol light (hover)", ["secondary-400", "disabled-fill"], ["action-secondary", "disabled-fill"], 4.5],
  ["Tombol ghost (aksi card)", ["primary-400", "white"], ["action-primary", "white"], 4.5],
  ["Tombol ghost (hover)", ["primary-400", "primary-400/10@white"], ["action-primary-hover", "primary-400/10@white"], 4.5],
  ["Card Dua desa · judul", ["white", "neutral-1100"], ["white", "neutral-1100"], 4.5],
  ["Card Dua desa · isi", ["neutral-300", "neutral-1100"], ["neutral-300", "white/8@neutral-1100"], 4.5],
  ["Card Dua desa · tautan", ["white", "primary-400"], ["primary-200", "white/8@neutral-1100"], 4.5],
  ["Card Jelajah · judul", ["neutral-1000", "white"], ["neutral-1000", "white"], 4.5],
  ["Card Jelajah · isi", ["neutral-800", "white"], ["ink-body", "white"], 4.5],
  ["Card Cerita · judul", ["neutral-1000", "white"], ["neutral-1000", "white"], 4.5],
  ["Card Cerita · isi", ["neutral-800", "white"], ["ink-body", "white"], 4.5],
  ["Card Cerita · chip oranye", ["secondary-400", "secondary-400/10@white"], ["chip-secondary", "secondary-400/10@white"], 4.5],
  ["Card Cerita · chip hijau", ["primary-400", "primary-400/10@white"], ["chip-primary", "primary-400/10@white"], 4.5],
  ["Card Cerita · chip abu", ["neutral-900", "neutral-600"], ["neutral-900", "neutral-600"], 4.5],
  ["Halaman album Galeri · isi", ["neutral-800", "neutral-100"], ["ink-body", "neutral-100"], 4.5],
];

const fmt = (n) => n.toFixed(2);
const mark = (n, min) => (n >= min ? "✅" : "❌");
console.log("| Pasangan | Sebelum | Sesudah |");
console.log("| --- | --- | --- |");
let failed = 0;
for (const [label, before, after, min] of pairs) {
  const b = ratio(...before);
  const a = ratio(...after);
  const note = a < min && accepted.has(label) ? " (keputusan tim)" : "";
  if (a < min && !note) failed++;
  console.log(`| ${label} | ${fmt(b)}:1 ${mark(b, min)} | ${fmt(a)}:1 ${mark(a, min)}${note} |`);
}
if (failed) {
  console.error(`\n${failed} pasangan masih di bawah minimum.`);
  process.exit(1);
}
