import Brand from "@/components/Brand";
import { links } from "@/lib/content";

export default function Footer() {
  const external = [["Instagram", links.instagram], ["Threads", links.threads], ["Контакт", links.contact]];
  return (
    <footer className="footer">
      <div><Brand /><p>Помогаем молодым авторам превращать идеи в реальные проекты.</p></div>
      <nav aria-label="Ссылки в подвале">
        {external.map(([label, href]) => href ? <a href={href} key={label} target="_blank" rel="noreferrer">{label}</a> : <span key={label}>{label} · скоро</span>)}
        <a href={links.privacy}>Политика приватности</a>
      </nav>
      <div className="footerBottom"><span>© {new Date().getFullYear()} Foundly</span><span>Исследовательский бесплатный пилот · Казахстан</span></div>
    </footer>
  );
}
