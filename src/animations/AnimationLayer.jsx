
"use client";

import { useEffect, useRef } from "react";
import { initPawTrail } from "./paw-trail";
import { initSmoothScroll } from "./smooth-scroll";

export default function AnimationLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanupSmoothScroll = initSmoothScroll();
    const cleanupPawTrail = initPawTrail(canvasRef.current);

    return () => {
      cleanupPawTrail();
      cleanupSmoothScroll();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="paw-trail-canvas"
    />
  );
}
