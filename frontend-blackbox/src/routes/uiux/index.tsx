import { createFileRoute } from "@tanstack/react-router";
import UIUXPage from "@/pages/ui-ux/UIUXPage";

export const Route = createFileRoute("/uiux/")({
  component: UIUXPage,
});
