import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { EASE, viewport } from "../utils/motion";

export default function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const { t } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: index * 0.09, duration: 0.6, ease: EASE }}
      whileHover={{ y: -4 }}
      className="service-card group border border-navy/10 bg-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 ease-out hover:border-navy/25 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold tracking-[0.2em] text-steel">{service.number}</span>
        <span className="service-icon grid h-11 w-11 place-items-center rounded-full bg-soft-blue text-navy">
          <Icon size={21} strokeWidth={1.5} />
        </span>
      </div>
      <h3 className="mt-10 font-serif text-2xl leading-tight text-navy">{t(service.title)}</h3>
      <p className="mt-3 text-sm leading-7 text-steel">{t(service.description)}</p>
    </motion.article>
  );
}
