"use client";

import { useEffect, useState } from "react";
import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Scenarios from "@/components/sections/Scenarios";
import Process from "@/components/sections/Process";
import Outcomes from "@/components/sections/Outcomes";
import Formats from "@/components/sections/Formats";
import Safety from "@/components/sections/Safety";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import { captureAttribution } from "@/lib/analytics/utm";
import { trackEvent } from "@/lib/analytics/events";

export default function LandingPage() {
  const [preset, setPreset] = useState(null);

  useEffect(() => {
    captureAttribution({ search: window.location.search, referrer: document.referrer, path: `${window.location.pathname}${window.location.search}`, storage: sessionStorage });
  }, []);

  function openForm(nextPreset) {
    setPreset({ ...nextPreset, nonce: Date.now() });
    trackEvent("cta_clicked", { cta: nextPreset.cta });
    if (nextPreset.scenario) trackEvent("scenario_selected", { scenario: nextPreset.scenario });
    window.requestAnimationFrame(() => document.getElementById("intake")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
  }

  return (
    <>
      <Intro />
      <Header onCta={openForm} />
      <main>
        <Hero onCta={openForm} />
        <Scenarios onCta={openForm} />
        <Process />
        <Outcomes />
        <Formats onCta={openForm} />
        <Safety />
        <Faq />
        <FinalCta preset={preset} />
      </main>
      <Footer />
    </>
  );
}
