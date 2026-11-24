// import "./globals.css";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";

// export const metadata = {
//   title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
//   description:
//     "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
//   applicationName: "TeddyPups U.A.E.",
//   themeColor: "#fffdf8",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" data-scroll-behavior="smooth">
//       <body>
//         <Header />
//         <main>{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteInteractions from "@/components/layout/SiteInteractions";
import { Analytics } from "@vercel/analytics/next";


export const metadata = {
  title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
  description:
    "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
  applicationName: "TeddyPups U.A.E.",
};

export const viewport = {
  themeColor: "#fffdf8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <SiteInteractions />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
