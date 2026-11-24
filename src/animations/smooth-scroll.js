
import Lenis from "lenis";

let activeLenis = null;

function isReducedMotion() {
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
}

export function scrollToTarget(target) {
  if (!target) return;

  if (activeLenis) {
    activeLenis.scrollTo(target);
    return;
  }

  target.scrollIntoView({
    behavior: isReducedMotion() ? "instant" : "smooth",
  });
}

export function initSmoothScroll() {
  const reducedMotion = isReducedMotion();
  const media = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  let lenis = null;
  let frame = 0;

  if (!reducedMotion && media.matches) {
    const root = document.documentElement;

    lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      wheelMultiplier: 0.85,
      prevent: (element) =>
        Boolean(element.closest?.("dialog, [data-lenis-prevent]")),
      virtualScroll: () =>
        getComputedStyle(root).overflowY !== "hidden",
    });

    activeLenis = lenis;

    let destroyed = false;

    const raf = (time) => {
      if (destroyed) return;

      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    const syncScroll = () => {
      lenis.scrollTo(lenis.actualScroll, { immediate: true });
    };

    window.addEventListener("tp:navigate", syncScroll);
    window.addEventListener("popstate", syncScroll);

    lenis.__cleanup = () => {
      destroyed = true;
      cancelAnimationFrame(frame);

      window.removeEventListener("tp:navigate", syncScroll);
      window.removeEventListener("popstate", syncScroll);

      lenis.destroy();

      if (activeLenis === lenis) {
        activeLenis = null;
      }
    };
  }

  function handleAnchorClick(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const anchor = event.target.closest?.('a[href*="#"]');

    if (!anchor || (anchor.target && anchor.target !== "_self")) {
      return;
    }

    const url = new URL(anchor.href, window.location.href);

    if (
      url.origin !== window.location.origin ||
      url.pathname !== window.location.pathname ||
      url.search !== window.location.search ||
      url.hash.length < 2
    ) {
      return;
    }

    let id;

    try {
      id = decodeURIComponent(url.hash.slice(1));
    } catch {
      return;
    }

    const target = [...document.querySelectorAll("[id]")].find(
      (element) =>
        element.id === id && element.getClientRects().length > 0
    );

    if (!target) return;

    event.preventDefault();
    scrollToTarget(target);
    window.history.pushState(null, "", url.hash);
  }

  window.addEventListener("click", handleAnchorClick);

  return () => {
    window.removeEventListener("click", handleAnchorClick);
    lenis?.__cleanup?.();
  };
}
