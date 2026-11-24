'use client';

import { useEffect, useRef, useState } from 'react';
import { familyPhotos, puppies, puppyImage } from '@/data/homepage';
import PuppyFlight from '@/components/layout/PuppyFlight';

const showroom =
  '/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg';

// Verify this number against the live site's contact details before submission.
const whatsapp = 'https://wa.me/971500000000';

function PuppyDoor({ puppy }) {
  return (
    <li className="tp-door" style={{ '--door': puppy.door }}>
      <a className="tp-door__link" href={puppy.href}>
        <span className="tp-door__plate">
          <span className="font-plush tp-door__name">{puppy.name}</span>
          <span className="tp-door__meta">{puppy.meta}</span>
        </span>

        <span className="tp-door__frame">
          <span className="tp-door__room">
            <img
              src={puppyImage(puppy.image)}
              alt={puppy.alt}
              style={{ objectPosition: puppy.position }}
              loading="lazy"
            />
          </span>

          <span aria-hidden="true" className="tp-door__way">
            <span className="tp-door__leaf">
              <svg
                className="tp-door__peephole"
                viewBox="0 0 60 60"
                aria-hidden="true"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle cx="30" cy="30" r="5" fill="currentColor" />
              </svg>
              <span className="tp-door__knob" />
            </span>
          </span>

          <span className="tp-door__tag font-scrawl">Available</span>
        </span>
      </a>
    </li>
  );
}

