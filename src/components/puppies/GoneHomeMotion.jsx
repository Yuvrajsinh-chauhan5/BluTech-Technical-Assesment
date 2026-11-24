"use client";

import { useEffect } from "react";

export default function GoneHomeMotion() {
  useEffect(() => {
    const cards = document.querySelectorAll(".tp-tickets > .tp-ticket[data-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      cards.forEach((card) => {
        card.dataset.revealed = "true";
        card.dataset.visited = "true";
      });
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.revealed = "true";
        entry.target.dataset.visited = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    cards.forEach((card) => {
      card.dataset.armed = "true";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
