import { createFileRoute } from "@tanstack/react-router";
import BookingPlatformPage from "@/pages/experiments/booking-platform/BookingPlatformPage";

export const Route = createFileRoute("/experiments/booking-platform/")({
  component: BookingPlatformPage,
});
