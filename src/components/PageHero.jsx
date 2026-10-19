import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { EASE, fadeUp, stagger } from "../utils/motion";

export default function PageHero({ eyebrow, title, description }) {
  const { t } = useLanguage();
  return (
    <section className="border-b border-navy/10 bg-soft-blue/25">
      <motion.div
        variants={stagger(0.1, 0.05)}
        initial="hidden"
        animate="show"
        className="container-page py-16 md:py-24"
      >
        <motion.p variants={fadeUp} className="eyebrow">
          {t(eyebrow)}
        </motion.p>
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
          className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-navy md:text-6xl"
        >
          {t(title)}
        </motion.h1>
        {description && (
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-8 text-steel md:text-lg"
          >
            {t(description)}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}