
// // "use client";

// // import { useEffect, useRef } from "react";
// // import Link from "next/link";

// // export default function PuppyShowroom({ puppies }) {
// //   const sectionRef = useRef(null);
// //   const stageRef = useRef(null);
// //   const trackRef = useRef(null);

// //   useEffect(() => {
// //     const section = sectionRef.current;
// //     const stage = stageRef.current;
// //     const track = trackRef.current;

// //     if (!section || !stage || !track) return;

// //     const desktop = window.matchMedia("(min-width: 900px)");
// //     let frame = 0;
// //     let maxTravel = 0;
// //     let sectionStart = 0;

// //     const measure = () => {
// //       cancelAnimationFrame(frame);

// //       if (!desktop.matches) {
// //         section.removeAttribute("data-pinned");
// //         section.style.height = "";
// //         track.style.transform = "";
// //         return;
// //       }

// //       section.setAttribute("data-pinned", "true");

// //       const headerHeight =
// //         parseFloat(
// //           getComputedStyle(document.documentElement)
// //             .getPropertyValue("--header-height")
// //         ) || 0;

// //       const stageHeight = window.innerHeight - headerHeight;

// //       maxTravel = Math.max(
// //         0,
// //         track.scrollWidth - window.innerWidth
// //       );

// //       section.style.height = `${stageHeight + maxTravel}px`;

// //       sectionStart =
// //         window.scrollY +
// //         section.getBoundingClientRect().top -
// //         headerHeight;

// //       update();
// //     };

// //     const update = () => {
// //       cancelAnimationFrame(frame);

// //       frame = requestAnimationFrame(() => {
// //         if (!desktop.matches) return;

// //         const distance = window.scrollY - sectionStart;

// //         const progress =
// //           maxTravel > 0
// //             ? Math.max(0, Math.min(1, distance / maxTravel))
// //             : 0;

// //         track.style.transform =
// //           `translate3d(${-maxTravel * progress}px, 0, 0)`;
// //       });
// //     };

// //     const observer = new ResizeObserver(measure);

// //     observer.observe(track);
// //     observer.observe(stage);

// //     window.addEventListener("scroll", update, { passive: true });
// //     window.addEventListener("resize", measure);
// //     desktop.addEventListener("change", measure);

// //     measure();

// //     return () => {
// //       cancelAnimationFrame(frame);
// //       observer.disconnect();

// //       window.removeEventListener("scroll", update);
// //       window.removeEventListener("resize", measure);
// //       desktop.removeEventListener("change", measure);
// //     };
// //   }, []);

// //   return (
// //     <section
// //       ref={sectionRef}
// //       className="puppy-showroom"
// //       aria-label="Puppies looking for a family"
// //     >
// //       <div
// //         ref={stageRef}
// //         className="puppy-showroom__stage"
// //       >
// //         {/* MEET SECTION HEADING — CORRECT POSITION */}
// //         <header className="puppy-showroom__head">
// //           <div>
// //             <h2 className="home-heading">Meet the pups</h2>

// //             <p className="home-lede">
// //               See them, love them, take them home. Come meet our locally available puppies before you decide.
// //             </p>
// //           </div>

// //           <Link
// //             href="/puppies"
// //             className="button button-primary"
// //           >
// //             Meet local puppies
// //           </Link>
// //         </header>

// //         {/* PUPPY DOOR SHOWROOM */}
// //         <div className="puppy-showroom__hall">
// //           <ol
// //             ref={trackRef}
// //             className="puppy-grid"
// //             aria-label="Puppies looking for a family"
// //           >
// //             {puppies.map((puppy, index) => (
// //               <li
// //                 className="puppy-card"
// //                 key={puppy.href}
// //                 data-open={index === 0 ? "true" : undefined}
// //                 style={{ "--door": puppy.door }}
// //               >
// //                 <Link
// //                   href={puppy.href}
// //                   className="puppy-card__link"
// //                   aria-label={`Meet ${puppy.name}, ${puppy.meta}`}
// //                 >
// //                   <span className="puppy-card__heading">
// //                     <span className="puppy-card__name">
// //                       {puppy.name}
// //                     </span>

