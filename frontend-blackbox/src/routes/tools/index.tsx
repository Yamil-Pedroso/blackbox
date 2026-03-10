import { createFileRoute } from "@tanstack/react-router";
import ToolsPage from "../../pages/tools/ToolsPage";

export const Route = createFileRoute("/tools/")({
  component: ToolsPage,
});