function MeetPups() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const scene = section?.querySelector('.tp-meet');

    if (!section || !track || !scene) return;

    const desktop = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    let animationFrame = 0;

    const cleanupDesktop = () => {
      delete scene.dataset.pinned;
      section.style.height = '';
      track.style.transform = '';
    };

    const update = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const maxX = Math.max(
          0,
          track.scrollWidth - window.innerWidth * 0.62
        );

        const rect = section.getBoundingClientRect();
        const travel = Math.max(
          1,
          section.offsetHeight - window.innerHeight
        );

        const progress = Math.min(
          1,
          Math.max(0, -rect.top / travel)
        );

        const trackX = -maxX * progress;
        track.style.transform =
          `translate3d(${trackX}px, 0, 0)`;

        if (scene.dataset.pinned === 'true') {
          track.querySelectorAll('.tp-door').forEach((door) => {
            const open = door.offsetLeft + trackX < window.innerWidth * 0.36;
            door.dataset.open = String(open);
          });
        }
      });
    };

    const setup = () => {
      if (!desktop.matches || reducedMotion.matches) {
        cleanupDesktop();
        return;
      }

      scene.dataset.pinned = 'true';

      requestAnimationFrame(() => {
        const overflow = Math.max(
          0,
          track.scrollWidth - window.innerWidth * 0.62
        );

        section.style.height =
          `${window.innerHeight + overflow}px`;

        update();
      });
    };

    setup();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', setup);

    desktop.addEventListener?.('change', setup);
    reducedMotion.addEventListener?.('change', setup);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', setup);
      desktop.removeEventListener?.('change', setup);
      reducedMotion.removeEventListener?.('change', setup);
      cleanupDesktop();
    };
  }, []);

  return (
    <div
      data-section="meet"
      ref={sectionRef}
      className="tp-meet-range"
    >
      <section
        className="tp-scene tp-meet"
        data-tone="light"
        style={{
          '--sky-top': '#fff1d8',
          '--sky-bottom': '#fbe3b4',
        }}
        aria-labelledby="meet-title"
      >
        <div className="tp-meet__stage">
          <header className="tp-meet__head gutter">
            <div>
              <h2 id="meet-title" className="font-plush text-huge">
                Meet the pups
              </h2>

              <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>

            <a className="btn btn-primary shrink-0" href="/puppies">
              See all available puppies
            </a>
          </header>

          <div className="tp-meet__hall">
            <ol
              ref={trackRef}
              className="tp-meet__track"
              aria-label="Puppies looking for a family"
            >
              {puppies.map((puppy) => (
                <PuppyDoor key={puppy.href} puppy={puppy} />
              ))}

              <li className="tp-door tp-door--all">
                <a className="tp-door__link" href="/puppies">
                  <span className="tp-door__plate">
                    <span className="font-plush tp-door__name">
                      Meet them all
                    </span>
                    <span className="tp-door__meta">
                      Find your new best friend
                    </span>
                  </span>

                  <span className="tp-door__frame tp-door__frame--all">
                    <span className="tp-door__all">
                      All our pups <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </a>
              </li>
            </ol>
          </div>

          <div className="tp-meet__floor" />
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      {/* HERO */}
      <section data-section="hero" className="tp-scene tp-hero">
        <span className="tp-hero__sun" aria-hidden="true" />

        <div className="tp-hero__copy gutter">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
          </p>

          <h1 className="tp-hero__title font-plush">
            <span className="tp-hero__line">Premium teacup</span>
            <span className="tp-hero__line tp-hero__line--2">
              puppies in Dubai
            </span>
          </h1>

          <p className="tp-hero__lede">
            Meet your new best friend in our Dubai showroom, or order a rare
            miniature breed from trusted breeders worldwide.
          </p>

          <div className="tp-hero__actions">
            <a className="btn btn-primary" href="/puppies">
              View available puppies
            </a>

            <a
              className="btn btn-whatsapp"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="tp-hero__stage">
          <div
            className="pup-stop tp-hero__teddy"
            data-pup-stop="true"
            data-pose="peek"
            data-facing="right"
            data-act="peekaboo"
            data-behind="true"
            data-lane="true"
            aria-hidden="true"
          />
          <ul className="tp-lineup">
            {puppies.slice(0, 7).map((puppy, index) => (
              <li
                className="tp-lineup__seat"
                key={puppy.href}
                style={{ '--i': index }}
              >
                <a className="tp-lineup__pup" href={puppy.href}>
                  <span className="tp-lineup__photo">
                    <img
                      src={puppyImage(puppy.image)}
                      alt={puppy.alt}
                      style={{ objectPosition: puppy.position }}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="tp-lineup tp-lineup--tags" aria-hidden="true">
            {puppies.slice(0, 7).map((puppy, index) => (
              <li className="tp-lineup__seat" key={puppy.href}>
                <span className="tp-lineup__ghost" />
                <span className="tp-lineup__name font-scrawl">
                  {puppy.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AVAILABLE PUPPIES */}
      <MeetPups />

      {/* TWO WAYS TO MEET YOUR PUPPY */}
      <section data-section="paths" className="tp-scene tp-paths">
        <div className="gutter tp-paths__inner">
          <h2 className="tp-paths__title font-plush text-huge">
            Two ways to meet your puppy
          </h2>

          <div className="tp-fork">
            <div className="tp-fork__post" />

            <article className="tp-way tp-way--left">
              <h3 className="tp-sign tp-sign--left font-plush">
                Puppies in Dubai
              </h3>

              <div className="tp-way__scene">
                <figure className="tp-window">
                  <span className="tp-window__glass">
                    <img
                      src={puppyImage(showroom)}
                      alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                      loading="lazy"
                    />
                  </span>
                </figure>
              </div>

              <p className="tp-way__text">
                <strong>In our showroom</strong>
                <br />
                See them, love them, take them home. Come meet our locally
                available puppies before you decide.
              </p>

              <a className="btn btn-primary" href="/puppies?type=local">
                Meet local puppies
              </a>
            </article>

            <article className="tp-way tp-way--right">
              <h3 className="tp-sign tp-sign--right font-plush">
                Imported for you
              </h3>

              <div className="tp-way__scene">
                <PuppyFlight />
              </div>

              <p className="tp-way__text">
                <strong>Korea to Dubai</strong>
                <br />
                Exclusive Korean teacup puppies, delivered. Order from the
                world's most reputable breeders and let us handle the import.
              </p>

              <a className="btn btn-primary" href="/puppies?type=imported">
                See imported puppies
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* PUPPY JOURNEY */}
      <section data-section="journey" className="tp-scene tp-chat">
        <div className="tp-chat__grid gutter">
          <div className="tp-chat__story">
            <p className="tp-kicker">A little help, every step</p>

            <h2 className="font-plush text-huge">
              Your puppy journey
            </h2>

            <p className="text-lede">
              A premium, step-by-step concierge experience. We make adoption
              simple, secure, and purely joyful.
            </p>

            <ol className="tp-chat__steps">
              <li className="tp-chat__step">
                <span className="tp-chat__num font-plush">01</span>
                <h3 className="font-plush tp-chat__title">
                  Choose your breed
                </h3>
                <p className="tp-chat__text">
                  Select your preferred breed or tell us what you're looking
                  for. We'll guide you based on availability and your lifestyle.
                </p>
              </li>

              <li className="tp-chat__step">
                <span className="tp-chat__num font-plush">02</span>
                <h3 className="font-plush tp-chat__title">
                  Get photos & details
                </h3>
                <p className="tp-chat__text">
                  Our team will share real photos, health details, and all
                  necessary information directly on WhatsApp.
                </p>
              </li>

              <li className="tp-chat__step">
                <span className="tp-chat__num font-plush">03</span>
                <h3 className="font-plush tp-chat__title">
                  Secure & safe delivery
                </h3>
                <p className="tp-chat__text">
                  Once confirmed, we handle everything professionally and
                  ensure your puppy reaches you safely and stress-free.
                </p>
              </li>
            </ol>

            <a className="btn btn-ghost tp-chat__cta" href="/how-it-works">
              How it works
            </a>
          </div>

          <div className="tp-chat__side">
            <div className="tp-phone">
              <div className="tp-phone__bar">
                <span className="tp-phone__name">TeddyPups U.A.E.</span>
                <span className="tp-phone__status">online</span>
              </div>

              <div className="tp-phone__screen">
                <p className="tp-msg tp-msg--me">
                  Hi TeddyPups! I'd love to know more about your puppies.
                </p>

                <div className="tp-msg-group">
                  <p className="tp-msg tp-msg--them">
                    Hello! We'd love to help you find your new best friend.
                    Which breed are you interested in?
                  </p>

                  <ul className="tp-chips">
                    {['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'].map(
                      (breed) => (
                        <li key={breed}>{breed}</li>
                      )
                    )}
                  </ul>
                </div>

                <p className="tp-msg tp-msg--them">
                  We can share real photos, videos and health details with you.
                </p>

                <p className="tp-typing">TeddyPups is typing…</p>
              </div>

              <a
                className="tp-phone__compose"
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                Say hello on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / PUPPY PASSPORT */}
      <section data-section="trust" className="tp-scene tp-passport">
        <div className="tp-book">
          <div className="tp-book__page tp-book__page--left">
            <p className="tp-book__kicker font-scrawl">puppy passport</p>
            <h2 className="font-plush tp-book__title">
              Why families trust TeddyPups
            </h2>
          </div>

          <ul className="tp-book__page tp-book__page--right">
            <li className="tp-entry">
              <span className="tp-stamp tp-stamp--round">✓</span>
              <span className="tp-stamp__title font-plush">
                Vet-checked & healthy
              </span>
              <p className="tp-entry__text">
                Every puppy comes vaccinated, dewormed, and with a verified
                health certificate.
              </p>
            </li>

            <li className="tp-entry">
              <span className="tp-stamp tp-stamp--ticket">✈</span>
              <span className="tp-stamp__title font-plush">
                Korea to Dubai, safely
              </span>
              <p className="tp-entry__text">
                Trusted breeders, safe travel, and premium care from start to
                finish.
              </p>
            </li>

            <li className="tp-entry">
              <span className="tp-stamp tp-stamp--oval">24/7</span>
              <span className="tp-stamp__title font-plush">Support 24/7</span>
              <p className="tp-entry__text">
                Always here to help, from choosing your puppy to post-delivery
                support.
              </p>
            </li>

            <li className="tp-entry">
              <span className="tp-stamp tp-stamp--scallop">♥</span>
              <span className="tp-stamp__title font-plush">
                Trusted by families worldwide
              </span>
              <p className="tp-entry__text">
                Puppies delivered to loving homes all around the world.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* HAPPY FAMILIES */}
      <section data-section="families" className="tp-scene tp-dusk">
        <div className="tp-dusk__sky gutter">
          <div className="tp-dusk__head">
            <div>
              <p className="tp-kicker">Little paws, big love</p>

              <h2 className="font-plush text-huge">
                Happy families & puppies
              </h2>

              <p className="text-lede">
                We are truly honored to see our puppies become cherished
                members of loving families. These heartwarming moments have
                been shared by our valued clients who welcomed a Teddy Pup
                into their homes and hearts.
              </p>
            </div>

            <figure className="tp-dusk__note">
              <blockquote>
                “TeddyPups truly made our dream a reality. They supported us at
                every step of the import journey. Our Maltipoo arrived healthy,
                cheerful, and absolutely perfect. Having 24/7 support
                throughout the process gave us complete peace of mind.”
              </blockquote>

              <figcaption>
                Sarah M. <span>Dubai, UAE</span>
              </figcaption>
            </figure>
          </div>

          <div className="tp-photowall">
            <div className="tp-photowall__wall">
              <ul className="tp-photowall__prints">
                {familyPhotos.map((photo, index) => (
                  <li key={photo}>
                    <figure className="tp-polaroid">
                      <span
                        className={`tp-tape tp-tape--${[
                          'center',
                          'left',
                          'right',
                          'tl',
                          'tr',
                        ][index % 5]}`}
                      />

                      <span className="tp-polaroid__photo">
                        <img
                          src={puppyImage(photo)}
                          alt="A TeddyPups family with their new puppy"
                          loading="lazy"
                        />
                      </span>

                      <figcaption className="tp-polaroid__caption font-scrawl">
                        {[
                          'Lulu 🧸',
                          'Home at last',
                          'Best friends',
                          'Pure joy',
                        ][index % 4]}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a className="btn btn-primary" href="/happy-families">
            See every happy family
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section data-section="questions" className="tp-scene tp-night">
        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <p className="tp-kicker">A few things you may wonder</p>

            <h2 className="font-plush text-huge">
              Questions, answered
            </h2>

            <a className="btn btn-ghost tp-night__cta" href="/faq">
              Read all questions
            </a>
          </div>

          <dl className="tp-night__list">
            {[
              [
                'Are your puppies vaccinated and health-checked?',
                'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
              ],
              [
                'Can I meet a puppy before I decide?',
                'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
              ],
              [
                'Can I take my puppy home the same day?',
                'Local puppies are available immediately, so you can take your puppy home the same day.',
              ],
            ].map(([question, answer], index) => (
              <div className="tp-qa" key={question}>
                <dt>
                  <button
                    className="font-plush tp-qa__q"
                    aria-expanded={openFaq === index}
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                  >
                    {question}
                    <span aria-hidden="true">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                </dt>

                {openFaq === index && (
                  <dd className="tp-qa__a">{answer}</dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FINAL CTA */}
      <section data-section="cta" className="tp-scene tp-home">
        <div className="tp-home__copy gutter">
          <p className="tp-kicker">A new chapter starts here</p>

          <h2 className="font-plush text-huge">
            Ready to meet your new best friend?
          </h2>

          <p className="tp-home__lede">
            Bring home a healthy, happy teacup or designer puppy with expert
            guidance every step of the way. We help you find the right match
            and ensure a smooth, safe delivery across the UAE.
          </p>
        </div>

        <div className="tp-house">
          <div className="tp-house__doorway">
            <span className="tp-house__inside">
              <img
                src={puppyImage(puppies[0].image)}
                alt="Max, waiting inside"
              />
            </span>

            <span className="tp-house__door" />
            <span className="tp-house__peep" />
            <span className="tp-house__knob" />
          </div>

          <span className="tp-house__mat font-scrawl">
            welcome home
          </span>
        </div>

        <div className="tp-home__actions gutter">
          <a
            className="btn btn-primary"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Enquire on WhatsApp
          </a>

          <a className="btn btn-ghost tp-home__ghost" href="/contact">
            Visit & contact
          </a>
        </div>
      </section>
    </>
  );
}