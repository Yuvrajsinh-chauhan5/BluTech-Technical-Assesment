import Link from "next/link";
import PuppyShowroom from "@/components/home/PuppyShowroom";
import PuppyFlight from "@/components/layout/PuppyFlight";
import { families } from "@/data/families";

const media = "https://puppy.instabizweb.com";

const puppies = [
  {
    name: "Max",
    meta: "Maltipoo, boy, 3 months, with video",
    alt: "Max, male Maltipoo puppy",
    href: "/puppies/maltipoo-max-male",
    src: `${media}/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp`,
    position: "53.8% 44.3%",
    door: "#a24a1a",
  },
  {
    name: "Korean Teacup Maltipoo",
    meta: "girl, 2 months, with video",
    alt: "Female Korean Teacup Maltipoo puppy",
    href: "/puppies/korean-teacup-maltipoo-female",
    src: `${media}/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg`,
    position: "52.5% 42.6%",
    door: "#5a3a28",
  },
  {
    name: "Korean Teacup Poodle",
    meta: "girl, 2 months",
    alt: "Female Korean Teacup Poodle puppy",
    href: "/puppies/korean-teacup-poodle-female",
    src: `${media}/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg`,
    position: "54.5% 45.7%",
    door: "#d4893f",
  },
  {
    name: "Maltipoo & Cavapoo",
    meta: "boy, 3 months Maltipoo & 2 months Cavapoo, with video",
    alt: "Male Maltipoo & Cavapoo puppy",
    href: "/puppies/maltipoo-cavapoo-male",
    src: `${media}/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg`,
    position: "44.7% 29.5%",
    door: "#b8644a",
  },
  {
    name: "Toy Poodle",
    meta: "boy & girl, 2 months",
    alt: "Toy Poodle puppy",
    href: "/puppies/toy-poodle-male-female",
    src: `${media}/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg`,
    position: "65.4% 44.7%",
    door: "#7a4a2e",
  },
  {
    name: "Maltipoo",
    meta: "girl, 3 months, with video",
    alt: "Female Maltipoo puppy",
    href: "/puppies/maltipoo-female-2",
    src: `${media}/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg`,
    position: "64.6% 42.3%",
    door: "#a24a1a",
  },
  {
    name: "Pomeranian",
    meta: "girl, 3 months",
    alt: "Female Pomeranian puppy",
    href: "/puppies/pomeranian-female",
    src: `${media}/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg`,
    position: "40.3% 44.3%",
    door: "#5a3a28",
  },
  {
    name: "Copper",
    meta: "Cavapoo, boy, 2 months",
    alt: "Copper, male Cavapoo puppy",
    href: "/puppies/copper-male",
    src: `${media}/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg`,
    position: "43.0% 50.5%",
    door: "#d4893f",
  },
  {
    name: "Shih Tzu",
    meta: "girl, 2 months",
    alt: "Female Shih Tzu puppy",
    href: "/puppies/shitzu-female",
    src: `${media}/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg`,
    position: "44.8% 42.5%",
    door: "#b8644a",
  },
  {
    name: "Shih Tzu",
    meta: "boy, 2 months",
    alt: "Male Shih Tzu puppy",
    href: "/puppies/shitzu-male",
    src: `${media}/media/crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg`,
    position: "40.3% 43.6%",
    door: "#7a4a2e",
  },
  {
    name: "Maltipoo",
    meta: "girl, 2.5 months",
    alt: "Female Maltipoo puppy",
    href: "/puppies/maltipoo-female-1",
    src: `${media}/media/wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg`,
    position: "47.5% 50.5%",
    door: "#a24a1a",
  },
  {
    name: "Maltipoo",
    meta: "girl, 2 months",
    alt: "Female Maltipoo puppy",
    href: "/puppies/maltipoo-female",
    src: `${media}/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg`,
    position: "56.9% 49.2%",
    door: "#5a3a28",
  },
  {
    name: "Korean Teacup Pomeranian",
    meta: "girl, 2 months",
    alt: "Female Korean Teacup Pomeranian puppy",
    href: "/puppies/korean-teacup-pomeranian-1",
    src: `${media}/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg`,
    position: "49.9% 51.3%",
    door: "#d4893f",
  },
  {
    name: "Korean Teacup Pomeranian",
    meta: "girl, 2 months",
    alt: "Female Korean Teacup Pomeranian puppy",
    href: "/puppies/korean-teacup-pomeranian",
    src: `${media}/media/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg`,
    position: "49.9% 48.6%",
    door: "#b8644a",
  },
  {
    name: "Korean Teacup Pomeranian",
    meta: "boy, 2 months",
    alt: "Male Korean Teacup Pomeranian puppy",
    href: "/puppies/korean-teacup-pomeranian-male",
    src: `${media}/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg`,
    position: "48.9% 44.1%",
    door: "#7a4a2e",
  },
];

