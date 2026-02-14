import { createFileRoute } from "@tanstack/react-router";
import Content2 from "../pages/Content2";

export const Route = createFileRoute("/content2")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Content2 />;
}
