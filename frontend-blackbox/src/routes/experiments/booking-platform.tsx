import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import BookingPlatformPage from "../../pages/experiments/booking-platform/BookingPlatformPage";

export const Route = createFileRoute("/experiments/booking-platform")({
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

  return <BookingPlatformPage />;
}
