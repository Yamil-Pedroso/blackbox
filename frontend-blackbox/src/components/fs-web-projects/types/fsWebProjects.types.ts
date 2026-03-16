import { iconsMap } from "../common/icons/iconsMap";

type IconKey =
  | "react"
  | "typescript"
  | "node"
  | "postgresql"
  | "api"
  | "tailwind"
  | "architecture"
  | "code"
  | "performance"
  | "ux";
export interface StackItem {
  icon: IconKey;
  name: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  image?: string;
  caseStudy?: string;
  demo?: string;
}

export interface FocusPoint {
  icon: keyof typeof iconsMap;
  title: string;
  description: string;
}
