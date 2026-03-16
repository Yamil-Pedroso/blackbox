import { useTranslation } from "react-i18next";
import FeatureCard from "./common/cards/FeatureCard";
import { iconsMap } from "./common/icons/iconsMap";
import type { StackItem } from "./types/fsWebProjects.types";

const StackOverview = () => {
  const { t } = useTranslation("fullStackProjects");

  const stack = t("stackOverview.items", {
    returnObjects: true,
  }) as StackItem[];

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">{t("stackOverviewTitle")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stack.map((item, index) => (
          <FeatureCard
            key={index}
            title={item.name}
            icon={iconsMap[item.icon]}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default StackOverview;
