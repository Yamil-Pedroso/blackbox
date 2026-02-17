import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import BookingSimulationPage from "../../pages/experiments/BookingSimulationPage";

export const Route = createFileRoute("/experiments/booking-simulation")({
  component: RouteComponent,
});

function RouteComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isApp = pathname.endsWith("/app");

  if (isApp) {
    return <Outlet />;
  }

  return <BookingSimulationPage />;
}
