import { createFileRoute } from "@tanstack/react-router";
import Content1 from "../pages/Content1";

export const Route = createFileRoute("/content1")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Content1 />;
}
