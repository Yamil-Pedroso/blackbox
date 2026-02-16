import { createFileRoute } from "@tanstack/react-router";
import SystemsPage from "../pages/SystemsPage";

export const Route = createFileRoute("/systems")({
  component: SystemsPage,
});
