"use client";

import { useEffect, useRef } from "react";

export default function PuppyFlight({ className = "tp-flight" }) {
  const svgRef = useRef(null);
  const routeRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const route = routeRef.current;
    const plane = planeRef.current;

    if (!svg || !route || !plane) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let frame = 0;

    const render = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = svg.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // The flight starts as this scene enters the viewport and finishes
        // as it leaves. Scroll position is the sole source of animation time.
        const scrollProgress = Math.min(
          1,
          Math.max(
            0,
            (viewportHeight - bounds.top) /
              Math.max(1, viewportHeight + bounds.height)
          )
        );

        const length = route.getTotalLength();
        const point = route.getPointAtLength(length * scrollProgress);
        const before = route.getPointAtLength(
          Math.max(0, length * scrollProgress - 0.75)
        );
        const after = route.getPointAtLength(
          Math.min(length, length * scrollProgress + 0.75)
        );
        const angle =
          (Math.atan2(after.y - before.y, after.x - before.x) * 180) /
          Math.PI;

        plane.setAttribute(
          "transform",
          `translate(${point.x} ${point.y}) rotate(${angle})`
        );
      });
    };

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        cancelAnimationFrame(frame);
        plane.setAttribute("transform", "translate(40 250)");
      } else {
        render();
      }
    };

    render();
    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("resize", render);
    reducedMotion.addEventListener?.("change", onMotionPreferenceChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", render);
      window.removeEventListener("resize", render);
      reducedMotion.removeEventListener?.("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 660 300"
      role="img"
      aria-label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai"
    >
      <defs>
        <clipPath id="tp-flight-puppy-window">
          <circle r="25" />
        </clipPath>
      </defs>

      <path
        ref={routeRef}
        id="tp-flight-route"
        d="M40 250 C 170 40, 470 20, 620 168"
        className="tp-flight__route"
      />
      <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
      <circle cx="620" cy="168" r="7" className="tp-flight__dot" />
      <text x="40" y="284" textAnchor="middle" className="tp-flight__label">
        Korea
      </text>
      <text x="620" y="202" textAnchor="middle" className="tp-flight__label">
        Dubai
      </text>

      <g ref={planeRef} transform="translate(40 250)">
        <g transform="translate(-126 -80)">
          <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing" />
          <path d="M108 112 L142 156 L172 156 L158 112 Z" className="tp-flight__wing tp-flight__wing--far" />
          <path d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z" className="tp-flight__body" />
          <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing" />
          <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line" />
        </g>
        <g transform="translate(10 2)">
          <image
            href="https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
            x="-25"
            y="-25"
            width="50"
            height="50"
            clipPath="url(#tp-flight-puppy-window)"
            preserveAspectRatio="xMidYMid slice"
          />
          <circle r="25" className="tp-flight__porthole" />
        </g>
      </g>
    </svg>
  );
}
