import Link from "next/link";
import { goneHomePuppies } from "@/data/gone-home-puppies";
import GoneHomeMotion from "@/components/puppies/GoneHomeMotion";

export const metadata = {
  title: "Gone home | TeddyPups",
  description:
    "Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.",
};

const ticketTilts = ["-1.4deg", "1.1deg", "-0.6deg", "1.6deg", "-1.1deg", "0.8deg"];

function GoneHomeTicket({ puppy, index }) {
  const cover = puppy.images?.[0];

  return (
    <li
      className="tp-ticket"
      data-reveal="true"
      style={{
        "--tilt": ticketTilts[index % ticketTilts.length],
        "--i": index % ticketTilts.length,
      }}
    >
      <Link
        className="tp-ticket__link"
        href={`/puppies/${puppy.slug}`}
        aria-label={`View ${puppy.name}, ${puppy.genderLabel.toLowerCase()} ${puppy.breed} puppy`}
      >
        <span className="tp-ticket__main">
          <span className="tp-ticket__photo">
            {cover ? (
              <img
                src={cover.src}
                alt={cover.alt || `${puppy.name}, ${puppy.genderLabel.toLowerCase()} ${puppy.breed} puppy`}
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
                style={{ objectFit: "cover", objectPosition: cover.position || "center" }}
              />
            ) : (
              <span className="tp-ticket__fallback">{puppy.name}</span>
            )}
          </span>
          <span className="tp-ticket__body">
            <span className="font-scrawl tp-ticket__kicker">one ticket home</span>
            <span className="font-plush tp-ticket__name">{puppy.name}</span>
            <span className="tp-ticket__meta">{puppy.breed}, {puppy.genderLabel.toLowerCase()}</span>
            <span className="tp-ticket__route">
              <span>TeddyPups</span>
              <svg viewBox="0 0 60 12" aria-hidden="true">
                <path d="M2 6h46" />
                <path d="M44 2l6 4-6 4" />
              </svg>
              <span>home ♥</span>
            </span>
          </span>
        </span>
        <span aria-hidden="true" className="tp-ticket__stub">
          <span className="font-plush">admit one</span>
        </span>
      </Link>
    </li>
  );
}

export default function GoneHomePage() {
  return (
    <main id="main" tabIndex={-1} className="relative pt-[var(--header-height)] outline-none">
      <div data-page="gone" className="tp-page">
        <GoneHomeMotion />
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="tp-boothhead">
            <div className="max-w-3xl">
              <h1 className="font-plush text-giant">
                Gone home
                <svg viewBox="0 0 48 44" className="ml-3 inline-block w-[0.45em] -translate-y-[0.15em] text-toffee" aria-hidden="true">
                  <path d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </h1>
              <p className="text-lede mt-6 text-cocoa-soft">
                Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.
              </p>
              <Link className="btn btn-primary mt-8" href="/puppies">See available puppies</Link>
            </div>

            <div aria-hidden="true" className="tp-booth">
              <div className="pup-buddy tp-booth__teddy" data-facing="right">
                <img src="/ace-card-teddy.svg" alt="" className="h-full w-full object-contain" />
              </div>
              <div className="tp-booth__counter">
                <span className="font-plush">tickets home</span>
              </div>
            </div>
          </header>

          <ul className="tp-tickets" aria-label="Puppies who have gone home">
            {goneHomePuppies.map((puppy, index) => (
              <GoneHomeTicket key={puppy.slug} puppy={puppy} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
