
export function initHeaderScroll(header) {
    if (!header) return () => {};
  
    let previousY = window.scrollY;
    let frameRequested = false;
  
    const update = () => {
      const currentY = window.scrollY;
  
      header.dataset.scrolled = currentY > 8 ? "true" : "false";
  
      if (Math.abs(currentY - previousY) > 6) {
        header.dataset.hidden =
          currentY > previousY && currentY > 220 ? "true" : "false";
  
        previousY = currentY;
      }
  
      frameRequested = false;
    };
  
    const onScroll = () => {
      if (frameRequested) return;
  
      frameRequested = true;
      requestAnimationFrame(update);
    };
  
    const reveal = () => {
      header.dataset.hidden = "false";
    };
  
    update();
  
    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", reveal);
  
    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", reveal);
    };
  }
  