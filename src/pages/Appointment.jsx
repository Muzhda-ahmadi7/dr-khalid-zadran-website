import { useState } from "react";
import { CheckCircle2, CalendarDays, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PageHero from "../components/PageHero";
import FieldError from "../components/FieldError";
import { EASE, viewport } from "../utils/motion";

const initialForm = {
  name: "",
  phone: "",
  date: "",
  contactMethod: "Phone",
  message: "",
};

import { useLanguage } from "../context/LanguageContext";

export default function Appointment() {
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
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    if (!form.date) next.date = "Please select a preferred date.";
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
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Make an Appointment"
        title="Request an appointment."
        description="Please complete the form below. This is a demonstration website, so no real patient information is stored."
      />

      <section className="section-space">
        <div className="container-page grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="border border-navy/10 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Enter your full name" />
              <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+93 ..." dir="ltr" />
              <Field label="Preferred Date" type="date" name="date" value={form.date} onChange={handleChange} error={errors.date} />
              <div>
                <label className="label">{t("Preferred Contact Method")}</label>
                <select className="input" name="contactMethod" value={form.contactMethod} onChange={handleChange}>
                  <option value="Phone">{t("Phone")}</option>
                  <option value="WhatsApp">{t("WhatsApp")}</option>
                  <option value="SMS">{t("SMS")}</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="label">{t("Message (Optional)")}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="input min-h-36 resize-y"
                placeholder={t("Tell us briefly what you would like to discuss...")}
              />
            </div>

            <button type="submit" className="btn-primary mt-6">
              {t("Submit Request")} <ArrowRight size={17} className="icon-flip" />
            </button>

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
                  <p><strong>{t("Request received.")}</strong>{t("This demo does not send or store real patient data.")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            className="border border-navy/10 bg-soft-blue/35 p-7 sm:p-8"
          >
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy">
              <CalendarDays size={23} />
            </div>
            <h2 className="mt-6 font-serif text-3xl text-navy">{t("We’ll get back to you")}</h2>
            <p className="mt-4 leading-8 text-steel">
              {t("Once this website goes live, this form will be connected to the clinic's approved appointment process.")}
            </p>
            <div className="mt-8 border-t border-navy/10 pt-6 text-sm text-steel">
              <p dir="ltr">{t("Rifah Medical Complex")}</p>
              <p className="mt-2">{t("Kabul, Afghanistan")}</p>
              <p className="mt-2" dir="ltr">+93 78 765 4751</p>
            </div>
          </motion.aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, value, onChange, error, placeholder, type = "text", dir }) {
  const { t } = useLanguage();
  return (
    <div>
      <label className="label" htmlFor={name}>{t(label)}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        dir={dir}
        placeholder={placeholder ? t(placeholder) : undefined}
        className={`input ${error ? "border-red-400 focus:border-red-500" : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}