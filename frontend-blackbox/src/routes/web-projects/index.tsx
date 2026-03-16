import { createFileRoute } from "@tanstack/react-router";
import FSWebProjectsPage from "../../pages/fs-web-projects/FSWebProjectsPage";

export const Route = createFileRoute("/web-projects/")({
  component: FSWebProjectsPage,
});
