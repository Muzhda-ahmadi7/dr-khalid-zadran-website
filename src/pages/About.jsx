import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, Users } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { Reveal, RevealGroup } from "../components/Reveal";
import { fadeUp } from "../utils/motion";

const portrait = "/images/zadran4.jpg";

import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow="About the Doctor"
        title="Experience, dedication, and specialized neurosurgical care."
        description="This profile is built from the information I have provided. Where details still need verification, they have been left out rather than assumed."
      />

      <section className="section-space overflow-x-clip">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal className="relative">
            <div className="absolute -bottom-5 -end-5 h-28 w-28 border-b border-e border-navy/20" />
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              src={portrait}
              alt={t("Dr. Khalid Khan Zadran portrait")}
              className="relative aspect-[4/5] w-full object-cover"
            />
          </Reveal>

          <Reveal className="lg:ps-8" delay={0.12}>
            <SectionHeading eyebrow="Professional Profile" title="Dr. Khalid Khan Zadran" />
            <p className="mt-6 leading-8 text-steel">
              {t("I am Dr. Khalid Khan Zadran, a Consultant Neurosurgeon and Brain & Spine Surgeon, currently practicing at Rifah Medical Complex in Kabul, Afghanistan.")}
            </p>
            <p className="mt-4 leading-8 text-steel">
              {t("My clinical focus covers brain surgery, spine surgery, peripheral nerve disorders, advanced neurological surgery, and research into brain disorders.")}
            </p>
            <div className="mt-8 border-s-2 border-navy/15 ps-5">
              <p className="text-sm leading-7 text-navy">
                {t("This is a demonstration website. The final text should be reviewed and approved before it is presented as an official practice website.")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-navy/10 bg-white">
        <RevealGroup className="container-page grid md:grid-cols-3" gap={0.1}>
          {[
            ["Education", "Ayub Medical College, Abbottabad, Pakistan", GraduationCap, "ltr"],
            ["Credentials", "MBBS · MD · RMP · MCPS · FCPS", Award, "ltr"],
            ["Research", "Brain tumors, head injuries, and complex Afghan brain disorder data", BookOpen],
          ].map(([title, text, Icon, dir]) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="border-b border-navy/10 p-8 md:border-b-0 md:border-e last:md:border-e-0"
            >
              <Icon className="text-navy" size={25} strokeWidth={1.5}/>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-steel">{t(title)}</p>
              <p className="mt-2 font-serif text-xl leading-8 text-navy" {...(dir ? { dir } : {})}>{t(text)}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      <section className="section-space">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{t("Memberships & Affiliations")}</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-navy">{t("Professional organizations I am affiliated with.")}</h2>
            <ul className="mt-7 space-y-4 text-steel">
              <li className="flex gap-3"><Users size={19} className="mt-1 shrink-0 text-navy"/>{t("American Association of Neurological Surgeons (AANS)")}</li>
              <li className="flex gap-3"><Users size={19} className="mt-1 shrink-0 text-navy"/>{t("Pakistan Society of Neurosurgeons")}</li>
              <li className="flex gap-3"><Users size={19} className="mt-1 shrink-0 text-navy"/>{t("Afghanistan Society of Neurosurgeons")}</li>
              <li className="flex gap-3"><Users size={19} className="mt-1 shrink-0 text-navy"/>{t("World Federation of Neurosurgical Societies (WFNS) Fellow")}</li>
            </ul>
          </Reveal>

          <Reveal className="border border-navy/10 bg-[#eef4f7] p-8 sm:p-10" delay={0.12}>
            <p className="eyebrow">{t("Academic Background")}</p>
            <h2 className="mt-3 font-serif text-3xl text-navy">{t("Education and professional experience.")}</h2>
            <p className="mt-5 leading-8 text-steel">
              {t("I studied at Ayub Medical College in Abbottabad, Pakistan, and previously served at Ayub Teaching Hospital. Exact dates and further training details are being confirmed before publication.")}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}