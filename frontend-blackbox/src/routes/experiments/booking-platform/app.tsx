import { createFileRoute } from "@tanstack/react-router";
import BookingPlatformApp from "@/components/experiments/booking-platform/BookingPlatformApp";

export const Route = createFileRoute("/experiments/booking-platform/app")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BookingPlatformApp />;
}
