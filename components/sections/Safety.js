import { safetyItems } from "@/lib/content";

export default function Safety() {
  return (
    <section className="section safetySection" id="safety">
      <div className="safetyIntro">
        <p className="eyebrow">Безопасность — часть продукта</p>
        <h2>Прозрачно для участника.<br />Спокойно для родителя.</h2>
        <div className="safetySeal"><span>Участие</span><strong>родителя</strong><span>по умолчанию</span></div>
      </div>
      <div className="safetyGrid">
        {safetyItems.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
      </div>
      <p className="safetyNote">Foundly не заявляет о государственной сертификации или юридическом одобрении. Правила выше — внутренний консервативный протокол пилота.</p>
    </section>
  );
}
