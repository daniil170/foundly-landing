"use client";

import { useState } from "react";
import Brand from "@/components/Brand";
import { navigation } from "@/lib/content";

export default function Header({ onCta }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="siteHeader">
      <a href="#top" aria-label="Foundly, на главную"><Brand compact /></a>
      <button className="menuToggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((value) => !value)}>
        <span /><span />
        <span className="srOnly">Меню</span>
      </button>
      <nav id="main-nav" className={open ? "navOpen" : ""} aria-label="Основная навигация">
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
      <button className="button buttonSmall headerCta" type="button" onClick={() => onCta({ cta: "header_diagnosis" })}>Разобрать проект</button>
    </header>
  );
}
