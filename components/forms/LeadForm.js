"use client";

import { useEffect, useRef, useState } from "react";
import { Field, Input, Select, Textarea } from "@/components/forms/FormField";
import RoleFields from "@/components/forms/RoleFields";
import { trackEvent } from "@/lib/analytics/events";
import { getAttribution } from "@/lib/analytics/utm";
import { options, roles } from "@/lib/leads/fields";
import { validateStep } from "@/lib/leads/validation";

const emptyData = {
  role: "", name: "", contact: "", city: "", contactMethod: "", message: "", consent: false,
  ageGroup: "", childAgeGroup: "", projectStage: "", direction: "", goal: "", deadline: "", scenario: "",
  parentName: "", parentContact: "", parentInformed: false, challenge: "", expertise: "", experience: "",
  portfolioUrl: "", projectTypes: "", availability: "", motivation: "", website: "", selectedCta: ""
};

export default function LeadForm({ preset }) {
  const [data, setData] = useState(emptyData);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (!preset) return;
    const timer = window.setTimeout(() => {
      setData((current) => ({ ...current, role: preset.role || current.role, scenario: preset.scenario || current.scenario, selectedCta: preset.cta || current.selectedCta }));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [preset]);

  function begin() {
    if (started.current) return;
    started.current = true;
    trackEvent("form_started", { selectedCta: data.selectedCta });
  }

  function onChange(event) {
    begin();
    const { name, type, checked, value } = event.target;
    setData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function next() {
    begin();
    const nextErrors = validateStep(step, data);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      trackEvent("form_error", { step, type: "validation" });
      return;
    }
    trackEvent("form_step_completed", { step: step + 1, role: data.role });
    setErrors({});
    setStep((current) => Math.min(current + 1, 2));
  }

  async function submit(event) {
    event.preventDefault();
    if (status === "loading") return;
    const nextErrors = validateStep(2, data);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      trackEvent("form_error", { step: 2, type: "validation" });
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, attribution: getAttribution(sessionStorage) })
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.message || "Не удалось отправить заявку");
      }
      setStatus("success");
      trackEvent("form_submitted", { role: data.role, scenario: data.scenario, selectedCta: data.selectedCta });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте позже");
      trackEvent("form_error", { step: 2, type: "delivery" });
    }
  }

  if (status === "success") {
    return (
      <div className="successState" role="status">
        <div className="successIcon">✓</div>
        <p className="eyebrow">Заявка получена</p>
        <h3>Спасибо, {data.name}</h3>
        <p>Команда вручную посмотрит вашу заявку и свяжется выбранным способом. Следующий шаг — короткий разговор о задаче; мгновенный подбор ментора не обещаем.</p>
        <button className="textButton" type="button" onClick={() => { setData(emptyData); setStep(0); setStatus("idle"); started.current = false; }}>Отправить другую заявку</button>
      </div>
    );
  }

  return (
    <form className="leadForm" onSubmit={submit} onFocus={begin} noValidate>
      <div className="formProgress" aria-label={`Шаг ${step + 1} из 3`}><span style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
      <div className="formMeta"><span>Шаг {step + 1} из 3</span><span>{["Кто вы", "Как связаться", "О задаче"][step]}</span></div>

      {step === 0 && (
        <fieldset className="roleStep">
          <legend>Кто вы?</legend>
          <p>Покажем только вопросы, которые относятся к вашей ситуации.</p>
          <div className="roleOptions">
            {Object.entries(roles).map(([value, label]) => <label className={data.role === value ? "selected" : ""} key={value}><input type="radio" name="role" value={value} checked={data.role === value} onChange={onChange} /><span>{label}</span><b>Выбрать</b></label>)}
          </div>
          {errors.role && <span className="errorText" role="alert">{errors.role}</span>}
        </fieldset>
      )}

      {step === 1 && (
        <div className="formFields">
          <Field label="Имя" name="name" error={errors.name}><Input name="name" value={data.name} onChange={onChange} error={errors.name} autoComplete="name" /></Field>
          <Field label="Email или телефон" name="contact" error={errors.contact}><Input name="contact" value={data.contact} onChange={onChange} error={errors.contact} autoComplete="email" placeholder="name@email.com или +7…" /></Field>
          <Field label="Город" name="city" error={errors.city}><Input name="city" value={data.city} onChange={onChange} error={errors.city} autoComplete="address-level2" /></Field>
          <Field label="Как удобнее связаться" name="contactMethod" error={errors.contactMethod}><Select name="contactMethod" value={data.contactMethod} onChange={onChange} error={errors.contactMethod} options={options.contactMethods} /></Field>
          <Field label="Короткое сообщение" name="message"><Textarea name="message" value={data.message} onChange={onChange} rows="3" placeholder="Что важно знать до разговора?" /></Field>
        </div>
      )}

      {step === 2 && (
        <div className="formFields">
          <RoleFields data={data} errors={errors} onChange={onChange} />
          <div className="honeypot" aria-hidden="true"><label htmlFor="website">Сайт</label><input id="website" name="website" value={data.website} onChange={onChange} tabIndex="-1" autoComplete="off" /></div>
          <label className="checkField"><input type="checkbox" name="consent" checked={data.consent} onChange={onChange} /><span>Я согласен на обработку данных для рассмотрения заявки и связи со мной. <a href="/privacy" target="_blank">Политика приватности</a></span></label>
          {errors.consent && <span className="errorText" role="alert">{errors.consent}</span>}
        </div>
      )}

      {status === "error" && <div className="formAlert" role="alert">{message}</div>}
      <div className="formActions">
        {step > 0 && <button className="button buttonGhost" type="button" onClick={() => { setStep((current) => current - 1); setErrors({}); }}>Назад</button>}
        {step < 2 ? <button className="button buttonPrimary" type="button" onClick={next}>Продолжить</button> : <button className="button buttonPrimary" type="submit" disabled={status === "loading"}>{status === "loading" ? "Отправляем…" : "Отправить заявку"}</button>}
      </div>
    </form>
  );
}
