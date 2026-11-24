const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, amount) => start + (end - start) * amount;

// Match the reference mascot's smaller 50–62% scale on compact viewports.
const getResponsiveActorWidth = (viewportWidth) => {
  const compact = viewportWidth <= 767 ||
    window.matchMedia("(pointer: coarse) and (max-height: 519px)").matches;
  return compact
    ? 300 * clamp(viewportWidth / 650, 0.5, 0.62)
    : 300;
};

function getJourneyStops(main) {
  // Query the complete set in one pass so legacy .pup-stop anchors and
  // explicit data-pup-stop anchors are both retained in document order.
  // Returning only explicit anchors here silently dropped any section that
  // still used the class-based marker, breaking the continuous route.
  return [...main.querySelectorAll("[data-pup-stop], .pup-stop")]
    .filter((element) => {
      if (!(element instanceof HTMLElement)) return false;
      const style = window.getComputedStyle(element);
      // Responsive layouts deliberately hide some route anchors. A hidden
      // anchor has a zero rect at the document origin and would pull the
      // shared actor off the actual path on mobile.
      return style.display !== "none" &&
        style.visibility !== "hidden" &&
        element.getClientRects().length > 0;
    });
}

function getStickyDocumentY(stop, scrollY) {
  let ancestor = stop.parentElement;
  while (ancestor && ancestor !== document.body) {
    const position = getComputedStyle(ancestor).position;
    if (position === "sticky" || position === "fixed") {
      // Sticky scenes remain at a viewport coordinate while the page scrolls.
      // Their route milestone must belong to the containing flow range, not
      // be recomputed as rect.top + scrollY on every frame.
      const flow = stop.closest(".puppy-showroom__range, .tp-chat");
      if (!flow) return null;
      const flowRect = flow.getBoundingClientRect();
      return flowRect.top + scrollY + flowRect.height * 0.5;
    }
    ancestor = ancestor.parentElement;
  }
  return null;
}

function pointForStop(stop, scrollY, viewportWidth, viewportHeight) {
  const rect = stop.getBoundingClientRect();
  const isShowroom = stop.matches(".puppy-showroom__hall");
  // The original hero mascot is its own positioned stop inside the
  // lineup stage. Measuring that box keeps the shared actor on the hero
  // anchor instead of treating the whole lineup/quilt stage as its target.
  const isHero = stop.matches(".tp-hero__teddy");
  // The SVG keeps its 300x240 viewBox; only its rendered width scales.
  const actorWidth = getResponsiveActorWidth(viewportWidth);
  // Route points are the actual homepage anchors. The old .home-paths /
  // .path-card branch belonged to an earlier page structure and never
  // matched the current .tp-scene / .tp-way layout.
  let x = rect.left + rect.width / 2;
  let y;

  if (isShowroom) {
    const floor = stop.querySelector(".puppy-showroom__floor");
    const floorRect = floor?.getBoundingClientRect();
    const borderTop = floor
      ? Number.parseFloat(getComputedStyle(floor).borderTopWidth) || 0
      : 0;
    const groundY = floorRect ? floorRect.top + borderTop + actorWidth * 0.088 : rect.bottom;
    const groundOffset = actorWidth * (229.7 / 300 - 0.4);
    x = clamp(rect.left + rect.width / 2, 150, viewportWidth - 150);
    y = groundY - groundOffset;
  } else if (isHero) {
    // The peek artwork is drawn off-centre inside its 300px SVG viewBox:
    // the visible face/paws are centred at x=212, not x=150. Compensate
    // for that 62px artwork offset so the puppy itself sits in the lineup gap.
    // The visible peek paws end at SVG y=159. The hero marker's bottom
    // sits 52px below the quilt's top surface (see .tp-hero__teddy bottom).
    // Align that actual artwork edge with the quilt surface rather than
    // positioning the invisible 240px SVG box as if its bottom were the paws.
    const peekArtworkOffsetX = actorWidth * (212 / 300 - 0.5);
    const peekPawBottom = 159;
    const heroSurfaceOffset = 52;
    const peekPawOffsetFromActorCenter = peekPawBottom - actorWidth * 0.4;
    x = rect.left + rect.width / 2 - peekArtworkOffsetX;
    y = rect.bottom - heroSurfaceOffset - peekPawOffsetFromActorCenter;
  } else {
    y = rect.top + Math.min(rect.height * 0.72, viewportHeight * 0.66);
  }

  const isPointAnchor = !isHero && !isShowroom && rect.height < 1;
  const stickyDocumentY = getStickyDocumentY(stop, scrollY);

  // A stop's document coordinate must be invariant while scrolling. Using
  // the clamped viewport y here made documentY drift by exactly scrollY,
  // causing route milestones to advance at unrelated positions.
  const documentY = stickyDocumentY ??
    rect.top + scrollY + (isPointAnchor ? 0 : rect.height / 2);

  if (!isHero && !isShowroom && !isPointAnchor) {
    y = clamp(y, viewportHeight * 0.36, viewportHeight * 0.79);
  }
  if (isPointAnchor) {
    // Zero-height route markers (the fork post and the two-ways/chat
    // markers) are positioned at the scene's lower edge. Their raw viewport
    // top can sit outside the viewport when the scroll trigger reaches them;
    // using it directly sent the actor above/below the clipped fixed layer.
    // Keep the same ground-relative anchor, but constrain the actor's
    // 240px-tall box to the visible viewport.
    const groundOffset = actorWidth * (229.7 / 300 - 0.4);
    const halfActorHeight = actorWidth * 0.4;
    const maxY = Math.max(halfActorHeight, viewportHeight - halfActorHeight);
    y = clamp(rect.top - groundOffset, Math.min(halfActorHeight, maxY), maxY);
  }
  return {
    x: clamp(x, actorWidth * (92 / 300), viewportWidth - actorWidth * (92 / 300)),
    y,
    actorWidth,
    documentY,
    stop,
    pose: stop.dataset.pose || stop.dataset.pupPose || "walk",
    facing: stop.dataset.facing || "auto",
    act: stop.dataset.act || "",
    behind: stop.dataset.behind === "true",
    lane: stop.dataset.lane === "true",
  };
}
function createPawPrint(container, x, y, direction) {
  const print = document.createElement("span");
  print.className = "pup-footprint";
  print.style.left = x + "px";
  print.style.top = y + "px";
  print.style.rotate = direction + "deg";
  print.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"/></svg>';
  container.appendChild(print);
  window.setTimeout(() => print.remove(), 2700);
}

