import { createFileRoute } from "@tanstack/react-router";
import SimulationAppPage from "../../../pages/experiments/SimulationAppPage";

export const Route = createFileRoute("/experiments/booking-simulation/app")({
  component: SimulationAppPage,
});
