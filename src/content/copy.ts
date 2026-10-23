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
    ctaGame: "Masuk Dunia Komodo",
    ctaVillages: "Kenali dua desa",
  },
  duaDesa: {
    title: "Dari bukit sampai ke laut",
    subtitle: "Dua desa tempat kami ber-KKN pada 2027.",
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
  jelajah: {
    title: "Ada apa di dua desa ini?",
    subtitle: "Tempat yang layak kamu datangi dan karya warga yang bisa kamu bawa pulang.",
    cta: "Jelajahi semuanya",
    categories: {
      wisata: {
        title: "Wisata",
        // sumber: https://www.fortuneidn.com/news/golo-mori-todo-cama-gali-peluang-peningkatan-ekonomi-di-golo-mori-00-4vfn9-92m22b
        // sumber: https://kupang.antaranews.com/berita/147257/bpolbf-sebut-daya-tarik-desa-warloka-pesisir-potensial-dukung-labuan-bajo
        // VERIFIKASI LAPANGAN: "hutan mangrove"
        description: "Bukit, pantai, hutan mangrove, dan sudut yang belum banyak orang tahu.",
      },
      umkm: {
        title: "UMKM & karya lokal",
        description: "Kopi, olahan ikan, kain tenun, dan oleh-oleh buatan warga sendiri.",
      },
    },
  },
  cerita: {
    title: "Cerita dari Komodo",
    subtitle: "Kisah warga, jejak sejarah, dan catatan kami dari dua desa.",
    cta: "Baca semua cerita",
    cardCta: "Baca cerita",
    stories: {
      kenalan: {
        title: "Kenalan dengan Golo Mori",
        category: "Cerita desa",
        excerpt: "Sebelum berangkat, kami mencari tahu: seperti apa hidup di desa perbukitan yang bertemu laut?",
      },
      warloka: {
        title: "Jejak masa lalu di Situs Warloka",
        category: "Sejarah & fakta unik",
        // sumber: https://etd.repository.ugm.ac.id/home/detail_pencarian_downloadfiles/1389220
        // (Situs Warloka = situs arkeologi di Kec. Komodo, menghadap Selat Molo.)
        excerpt: "Apa yang disimpan Situs Warloka, dan cerita apa yang masih diingat warga?",
      },
      sampah: {
        title: "Memilah sampah bersama warga Golo Mori",
        // Status: rencana (KKN berjalan 2027). Ganti ke "Catatan KKN" dan tulis
        // ulang ringkasan setelah program benar-benar berjalan.
        category: "Rencana KKN",
        excerpt: "Seperti apa program pemilahan sampah yang akan kami jalankan bersama warga Golo Mori.",
      },
    },
  },
  // Tanpa kata ganti (bukan "kami"/"kamu").
  mitra: {
    title: "Didukung para mitra",
    subtitle: "Terima kasih kepada sponsor dan mitra media yang mendukung KKN Menyapa Komodo 2027.",
    groups: { sponsor: "Sponsor", media: "Mitra media" },
  },
  galeri: {
    title: "Galeri",
    hint: "Gulir untuk membuka album",
    coverTagline: "Menyapa Komodo · 2027",
    leftPage: "Golo Mori & Warloka Pesisir",
    rightPage: "Potret alam dan warga dua desa. Album ini akan terus kami isi selama KKN 2027.",
    cta: "Lihat semua foto",
  },
  site: {
    title: "Menyapa Komodo · KKN-PPM UGM 2027",
    description:
      "Kenalan dengan Golo Mori dan Warloka Pesisir, dua desa tujuan KKN-PPM UGM 2027 di ujung barat Flores.",
  },
  // Hanya teks label; tujuan tautan ada di lib/links.ts.
  nav: {
    beranda: "Beranda",
    duaDesa: "Dua desa",
    jelajah: "Jelajah",
    cerita: "Cerita",
    tentang: "Tentang",
  },
  footer: {
    eyebrow: "KKN-PPM UGM 2027",
    brand: "Menyapa Komodo",
    // sumber: https://ugm.ac.id/id/berita/ugm-kirim-ribuan-mahasiswa-kkn-untuk-bangun-masyarakat-di-400-desa/
    // (kepanjangan resmi KKN-PPM)
    description:
      "Dibuat oleh tim Kuliah Kerja Nyata–Pembelajaran Pemberdayaan Masyarakat (KKN-PPM) UGM 2027 untuk mengenalkan Golo Mori dan Warloka Pesisir, Manggarai Barat, Nusa Tenggara Timur.",
    copyright: "© 2027 KKN-PPM UGM · Menyapa Komodo",
  },
  comingSoon: {
    metaTitle: "Segera hadir · Menyapa Komodo",
    titleLines: ["Yah, halaman ini belum jadi.", "Kami sedang menyiapkannya."],
    cta: "Kembali ke beranda",
  },
} as const;
