export function Field({ label, name, error, hint, children }) {
  return (
    <div className={`field ${error ? "fieldError" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {children}
      {hint && <span className="fieldHint">{hint}</span>}
      {error && <span className="errorText" id={`${name}-error`} role="alert">{error}</span>}
    </div>
  );
}

export function Input({ name, value, onChange, error, ...props }) {
  return <input id={name} name={name} value={value || ""} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props} />;
}

export function Textarea({ name, value, onChange, error, ...props }) {
  return <textarea id={name} name={name} value={value || ""} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props} />;
}

export function Select({ name, value, onChange, error, placeholder = "Выберите", options: items, ...props }) {
  return (
    <select id={name} name={name} value={value || ""} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props}>
      <option value="" disabled>{placeholder}</option>
      {items.map((item) => {
        const [valueOption, label] = Array.isArray(item) ? item : [item, item];
        return <option value={valueOption} key={valueOption}>{label}</option>;
      })}
    </select>
  );
}
