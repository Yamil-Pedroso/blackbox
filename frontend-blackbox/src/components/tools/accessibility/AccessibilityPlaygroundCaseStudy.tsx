import CaseStudy from "../common/case-study/CaseStudy";
import { useTranslation } from "react-i18next";
import { createCaseStudy } from "../common/case-study/createCaseStudy";

const AccessibilityPlaygroundCaseStudy = () => {
  const { t } = useTranslation("accessibilityPlaygroundProcess");

  const caseStudy = createCaseStudy(t);

  return <CaseStudy caseStudy={caseStudy} />;
};

export default AccessibilityPlaygroundCaseStudy;
