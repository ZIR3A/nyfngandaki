import ScrollProgress from "@/components/home-v2/ScrollProgress";
import Navbar from "@/components/home-v2/Navbar";
import Hero from "@/components/home-v2/Hero";
import StoryTransition from "@/components/home-v2/StoryTransition";
import About from "@/components/home-v2/About";
import VisionMission from "@/components/home-v2/VisionMission";
import CoreValues from "@/components/home-v2/CoreValues";
import Organization from "@/components/home-v2/Organization";
import Leadership from "@/components/home-v2/Leadership";
import Impact from "@/components/home-v2/Impact";
import Activities from "@/components/home-v2/Activities";
import JoinMovement from "@/components/home-v2/JoinMovement";
import Footer from "@/components/home-v2/Footer";

export const metadata = {
  title: "NYFN Gandaki Province — Home",
  description:
    "The official homepage of the National Youth Federation Nepal (NYFN) Gandaki Province Committee. Representing 2,500+ youth members across 11 districts.",
  openGraph: {
    title: "NYFN Gandaki Province",
    description:
      "Building responsible, disciplined, and patriotic youth for a democratic and prosperous Nepal.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NYFN Gandaki Province",
    description:
      "Building responsible, disciplined, and patriotic youth for a democratic and prosperous Nepal.",
  },
};

import GSAPRegistry from "@/components/home-v2/GSAPRegistry";

/**
 * /home-v2
 *
 * A completely self-contained cinematic homepage experience.
 * This route is ISOLATED from the [locale] layout segment.
 * It does not share Header, Footer, LanguageProvider, or PublicLayout
 * with the existing homepage at /[locale]/page.js.
 *
 * Every component lives in src/components/home-v2/ and is independent.
 */
export default function HomeV2() {
  return (
    <>
      {/* Global GSAP Plugin Registration */}
      <GSAPRegistry />

      {/* Fixed scroll progress indicator */}
      <ScrollProgress />

      {/* Self-contained transparent → opaque sticky navbar */}
      <Navbar />

      <main id="main-content">
        {/* 1. Cinematic full-viewport hero */}
        <Hero />

        {/* 2. Pull-quote story transition */}
        <StoryTransition />

        {/* 3. Editorial about section */}
        <About />

        {/* 4. Asymmetric vision / mission split */}
        <VisionMission />

        {/* 5. Core values editorial grid */}
        <CoreValues />

        {/* 6. Organizational structure + district grid */}
        <Organization />

        {/* 7. Cinematic leadership portraits */}
        <Leadership />

        {/* 8. Bold impact statistics */}
        <Impact />

        {/* 9. Program areas magazine layout */}
        <Activities />

        {/* 10. Full-width CTA */}
        <JoinMovement />
      </main>

      {/* Self-contained footer */}
      <Footer />
    </>
  );
}
