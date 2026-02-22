import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/experiments/booking-platform")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
