"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PuppySvg from "@/components/layout/PuppySvg";

const PRINTS = [
  [18, 6, -76],
  [27, -4, -84],
  [36, 7, -72],
  [45, -3, -86],
  [54, 6, -74],
];

function clearTimers(timerRef) {
  timerRef.current.forEach((id) => window.clearTimeout(id));
  timerRef.current.clear();
}

export default function RouteCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef(null);
  const previousPathRef = useRef(pathname);
  const pendingRef = useRef(null);
  const timersRef = useRef(new Set());
  const [state, setState] = useState("intro");
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      const allowed = !reduced.matches;
      setMotionAllowed(allowed);

      if (!allowed) {
        const pendingDestination = pendingRef.current;
        clearTimers(timersRef);
        pendingRef.current = null;
        setState("idle");

        // If reduced motion is enabled mid-transition, do not cancel navigation.
        if (pendingDestination && pendingDestination !== "history") {
          router.push(pendingDestination);
        }
      }
    };

    syncMotionPreference();
    reduced.addEventListener?.("change", syncMotionPreference);

    const later = (callback, delay) => {
      const id = window.setTimeout(() => {
        timersRef.current.delete(id);
        callback();
      }, delay);
      timersRef.current.add(id);
      return id;
    };

    const lift = () => {
      clearTimers(timersRef);
      pendingRef.current = null;
      setState("lifting");
      window.dispatchEvent(new Event("tp:arrived"));
      later(() => setState("idle"), 460);
    };

    const handleClick = (event) => {
      if (
        !motionAllowed ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target?.closest?.("a[href]");
      if (
        !anchor ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download") ||
        anchor.hasAttribute("data-no-curtain")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        /^\/(admin|api|media|_next)(\/|$)/.test(destination.pathname) ||
        (destination.pathname === window.location.pathname &&
          destination.search === window.location.search)
      ) {
        return;
      }

      event.preventDefault();

      const href =
        destination.pathname + destination.search + destination.hash;

      pendingRef.current = href;
      router.prefetch(destination.pathname + destination.search);

      clearTimers(timersRef);
      setState("covering");

      later(() => {
        if (pendingRef.current !== href) return;

        setState("covered");
        router.push(href);

        later(() => {
          if (pendingRef.current === href) lift();
        }, 6000);
      }, 300);
    };

    const handlePopState = () => {
      if (!motionAllowed) return;

      pendingRef.current = "history";
      clearTimers(timersRef);
      setState("snap");

      later(() => {
        if (pendingRef.current === "history") lift();
      }, 1500);
    };

    if (motionAllowed) {
      later(() => {
        if (root.dataset.state === "intro") setState("idle");
      }, 1080);
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      clearTimers(timersRef);
      reduced.removeEventListener?.("change", syncMotionPreference);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [motionAllowed, router]);

  useEffect(() => {
    if (pathname === previousPathRef.current) return;
    previousPathRef.current = pathname;

    if (!pendingRef.current || !motionAllowed) return;

    clearTimers(timersRef);
    pendingRef.current = null;
    setState("lifting");
    window.dispatchEvent(new Event("tp:arrived"));

    const id = window.setTimeout(() => setState("idle"), 460);
    timersRef.current.add(id);
  }, [motionAllowed, pathname]);

  useEffect(() => {
    return () => clearTimers(timersRef);
  }, []);

  return (
    <div
      ref={rootRef}
      className="tp-curtain"
      data-state={state}
      aria-hidden="true"
    >
      <div className="tp-curtain__blanket">
        <svg
          className="tp-curtain__edge tp-curtain__edge--top"
          width="100%"
          height="40"
          preserveAspectRatio="none"
          viewBox="0 0 1440 40"
        >
          <defs>
            <pattern
              id="tp-curtain-scallop"
              width="76"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fbe3b4" />
              <path
                d="M0 27A38 25 0 0 1 76 27"
                fill="none"
                stroke="#2a170e"
                strokeWidth="3"
              />
              <path
                d="M11 33A27 19 0 0 1 65 33"
                fill="none"
                stroke="#2a170e"
                strokeWidth="1.6"
                strokeDasharray="3.5 5.5"
                strokeLinecap="round"
                opacity=".42"
              />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop)" />
        </svg>

        <div className="tp-curtain__stage">
          <div className="tp-curtain__prints">
            {PRINTS.map(([left, top, rotate], index) => (
              <svg
                key={index}
                viewBox="0 0 64 64"
                className="tp-curtain__print"
                style={{
                  left: `${left}%`,
                  top,
                  rotate: `${rotate + 90}deg`,
                  animationDelay: `${0.16 + 0.12 * index}s`,
                }}
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71Z" />
              </svg>
            ))}
          </div>

          <div className="tp-curtain__runner">
            <PuppySvg pose="walk" />
          </div>

          <p className="tp-curtain__note">every puppy is family</p>
        </div>

        <svg
          className="tp-curtain__edge tp-curtain__edge--bottom"
          width="100%"
          height="40"
          preserveAspectRatio="none"
          viewBox="0 0 1440 40"
        >
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop)" />
        </svg>
      </div>
    </div>
  );
}
