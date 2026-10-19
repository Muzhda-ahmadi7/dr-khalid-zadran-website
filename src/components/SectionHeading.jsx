import { useLanguage } from "../context/LanguageContext";
export default function SectionHeading({ eyebrow, title, description, center = false }) {
  const { t } = useLanguage();
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{t(eyebrow)}</p>
      <h2 className="mt-3 font-serif text-3xl leading-tight text-navy md:text-5xl">{t(title)}</h2>
      {description && <p className="mt-4 text-base leading-8 text-steel">{t(description)}</p>}
    </div>
  );
}