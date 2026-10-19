import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { EASE } from "../utils/motion";

export default function FieldError({ id, message }) {
  const { t } = useLanguage();
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          key={id}
          id={id}
          initial={{ opacity: 0, height: 0, y: -2 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -2 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="mt-2 text-xs text-red-600"
        >
          {t(message)}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
