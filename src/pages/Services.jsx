import PageHero from "../components/PageHero";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

import { useLanguage } from "../context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Specialized neurosurgical consultations."
        description="A clear overview of brain, spine, nerve, and neurosurgical evaluation services."
      />
      <section className="section-space">
        <div className="container-page grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-page">
          <div className="border border-navy/10 bg-navy p-8 text-white sm:p-12">
            <p className="eyebrow text-white/55">{t("Clinical scope")}</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl md:text-5xl">
              {t("Brain tumors, trauma, spine disorders, and peripheral nerve conditions.")}
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-white/65">
              {t("The specialties listed here describe the areas in which I see and evaluate patients. This is a demonstration website and the final text will be reviewed before publication.")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}