"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFlightMotion } from "@/animations/flight-motion";
import { useLivePagePuppies } from "@/animations/live-page-puppies";
import { initSmoothScroll } from "@/animations/smooth-scroll";
import PawTrailCanvas from "@/components/layout/PawTrailCanvas";
import PuppyJourney from "@/components/layout/PuppyJourney";
import RouteCurtain from "@/components/layout/RouteCurtain";

const WHATSAPP_URL = "https://wa.me/971541676733";

export default function SiteInteractions() {
  const pathname = usePathname();
  useFlightMotion(pathname);
  useLivePagePuppies(pathname);
  useEffect(() => {
    return initSmoothScroll();
  }, []);

  useEffect(() => {
    const hero = document.querySelector(".hero-stage");
    const journey = document.querySelector(".tp-chat");
    const steps = journey ? [...journey.querySelectorAll(".tp-chat__step")] : [];
    let frame = 0;

    const updateScrollStates = () => {
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        hero.dataset.here = heroBottom > window.innerHeight * 0.25 ? "true" : "false";
      }

      if (!journey || !steps.length) return;

      const sectionRect = journey.getBoundingClientRect();
      const activeLine = window.innerHeight * 0.44;
      let activeIndex = 0;

      if (sectionRect.bottom < activeLine) {
        activeIndex = steps.length - 1;
      } else if (sectionRect.top <= activeLine) {
        let nearestDistance = Infinity;
        steps.forEach((step, index) => {
          const rect = step.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - activeLine);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            activeIndex = index;
          }
        });
      }

      steps.forEach((step, index) => {
        if (index === activeIndex) step.dataset.active = "true";
        else step.removeAttribute("data-active");

        if (index < activeIndex) step.dataset.done = "true";
        else step.removeAttribute("data-done");
      });
    };

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateScrollStates();
      });
    };

    updateScrollStates();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <PawTrailCanvas />
      <RouteCurtain />
      <PuppyJourney />
      <a
        className="mobile-whatsapp-bar"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with TeddyPups on WhatsApp"
      >
        <span aria-hidden="true">◉</span>
        Chat with us on WhatsApp
        <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}
