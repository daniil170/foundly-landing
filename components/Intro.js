"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics/events";

const introKey = "foundly_intro_seen";

export default function Intro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem(introKey) || reduced) return;
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const closeTimer = window.setTimeout(() => closeIntro(), 2100);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(closeTimer);
    };
  }, []);

  function closeIntro() {
    sessionStorage.setItem(introKey, "1");
    setVisible(false);
    trackEvent("intro_completed");
  }

  if (!visible) return null;
  return (
    <div className="intro" role="dialog" aria-label="Заставка Foundly">
      <button className="introSkip" type="button" onClick={closeIntro}>Пропустить</button>
      <div className="introMark">
        <Image src="/foundly-logo.png" width={132} height={132} alt="Foundly" priority />
        <span>Foundly</span>
      </div>
    </div>
  );
}
