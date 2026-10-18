/**
 * Smooth-scroll helper — replaces Lenis + GSAP with native browser scrolling.
 * CSS `scroll-behavior: smooth` and `scroll-padding-top: 80px` are set in index.css.
 */

import { useEffect } from 'react';

const NAVBAR_OFFSET = 80;

export function scrollToSection(sectionId) {
  const el = document.querySelector(sectionId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Hook used once in Home — handles /#hash deep-links on first load.
 */
export function useLenis() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Two rAF ticks give layout a chance to settle before scrolling
      requestAnimationFrame(() =>
        requestAnimationFrame(() => scrollToSection(hash))
      );
    }
  }, []);
}
