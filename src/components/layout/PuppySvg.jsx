"use client";

import { useEffect, useState } from "react";
import { DOG, COLORS, POSES } from "@/animations/puppy-model";

const round = (value) => Math.round(value * 100) / 100;

function rotate(degrees, [cx, cy]) {
  return `rotate(${round(degrees)} ${cx} ${cy})`;
}

export default function PuppySvg({
  pose = "peek",
  motion = {},
  animated = false,
}) {
  const p = POSES[pose] || POSES.peek;
  const [liveMotion, setLiveMotion] = useState({ time: 0, phase: 0 });

  useEffect(() => {
    if (!animated) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return undefined;

    let frame = 0;
    let startedAt = 0;
    let lastUpdate = 0;

    const tick = (now) => {
      if (!startedAt) startedAt = now;
      if (now - lastUpdate >= 24) {
        const elapsed = (now - startedAt) / 1000;
        setLiveMotion({ time: elapsed, phase: elapsed * 10.8 });
        lastUpdate = now;
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [animated]);

  const activeMotion = animated
    ? { ...motion, ...liveMotion }
    : motion;

  const time = activeMotion.time || 0;
  const phase = activeMotion.phase || 0;
  const stride = activeMotion.stride || 0;
  const wag = activeMotion.wag ?? 0.5;
  const gazeX = activeMotion.gazeX || 0;
  const gazeY = activeMotion.gazeY || 0;
  const blink = activeMotion.blink || 0;
  const ear = activeMotion.ear || 0;

  const d = Math.sin(phase);
  const f = Math.sin(phase + Math.PI);
  const strideAmplitude = 20 + 10 * stride;
  const bounce = (1 - Math.cos(2 * phase)) / 2;
  const walking = +(stride > 0.01);
  const idle = Math.sin(2.4 * time) * (1 - walking);

  const bodyY =
    p.bodyY -
    bounce * (2.5 + 4 * stride) * walking +
    0.6 * idle;

  const bodyRot =
    p.bodyRot + 1.6 * Math.sin(phase) * walking;

  const tailAmplitude = 5 + 17 * wag;
  const wagSpeed = 1.2 + 2.6 * wag;

  const tailAngle =
    p.tail +
    Math.sin(time * wagSpeed * Math.PI * 2) * tailAmplitude;

  const headBounce =
    -((1 - Math.cos(2 * phase - 0.7)) / 2) *
      (2 + 3 * stride) *
      walking +
    0.9 * idle;

  const bodyTransform = `
    translate(${round(p.bodyX)} ${round(bodyY)})
    ${rotate(bodyRot, [150, 228])}
    translate(150 0)
    scale(${round(p.stretch)} 1)
    translate(-150 0)
  `;

  const headTransform = `
    translate(${round(p.headX)} ${round(p.headY + headBounce)})
    ${rotate(
      p.headRot + 1.4 * Math.sin(phase) * walking,
      [212, 100]
    )}
  `;

  const frontLeg = (anchor, angle) => `
    translate(${anchor[0]} ${anchor[1]})
    rotate(${round(angle)})
  `;

  return (
    <svg
      className="puppy-svg tp-runner"
      viewBox="0 0 300 240"
      role="img"
      aria-label="Animated TeddyPups puppy"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="150"
        cy="230"
        rx="92"
        ry="7"
        fill={COLORS.dark}
        opacity=".12"
      />

      <g className="tp-runner__body" transform={bodyTransform}>
        {/* Tail */}
        <g className="tp-runner__tail" style={{ transformOrigin: "84px 150px" }} transform={rotate(tailAngle, [84, 150])}>
          <path
            d={DOG.tailStem}
            fill="none"
            stroke={COLORS.brown}
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path d={DOG.tail} fill={COLORS.caramel} stroke={COLORS.dark} strokeWidth="3.4" />
        </g>

        {/* Rear body */}
        <path
          d={DOG.body}
          fill={COLORS.caramel}
          stroke={COLORS.dark}
          strokeWidth="3.4"
          strokeLinejoin="round"
        />

        <path
          d={DOG.haunch}
          fill={COLORS.brown}
          stroke={COLORS.dark}
          strokeWidth="3.4"
        />

        {/* Back legs */}
        <g opacity={1 - p.sit}>
          <g className="tp-runner__leg tp-runner__leg--bn" style={{ transformOrigin: "110px 194px" }} transform={frontLeg([110, 194], p.bn + f * strideAmplitude * walking)}>
            <path d="M-10 -14 C-10 4 -12 18 -12 28 C-12 35 -7 38 0 38 C9 38 13 35 13 28 C13 18 10 4 10 -14Z" fill={COLORS.cream} stroke={COLORS.dark} strokeWidth="3.4" />
          </g>
          <g className="tp-runner__leg tp-runner__leg--bf" style={{ transformOrigin: "94px 192px" }} transform={frontLeg([94, 192], p.bf + d * strideAmplitude * walking)}>
            <path d="M-10 -14 C-10 4 -12 18 -12 28 C-12 35 -7 38 0 38 C9 38 13 35 13 28 C13 18 10 4 10 -14Z" fill={COLORS.cream} stroke={COLORS.dark} strokeWidth="3.4" />
          </g>
        </g>

        {/* Chest */}
        <path
          d={DOG.chest}
          fill={COLORS.cream}
          stroke={COLORS.dark}
          strokeWidth="3.4"
        />

        {/* Front legs */}
        <g>
          <g className="tp-runner__leg tp-runner__leg--fn" style={{ transformOrigin: "186px 194px" }} transform={frontLeg([186, 194], p.fn - p.bodyRot + d * strideAmplitude * walking)}>
            <path d="M-10 -14 C-10 4 -12 18 -12 28 C-12 35 -7 38 0 38 C9 38 13 35 13 28 C13 18 10 4 10 -14Z" fill={COLORS.cream} stroke={COLORS.dark} strokeWidth="3.4" />
          </g>
          <g className="tp-runner__leg tp-runner__leg--ff" style={{ transformOrigin: "168px 192px" }} transform={frontLeg([168, 192], p.ff - p.bodyRot + f * strideAmplitude * walking)}>
            <path d="M-10 -14 C-10 4 -12 18 -12 28 C-12 35 -7 38 0 38 C9 38 13 35 13 28 C13 18 10 4 10 -14Z" fill={COLORS.cream} stroke={COLORS.dark} strokeWidth="3.4" />
          </g>
        </g>

        {/* Head and ears */}
        <g transform={headTransform}>
          <g className="tp-runner__ear" style={{ transformOrigin: "174px 82px" }} transform={rotate(p.earL + ear + 4 * Math.sin(2 * phase) * walking, [174, 82])}>
            <path d={DOG.earL} fill={COLORS.brown} stroke={COLORS.dark} strokeWidth="3.4" />
          </g>

          <g className="tp-runner__ear tp-runner__ear--r" style={{ transformOrigin: "250px 82px" }} transform={rotate(p.earR - ear - 4 * Math.sin(2 * phase) * walking, [250, 82])}>
            <path d={DOG.earR} fill={COLORS.brown} stroke={COLORS.dark} strokeWidth="3.4" />
          </g>

          <path d={DOG.head} fill={COLORS.caramel} stroke={COLORS.dark} strokeWidth="3.4" />

          <path d={DOG.topknot} fill={COLORS.cream} stroke={COLORS.dark} strokeWidth="3.4" />

          <g transform={`translate(${round(3.4 * gazeX)} ${round(2.6 * gazeY)})`}>
            <g opacity={p.eyes}>
              <ellipse cx="194" cy="96" rx="4.5" ry="6" fill={COLORS.dark} />
              <ellipse cx="230" cy="96" rx="4.5" ry="6" fill={COLORS.dark} />
              <circle cx="195.5" cy="94" r="1.5" fill="white" />
              <circle cx="231.5" cy="94" r="1.5" fill="white" />
            </g>
          </g>

          <path d={DOG.muzzle} fill={COLORS.cream} stroke={COLORS.dark} strokeWidth="3.4" />
          <path d={DOG.nose} fill={COLORS.dark} />

          <path
            d={p.mouth ? DOG.mouthOpen : DOG.mouth}
            fill={p.mouth ? COLORS.dark : "none"}
            stroke={COLORS.dark}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <path
            d={DOG.tongue}
            fill={COLORS.tongue}
            opacity={p.tongue}
          />

          <path d={DOG.collar} fill={COLORS.gold} stroke={COLORS.dark} strokeWidth="3" />
          <path d={DOG.tag} fill={COLORS.blush} stroke={COLORS.dark} strokeWidth="1.5" />

          {/* Blink overlay */}
          <g
            transform={`translate(0 ${round(98 * blink * 0.92)}) scale(1 ${round(1 - 0.92 * blink)})`}
          >
            <path d="M185 96 Q194 91 202 96 M221 96 Q230 91 238 96" stroke={COLORS.dark} strokeWidth="3" fill="none" />
          </g>
        </g>
      </g>
    </svg>
  );
}