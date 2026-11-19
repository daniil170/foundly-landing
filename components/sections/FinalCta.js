import LeadForm from "@/components/forms/LeadForm";

export default function FinalCta({ preset }) {
  return (
    <section className="section finalCta" id="intake">
      <div className="finalCopy">
        <p className="eyebrow">Бесплатная диагностика</p>
        <h2>Расскажи о проекте — вместе определим следующий шаг</h2>
        <p>Не нужно готовить идеальный питч. Опишите ситуацию как есть, а команда вручную посмотрит заявку.</p>
        <div className="finalFacts"><span>20 минут</span><span>Без оплаты</span><span>Без обещаний «успеха»</span></div>
      </div>
      <LeadForm preset={preset} />
    </section>
  );
}
