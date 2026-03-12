export interface ToolTypes {
  title: string;
  slug: string;
  description: string;
  stack: string;
  status: string;
  stage: string;
  viewProcess: string;
  launch: string;
}

export interface CaseStudyTypes {
  title: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  features: { title: string; description: string }[];
  architecture: string;
  implementation: string;
  developmentFlow: { title: string; description: string }[];
  lessonsLearned: string[];
  nextSteps: string[];
}

export type ToolRegistry = Record<string, React.FC>;
