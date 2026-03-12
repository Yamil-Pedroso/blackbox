import CaseStudy from "../common/case-study/CaseStudy";
import { useTranslation } from "react-i18next";
import { createCaseStudy } from "../common/case-study/createCaseStudy";

export default function ColorPaletteGeneratorCaseStudy() {
  const { t } = useTranslation("colorPaletteGeneratorProcess");

  const caseStudy = createCaseStudy(t);

  return <CaseStudy caseStudy={caseStudy} />;
}
