import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Brain } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { EASE, fadeUp, stagger } from "../utils/motion";
import { useLanguage } from "../context/LanguageContext";

const links = [["Home", "/"],["About", "/about"],["Services", "/services"],["Appointment", "/appointment"],["Contact", "/contact"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header sticky top-0 z-50 border-b border-navy/10 bg-warm/95 backdrop-blur-md${scrolled ? " is-scrolled" : ""}`}>
      <motion.span className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 bg-white text-navy">
            <Brain size={20} strokeWidth={1.6} />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-navy">{t("Dr. Khalid Khan Zadran")}</span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-steel">{t("Consultant Neurosurgeon")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `nav-link text-sm transition ${isActive ? "is-active font-semibold text-navy" : "text-steel hover:text-navy"}`
              }
            >
              {t(label)}
            </NavLink>
          ))}
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
          <Link to="/appointment" className="btn-primary px-5 py-3 text-sm">
            {t("Book Appointment")}
          </Link>
        </nav>

        <button
          aria-label={open ? t("Close menu") : t("Open menu")}
          className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden border-t border-navy/10 bg-white lg:hidden"
          >
            <motion.div
              variants={stagger(0.05, 0.06)}
              initial="hidden"
              animate="show"
              className="container-page flex flex-col gap-2 py-5"
            >
              {links.map(([label, href]) => (
                <motion.div key={href} variants={fadeUp}>
                  <NavLink
                    to={href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-3 text-sm transition ${isActive ? "bg-soft-blue/40 font-semibold text-navy" : "text-steel hover:bg-soft-blue/40 hover:text-navy"}`
                    }
                  >
                    {t(label)}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={fadeUp} className="mt-3">
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link to="/appointment" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">
                  {t("Book Appointment")}
                </Link>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function LanguageSwitcher({ language, setLanguage }) {
  const { t } = useLanguage();
  return (
    <div className="language-switcher" role="group" aria-label={t("Language")}>
      {[["en", "EN"], ["fa", "دری"], ["ps", "پښتو"]].map(([code, label]) => (
        <button key={code} type="button" className={language === code ? "active" : ""} onClick={() => setLanguage(code)} aria-pressed={language === code}>
          {label}
        </button>
      ))}
    </div>
  );
}