const heroPuppies = puppies.slice(0, 6);

const journeySteps = [
  {
    number: "01",
    title: "Choose your breed",
    description:
      "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    number: "02",
    title: "Get photos & details",
    description:
      "Our team will share real photos, health details, and all necessary information directly on WhatsApp.",
  },
  {
    number: "03",
    title: "Secure & safe delivery",
    description:
      "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.",
  },
];

const trustPoints = [
  {
    title: "Vet-checked & healthy",
    description:
      "Every puppy comes vaccinated, dewormed, and with a verified health certificate.",
    symbol: "✳",
  },
  {
    title: "Korea to Dubai, safely",
    description:
      "Trusted breeders, safe travel, and premium care from start to finish.",
    symbol: "✈",
  },
  {
    title: "Support 24/7",
    description:
      "Always here to help, from choosing your puppy to post-delivery support.",
    symbol: "♡",
  },
  {
    title: "Trusted by families worldwide",
    description:
      "Puppies delivered to loving homes all around the world.",
    symbol: "⌂",
  },
];

const questions = [
  {
    question: "Are your puppies vaccinated and health-checked?",
    answer:
      "Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.",
  },
  {
    question: "Can I meet a puppy before I decide?",
    answer:
      "Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.",
  },
  {
    question: "Can I take my puppy home the same day?",
    answer:
      "Local puppies are available immediately, so you can take your puppy home the same day.",
  },
];

