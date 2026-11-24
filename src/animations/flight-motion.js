"use client";

import { useEffect } from "react";

/** Match the reference's 95%-to-25% viewport scroll range. */
function flightProgress(top, height, viewportHeight) {
  return Math.max(0, Math.min(1, (viewportHeight * 0.95 - top) / Math.max(1, height + viewportHeight * 0.7)));
}

/** Scroll-controlled travel along the original SVG dotted route.
 * The SVG path, plane artwork, tangent rotation and fade are all supplied by
 * the recovered reference page markup; this hook only updates its transform.
 */
export function useFlightMotion(path) {
  useEffect(() => {
    if (path !== "/" && path !== "/how-it-works") return undefined;

    const flights = [...document.querySelectorAll(".tp-flight")].map((container) => ({
      container,
      route: container.querySelector(".tp-flight__route"),
      plane: container.querySelector("svg > g"),
    })).filter((flight) => flight.route && flight.plane);

    if (!flights.length) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    const originals = flights.map(({ plane }) => ({
      transform: plane.getAttribute("transform"),
      opacity: plane.style.opacity,
    }));

    const update = () => {
      frame = 0;
      if (disposed) return;
      flights.forEach(({ container, route, plane }) => {
        const rect = container.getBoundingClientRect();
        const progress = reduced.matches
          ? 0.62
          : flightProgress(rect.top, rect.height, document.documentElement.clientHeight);
        const length = route.getTotalLength();
        const distance = Math.max(0, Math.min(length, progress * length));
        const point = route.getPointAtLength(distance);
        const after = route.getPointAtLength(Math.min(length, distance + 1));
        const before = route.getPointAtLength(Math.max(0, distance - 1));
        const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
        plane.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
        plane.style.opacity = String(Math.max(0, Math.min(1, (progress - 0.11) / 0.06)));
        container.dataset.flightMotion = "scroll";
        container.dataset.flightProgress = progress.toFixed(5);
      });
    };

    const schedule = () => {
      if (!disposed && !frame) frame = window.requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    flights.forEach(({ container }) => resize.observe(container));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    document.fonts?.ready?.then(schedule);
    update();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      flights.forEach(({ container, plane }, index) => {
        delete container.dataset.flightMotion;
        delete container.dataset.flightProgress;
        const original = originals[index];
        if (original.transform === null) plane.removeAttribute("transform");
        else plane.setAttribute("transform", original.transform);
        plane.style.opacity = original.opacity;
      });
    };
  }, [path]);
}
