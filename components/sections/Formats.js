import { formats } from "@/lib/content";

export default function Formats({ onCta }) {
  return (
    <section className="section" id="formats">
      <div className="formatPanel">
        <div className="sectionHeading">
          <p className="eyebrow">Планируемые форматы пилота</p>
          <h2>Формат подбирается<br />после диагностики</h2>
          <p>Платный запуск ещё не открыт. Стоимость ниже — ориентиры, которые Foundly планирует проверить после решения юридических и инфраструктурных вопросов.</p>
        </div>
        <div className="formatCards">
          {formats.map((format) => <article key={format.title}><p>Будущий формат</p><h3>{format.title}</h3><strong>{format.price}</strong><span>{format.text}</span></article>)}
          <button className="button buttonPrimary" type="button" onClick={() => onCta({ cta: "formats_waitlist" })}>Оставить предварительную заявку</button>
        </div>
      </div>
    </section>
  );
}
