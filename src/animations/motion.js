
/**
 * Shared animation utilities.
 *
 * Keep animation behavior centralized here.
 * Individual animations should live in their own files.
 */

export function prefersReducedMotion() {
    if (typeof window === "undefined") {
      return true;
    }
  
    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }
  
  export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  export function getScrollProgress(element) {
    if (!element || typeof window === "undefined") {
      return 0;
    }
  
    const rect = element.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
  
    if (scrollableDistance <= 0) {
      return 0;
    }
  
    return clamp(-rect.top / scrollableDistance, 0, 1);
  }
  