import { useTranslation } from "react-i18next";
import SectionLabel from "../SectionLabel";
import SectionHero from "../SectionHero";

interface FeatureHeaderProps {
  label: string;
  content: string;
}

const FeatureHeader = ({ label, content }: FeatureHeaderProps) => {
  const { t } = useTranslation("headerFeatures");

  return (
    <section className="space-y-6">
      <div className="tools-hero">
        <SectionLabel text={t(`label.${label}`)} />
      </div>

      <div className="tools-hero">
        <SectionHero
          title={t(`hero.${content}.title`)}
          description={t(`hero.${content}.description`)}
        />
      </div>
    </section>
  );
};

export default FeatureHeader;
