import { useState } from "react";
import { Facebook, Linkedin, Mail, MapPin, Phone, Clock3, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PageHero from "../components/PageHero";
import FieldError from "../components/FieldError";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { EASE } from "../utils/motion";

import { useLanguage } from "../context/LanguageContext";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setForm(initialForm);
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Reach out for consultation requests and general questions."
        description="Clinic details and the best ways to reach me."
      />

      <section className="section-space">
        <RevealGroup className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]" gap={0.12}>
          <RevealItem className="space-y-7">
            <ContactItem icon={MapPin} title="Clinic" text="Rifah Medical Complex, Kabul, Afghanistan" latin />
            <ContactItem icon={Phone} title="Phone" text="+93 78 765 4751" latin />
            <ContactItem icon={Clock3} title="Availability" text="Clinic hours will be confirmed before publication." />
            <div>
              <p className="eyebrow">{t("Online Profiles")}</p>
              <div className="mt-4 flex gap-3">
                <a className="social-light" aria-label={t("Facebook")} href="https://www.facebook.com/DrKhalidkhanzadran/" target="_blank" rel="noreferrer"><Facebook size={19}/></a>
                <a className="social-light" aria-label={t("LinkedIn")} href="https://af.linkedin.com/in/dr-khalid-khan-zadran-67597036" target="_blank" rel="noreferrer"><Linkedin size={19}/></a>
              </div>
            </div>
          </RevealItem>

          <RevealItem className="min-h-[430px] overflow-hidden border border-navy/10 bg-soft-blue/35">
            <div className="grid h-full min-h-[430px] place-items-center p-10 text-center">
              <div>
                <MapPin size={40} className="mx-auto text-navy" strokeWidth={1.3} />
                <h2 className="mt-5 font-serif text-3xl text-navy">{t("Location / Map")}</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-steel">
                  {t("A map will appear here once the exact clinic location has been verified.")}
                </p>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      <section className="section-space pt-0">
        <div className="container-page">
          <Reveal className="border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Mail className="text-navy" />
              <h2 className="font-serif text-2xl text-navy">{t("Send a Message")}</h2>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <input
                    className={`input ${errors.name ? "border-red-400 focus:border-red-500" : ""}`}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("Your name")}
                    aria-label={t("Your name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <FieldError id="name-error" message={errors.name} />
                </div>
                <div>
                  <input
                    className={`input ${errors.email ? "border-red-400 focus:border-red-500" : ""}`}
                    name="email"
                    type="email"
                    dir="ltr"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("Email address")}
                    aria-label={t("Email address")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  <FieldError id="email-error" message={errors.email} />
                </div>
                <div className="md:col-span-2">
                  <textarea
                    className={`input min-h-32 ${errors.message ? "border-red-400 focus:border-red-500" : ""}`}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("How can we help?")}
                    aria-label={t("How can we help?")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  <FieldError id="message-error" message={errors.message} />
                </div>
                <button type="submit" className="btn-primary md:col-span-2">{t("Send Message")}</button>
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mt-6 flex gap-3 border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
                  >
                    <motion.span
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.12, duration: 0.35, ease: EASE }}
                      className="shrink-0"
                    >
                      <CheckCircle2 size={20} />
                    </motion.span>
                    <p><strong>{t("Message sent.")}</strong>{t("This demo does not send or store real patient data.")}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactItem({ icon: Icon, title, text, latin = false }) {
  const { t } = useLanguage();
  return (
    <div className="flex gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-soft-blue text-navy">
        <Icon size={20} strokeWidth={1.5}/>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">{t(title)}</p>
        <p className="mt-1 leading-7 text-navy" {...(latin ? { dir: "ltr" } : {})}>{t(text)}</p>
      </div>
    </div>
  );
}
