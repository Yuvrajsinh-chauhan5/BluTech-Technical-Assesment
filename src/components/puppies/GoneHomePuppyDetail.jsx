"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const whatsappNumber = "971541676733";

function useGoneHomeProfileMotion() {
  useEffect(() => {
    const article = document.querySelector(".tp-storybook");
    const tag = article?.querySelector(".tp-tag[data-reveal]");
    const ribbon = article?.querySelector(".tp-ribbon__band");
    if (!article) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tagObserver;
    if (tag) {
      if (reducedMotion) {
        tag.dataset.revealed = "true";
      } else {
        tag.dataset.armed = "true";
        tagObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.dataset.revealed = "true";
            tagObserver.unobserve(entry.target);
          });
        }, { threshold: 0.12 });
        tagObserver.observe(tag);
      }
    }

    if (!ribbon || reducedMotion) {
      return () => tagObserver?.disconnect();
    }

    const updateRibbon = () => {
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const scrollable = Math.max(1, article.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.scrollY - articleTop) / scrollable));
      ribbon.style.transform = "scaleY(" + progress + ")";
    };

    updateRibbon();
    window.addEventListener("scroll", updateRibbon, { passive: true });
    window.addEventListener("resize", updateRibbon);
    return () => {
      tagObserver?.disconnect();
      window.removeEventListener("scroll", updateRibbon);
      window.removeEventListener("resize", updateRibbon);
    };
  }, []);
}