const faqStars = [
  { left: "8%", top: "12%", width: "16.2px", delay: "0s" },
  { left: "22%", top: "30%", width: "9px", delay: ".4s" },
  { left: "41%", top: "8%", width: "12.6px", delay: ".8s" },
  { left: "57%", top: "22%", width: "8.1px", delay: "1.2s" },
  { left: "72%", top: "6%", width: "14.4px", delay: "1.6s" },
  { left: "88%", top: "18%", width: "10.8px", delay: "2s" },
  { left: "95%", top: "42%", width: "9px", delay: "2.4s" },
  { left: "4%", top: "58%", width: "10.8px", delay: "2.8s" },
  { left: "34%", top: "70%", width: "7.2px", delay: "3.2s" },
  { left: "63%", top: "84%", width: "9.9px", delay: "3.6s" },
  { left: "83%", top: "66%", width: "12.6px", delay: "4s" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-sun" aria-hidden="true" />

        <div className="hero-copy">
          <p className="handwritten font-scrawl hero-note">
            every puppy is family
            <svg
              viewBox="0 0 220 24"
              preserveAspectRatio="none"
              className="note-underline-svg"
              aria-hidden="true"
            >
              <path
                d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>

          <h1 className="hero-title">
            <span>Premium teacup</span>
            <span className="hero-title-second">puppies in Dubai</span>
          </h1>

          <p className="hero-description">
            Meet your new best friend in our Dubai showroom, or order a rare
            miniature breed from trusted breeders worldwide.
          </p>

          <div className="hero-actions">
            <Link href="/puppies" className="button button-primary">
              View available puppies
            </Link>
            <a
              href="https://wa.me/971541676733"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-stage">
          <ul className="puppy-lineup" aria-label="Puppies in our showroom">
            {heroPuppies.map((puppy, index) => (
              <li
                key={puppy.href}
                className="puppy-seat"
                style={{
                  "--x": ["9%", "22.5%", "35%", "65%", "77.5%", "91%"][index],
                  "--w": ["8.6rem", "10.4rem", "9.2rem", "9.4rem", "10.6rem", "8.4rem"][index],
                  "--peek": ["0.62", "0.8", "0.7", "0.74", "0.82", "0.6"][index],
                  "--tilt": ["-5deg", "3deg", "-2deg", "3deg", "-3deg", "4deg"][index],
                  "--i": index,
                }}
              >
                <Link href={puppy.href} className="puppy-link">
                  <span className="puppy-photo">
                    <img
                      src={puppy.src}
                      alt={puppy.alt}
                      loading="eager"
                      fetchPriority={index === 0 ? "high" : "auto"}
                      style={{ objectPosition: puppy.position }}
                    />
                  </span>
                  <span className="puppy-name handwritten">
                    {puppy.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="pup-stop tp-hero__teddy"
            data-pup-stop="true"
            data-pose="peek"
            data-facing="front"
            data-behind="true"
            data-lane="true"
            aria-hidden="true"
          />
          <div className="hero-quilt" aria-hidden="true">
            <svg
              viewBox="0 0 1200 42"
              preserveAspectRatio="none"
              className="quilt-edge"
            >
              <path
                d="M0 42 Q30 0 60 42 Q90 0 120 42 Q150 0 180 42 Q210 0 240 42 Q270 0 300 42 Q330 0 360 42 Q390 0 420 42 Q450 0 480 42 Q510 0 540 42 Q570 0 600 42 Q630 0 660 42 Q690 0 720 42 Q750 0 780 42 Q810 0 840 42 Q870 0 900 42 Q930 0 960 42 Q990 0 1020 42 Q1050 0 1080 42 Q1110 0 1140 42 Q1170 0 1200 42 V42 H0Z"
                fill="#fbe3b4"
                stroke="#2a170e"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        </section>

   

      <PuppyShowroom puppies={puppies} />

      {/* TWO WAYS — original forked showroom / import composition */}
      <section className="tp-scene tp-paths" data-pup-scene="true" data-tone="light" style={{"--sky-top":"#fff1d8","--sky-bottom":"#f7d18d"}} aria-labelledby="paths-title">
        <div className="gutter mx-auto max-w-[110rem]">
          <p className="font-scrawl tp-paths__eyebrow">find your way home</p>
          <h2 id="paths-title" className="font-plush text-huge tp-paths__title">Two ways to meet your puppy</h2>
          <div className="tp-fork">
            <article className="tp-way tp-way--left">
              <h3 className="tp-sign tp-sign--left font-plush">Puppies in Dubai</h3>
              <div className="tp-way__scene">
                <svg className="tp-way__skyline" viewBox="0 0 520 180" aria-hidden="true"><path d="M0 180V104h36V75h24v29h34V53h28v51h34V88h30v92zm220 0V70h34V43h20V70h26v-24h28v24h35v110zm190 0V92h35V61h22v31h28V78h25v102z" fill="currentColor" opacity=".16"/><path d="M0 180V150h520v30" fill="#d99b56" stroke="#2a170e" strokeWidth="3"/></svg>
                <figure className="tp-window"><span className="tp-window__glass"><img src={`${media}/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg`} alt="A tiny apricot puppy in the TeddyPups showroom" loading="lazy"/></span><figcaption className="font-scrawl">in our showroom</figcaption></figure>
              </div>
              <p className="tp-way__text">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
              <Link href="/puppies" className="btn btn-primary">Meet local puppies</Link>
            </article>
            <div className="tp-fork__post" aria-hidden="true"/>
            <div className="tp-fork__teddy pup-stop" data-pup-stop="true" data-pose="stand" data-facing="left" aria-hidden="true"/>
            <article className="tp-way tp-way--right">
              <h3 className="tp-sign tp-sign--right font-plush">Imported for you</h3>
              <div className="tp-way__scene"><PuppyFlight className="tp-flight"/></div>
              <p className="tp-way__text">Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.</p>
              <Link href="/puppies?origin=imported" className="btn btn-ghost">See imported puppies</Link>
            </article>
          </div>
        </div>
      </section>

      {/* THREE-STEP JOURNEY */}
      <section className="tp-scene tp-chat" data-pup-scene="true" data-tone="light" style={{"--sky-top":"#f7d18d","--sky-bottom":"#f0b866"}} aria-labelledby="journey-title">
        <div className="tp-chat__grid gutter">
          <div className="tp-chat__story">
            <p className="font-scrawl">one little step at a time</p>
            <h2 id="journey-title" className="font-plush text-huge">Your puppy journey</h2>
            <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
            <ol className="tp-chat__steps">{journeySteps.map((step,i)=><li className="tp-chat__step" data-done={i<2?"true":undefined} data-active={i===2?"true":undefined} key={step.number}><span className="tp-chat__num font-plush">{i+1}</span><h3 className="font-plush tp-chat__title">{step.title}</h3><p className="tp-chat__text">{step.description}</p></li>)}</ol>
            <Link href="/how-it-works" className="btn btn-ghost tp-chat__cta">How it works</Link>
          </div>
          <div className="tp-chat__side">
            <div className="tp-phone" aria-label="A WhatsApp conversation with TeddyPups U.A.E." role="group">
              <div className="tp-phone__bar">
                <img src="/brand/logo.png" alt="" width="40" height="40" className="tp-phone__avatar"/>
                <span><span className="tp-phone__name">TeddyPups U.A.E.</span><span className="tp-phone__status">online</span></span>
              </div>
              <div className="tp-phone__screen">
                <p className="tp-msg tp-msg--me">Hi TeddyPups! I'd love to know more about your puppies.</p>
                <div className="tp-msg-group" data-step="0" data-show="true">
                  <div className="tp-msg tp-msg--them">
                    <p>Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.</p>
                    <ul className="tp-chips" aria-label="Breeds we have now">
                      <li><a href="/puppies?breed=maltipoo">Maltipoo</a></li>
                      <li><a href="/puppies?breed=pomeranian">Pomeranian</a></li>
                      <li><a href="/puppies?breed=poodle">Poodle</a></li>
                      <li><a href="/puppies?breed=cavapoo">Cavapoo</a></li>
                      <li><a href="/puppies?breed=shih-tzu">Shih Tzu</a></li>
                    </ul>
                  </div>
                </div>
                <div className="tp-msg-group" data-step="1" data-show="true">
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-snaps">
                      <span className="tp-snaps__one"><img src="https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg" alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom" loading="lazy"/></span>
                      <span className="tp-snaps__one"><img src="https://puppy.instabizweb.com/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg" alt="The apricot teddy bear puppy from our showroom, close up" loading="lazy"/></span>
                      <span className="tp-snaps__one"><img src="https://puppy.instabizweb.com/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg" alt="The apricot teddy bear puppy from our showroom, looking up" loading="lazy"/></span>
                      <span className="tp-snaps__one"><img src="https://puppy.instabizweb.com/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg" alt="The apricot teddy bear puppy from our showroom, held up to say hello" loading="lazy"/></span>
                    </div>
                  </div>
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-clip">
                      <video src="https://puppy.instabizweb.com/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4" poster="https://puppy.instabizweb.com/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg" controls muted loop playsInline preload="none" aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"/>
                    </div>
                  </div>
                  <p className="tp-msg tp-msg--them">Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
                </div>
                <div className="tp-msg-group" data-step="2" data-show="true">
                  <div className="tp-msg tp-msg--them">
                    <p>Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.</p>
                    <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                      <path d="M14 52 C 60 6, 120 70, 170 28" className="tp-route__line"/>
                      <circle cx="14" cy="52" r="5" className="tp-route__dot"/>
                      <path d="M164 32 l12 -12 l12 12 v14 h-24 z" className="tp-route__home"/>
                      <path d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z" className="tp-route__heart"/>
                    </svg>
                  </div>
                </div>
              </div>
              <a href="https://wa.me/971541676733" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Say hello on WhatsApp</a>
            </div>
            <div className="pup-stop tp-chat__teddy" data-pup-stop="true" data-pose="stand" data-facing="left" aria-hidden="true"/>
          </div>
        </div>
      </section>

      {/* OPEN PUPPY PASSPORT */}
      <section className="tp-scene tp-passport" data-pup-scene="true" data-tone="light" style={{"--sky-top":"#f0b866","--sky-bottom":"#a65a30"}} aria-labelledby="trust-title">
        <div className="gutter mx-auto max-w-[96rem]"><div className="tp-book">
          <div className="tp-book__page tp-book__page--left"><p className="tp-book__kicker font-scrawl">puppy passport</p><h2 id="trust-title" className="font-plush tp-book__title">Why families trust TeddyPups</h2><p className="tp-book__body">Every little detail is taken care of, from the first hello to a lifetime of happy memories together.</p><div className="pup-stop tp-book__teddy" data-pup-stop="true" data-pose="sit" data-facing="right" aria-hidden="true"/></div>
          <ul className="tp-book__page tp-book__page--right">
            <li className="tp-entry" style={{"--ink-stamp":"#a24a1a","--tilt":"-8deg","--i":0}}><span className="tp-stamp tp-stamp--round"><svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true"><path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" fill="none" stroke="currentColor" strokeWidth="3"/></svg><span className="tp-stamp__title font-plush">Vet-checked &amp; healthy</span></span><p className="tp-entry__text">Every puppy comes vaccinated, dewormed, and with a verified health certificate.</p></li>
            <li className="tp-entry" style={{"--ink-stamp":"#1f6b45","--tilt":"5deg","--i":1}}><span className="tp-stamp tp-stamp--ticket"><svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true"><path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" fill="none" stroke="currentColor" strokeWidth="3"/></svg><span className="tp-stamp__title font-plush">Korea to Dubai, safely</span></span><p className="tp-entry__text">Trusted breeders, safe travel, and premium care from start to finish.</p></li>
            <li className="tp-entry" style={{"--ink-stamp":"#a24a1a","--tilt":"3deg","--i":2}}><span className="tp-stamp tp-stamp--scallop"><span className="tp-stamp__icon">♡</span><span className="tp-stamp__title font-plush">Support 24/7</span></span><p className="tp-entry__text">Always here to help, from choosing your puppy to post-delivery support.</p></li>
            <li className="tp-entry" style={{"--ink-stamp":"#1f6b45","--tilt":"-3deg","--i":3}}><span className="tp-stamp tp-stamp--oval"><span className="tp-stamp__icon">⌂</span><span className="tp-stamp__title font-plush">Trusted by families worldwide</span></span><p className="tp-entry__text">Puppies delivered to loving homes all around the world.</p></li>
          </ul>
        </div></div>
      </section>

      {/* HAPPY FAMILIES */}
      <section
        className="tp-scene tp-dusk"
        data-pup-scene="true"
        data-tone="dark"
        style={{ "--sky-top": "#a65a30", "--sky-bottom": "#4d2b19" }}
        aria-labelledby="dusk-title"
      >
        <div className="tp-dusk__sky gutter">
          <div className="tp-dusk__head">
            <h2 id="dusk-title" className="font-plush text-huge">
              Happy families &amp; puppies
            </h2>
            <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
              We are truly honored to see our puppies become cherished members
              of loving families. These heartwarming moments have been shared
              by our valued clients who welcomed a Teddy Pup into their homes
              and hearts.
            </p>
          </div>

          <figure className="tp-dusk__note">
            <blockquote className="font-plush-text">
              “TeddyPups truly made our dream a reality. They supported us at
              every step of the import journey. Our Maltipoo arrived healthy,
              cheerful, and absolutely perfect. Having 24/7 support throughout
              the process gave us complete peace of mind.”
            </blockquote>
            <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
          </figure>
        </div>

        <div className="tp-photowall">
          <div className="tp-photowall__wall">
            <ul
              className="tp-photowall__prints"
              aria-label="Photos from TeddyPups families"
            >
              {families.slice(0, 8).map((photo, index) => {
                const tapePosition = ["center", "left", "right"][index % 3];
                return (
                  <li
                    key={photo.id}
                    data-reveal="true"
                    data-pup-look={index % 3 === 1 ? "" : undefined}
                    style={{
                      "--tilt": photo.tilt,
                      "--tape": photo.tape,
                      "--i": index,
                      "--d": index * 65 + "ms",
                    }}
                  >
                    <Link
                      href="/happy-families"
                      className="tp-photowall__print"
                      aria-label={"View " + photo.caption + " in the happy families gallery"}
                    >
                      <span className="tp-polaroid">
                        <span
                          className={"tp-tape tp-tape--" + tapePosition}
                          aria-hidden="true"
                        />
                        <span className="tp-polaroid__photo">
                          <img
                            src={photo.image}
                            alt={photo.alt}
                            loading={index < 3 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </span>
                        <span className="tp-polaroid__caption font-scrawl">
                          {photo.caption}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="tp-facade__ground">
          <span aria-hidden="true" className="tp-facade__door" />
          <span aria-hidden="true" className="tp-lamp">
            <span className="tp-lamp__light" />
          </span>
          <Link
            href="/happy-families"
            className="btn btn-primary tp-facade__cta"
          >
            See every happy family
          </Link>
          <div
            className="pup-stop tp-dusk__teddy-art"
            data-pup-stop="true"
            data-pose="walk"
            data-facing="right"
            aria-hidden="true"
          />
          </div>
        </div>
      </section>

      {/* QUESTIONS — original dark night-sky scene */}
      <section className="tp-scene tp-night" data-pup-scene="true" data-tone="dark" style={{ "--sky-top": "#4d2b19", "--sky-bottom": "#2f1a10" }} aria-labelledby="questions-title">
        <div aria-hidden="true" className="pointer-events-none tp-night__stars">
          {faqStars.map((star, index) => (
            <svg key={index} viewBox="0 0 40 40" className="tp-twinkle absolute text-honey" style={{ left: star.left, top: star.top, width: star.width, animationDelay: star.delay }} aria-hidden="true">
              <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
            </svg>
          ))}
        </div>
        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <p className="font-scrawl text-lg text-honey">a little peace of mind</p>
            <h2 id="questions-title" className="font-plush text-huge">Questions, answered</h2>
            <Link href="/faq" className="btn btn-ghost tp-night__cta">Read all questions</Link>
            <div className="tp-night__pup">
              <span aria-hidden="true" className="tp-night__wonder font-plush">?</span>
              <div className="pup-stop tp-night__teddy" data-pup-stop="true" data-pose="sit" data-facing="right" data-act="tilt" aria-hidden="true" />
            </div>
          </div>
          <dl className="tp-night__list">
            {questions.map((item) => (
              <div className="tp-qa" key={item.question}>
                <dt className="font-plush tp-qa__q">
                  <svg viewBox="0 0 40 40" className="tp-qa__star" aria-hidden="true">
                    <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
                  </svg>
                  {item.question}
                </dt>
                <dd className="tp-qa__a">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FINAL CTA — original welcome-home house scene */}
      <section className="tp-scene tp-home" data-pup-scene="true" data-tone="dark" style={{ "--sky-top": "#2f1a10", "--sky-bottom": "#24130b" }} aria-labelledby="home-final-title">
        <div className="tp-home__copy gutter">
          <h2 id="home-final-title" className="font-plush text-huge">Ready to meet your new best friend?</h2>
          <p className="tp-home__lede">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
        </div>
        <div className="tp-house">
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--left" />
          <span aria-hidden="true" className="tp-house__lamp" />
          <div className="tp-house__doorway">
            <span className="tp-house__inside">
              <img src={puppies[0].src} alt="Max, waiting inside" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "53.8% 44.3%" }} />
            </span>
            <span aria-hidden="true" className="tp-house__door">
              <span className="tp-house__peep" />
              <span className="tp-house__knob" />
            </span>
          </div>
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--right" />
          <span aria-hidden="true" className="tp-house__mat font-scrawl">welcome home</span>
          <div className="pup-stop tp-house__teddy" data-pup-stop="true" data-pose="bow" data-facing="right" aria-hidden="true" />
        </div>
        <div className="tp-home__actions gutter">
          <a className="btn btn-whatsapp" href="https://wa.me/971500000000" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
          <Link href="/contact" className="btn btn-ghost tp-home__ghost">Visit &amp; contact</Link>
        </div>
      </section>

    </>
  );
}
