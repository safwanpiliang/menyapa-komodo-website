/*
 * Semua teks beranda di satu tempat, dikelompokkan per section. Ubah teks di
 * sini; komponen hanya membaca dari objek ini.
 *
 * Aturan suara (hasil audit copywriting):
 * - "kamu" untuk pembaca, "kami" untuk tim. Section Mitra tanpa kata ganti.
 * - Huruf kapital kalimat biasa untuk judul dan tombol (nama diri tetap
 *   kapital: Golo Mori, Warloka Pesisir, Dunia Komodo, Menyapa Komodo).
 * - Padanan Indonesia: "Gulir", "Fakta unik", "Mitra media".
 * - Klaim faktual diberi komentar sumber. Klaim bertanda VERIFIKASI LAPANGAN
 *   perlu dicek tim saat di desa.
 */

export const copy = {
  hero: {
    eyebrow: "KKN-PPM UGM 2027",
    titleTop: "Menyapa",
    titleBottom: "Komodo",
    subtitle: "Kenalan dengan Golo Mori dan Warloka Pesisir, dua desa di ujung barat Flores.",
    ctaGame: "Masuk Dunia Komodo",
    ctaVillages: "Kenali dua desa",
  },
  duaDesa: {
    title: "Dari bukit sampai ke laut",
    subtitle: "Dua desa tempat kami ber-KKN pada 2027. Kenalan dulu, yuk.",
    villages: {
      "golo-mori": {
        // sumber: https://www.fortuneidn.com/news/golo-mori-todo-cama-gali-peluang-peningkatan-ekonomi-di-golo-mori-00-4vfn9-92m22b
        // VERIFIKASI LAPANGAN: "sawah dan hutan mangrove"
        // sumber: https://www.setneg.go.id/baca/index/ktt_ke_42_asean_diawali_pertemuan_pejabat_senior
        // (KTT ASEAN ke-42 dibuka dengan pertemuan pejabat senior di Golo Mori
        // Convention Center, 8 Mei 2023; acara puncaknya di Labuan Bajo.)
        description:
          "Bukit, pantai, sawah, dan hutan mangrove ada dalam satu desa. Pada 2023, rangkaian KTT ASEAN ke-42 dibuka di desa ini.",
        cta: "Kenali Golo Mori",
      },
      "warloka-pesisir": {
        // sumber: https://kupang.antaranews.com/berita/147257/bpolbf-sebut-daya-tarik-desa-warloka-pesisir-potensial-dukung-labuan-bajo
        // VERIFIKASI LAPANGAN: "Bukit Kenangan"
        description:
          "Kampung pesisir di Teluk Warloka, tempat warga hidup dari laut. Dari Bukit Kenangan, laut biru dan pulau-pulau kecil terbentang di depan mata.",
        cta: "Kenali Warloka Pesisir",
      },
    },
  },
} as const;
