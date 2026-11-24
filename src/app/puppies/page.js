import PuppyCatalogue from "@/components/puppies/PuppyCatalogue";

export const metadata = {
  title: "Available puppies | TeddyPups",
  description:
    "Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.",
};

export default function PuppiesPage() {
  return <PuppyCatalogue />;
}