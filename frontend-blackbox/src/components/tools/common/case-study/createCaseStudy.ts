import type { TFunction } from "i18next";
import type { CaseStudyTypes } from "../types/toolTypes";

export const createCaseStudy = (t: TFunction): CaseStudyTypes => {
  return {
    title: t("title"),
    description: t("description"),

    overview: t("overview"),
    problem: t("problem"),
    solution: t("solution"),

    features: t("features", { returnObjects: true }) as {
      title: string;
      description: string;
    }[],

    architecture: t("architecture"),
    implementation: t("implementation"),

    developmentFlow: t("developmentFlow", { returnObjects: true }) as {
      title: string;
      description: string;
    }[],

    lessonsLearned: t("lessons", { returnObjects: true }) as string[],

    nextSteps: t("nextSteps", { returnObjects: true }) as string[],
  };
};
