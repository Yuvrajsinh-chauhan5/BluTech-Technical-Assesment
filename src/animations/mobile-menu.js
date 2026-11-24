
export function initMobileMenu(menu, trigger, onClose) {
    if (!menu || !trigger) return () => {};
  
    const previousOverflow = document.body.style.overflow;
  
    document.body.style.overflow = "hidden";
  
    const focusable = () =>
      [...menu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter((element) => element.getClientRects().length);
  
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        trigger.focus();
        return;
      }
  
      if (event.key !== "Tab") return;
  
      const elements = focusable();
  
      if (!elements.length) return;
  
      const first = elements[0];
      const last = elements[elements.length - 1];
  
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  
    function handlePointerDown(event) {
      if (
        !menu.contains(event.target) &&
        !trigger.contains(event.target)
      ) {
        onClose();
      }
    }
  
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
  
    requestAnimationFrame(() => {
      focusable()[0]?.focus();
    });
  
    return () => {
      document.body.style.overflow = previousOverflow;
  
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }
  