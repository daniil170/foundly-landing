"use client";

import { useState } from "react";

const journey = ["Идея", "План", "Ментор", "Проект", "Результат"];

export default function Hero({ onCta }) {
  const [active, setActive] = useState(0);
  return (
    <section className="hero section" id="top">
      <div className="heroCopy">
        <p className="eyebrow"><span className="pulseDot" /> Бесплатный исследовательский пилот</p>
        <h1>Преврати идею<br />в <span>реальный проект</span></h1>
        <p className="heroLead">Foundly помогает школьникам и студентам найти подходящего ментора, составить понятный план и довести проект до портфолио, конкурса или работающего MVP.</p>
        <div className="heroActions">
          <button className="button buttonPrimary" type="button" onClick={() => onCta({ cta: "hero_diagnosis", role: "student" })}>Пройти бесплатную диагностику</button>
          <button className="button buttonGhost" type="button" onClick={() => onCta({ cta: "hero_mentor", role: "mentor" })}>Стать ментором</button>
        </div>
        <p className="microcopy">20 минут · без оплаты · ручный разбор командой</p>
      </div>
      <div className="journeyCard" aria-label="Путь проекта">
        <div className="journeyTop"><span>Маршрут проекта</span><span>01—05</span></div>
        <div className="brandSlices" aria-hidden="true"><span /><span /><b>{String(active + 1).padStart(2, "0")}</b></div>
        <div className="journeyCurrent"><span>Сейчас</span><strong>{journey[active]}</strong></div>
        <div className="journeySteps">
          {journey.map((item, index) => (
            <button className={active === index ? "active" : ""} type="button" key={item} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{item}
            </button>
          ))}
        </div>
        <p>Каждый этап заканчивается понятным решением или артефактом.</p>
      </div>
    </section>
  );
}
