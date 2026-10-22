/*
 * Aturan judul card (satu sumber untuk semua card beranda):
 * - Nama tempat / tujuan — sesuatu yang dikunjungi (desa di Dua desa,
 *   kategori di Jelajah) → Momo Trust Display, H5 (H6 di layar < md).
 * - Judul artikel — sesuatu yang dibaca (card Cerita) → Plus Jakarta Sans
 *   bold, B1. Momo dipakai untuk nama, bukan kalimat.
 * Warna diatur pemanggil sesuai latar card.
 */
export const cardTitle = {
  place: "font-display font-normal text-h5 max-md:text-h6",
  article: "font-sans font-bold text-b1",
} as const;
