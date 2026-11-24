
function createPawPath() {
    const path = new Path2D();
  
    path.ellipse(-18, -15, 7, 9, -0.35, 0, Math.PI * 2);
    path.ellipse(-6, -25, 7, 9, -0.1, 0, Math.PI * 2);
    path.ellipse(8, -25, 7, 9, 0.1, 0, Math.PI * 2);
    path.ellipse(20, -15, 7, 9, 0.35, 0, Math.PI * 2);
  
    path.moveTo(-18, 5);
    path.bezierCurveTo(-18, -7, -8, -12, 0, -9);
    path.bezierCurveTo(8, -12, 18, -7, 18, 5);
    path.bezierCurveTo(18, 17, 8, 23, 0, 18);
    path.bezierCurveTo(-8, 23, -18, 17, -18, 5);
    path.closePath();
  
    return path;
  }
  
  export function initPawTrail(canvas) {
    if (!canvas) return () => {};
  
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
  
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
  
    if (!media.matches || reducedMotion.matches) {
      return () => {};
    }
  
    const context = canvas.getContext("2d");
    if (!context) return () => {};
  
    const paw = createPawPath();
    const marks = [];
  
    let pixelRatio = 1;
    let frame = 0;
    let drawing = false;
    let previousX = NaN;
    let previousY = NaN;
    let distance = 0;
    let direction = 1;
  
    function resize() {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
  
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
  
    function draw(time) {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let index = marks.length - 1; index >= 0; index--) {
        const mark = marks[index];
        const age = time - mark.born;
  
        if (age > 1000) {
          marks.splice(index, 1);
          continue;
        }
  
        const fade = age < 600 ? 1 : 1 - (age - 600) / 400;
  
        context.globalAlpha = 0.42 * fade * fade;
  
        context.setTransform(
          0.27 * pixelRatio,
          0,
          0,
          0.27 * pixelRatio,
          mark.x * pixelRatio,
          mark.y * pixelRatio
        );
  
        context.rotate(mark.angle);
        context.translate(-32, -34);
        context.fillStyle = "#c2622b";
        context.fill(paw);
      }
  
      context.globalAlpha = 1;
  
      if (marks.length) {
        frame = requestAnimationFrame(draw);
      } else {
        drawing = false;
      }
    }
  
    function onPointerMove(event) {
      if (event.pointerType !== "mouse") return;
  
      if (Number.isNaN(previousX)) {
        previousX = event.clientX;
        previousY = event.clientY;
        return;
      }
  
      const dx = event.clientX - previousX;
      const dy = event.clientY - previousY;
  
      distance += Math.hypot(dx, dy);
  
      if (distance >= 46) {
        distance = 0;
  
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        const offset = 7 * (direction = -direction);
  
        marks.push({
          x: event.clientX + Math.cos(angle) * offset + 14,
          y: event.clientY + Math.sin(angle) * offset + 16,
          angle,
          born: performance.now(),
        });
  
        if (marks.length > 14) marks.shift();
  
        if (!drawing) {
          drawing = true;
          frame = requestAnimationFrame(draw);
        }
      }
  
      previousX = event.clientX;
      previousY = event.clientY;
    }
  
    resize();
  
    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });
    window.addEventListener("resize", resize);
  
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
  
      cancelAnimationFrame(frame);
  
      marks.length = 0;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      canvas.width = 0;
      canvas.height = 0;
    };
  }
  