function Gallery({ puppy }) {
  const photos = puppy.images || [];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const photo = photos[active];

  const move = (direction) => {
    if (!photos.length) return;
    setActive((current) => (current + direction + photos.length) % photos.length);
  };

  return (
    <div data-component="gallery">
      <div className="tp-storypage relative aspect-[4/5] md:aspect-[5/6]">
        {photo ? (
          <>
            <button
              type="button"
              className="absolute inset-0 block size-full"
              aria-label={`Open ${puppy.name}, photo ${active + 1} of ${photos.length} full screen`}
              onClick={() => setLightbox(true)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: photo.position }}
                fetchPriority={active === 0 ? "high" : "auto"}
              />
            </button>
            {photos.length > 1 && (
              <div className="absolute inset-x-4 bottom-4 z-10 flex justify-between">
                <button
                  type="button"
                  className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold"
                  onClick={() => move(-1)}
                  aria-label="Previous photo"
                >‹</button>
                <span className="self-center rounded-full bg-cocoa/80 px-3 py-1 text-sm font-semibold text-milk">
                  {active + 1} / {photos.length}
                </span>
                <button
                  type="button"
                  className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold"
                  onClick={() => move(1)}
                  aria-label="Next photo"
                >›</button>
              </div>
            )}
          </>
        ) : (
          <div className="tp-gallery__empty" role="img" aria-label={`No photo available for ${puppy.name}`}>
            Photo unavailable
          </div>
        )}
      </div>

      {photos.length > 0 && (
        <ul
          className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 pt-2 [scrollbar-width:thin]"
          aria-label={`All photos of ${puppy.name}`}
        >
          {photos.map((item, index) => (
            <li key={item.src} className="shrink-0">
              <button
                type="button"
                aria-label={`${puppy.name}, photo ${index + 1} of ${photos.length}`}
                aria-current={index === active ? "true" : "false"}
                className={`relative block h-24 w-20 overflow-hidden rounded-[0.9rem] border-[3px] transition-transform duration-300 md:h-28 md:w-24 ${
                  index === active
                    ? "-rotate-3 -translate-y-1 border-toffee-deep"
                    : "border-cocoa/30 hover:-rotate-2 hover:border-cocoa"
                }`}
                onClick={() => setActive(index)}
              >
                <img
                  src={item.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: item.position }}
                  loading="lazy"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {photo?.caption && (
        <p className="tp-storypage__caption">{photo.caption}</p>
      )}

      {lightbox && photo && (
        <div
          className="tp-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${puppy.name} photos`}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="tp-gallery__close"
            onClick={() => setLightbox(false)}
            aria-label="Close gallery"
          >×</button>
          {photos.length > 1 && (
            <button
              type="button"
              className="tp-gallery__light-arrow"
              onClick={(event) => { event.stopPropagation(); move(-1); }}
              aria-label="Previous photo"
            >‹</button>
          )}
          <img
            src={photo.src}
            alt={photo.alt}
            style={{ objectPosition: photo.position }}
            onClick={(event) => event.stopPropagation()}
          />
          {photos.length > 1 && (
            <button
              type="button"
              className="tp-gallery__light-arrow"
              onClick={(event) => { event.stopPropagation(); move(1); }}
              aria-label="Next photo"
            >›</button>
          )}
          <span className="tp-gallery__light-count">{active + 1} / {photos.length}</span>
        </div>
      )}
    </div>
  );
}

function PawStamp() {
  return (
    <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" fill="currentColor">
      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
    </svg>
  );
}

function EnquiryForm({ puppy }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    message: `Hi! I'd love to know more about ${puppy.name} (${puppy.breed}).`,
    website: "",
  });

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (form.website) return;

    const body = [
      `Puppy: ${puppy.name} (${puppy.breed}, ${puppy.genderLabel})`,
      `Name: ${form.name}`,
      `Phone/WhatsApp: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Area: ${form.area || "Not provided"}`,
      `Message: ${form.message}`,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const whatsappText = encodeURIComponent(
    `Hi TeddyPups! I'd like to ask about a puppy like ${puppy.name} (${puppy.breed}).`
  );

  return (
    <section
      id={`enquire-${puppy.slug}`}
      aria-labelledby={`enquire-title-${puppy.slug}`}
      className="tp-letter mt-20 grid gap-10 lg:grid-cols-12"
    >
      <span aria-hidden="true" className="tp-letter__stamp">
        <PawStamp />
      </span>

      <div className="lg:col-span-4">
        <p className="tp-chapter">
          <span aria-hidden="true" className="tp-chapter__n font-plush">3</span>
          <span className="font-scrawl">dear TeddyPups…</span>
        </p>
        <h2 id={`enquire-title-${puppy.slug}`} className="font-plush text-big mt-2">
          Looking for a puppy like this?
        </h2>
        <p className="mt-4 text-cocoa-soft">
          Leave your details and our team will get back to you promptly — or{" "}
          <a
            className="font-semibold underline decoration-from-font underline-offset-2"
            href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
          >message us on WhatsApp</a>{" "}
          for the quickest reply.
        </p>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <form className="space-y-5" onSubmit={submit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="puppy-enquiry-name" className="block text-[0.95rem] font-semibold">
                Your name<span className="text-toffee-ink"> *</span>
              </label>
              <input
                id="puppy-enquiry-name"
                className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                name="name"
                value={form.name}
                onChange={update}
              />
            </div>

            <div>
              <label htmlFor="puppy-enquiry-phone" className="block text-[0.95rem] font-semibold">
                Phone or WhatsApp<span className="text-toffee-ink"> *</span>
              </label>
              <input
                id="puppy-enquiry-phone"
                className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                name="phone"
                value={form.phone}
                onChange={update}
              />
              <p className="mt-1 text-sm text-cocoa-soft">With country code, e.g. +971 50 123 4567</p>
            </div>

            <div>
              <label htmlFor="puppy-enquiry-email" className="block text-[0.95rem] font-semibold">
                Email<span className="font-normal text-cocoa-soft"> (optional)</span>
              </label>
              <input
                id="puppy-enquiry-email"
                className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                type="email"
                autoComplete="email"
                name="email"
                value={form.email}
                onChange={update}
              />
            </div>

            <div>
              <label htmlFor="puppy-enquiry-area" className="block text-[0.95rem] font-semibold">
                Your area<span className="font-normal text-cocoa-soft"> (optional)</span>
              </label>
              <input
                id="puppy-enquiry-area"
                className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                autoComplete="address-level2"
                maxLength={80}
                name="area"
                value={form.area}
                onChange={update}
              />
              <p className="mt-1 text-sm text-cocoa-soft">e.g. Dubai Marina</p>
            </div>
          </div>

          <div>
            <label htmlFor="puppy-enquiry-message" className="block text-[0.95rem] font-semibold">
              Message <span className="font-normal text-cocoa-soft">(optional)</span>
            </label>
            <textarea
              id="puppy-enquiry-message"
              name="message"
              rows={4}
              maxLength={2000}
              className="mt-1.5 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 py-3 text-base outline-none focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
              value={form.message}
              onChange={update}
            />
          </div>

          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Website<input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={update} /></label>
          </div>

          <button type="submit" className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
            Send enquiry
          </button>
        </form>
      </div>
    </section>
  );
}

export default function GoneHomePuppyDetail({ puppy, previous, next }) {
  useGoneHomeProfileMotion();
  const whatsappText = encodeURIComponent(
    `Hi TeddyPups! I loved ${puppy.name} (https://puppy.instabizweb.com/puppies/${puppy.slug}). Do you have a puppy like them?`
  );

  return (
    <article
      className="tp-storybook"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, #f8e8e8 24%, var(--color-milk)) 0, var(--color-milk) 85%)",
      }}
    >
      <div aria-hidden="true" className="tp-ribbon">
        <div className="tp-ribbon__track">
          <span className="tp-ribbon__band" />
        </div>
      </div>

      <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="text-[0.95rem] font-semibold text-cocoa-soft">
          <Link className="link-ink" href="/gone-home">Gone home</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{puppy.name}</span>
        </nav>

        <p className="tp-chapter">
          <span aria-hidden="true" className="tp-chapter__n font-plush">1</span>
          <span className="font-scrawl">the day they went home</span>
        </p>

        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <Gallery puppy={puppy} />
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+5.5rem)]">
              <div
                className="tp-tag tp-board mt-16 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-9 lg:mt-20"
                data-reveal="true"
              >
                <span aria-hidden="true" className="tp-tag__ring" />
                <img
                  src="/ace-card-teddy.svg"
                  alt=""
                  aria-hidden="true"
                  className="tp-profile__mascot"
                />
                <span className="inline-grid place-items-center rounded-full border-[3px] border-current px-3 py-1 font-scrawl text-sm uppercase tracking-wide -rotate-6 text-toffee-deep">
                  Gone home ♥
                </span>
                <h1 className="font-plush mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">
                  {puppy.name}
                </h1>
                <p className="mt-2 text-lg font-semibold text-cocoa-soft">{puppy.breed}</p>

                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <dt className="font-scrawl text-sm text-cocoa-soft">Breed</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-semibold">{puppy.breed}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-sm text-cocoa-soft">Boy or girl</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-semibold">{puppy.genderLabel}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-sm text-cocoa-soft">Age</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-semibold">{puppy.age}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-sm text-cocoa-soft">Where</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-semibold">{puppy.where}</dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >Ask about a puppy like this</a>
                  <a href={`#enquire-${puppy.slug}`} className="btn btn-ghost">Send an enquiry</a>
                </div>
              </div>

              <div className="tp-paper mt-8 -rotate-1">
                <p className="tp-chapter">
                  <span aria-hidden="true" className="tp-chapter__n font-plush">2</span>
                  <span className="font-scrawl">what comes with {puppy.name}</span>
                </p>
                <h2 className="font-plush mt-1 text-[1.9rem]">Every Teddy Pup comes</h2>
                <ul className="mt-4 space-y-2.5">
                  {[
                    "Vaccinated",
                    "Dewormed",
                    "Verified health certificate from licensed vets",
                    "Thoroughly checked before joining your family",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-semibold">
                      <svg viewBox="0 0 32 32" className="mt-0.5 size-6 shrink-0 text-toffee-deep" aria-hidden="true">
                        <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <EnquiryForm puppy={puppy} />

        <nav aria-label="More puppies" className="mt-16 grid gap-4 sm:grid-cols-2">
          {previous ? (
            <Link
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1"
              href={`/puppies/${previous.slug}`}
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                {previous.images?.[0] && (
                  <img
                    src={previous.images[0].src}
                    alt={previous.images[0].alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: previous.images[0].position }}
                    loading="lazy"
                  />
                )}
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">Previous pup</span>
                <span className="font-plush text-[1.6rem]">{previous.name}</span>
              </span>
            </Link>
          ) : <span />}

          {next ? (
            <Link
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1 sm:last:flex-row-reverse sm:last:text-right"
              href={`/puppies/${next.slug}`}
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                {next.images?.[0] && (
                  <img
                    src={next.images[0].src}
                    alt={next.images[0].alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: next.images[0].position }}
                    loading="lazy"
                  />
                )}
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">Next pup</span>
                <span className="font-plush text-[1.6rem]">{next.name}</span>
              </span>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </article>
  );
}
