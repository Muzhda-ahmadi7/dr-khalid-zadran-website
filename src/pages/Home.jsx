import { Link } from "react-router-dom";
import { ArrowRight, Brain, MapPin, ShieldCheck, Phone } from "lucide-react";
import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import { Reveal } from "../components/Reveal";
import { EASE, fadeUp, stagger } from "../utils/motion";
import { services } from "../data/services";

// BASE_URL keeps image URLs correct on a sub-path deploy (GitHub Pages) and locally.
const images = {
  hero: `${import.meta.env.BASE_URL}images/dr-khalid-cutout.png`,
  office: `${import.meta.env.BASE_URL}images/zadran5.jpg`,
  interview: `${import.meta.env.BASE_URL}images/zadran2.jpg`,
  surgery: `${import.meta.env.BASE_URL}images/zadran.jpg`,
  conference: `${import.meta.env.BASE_URL}images/zadran3.jpg`,
};

import { useLanguage } from "../context/LanguageContext";

function HeroLine({ children, delay = 0, clip = true }) {
  return (
    <span className={clip ? "block overflow-hidden pb-[0.12em] -mb-[0.12em]" : "block"}>
      <motion.span
        className="block"
        initial={clip ? { y: "112%" } : { opacity: 0, y: 22 }}
        animate={clip ? { y: "0%" } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Home() {
  const { t, language } = useLanguage();
  return (
    <>
      <section className="relative overflow-hidden border-b border-navy/10 bg-warm">
        <div className="container-page grid items-center gap-12 pt-14 pb-12 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.06fr_0.94fr] lg:gap-14 lg:pt-16 lg:pb-0">
          <motion.div
            className="relative z-10 flex flex-col justify-center"
            variants={stagger(0.1, 0.08)}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="eyebrow">
              {t("Consultant Neurosurgeon · Brain & Spine")}
            </motion.p>

            <h1 className="mt-5 font-serif text-[clamp(2.7rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.03em] text-navy">
              {language === "en" ? (
                <>
                  <HeroLine delay={0.1}>Dr. Khalid</HeroLine>
                  <HeroLine delay={0.22}>Khan Zadran</HeroLine>
                </>
              ) : (
                <HeroLine delay={0.12} clip={false}>
                  {t("Dr. Khalid Khan Zadran")}
                </HeroLine>
              )}
            </h1>

            <motion.p variants={fadeUp} className="mt-7 max-w-xl font-serif text-2xl leading-snug text-navy/80">
              {t("Precision in care. Clarity in every decision.")}
            </motion.p>

            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[15px] leading-8 text-steel">
              {t("Consultant Neurosurgeon and Brain & Spine Surgeon providing specialized consultation and evaluation for neurological and spinal conditions.")}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <Link to="/appointment" className="btn-primary">
                {t("Request Appointment")} <ArrowRight size={17} className="icon-flip" />
              </Link>
              <Link to="/about" className="btn-secondary">
                {t("Meet the Doctor")}
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 grid max-w-xl grid-cols-3 border-y border-navy/10 py-5">
              <div className="border-e border-navy/10 pe-4">
                <Brain size={20} className="text-navy" strokeWidth={1.5} />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">{t("Brain")}</p>
              </div>
              <div className="border-e border-navy/10 px-4">
                <ShieldCheck size={20} className="text-navy" strokeWidth={1.5} />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">{t("Spine")}</p>
              </div>
              <div className="ps-4">
                <MapPin size={20} className="text-navy" strokeWidth={1.5} />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">{t("Kabul")}</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative flex items-end justify-center lg:self-stretch">
            <motion.img
              src={images.hero}
              alt={t("Dr. Khalid Khan Zadran in medical attire")}
              fetchPriority="high"
              decoding="async"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="hero-cutout"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-navy/10 bg-white">
        <Reveal className="container-page grid md:grid-cols-4">
          {services.map((service) => (
            <div key={service.number} className="border-b border-navy/10 p-6 md:border-b-0 md:border-e last:md:border-e-0">
              <service.icon size={22} className="text-navy" strokeWidth={1.5} />
              <p className="mt-4 font-serif text-lg text-navy">{t(service.title)}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="section-space">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Specialized Care"
              title="A focused approach to brain, spine, and nerve conditions."
              description="Explore the consultation services presented in the project brief, organized around clear clinical categories."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-navy/10 bg-[#eef4f7]">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="overflow-hidden rounded-[28px]">
            <motion.img
              whileHover={{ scale: 1.025 }}
              transition={{ duration: 0.5 }}
              src={images.office}
              alt={t("Dr. Khalid Khan Zadran working at a desk")}
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <Reveal className="lg:ps-8" delay={0.12}>
            <p className="eyebrow">{t("Professional Profile")}</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-navy md:text-5xl">
              {t("Specialized medicine, presented with clarity.")}
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-steel">
              {t("I am Dr. Khalid Khan Zadran, a Consultant Neurosurgeon and Brain & Spine Surgeon practicing in Kabul. This website is intended to make my areas of practice clear and to give patients a simple route to request an appointment.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn-secondary">{t("View Profile")} <ArrowRight size={16} className="icon-flip"/></Link>
              <a href="tel:+93787654751" className="btn-secondary"><Phone size={16}/>{t("Call Clinic")}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="clinical-section section-space relative overflow-hidden">
        <div className="clinical-orb clinical-orb-one" aria-hidden="true" />
        <div className="clinical-orb clinical-orb-two" aria-hidden="true" />
        <div className="container-page relative">
          <Reveal className="clinical-heading flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{t("Clinical Environment")}</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-navy md:text-5xl">{t("A visual glimpse into the professional practice.")}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-steel">{t("A closer look at the clinical work, professional conversations, and ongoing learning that support thoughtful patient care.")}</p>
            </div>
            <Link to="/contact" className="clinical-link shrink-0">{t("Contact the clinic →")}</Link>
          </Reveal>

          <div className="clinical-gallery mt-12">
            <Reveal className="clinical-feature group">
              <img src={images.surgery} alt={t("Doctor in a professional medical environment")} loading="lazy" />
              <div className="clinical-image-shade" />
              <div className="clinical-number">01 <span> / 04</span></div>
              <div className="clinical-caption"><span className="clinical-caption-line" /><div><p className="text-xs uppercase tracking-[.2em] text-white/65">{t("Clinical practice")}</p><h3 className="mt-2 font-serif text-3xl text-white md:text-4xl">{t("Focused on patient care")}</h3></div></div>
              <div className="clinical-image-mark" aria-hidden="true">+</div>
            </Reveal>
            <div className="clinical-side-grid">
              <Reveal delay={0.1} className="clinical-tile group">
                <img src={images.office} alt={t("Doctor reviewing clinical information at a desk")} loading="lazy" />
                <div className="clinical-image-shade" />
                <div className="clinical-tile-copy"><span>02</span><h3>{t("Clinical review")}</h3></div>
              </Reveal>
              <Reveal delay={0.2} className="clinical-tile group">
                <img src={images.interview} alt={t("Doctor in a professional engagement setting")} loading="lazy" />
                <div className="clinical-image-shade" />
                <div className="clinical-tile-copy"><span>03</span><h3>{t("Professional engagement")}</h3></div>
              </Reveal>
              <Reveal delay={0.3} className="clinical-tile clinical-tile-wide group">
                <img src={images.conference} alt={t("Doctor at a professional medical conference") } loading="lazy" />
                <div className="clinical-image-shade" />
                <div className="clinical-tile-copy"><span>04</span><h3>{t("Continued learning")}</h3></div>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.18} className="clinical-footnote mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>{t("Professional care begins with listening, careful evaluation, and clear communication.")}</p>
            <Link to="/appointment" className="clinical-cta">{t("Request Appointment")} <ArrowRight size={16} className="icon-flip" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-page">
          <div className="relative overflow-hidden bg-navy px-7 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
            <div className="absolute -end-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -end-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
            <Reveal className="relative max-w-3xl">
              <p className="eyebrow text-white/55">{t("Appointment")}</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                {t("Start with a clear conversation about your care.")}
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/65">
                {t("Please share a preferred date and the best way to reach you.")}
              </p>
              <Link to="/appointment" className="mt-8 btn-light">{t("Request Appointment")} <ArrowRight size={17} className="icon-flip"/></Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}