// //                     <span className="puppy-card__meta">
// //                       {puppy.meta}
// //                     </span>
// //                   </span>

// //                   <span className="puppy-card__frame">
// //                     <span className="puppy-card__room">
// //                       <img
// //                         src={puppy.src}
// //                         alt={puppy.alt}
// //                         loading="lazy"
// //                         style={{
// //                           objectPosition: puppy.position,
// //                         }}
// //                       />
// //                     </span>

// //                     <span
// //                       className="puppy-card__leaf"
// //                       aria-hidden="true"
// //                     >
// //                       <span className="puppy-card__panel" />
// //                       <span className="puppy-card__peephole" />
// //                       <span className="puppy-card__knob" />
// //                     </span>

// //                     <span className="puppy-card__tag">
// //                       Available
// //                     </span>
// //                   </span>
// //                 </Link>
// //               </li>
// //             ))}

// //             {/* FINAL MEET THEM ALL DOOR */}
// //             <li className="puppy-card puppy-card--all">
// //               <Link
// //                 href="/puppies"
// //                 className="puppy-card__all-link"
// //               >
// //                 <span className="puppy-card__all-door">
// //                   <span className="puppy-card__all-symbol">
// //                     ↗
// //                   </span>

// //                   <span className="puppy-card__all-label">
// //                     Meet them all
// //                   </span>
// //                 </span>
// //               </Link>
// //             </li>
// //           </ol>

// //           <div
// //             className="puppy-showroom__floor"
// //             aria-hidden="true"
// //           />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useEffect, useRef } from "react";
// import Link from "next/link";

// export default function PuppyShowroom({ puppies }) {
//   const sectionRef = useRef(null);
//   const stageRef = useRef(null);
//   const trackRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const stage = stageRef.current;
//     const track = trackRef.current;

//     if (!section || !stage || !track) return;

//     const desktop = window.matchMedia("(min-width: 900px)");

//     let frame = 0;
//     let maxTravel = 0;
//     let sectionStart = 0;

//     const measure = () => {
//       cancelAnimationFrame(frame);

//       if (!desktop.matches) {
//         section.removeAttribute("data-pinned");
//         section.removeAttribute("data-here");
//         section.style.height = "";
//         track.style.transform = "";

//         track.querySelectorAll(".puppy-card").forEach((card) => {
//           card.removeAttribute("data-in-view");
//         });

//         return;
//       }

//       section.setAttribute("data-pinned", "true");

//       const headerHeight =
//         parseFloat(
//           getComputedStyle(document.documentElement)
//             .getPropertyValue("--header-height")
//         ) || 0;

//       const stageHeight = window.innerHeight - headerHeight;

//       maxTravel = Math.max(
//         0,
//         track.scrollWidth - window.innerWidth
//       );

//       section.style.height = `${stageHeight + maxTravel}px`;

//       sectionStart =
//         window.scrollY +
//         section.getBoundingClientRect().top -
//         headerHeight;

//       update();
//     };

//     const update = () => {
//       cancelAnimationFrame(frame);

//       frame = requestAnimationFrame(() => {
//         if (!desktop.matches) return;

//         const distance = window.scrollY - sectionStart;

//         const progress =
//           maxTravel > 0
//             ? Math.max(0, Math.min(1, distance / maxTravel))
//             : 0;

//         track.style.transform =
//           `translate3d(${-maxTravel * progress}px, 0, 0)`;
//       });
//     };

//     const cardObserver = new IntersectionObserver(
//       (entries) => {
//         for (const entry of entries) {
//           entry.target.toggleAttribute(
//             "data-in-view",
//             entry.isIntersecting
//           );
//         }
//       },
//       {
//         threshold: 0.35,
//         rootMargin: "0px -8% 0px -8%",
//       }
//     );

