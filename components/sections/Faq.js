import { faq } from "@/lib/content";

export default function Faq() {
  return (
    <section className="section splitSection faqSection">
      <div className="sectionHeading stickyHeading"><p className="eyebrow">Коротко о важном</p><h2>Вопросы<br />и ответы</h2></div>
      <div className="faqList">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
    </section>
  );
}
