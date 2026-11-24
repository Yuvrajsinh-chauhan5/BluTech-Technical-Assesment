// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Puppies", href: "/puppies" },
//   { label: "Happy families", href: "/happy-families" },
//   { label: "How it works", href: "/how-it-works" },
//   { label: "FAQ", href: "/faq" },
//   { label: "Visit & contact", href: "/contact" },
// ];

// export default function Header() {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="site-header">
//       <div className="header-inner">
//         <Link
//           href="/"
//           className="brand"
//           aria-label="TeddyPups home"
//           onClick={() => setMenuOpen(false)}
//         >
//           <span className="brand-mark" aria-hidden="true">
//             🐾
//           </span>
//           <span className="brand-name">TeddyPups</span>
//         </Link>

//         <nav className="desktop-nav" aria-label="Main navigation">
//           {navLinks.map((link) => {
//             const active =
//               pathname === link.href ||
//               (link.href !== "/" && pathname.startsWith(link.href));

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`nav-link ${active ? "is-active" : ""}`}
//                 aria-current={active ? "page" : undefined}
//               >
//                 {link.label}
//               </Link>
//             );
//           })}
//         </nav>

//         <Link href="/puppies" className="header-cta">
//           Meet your puppy <span aria-hidden="true">↗</span>
//         </Link>

//         <button
//           type="button"
//           className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
//           aria-label={menuOpen ? "Close navigation" : "Open navigation"}
//           aria-expanded={menuOpen}
//           onClick={() => setMenuOpen((open) => !open)}
//         >
//           <span />
//           <span />
//         </button>
//       </div>

//       {menuOpen && (
//         <nav className="mobile-nav" aria-label="Mobile navigation">
//           {navLinks.map((link) => {
//             const active =
//               pathname === link.href ||
//               (link.href !== "/" && pathname.startsWith(link.href));

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`mobile-nav-link ${active ? "is-active" : ""}`}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {link.label}
//                 <span aria-hidden="true">↗</span>
//               </Link>
//             );
//           })}
//           <Link
//             href="/contact"
//             className="button button-primary mobile-contact"
//             onClick={() => setMenuOpen(false)}
//           >
//             Get in touch
//           </Link>
//         </nav>
//       )}
//     </header>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Puppies", href: "/puppies" },
  { label: "Happy families", href: "/happy-families" },
  { label: "How it works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Visit & contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const closeTimerRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  const closeMenu = () => {
    if (!menuOpen || menuClosing) return;

    setMenuClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
      toggleRef.current?.focus();
    }, 600);
  };

  const openMenu = () => {
    window.clearTimeout(closeTimerRef.current);
    setMenuClosing(false);
    setMenuOpen(true);
  };

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let previousY = window.scrollY;

    const updateHeader = () => {
      const currentY = window.scrollY;
      header.dataset.scrolled = currentY > 8 ? "true" : "false";

      // Reveal on the first upward scroll event, including near the page bottom.
      if (menuOpen || currentY <= 8 || currentY < previousY) {
        header.dataset.hidden = "false";
      } else if (currentY > previousY && currentY > 80) {
        header.dataset.hidden = "true";
      }

      previousY = currentY;
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeader);
    };
  }, [menuOpen]);

  // Close the mobile menu when the route changes.
  useEffect(() => {
    if (!menuOpen) return;

    window.clearTimeout(closeTimerRef.current);
    setMenuOpen(false);
    setMenuClosing(false);

    window.dispatchEvent(new Event("tp:navigate"));
  }, [pathname]);

  // Lock background scrolling and manage keyboard focus while open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const menu = headerRef.current?.querySelector(".mobile-nav");
    const focusable = menu?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    focusable?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const getActive = (href) =>
    pathname === href ||
    (href !== "/" && pathname.startsWith(href));

  return (
    <header
      ref={headerRef}
      className="site-header"
      data-scrolled="false"
      data-hidden="false"
    >
      <div className="header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="TeddyPups home"
          onClick={closeMenu}
        >
          <span className="brand-mark" aria-hidden="true">
            🐾
          </span>
          <span className="brand-name">TeddyPups</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = getActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span>{link.label}</span>
                <svg viewBox="0 0 64 64" className="nav-link__paw" aria-hidden="true" fill="currentColor">
                  <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                </svg>
              </Link>
            );
          })}
        </nav>

        <a
          href="https://wa.me/971500000000"
          className="header-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp us
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={menuOpen ? closeMenu : openMenu}
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
          data-closing={menuClosing ? "true" : "false"}
          onAnimationEnd={(event) => {
            if (
              menuClosing &&
              event.target === event.currentTarget
            ) {
              window.clearTimeout(closeTimerRef.current);
              setMenuOpen(false);
              setMenuClosing(false);
              toggleRef.current?.focus();
            }
          }}
        >
          {navLinks.map((link) => {
            const active = getActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-nav-link ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="button button-primary mobile-contact"
            onClick={closeMenu}
          >
            Get in touch
          </Link>
        </nav>
      )}

      <svg
        aria-hidden="true"
        className="site-header__hem"
        width="100%"
        height="14"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="site-header-hem" width="44" height="14" patternUnits="userSpaceOnUse">
            <path
              d="M0 0H44V2A22 11 0 0 1 0 2Z"
              className="site-header__hem-fill"
            />
            <path
              d="M0 2A22 11 0 0 0 44 2"
              className="site-header__hem-line"
            />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill="url(#site-header-hem)" />
      </svg>
    </header>
  );
}