//     const observeCards = () => {
//       track.querySelectorAll(".puppy-card").forEach((card) => {
//         cardObserver.observe(card);
//       });
//     };

//     const sectionObserver = new IntersectionObserver(
//       ([entry]) => {
//         section.toggleAttribute("data-here", entry.isIntersecting);
//       },
//       { threshold: 0.35 }
//     );

//     const resizeObserver = new ResizeObserver(measure);

//     resizeObserver.observe(track);
//     resizeObserver.observe(stage);

//     observeCards();
//     sectionObserver.observe(section);

//     window.addEventListener("scroll", update, { passive: true });
//     window.addEventListener("resize", measure);
//     desktop.addEventListener("change", measure);

//     measure();

//     return () => {
//       cancelAnimationFrame(frame);
//       resizeObserver.disconnect();
//       cardObserver.disconnect();
//       sectionObserver.disconnect();

//       window.removeEventListener("scroll", update);
//       window.removeEventListener("resize", measure);
//       desktop.removeEventListener("change", measure);
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="puppy-showroom"
//       aria-label="Puppies looking for a family"
//     >
//       <div
//         ref={stageRef}
//         className="puppy-showroom__stage"
//       >
//         <header className="puppy-showroom__head">
//           <div>
//             <h2 className="home-heading">Meet the pups</h2>

//             <p className="home-lede">
//               Real puppies, real photos, looking for their families right now.
//             </p>
//           </div>

//           <Link
//             href="/puppies"
//             className="button button-primary"
//           >
//             See all available puppies
//           </Link>
//         </header>

//         <div className="puppy-showroom__hall">
//           <ol
//             ref={trackRef}
//             className="puppy-grid"
//             aria-label="Puppies looking for a family"
//           >
//             {puppies.map((puppy, index) => (
//               <li
//                 className="puppy-card"
//                 key={puppy.href}
//                 data-open={index === 0 ? "true" : undefined}
//                 style={{ "--door": puppy.door }}
//               >
//                 <Link
//                   href={puppy.href}
//                   className="puppy-card__link"
//                   aria-label={`Meet ${puppy.name}, ${puppy.meta}`}
//                 >
//                   <span className="puppy-card__heading">
//                     <span className="puppy-card__name">
//                       {puppy.name}
//                     </span>

//                     <span className="puppy-card__meta">
//                       {puppy.meta}
//                     </span>
//                   </span>

//                   <span className="puppy-card__frame">
//                     <span className="puppy-card__room">
//                       <img
//                         src={puppy.src}
//                         alt={puppy.alt}
//                         loading="lazy"
//                         style={{
//                           objectPosition: puppy.position,
//                         }}
//                       />
//                     </span>

//                     <span
//                       className="puppy-card__leaf"
//                       aria-hidden="true"
//                     >
//                       <span className="puppy-card__panel" />
//                       <span className="puppy-card__peephole" />
//                       <span className="puppy-card__knob" />
//                     </span>

//                     <span className="puppy-card__tag">
//                       Available
//                     </span>
//                   </span>
//                 </Link>
//               </li>
//             ))}

//             <li className="puppy-card puppy-card--all">
//               <Link
//                 href="/puppies"
//                 className="puppy-card__all-link"
//               >
//                 <span className="puppy-card__all-door">
//                   <span className="puppy-card__all-symbol">
//                     ↗
//                   </span>

//                   <span className="puppy-card__all-label">
//                     Meet them all
//                   </span>
//                 </span>
//               </Link>
//             </li>
//           </ol>

//           <div
//             className="puppy-showroom__floor"
//             aria-hidden="true"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

