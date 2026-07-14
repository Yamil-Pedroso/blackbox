import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FeatureCard from "./common/cards/FeatureCard";
import { iconsMap } from "./common/icons/iconsMap";
import type { FocusPoint } from "./types/fsWebProjects.types";

const EngineeringFocus = () => {
  const { t } = useTranslation("fullStackProjects");

  const focusPoints = t("engineeringFocus.items", {
    returnObjects: true,
  }) as FocusPoint[];

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold">{t("engineeringFocus.title")}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {focusPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              delay: index * 0.08,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full"
          >
            <FeatureCard
              icon={iconsMap[point.icon]}
              title={point.title}
              description={point.description}
              className="h-full"
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EngineeringFocus;
