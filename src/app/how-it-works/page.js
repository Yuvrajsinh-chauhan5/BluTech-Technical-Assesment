"use client";

import { useEffect, useRef } from "react";
import { howItWorksMarkup } from "@/data/how-it-works-markup";

export default function HowItWorksPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const tablist = root.querySelector('[role="tablist"]');
    const tabs = tablist ? [...tablist.querySelectorAll('[role="tab"]')] : [];
    const panels = [...root.querySelectorAll('[role="tabpanel"]')];
    if (!tabs.length || !panels.length) return undefined;

    const activate = (index, moveFocus = false) => {
      const active = (index + tabs.length) % tabs.length;
      tabs.forEach((tab, i) => {
        const selected = i === active;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel, i) => {
        panel.hidden = i !== active;
      });
      tablist.style.setProperty("--at", String(active));
      if (moveFocus) tabs[active].focus();
    };

    const handlers = tabs.map((tab, index) => {
      const onClick = () => activate(index);
      const onKeyDown = (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "Home" || event.key === "End") {
          event.preventDefault();
          const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1);
          activate(next, true);
        }
      };
      tab.addEventListener("click", onClick);
      tab.addEventListener("keydown", onKeyDown);
      return () => {
        tab.removeEventListener("click", onClick);
        tab.removeEventListener("keydown", onKeyDown);
      };
    });

    activate(0);
    return () => handlers.forEach((dispose) => dispose());
  }, []);

  return <div ref={pageRef} dangerouslySetInnerHTML={{ __html: howItWorksMarkup }} />;
}
