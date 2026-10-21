"use client";

import { useEffect } from "react";

/*
 * Memasang `.is-revealed` sekali pada setiap elemen `.reveal` / `.reveal-media`
 * saat elemen itu pertama kali masuk layar (lihat globals.css). Memakai
 * IntersectionObserver, jadi tidak ada kerja apa pun per frame saat scroll.
 */
export function RevealOnScroll() {
  useEffect(() => {
    // Menonaktifkan animasi cadangan CSS (yang hanya untuk saat JS gagal).
    document.documentElement.dataset.reveal = "on";
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.is-revealed), .reveal-media:not(.is-revealed)");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      // Mulai sedikit sebelum benar-benar terlihat penuh, supaya terasa sigap.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
