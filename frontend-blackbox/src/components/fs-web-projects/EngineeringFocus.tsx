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
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">{t("engineeringFocusTitle")}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {focusPoints.map((point, index) => (
          <FeatureCard
            key={index}
            icon={iconsMap[point.icon]}
            title={point.title}
            description={point.description}
          />
        ))}
      </div>
    </section>
  );
};

export default EngineeringFocus;