export default function PuppyShowroom({ puppies }) {
  const sectionRef = useRef(null);
  const rangeRef = useRef(null);
  const stageRef = useRef(null);
  const hallRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const range = rangeRef.current;
    const stage = stageRef.current;
    const hall = hallRef.current;
    const track = trackRef.current;

    if (!section || !range || !stage || !hall || !track) {
      return;
    }

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let pinned = false;
    let maxTravel = 0;
    let rangeStart = 0;

    let currentX = 0;
    let targetX = 0;
    let velocity = 0;

    let frame = 0;
    let previousTime = 0;

    const cards = [...track.querySelectorAll(".puppy-card")];

    const setDoorStates = (x, animate) => {
      hall.style.setProperty("--floor-x", `${x.toFixed(1)}px`);

      const openAt = window.innerWidth * 0.36;

      cards.forEach((card) => {
        const shouldOpen = card.classList.contains("puppy-card--all")
          ? true
          : pinned
            ? card.offsetLeft + x < openAt
            : true;

        const nextState = String(shouldOpen);

        if (card.dataset.open !== nextState) {
          card.dataset.open = nextState;

          if (shouldOpen && animate) {
            card.dispatchEvent(
              new CustomEvent("tp:door-open", {
                bubbles: true,
                detail: { card },
              })
            );
          }
        }
      });
    };

    const applyPosition = (x) => {
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      setDoorStates(x, true);
    };

    const animate = (time) => {
      frame = 0;

      if (!pinned) return;

      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.032)
        : 1 / 60;

      previousTime = time;

      // Original site's spring: stiffness 170, damping 32, mass 0.35.
      const stiffness = 170;
      const damping = 32;
      const mass = 0.35;

      const acceleration =
        (stiffness * (targetX - currentX) -
          damping * velocity) /
        mass;

      velocity += acceleration * delta;
      currentX += velocity * delta;

      const remaining = targetX - currentX;

      if (
        Math.abs(remaining) < 0.1 &&
        Math.abs(velocity) < 0.1
      ) {
        currentX = targetX;
        velocity = 0;
        previousTime = 0;
        applyPosition(currentX);
        return;
      }

      applyPosition(currentX);
      frame = requestAnimationFrame(animate);
    };

    const updateTarget = () => {
      if (!pinned) return;

      const scrollDistance = maxTravel * 0.8;

      const progress =
        scrollDistance > 0
          ? clamp(
              (window.scrollY - rangeStart) / scrollDistance,
              0,
              1
            )
          : 0;

      targetX = -maxTravel * progress;

      if (!frame) {
        frame = requestAnimationFrame(animate);
      }
    };

    const measure = () => {
      const shouldPin = desktop.matches && !reducedMotion.matches;

      if (!shouldPin) {
        pinned = false;

        section.removeAttribute("data-pinned");
        range.style.height = "";
        hall.style.removeProperty("--door-w");

        track.style.transform = "";
        currentX = 0;
        targetX = 0;
        velocity = 0;
        previousTime = 0;

        cancelAnimationFrame(frame);
        frame = 0;

        setDoorStates(0, false);
        return;
      }

      pinned = true;
      section.setAttribute("data-pinned", "true");

      const heading = stage.querySelector(".puppy-showroom__head");
      const floor = hall.querySelector(".puppy-showroom__floor");

      const plateHeight = Math.max(
        64,
        ...cards
          .filter((card) => !card.classList.contains("puppy-card--all"))
          .map(
            (card) =>
              card.querySelector(".puppy-card__heading")?.offsetHeight || 0
          )
      );

      const floorHeight = floor?.offsetHeight || 0;

      const headingBottom = heading
        ? heading.offsetTop + heading.offsetHeight
        : 0;

      const availableHeight =
        stage.clientHeight -
        headingBottom -
        floorHeight -
        plateHeight -
        40;

      const doorWidth = Math.max(
        128,
        Math.min(
          256,
          window.innerWidth * 0.15,
          availableHeight / 1.3
        )
      );

      hall.style.setProperty("--door-w", `${doorWidth}px`);

      // Force layout after updating the responsive door width.
      track.getBoundingClientRect();

      maxTravel = Math.max(
        0,
        track.scrollWidth - window.innerWidth
      );

      // The original pinned scene uses 80% of horizontal travel
      // as its vertical scroll range.
      range.style.height =
        `calc(100vh + ${Math.round(maxTravel * 0.8)}px)`;

      rangeStart =
        window.scrollY +
        range.getBoundingClientRect().top;

      const scrollDistance = maxTravel * 0.8;

      const progress =
        scrollDistance > 0
          ? clamp(
              (window.scrollY - rangeStart) / scrollDistance,
              0,
              1
            )
          : 0;

      targetX = -maxTravel * progress;

      // Re-measure starts from the correct current position.
      currentX = targetX;
      velocity = 0;
      previousTime = 0;

      cancelAnimationFrame(frame);
      frame = 0;

      track.style.transform =
        `translate3d(${currentX}px, 0, 0)`;

      setDoorStates(currentX, false);
    };

    const handleScroll = () => {
      updateTarget();
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(stage);
    resizeObserver.observe(track);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);
    reducedMotion.addEventListener("change", measure);

    measure();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);

      desktop.removeEventListener("change", measure);
      reducedMotion.removeEventListener("change", measure);

      section.removeAttribute("data-pinned");
      range.style.height = "";
      track.style.transform = "";
      hall.style.removeProperty("--door-w");
      hall.style.removeProperty("--floor-x");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="puppy-showroom"
      aria-label="Puppies looking for a family"
    >
      <div
        ref={rangeRef}
        className="puppy-showroom__range"
      >
        <div
          ref={stageRef}
          className="puppy-showroom__stage"
        >
          <header className="puppy-showroom__head">
            <div>
              <h2 className="home-heading">Meet the pups</h2>

              <p className="home-lede">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>

            <Link
              href="/puppies"
              className="button button-primary"
            >
              See all available puppies
            </Link>
          </header>

          <div
            ref={hallRef}
            className="puppy-showroom__hall"
            data-pup-stop="true"
            data-pose="walk"
            data-facing="right"
          >
            <ol
              ref={trackRef}
              className="puppy-grid"
              data-treadmill="true"
              aria-label="Puppies looking for a family"
            >
              {puppies.map((puppy) => (
                <li
                  className="puppy-card"
                  key={puppy.href}
                  data-open="false"
                  style={{ "--door": puppy.door }}
                >
                  <Link
                    href={puppy.href}
                    className="puppy-card__link"
                    aria-label={`Meet ${puppy.name}, ${puppy.meta}`}
                  >
                    <span className="puppy-card__heading">
                      <span className="puppy-card__name">
                        {puppy.name}
                      </span>

                      <span className="puppy-card__meta">
                        {puppy.meta}
                      </span>
                    </span>

                    <span className="puppy-card__frame">
                      <span className="puppy-card__room">
                        <img
                          src={puppy.src}
                          alt={puppy.alt}
                          loading="lazy"
                          style={{
                            objectPosition: puppy.position,
                          }}
                        />
                      </span>

                      <span
                        className="puppy-card__leaf"
                        aria-hidden="true"
                      >
                        <span className="puppy-card__panel" />
                        <span className="puppy-card__peephole" />
                        <span className="puppy-card__knob" />
                      </span>

                      <span className="puppy-card__tag">
                        Available
                      </span>
                    </span>
                  </Link>
                </li>
              ))}

              <li
                className="puppy-card puppy-card--all"
                data-open="true"
              >
                <Link
                  href="/puppies"
                  className="puppy-card__all-link"
                >
                  <span className="puppy-card__all-door">
                    <span className="puppy-card__all-symbol">
                      ↗
                    </span>

                    <span className="puppy-card__all-label">
                      Meet them all
                    </span>
                  </span>
                </Link>
              </li>
            </ol>

            <div className="puppy-showroom__cloud-bank" aria-hidden="true">
              <span className="puppy-showroom__cloud puppy-showroom__cloud--one" />
              <span className="puppy-showroom__cloud puppy-showroom__cloud--two" />
              <span className="puppy-showroom__cloud puppy-showroom__cloud--three" />
            </div>
            <div
              className="puppy-showroom__floor"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
