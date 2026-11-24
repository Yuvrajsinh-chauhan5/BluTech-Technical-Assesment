
"use client";

import { useEffect, useRef } from "react";
import { initPawTrail } from "@/animations/paw-trail";

export default function PawTrailCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    return initPawTrail(canvasRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="paw-trail-canvas"
    />
  );
}
