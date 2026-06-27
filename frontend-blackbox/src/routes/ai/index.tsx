import { createFileRoute } from "@tanstack/react-router";
import AIPage from "../../pages/ai/AIPage";

export const Route = createFileRoute("/ai/")({
  component: AIPage,
});
