import { processSteps } from "@/lib/content";

export default function Process() {
  return (
    <section className="section splitSection" id="process">
      <div className="sectionHeading stickyHeading">
        <p className="eyebrow">Как это работает</p>
        <h2>От разговора<br />к движению</h2>
        <p>Ментор не делает работу за участника. Он помогает выбрать верный следующий шаг и не потерять темп.</p>
      </div>
      <ol className="processList">
        {processSteps.map((step, index) => (
          <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>
        ))}
      </ol>
    </section>
  );
}
