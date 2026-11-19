import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="notFound">
      <Image src="/foundly-logo.png" width="64" height="64" alt="" />
      <p className="eyebrow">404</p>
      <h1>Здесь пока ничего нет</h1>
      <p>Вернитесь на главную — там можно рассказать о проекте.</p>
      <Link className="button buttonPrimary" href="/">На главную</Link>
    </main>
  );
}
