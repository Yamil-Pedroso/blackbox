import {
  FaLightbulb,
  FaExclamationTriangle,
  FaCheckCircle,
  FaListUl,
  FaProjectDiagram,
  FaSitemap,
  FaTools,
  FaBug,
  FaRocket,
} from "react-icons/fa";

export const getStatusColor = (status: string) => {
  if (status === "active") return "text-green-400";
  if (status === "inProgress") return "text-yellow-400";
  if (status === "prototype") return "text-neutral-400";
  return "text-neutral-500";
};

export const getStageInfo = (stage: string) => {
  if (stage === "idea") return { color: "text-sky-400", icon: FaLightbulb };

  if (stage === "problem")
    return { color: "text-amber-400", icon: FaExclamationTriangle };

  if (stage === "solution")
    return { color: "text-indigo-400", icon: FaCheckCircle };

  if (stage === "features") return { color: "text-purple-400", icon: FaListUl };

  if (stage === "uxFlow")
    return { color: "text-pink-400", icon: FaProjectDiagram };

  if (stage === "architecture")
    return { color: "text-blue-400", icon: FaSitemap };

  if (stage === "implementation")
    return { color: "text-green-400", icon: FaTools };

  if (stage === "testing") return { color: "text-orange-400", icon: FaBug };

  if (stage === "release") return { color: "text-emerald-500", icon: FaRocket };

  return { color: "text-neutral-500", icon: FaLightbulb };
};
