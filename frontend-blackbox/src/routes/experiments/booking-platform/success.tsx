import { createFileRoute } from "@tanstack/react-router";
import BookingSuccessPage from "@/components/experiments/booking-platform/pages/BookingSuccessPage";

export const Route = createFileRoute("/experiments/booking-platform/success")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      bookingId: typeof search.bookingId === "string" ? search.bookingId : "",
    };
  },
  component: BookingSuccessPage,
});
