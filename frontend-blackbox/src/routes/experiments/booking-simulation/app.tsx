import { createFileRoute } from "@tanstack/react-router";
import BookingSimulatorApp from "../../../components/experiments/booking-simulation/BookingSimulationApp";
import type { BookingQuery } from "../../../components/experiments/booking-simulation/types/booking.types";

export const Route = createFileRoute("/experiments/booking-simulation/app")({
  validateSearch: (search) => ({
    location: (search.location as string) ?? "",
    guests: Number(search.guests ?? 1),
    minPrice: Number(search.minPrice ?? 0),
    maxPrice: Number(search.maxPrice ?? 500),
    sort: (search.sort as BookingQuery["sort"]) ?? "price_asc",
    page: Number(search.page ?? 1),
    limit: Number(search.limit ?? 6),
  }),
  component: BookingSimulatorApp,
});
