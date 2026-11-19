import { Field, Input, Select, Textarea } from "@/components/forms/FormField";
import { options } from "@/lib/leads/fields";
import { isMinor } from "@/lib/leads/validation";

function StudentFields({ data, errors, onChange }) {
  return (
    <>
      <Field label="Возрастная группа" name="ageGroup" error={errors.ageGroup}><Select name="ageGroup" value={data.ageGroup} onChange={onChange} error={errors.ageGroup} options={options.ageGroups} /></Field>
      <Field label="Стадия проекта" name="projectStage" error={errors.projectStage}><Select name="projectStage" value={data.projectStage} onChange={onChange} error={errors.projectStage} options={options.stages} /></Field>
      <Field label="Тема или направление" name="direction" error={errors.direction}><Input name="direction" value={data.direction} onChange={onChange} error={errors.direction} placeholder="Например, приложение, STEM, дизайн" /></Field>
      <Field label="Ближайшая цель" name="goal" error={errors.goal}><Textarea name="goal" value={data.goal} onChange={onChange} error={errors.goal} rows="3" placeholder="Что хотите получить в итоге?" /></Field>
      <Field label="Дедлайн" name="deadline" error={errors.deadline} hint="Если точной даты нет, напишите ориентир"><Input name="deadline" value={data.deadline} onChange={onChange} error={errors.deadline} placeholder="Например, февраль 2027" /></Field>
      <ScenarioField data={data} errors={errors} onChange={onChange} />
      {isMinor(data) && <ParentContact data={data} errors={errors} onChange={onChange} />}
    </>
  );
}

function ParentFields({ data, errors, onChange }) {
  return (
    <>
      <Field label="Возрастная группа ребёнка" name="childAgeGroup" error={errors.childAgeGroup}><Select name="childAgeGroup" value={data.childAgeGroup} onChange={onChange} error={errors.childAgeGroup} options={options.childAgeGroups} /></Field>
      <Field label="Стадия проекта" name="projectStage" error={errors.projectStage}><Select name="projectStage" value={data.projectStage} onChange={onChange} error={errors.projectStage} options={options.stages} /></Field>
      <Field label="Цель" name="goal" error={errors.goal}><Textarea name="goal" value={data.goal} onChange={onChange} error={errors.goal} rows="3" placeholder="Какой результат был бы полезен?" /></Field>
      <Field label="Дедлайн" name="deadline" error={errors.deadline}><Input name="deadline" value={data.deadline} onChange={onChange} error={errors.deadline} placeholder="Событие или ориентировочная дата" /></Field>
      <Field label="Основная сложность" name="challenge" error={errors.challenge}><Textarea name="challenge" value={data.challenge} onChange={onChange} error={errors.challenge} rows="3" placeholder="Где проект застрял сейчас?" /></Field>
      <ScenarioField data={data} errors={errors} onChange={onChange} />
    </>
  );
}

function MentorFields({ data, errors, onChange }) {
  return (
    <>
      <Field label="Направление экспертизы" name="expertise" error={errors.expertise}><Input name="expertise" value={data.expertise} onChange={onChange} error={errors.expertise} placeholder="Продукт, frontend, data science…" /></Field>
      <Field label="Опыт" name="experience" error={errors.experience}><Textarea name="experience" value={data.experience} onChange={onChange} error={errors.experience} rows="3" placeholder="Коротко о релевантном опыте" /></Field>
      <Field label="LinkedIn, GitHub или портфолио" name="portfolioUrl" error={errors.portfolioUrl}><Input name="portfolioUrl" value={data.portfolioUrl} onChange={onChange} error={errors.portfolioUrl} type="url" placeholder="https://" /></Field>
      <Field label="С какими проектами готовы работать" name="projectTypes" error={errors.projectTypes}><Textarea name="projectTypes" value={data.projectTypes} onChange={onChange} error={errors.projectTypes} rows="3" /></Field>
      <Field label="Доступность" name="availability" error={errors.availability}><Input name="availability" value={data.availability} onChange={onChange} error={errors.availability} placeholder="Например, 3 часа в неделю" /></Field>
      <Field label="Почему хотите стать ментором" name="motivation" error={errors.motivation}><Textarea name="motivation" value={data.motivation} onChange={onChange} error={errors.motivation} rows="3" /></Field>
    </>
  );
}

function ScenarioField({ data, errors, onChange }) {
  return <Field label="Сценарий" name="scenario" error={errors.scenario}><Select name="scenario" value={data.scenario} onChange={onChange} error={errors.scenario} options={options.scenarios} /></Field>;
}

function ParentContact({ data, errors, onChange }) {
  return (
    <div className="parentFields">
      <p><strong>Участие родителя обязательно.</strong> Мы свяжемся с ним до начала любой работы.</p>
      <Field label="Имя родителя" name="parentName" error={errors.parentName}><Input name="parentName" value={data.parentName} onChange={onChange} error={errors.parentName} /></Field>
      <Field label="Email или телефон родителя" name="parentContact" error={errors.parentContact}><Input name="parentContact" value={data.parentContact} onChange={onChange} error={errors.parentContact} /></Field>
      <label className="checkField"><input type="checkbox" name="parentInformed" checked={Boolean(data.parentInformed)} onChange={onChange} /><span>Родитель знает об этой заявке</span></label>
      {errors.parentInformed && <span className="errorText" role="alert">{errors.parentInformed}</span>}
    </div>
  );
}

export default function RoleFields(props) {
  if (props.data.role === "student") return <StudentFields {...props} />;
  if (props.data.role === "parent") return <ParentFields {...props} />;
  return <MentorFields {...props} />;
}
