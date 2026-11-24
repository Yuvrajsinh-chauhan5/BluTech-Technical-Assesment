import { notFound } from "next/navigation";
import GoneHomePuppyDetail from "@/components/puppies/GoneHomePuppyDetail";
import AvailablePuppyDetail from "@/components/puppies/AvailablePuppyDetail";
import { goneHomePuppies } from "@/data/gone-home-puppies";
import { puppies } from "@/data/puppies";

export function generateStaticParams() {
  const slugs = new Set([...goneHomePuppies, ...puppies].map(({ slug }) => slug));
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const goneHomePuppy = goneHomePuppies.find((item) => item.slug === slug);
  if (goneHomePuppy) {
    return {
      title: `${goneHomePuppy.name} — ${goneHomePuppy.breed} | Gone Home | TeddyPups`,
      description: `Remember ${goneHomePuppy.name}, a ${goneHomePuppy.genderLabel.toLowerCase()} ${goneHomePuppy.breed} puppy who found a loving home.`,
    };
  }
  const puppy = puppies.find((item) => item.slug === slug);
  return puppy
    ? { title: `${puppy.name}, ${puppy.breed} puppy | TeddyPups U.A.E.`, description: `Meet ${puppy.name}, a ${puppy.breed} puppy.` }
    : { title: "Puppy Not Found | TeddyPups" };
}

export default async function PuppyProfilePage({ params }) {
  const { slug } = await params;
  const index = goneHomePuppies.findIndex((item) => item.slug === slug);
  if (index >= 0) {
    const puppy = goneHomePuppies[index];
    const previous = index === 0
      ? {
          slug: "maltipo",
          name: "Poodle",
          images: [{
            src: "https://puppy.instabizweb.com/media/sFgPBojUhFBo/5ac1429cf4/27b888_aa0ce426ca3848abbc7d695f8c818568-mv2.avif",
            alt: "Female Poodle puppy",
            position: "44% 32.8%",
          }],
        }
      : goneHomePuppies[index - 1];
    const next = goneHomePuppies[index + 1] || null;
    return <GoneHomePuppyDetail puppy={puppy} previous={previous} next={next} />;
  }
  const puppyIndex = puppies.findIndex((item) => item.slug === slug);
  if (puppyIndex < 0) notFound();

  const puppy = puppies[puppyIndex];
  const previous = slug === "maltipoo-max-male"
    ? puppies.find((item) => item.slug === "korean-teacup-pomeranian-male")
    : puppies[puppyIndex - 1] || null;
  const next = slug === "maltipoo-max-male"
    ? puppies.find((item) => item.slug === "korean-teacup-maltipoo-female")
    : puppies[puppyIndex + 1] || null;

  return <AvailablePuppyDetail puppy={puppy} previous={previous} next={next} />;
}
