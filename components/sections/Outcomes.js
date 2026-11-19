import { outcomes } from "@/lib/content";

export default function Outcomes() {
  return (
    <section className="section outcomesSection">
      <div className="sectionHeading horizontalHeading">
        <div><p className="eyebrow">Не обещания, а артефакты</p><h2>Что останется<br />после работы</h2></div>
        <p>Конкретный набор зависит от задачи. Это примеры формата результата, а не выдуманные кейсы участников.</p>
      </div>
      <div className="outcomeGrid">
        {outcomes.map((item, index) => (
          <article className={`outcomeMockup mockup${index + 1}`} key={item.title}>
            <div className="mockupBar"><span /><span /><span /><b>{item.tag}</b></div>
            <div className="mockupBody"><div className="mockupIcon">{index + 1}</div><h3>{item.title}</h3><ul>{item.lines.map((line) => <li key={line}><span />{line}</li>)}</ul></div>
          </article>
        ))}
      </div>
    </section>
  );
}
