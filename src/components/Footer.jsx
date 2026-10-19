import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Phone, MapPin } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-navy text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl">{t("Dr. Khalid Khan Zadran")}</p>
          <p className="mt-2 max-w-sm text-sm leading-7 text-white/65">
            {t("Consultant Neurosurgeon specializing in brain and spine care.")}
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t("Quick Navigation")}</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-white/70">
            <Link to="/about" className="hover:text-white">{t("About")}</Link>
            <Link to="/services" className="hover:text-white">{t("Services")}</Link>
            <Link to="/appointment" className="hover:text-white">{t("Appointment")}</Link>
            <Link to="/contact" className="hover:text-white">{t("Contact")}</Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t("Contact")}</p>
          <div className="space-y-3 text-sm text-white/70">
            <p className="flex gap-2"><MapPin size={17} /> <span dir="ltr">{t("Rifah Medical Complex, Kabul")}</span></p>
            <a className="flex gap-2 hover:text-white" href="tel:+93787654751"><Phone size={17} /> <span dir="ltr">+93 78 765 4751</span></a>
          </div>
          <div className="mt-5 flex gap-2">
            <a aria-label={t("Facebook")} className="social-icon" href="https://www.facebook.com/DrKhalidkhanzadran/" target="_blank" rel="noreferrer"><Facebook size={17}/></a>
            <a aria-label={t("LinkedIn")} className="social-icon" href="https://af.linkedin.com/in/dr-khalid-khan-zadran-67597036" target="_blank" rel="noreferrer"><Linkedin size={17}/></a>
            <a aria-label={t("Instagram")} className="social-icon" href="#" onClick={(e) => e.preventDefault()}><Instagram size={17}/></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <span>{t("© 2026 Dr. Khalid Khan Zadran. Demo project. muzhda ahmadi")}</span>
          <span>{t("Frontend demonstration · No real patient data is stored.")}</span>
        </div>
      </div>
    </footer>
  );
}