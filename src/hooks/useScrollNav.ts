"use client";

import { useEffect } from "react";

const NAVBAR_OFFSET = 80;

export function scrollToSection(sectionId: string) {
  const el = document.querySelector(sectionId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

/** Handles /#hash deep-links on first load. */
export function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => scrollToSection(hash))
      );
    }
  }, []);
}
