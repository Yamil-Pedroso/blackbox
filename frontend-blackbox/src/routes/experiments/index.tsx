import { createFileRoute } from "@tanstack/react-router";
import ExperimentsPage from "../../pages/ExperimentsPage";

export const Route = createFileRoute("/experiments/")({
  component: ExperimentsPage,
});