export function initPuppyJourney(layer) {
  if (!layer || window.location.pathname !== "/") return () => {};
  // React development Strict Mode can replay effects. Never attach a second
  // animation loop to the same rendered actor layer.
  if (layer.dataset.ready === "true") return () => {};
  const actor = layer.querySelector(".pup-actor");
  const svg = actor?.querySelector("svg");
  const basket = layer.querySelector(".pup-footer-basket");
  const basketFront = layer.querySelector(".pup-footer-basket__front-layer");
  const prints = layer.querySelector(".pup-prints");
  const main = document.querySelector("#main-content") || document.querySelector("#main") || document.querySelector("main");
  const footer = document.querySelector("footer");
  const root = svg?.querySelector('[data-p="root"]');
  const body = svg?.querySelector('[data-p="body"]');
  const haunch = svg?.querySelector('[data-p="haunch"]');
  const head = svg?.querySelector('[data-p="head"]');

  if (!actor || !svg || !basket || !basketFront || !prints || !main || !footer || !root || !body || !haunch || !head) return () => {};
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const stops = getJourneyStops(main);
  if (!stops.length) return () => {};
  const part = (name) => svg.querySelector('[data-p="' + name + '"]');
  const setTransform = (name, value) => part(name)?.setAttribute("transform", value);
  const setOpacity = (name, value) => part(name)?.setAttribute("opacity", String(value));
  const feet = ["bf", "ff", "bn", "fn"].map(part);

  let rafId = 0, destroyed = false, lastTime = 0;
  let currentX = window.innerWidth / 2, currentY = window.innerHeight * 0.68;
  let lastX = currentX, lastY = currentY, previousScroll = window.scrollY;
  let scrollSpeed = 0, phase = 0, facing = 1, lastPrintAt = 0, lastPrintX = currentX, lastPrintY = currentY;
  let heroDeparted = window.scrollY > 2;
  let standStartedAt = 0;
  let nextBlink = performance.now() + 2100, blinkUntil = 0;
  let cueTarget = null, cueUntil = 0, actionUntil = 0, action = "";
  let pointerX = currentX, pointerY = currentY;

  const measurePath = () => stops.map((stop) =>
    pointForStop(stop, window.scrollY, window.innerWidth, window.innerHeight)
  );

  // Calibrate the scroll line to the hero stop on a fresh homepage load.
  // Without this offset, a hero anchor that sits above the 58vh trigger line
  // starts part-way toward the showroom before the visitor has scrolled.
  const initialPath = measurePath();
  const initialScrollY = window.scrollY;
  const initialScrollLine = initialScrollY < 2
    ? initialPath[0]?.documentY ?? initialScrollY + window.innerHeight * 0.58
    : initialScrollY + window.innerHeight * 0.58;
  const scrollLineOffset =
    initialScrollY + window.innerHeight * 0.58 - initialScrollLine;

  // Match the reference controller's stop/leg model: each stop owns a
  // scroll hold window, and movement happens only between adjacent windows.
  // The windows are recomputed from measured document coordinates so layout
  // shifts and responsive scene heights do not leave stale route geometry.
  const buildRouteHolds = (path) => {
    const viewportHeight = window.innerHeight;
    const holds = path.map((stop) => ({
      start: stop.documentY - viewportHeight * 0.82,
      end: stop.documentY - viewportHeight * 0.24,
    }));
    if (!holds.length) return holds;
    holds[0].start = Number.NEGATIVE_INFINITY;
    holds[holds.length - 1].end = Number.POSITIVE_INFINITY;
    for (let index = 0; index < holds.length - 1; index += 1) {
      const current = holds[index];
      const next = holds[index + 1];
      if (next.start < current.end) {
        const boundary = (current.end + next.start) / 2;
        current.end = boundary;
        next.start = boundary;
      }
    }
    return holds;
  };

  const cubicPoint = (p0, p1, p2, p3, t) => {
    const inverse = 1 - t;
    const a = inverse * inverse * inverse;
    const b = 3 * inverse * inverse * t;
    const c = 3 * inverse * t * t;
    const d = t * t * t;
    return {
      x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
      y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
    };
  };

  const routeCurve = (from, to) => {
    const safe = {
      left: 10,
      right: Math.max(10, window.innerWidth - 10),
      top: 10,
      bottom: Math.max(10, window.innerHeight - 10),
    };
    const dx = to.x - from.x;
    const direction = dx >= 0 ? 1 : -1;
    const reach = Math.max(Math.abs(dx) * 0.45, 0);
    let c1 = { x: from.x + direction * reach, y: from.y };
    let c2 = { x: to.x - direction * reach, y: to.y };
    const minimumHorizontalReach = (safe.right - safe.left) * 0.14;
    if (Math.abs(dx) < minimumHorizontalReach) {
      const side = (from.x + to.x) / 2 < (safe.left + safe.right) / 2 ? 1 : -1;
      const offset = (minimumHorizontalReach - Math.abs(dx)) * 0.9 * side;
      c1 = { x: c1.x + offset, y: lerp(from.y, to.y, 0.2) };
      c2 = { x: c2.x + offset, y: lerp(from.y, to.y, 0.8) };
    }
    const safePoint = (point) => ({
      x: clamp(point.x, safe.left, safe.right),
      y: clamp(point.y, safe.top, safe.bottom),
    });
    return {
      p0: { x: from.x, y: from.y },
      p1: safePoint(c1),
      p2: safePoint(c2),
      p3: { x: to.x, y: to.y },
    };
  };

  const getTarget = (path) => {
    const holds = buildRouteHolds(path);
    const scrollLine =
      window.scrollY + window.innerHeight * 0.58 - scrollLineOffset;
    let index = 0;
    let holding = scrollLine <= holds[0].end;
    while (!holding && index < path.length - 1) {
      // A leg ends at the next stop's hold start. The following interval is
      // a true stop hold, not the beginning of another interpolation.
      if (scrollLine < holds[index + 1].start) break;
      index += 1;
      holding = scrollLine <= holds[index].end;
    }

    const from = path[index];
    const to = path[Math.min(index + 1, path.length - 1)];
    const legStart = holds[index].end;
    const legEnd = holds[Math.min(index + 1, holds.length - 1)].start;
    const rawProgress = holding || index === path.length - 1
      ? 0
      : clamp((scrollLine - legStart) / Math.max(1, legEnd - legStart), 0, 1);
    // Quintic smoothstep gives zero-velocity arrival/departure while keeping
    // the same sampled curve in either scroll direction.
    const progress = rawProgress * rawProgress * rawProgress *
      (rawProgress * (rawProgress * 6 - 15) + 10);
    const curve = routeCurve(from, to);
    const point = holding
      ? { x: from.x, y: from.y }
      : cubicPoint(curve.p0, curve.p1, curve.p2, curve.p3, progress);
    const activeStop = holding || rawProgress < 0.5 ? from : to;
    const depthBlend = Math.sin(rawProgress * Math.PI);
    const behind = Boolean(
      (from.behind && rawProgress < 0.36) ||
      (to.behind && rawProgress > 0.68)
    );
    const footerRect = footer.getBoundingClientRect();
    const basketAnchor = footer.querySelector("[data-pup-basket-anchor]") ||
      footer.querySelector(".footer-basket");
    const anchorRect = basketAnchor?.getBoundingClientRect();
    const finalStopReached = path.length > 0 &&
      scrollLine >= path[path.length - 1].documentY;
    const approach = anchorRect && finalStopReached &&
      footerRect.top < window.innerHeight * 0.94
      ? clamp((window.innerHeight * 0.92 - footerRect.top) /
        (window.innerHeight * 0.58), 0, 1)
      : 0;

    const actorWidth = getResponsiveActorWidth(window.innerWidth);
    const base = {
      x: point.x,
      y: point.y - (behind ? depthBlend * Math.min(actorWidth * (64 / 300), 64) : 0),
      actorWidth,
      pose: activeStop.pose,
      facing: activeStop.facing,
      act: activeStop.act,
      behind: Boolean(from.behind && rawProgress < 0.12) ||
        Boolean(to.behind && rawProgress > 0.92),
      lane: activeStop.lane,
      stop: activeStop.stop,
      routeDx: to.x - from.x,
      routeProgress: rawProgress,
      routeIndex: index,
      routeCurve: curve,
      // Preserve the measured floor while entering and leaving the showroom.
      ground: (from.stop?.matches(".puppy-showroom__hall")
        ? from.stop
        : to.stop?.matches(".puppy-showroom__hall")
          ? to.stop
          : null)?.querySelector(".puppy-showroom__floor"),
      scene: activeStop.stop?.closest(
        ".puppy-showroom, .tp-scene, .tp-chat, [data-pup-scene]"
      ) || null,
    };
    if (!anchorRect) {
      return { ...base, nearBasket: false, inBasket: false };
    }
    return {
      ...base,
      x: lerp(base.x, anchorRect.left + anchorRect.width / 2, approach),
      y: lerp(base.y, anchorRect.top + Math.min(42, anchorRect.height * 0.32), approach),
      nearBasket: approach > 0.015,
      inBasket: approach > 0.91,
      basketRect: anchorRect,
      approach,
    };
  };

  const initialMeasuredPath = measurePath();
  // The page-load pose must always start at the first measured stop (the
  // hero anchor). getTarget() is scroll-progress based and can select a later
  // showroom waypoint before the first animation frame, briefly painting the
  // puppy on the pathway. Route interpolation begins only after this frame.
  const initialTarget = initialMeasuredPath[0] ?? getTarget(initialMeasuredPath);
  currentX = initialTarget.x;
  currentY = initialTarget.y;
  lastX = currentX;
  lastY = currentY;
  previousScroll = window.scrollY;

  // Place the shared mascot synchronously on its measured first stop so the
  // browser never paints its default top-left position before the first RAF.
  const initialWidth = initialTarget.actorWidth || getResponsiveActorWidth(window.innerWidth);
  actor.style.width = initialWidth + "px";
  actor.style.transform = "translate3d(" +
    (initialTarget.x - initialWidth / 2) + "px, " +
    (initialTarget.y - initialWidth * 0.4) + "px, 0)";
  actor.dataset.pose = initialTarget.pose || "walk";
  actor.dataset.act = initialTarget.act || "";
  actor.dataset.facing = initialTarget.facing === "front"
    ? "front"
    : initialTarget.facing === "left" ? "left" : "right";
  svg.style.transformOrigin = "50% 50%";
  svg.style.transition = "transform 260ms cubic-bezier(.2,.75,.25,1)";
  svg.style.transform = "none";
  layer.dataset.front = initialTarget.behind ? "false" : "true";

  // Apply the original hero peek artwork before the first paint. The
  // shared SVG is clipped at the quilt, with its front paws on the ledge.
  const initialPeek = initialTarget.pose === "peek" || initialTarget.act === "peekaboo";
  setOpacity("body", initialPeek ? 0 : 1);
  setOpacity("ledge", initialPeek ? 1 : 0);
  setOpacity("haunch", initialTarget.pose === "sit" ? 1 : 0);
  setOpacity("bf", initialTarget.pose === "sit" ? 0 : 1);
  setOpacity("bn", initialTarget.pose === "sit" ? 0 : 1);
  setOpacity("shadow", initialTarget.pose === "sit" ? 0.12 : 0.16);
  // Preserve the existing explicit first-frame setup for non-hero sit stops.
  if (initialTarget.pose === "sit") {
    setTransform("root", "translate(0 0)");
    setTransform("body", "translate(0 -2) rotate(-24 196 206)");
    setTransform("haunch", "translate(0 1.44)");
    setTransform("head", "translate(-10 -6) rotate(0 212 100)");
    setTransform("ff", "translate(168 192) rotate(24)");
    setTransform("fn", "translate(186 194) rotate(24)");
    setTransform("tail", "rotate(34 84 150)");
  }

  const onPointerMove = (event) => { pointerX = event.clientX; pointerY = event.clientY; };
  const onPuppyClick = () => {
    if (motion.matches) return;
    action = "hop";
    actionUntil = performance.now() + 760;
  };
  const onCue = (event) => {
    cueTarget = event.detail?.look || null;
    cueUntil = performance.now() + (event.detail?.secs || 1.2) * 1000;
  };
  const onDoorOpen = (event) => {
    const card = event.detail?.card || event.target;
    if (card) window.dispatchEvent(new CustomEvent("pup:cue", { detail: { look: card, secs: 0.9 } }));
  };

  const positionBasket = (target) => {
    if (!target.basketRect) {
      basket.style.opacity = "0";
      basketFront.style.opacity = "0";
      basket.removeAttribute("data-visible");
      basketFront.removeAttribute("data-visible");
      return;
    }
    const width = window.matchMedia("(max-width: 767px)").matches
      ? clamp(window.innerWidth * 0.45, 160, 196)
      : clamp(window.innerWidth * 0.24, 224, 304);
    const left = target.basketRect.left + (target.basketRect.width - width) / 2;
    const top = target.basketRect.top - 12;
    const transform = "translate3d(" + left + "px, " + top + "px, 0)";
    basket.style.width = width + "px";
    basketFront.style.width = width + "px";
    basket.style.transform = transform;
    basketFront.style.transform = transform;
    basket.style.opacity = target.nearBasket ? "1" : "0";
    basketFront.style.opacity = target.nearBasket ? "1" : "0";
    basket.dataset.visible = target.nearBasket ? "true" : "false";
    basketFront.dataset.visible = target.nearBasket ? "true" : "false";
  };

  const animate = (time) => {
    if (destroyed) return;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.04) : 1 / 60;
    lastTime = time;
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - previousScroll;
    previousScroll = scrollY;
    scrollSpeed = Math.abs(scrollDelta) / Math.max(delta, 0.001);

    const reduced = motion.matches;
    const currentPath = measurePath();
    const routeTarget = reduced ? currentPath[0] : getTarget(currentPath);
    const scrollLine = scrollY + window.innerHeight * 0.58 - scrollLineOffset;
    const heroDocumentY = currentPath[0]?.documentY ?? 0;

    // Hold the shared actor on the real hero anchor in the original peek pose.
    // On the first downward scroll, blend that pose into the shared walking rig.
    if (scrollLine <= heroDocumentY + 0.5) {
      heroDeparted = false;
      standStartedAt = 0;
    } else if (!heroDeparted && scrollDelta > 0.25) {
      heroDeparted = true;
      standStartedAt = time;
    }
    const standProgress = standStartedAt
      ? clamp((time - standStartedAt) / 360, 0, 1)
      : 1;
    const standingUp = heroDeparted && standStartedAt > 0 && standProgress < 1;
    const heroAnchor = currentPath[0];
    // Keep the first hero frame anchored to the seated, front-facing pose.
    // Layout shifts (fonts/images/responsive sizing) can move the measured
    // scroll milestone after initialization; do not let that measurement
    // advance the puppy to a standing stop before the visitor scrolls.
    const holdingHero = Boolean(heroAnchor && !heroDeparted);
    const target = holdingHero
      ? {
          ...routeTarget,
          x: heroAnchor.x,
          y: heroAnchor.y,
          actorWidth: heroAnchor.actorWidth || getResponsiveActorWidth(window.innerWidth),
          pose: "peek",
          facing: "front",
          act: "peekaboo",
          behind: true,
          lane: true,
          // getTarget() can carry the next showroom floor as its ground
          // correction even while the hero stop is being held. Do not let
          // the showroom foot-contact pass overwrite the hero coordinates.
          ground: null,
          stop: heroAnchor.stop,
        }
      : standingUp && heroAnchor
        ? {
            ...routeTarget,
            // Blend the peek artwork into the walking rig while continuing
            // to consume the live scroll-interpolated route position. Holding
            // x/y at the hero for the full stand animation let scroll progress
            // run ahead; the first post-transition frame then jumped to that
            // already-advanced showroom target.
            pose: "walk",
            act: "",
            // Keep floor correction disabled only during the pose blend; it
            // must not replace the interpolated route coordinates.
            ground: null,
          }
        : heroDeparted && heroAnchor
          ? {
              ...routeTarget,
              // routeTarget keeps the hero stop's peek pose/action until the
              // route midpoint. Once the hero is left, it must stay in walk
              // mode while interpolating toward the showroom waypoint.
              pose: "walk",
              act: "",
            }
          : routeTarget;

    const response = reduced ? 1 : 1 - Math.exp(-delta * (5.5 + Math.min(scrollSpeed / 850, 7)));
    currentX = lerp(currentX, target.x, response);
    currentY = lerp(currentY, target.y, response);
    const dx = currentX - lastX;
    const travel = Math.hypot(dx, currentY - lastY);
    const peeking = (target.pose === "peek" || target.act === "peekaboo") && !target.inBasket;
    const walking = !reduced && !peeking && !target.inBasket &&
      !standingUp && (travel > 0.12 || scrollSpeed > 18);
    const atHero = target.stop?.matches(".tp-hero__teddy");
    const sitting = target.pose === "sit" && !walking && !standingUp &&
      !target.inBasket && (!atHero || !heroDeparted);
    const sitBlend = standingUp ? 1 - standProgress : sitting ? 1 : 0;

    // Heading follows the measured path. Reversing scroll changes the turn,
    // never the forward phase of the four-legged walking cycle.
    const routeHeading = Math.abs(routeTarget.routeDx || 0) > 2 && Math.abs(scrollDelta) > 0.5
      ? Math.sign(routeTarget.routeDx) * Math.sign(scrollDelta)
      : 0;
    if (routeHeading) facing = routeHeading;
    else if (Math.abs(dx) > 0.18) facing = dx > 0 ? 1 : -1;
    else if (target.facing === "right") facing = 1;
    else if (target.facing === "left") facing = -1;
    actor.dataset.pose = standingUp ? "stand" : target.pose || "walk";
    actor.dataset.act = target.act || "";
    actor.dataset.behind = target.behind ? "true" : "false";
    actor.dataset.lane = target.lane ? "true" : "false";
    // The original layer switches behind the hero quilt only while the
    // shared actor is at a stop marked data-behind.
    layer.dataset.front = target.behind ? "false" : "true";
    const gaitRate = 5.8 + clamp(scrollSpeed / 230, 0, 12);
    // Keep the gait cadence forward; the actor turns to face the reverse
    // direction instead of running the legs backward on upward scrolling.
    phase += delta * (walking ? gaitRate : 1.35);
    const seconds = time / 1000;
    const stride = Math.sin(phase);
    const wag = Math.sin(seconds * (walking ? 8 : 3.8));
    const idle = Math.sin(seconds * 1.65);

    if (time >= nextBlink) { blinkUntil = time + 135; nextBlink = time + 2600; }
    const blinking = time < blinkUntil;
    const hopping = action === "hop" && time < actionUntil;
    if (action && time >= actionUntil) action = "";
    const lookingAtCue = Boolean(cueTarget && time < cueUntil && cueTarget.isConnected);
    if (cueTarget && !cueTarget.isConnected) cueTarget = null;

    const actorWidth = target.actorWidth || getResponsiveActorWidth(window.innerWidth);
    actor.style.width = actorWidth + "px";
    const actorTop = currentY - actorWidth * 0.4;
    actor.style.transform = "translate3d(" + (currentX - actorWidth / 2) + "px, " + actorTop + "px, 0)";
    actor.dataset.facing = atHero && !heroDeparted
      ? "front"
      : facing === 1 ? "right" : "left";
    // A short 3D turn reads as a turn, rather than an instantaneous mirror.
    svg.style.transform = atHero && !heroDeparted
      ? "none"
      : "rotateY(" + (facing === 1 ? 0 : 180) + "deg)";

    const hopLift = hopping ? Math.sin(((time - (actionUntil - 760)) / 760) * Math.PI) * 22 : 0;
    const breathing = Math.sin(seconds * 1.55);
    const bodyBounce = sitting ? breathing * 0.7 : standingUp ? 0 :
      walking ? (1 - Math.cos(phase * 2)) * 1.7 :
        reduced ? 0 : breathing * 0.35;
    const bodyRoll = sitting || standingUp ? 0 :
      walking ? Math.sin(phase * 2) * 1.05 : idle * 0.28;

    // Crossfade the complete peek artwork into the walking body during
    // the same stand blend. Keeping the ledge visible while the body fades
    // in avoids a one-frame pose pop or detached-looking front paws.
    setOpacity("body", peeking ? 0 : 1 - sitBlend);
    setOpacity("head", 1);
    setOpacity("ledge", peeking ? 1 : sitBlend);
    setOpacity("haunch", target.inBasket ? 1 : sitBlend);
    setOpacity("bf", 1 - sitBlend);
    setOpacity("bn", 1 - sitBlend);
    setOpacity("shadow", target.inBasket ? 0.08 : sitting ? 0.12 : 0.16);
    // Keep the ground shadow responsive to lift: narrower and softer during
    // a hop, broadest when the paws are in contact with the floor.
    const shadow = part("shadow");
    const airborne = clamp(hopLift / 22, 0, 1);
    if (shadow) {
      shadow.setAttribute("rx", String(92 - airborne * 18 + (walking ? Math.abs(stride) * 3 : 0)));
      shadow.setAttribute("ry", String(7 - airborne * 2.5));
    }
    setOpacity("open", blinking ? 0 : 1);
    setOpacity("shut", blinking ? 1 : 0);
    setOpacity("happy", hopping ? 1 : 0);
    setOpacity("tongue", walking || hopping || sitting ? 1 : 0);
    setOpacity("mouth", hopping ? 1 : 0);

    setTransform("root", "translate(0 " + (-bodyBounce - hopLift) + ") rotate(" + bodyRoll + " 150 170)");
    setTransform("body", "translate(0 " + (-2 * sitBlend) + ") rotate(" +
      (-24 * sitBlend + (walking ? Math.sin(phase) * 0.85 : 0)) + " 196 206)");
    setTransform("haunch", "translate(0 " + (1.44 * sitBlend) + ")");
    setTransform("head", sitBlend > 0
      ? "translate(" + (-10 * sitBlend) + " " + (-6 * sitBlend + breathing * 0.55) + ") rotate(0 212 100)"
      : peeking
        ? "translate(0 4) rotate(" + (Math.sin(seconds * 1.4) * 2) + " 212 100)"
        : "translate(" + (lookingAtCue ? 5 : 0) + " " + (walking ? -Math.abs(stride) * 1.2 : idle * 0.75) + ") rotate(" + (lookingAtCue ? 4 : idle * 1.1) + " 212 100)");

    // Diagonal four-beat gait: far hind + near fore, then near hind + far fore.
    setTransform("bf", "translate(94 192) rotate(" + (walking ? -stride * 22 : 0) + ")");
    setTransform("ff", "translate(168 192) rotate(" +
      (24 * sitBlend + (walking ? stride * 22 : 0)) + ")");
    setTransform("bn", "translate(110 194) rotate(" + (walking ? stride * 19 : 0) + ")");
    setTransform("fn", "translate(186 194) rotate(" +
      (24 * sitBlend + (walking ? -stride * 19 : 0)) + ")");
    setTransform("tail", "rotate(" +
      (34 * sitBlend + (walking ? -8 : -13) * (1 - sitBlend) +
        wag * (walking ? 12 : 8)) + " 84 150)");
    setTransform("earL", "rotate(" + (-6 + Math.sin(seconds * 2.1) * 2) + " 174 82)");
    setTransform("earR", "rotate(" + (6 - Math.sin(seconds * 2.1 + 1) * 2) + " 250 82)");

    // Keep the actual rendered feet on the showroom's visible floor line.
    // Measure after the gait/root transforms so lifted and turning feet are
    // accounted for; do not derive contact from the SVG shadow or viewBox.
    if (target.ground) {
      const floorRect = target.ground.getBoundingClientRect();
      const borderTop = Number.parseFloat(
        getComputedStyle(target.ground).borderTopWidth
      ) || 0;
      const groundY = floorRect.top + borderTop + actorWidth * 0.088;
      const feetBottom = feet.reduce(
        (bottom, foot) => Math.max(bottom, foot.getBoundingClientRect().bottom),
        Number.NEGATIVE_INFINITY
      );

      if (Number.isFinite(feetBottom)) {
        const correction = groundY - feetBottom;
        if (Math.abs(correction) > 0.01) {
          actor.style.transform = "translate3d(" +
            (currentX - actorWidth / 2) + "px, " +
            (actorTop + correction) + "px, 0)";
        }
      }
    }

    const gazeX = clamp((pointerX - currentX) / 72, -2.2, 2.2);
    const gazeY = clamp((pointerY - currentY) / 90, -1.2, 1.2);
    setTransform("eyes", "translate(" + gazeX + " " + gazeY + ")");

    if (target.inBasket) {
      const settle = clamp((target.approach - 0.91) / 0.09, 0, 1);
      setTransform("root", "translate(0 " + (-2 - settle * 2) + ") rotate(" + (-3 - settle * 3) + " 150 170)");
      setTransform("head", "translate(-5 -7) rotate(-6 212 100)");
      setTransform("tail", "rotate(" + (24 + wag * 6) + " 84 150)");
      setTransform("fn", "translate(186 194) rotate(-62)");
      setTransform("ff", "translate(168 192) rotate(-58)");
      setTransform("bn", "translate(110 194) rotate(0)");
      setTransform("bf", "translate(94 192) rotate(0)");
    }

    positionBasket(target);
    if (
      walking &&
      time - lastPrintAt > 330 &&
      travel > 0.35 &&
      Math.hypot(currentX - lastPrintX, currentY - lastPrintY) > 17
    ) {
      // Every waypoint uses the same 300x240 actor baseline. This keeps paw
      // marks on the floor during vertical as well as horizontal travel.
      const printY = currentY + actorWidth * (229.7 / 300 - 0.4) + 8;
      createPawPrint(prints, currentX - 8, printY, facing === 1 ? -15 : 15);
      lastPrintAt = time;
      lastPrintX = currentX;
      lastPrintY = currentY;
    }
    lastX = currentX;
    lastY = currentY;
    rafId = requestAnimationFrame(animate);
  };

  actor.addEventListener("click", onPuppyClick);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pup:cue", onCue);
  document.addEventListener("tp:door-open", onDoorOpen);
  const resizeObserver = new ResizeObserver(() => {
    if (document.hidden) return;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animate);
  });
  const onVisibilityChange = () => {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      lastTime = 0;
      return;
    }
    if (!destroyed && !rafId) rafId = requestAnimationFrame(animate);
  };
  document.addEventListener("visibilitychange", onVisibilityChange);
  resizeObserver.observe(document.body);
  layer.dataset.ready = "true";
  layer.dataset.owner = "homepage-journey";
  layer.dataset.reducedMotion = motion.matches ? "true" : "false";
  if (!document.hidden) rafId = requestAnimationFrame(animate);

  return () => {
    destroyed = true;
    cancelAnimationFrame(rafId);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    resizeObserver.disconnect();
    actor.removeEventListener("click", onPuppyClick);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pup:cue", onCue);
    document.removeEventListener("tp:door-open", onDoorOpen);
    layer.removeAttribute("data-ready");
    layer.removeAttribute("data-owner");
    layer.removeAttribute("data-front");
    basket.removeAttribute("data-visible");
    basketFront.removeAttribute("data-visible");
  };
}
