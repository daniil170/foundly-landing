import { scenarios } from "@/lib/content";

export default function Scenarios({ onCta }) {
  return (
    <section className="section" id="scenarios">
      <div className="sectionHeading">
        <p className="eyebrow">Три точки старта</p>
        <h2>Начни с задачи,<br />которая важна сейчас</h2>
        <p>Не нужно заранее знать весь маршрут. Достаточно понимать, к чему хочется прийти.</p>
      </div>
      <div className="scenarioGrid">
        {scenarios.map((scenario, index) => (
          <article className="scenarioCard" key={scenario.id}>
            <div className="cardIndex">0{index + 1}</div>
            <p className="cardMarker">{scenario.marker}</p>
            <h3>{scenario.title}</h3>
            <div className="scenarioDetail"><span>Сейчас</span><p>{scenario.problem}</p></div>
            <div className="scenarioDetail"><span>Результат</span><p>{scenario.result}</p></div>
            <ul className="tagList">{scenario.artifacts.map((item) => <li key={item}>{item}</li>)}</ul>
            <button className="textButton" type="button" onClick={() => onCta({ cta: `scenario_${scenario.id}`, role: "student", scenario: scenario.id })}>Разобрать этот сценарий</button>
          </article>
        ))}
      </div>
    </section>
  );
}
