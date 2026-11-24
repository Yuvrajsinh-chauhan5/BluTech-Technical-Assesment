"use client";

import { useEffect } from "react";
import { PuppyDriver } from "@/animations/reference-motion";

const ANIMATED_PAGE_ROUTES = new Set(["/how-it-works", "/faq"]);

/** Reuse the reference puppy's eye, blink, ear and tail motion on page mascots.
 * Existing SVG artwork, pose, facing and layout are left untouched.
 */
export function useLivePagePuppies(path) {
  useEffect(() => {
    const isPuppyDetailRoute = path.startsWith("/puppies/");
    if (!ANIMATED_PAGE_ROUTES.has(path) && !isPuppyDetailRoute) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    const start = () => {
      dispose();
      if (reduced.matches) return;

      const entries = [...document.querySelectorAll("#main-content .pup-buddy")]
        .filter((element) => !element.closest("[data-pup-stop]"))
        .flatMap((element) => {
          const svg = element.querySelector("svg");
          if (!svg) return [];
          const original = [...svg.querySelectorAll("[data-p]")]
            .map((node) => ({
              node,
              transform: node.getAttribute("transform"),
              opacity: node.getAttribute("opacity"),
            }));
          const bodyNode = svg.querySelector('[data-p="body"]');
          const body = bodyNode?.getAttribute("transform") || "";
          const isPeeking = bodyNode?.getAttribute("opacity") === "0" ||
            svg.querySelector('[data-p="ledge"]')?.getAttribute("opacity") === "1";
          const pose = isPeeking ? "peek" : /rotate\(15(?:\s|\))/.test(body) ? "bow" : "sit";
          const driver = new PuppyDriver(svg, pose, element.dataset.facing === "left" ? -1 : 1);
          const rect = element.getBoundingClientRect();
          element.dataset.live = "true";
          element.dataset.petting = "false";
          driver.wag(0.6);
          return [{ element, svg, driver, original, visible: rect.bottom > 0 && rect.top < window.innerHeight }];
        });

      if (!entries.length) return;

      let frame = 0;
      let last = 0;
      let pointer = null;

      const tick = (now) => {
        frame = 0;
        const seconds = now / 1000;
        const delta = Math.min(0.05, last ? (now - last) / 1000 : 1 / 60);
        last = now;
        entries.forEach((entry) => {
          if (!entry.visible) return;
          entry.driver.lookAt(pointer && now - pointer.at < 2500 ? pointer : null);
          entry.driver.tick(delta, seconds);
        });
        if (entries.some((entry) => entry.visible)) frame = requestAnimationFrame(tick);
        else last = 0;
      };

      const wake = () => {
        if (!frame && entries.some((entry) => entry.visible)) frame = requestAnimationFrame(tick);
      };
      const observer = new IntersectionObserver((changes) => {
        changes.forEach((change) => {
          const entry = entries.find((item) => item.element === change.target);
          if (entry) entry.visible = change.isIntersecting;
        });
        wake();
      }, { threshold: 0 });

      const subscriptions = entries.map((entry) => {
        const enter = (event) => {
          if (event.pointerType !== "mouse") return;
          entry.element.dataset.petting = "true";
          entry.driver.petting(true);
          entry.driver.wag(1);
          wake();
        };
        const leave = () => {
          entry.element.dataset.petting = "false";
          entry.driver.petting(false);
          entry.driver.wag(0.6);
        };
        entry.element.addEventListener("pointerenter", enter);
        entry.element.addEventListener("pointerleave", leave);
        observer.observe(entry.element);
        return () => {
          entry.element.removeEventListener("pointerenter", enter);
          entry.element.removeEventListener("pointerleave", leave);
        };
      });

      const move = (event) => {
        if (event.pointerType === "mouse") pointer = { x: event.clientX, y: event.clientY, at: performance.now() };
      };
      window.addEventListener("pointermove", move, { passive: true });
      wake();

      dispose = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        subscriptions.forEach((unsubscribe) => unsubscribe());
        window.removeEventListener("pointermove", move);
        entries.forEach(({ element, original }) => {
          delete element.dataset.live;
          delete element.dataset.petting;
          original.forEach(({ node, transform, opacity }) => {
            if (transform === null) node.removeAttribute("transform");
            else node.setAttribute("transform", transform);
            if (opacity === null) node.removeAttribute("opacity");
            else node.setAttribute("opacity", opacity);
          });
        });
      };
    };

    start();
    reduced.addEventListener("change", start);
    return () => {
      reduced.removeEventListener("change", start);
      dispose();
    };
  }, [path]);
}
